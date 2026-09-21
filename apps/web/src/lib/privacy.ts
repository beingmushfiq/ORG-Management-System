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
