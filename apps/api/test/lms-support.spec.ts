import { describe, it, expect } from "vitest";
import { LmsEngine, CourseDefinition } from "../src/modules/lms/lms-engine";
import { SupportEngine } from "../src/modules/support/support-engine";

describe("Phase 8: Advanced Modules (LMS & Support Helpdesk)", () => {
  const sampleCourse: CourseDefinition = {
    id: "crs-bioethics-101",
    title: "Clinical Governance & Medical Bioethics",
    titleBn: "ক্লিনিক্যাল সুশাসন ও বায়োএথিক্স",
    cmeCredits: 10,
    passingScorePercent: 80,
    modules: [
      {
        id: "mod-1",
        title: "Informed Consent in Critical Care",
        lessons: [
          { id: "les-1", title: "Legal Framework in Bangladesh", durationMinutes: 25 },
          { id: "les-2", title: "Emergency Proxy Protocols", durationMinutes: 30 },
        ],
      },
      {
        id: "mod-2",
        title: "Patient Rights & Records Security",
        lessons: [
          { id: "les-3", title: "Digital Health Records Privacy", durationMinutes: 20 },
        ],
      },
    ],
  };

  describe("1. LMS Lesson Progress & Certificate Engine", () => {
    it("should accurately calculate lesson progress percentage", () => {
      const completed = new Set(["les-1", "les-2"]);
      const progress = LmsEngine.calculateProgress(sampleCourse, completed);

      expect(progress.totalLessons).toBe(3);
      expect(progress.completedLessons).toBe(2);
      expect(progress.progressPercent).toBe(67);
    });

    it("should issue cryptographic certificate upon 100% completion and passing score", () => {
      const allCompleted = new Set(["les-1", "les-2", "les-3"]);

      const cert = LmsEngine.issueAccreditationCertificate(sampleCourse, {
        memberId: "BMA-GEN-0142",
        courseId: sampleCourse.id,
        completedLessonIds: allCompleted,
        quizScorePercent: 85,
      });

      expect(cert.certificateId).toContain("CERT-LMS-");
      expect(cert.cmeCredits).toBe(10);
      expect(cert.securityHash.length).toBe(64);
      expect(cert.verificationUrl).toContain("/verify/cert/");
    });

    it("should reject certificate issuance if quiz score is below passing mark", () => {
      const allCompleted = new Set(["les-1", "les-2", "les-3"]);

      expect(() => {
        LmsEngine.issueAccreditationCertificate(sampleCourse, {
          memberId: "BMA-GEN-0142",
          courseId: sampleCourse.id,
          completedLessonIds: allCompleted,
          quizScorePercent: 70, // Required is 80%
        });
      }).toThrowError(/is below required passing mark/);
    });
  });

  describe("2. Support Helpdesk Engine", () => {
    it("should route financial inquiries automatically to Treasurer role", () => {
      const ticket = SupportEngine.createTicket(
        "org-bma",
        "BMA-ASSOC-01",
        "Discrepancy in online bank deposit slip status",
        "DUES_AND_PAYMENTS",
        "I submitted my slip yesterday, transaction SONALI-99.",
        "NORMAL"
      );

      expect(ticket.assignedToRole).toBe("TREASURER");
      expect(ticket.status).toBe("OPEN");
      expect(ticket.messages.length).toBe(1);

      const resolved = SupportEngine.resolveTicket(ticket, "officer-treasurer", "Verified and cleared invoice.");
      expect(resolved.status).toBe("RESOLVED");
      expect(resolved.messages.length).toBe(2);
    });
  });
});
