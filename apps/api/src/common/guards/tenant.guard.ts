import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";
import { ClsService } from "nestjs-cls";
import { CLS_TENANT_KEY, CLS_USER_KEY } from "../interceptors/tenant-context.interceptor";
import { prisma } from "@org/database";

@Injectable()
export class TenantGuard implements CanActivate {
  constructor(private readonly cls: ClsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    let tenantId =
      this.cls.get<string>(CLS_TENANT_KEY) ||
      request.user?.organizationId ||
      request.organizationId;

    if (!tenantId) {
      const requestedSlug =
        request.query?.org ||
        request.query?.slug ||
        request.params?.slug ||
        request.body?.organizationSlug ||
        "rsm-bd";

      const org = await prisma.organization.findFirst({
        where: { slug: requestedSlug, status: { in: ["ACTIVE", "TRIAL"] } },
        select: { id: true, status: true },
      });
      if (org) {
        tenantId = org.id;
      }
    }

    if (!tenantId) {
      throw new ForbiddenException("[SECURITY_BOUNDARY] Organization context missing.");
    }

    this.cls.set(CLS_TENANT_KEY, tenantId);
    request.organizationId = tenantId;

    if (request.user?.id) {
      this.cls.set(CLS_USER_KEY, request.user.id);
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
