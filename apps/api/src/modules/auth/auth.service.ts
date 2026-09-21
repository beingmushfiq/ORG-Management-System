import { Injectable, BadRequestException, UnauthorizedException } from "@nestjs/common";
import * as crypto from "crypto";

export interface UserPositionClaim {
  id: string;
  positionTitle: string;
  positionTitleBn: string;
  branchNodeId: string;
  branchName: string;
  materializedPath: string;
  isCentralRole: boolean;
  permissions: string[];
}

export interface AuthenticatedSession {
  accessToken: string;
  userId: string;
  fullName: string;
  phone: string;
  email?: string | undefined;
  organizationId: string;
  membershipNumber: string;
  tier: "ASSOCIATE" | "GENERAL" | "LIFE" | "HONORARY";
  positions: UserPositionClaim[];
  activePosition: UserPositionClaim;
}

interface StoredOtp {
  code: string;
  phone: string;
  organizationId: string;
  expiresAt: number;
}

@Injectable()
export class AuthService {
  // In-memory OTP storage for demonstration / testing (in production, backed by Redis)
  private readonly otpStore = new Map<string, StoredOtp>();

  /**
   * Normalizes Bangladeshi mobile numbers into international E.164 format (+8801XXXXXXXXX)
   */
  normalizePhoneNumber(phone: string): string {
    const digits = phone.replace(/[^0-9]/g, "");
    if (digits.startsWith("8801") && digits.length === 13) {
      return `+${digits}`;
    }
    if (digits.startsWith("01") && digits.length === 11) {
      return `+88${digits}`;
    }
    if (digits.startsWith("1") && digits.length === 10) {
      return `+880${digits}`;
    }
    throw new BadRequestException(
      "Invalid mobile phone number. Please enter a valid 11-digit Bangladeshi number (e.g. 017XXXXXXXX)"
    );
  }

  /**
   * Generates a 6-digit SMS login code with 3-minute expiry
   */
  generateSmsOtp(organizationId: string, phone: string): { phone: string; code: string; messageBn: string } {
    const normalizedPhone = this.normalizePhoneNumber(phone);
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 3 * 60 * 1000; // 3 minutes

    this.otpStore.set(normalizedPhone, {
      code,
      phone: normalizedPhone,
      organizationId,
      expiresAt,
    });

    return {
      phone: normalizedPhone,
      code,
      messageBn: `আপনার লগইন ওটিপি (OTP) কোড হল: ${code}। এই কোডটি ৩ মিনিট পর্যন্ত কার্যকর থাকবে।`,
    };
  }

  /**
   * Verifies the SMS OTP and produces the active user session with their positions
   */
  verifySmsOtp(phone: string, inputCode: string): AuthenticatedSession {
    const normalizedPhone = this.normalizePhoneNumber(phone);
    const stored = this.otpStore.get(normalizedPhone);

    if (!stored) {
      throw new UnauthorizedException("No active OTP request found for this mobile number. Please request a new code.");
    }

    if (Date.now() > stored.expiresAt) {
      this.otpStore.delete(normalizedPhone);
      throw new UnauthorizedException("OTP code has expired. Please request a new code.");
    }

    if (stored.code !== inputCode.trim()) {
      throw new UnauthorizedException("Incorrect verification code. Please check and try again.");
    }

    // Clear used OTP
    this.otpStore.delete(normalizedPhone);

    // Mock realistic user positions (e.g. Dr. Mujibul holding Central and Branch posts)
    const positions: UserPositionClaim[] = [
      {
        id: "pos-1",
        positionTitle: "President",
        positionTitleBn: "সভাপতি",
        branchNodeId: "b-root",
        branchName: "Central Executive Secretariat",
        materializedPath: "/root",
        isCentralRole: true,
        permissions: ["MEMBERS:APPROVE", "FINANCE:APPROVE", "GOVERNANCE:MINUTES", "NOTICES:PUBLISH"],
      },
      {
        id: "pos-2",
        positionTitle: "Branch President",
        positionTitleBn: "শাখা সভাপতি",
        branchNodeId: "b-ctg",
        branchName: "Chattogram Division Secretariat",
        materializedPath: "/root/ctg",
        isCentralRole: false,
        permissions: ["MEMBERS:ENDORSE", "FINANCE:VIEW", "NOTICES:PUBLISH"],
      },
    ];

    const tokenPayload = `${normalizedPhone}|${Date.now()}`;
    const accessToken = crypto.createHash("sha256").update(tokenPayload).digest("hex");

    return {
      accessToken,
      userId: `usr-${normalizedPhone.slice(-4)}`,
      fullName: "Prof. Dr. Mujibul Haque",
      phone: normalizedPhone,
      email: "dr.mujibul@bma-ctg.org",
      organizationId: stored.organizationId,
      membershipNumber: "BMA-LIFE-0001",
      tier: "LIFE",
      positions,
      activePosition: positions[0]!,
    };
  }

  /**
   * Switches the active position context without needing to log in again
   */
  switchActivePosition(session: AuthenticatedSession, targetPositionId: string): AuthenticatedSession {
    const target = session.positions.find((p) => p.id === targetPositionId);
    if (!target) {
      throw new BadRequestException("You do not hold this organizational position.");
    }

    return {
      ...session,
      activePosition: target,
    };
  }
}
