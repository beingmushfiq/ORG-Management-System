import { describe, it, expect, vi } from "vitest";
import { ScopeInterceptor } from "../src/common/interceptors/scope.interceptor";
import { ClsService } from "nestjs-cls";
import { ExecutionContext, CallHandler } from "@nestjs/common";
import { of } from "rxjs";

vi.mock("@org/database", () => {
  return {
    prisma: {
      userPosition: {
        findMany: vi.fn(),
      },
    },
  };
});

import { prisma } from "@org/database";

describe("Scope Boundary Security & Subtree Slicing", () => {
  const TENANT_ID = "org-test-uuid";

  it("should grant full tenant scope to central/root officers (depth 0)", async () => {
    const clsValues = new Map<string, any>();
    const mockCls = {
      get: vi.fn((key: string) => {
        if (key === "CURRENT_TENANT_ID") return TENANT_ID;
        if (key === "CURRENT_USER_ID") return "user-president";
        return null;
      }),
      set: vi.fn((key: string, val: any) => clsValues.set(key, val)),
    } as unknown as ClsService;

    // Mock central president position at depth 0
    (prisma.userPosition.findMany as any).mockResolvedValue([
      {
        id: "pos-1",
        position: { isCentralRole: true },
        branchNode: { depth: 0, materializedPath: "1" },
      },
    ]);

    const requestObj: any = {};
    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => requestObj,
      }),
    } as unknown as ExecutionContext;

    const mockHandler: CallHandler = {
      handle: () => of({ success: true }),
    };

    const interceptor = new ScopeInterceptor(mockCls);
    await interceptor.intercept(mockContext, mockHandler);

    expect(clsValues.get("CURRENT_IS_ROOT_SCOPE")).toBe(true);
    expect(requestObj.scope.isRootScope).toBe(true);
  });

  it("should strictly constrain branch officers to their branch subtree path", async () => {
    const clsValues = new Map<string, any>();
    const mockCls = {
      get: vi.fn((key: string) => {
        if (key === "CURRENT_TENANT_ID") return TENANT_ID;
        if (key === "CURRENT_USER_ID") return "user-branch-officer";
        return null;
      }),
      set: vi.fn((key: string, val: any) => clsValues.set(key, val)),
    } as unknown as ClsService;

    // Mock branch secretary scoped strictly to Chattogram Division (path: "1/4")
    (prisma.userPosition.findMany as any).mockResolvedValue([
      {
        id: "pos-2",
        position: { isCentralRole: false },
        branchNode: { depth: 1, materializedPath: "1/4" },
      },
    ]);

    const requestObj: any = {};
    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => requestObj,
      }),
    } as unknown as ExecutionContext;

    const mockHandler: CallHandler = {
      handle: () => of({ success: true }),
    };

    const interceptor = new ScopeInterceptor(mockCls);
    await interceptor.intercept(mockContext, mockHandler);

    expect(clsValues.get("CURRENT_IS_ROOT_SCOPE")).toBe(false);
    expect(requestObj.scope.isRootScope).toBe(false);
    expect(requestObj.scope.allowedPaths).toEqual(["1/4"]);

    // Security check: Chattogram officer CANNOT access Dhaka branch (path: "1/5")
    const canAccessDhaka = requestObj.scope.allowedPaths.some(
      (path: string) => "1/5" === path || "1/5".startsWith(`${path}/`)
    );
    expect(canAccessDhaka).toBe(false);

    // Security check: Chattogram officer CAN access Panchlaish sub-unit (path: "1/4/12")
    const canAccessPanchlaish = requestObj.scope.allowedPaths.some(
      (path: string) => "1/4/12" === path || "1/4/12".startsWith(`${path}/`)
    );
    expect(canAccessPanchlaish).toBe(true);
  });
});
