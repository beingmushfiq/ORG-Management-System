import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ClsService } from "nestjs-cls";
import {
  PERMISSION_RESOURCE_KEY,
  PERMISSION_ACTION_KEY,
  PermissionAction,
} from "../decorators/require-permission.decorator";
import { CLS_TENANT_KEY, CLS_USER_KEY } from "../interceptors/tenant-context.interceptor";
import { prisma } from "@org/database";

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly cls: ClsService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const resource = this.reflector.get<string>(
      PERMISSION_RESOURCE_KEY,
      context.getHandler()
    );
    const action = this.reflector.get<PermissionAction>(
      PERMISSION_ACTION_KEY,
      context.getHandler()
    );

    // If no permission decorator is specified, allow access (public within tenant)
    if (!resource || !action) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const tenantId =
      this.cls.get<string>(CLS_TENANT_KEY) ||
      request.user?.organizationId ||
      request.organizationId;
    const userId = this.cls.get<string>(CLS_USER_KEY) || request.user?.id;

    if (!userId || !tenantId) {
      throw new ForbiddenException("[PERMISSION_DENIED] Unauthenticated request.");
    }

    const now = new Date();

    // 1. Load active positions for user in current tenant
    const activePositions = await prisma.userPosition.findMany({
      where: {
        organizationId: tenantId,
        userId: userId,
        isActive: true,
        termStartDate: { lte: now },
        OR: [{ termEndDate: null }, { termEndDate: { gte: now } }],
      },
      include: {
        position: true,
        branchNode: true,
      },
    });

    if (!activePositions || activePositions.length === 0) {
      throw new ForbiddenException(
        "[PERMISSION_DENIED] No active executive position found in this organization."
      );
    }

    const requiredGrant = `${resource.toUpperCase()}:${action.toUpperCase()}`;
    const allGrant = `${resource.toUpperCase()}:ALL`;

    let hasPermission = false;

    for (const userPos of activePositions) {
      // Check if root President or General Secretary (depth === 0)
      if (userPos.position.isCentralRole || userPos.branchNode.depth === 0) {
        // Root officers have broad authority
        hasPermission = true;
        break;
      }

      // Check default permissions & custom overrides
      const defaultGrants = (userPos.position.defaultPermissions as string[]) || [];
      const customGrants = (userPos.customPermissions as string[]) || [];
      const allPosGrants = [...defaultGrants, ...customGrants];

      if (
        allPosGrants.includes(requiredGrant) ||
        allPosGrants.includes(allGrant) ||
        allPosGrants.includes("*")
      ) {
        hasPermission = true;
        break;
      }
    }

    if (!hasPermission) {
      throw new ForbiddenException(
        `[PERMISSION_DENIED] Missing required grant '${requiredGrant}'.`
      );
    }

    return true;
  }
}
