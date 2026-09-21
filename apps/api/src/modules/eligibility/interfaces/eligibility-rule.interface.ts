/**
 * Type definitions for Organization.eligibilityRuleJson
 * Defines configurable requirements for tier promotions (e.g. Associate -> General, General -> Life).
 */

export type PromotionPath = "ASSOCIATE_TO_GENERAL" | "GENERAL_TO_LIFE";

export interface TierEligibilityRequirement {
  minContinuousActiveDays: number;
  maxSuspensionGapsAllowedDays: number;
  requireDuesCleared: boolean;
  minActivityPoints: number;
  requiredActivityTypes?: string[] | undefined;
}

export interface OrganizationEligibilityConfig {
  rules: {
    ASSOCIATE_TO_GENERAL: TierEligibilityRequirement;
    GENERAL_TO_LIFE: TierEligibilityRequirement;
  };
}

export interface MemberHistoryItem {
  status: "ACTIVE" | "SUSPENDED" | "RESIGNED" | "EXPELLED" | "PENDING_KYC";
  startDate: Date;
  endDate?: Date | undefined;
}

export interface MemberActivityItem {
  type: string;
  points: number;
  occurredAt: Date;
}

export interface EligibilityEvaluationInput {
  memberId: string;
  currentTier: "ASSOCIATE" | "GENERAL" | "LIFE";
  joinedDate: Date;
  status: "ACTIVE" | "SUSPENDED" | "RESIGNED" | "EXPELLED";
  history: MemberHistoryItem[];
  unpaidDuesPaisa: bigint;
  activities: MemberActivityItem[];
  config: OrganizationEligibilityConfig;
  targetTier: "GENERAL" | "LIFE";
}

export interface RequirementCriterion {
  label: string;
  labelBn: string;
  currentValue: number | string | boolean;
  targetValue: number | string | boolean;
  passed: boolean;
}

export interface EligibilityReport {
  memberId: string;
  targetTier: "GENERAL" | "LIFE";
  isEligible: boolean;
  overallScorePercent: number; // 0 - 100
  continuousActiveDays: number;
  totalSuspensionDays: number;
  totalActivityPoints: number;
  unpaidDuesPaisa: bigint;
  criteria: Record<string, RequirementCriterion>;
  unmetCriteria: string[];
}
