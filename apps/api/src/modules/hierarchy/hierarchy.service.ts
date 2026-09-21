import { Injectable, NotFoundException } from "@nestjs/common";
import { prisma, moveBranchNodeTransaction } from "@org/database";

export interface BranchTreeNode {
  id: string;
  name: string;
  nameBn?: string | null;
  code?: string | null;
  levelLabel: string;
  depth: number;
  materializedPath: string;
  address?: string | null;
  contactPhone?: string | null;
  membersCount: number;
  officers: Array<{
    id: string;
    userName: string;
    positionTitle: string;
    positionTitleBn?: string | null;
  }>;
  children: BranchTreeNode[];
}

@Injectable()
export class HierarchyService {
  /**
   * Retrieves the full organizational branch hierarchy formatted as a nested tree.
   */
  async getBranchTree(organizationId: string): Promise<BranchTreeNode[]> {
    const nodes = await prisma.branchNode.findMany({
      where: { organizationId, isActive: true },
      orderBy: [{ depth: "asc" }, { name: "asc" }],
      include: {
        userPositions: {
          where: { isActive: true },
          include: {
            position: true,
            user: { select: { fullName: true } },
          },
        },
      },
    });

    // Map into tree
    const nodeMap = new Map<string, BranchTreeNode>();
    const roots: BranchTreeNode[] = [];

    for (const node of nodes) {
      const treeNode: BranchTreeNode = {
        id: node.id,
        name: node.name,
        nameBn: node.nameBn,
        code: node.code,
        levelLabel: node.levelLabel,
        depth: node.depth,
        materializedPath: node.materializedPath,
        address: node.address,
        contactPhone: node.contactPhone,
        membersCount: 0,
        officers: node.userPositions.map((up) => ({
          id: up.id,
          userName: up.user.fullName,
          positionTitle: up.position.title,
          positionTitleBn: up.position.titleBn,
        })),
        children: [],
      };
      nodeMap.set(node.id, treeNode);
    }

    for (const node of nodes) {
      const current = nodeMap.get(node.id)!;
      if (node.parentId && nodeMap.has(node.parentId)) {
        nodeMap.get(node.parentId)!.children.push(current);
      } else {
        roots.push(current);
      }
    }

    return roots;
  }

  /**
   * Creates a new branch node under an optional parent.
   */
  async createBranchNode(
    organizationId: string,
    data: {
      name: string;
      nameBn?: string;
      code?: string;
      levelLabel?: string;
      parentId?: string | null;
      address?: string;
      contactPhone?: string;
    }
  ) {
    let depth = 0;
    let parentPath = "";

    if (data.parentId) {
      const parent = await prisma.branchNode.findFirst({
        where: { id: data.parentId, organizationId },
      });
      if (!parent) {
        throw new NotFoundException("Parent branch node not found.");
      }
      depth = parent.depth + 1;
      parentPath = parent.materializedPath;
    }

    const node = await prisma.branchNode.create({
      data: {
        organizationId,
        parentId: data.parentId || null,
        name: data.name,
        nameBn: data.nameBn ?? null,
        code: data.code ?? null,
        levelLabel: data.levelLabel || "Branch",
        depth,
        materializedPath: "temp",
        address: data.address ?? null,
        contactPhone: data.contactPhone ?? null,
      },
    });

    const finalPath = parentPath ? `${parentPath}/${node.id}` : node.id;

    return prisma.branchNode.update({
      where: { id: node.id },
      data: { materializedPath: finalPath },
    });
  }

  /**
   * Moves a branch node atomically rewriting descendants' paths.
   */
  async moveBranch(organizationId: string, targetNodeId: string, newParentId: string | null) {
    return moveBranchNodeTransaction(prisma, organizationId, targetNodeId, newParentId);
  }
}
