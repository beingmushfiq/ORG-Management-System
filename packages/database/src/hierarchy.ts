import { PrismaClient } from "@prisma/client";

export interface MoveNodeResult {
  nodeId: string;
  oldPath: string;
  newPath: string;
  affectedDescendantsCount: number;
}

/**
 * Builds the SQL condition or Prisma where clause to fetch a branch node and its entire descendant subtree.
 * Subtree query pattern: `WHERE organizationId = :orgId AND (materializedPath = :path OR materializedPath LIKE :path/%)`
 */
export function buildSubtreeQueryCondition(organizationId: string, basePath: string) {
  return {
    organizationId,
    OR: [
      { materializedPath: basePath },
      { materializedPath: { startsWith: `${basePath}/` } },
    ],
  };
}

/**
 * Moves a branch node under a new parent (or makes it root),
 * atomically updating the materializedPath of the node AND all its descendants in a single transaction.
 *
 * @param prisma PrismaClient instance
 * @param organizationId Tenant identifier
 * @param targetNodeId The branch node being moved
 * @param newParentId The new parent node ID, or null to make it a root node
 */
export async function moveBranchNodeTransaction(
  prisma: PrismaClient,
  organizationId: string,
  targetNodeId: string,
  newParentId: string | null
): Promise<MoveNodeResult> {
  return await prisma.$transaction(async (tx) => {
    // 1. Fetch target node
    const targetNode = await tx.branchNode.findFirstOrThrow({
      where: { id: targetNodeId, organizationId },
    });

    const oldPath = targetNode.materializedPath;

    // 2. Determine new path and depth
    let newPath = "";
    let newDepth = 0;

    if (newParentId) {
      const parentNode = await tx.branchNode.findFirstOrThrow({
        where: { id: newParentId, organizationId },
      });

      // Prevent moving a node under its own descendant (cyclic hierarchy)
      if (
        parentNode.materializedPath === oldPath ||
        parentNode.materializedPath.startsWith(`${oldPath}/`)
      ) {
        throw new Error(
          `[HIERARCHY_CYCLE_ERROR] Cannot move branch node '${targetNodeId}' under its own descendant '${newParentId}'.`
        );
      }

      newPath = `${parentNode.materializedPath}/${targetNode.id}`;
      newDepth = parentNode.depth + 1;
    } else {
      // Made a root node
      newPath = targetNode.id;
      newDepth = 0;
    }

    // 3. Update the target node itself
    await tx.branchNode.update({
      where: { id: targetNodeId, organizationId },
      data: {
        parentId: newParentId,
        materializedPath: newPath,
        depth: newDepth,
      },
    });

    // 4. Fetch all descendants of target node
    const descendants = await tx.branchNode.findMany({
      where: {
        organizationId,
        materializedPath: { startsWith: `${oldPath}/` },
      },
      select: {
        id: true,
        depth: true,
        materializedPath: true,
      },
    });

    const depthDelta = newDepth - targetNode.depth;

    // 5. Atomically rewrite all descendants' paths and depths
    for (const desc of descendants) {
      // Replace old prefix with new prefix
      const suffix = desc.materializedPath.slice(oldPath.length);
      const updatedPath = `${newPath}${suffix}`;
      const updatedDepth = desc.depth + depthDelta;

      await tx.branchNode.update({
        where: { id: desc.id, organizationId },
        data: {
          materializedPath: updatedPath,
          depth: updatedDepth,
        },
      });
    }

    return {
      nodeId: targetNodeId,
      oldPath,
      newPath,
      affectedDescendantsCount: descendants.length,
    };
  });
}
