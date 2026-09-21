import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";
import { prisma } from "@org/database";

export interface JwtPayload {
  sub: string;
  organizationId: string;
  email?: string;
  phone?: string;
  activePositionId?: string;
  sessionId?: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.["access_token"] || null;
        },
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey:
        process.env["JWT_ACCESS_SECRET"] ||
        "institutional-os-default-secret-min-32-chars",
    });
  }

  async validate(payload: JwtPayload) {
    if (!payload.sub || !payload.organizationId) {
      throw new UnauthorizedException("Invalid token claims.");
    }

    // Verify user exists and belongs to the specified organization
    const user = await prisma.user.findFirst({
      where: {
        id: payload.sub,
        organizationId: payload.organizationId,
      },
      select: {
        id: true,
        email: true,
        phone: true,
        fullName: true,
        fullNameBn: true,
        organizationId: true,
        userPositions: {
          where: { isActive: true },
          include: {
            position: true,
            branchNode: true,
          },
        },
        memberships: {
          take: 1,
          select: {
            tier: true,
            status: true,
            membershipNumber: true,
          },
        },
      },
    });

    if (!user) {
      throw new UnauthorizedException("User session no longer valid.");
    }

    return {
      id: user.id,
      email: user.email,
      phone: user.phone,
      fullName: user.fullName,
      fullNameBn: user.fullNameBn,
      organizationId: user.organizationId,
      activePositionId: payload.activePositionId,
      sessionId: payload.sessionId,
      positions: user.userPositions,
      membership: user.memberships[0] || null,
    };
  }
}
