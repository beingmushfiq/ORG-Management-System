import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Req,
  Res,
  UseGuards,
  BadRequestException,
} from "@nestjs/common";
import { Response } from "express";
import { JwtService } from "@nestjs/jwt";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { prisma, TenantStatus } from "@org/database";

@Controller("superadmin")
@UseGuards(JwtAuthGuard)
export class SuperadminController {
  constructor(private readonly jwtService: JwtService) {}

  @Get("tenants")
  async listTenants() {
    return prisma.organization.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: {
            memberships: true,
            branches: true,
          },
        },
      },
    });
  }

  @Post("tenants")
  async createTenant(
    @Req() req: any,
    @Body()
    body: {
      name: string;
      nameBn?: string;
      slug: string;
      planId?: string;
      contactEmail?: string;
      contactPhone?: string;
    }
  ) {
    const existing = await prisma.organization.findUnique({
      where: { slug: body.slug.toLowerCase().trim() },
    });

    if (existing) {
      throw new BadRequestException("An organization with this slug already exists.");
    }

    const org = await prisma.organization.create({
      data: {
        name: body.name,
        nameBn: body.nameBn ?? null,
        slug: body.slug.toLowerCase().trim(),
        planId: body.planId || "starter",
        status: TenantStatus.ACTIVE,
        contactEmail: body.contactEmail ?? null,
        contactPhone: body.contactPhone ?? null,
      },
    });

    // Create root HQ branch for tenant
    await prisma.branchNode.create({
      data: {
        organizationId: org.id,
        name: "Central Secretariat",
        nameBn: "কেন্দ্রীয় সচিবালয়",
        levelLabel: "HQ",
        depth: 0,
        materializedPath: "1",
      },
    });

    // Create default President & GS positions
    await prisma.position.createMany({
      data: [
        {
          organizationId: org.id,
          title: "President",
          titleBn: "সভাপতি",
          rankOrder: 1,
          isCentralRole: true,
          defaultPermissions: ["*"],
        },
        {
          organizationId: org.id,
          title: "General Secretary",
          titleBn: "সাধারণ সম্পাদক",
          rankOrder: 2,
          isCentralRole: true,
          defaultPermissions: ["*"],
        },
      ],
    });

    await prisma.auditLog.create({
      data: {
        organizationId: org.id,
        actorId: req.user.id,
        action: "PLATFORM:TENANT_PROVISIONED",
        targetEntity: "Organization",
        targetId: org.id,
      },
    });

    return org;
  }

  @Patch("tenants/:id/status")
  async updateTenantStatus(
    @Req() req: any,
    @Param("id") id: string,
    @Body("status") status: TenantStatus
  ) {
    const org = await prisma.organization.update({
      where: { id },
      data: { status },
    });

    await prisma.auditLog.create({
      data: {
        organizationId: org.id,
        actorId: req.user.id,
        action: `PLATFORM:TENANT_STATUS_${status}`,
        targetEntity: "Organization",
        targetId: org.id,
      },
    });

    return org;
  }

  /**
   * Audited Support Impersonation
   * Records explicit reason, target organization, target user, and creates short-lived token.
   */
  @Post("impersonate")
  async startImpersonation(
    @Req() req: any,
    @Res({ passthrough: true }) res: Response,
    @Body()
    body: {
      targetOrganizationId: string;
      targetUserId: string;
      reason: string;
    }
  ) {
    if (!body.reason || body.reason.trim().length < 10) {
      throw new BadRequestException(
        "A detailed operational reason (minimum 10 characters) is required for support impersonation."
      );
    }

    const targetUser = await prisma.user.findFirst({
      where: {
        id: body.targetUserId,
        organizationId: body.targetOrganizationId,
      },
      include: {
        organization: true,
        userPositions: {
          where: { isActive: true },
          include: { position: true, branchNode: true },
        },
      },
    });

    if (!targetUser) {
      throw new BadRequestException("Target user not found in the specified organization.");
    }

    // Write immutable ImpersonationLog
    const log = await prisma.impersonationLog.create({
      data: {
        actorId: req.user.id,
        targetOrganizationId: body.targetOrganizationId,
        targetUserId: body.targetUserId,
        reason: body.reason,
        ipAddress: req.ip || null,
        startedAt: new Date(),
      },
    });

    // Create impersonation token with distinct claims
    const token = this.jwtService.sign(
      {
        sub: targetUser.id,
        organizationId: body.targetOrganizationId,
        isImpersonated: true,
        impersonationLogId: log.id,
        originalActorId: req.user.id,
        activePositionId: targetUser.userPositions[0]?.id,
      },
      {
        expiresIn: "1h", // Short 1-hour maximum impersonation window
        secret: process.env["JWT_ACCESS_SECRET"] || "institutional-os-default-secret-min-32-chars",
      }
    );

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env["NODE_ENV"] === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
      path: "/",
    });

    return {
      success: true,
      impersonationLogId: log.id,
      impersonatedUser: targetUser.fullName,
      targetOrganization: targetUser.organization.name,
      message: `Audited impersonation session started. Acting as ${targetUser.fullName}.`,
    };
  }

  /**
   * Exits active impersonation session and records end time.
   */
  @Post("exit-impersonate")
  async exitImpersonation(
    @Res({ passthrough: true }) res: Response,
    @Body("impersonationLogId") impersonationLogId?: string
  ) {
    if (impersonationLogId) {
      await prisma.impersonationLog.updateMany({
        where: { id: impersonationLogId, endedAt: null },
        data: { endedAt: new Date() },
      });
    }

    res.clearCookie("access_token", { path: "/" });
    return {
      success: true,
      message: "Impersonation session concluded.",
    };
  }
}
