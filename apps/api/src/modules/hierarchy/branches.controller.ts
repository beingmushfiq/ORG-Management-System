import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  UseGuards,
} from "@nestjs/common";
import { HierarchyService } from "./hierarchy.service";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { TenantGuard } from "../../common/guards/tenant.guard";
import { PermissionGuard } from "../../common/guards/permission.guard";
import { RequirePermission } from "../../common/decorators/require-permission.decorator";

@Controller("branches")
@UseGuards(JwtAuthGuard, TenantGuard, PermissionGuard)
export class BranchesController {
  constructor(private readonly hierarchyService: HierarchyService) {}

  @Get()
  @RequirePermission("BRANCHES", "VIEW")
  async listBranches(@Req() req: any) {
    return this.hierarchyService.listBranches(req.organizationId);
  }

  @Get("tree")
  @RequirePermission("BRANCHES", "VIEW")
  async getTree(@Req() req: any) {
    return this.hierarchyService.getBranchTree(req.organizationId);
  }

  @Post()
  @RequirePermission("BRANCHES", "MANAGE")
  async createBranch(@Req() req: any, @Body() body: any) {
    return this.hierarchyService.createBranchNode(req.organizationId, body);
  }

  @Post(":id/move")
  @RequirePermission("BRANCHES", "MANAGE")
  async moveBranch(
    @Req() req: any,
    @Param("id") id: string,
    @Body("newParentId") newParentId: string | null
  ) {
    return this.hierarchyService.moveBranch(req.organizationId, id, newParentId);
  }
}
