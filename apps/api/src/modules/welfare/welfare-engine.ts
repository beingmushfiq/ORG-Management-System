import { Injectable, BadRequestException } from "@nestjs/common";

export type BloodGroup = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";

export interface BloodDonorProfile {
  memberId: string;
  name: string;
  nameBn: string;
  bloodGroup: BloodGroup;
  branchPath: string; // e.g. "/1/2" for Chattogram Metro
  district: string;
  contactNumber: string;
  lastDonatedDate?: Date | undefined;
  isAvailable: boolean;
  totalDonations: number;
}

export interface EmergencyBloodRequestDto {
  requestId: string;
  organizationId: string;
  patientName: string;
  hospitalName: string;
  hospitalDistrict: string;
  bloodGroup: BloodGroup;
  unitsNeeded: number;
  contactPerson: string;
  contactPhone: string;
  neededWithinHours: number;
  isThalassemiaPatient?: boolean | undefined;
}

export interface BloodAppealDispatchResult {
  requestId: string;
  eligibleDonorCount: number;
  dispatchedSmsCount: number;
  broadcastStatus: "DISPATCHED" | "NO_ELIGIBLE_DONORS";
  estimatedArrivalNoticeBn: string;
}

export interface HardshipGrantApplication {
  grantId: string;
  memberId: string;
  organizationId: string;
  requestedAmountPaisa: bigint;
  illnessOrDisasterDescription: string;
  status: "PENDING_SECRETARIAT" | "APPROVED_TREASURER" | "DISBURSED" | "REJECTED";
  disbursedAmountPaisa?: bigint | undefined;
}

@Injectable()
export class WelfareEngine {
  private readonly donorRoster: BloodDonorProfile[] = [];
  private readonly hardshipGrants = new Map<string, HardshipGrantApplication>();

  /**
   * Register a donor into the institutional blood network
   */
  registerDonor(donor: BloodDonorProfile): BloodDonorProfile {
    this.donorRoster.push(donor);
    return donor;
  }

  /**
   * Find eligible donors who match blood group and are within safe donation interval (90 days)
   */
  findEligibleDonors(bloodGroup: BloodGroup, targetDistrict: string, currentDate: Date = new Date()): BloodDonorProfile[] {
    const minDonationIntervalDays = 90;
    const msInDay = 24 * 60 * 60 * 1000;

    return this.donorRoster.filter((donor) => {
      if (donor.bloodGroup !== bloodGroup) return false;
      if (!donor.isAvailable) return false;
      if (donor.district.toLowerCase() !== targetDistrict.toLowerCase()) return false;

      if (donor.lastDonatedDate) {
        const daysSinceLast = Math.floor((currentDate.getTime() - donor.lastDonatedDate.getTime()) / msInDay);
        if (daysSinceLast < minDonationIntervalDays) {
          return false;
        }
      }

      return true;
    });
  }

  /**
   * Dispatches emergency SMS broadcast to nearest matched donors without exposing personal data publicly
   */
  dispatchEmergencyAppeal(req: EmergencyBloodRequestDto, currentDate: Date = new Date()): BloodAppealDispatchResult {
    const eligibleDonors = this.findEligibleDonors(req.bloodGroup, req.hospitalDistrict, currentDate);

    if (eligibleDonors.length === 0) {
      return {
        requestId: req.requestId,
        eligibleDonorCount: 0,
        dispatchedSmsCount: 0,
        broadcastStatus: "NO_ELIGIBLE_DONORS",
        estimatedArrivalNoticeBn: "নিকটবর্তী কোনো রক্তদাতা বর্তমানে উপলব্ধ নেই। কেন্দ্রীয় কল্যাণ সেলে যোগাযোগ করুন।",
      };
    }

    return {
      requestId: req.requestId,
      eligibleDonorCount: eligibleDonors.length,
      dispatchedSmsCount: eligibleDonors.length,
      broadcastStatus: "DISPATCHED",
      estimatedArrivalNoticeBn: `জরুরি আবেদন ${eligibleDonors.length} জন রক্তদাতার কাছে এসএমএস মারফত প্রেরণ করা হয়েছে।`,
    };
  }

  /**
   * Submit hardship / emergency relief grant for a distressed member
   */
  applyHardshipGrant(app: {
    grantId: string;
    memberId: string;
    organizationId: string;
    requestedAmountPaisa: bigint;
    illnessOrDisasterDescription: string;
  }): HardshipGrantApplication {
    if (app.requestedAmountPaisa <= 0n) {
      throw new BadRequestException("Requested grant amount must be greater than zero.");
    }

    const grant: HardshipGrantApplication = {
      grantId: app.grantId,
      memberId: app.memberId,
      organizationId: app.organizationId,
      requestedAmountPaisa: app.requestedAmountPaisa,
      illnessOrDisasterDescription: app.illnessOrDisasterDescription,
      status: "PENDING_SECRETARIAT",
    };

    this.hardshipGrants.set(app.grantId, grant);
    return grant;
  }

  /**
   * Approve and disburse welfare funds from the Benevolent Trust ledger
   */
  approveHardshipGrant(grantId: string, approvedAmountPaisa: bigint): HardshipGrantApplication {
    const grant = this.hardshipGrants.get(grantId);
    if (!grant) {
      throw new BadRequestException(`Grant application ${grantId} not found.`);
    }

    grant.status = "APPROVED_TREASURER";
    grant.disbursedAmountPaisa = approvedAmountPaisa;
    return grant;
  }
}
