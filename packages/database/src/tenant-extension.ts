import { PrismaClient } from "@prisma/client";

/**
 * Models that are strictly scoped to an Organization (Tenant).
 */
const TENANT_SCOPED_MODELS = [
  "BranchNode",
  "User",
  "Membership",
  "MembershipHistory",
  "Position",
  "UserPosition",
  "Invoice",
  "PaymentRecord",
  "Event",
  "AttendanceLog",
  "Notice",
  "GalleryAlbum",
  "DonationCause",
  "Election",
  "Ballot",
  "ActivityLog",
  "AuditLog",
  "AuthOtp",
  "UserSession",
  "Meeting",
  "MeetingResolution",
  "ImpersonationLog",
] as const;

type TenantScopedModel = (typeof TENANT_SCOPED_MODELS)[number];

/**
 * Prisma Client Extension enforcing Layer 3 Tenant Isolation for MySQL 8.0.
 * Automatically injects `organizationId` on all reads, updates, deletes, and creates.
 */
export const createTenantPrismaClient = (
  basePrisma: PrismaClient,
  organizationId: string
) => {
  if (!organizationId) {
    throw new Error(
      "[TENANT_ISOLATION_VIOLATION] Cannot instantiate tenant Prisma client without a valid organizationId."
    );
  }

  return basePrisma.$extends({
    name: "tenant-isolation-extension",
    query: {
      $allModels: {
        async $allOperations({ model, operation, args, query }: { model?: string; operation: string; args: any; query: (args: any) => Promise<any> }) {
          if (model && TENANT_SCOPED_MODELS.includes(model as TenantScopedModel)) {
            // READ OPERATIONS
            if (
              [
                "findMany",
                "findFirst",
                "findFirstOrThrow",
                "count",
                "aggregate",
                "groupBy",
              ].includes(operation)
            ) {
              args.where = {
                ...args.where,
                organizationId,
              };
            }

            // Defensively scope findUnique by converting to findFirst with organizationId
            if (operation === "findUnique" || operation === "findUniqueOrThrow") {
              args.where = {
                ...args.where,
                organizationId,
              };
            }

            // UPDATE / DELETE OPERATIONS
            if (
              [
                "update",
                "updateMany",
                "delete",
                "deleteMany",
                "upsert",
              ].includes(operation)
            ) {
              if (operation === "upsert") {
                args.where = { ...args.where, organizationId };
                args.create = { ...args.create, organizationId };
                args.update = { ...args.update, organizationId };
              } else {
                args.where = { ...args.where, organizationId };
              }
            }

            // CREATE OPERATIONS
            if (["create", "createMany", "createManyAndReturn"].includes(operation)) {
              if (operation === "create") {
                args.data = {
                  ...args.data,
                  organizationId,
                };
              } else if (Array.isArray(args.data)) {
                args.data = args.data.map((item: any) => ({
                  ...item,
                  organizationId,
                }));
              }
            }
          }

          return query(args);
        },
      },
    },
  });
};

export type TenantPrismaClient = ReturnType<typeof createTenantPrismaClient>;
