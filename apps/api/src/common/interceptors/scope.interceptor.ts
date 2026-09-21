import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { ClsService } from "nestjs-cls";
import { CLS_TENANT_KEY, CLS_USER_KEY } from "./tenant-context.interceptor";
import { prisma } from "@org/database";

export const CLS_SCOPE_PATHS_KEY = "CURRENT_ALLOWED_BRANCH_PATHS";
export const CLS_IS_ROOT_SCOPE = "CURRENT_IS_ROOT_SCOPE";

@Injectable()
export class ScopeInterceptor implements NestInterceptor {
  constructor(private readonly cls: ClsService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const tenantId = this.cls.get<string>(CLS_TENANT_KEY);
    const userId = this.cls.get<string>(CLS_USER_KEY);

    if (!tenantId || !userId) {
      return next.handle();
    }

    const now = new Date();

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

    let isRootScope = false;
    const allowedPaths: string[] = [];

    for (const pos of activePositions) {
      if (pos.position.isCentralRole || pos.branchNode.depth === 0) {
        isRootScope = true;
        break;
      }
      allowedPaths.push(pos.branchNode.materializedPath);
    }

    this.cls.set(CLS_IS_ROOT_SCOPE, isRootScope);
    this.cls.set(CLS_SCOPE_PATHS_KEY, allowedPaths);

    // Attach to request object for convenient controller access
    const request = context.switchToHttp().getRequest();
    request.scope = {
      isRootScope,
      allowedPaths,
    };

    return next.handle();
  }
}
