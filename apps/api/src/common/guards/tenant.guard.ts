import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";
import { ClsService } from "nestjs-cls";
import { CLS_TENANT_KEY } from "../interceptors/tenant-context.interceptor";
import { prisma } from "@org/database";

@Injectable()
export class TenantGuard implements CanActivate {
  constructor(private readonly cls: ClsService) {}

  async canActivate(_context: ExecutionContext): Promise<boolean> {
    const tenantId = this.cls.get<string>(CLS_TENANT_KEY);

    if (!tenantId) {
      throw new ForbiddenException("[SECURITY_BOUNDARY] Organization context missing.");
    }

    // Verify tenant exists and is in ACTIVE status
    const tenant = await prisma.organization.findUnique({
      where: { id: tenantId },
      select: { id: true, status: true },
    });

    if (!tenant) {
      throw new ForbiddenException("[SECURITY_BOUNDARY] Organization not found.");
    }

    if (tenant.status !== "ACTIVE" && tenant.status !== "TRIAL") {
      throw new ForbiddenException(
        `[SECURITY_BOUNDARY] Organization access suspended (${tenant.status}).`
      );
    }

    return true;
  }
}
