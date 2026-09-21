import {
  EligibilityEvaluationInput,
  EligibilityReport,
  PromotionPath,
  TierEligibilityRequirement,
} from "./interfaces/eligibility-rule.interface";

export class EligibilityEvaluator {
  /**
   * Calculates continuous active days, subtracting any suspension intervals
   */
  static calculateContinuousActiveDays(
    joinedDate: Date,
    history: EligibilityEvaluationInput["history"],
    evaluationDate: Date = new Date()
  ): { activeDays: number; suspensionDays: number } {
    const totalMs = Math.max(0, evaluationDate.getTime() - joinedDate.getTime());
    let suspensionMs = 0;

    for (const record of history) {
      if (record.status === "SUSPENDED") {
        const start = record.startDate.getTime();
        const end = (record.endDate ?? evaluationDate).getTime();
        if (end > start) {
          suspensionMs += end - start;
        }
      }
    }

    const netActiveMs = Math.max(0, totalMs - suspensionMs);
    const activeDays = Math.floor(netActiveMs / (1000 * 60 * 60 * 24));
    const suspensionDays = Math.floor(suspensionMs / (1000 * 60 * 60 * 24));

    return { activeDays, suspensionDays };
  }

  /**
   * Evaluates a member's progress against the organization's rules for promotion
   */
  static evaluate(
    input: EligibilityEvaluationInput,
    evaluationDate: Date = new Date()
  ): EligibilityReport {
    const path: PromotionPath =
      input.targetTier === "GENERAL" ? "ASSOCIATE_TO_GENERAL" : "GENERAL_TO_LIFE";

    const rule: TierEligibilityRequirement = input.config.rules[path];

    const { activeDays, suspensionDays } = this.calculateContinuousActiveDays(
      input.joinedDate,
      input.history,
      evaluationDate
    );

    // Sum points
    let totalPoints = 0;
    const activityTypeSet = new Set<string>();
    for (const act of input.activities) {
      totalPoints += act.points;
      activityTypeSet.add(act.type);
    }

    const unmet: string[] = [];

    // 1. Check Tenure
    const tenurePassed = activeDays >= rule.minContinuousActiveDays;
    if (!tenurePassed) {
      unmet.push(
        `Insufficient active tenure: ${activeDays} / ${rule.minContinuousActiveDays} days required.`
      );
    }

    // 2. Check Suspension Gaps
    const suspensionPassed = suspensionDays <= rule.maxSuspensionGapsAllowedDays;
    if (!suspensionPassed) {
      unmet.push(
        `Excessive disciplinary gaps: ${suspensionDays} days suspended (max allowed: ${rule.maxSuspensionGapsAllowedDays}).`
      );
    }

    // 3. Check Dues Clearance (integer paisa check)
    const duesPassed = !rule.requireDuesCleared || input.unpaidDuesPaisa <= 0n;
    if (!duesPassed) {
      const taka = input.unpaidDuesPaisa / 100n;
      unmet.push(`Outstanding dues balance must be zero: ৳${taka} overdue.`);
    }

    // 4. Check Activity Points
    const pointsPassed = totalPoints >= rule.minActivityPoints;
    if (!pointsPassed) {
      unmet.push(
        `Insufficient activity points: ${totalPoints} / ${rule.minActivityPoints} points accumulated.`
      );
    }

    // 5. Check Required Activity Types (if defined)
    let typesPassed = true;
    if (rule.requiredActivityTypes && rule.requiredActivityTypes.length > 0) {
      for (const reqType of rule.requiredActivityTypes) {
        if (!activityTypeSet.has(reqType)) {
          typesPassed = false;
          unmet.push(`Missing mandatory participation record: ${reqType}.`);
        }
      }
    }

    const isEligible =
      tenurePassed && suspensionPassed && duesPassed && pointsPassed && typesPassed;

    // Calculate normalized composite score (0 to 100)
    const tenureProgress = Math.min(1, activeDays / (rule.minContinuousActiveDays || 1));
    const pointsProgress = Math.min(1, totalPoints / (rule.minActivityPoints || 1));
    const duesProgress = duesPassed ? 1 : 0;
    const suspensionProgress = suspensionPassed ? 1 : 0;

    const overallScorePercent = Math.round(
      (tenureProgress * 0.4 + pointsProgress * 0.3 + duesProgress * 0.2 + suspensionProgress * 0.1) *
        100
    );

    return {
      memberId: input.memberId,
      targetTier: input.targetTier,
      isEligible,
      overallScorePercent,
      continuousActiveDays: activeDays,
      totalSuspensionDays: suspensionDays,
      totalActivityPoints: totalPoints,
      unpaidDuesPaisa: input.unpaidDuesPaisa,
      criteria: {
        tenure: {
          label: "Continuous Active Tenure",
          labelBn: "ধারাবাহিক সক্রিয় সদস্যপদ",
          currentValue: `${activeDays} days`,
          targetValue: `${rule.minContinuousActiveDays} days`,
          passed: tenurePassed,
        },
        suspensionGaps: {
          label: "Disciplinary Gaps",
          labelBn: "শৃঙ্খলাভঙ্গের বিরতি",
          currentValue: `${suspensionDays} days`,
          targetValue: `Max ${rule.maxSuspensionGapsAllowedDays} days`,
          passed: suspensionPassed,
        },
        duesCompliance: {
          label: "Dues Clearance",
          labelBn: "চাঁদা বা ফি পরিশোধ",
          currentValue: duesPassed ? "Zero Balance" : `${input.unpaidDuesPaisa / 100n} BDT Unpaid`,
          targetValue: "100% Cleared",
          passed: duesPassed,
        },
        activityPoints: {
          label: "Participation Points",
          labelBn: "কার্যক্রমে অংশগ্রহণ স্কোর",
          currentValue: totalPoints,
          targetValue: rule.minActivityPoints,
          passed: pointsPassed,
        },
      },
      unmetCriteria: unmet,
    };
  }
}
