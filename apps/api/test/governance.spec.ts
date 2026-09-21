import { describe, it, expect } from "vitest";
import { GovernanceEngine } from "../src/modules/governance/governance-engine";

describe("Phase 7: Governance, Hybrid Elections & AGM Quorum", () => {
  describe("1. Constitutional Quorum Engine", () => {
    it("should establish quorum for Regular AGM when attendance >= 50%", () => {
      const result = GovernanceEngine.calculateQuorum({
        totalEligibleVotingMembers: 200,
        verifiedAttendeesCount: 105,
        meetingType: "REGULAR_AGM",
      });

      expect(result.attendancePercent).toBe(52.5);
      expect(result.isQuorumMet).toBe(true);
      expect(result.status).toBe("QUORUM_ESTABLISHED");
    });

    it("should require 66.67% attendance for Constitutional Amendment EGM", () => {
      const failResult = GovernanceEngine.calculateQuorum({
        totalEligibleVotingMembers: 300,
        verifiedAttendeesCount: 180, // 60%
        meetingType: "CONSTITUTIONAL_EGM",
      });

      expect(failResult.attendancePercent).toBe(60.0);
      expect(failResult.isQuorumMet).toBe(false);
      expect(failResult.status).toBe("QUORUM_PENDING");

      const passResult = GovernanceEngine.calculateQuorum({
        totalEligibleVotingMembers: 300,
        verifiedAttendeesCount: 210, // 70%
        meetingType: "CONSTITUTIONAL_EGM",
      });

      expect(passResult.isQuorumMet).toBe(true);
      expect(passResult.status).toBe("QUORUM_ESTABLISHED");
    });
  });

  describe("2. Cryptographic Digital Secret Ballot Engine", () => {
    it("should cast anonymized ballot and prevent double voting", () => {
      const castVoters = new Set<string>();

      const { ballot, updatedCastVoters } = GovernanceEngine.castSecretBallot(
        {
          electionId: "ELEC-2026-PRESIDENT",
          voterId: "voter-dr-salma",
          candidateId: "cand-dr-mujibul",
          isPaidUpMember: true,
        },
        castVoters
      );

      expect(ballot.ballotSerial).toMatch(/^BAL-\d+-[A-F0-9]+$/);
      expect(ballot.cryptographicSeal).toBeDefined();
      expect(ballot.cryptographicSeal.length).toBe(64); // SHA-256
      expect(updatedCastVoters.has("voter-dr-salma")).toBe(true);

      // Attempt double vote
      expect(() => {
        GovernanceEngine.castSecretBallot(
          {
            electionId: "ELEC-2026-PRESIDENT",
            voterId: "voter-dr-salma",
            candidateId: "cand-dr-mujibul",
            isPaidUpMember: true,
          },
          updatedCastVoters
        );
      }).toThrowError(/Voter has already cast a ballot/);
    });

    it("should block unpaid members from voting", () => {
      expect(() => {
        GovernanceEngine.castSecretBallot(
          {
            electionId: "ELEC-2026-PRESIDENT",
            voterId: "voter-unpaid-member",
            candidateId: "cand-dr-mujibul",
            isPaidUpMember: false,
          },
          new Set()
        );
      }).toThrowError(/Only paid-up members in good constitutional standing/);
    });

    it("should correctly tally ballots and declare winner", () => {
      const ballots = [
        {
          ballotSerial: "BAL-1",
          electionId: "ELEC-1",
          candidateId: "cand-A",
          cryptographicSeal: "seal1",
          castAt: new Date(),
        },
        {
          ballotSerial: "BAL-2",
          electionId: "ELEC-1",
          candidateId: "cand-B",
          cryptographicSeal: "seal2",
          castAt: new Date(),
        },
        {
          ballotSerial: "BAL-3",
          electionId: "ELEC-1",
          candidateId: "cand-A",
          cryptographicSeal: "seal3",
          castAt: new Date(),
        },
      ];

      const tally = GovernanceEngine.tallyBallots(ballots);
      expect(tally.totalVotesCast).toBe(3);
      expect(tally.candidateTally["cand-A"]).toBe(2);
      expect(tally.candidateTally["cand-B"]).toBe(1);
      expect(tally.winnerCandidateId).toBe("cand-A");
    });
  });

  describe("3. Offline Election Gazette Recording", () => {
    it("should generate cryptographically sealed gazette record for manual elections", () => {
      const gazette = GovernanceEngine.recordOfflineGazette(
        "org-bma-ctg",
        "Executive Council 2026-2028",
        new Date("2026-02-15"),
        "https://storage.org.bd/gazettes/gazette_2026_signed.pdf",
        [
          { userId: "usr-1", positionTitle: "President", branchNodeId: "root" },
          { userId: "usr-2", positionTitle: "General Secretary", branchNodeId: "root" },
        ],
        "commissioner-justice-rahman"
      );

      expect(gazette.electionId).toContain("ELEC-GAZ-");
      expect(gazette.gazetteSealHash.length).toBe(64);
      expect(gazette.roster.length).toBe(2);
      expect(gazette.approvedById).toBe("commissioner-justice-rahman");
    });
  });
});
