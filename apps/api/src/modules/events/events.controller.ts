import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { TenantGuard } from "../../common/guards/tenant.guard";
import { PermissionGuard } from "../../common/guards/permission.guard";
import { RequirePermission } from "../../common/decorators/require-permission.decorator";
import { prisma } from "@org/database";

@Controller("events")
@UseGuards(JwtAuthGuard, TenantGuard, PermissionGuard)
export class EventsController {
  constructor() {}

  @Get()
  @RequirePermission("EVENTS", "VIEW")
  async listEvents(@Req() req: any) {
    return prisma.event.findMany({
      where: { organizationId: req.organizationId },
      orderBy: { startTime: "desc" },
      include: {
        branchNode: { select: { name: true, code: true } },
        _count: { select: { attendanceLogs: true } },
      },
    });
  }

  @Get(":id")
  @RequirePermission("EVENTS", "VIEW")
  async getEvent(@Req() req: any, @Param("id") id: string) {
    return prisma.event.findFirst({
      where: { id, organizationId: req.organizationId },
      include: {
        branchNode: true,
        attendanceLogs: {
          include: {
            user: {
              select: { fullName: true, phone: true, email: true },
            },
          },
        },
      },
    });
  }

  @Post()
  @RequirePermission("EVENTS", "CREATE")
  async createEvent(@Req() req: any, @Body() body: any) {
    return prisma.event.create({
      data: {
        organizationId: req.organizationId,
        title: body.title,
        titleBn: body.titleBn ?? null,
        description: body.description ?? null,
        venue: body.venue,
        venueBn: body.venueBn ?? null,
        startTime: new Date(body.startTime),
        endTime: new Date(body.endTime),
        ticketFeePaisa: BigInt(body.ticketFeePaisa || 0),
        branchNodeId: body.branchNodeId || null,
        isPublic: body.isPublic !== false,
      },
    });
  }

  @Post(":id/checkin")
  @RequirePermission("EVENTS", "MANAGE")
  async checkInAttendee(
    @Req() req: any,
    @Param("id") eventId: string,
    @Body("userId") userId: string
  ) {
    // Prevent duplicate check-in
    const existing = await prisma.attendanceLog.findUnique({
      where: {
        organizationId_eventId_userId: {
          organizationId: req.organizationId,
          eventId,
          userId,
        },
      },
    });

    if (existing) {
      return {
        status: "ALREADY_CHECKED_IN",
        scannedAt: existing.scannedAt,
        message: "Delegate is already checked in for this event.",
      };
    }

    const log = await prisma.attendanceLog.create({
      data: {
        organizationId: req.organizationId,
        eventId,
        userId,
        verifiedById: req.user.id,
      },
    });

    return {
      status: "SUCCESS",
      scannedAt: log.scannedAt,
      message: "Check-in verified successfully.",
    };
  }
}
