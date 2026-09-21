import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UnauthorizedException,
  ForbiddenException,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { ClsService } from "nestjs-cls";
import { prisma } from "@org/database";

export const CLS_TENANT_KEY = "CURRENT_TENANT_ID";
export const CLS_USER_KEY = "CURRENT_USER_ID";
export const CLS_POSITIONS_KEY = "CURRENT_USER_POSITIONS";

@Injectable()
export class TenantContextInterceptor implements NestInterceptor {
  constructor(private readonly cls: ClsService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const url: string = request.url || "";

    // Platform routes that bypass per-tenant scoping
    if (
      url === "/api" ||
      url === "/api/" ||
      url === "/api/health" ||
      url === "/health" ||
      url.includes("/api/public") ||
      url.includes("/public") ||
      url.includes("/api/superadmin")
    ) {
      return next.handle();
    }

    let tenantId: string | undefined;

    // 1. Authenticated Context: Derived strictly from verified JWT claims
    // The client CANNOT forge or override this via headers.
    if (request.user?.organizationId) {
      const userOrgId: string = request.user.organizationId;
      tenantId = userOrgId;

      // Verify the tenant exists and is not suspended
      const tenant = await prisma.organization.findUnique({
        where: { id: userOrgId },
        select: { id: true, status: true },
      });

      if (!tenant) {
        throw new UnauthorizedException("[TENANT_ISOLATION_ERROR] Organization record not found.");
      }

      if (tenant.status !== "ACTIVE" && tenant.status !== "TRIAL") {
        throw new ForbiddenException(
          `[TENANT_ISOLATION_ERROR] Organization access is suspended (${tenant.status}).`
        );
      }
    } else {
      // 2. Unauthenticated / Public Context: Validate against database by domain or slug
      // Untrusted x-tenant-id headers are STRICTLY IGNORED.
      const hostHeader = (request.headers["host"] || "").split(":")[0]?.toLowerCase();
      let org = null;

      if (hostHeader && hostHeader !== "localhost" && hostHeader !== "127.0.0.1") {
        org = await prisma.organization.findFirst({
          where: {
            OR: [
              { customDomain: hostHeader },
              { slug: hostHeader.split(".")[0] },
            ],
            status: { in: ["ACTIVE", "TRIAL"] },
          },
          select: { id: true, status: true },
        });
      }

      if (!org) {
        // Fallback to explicit validated slug from query, params, or body
        const requestedSlug =
          request.query?.org ||
          request.query?.slug ||
          request.params?.slug ||
          request.body?.organizationSlug;

        if (requestedSlug && typeof requestedSlug === "string") {
          org = await prisma.organization.findFirst({
            where: {
              slug: requestedSlug.toLowerCase(),
              status: { in: ["ACTIVE", "TRIAL"] },
            },
            select: { id: true, status: true },
          });
        }
      }

      if (org) {
        tenantId = org.id;
      }
    }

    if (tenantId) {
      this.cls.set(CLS_TENANT_KEY, tenantId);
      request.organizationId = tenantId;
    }

    if (request.user) {
      this.cls.set(CLS_USER_KEY, request.user.id);
      this.cls.set(CLS_POSITIONS_KEY, request.user.positions || []);
    }

    return next.handle();
  }
}
