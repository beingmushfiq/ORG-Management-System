import { describe, it, expect, vi } from "vitest";
import { PrismaClient } from "@prisma/client";
import { createTenantPrismaClient } from "../src/tenant-extension";

describe("Layer 3: MySQL 8.0 Tenant Isolation Extension", () => {
  const TENANT_A_ID = "tenant-uuid-1111-aaaa";
  const TENANT_B_ID = "tenant-uuid-2222-bbbb";

  it("should throw error when instantiating client without organizationId", () => {
    const mockPrisma = new PrismaClient();
    expect(() => createTenantPrismaClient(mockPrisma, "")).toThrow(
      "[TENANT_ISOLATION_VIOLATION]"
    );
  });

  it("should automatically inject organizationId on findMany queries", async () => {
    let capturedArgs: any = null;

    const mockPrisma = {
      $extends: vi.fn().mockImplementation((config) => {
        return {
          user: {
            findMany: async (args: any) => {
              // Execute the query extension
              return config.query.$allModels.$allOperations({
                model: "User",
                operation: "findMany",
                args: args || {},
                query: async (modifiedArgs: any) => {
                  capturedArgs = modifiedArgs;
                  return [];
                },
              });
            },
          },
        };
      }),
    } as unknown as PrismaClient;

    const tenantAClient = createTenantPrismaClient(mockPrisma, TENANT_A_ID);

    // Call findMany with no where clause
    await tenantAClient.user.findMany({});

    expect(capturedArgs).toBeDefined();
    expect(capturedArgs.where).toBeDefined();
    expect(capturedArgs.where.organizationId).toBe(TENANT_A_ID);
  });

  it("should override or force organizationId even if caller attempts cross-tenant query", async () => {
    let capturedArgs: any = null;

    const mockPrisma = {
      $extends: vi.fn().mockImplementation((config) => {
        return {
          invoice: {
            findMany: async (args: any) => {
              return config.query.$allModels.$allOperations({
                model: "Invoice",
                operation: "findMany",
                args: args || {},
                query: async (modifiedArgs: any) => {
                  capturedArgs = modifiedArgs;
                  return [];
                },
              });
            },
          },
        };
      }),
    } as unknown as PrismaClient;

    const tenantAClient = createTenantPrismaClient(mockPrisma, TENANT_A_ID);

    // Malicious attempt: User from Tenant A tries to search for Tenant B's invoices
    await tenantAClient.invoice.findMany({
      where: {
        organizationId: TENANT_B_ID,
      },
    });

    expect(capturedArgs).toBeDefined();
    // Must be forcefully bound to TENANT_A_ID
    expect(capturedArgs.where.organizationId).toBe(TENANT_A_ID);
    expect(capturedArgs.where.organizationId).not.toBe(TENANT_B_ID);
  });

  it("should automatically inject organizationId on create operations", async () => {
    let capturedArgs: any = null;

    const mockPrisma = {
      $extends: vi.fn().mockImplementation((config) => {
        return {
          branchNode: {
            create: async (args: any) => {
              return config.query.$allModels.$allOperations({
                model: "BranchNode",
                operation: "create",
                args: args || {},
                query: async (modifiedArgs: any) => {
                  capturedArgs = modifiedArgs;
                  return { id: "new-node", ...modifiedArgs.data };
                },
              });
            },
          },
        };
      }),
    } as unknown as PrismaClient;

    const tenantAClient = createTenantPrismaClient(mockPrisma, TENANT_A_ID);

    await tenantAClient.branchNode.create({
      data: {
        name: "Sylhet Upazila Unit",
        materializedPath: "1/5/20",
      } as any,
    });

    expect(capturedArgs).toBeDefined();
    expect(capturedArgs.data.organizationId).toBe(TENANT_A_ID);
  });

  it("should scope update and delete operations strictly to current tenant", async () => {
    let capturedUpdateArgs: any = null;
    let capturedDeleteArgs: any = null;

    const mockPrisma = {
      $extends: vi.fn().mockImplementation((config) => {
        return {
          membership: {
            update: async (args: any) => {
              return config.query.$allModels.$allOperations({
                model: "Membership",
                operation: "update",
                args: args || {},
                query: async (modifiedArgs: any) => {
                  capturedUpdateArgs = modifiedArgs;
                  return {};
                },
              });
            },
            delete: async (args: any) => {
              return config.query.$allModels.$allOperations({
                model: "Membership",
                operation: "delete",
                args: args || {},
                query: async (modifiedArgs: any) => {
                  capturedDeleteArgs = modifiedArgs;
                  return {};
                },
              });
            },
          },
        };
      }),
    } as unknown as PrismaClient;

    const tenantAClient = createTenantPrismaClient(mockPrisma, TENANT_A_ID);

    await tenantAClient.membership.update({
      where: { id: "membership-123" },
      data: { status: "ACTIVE" },
    });

    expect(capturedUpdateArgs.where.organizationId).toBe(TENANT_A_ID);

    await tenantAClient.membership.delete({
      where: { id: "membership-123" },
    });

    expect(capturedDeleteArgs.where.organizationId).toBe(TENANT_A_ID);
  });
});
