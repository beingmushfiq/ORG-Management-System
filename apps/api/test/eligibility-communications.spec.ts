import { describe, it, expect, beforeEach } from "vitest";
import { EligibilityEvaluator } from "../src/modules/eligibility/eligibility-evaluator";
import {
  OrganizationEligibilityConfig,
  EligibilityEvaluationInput,
} from "../src/modules/eligibility/interfaces/eligibility-rule.interface";
import { TemplateEngine } from "../src/modules/communications/template-engine";
import { CommunicationsService } from "../src/modules/communications/communications.service";
import { SslWirelessSmsProvider } from "../src/modules/communications/providers/ssl-wireless.provider";
import { AlphaSmsProvider } from "../src/modules/communications/providers/alpha-sms.provider";
import { GreenwebSmsProvider } from "../src/modules/communications/providers/greenweb.provider";

describe("Phase 6: Dynamic Eligibility Engine & Multi-Vendor SMS", () => {
  const sampleConfig: OrganizationEligibilityConfig = {
    rules: {
      ASSOCIATE_TO_GENERAL: {
        minContinuousActiveDays: 365,
        maxSuspensionGapsAllowedDays: 0,
        requireDuesCleared: true,
        minActivityPoints: 50,
        requiredActivityTypes: ["EVENT_ATTENDANCE", "DUES_PAID"],
      },
      GENERAL_TO_LIFE: {
        minContinuousActiveDays: 1825, // 5 years
        maxSuspensionGapsAllowedDays: 30,
        requireDuesCleared: true,
        minActivityPoints: 200,
        requiredActivityTypes: ["EVENT_ATTENDANCE", "MEETING_ATTENDED"],
      },
    },
  };

  describe("1. Continuous Active Tenure with Suspension Gap Deductions", () => {
    it("should calculate active tenure without suspensions accurately", () => {
      const joined = new Date("2025-01-01T00:00:00Z");
      const evalDate = new Date("2026-01-01T00:00:00Z"); // 365 days later

      const res = EligibilityEvaluator.calculateContinuousActiveDays(joined, [], evalDate);
      expect(res.activeDays).toBe(365);
      expect(res.suspensionDays).toBe(0);
    });

    it("should subtract disciplinary suspension intervals from continuous active tenure", () => {
      const joined = new Date("2024-01-01T00:00:00Z");
      const evalDate = new Date("2025-01-01T00:00:00Z"); // 366 days later (leap year)

      const history = [
        {
          status: "SUSPENDED" as const,
          startDate: new Date("2024-06-01T00:00:00Z"),
          endDate: new Date("2024-07-01T00:00:00Z"), // 30 days suspension
        },
      ];

      const res = EligibilityEvaluator.calculateContinuousActiveDays(joined, history, evalDate);
      expect(res.suspensionDays).toBe(30);
      expect(res.activeDays).toBe(336); // 366 - 30
    });
  });

  describe("2. Full Promotion Eligibility Evaluation", () => {
    it("should grant promotion eligibility when all criteria are satisfied", () => {
      const input: EligibilityEvaluationInput = {
        memberId: "BMA-ASSOC-0012",
        currentTier: "ASSOCIATE",
        joinedDate: new Date("2024-01-01T00:00:00Z"),
        status: "ACTIVE",
        history: [],
        unpaidDuesPaisa: 0n,
        activities: [
          { type: "EVENT_ATTENDANCE", points: 30, occurredAt: new Date() },
          { type: "DUES_PAID", points: 25, occurredAt: new Date() },
        ],
        config: sampleConfig,
        targetTier: "GENERAL",
      };

      const evalDate = new Date("2025-06-01T00:00:00Z"); // ~516 days
      const report = EligibilityEvaluator.evaluate(input, evalDate);

      expect(report.isEligible).toBe(true);
      expect(report.overallScorePercent).toBe(100);
      expect(report.unmetCriteria.length).toBe(0);
      expect(report.criteria["tenure"]!.passed).toBe(true);
      expect(report.criteria["duesCompliance"]!.passed).toBe(true);
      expect(report.criteria["activityPoints"]!.passed).toBe(true);
    });

    it("should block promotion if member has unpaid dues (paisa > 0)", () => {
      const input: EligibilityEvaluationInput = {
        memberId: "BMA-ASSOC-0012",
        currentTier: "ASSOCIATE",
        joinedDate: new Date("2024-01-01T00:00:00Z"),
        status: "ACTIVE",
        history: [],
        unpaidDuesPaisa: 50000n, // ৳500 unpaid
        activities: [
          { type: "EVENT_ATTENDANCE", points: 30, occurredAt: new Date() },
          { type: "DUES_PAID", points: 25, occurredAt: new Date() },
        ],
        config: sampleConfig,
        targetTier: "GENERAL",
      };

      const evalDate = new Date("2025-06-01T00:00:00Z");
      const report = EligibilityEvaluator.evaluate(input, evalDate);

      expect(report.isEligible).toBe(false);
      expect(report.unmetCriteria.some((u) => u.includes("Outstanding dues"))).toBe(true);
      expect(report.criteria["duesCompliance"]!.passed).toBe(false);
    });
  });

  describe("3. Bilingual Template Engine & GSM / Unicode Segment Analytics", () => {
    it("should calculate GSM 7-bit single part for English under 160 chars", () => {
      const rendered = TemplateEngine.render({
        template: TemplateEngine.STANDARD_TEMPLATES["EMERGENCY_CIRCULAR"]!,
        locale: "en",
        variables: {
          orgName: "BMA Chattogram",
          headline: "Emergency Council Session at 6 PM",
          noticeLink: "https://bma.org/n/1",
        },
      });

      expect(rendered.isUnicode).toBe(false);
      expect(rendered.segmentsCount).toBe(1);
      expect(rendered.renderedText).toContain("URGENT: Executive Directive");
    });

    it("should calculate UCS-2 multipart segments for Bengali text (>70 chars)", () => {
      const rendered = TemplateEngine.render({
        template: TemplateEngine.STANDARD_TEMPLATES["DUES_OVERDUE"]!,
        locale: "bn",
        variables: {
          name: "ডাঃ সালমা বেগম",
          membershipId: "BMA-GEN-0142",
          period: "মাসিক",
          amount: "৫০০",
          dueDate: "১৫ সেপ্টেম্বর ২০২৬",
          paymentLink: "https://app.org.bd/pay",
          orgName: "বাংলাদেশ মেডিকেল এসোসিয়েশন",
        },
      });

      expect(rendered.isUnicode).toBe(true);
      expect(rendered.segmentsCount).toBeGreaterThan(1); // Bengali unicode requires 67 chars per part for multipart
      expect(rendered.renderedText).toContain("শ্রদ্ধেয় ডাঃ সালমা বেগম");
    });
  });

  describe("4. Priority Emergency Broadcast with Branch Tree Materialized Path Filtering", () => {
    let commsService: CommunicationsService;

    beforeEach(() => {
      commsService = new CommunicationsService(
        new SslWirelessSmsProvider(),
        new AlphaSmsProvider(),
        new GreenwebSmsProvider()
      );
    });

    it("should filter recipients strictly to the specified branch subtree", async () => {
      const credentials = {
        organizationId: "org-bma",
        provider: "SSL_WIRELESS" as const,
        apiKey: "test_key",
        senderId: "BMA-CTG",
        isApprovedMasking: true,
      };

      const recipients = [
        { mobile: "01700000001", name: "Dr. A", branchPath: "/1/2/4" }, // Under /1/2
        { mobile: "01700000002", name: "Dr. B", branchPath: "/1/2/5" }, // Under /1/2
        { mobile: "01700000003", name: "Dr. C", branchPath: "/1/3/6" }, // Different branch /1/3
      ];

      const result = await commsService.dispatchEmergencyBroadcast(credentials, {
        organizationId: "org-bma",
        senderId: "BMA-CTG",
        targetBranchNodePathPrefix: "/1/2", // Only target subtree /1/2
        messageHeadline: "Cyclone Preparedness Hospital Unit Alert",
        noticeUrl: "https://bma.org/alert/cyclone",
        recipients,
      });

      expect(result.totalTargeted).toBe(2);
      expect(result.totalSent).toBe(2);
      expect(result.senderId).toBe("BMA-CTG");
    });
  });
});
