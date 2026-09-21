import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { MembershipService } from "./membership.service";
import { CreateMemberApplicationDto } from "./dto/create-member-application.dto";
import { MemberQueryDto } from "./dto/member-query.dto";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { TenantGuard } from "../../common/guards/tenant.guard";
import { PermissionGuard } from "../../common/guards/permission.guard";
import { RequirePermission } from "../../common/decorators/require-permission.decorator";
import { Public } from "../../common/decorators/public.decorator";
import { MembershipTier } from "@org/database";

@Controller("members")
@UseGuards(JwtAuthGuard, TenantGuard, PermissionGuard)
export class MembersController {
  constructor(private readonly membershipService: MembershipService) {}

  @Get()
  @RequirePermission("MEMBERS", "VIEW")
  async listMembers(@Req() req: any, @Query() query: MemberQueryDto) {
    const isExecutive = req.user.positions?.some(
      (p: any) => p.isCentralRole || p.branchNode?.depth === 0
    );
    const viewerRole = isExecutive ? "EXECUTIVE" : "MEMBER";

    return this.membershipService.listMembers(
      req.organizationId,
      query,
      req.scope,
      viewerRole
    );
  }

  @Get(":id")
  @RequirePermission("MEMBERS", "VIEW")
  async getMember(@Req() req: any, @Param("id") id: string) {
    return this.membershipService.getMemberById(req.organizationId, id);
  }

  @Public()
  @Post("apply")
  async apply(@Body() dto: CreateMemberApplicationDto) {
    return this.membershipService.applyMembership(dto);
  }

  @Patch(":id/endorse")
  @Post(":id/endorse")
  @RequirePermission("MEMBERS", "ENDORSE")
  async endorse(
    @Req() req: any,
    @Param("id") id: string,
    @Body("notes") notes?: string
  ) {
    return this.membershipService.endorseBranch(
      req.organizationId,
      id,
      req.user.id,
      notes
    );
  }

  @Patch(":id/approve")
  @Post(":id/approve")
  @RequirePermission("MEMBERS", "APPROVE")
  async approve(
    @Req() req: any,
    @Param("id") id: string,
    @Body("tier") tier?: MembershipTier
  ) {
    return this.membershipService.approveMembership(
      req.organizationId,
      id,
      req.user.id,
      tier
    );
  }

  @Patch(":id/suspend")
  @Post(":id/suspend")
  @RequirePermission("MEMBERS", "SUSPEND")
  async suspend(
    @Req() req: any,
    @Param("id") id: string,
    @Body("reason") reason: string
  ) {
    return this.membershipService.suspendMembership(
      req.organizationId,
      id,
      req.user.id,
      reason
    );
  }
}
