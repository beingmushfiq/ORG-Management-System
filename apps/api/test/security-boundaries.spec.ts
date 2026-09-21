import { describe, it, expect, vi, beforeEach } from "vitest";
import { TenantContextInterceptor } from "../src/common/interceptors/tenant-context.interceptor";
import { PermissionGuard } from "../src/common/guards/permission.guard";
import { ScopeInterceptor } from "../src/common/interceptors/scope.interceptor";
import { MembershipService } from "../src/modules/membership/membership.service";
import { ClsService } from "nestjs-cls";
import { ExecutionContext, CallHandler, ForbiddenException, UnauthorizedException, NotFoundException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { of } from "rxjs";
import { PERMISSION_RESOURCE_KEY, PERMISSION_ACTION_KEY } from "../src/common/decorators/require-permission.decorator";

// Mock @org/database
vi.mock("@org/database", () => {
  return {
    prisma: {
      organization: {
        findUnique: vi.fn(),
        findFirst: vi.fn(),
      },
      user: {
        findFirst: vi.fn(),
        findMany: vi.fn(),
        create: vi.fn(),
      },
      membership: {
        findFirst: vi.fn(),
        findMany: vi.fn(),
        count: vi.fn(),
        update: vi.fn(),
        create: vi.fn(),
      },
      membershipHistory: {
        create: vi.fn(),
      },
      userPosition: {
        findMany: vi.fn(),
      },
      auditLog: {
        create: vi.fn(),
      },
    },
    MemberStatus: {
      PENDING_KYC: "PENDING_KYC",
      ACTIVE: "ACTIVE",
      BRANCH_ENDORSED: "BRANCH_ENDORSED",
      SUSPENDED: "SUSPENDED",
    },
    MembershipTier: {
      ASSOCIATE: "ASSOCIATE",
      GENERAL: "GENERAL",
      LIFE: "LIFE",
    },
  };
});

import { prisma } from "@org/database";

describe("Strict Multi-Tenant & Security Boundary Enforcement", () => {
  const TENANT_A_ID = "org-alpha-uuid";
  const TENANT_B_ID = "org-beta-uuid";
  const USER_A_ID = "user-alpha-id";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("1. Header Forgery Resistance (Tenant Boundary Invariant)", () => {
    it("should strictly bind organization context to verified JWT user claim and REJECT client header overrides", async () => {
      const clsMap = new Map<string, any>();
      const mockCls = {
        set: vi.fn((k, v) => clsMap.set(k, v)),
        get: vi.fn((k) => clsMap.get(k)),
      } as unknown as ClsService;

      // Mock organization A exists and is active
      (prisma.organization.findUnique as any).mockResolvedValue({
        id: TENANT_A_ID,
        status: "ACTIVE",
      });

      // User A belongs to Org A
      (prisma.user.findFirst as any).mockResolvedValue({
        id: USER_A_ID,
        organizationId: TENANT_A_ID,
        organization: { id: TENANT_A_ID, status: "ACTIVE" },
      });

      // Attacker sends forged x-tenant-id and x-organization-id headers pointing to Tenant B!
      const mockReq: any = {
        url: "/api/members",
        headers: {
          "x-tenant-id": TENANT_B_ID,
          "x-organization-id": TENANT_B_ID,
          host: "alpha.orgms.app",
        },
        user: {
          id: USER_A_ID,
          organizationId: TENANT_A_ID, // Verified JWT claim
          positions: [],
        },
      };

      const mockContext = {
        switchToHttp: () => ({
          getRequest: () => mockReq,
        }),
      } as unknown as ExecutionContext;

      const mockHandler: CallHandler = {
        handle: () => of({ success: true }),
      };

      const interceptor = new TenantContextInterceptor(mockCls);
      await interceptor.intercept(mockContext, mockHandler);

      // Invariant: The bound tenant ID MUST be Tenant A (from JWT), NOT Tenant B (from header)!
      expect(clsMap.get("CURRENT_TENANT_ID")).toBe(TENANT_A_ID);
      expect(mockReq.organizationId).toBe(TENANT_A_ID);
      expect(clsMap.get("CURRENT_TENANT_ID")).not.toBe(TENANT_B_ID);
    });

    it("should reject request if user organization is suspended", async () => {
      const mockCls = {
        set: vi.fn(),
        get: vi.fn(),
      } as unknown as ClsService;

      (prisma.organization.findUnique as any).mockResolvedValue({
        id: TENANT_A_ID,
        status: "SUSPENDED",
      });

      const mockReq: any = {
        url: "/api/members",
        headers: {},
        user: {
          id: USER_A_ID,
          organizationId: TENANT_A_ID,
        },
      };

      const mockContext = {
        switchToHttp: () => ({
          getRequest: () => mockReq,
        }),
      } as unknown as ExecutionContext;

      const mockHandler: CallHandler = {
        handle: () => of({ success: true }),
      };

      const interceptor = new TenantContextInterceptor(mockCls);
      await expect(
        interceptor.intercept(mockContext, mockHandler)
      ).rejects.toThrowError(ForbiddenException);
    });
  });

  describe("2. Object-Level Cross-Tenant Protection (IDOR Prevention)", () => {
    it("should prevent User from Org A from accessing Member record belonging to Org B", async () => {
      const membershipService = new MembershipService();

      // Mock findFirst returning null because organizationId doesn't match
      (prisma.membership.findFirst as any).mockResolvedValue(null);

      // User from Org A requests an ID that exists in Org B
      await expect(
        membershipService.getMemberById(TENANT_A_ID, "member-belonging-to-org-b")
      ).rejects.toThrowError(NotFoundException);

      // Verify that query strictly included organizationId
      expect(prisma.membership.findFirst).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            id: "member-belonging-to-org-b",
            organizationId: TENANT_A_ID,
          },
        })
      );
    });

    it("should prevent User from Org A from approving Member in Org B", async () => {
      const membershipService = new MembershipService();

      (prisma.membership.findFirst as any).mockResolvedValue(null);

      await expect(
        membershipService.approveMembership(TENANT_A_ID, "member-in-org-b", USER_A_ID)
      ).rejects.toThrowError(NotFoundException);
    });
  });

  describe("3. Backend Authorization & Privilege Escalation Prevention", () => {
    it("should reject users without required permission grant", async () => {
      const mockReflector = {
        get: vi.fn((key) => {
          if (key === PERMISSION_RESOURCE_KEY) return "MEMBERS";
          if (key === PERMISSION_ACTION_KEY) return "APPROVE";
          return null;
        }),
      } as unknown as Reflector;

      const mockCls = {
        get: vi.fn((k) => {
          if (k === "CURRENT_TENANT_ID") return TENANT_A_ID;
          if (k === "CURRENT_USER_ID") return "regular-member-id";
          return null;
        }),
      } as unknown as ClsService;

      // User holds branch role with only VIEW permission, NOT APPROVE
      (prisma.userPosition.findMany as any).mockResolvedValue([
        {
          id: "pos-1",
          position: {
            isCentralRole: false,
            defaultPermissions: ["MEMBERS:VIEW"],
          },
          branchNode: { depth: 2, materializedPath: "1/4/12" },
          customPermissions: [],
        },
      ]);

      const mockContext = {
        getHandler: () => {},
      } as unknown as ExecutionContext;

      const guard = new PermissionGuard(mockReflector, mockCls);

      await expect(guard.canActivate(mockContext)).rejects.toThrowError(
        ForbiddenException
      );
    });

    it("should allow executive officers holding required permission grant", async () => {
      const mockReflector = {
        get: vi.fn((key) => {
          if (key === PERMISSION_RESOURCE_KEY) return "MEMBERS";
          if (key === PERMISSION_ACTION_KEY) return "APPROVE";
          return null;
        }),
      } as unknown as Reflector;

      const mockCls = {
        get: vi.fn((k) => {
          if (k === "CURRENT_TENANT_ID") return TENANT_A_ID;
          if (k === "CURRENT_USER_ID") return "president-id";
          return null;
        }),
      } as unknown as ClsService;

      // Central President holding root authority
      (prisma.userPosition.findMany as any).mockResolvedValue([
        {
          id: "pos-1",
          position: {
            isCentralRole: true,
            defaultPermissions: ["MEMBERS:ALL", "FINANCE:ALL"],
          },
          branchNode: { depth: 0, materializedPath: "1" },
          customPermissions: [],
        },
      ]);

      const mockContext = {
        getHandler: () => {},
      } as unknown as ExecutionContext;

      const guard = new PermissionGuard(mockReflector, mockCls);
      const result = await guard.canActivate(mockContext);

      expect(result).toBe(true);
    });
  });

  describe("4. Branch Scoping Boundaries", () => {
    it("should restrict member queries to branch officer's subtree", async () => {
      const membershipService = new MembershipService();

      (prisma.membership.count as any).mockResolvedValue(0);
      (prisma.membership.findMany as any).mockResolvedValue([]);

      const branchScope = {
        isRootScope: false,
        allowedPaths: ["1/4"], // Chattogram division
      };

      await membershipService.listMembers(TENANT_A_ID, {}, branchScope);

      // Verify that query was scoped by materializedPath prefix
      expect(prisma.membership.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            organizationId: TENANT_A_ID,
            user: expect.objectContaining({
              userPositions: expect.objectContaining({
                some: {
                  branchNode: {
                    OR: [{ materializedPath: { startsWith: "1/4" } }],
                  },
                },
              }),
            }),
          }),
        })
      );
    });
  });
});
