import { describe, it, expect, beforeEach, vi } from "vitest";
import { AuthService } from "../src/modules/auth/auth.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";

// Mock @org/database
vi.mock("@org/database", () => {
  return {
    prisma: {
      organization: {
        findUnique: vi.fn(),
        findFirst: vi.fn(),
      },
      authOtp: {
        findFirst: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
      },
      user: {
        findFirst: vi.fn(),
        create: vi.fn(),
      },
      userSession: {
        create: vi.fn(),
        updateMany: vi.fn(),
      },
      auditLog: {
        create: vi.fn(),
      },
    },
  };
});

import { prisma } from "@org/database";

describe("Production Authentication & Security Architecture", () => {
  let authService: AuthService;
  let jwtService: JwtService;

  beforeEach(() => {
    jwtService = new JwtService({ secret: "test-secret-key-32-chars-long" });
    authService = new AuthService(jwtService);
    vi.clearAllMocks();
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

  describe("2. Cryptographic SMS OTP Generation & Rate Limiting", () => {
    it("should enforce 60-second rate limiting on repeated OTP requests", async () => {
      (prisma.organization.findUnique as any).mockResolvedValue({
        id: "org-uuid",
        name: "Test Org",
        status: "ACTIVE",
      });

      // Mock recent OTP found within last 60 seconds
      (prisma.authOtp.findFirst as any).mockResolvedValue({
        id: "recent-otp-id",
        createdAt: new Date(),
      });

      await expect(
        authService.sendSmsOtp("bma-ctg", "01712345678")
      ).rejects.toThrowError(/wait 60 seconds/);
    });

    it("should generate cryptographically random 6-digit code and save bcrypt hash to DB", async () => {
      (prisma.organization.findUnique as any).mockResolvedValue({
        id: "org-uuid",
        name: "Test Org",
        status: "ACTIVE",
      });

      (prisma.authOtp.findFirst as any).mockResolvedValue(null);
      (prisma.authOtp.create as any).mockResolvedValue({ id: "new-otp-id" });
      (prisma.auditLog.create as any).mockResolvedValue({});

      const result = await authService.sendSmsOtp("bma-ctg", "01712345678");

      expect(result.phone).toBe("+8801712345678");
      expect(result.expiresInSeconds).toBe(300);

      // Verify that prisma.authOtp.create was called with hashed code, NOT plaintext
      const createCall = (prisma.authOtp.create as any).mock.calls[0][0];
      expect(createCall.data.phone).toBe("+8801712345678");
      expect(createCall.data.organizationId).toBe("org-uuid");
      expect(createCall.data.codeHash).toBeDefined();
      expect(createCall.data.codeHash).not.toMatch(/^\d{6}$/); // Must be a hash, not raw digits!
      expect(createCall.data.maxAttempts).toBe(3);
    });
  });

  describe("3. OTP Verification & Max Attempt Lockout", () => {
    it("should reject expired or non-existent verification code", async () => {
      (prisma.organization.findUnique as any).mockResolvedValue({
        id: "org-uuid",
        status: "ACTIVE",
      });
      (prisma.authOtp.findFirst as any).mockResolvedValue(null);

      await expect(
        authService.verifySmsOtp("bma-ctg", "01712345678", "123456")
      ).rejects.toThrowError(/expired or was not requested/);
    });

    it("should lock code and reject when max attempts (3) are exceeded", async () => {
      (prisma.organization.findUnique as any).mockResolvedValue({
        id: "org-uuid",
        status: "ACTIVE",
      });

      (prisma.authOtp.findFirst as any).mockResolvedValue({
        id: "otp-1",
        codeHash: await bcrypt.hash("111111", 10),
        attempts: 3,
        maxAttempts: 3,
        expiresAt: new Date(Date.now() + 60000),
      });

      await expect(
        authService.verifySmsOtp("bma-ctg", "01712345678", "111111")
      ).rejects.toThrowError(/Maximum verification attempts exceeded/);
    });

    it("should increment attempts counter in DB on incorrect code", async () => {
      (prisma.organization.findUnique as any).mockResolvedValue({
        id: "org-uuid",
        status: "ACTIVE",
      });

      (prisma.authOtp.findFirst as any).mockResolvedValue({
        id: "otp-1",
        codeHash: await bcrypt.hash("654321", 10),
        attempts: 1,
        maxAttempts: 3,
        expiresAt: new Date(Date.now() + 60000),
      });

      await expect(
        authService.verifySmsOtp("bma-ctg", "01712345678", "000000")
      ).rejects.toThrowError(/Incorrect verification code/);

      expect(prisma.authOtp.update).toHaveBeenCalledWith({
        where: { id: "otp-1" },
        data: { attempts: 2 },
      });
    });

    it("should issue signed JWT and database UserSession on correct OTP", async () => {
      (prisma.organization.findUnique as any).mockResolvedValue({
        id: "org-uuid",
        name: "Test Org",
        status: "ACTIVE",
      });

      const rawCode = "789123";
      (prisma.authOtp.findFirst as any).mockResolvedValue({
        id: "otp-1",
        codeHash: await bcrypt.hash(rawCode, 10),
        attempts: 0,
        maxAttempts: 3,
        expiresAt: new Date(Date.now() + 60000),
      });

      (prisma.user.findFirst as any).mockResolvedValue({
        id: "usr-123",
        fullName: "Dr. Aayan Ahmed",
        phone: "+8801712345678",
        email: "dr.aayan@org.bd",
        organizationId: "org-uuid",
        userPositions: [
          {
            id: "pos-1",
            isActive: true,
            position: { title: "President", defaultPermissions: ["MEMBERS:ALL"] },
            branchNode: { id: "b-1", name: "Central HQ", materializedPath: "1", depth: 0 },
          },
        ],
        memberships: [{ tier: "LIFE", membershipNumber: "BMA-001" }],
      });

      (prisma.userSession.create as any).mockResolvedValue({ id: "session-uuid" });
      (prisma.auditLog.create as any).mockResolvedValue({});

      const session = await authService.verifySmsOtp("bma-ctg", "01712345678", rawCode);

      expect(session.accessToken).toBeDefined();
      expect(session.userId).toBe("usr-123");
      expect(session.positions.length).toBe(1);
      expect(session.activePosition?.positionTitle).toBe("President");
      expect(prisma.authOtp.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ consumedAt: expect.any(Date) }),
        })
      );
      expect(prisma.userSession.create).toHaveBeenCalled();
    });
  });

  describe("4. Password Authentication & Constant-Time Resistance", () => {
    it("should reject incorrect password and write audit log for failed login", async () => {
      (prisma.organization.findUnique as any).mockResolvedValue({
        id: "org-uuid",
        status: "ACTIVE",
      });

      (prisma.user.findFirst as any).mockResolvedValue({
        id: "usr-123",
        email: "test@bma.org",
        passwordHash: await bcrypt.hash("correct-pass", 10),
        organizationId: "org-uuid",
        userPositions: [],
        memberships: [],
      });

      (prisma.auditLog.create as any).mockResolvedValue({});

      await expect(
        authService.loginWithPassword("bma-ctg", "test@bma.org", "wrong-pass")
      ).rejects.toThrowError(/Invalid email or password/);

      expect(prisma.auditLog.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          action: "AUTH:LOGIN_FAILED",
          actorId: "usr-123",
        }),
      });
    });
  });
});
