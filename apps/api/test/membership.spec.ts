import { describe, it, expect } from "vitest";
import {
  ApplicationState,
  transitionApplicationState,
  generateMembershipNumber,
  maskSensitiveMemberField,
} from "../src/modules/membership/application-state-machine";

describe("Membership Core: State Machine & Privacy Engine", () => {
  it("should follow the standard multi-step approval lifecycle", () => {
    let state = ApplicationState.SUBMITTED;

    // Step 1: Document Verification
    const res1 = transitionApplicationState(state, "VERIFY_DOCUMENTS", "actor-doc-verifier");
    expect(res1.newState).toBe(ApplicationState.DOCUMENT_VERIFIED);
    state = res1.newState;

    // Step 2: Branch Endorsement
    const res2 = transitionApplicationState(state, "ENDORSE_BRANCH", "actor-branch-gs");
    expect(res2.newState).toBe(ApplicationState.BRANCH_ENDORSED);
    state = res2.newState;

    // Step 3: Central GS / President Approval
    const res3 = transitionApplicationState(state, "APPROVE", "actor-central-president");
    expect(res3.newState).toBe(ApplicationState.APPROVED);
    state = res3.newState;

    // Cannot transition from terminal state
    expect(() => transitionApplicationState(state, "APPROVE", "actor-test")).toThrow(
      "[TERMINAL_STATE]"
    );
  });

  it("should generate collision-safe, formatted membership numbers", () => {
    const id = generateMembershipNumber("bma-ctg", 42, 2026);
    expect(id).toBe("BMACTG-2026-00042");

    const id2 = generateMembershipNumber("red-crescent-sylhet", 1250, 2026);
    expect(id2).toBe("REDCRESCENTSYLHET-2026-01250");
  });

  it("should enforce three-tier privacy masking based on caller role", () => {
    const phone = "+8801819000111";

    // 1. Field is MEMBERS_ONLY
    // Public visitor cannot see
    expect(maskSensitiveMemberField(phone, "MEMBERS_ONLY", "PUBLIC_VISITOR")).toBe(
      "[Hidden — Verified Members Only]"
    );
    // Verified member can see
    expect(maskSensitiveMemberField(phone, "MEMBERS_ONLY", "VERIFIED_MEMBER")).toBe(phone);
    // Executive officer can see
    expect(maskSensitiveMemberField(phone, "MEMBERS_ONLY", "EXECUTIVE_OFFICER")).toBe(phone);

    // 2. Field is EXECUTIVE_ONLY
    // Public visitor cannot see
    expect(maskSensitiveMemberField(phone, "EXECUTIVE_ONLY", "PUBLIC_VISITOR")).toBe(
      "[Hidden — Verified Members Only]"
    );
    // Verified peer cannot see
    expect(maskSensitiveMemberField(phone, "EXECUTIVE_ONLY", "VERIFIED_MEMBER")).toBe(
      "[Restricted to Executive Officers]"
    );
    // Executive officer can see
    expect(maskSensitiveMemberField(phone, "EXECUTIVE_ONLY", "EXECUTIVE_OFFICER")).toBe(phone);
  });
});
