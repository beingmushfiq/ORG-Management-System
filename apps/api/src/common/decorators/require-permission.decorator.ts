import { SetMetadata, applyDecorators } from "@nestjs/common";

export const PERMISSION_RESOURCE_KEY = "PERMISSION_RESOURCE";
export const PERMISSION_ACTION_KEY = "PERMISSION_ACTION";

export type PermissionAction =
  | "VIEW"
  | "CREATE"
  | "EDIT"
  | "DELETE"
  | "APPROVE"
  | "REJECT"
  | "EXPORT"
  | "ASSIGN"
  | "SIGN";

export const RequirePermission = (resource: string, action: PermissionAction) => {
  return applyDecorators(
    SetMetadata(PERMISSION_RESOURCE_KEY, resource),
    SetMetadata(PERMISSION_ACTION_KEY, action)
  );
};
