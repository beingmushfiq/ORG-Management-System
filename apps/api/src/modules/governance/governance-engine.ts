import { BadRequestException } from "@nestjs/common";
import * as crypto from "crypto";

export interface QuorumCheckInput {
  totalEligibleVotingMembers: number; // General + Life members with zero dues
  verifiedAttendeesCount: number;
  meetingType: "REGULAR_AGM" | "CONSTITUTIONAL_EGM" | "BRANCH_MEETING";
}

export interface QuorumResult {
  totalEligible: number;
  presentCount: number;
  attendancePercent: number;
  requiredQuorumPercent: number;
  isQuorumMet: boolean;
  status: "QUORUM_ESTABLISHED" | "QUORUM_PENDING" | "ADJOURNED";
}

export interface DigitalBallotInput {
  electionId: string;
  voterId: string;
  candidateId: string;
  isPaidUpMember: boolean;
}

export interface SealedBallotRecord {
  ballotSerial: string;
  electionId: string;
  candidateId: string;
  cryptographicSeal: string;
  castAt: Date;
}

export interface OfflineElectionGazetteRecord {
  electionId: string;
  organizationId: string;
  termName: string; // e.g. "Executive Council 2026-2028"
  electionDate: Date;
  gazettePdfUrl: string;
  gazetteSealHash: string;
  roster: Array<{
    userId: string;
    positionTitle: string;
    branchNodeId: string;
  }>;
  approvedById: string;
  recordedAt: Date;
}

export class GovernanceEngine {
  /**
   * Calculates real-time Quorum compliance according to constitutional bylaws
   * - Regular AGM: 50% + 1 voting members
   * - Constitutional EGM: 66.7% (Two-Thirds Majority)
   * - Branch Meeting: 33.3% (One-Third)
   */
  static calculateQuorum(input: QuorumCheckInput): QuorumResult {
    if (input.totalEligibleVotingMembers <= 0) {
      throw new BadRequestException("Total eligible voting members must be greater than zero");
    }

    let requiredPercent = 50.0;
    if (input.meetingType === "CONSTITUTIONAL_EGM") {
      requiredPercent = 66.67;
    } else if (input.meetingType === "BRANCH_MEETING") {
      requiredPercent = 33.33;
    }

    const attendancePercent =
      Math.round((input.verifiedAttendeesCount / input.totalEligibleVotingMembers) * 10000) / 100;

    const isQuorumMet = attendancePercent >= requiredPercent;

    return {
      totalEligible: input.totalEligibleVotingMembers,
      presentCount: input.verifiedAttendeesCount,
      attendancePercent,
      requiredQuorumPercent: requiredPercent,
      isQuorumMet,
      status: isQuorumMet ? "QUORUM_ESTABLISHED" : "QUORUM_PENDING",
    };
  }

  /**
   * Casts an anonymized cryptographic ballot for digital secret elections
   * Ensures voter eligibility without linking voter ID to candidate choice
   */
  static castSecretBallot(
    input: DigitalBallotInput,
    castVoterIds: Set<string>
  ): { ballot: SealedBallotRecord; updatedCastVoters: Set<string> } {
    if (!input.isPaidUpMember) {
      throw new BadRequestException("Only paid-up members in good constitutional standing can vote");
    }

    if (castVoterIds.has(input.voterId)) {
      throw new BadRequestException("Voter has already cast a ballot in this election");
    }

    const ballotSerial = `BAL-${Date.now()}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
    const rawSeal = `${input.electionId}|${ballotSerial}|${input.candidateId}`;
    const cryptographicSeal = crypto.createHash("sha256").update(rawSeal).digest("hex");

    const ballot: SealedBallotRecord = {
      ballotSerial,
      electionId: input.electionId,
      candidateId: input.candidateId,
      cryptographicSeal,
      castAt: new Date(),
    };

    const nextCastVoters = new Set(castVoterIds);
    nextCastVoters.add(input.voterId);

    return {
      ballot,
      updatedCastVoters: nextCastVoters,
    };
  }

  /**
   * Tallies cryptographic ballots and returns election winner and stats
   */
  static tallyBallots(ballots: SealedBallotRecord[]): {
    totalVotesCast: number;
    candidateTally: Record<string, number>;
    winnerCandidateId: string | null;
  } {
    const candidateTally: Record<string, number> = {};

    for (const b of ballots) {
      candidateTally[b.candidateId] = (candidateTally[b.candidateId] ?? 0) + 1;
    }

    let winnerCandidateId: string | null = null;
    let maxVotes = -1;

    for (const [candidateId, count] of Object.entries(candidateTally)) {
      if (count > maxVotes) {
        maxVotes = count;
        winnerCandidateId = candidateId;
      }
    }

    return {
      totalVotesCast: ballots.length,
      candidateTally,
      winnerCandidateId,
    };
  }

  /**
   * Records official offline election gazette resolution with SHA-256 seal
   */
  static recordOfflineGazette(
    organizationId: string,
    termName: string,
    electionDate: Date,
    gazettePdfUrl: string,
    roster: Array<{ userId: string; positionTitle: string; branchNodeId: string }>,
    approvedById: string
  ): OfflineElectionGazetteRecord {
    const sealPayload = `${organizationId}|${termName}|${electionDate.toISOString()}|${gazettePdfUrl}|${roster.length}`;
    const gazetteSealHash = crypto.createHash("sha256").update(sealPayload).digest("hex");

    return {
      electionId: `ELEC-GAZ-${Date.now()}`,
      organizationId,
      termName,
      electionDate,
      gazettePdfUrl,
      gazetteSealHash,
      roster,
      approvedById,
      recordedAt: new Date(),
    };
  }
}
