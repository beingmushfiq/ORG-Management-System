import {
  Controller,
  Get,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { TenantGuard } from "../../common/guards/tenant.guard";
import { PermissionGuard } from "../../common/guards/permission.guard";
import { RequirePermission } from "../../common/decorators/require-permission.decorator";
import { prisma } from "@org/database";

@Controller("audit")
@UseGuards(JwtAuthGuard, TenantGuard, PermissionGuard)
export class AuditController {
  @Get("logs")
  @RequirePermission("SETTINGS", "MANAGE")
  async getAuditLogs(
    @Req() req: any,
    @Query("action") action?: string,
    @Query("page") page?: string,
    @Query("limit") limit?: string
  ) {
    const pageNum = Math.max(1, parseInt(page || "1", 10));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit || "30", 10)));
    const skip = (pageNum - 1) * limitNum;

    const where: any = { organizationId: req.organizationId };
    if (action) {
      where.action = { contains: action };
    }

    const [total, items] = await Promise.all([
      prisma.auditLog.count({ where }),
      prisma.auditLog.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { timestamp: "desc" },
      }),
    ]);

    return {
      data: items,
      meta: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
    };
  }
}
