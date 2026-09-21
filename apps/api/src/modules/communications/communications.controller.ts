import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UseGuards,
} from "@nestjs/common";
import { CommunicationsService } from "./communications.service";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { TenantGuard } from "../../common/guards/tenant.guard";
import { PermissionGuard } from "../../common/guards/permission.guard";
import { RequirePermission } from "../../common/decorators/require-permission.decorator";
import { prisma } from "@org/database";

@Controller("communications")
@UseGuards(JwtAuthGuard, TenantGuard, PermissionGuard)
export class CommunicationsController {
  constructor(private readonly commsService: CommunicationsService) {}

  @Post("broadcast")
  @RequirePermission("COMMUNICATIONS", "BROADCAST")
  async broadcast(
    @Req() req: any,
    @Body()
    body: {
      messageBn: string;
      messageEn?: string;
      targetBranchPath?: string;
    }
  ) {
    // Query recipient mobile numbers
    const members = await prisma.user.findMany({
      where: {
        organizationId: req.organizationId,
      },
      select: { phone: true, fullName: true },
      take: 500,
    });

    const recipients = members.map((m) => ({
      mobile: m.phone,
      name: m.fullName,
      branchPath: body.targetBranchPath || "1",
    }));

    const result = await this.commsService.dispatchEmergencyBroadcast(
      {
        organizationId: req.organizationId,
        provider: "SSL_WIRELESS",
        apiKey: process.env.SMS_API_KEY || "test_key",
        senderId: "ORG-MS",
        isApprovedMasking: true,
      },
      {
        organizationId: req.organizationId,
        senderId: "ORG-MS",
        targetBranchNodePathPrefix: body.targetBranchPath,
        messageHeadline: body.messageBn,
        noticeUrl: "https://org.app",
        recipients,
        locale: "bn",
      }
    );

    await prisma.auditLog.create({
      data: {
        organizationId: req.organizationId,
        actorId: req.user.id,
        action: "COMMUNICATIONS:BROADCAST_DISPATCHED",
        targetEntity: "Communications",
        targetId: result.broadcastId,
        diffJson: { recipientCount: recipients.length },
      },
    });

    return result;
  }

  @Get("notices")
  @RequirePermission("COMMUNICATIONS", "VIEW")
  async listNotices(@Req() req: any) {
    return prisma.notice.findMany({
      where: { organizationId: req.organizationId },
      orderBy: { publishedAt: "desc" },
    });
  }

  @Post("notices")
  @RequirePermission("COMMUNICATIONS", "SMS_SEND")
  async createNotice(@Req() req: any, @Body() body: any) {
    const notice = await prisma.notice.create({
      data: {
        organizationId: req.organizationId,
        title: body.title,
        titleBn: body.titleBn ?? null,
        contentHtml: body.contentHtml,
        contentHtmlBn: body.contentHtmlBn ?? null,
        isPublic: body.isPublic !== false,
        isPinned: body.isPinned === true,
      },
    });

    await prisma.auditLog.create({
      data: {
        organizationId: req.organizationId,
        actorId: req.user.id,
        action: "NOTICES:PUBLISHED",
        targetEntity: "Notice",
        targetId: notice.id,
      },
    });

    return notice;
  }
}
