import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UnauthorizedException,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { ClsService } from "nestjs-cls";

export const CLS_TENANT_KEY = "CURRENT_TENANT_ID";
export const CLS_USER_KEY = "CURRENT_USER_ID";
export const CLS_POSITIONS_KEY = "CURRENT_USER_POSITIONS";

@Injectable()
export class TenantContextInterceptor implements NestInterceptor {
  constructor(private readonly cls: ClsService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    
    // 1. Check x-tenant-id injected by Next.js Edge Middleware or Authorization token claims
    const tenantId =
      request.headers["x-tenant-id"] ||
      request.user?.organizationId ||
      request.headers["x-organization-id"];

    if (!tenantId && !request.url.startsWith("/api/public/health")) {
      throw new UnauthorizedException(
        "[TENANT_ISOLATION_ERROR] Missing tenant context header or authorization claim."
      );
    }

    // 2. Bind into AsyncLocalStorage via ClsService (Cannot be forged downstream)
    this.cls.set(CLS_TENANT_KEY, tenantId);

    if (request.user) {
      this.cls.set(CLS_USER_KEY, request.user.id);
      this.cls.set(CLS_POSITIONS_KEY, request.user.positions || []);
    }

    return next.handle();
  }
}
