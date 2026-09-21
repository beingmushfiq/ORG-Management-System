import { describe, it, expect, beforeEach } from "vitest";
import { AuthService } from "../src/modules/auth/auth.service";

describe("Authentication & Multi-Position Switcher (Human-Centered Auth)", () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
  });

  describe("1. Mobile Phone Number Normalization", () => {
    it("should normalize 11-digit Bangladeshi numbers (017XXXXXXXX) to E.164 (+88017XXXXXXXX)", () => {
      const normalized = authService.normalizePhoneNumber("01712345678");
      expect(normalized).toBe("+8801712345678");
    });

    it("should accept already-prefixed numbers (+88018XXXXXXXX)", () => {
      const normalized = authService.normalizePhoneNumber("+8801812345678");
      expect(normalized).toBe("+8801812345678");
    });

    it("should reject invalid phone numbers", () => {
      expect(() => authService.normalizePhoneNumber("12345")).toThrowError(/Invalid mobile phone number/);
    });
  });

  describe("2. Passwordless SMS OTP Generation & Verification", () => {
    it("should generate 6-digit OTP code with bilingual message", () => {
      const result = authService.generateSmsOtp("org-bma", "01712345678");
      expect(result.phone).toBe("+8801712345678");
      expect(result.code).toMatch(/^\d{6}$/);
      expect(result.messageBn).toContain("আপনার লগইন ওটিপি (OTP) কোড হল");
    });

    it("should verify correct OTP code and return active user session with positions", () => {
      const { code } = authService.generateSmsOtp("org-bma", "01712345678");
      const session = authService.verifySmsOtp("01712345678", code);

      expect(session.userId).toBeDefined();
      expect(session.fullName).toBe("Prof. Dr. Mujibul Haque");
      expect(session.positions.length).toBeGreaterThanOrEqual(1);
      expect(session.activePosition.positionTitle).toBe("President");
    });

    it("should reject incorrect OTP code", () => {
      authService.generateSmsOtp("org-bma", "01712345678");
      expect(() => authService.verifySmsOtp("01712345678", "000000")).toThrowError(/Incorrect verification code/);
    });
  });

  describe("3. Seamless Active Role Switching", () => {
    it("should switch active position context without re-authentication", () => {
      const { code } = authService.generateSmsOtp("org-bma", "01712345678");
      const session = authService.verifySmsOtp("01712345678", code);

      expect(session.activePosition.id).toBe("pos-1");

      const switched = authService.switchActivePosition(session, "pos-2");
      expect(switched.activePosition.id).toBe("pos-2");
      expect(switched.activePosition.positionTitle).toBe("Branch President");
      expect(switched.activePosition.branchName).toBe("Chattogram Division Secretariat");
    });
  });
});
