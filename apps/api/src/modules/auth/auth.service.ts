import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  ConflictException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as crypto from "crypto";
import * as bcrypt from "bcryptjs";
import { prisma } from "@org/database";
import { Response } from "express";

export interface UserPositionClaim {
  id: string;
  positionTitle: string;
  positionTitleBn?: string | null;
  branchNodeId: string;
  branchName: string;
  materializedPath: string;
  isCentralRole: boolean;
  permissions: string[];
}

export interface AuthenticatedSession {
  accessToken: string;
  refreshToken: string;
  userId: string;
  fullName: string;
  fullNameBn?: string | null;
  phone: string;
  email?: string | null;
  organizationId: string;
  organizationName: string;
  membershipNumber?: string | null;
  tier?: string | null;
  positions: UserPositionClaim[];
  activePosition: UserPositionClaim | null;
}

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

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
   * Generates a 6-digit cryptographically secure SMS OTP with 5-minute expiry.
   * Enforces 60-second rate-limiting and hashes code before database persistence.
   */
  async sendSmsOtp(
    organizationSlug: string,
    phone: string
  ): Promise<{ phone: string; expiresInSeconds: number; message: string; debugCode?: string }> {
    const normalizedPhone = this.normalizePhoneNumber(phone);

    // 1. Resolve Organization
    const organization = await prisma.organization.findUnique({
      where: { slug: organizationSlug },
      select: { id: true, name: true, status: true },
    });

    if (!organization || (organization.status !== "ACTIVE" && organization.status !== "TRIAL")) {
      throw new BadRequestException("Organization not found or inactive.");
    }

    // 2. Rate Limiting Check: Max 1 OTP per 60 seconds
    const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
    const recentOtp = await prisma.authOtp.findFirst({
      where: {
        organizationId: organization.id,
        phone: normalizedPhone,
        createdAt: { gte: oneMinuteAgo },
      },
    });

    if (recentOtp) {
      throw new ConflictException(
        "A verification code was recently sent. Please wait 60 seconds before requesting another."
      );
    }

    // 3. Cryptographically Secure 6-Digit Random Code (100000 - 999999)
    const code = crypto.randomInt(100000, 1000000).toString();
    const codeHash = await bcrypt.hash(code, 10);
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // 4. Save to Database
    await prisma.authOtp.create({
      data: {
        organizationId: organization.id,
        phone: normalizedPhone,
        codeHash,
        expiresAt,
        maxAttempts: 3,
        attempts: 0,
      },
    });

    // 5. Audit Log Entry
    await prisma.auditLog.create({
      data: {
        organizationId: organization.id,
        actorId: normalizedPhone,
        action: "AUTH:OTP_REQUESTED",
        targetEntity: "AuthOtp",
        targetId: normalizedPhone,
        diffJson: { phone: normalizedPhone.slice(0, 7) + "****" },
      },
    });

    return {
      phone: normalizedPhone,
      expiresInSeconds: 300,
      message: `Verification code sent to ${normalizedPhone.slice(0, 6)}*****. Valid for 5 minutes.`,
      // Expose debugCode only in local development / testing
      ...(process.env["NODE_ENV"] !== "production" ? { debugCode: code } : {}),
    };
  }

  /**
   * Verifies the SMS OTP, enforces max attempts, revokes consumed code,
   * creates a database UserSession, and issues signed JWT tokens.
   */
  async verifySmsOtp(
    organizationSlug: string,
    phone: string,
    inputCode: string,
    res?: Response
  ): Promise<AuthenticatedSession> {
    const normalizedPhone = this.normalizePhoneNumber(phone);

    const organization = await prisma.organization.findUnique({
      where: { slug: organizationSlug },
      select: { id: true, name: true, status: true },
    });

    if (!organization) {
      throw new BadRequestException("Organization not found.");
    }

    const now = new Date();

    // 1. Fetch latest active unconsumed OTP
    const storedOtp = await prisma.authOtp.findFirst({
      where: {
        organizationId: organization.id,
        phone: normalizedPhone,
        consumedAt: null,
        expiresAt: { gt: now },
      },
      orderBy: { createdAt: "desc" },
    });

    if (!storedOtp) {
      throw new UnauthorizedException(
        "Verification code has expired or was not requested. Please request a new code."
      );
    }

    // 2. Check Max Attempts
    if (storedOtp.attempts >= storedOtp.maxAttempts) {
      await prisma.authOtp.update({
        where: { id: storedOtp.id },
        data: { consumedAt: now },
      });
      throw new UnauthorizedException(
        "Maximum verification attempts exceeded. Please request a new code."
      );
    }

    // 3. Verify Code Hash
    const isMatch = await bcrypt.compare(inputCode.trim(), storedOtp.codeHash);
    if (!isMatch) {
      const updatedAttempts = storedOtp.attempts + 1;
      await prisma.authOtp.update({
        where: { id: storedOtp.id },
        data: { attempts: updatedAttempts },
      });

      const remaining = storedOtp.maxAttempts - updatedAttempts;
      throw new UnauthorizedException(
        `Incorrect verification code. ${remaining > 0 ? `${remaining} attempt(s) remaining.` : "Code locked."}`
      );
    }

    // 4. Mark Code Consumed
    await prisma.authOtp.update({
      where: { id: storedOtp.id },
      data: { consumedAt: now },
    });

    // 5. Look up User or create member placeholder
    let user = await prisma.user.findFirst({
      where: {
        organizationId: organization.id,
        phone: normalizedPhone,
      },
      include: {
        userPositions: {
          where: { isActive: true },
          include: { position: true, branchNode: true },
        },
        memberships: {
          take: 1,
        },
      },
    });

    if (!user) {
      // Create user record for verified mobile identity
      user = await prisma.user.create({
        data: {
          organizationId: organization.id,
          phone: normalizedPhone,
          email: `${normalizedPhone.replace("+", "")}@orgms.internal`,
          passwordHash: await bcrypt.hash(crypto.randomBytes(16).toString("hex"), 10),
          fullName: "Verified Member",
        },
        include: {
          userPositions: {
            where: { isActive: true },
            include: { position: true, branchNode: true },
          },
          memberships: true,
        },
      });
    }

    return this.createSessionAndResponse(user, organization, res);
  }

  /**
   * Authenticates with Email and Password using bcrypt.
   */
  async loginWithPassword(
    organizationSlug: string,
    email: string,
    password: string,
    res?: Response
  ): Promise<AuthenticatedSession> {
    const organization = await prisma.organization.findUnique({
      where: { slug: organizationSlug },
      select: { id: true, name: true, status: true },
    });

    if (!organization) {
      throw new BadRequestException("Organization not found.");
    }

    const user = await prisma.user.findFirst({
      where: {
        organizationId: organization.id,
        email: email.toLowerCase().trim(),
      },
      include: {
        userPositions: {
          where: { isActive: true },
          include: { position: true, branchNode: true },
        },
        memberships: {
          take: 1,
        },
      },
    });

    if (!user) {
      // Constant-time dummy comparison to prevent timing attacks
      await bcrypt.compare(password, "$2b$10$EpRnTzVlqHNP0.fUbXUwSOyUIXe/0FgpT3N.rYqWwzLqfI4p2FkK.");
      throw new UnauthorizedException("Invalid email or password.");
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      await prisma.auditLog.create({
        data: {
          organizationId: organization.id,
          actorId: user.id,
          action: "AUTH:LOGIN_FAILED",
          targetEntity: "User",
          targetId: user.id,
          diffJson: { reason: "Password mismatch" },
        },
      });
      throw new UnauthorizedException("Invalid email or password.");
    }

    return this.createSessionAndResponse(user, organization, res);
  }

  /**
   * Switches active operational position for an authenticated user.
   */
  async switchActivePosition(
    userId: string,
    organizationId: string,
    targetPositionId: string,
    res?: Response
  ): Promise<AuthenticatedSession> {
    const user = await prisma.user.findFirst({
      where: { id: userId, organizationId },
      include: {
        userPositions: {
          where: { isActive: true },
          include: { position: true, branchNode: true },
        },
        memberships: { take: 1 },
      },
    });

    if (!user) {
      throw new UnauthorizedException("User not found.");
    }

    const organization = await prisma.organization.findUnique({
      where: { id: organizationId },
      select: { id: true, name: true, status: true },
    });

    if (!organization) {
      throw new BadRequestException("Organization not found.");
    }

    const target = user.userPositions.find((p) => p.id === targetPositionId);
    if (!target) {
      throw new BadRequestException("You do not hold this active organizational position.");
    }

    return this.createSessionAndResponse(user, organization, res, targetPositionId);
  }

  /**
   * Logs out the user by revoking the database session and clearing cookies.
   */
  async logout(userId: string, organizationId: string, sessionId?: string, res?: Response) {
    if (sessionId) {
      await prisma.userSession.updateMany({
        where: { id: sessionId, userId, organizationId },
        data: { isRevoked: true },
      });
    }

    if (res) {
      res.clearCookie("access_token", { path: "/" });
      res.clearCookie("refresh_token", { path: "/" });
    }

    await prisma.auditLog.create({
      data: {
        organizationId,
        actorId: userId,
        action: "AUTH:LOGOUT",
        targetEntity: "UserSession",
        targetId: sessionId || userId,
      },
    });

    return { success: true, message: "Logged out successfully." };
  }

  /**
   * Builds claims, writes UserSession to DB, sets HttpOnly cookies, and signs JWT.
   */
  private async createSessionAndResponse(
    user: any,
    organization: any,
    res?: Response,
    explicitActivePositionId?: string
  ): Promise<AuthenticatedSession> {
    const positions: UserPositionClaim[] = user.userPositions.map((up: any) => ({
      id: up.id,
      positionTitle: up.position.title,
      positionTitleBn: up.position.titleBn,
      branchNodeId: up.branchNode.id,
      branchName: up.branchNode.name,
      materializedPath: up.branchNode.materializedPath,
      isCentralRole: up.position.isCentralRole || up.branchNode.depth === 0,
      permissions: [
        ...((up.position.defaultPermissions as string[]) || []),
        ...((up.customPermissions as string[]) || []),
      ],
    }));

    const activePosition = explicitActivePositionId
      ? positions.find((p) => p.id === explicitActivePositionId) || positions[0] || null
      : positions[0] || null;

    // 1. Create DB-backed UserSession
    const refreshTokenPlain = crypto.randomBytes(32).toString("hex");
    const refreshTokenHash = await bcrypt.hash(refreshTokenPlain, 10);
    const sessionExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    const session = await prisma.userSession.create({
      data: {
        userId: user.id,
        organizationId: organization.id,
        refreshTokenHash,
        expiresAt: sessionExpiresAt,
        isRevoked: false,
      },
    });

    // 2. Sign JWT Access Token (15m expiry)
    const tokenPayload = {
      sub: user.id,
      organizationId: organization.id,
      email: user.email,
      phone: user.phone,
      activePositionId: activePosition?.id,
      sessionId: session.id,
    };

    const accessToken = this.jwtService.sign(tokenPayload, {
      expiresIn: "15m",
      secret: process.env["JWT_ACCESS_SECRET"] || "institutional-os-default-secret-min-32-chars",
    });

    const refreshToken = this.jwtService.sign(
      { sub: user.id, sessionId: session.id, token: refreshTokenPlain },
      {
        expiresIn: "7d",
        secret: process.env["JWT_REFRESH_SECRET"] || "institutional-os-refresh-secret-min-32-chars",
      }
    );

    // 3. Set Secure HttpOnly Cookies
    if (res) {
      const isProd = process.env["NODE_ENV"] === "production";
      res.cookie("access_token", accessToken, {
        httpOnly: true,
        secure: isProd,
        sameSite: "lax",
        maxAge: 15 * 60 * 1000,
        path: "/",
      });

      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: isProd,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/",
      });
    }

    // 4. Record Audit Log
    await prisma.auditLog.create({
      data: {
        organizationId: organization.id,
        actorId: user.id,
        action: "AUTH:LOGIN_SUCCESS",
        targetEntity: "User",
        targetId: user.id,
        diffJson: {
          sessionId: session.id,
          activePosition: activePosition?.positionTitle || "Member",
        },
      },
    });

    const membership = user.memberships?.[0] || null;

    return {
      accessToken,
      refreshToken,
      userId: user.id,
      fullName: user.fullName,
      fullNameBn: user.fullNameBn,
      phone: user.phone,
      email: user.email,
      organizationId: organization.id,
      organizationName: organization.name,
      membershipNumber: membership?.membershipNumber || null,
      tier: membership?.tier || null,
      positions,
      activePosition,
    };
  }
}
