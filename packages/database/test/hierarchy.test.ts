import { describe, it, expect, vi } from "vitest";
import { PrismaClient } from "@prisma/client";
import { moveBranchNodeTransaction, buildSubtreeQueryCondition } from "../src/hierarchy";

describe("Arbitrary-Depth Branch Hierarchy & Atomic Node Move", () => {
  const ORG_ID = "org-test-uuid";

  it("should build correct subtree query conditions for prefix matching", () => {
    const condition = buildSubtreeQueryCondition(ORG_ID, "1/4");

    expect(condition.organizationId).toBe(ORG_ID);
    expect(condition.OR).toHaveLength(2);
    expect(condition.OR[0]).toEqual({ materializedPath: "1/4" });
    expect(condition.OR[1]).toEqual({ materializedPath: { startsWith: "1/4/" } });
  });

  it("should atomically rewrite target and all descendant paths when moved under a new parent", async () => {
    // Tree:
    // Root A (path: "node-A", depth: 0)
    //   -> Division B (path: "node-A/node-B", depth: 1)
    //        -> District C (path: "node-A/node-B/node-C", depth: 2)
    //             -> Upazila D (path: "node-A/node-B/node-C/node-D", depth: 3)
    // Target New Parent:
    // Root X (path: "node-X", depth: 0)

    const updatedNodes: Record<string, { path: string; depth: number; parentId: string | null }> = {};

    const mockTx = {
      branchNode: {
        findFirstOrThrow: vi.fn().mockImplementation(async ({ where }) => {
          if (where.id === "node-B") {
            return {
              id: "node-B",
              organizationId: ORG_ID,
              parentId: "node-A",
              materializedPath: "node-A/node-B",
              depth: 1,
            };
          }
          if (where.id === "node-X") {
            return {
              id: "node-X",
              organizationId: ORG_ID,
              parentId: null,
              materializedPath: "node-X",
              depth: 0,
            };
          }
          throw new Error("Not found");
        }),
        findMany: vi.fn().mockImplementation(async () => {
          // Return descendants of node-B
          return [
            {
              id: "node-C",
              depth: 2,
              materializedPath: "node-A/node-B/node-C",
            },
            {
              id: "node-D",
              depth: 3,
              materializedPath: "node-A/node-B/node-C/node-D",
            },
          ];
        }),
        update: vi.fn().mockImplementation(async ({ where, data }) => {
          updatedNodes[where.id] = {
            path: data.materializedPath,
            depth: data.depth,
            parentId: data.parentId !== undefined ? data.parentId : null,
          };
          return { id: where.id, ...data };
        }),
      },
    };

    const mockPrisma = {
      $transaction: vi.fn().mockImplementation(async (callback) => {
        return callback(mockTx);
      }),
    } as unknown as PrismaClient;

    const result = await moveBranchNodeTransaction(mockPrisma, ORG_ID, "node-B", "node-X");

    expect(result.affectedDescendantsCount).toBe(2);
    expect(result.oldPath).toBe("node-A/node-B");
    expect(result.newPath).toBe("node-X/node-B");

    // Verify node-B itself
    expect(updatedNodes["node-B"]?.path).toBe("node-X/node-B");
    expect(updatedNodes["node-B"]?.depth).toBe(1);
    expect(updatedNodes["node-B"]?.parentId).toBe("node-X");

    // Verify descendant node-C
    expect(updatedNodes["node-C"]?.path).toBe("node-X/node-B/node-C");
    expect(updatedNodes["node-C"]?.depth).toBe(2);

    // Verify descendant node-D
    expect(updatedNodes["node-D"]?.path).toBe("node-X/node-B/node-C/node-D");
    expect(updatedNodes["node-D"]?.depth).toBe(3);
  });

  it("should reject cyclic move attempts (moving a node under its own descendant)", async () => {
    const mockTx = {
      branchNode: {
        findFirstOrThrow: vi.fn().mockImplementation(async ({ where }) => {
          if (where.id === "node-B") {
            return {
              id: "node-B",
              materializedPath: "node-A/node-B",
              depth: 1,
            };
          }
          if (where.id === "node-D") {
            // node-D is a descendant of node-B
            return {
              id: "node-D",
              materializedPath: "node-A/node-B/node-C/node-D",
              depth: 3,
            };
          }
          throw new Error("Not found");
        }),
      },
    };

    const mockPrisma = {
      $transaction: vi.fn().mockImplementation(async (callback) => {
        return callback(mockTx);
      }),
    } as unknown as PrismaClient;

    // Attempting to move node-B under its child node-D must fail
    await expect(
      moveBranchNodeTransaction(mockPrisma, ORG_ID, "node-B", "node-D")
    ).rejects.toThrow("[HIERARCHY_CYCLE_ERROR]");
  });
});
