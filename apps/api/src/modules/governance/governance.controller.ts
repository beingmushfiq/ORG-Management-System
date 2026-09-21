import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { GovernanceService } from "./governance.service";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { TenantGuard } from "../../common/guards/tenant.guard";
import { PermissionGuard } from "../../common/guards/permission.guard";
import { RequirePermission } from "../../common/decorators/require-permission.decorator";
import { MeetingStatus } from "@org/database";

@Controller("governance")
@UseGuards(JwtAuthGuard, TenantGuard, PermissionGuard)
export class GovernanceController {
  constructor(private readonly governanceService: GovernanceService) {}

  @Get("meetings")
  @RequirePermission("GOVERNANCE", "VIEW")
  async listMeetings(@Req() req: any, @Query("status") status?: MeetingStatus) {
    return this.governanceService.listMeetings(req.organizationId, status);
  }

  @Get("meetings/:id")
  @RequirePermission("GOVERNANCE", "VIEW")
  async getMeeting(@Req() req: any, @Param("id") id: string) {
    return this.governanceService.getMeetingById(req.organizationId, id);
  }

  @Post("meetings")
  @RequirePermission("GOVERNANCE", "CREATE")
  async createMeeting(@Req() req: any, @Body() body: any) {
    return this.governanceService.createMeeting(req.organizationId, body);
  }

  @Patch("meetings/:id/schedule")
  @Post("meetings/:id/schedule")
  @RequirePermission("GOVERNANCE", "CREATE")
  async scheduleMeeting(@Req() req: any, @Param("id") id: string) {
    return this.governanceService.scheduleMeeting(req.organizationId, id);
  }

  @Patch("meetings/:id/minutes")
  @Post("meetings/:id/minutes")
  @RequirePermission("GOVERNANCE", "CREATE")
  async recordMinutes(
    @Req() req: any,
    @Param("id") id: string,
    @Body() body: any
  ) {
    return this.governanceService.recordMinutes(req.organizationId, id, {
      ...body,
      recordedById: req.user.id,
    });
  }

  @Patch("meetings/:id/approve")
  @Post("meetings/:id/approve")
  @RequirePermission("GOVERNANCE", "APPROVE")
  async approveMinutes(@Req() req: any, @Param("id") id: string) {
    return this.governanceService.approveMinutes(
      req.organizationId,
      id,
      req.user.id
    );
  }

  @Get("resolutions")
  @RequirePermission("GOVERNANCE", "VIEW")
  async listResolutions(@Req() req: any) {
    return this.governanceService.listResolutions(req.organizationId);
  }

  @Post("quorum-check")
  async checkQuorum(@Body() body: any) {
    return this.governanceService.calculateQuorum(body);
  }
}
