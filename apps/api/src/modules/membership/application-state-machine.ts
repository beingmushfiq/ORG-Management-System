export enum ApplicationState {
  SUBMITTED = "SUBMITTED",
  DOCUMENT_VERIFIED = "DOCUMENT_VERIFIED",
  BRANCH_ENDORSED = "BRANCH_ENDORSED",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export type ApplicationAction =
  | "VERIFY_DOCUMENTS"
  | "ENDORSE_BRANCH"
  | "APPROVE"
  | "REJECT";

export interface StateTransitionResult {
  previousState: ApplicationState;
  newState: ApplicationState;
  actorId: string;
  timestamp: Date;
  notes?: string | undefined;
}

/**
 * Validates and executes state transitions for membership onboarding.
 */
export function transitionApplicationState(
  currentState: ApplicationState,
  action: ApplicationAction,
  actorId: string,
  notes?: string
): StateTransitionResult {
  let nextState: ApplicationState;

  switch (currentState) {
    case ApplicationState.SUBMITTED:
      if (action === "VERIFY_DOCUMENTS") {
        nextState = ApplicationState.DOCUMENT_VERIFIED;
      } else if (action === "REJECT") {
        nextState = ApplicationState.REJECTED;
      } else {
        throw new Error(
          `[INVALID_STATE_TRANSITION] Cannot execute action '${action}' from state '${currentState}'.`
        );
      }
      break;

    case ApplicationState.DOCUMENT_VERIFIED:
      if (action === "ENDORSE_BRANCH") {
        nextState = ApplicationState.BRANCH_ENDORSED;
      } else if (action === "REJECT") {
        nextState = ApplicationState.REJECTED;
      } else {
        throw new Error(
          `[INVALID_STATE_TRANSITION] Cannot execute action '${action}' from state '${currentState}'.`
        );
      }
      break;

    case ApplicationState.BRANCH_ENDORSED:
      if (action === "APPROVE") {
        nextState = ApplicationState.APPROVED;
      } else if (action === "REJECT") {
        nextState = ApplicationState.REJECTED;
      } else {
        throw new Error(
          `[INVALID_STATE_TRANSITION] Cannot execute action '${action}' from state '${currentState}'.`
        );
      }
      break;

    case ApplicationState.APPROVED:
    case ApplicationState.REJECTED:
      throw new Error(
        `[TERMINAL_STATE] Application is in terminal state '${currentState}' and cannot be transitioned further.`
      );

    default:
      throw new Error(`[UNKNOWN_STATE] Unknown application state '${currentState}'.`);
  }

  return {
    previousState: currentState,
    newState: nextState,
    actorId,
    timestamp: new Date(),
    notes,
  };
}

/**
 * Collision-safe tenant-scoped membership number generator.
 * Format: {PREFIX}-{YEAR}-{PADDED_SEQUENCE} e.g. "BMA-2026-00421"
 */
export function generateMembershipNumber(
  tenantSlug: string,
  sequenceNumber: number,
  year: number = new Date().getFullYear()
): string {
  const prefix = tenantSlug.toUpperCase().replace(/[^A-Z0-9]/g, "");
  const paddedSeq = sequenceNumber.toString().padStart(5, "0");
  return `${prefix}-${year}-${paddedSeq}`;
}

/**
 * Three-tier privacy field masking for member directories.
 * Tiers: PUBLIC, MEMBERS_ONLY, EXECUTIVE_ONLY
 */
export function maskSensitiveMemberField(
  value: string | null | undefined,
  privacyLevel: "PUBLIC" | "MEMBERS_ONLY" | "EXECUTIVE_ONLY",
  callerRole: "PUBLIC_VISITOR" | "VERIFIED_MEMBER" | "EXECUTIVE_OFFICER"
): string | null {
  if (!value) return null;

  if (callerRole === "EXECUTIVE_OFFICER") {
    return value; // Executive officers have full verified directory visibility
  }

  if (callerRole === "VERIFIED_MEMBER") {
    if (privacyLevel === "EXECUTIVE_ONLY") {
      return "[Restricted to Executive Officers]";
    }
    return value;
  }

  // Public visitor
  if (privacyLevel === "PUBLIC") {
    return value;
  }

  return "[Hidden — Verified Members Only]";
}
