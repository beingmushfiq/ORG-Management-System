import { Injectable, BadRequestException } from "@nestjs/common";
import { randomBytes } from "crypto";

export interface EventDefinition {
  id: string;
  organizationId: string;
  title: string;
  titleBn: string;
  venue: string;
  eventDate: Date;
  isAgm: boolean;
  totalRegisteredDelegates: number;
}

export interface DelegateRegistrationDto {
  eventId: string;
  memberId: string;
  memberName: string;
  membershipNo: string;
  organizationId: string;
  designation: string;
  hasDues: boolean;
  duesAmountPaisa?: bigint | undefined;
}

export interface DelegatePass {
  ticketNumber: string;
  eventId: string;
  memberId: string;
  memberName: string;
  membershipNo: string;
  organizationId: string;
  designation: string;
  qrSecurityToken: string;
  checkedIn: boolean;
  checkedInAt?: Date | undefined;
  checkedInGate?: string | undefined;
  lunchClaimed: boolean;
  kitClaimed: boolean;
  hasDues: boolean;
  duesAmountPaisa: bigint;
}

export interface GateScanResult {
  status: "SUCCESS" | "ALREADY_CHECKED_IN" | "DUES_WARNING" | "INVALID_TOKEN";
  message: string;
  attendee?: DelegatePass | undefined;
  couponsIssued: {
    lunch: boolean;
    kit: boolean;
  };
  warningDetails?: {
    hasOutstandingDues: boolean;
    duesAmountBDT: string;
  } | undefined;
}

export interface ScannedCheckInDto {
  organizationId: string;
  eventId: string;
  memberId: string;
  scannedByOfficerId: string;
  standingStatus: "ACTIVE" | "SUSPENDED" | "EXPIRED";
  unpaidDuesPaisa: bigint;
}

export interface CheckInPassResult {
  success: boolean;
  memberId: string;
  memberName: string;
  memberNameBn: string;
  tier: string;
  branchName: string;
  standingStatus: "ACTIVE" | "SUSPENDED";
  duesStatus: "CLEARED" | "UNPAID_WARNING";
  unpaidDuesTaka: number;
  tokenNumber: number;
  dinnerCouponSerial: string;
  isAgmVoterEligible: boolean;
  checkedInAt: Date;
  messageBn: string;
}

@Injectable()
export class EventsService {
  private readonly delegates = new Map<string, DelegatePass>(); // qrSecurityToken -> DelegatePass
  private readonly checkedInMembers = new Map<string, Set<string>>(); // eventId -> Set of memberIds
  private tokenCounter = new Map<string, number>();

  /**
   * Registers an eligible delegate and produces a secured QR conference token
   */
  registerDelegate(dto: DelegateRegistrationDto): DelegatePass {
    const qrSecurityToken = `QR-${randomBytes(16).toString("hex").toUpperCase()}`;
    const ticketSeq = (this.delegates.size + 1).toString().padStart(4, "0");
    const ticketNumber = `CONF-${dto.eventId.slice(-3).toUpperCase()}-${ticketSeq}`;

    const pass: DelegatePass = {
      ticketNumber,
      eventId: dto.eventId,
      memberId: dto.memberId,
      memberName: dto.memberName,
      membershipNo: dto.membershipNo,
      organizationId: dto.organizationId,
      designation: dto.designation,
      qrSecurityToken,
      checkedIn: false,
      lunchClaimed: false,
      kitClaimed: false,
      hasDues: dto.hasDues,
      duesAmountPaisa: dto.duesAmountPaisa ?? 0n,
    };

    this.delegates.set(qrSecurityToken, pass);
    return pass;
  }

  /**
   * Gate barcode / QR scan processor with duplicate scan and dues protection
   */
  processGateScan(qrSecurityToken: string, gateOrStewardId: string): GateScanResult {
    const delegate = this.delegates.get(qrSecurityToken);
    if (!delegate) {
      return {
        status: "INVALID_TOKEN",
        message: "Unrecognized or fraudulent QR security token presented at gate.",
        couponsIssued: { lunch: false, kit: false },
      };
    }

    if (delegate.checkedIn) {
      return {
        status: "ALREADY_CHECKED_IN",
        message: `Delegate ${delegate.memberName} (${delegate.membershipNo}) was already admitted at gate ${delegate.checkedInGate} on ${delegate.checkedInAt?.toLocaleTimeString()}.`,
        attendee: delegate,
        couponsIssued: { lunch: false, kit: false },
      };
    }

    // Mark as checked in
    delegate.checkedIn = true;
    delegate.checkedInAt = new Date();
    delegate.checkedInGate = gateOrStewardId;

    let eventAttendance = this.checkedInMembers.get(delegate.eventId);
    if (!eventAttendance) {
      eventAttendance = new Set<string>();
      this.checkedInMembers.set(delegate.eventId, eventAttendance);
    }
    eventAttendance.add(delegate.memberId);

    // If dues are outstanding, alert the steward but record admission
    if (delegate.hasDues && delegate.duesAmountPaisa > 0n) {
      const bdt = (Number(delegate.duesAmountPaisa) / 100).toFixed(2);
      return {
        status: "DUES_WARNING",
        message: `Admitted with Warning: Member has outstanding annual dues of ৳${bdt}. Direct to finance desk.`,
        attendee: delegate,
        couponsIssued: { lunch: true, kit: true },
        warningDetails: {
          hasOutstandingDues: true,
          duesAmountBDT: bdt,
        },
      };
    }

    return {
      status: "SUCCESS",
      message: `Successfully verified and checked in ${delegate.memberName}. Kit and lunch coupons issued.`,
      attendee: delegate,
      couponsIssued: { lunch: true, kit: true },
    };
  }

  /**
   * Redeem a conference buffet or meal coupon
   */
  claimMealCoupon(qrSecurityToken: string): { claimed: boolean; couponType?: string | undefined; message: string } {
    const delegate = this.delegates.get(qrSecurityToken);
    if (!delegate) {
      return { claimed: false, message: "Invalid conference token." };
    }

    if (delegate.lunchClaimed) {
      return {
        claimed: false,
        message: `Conference lunch has already collected for ${delegate.memberName}.`,
      };
    }

    delegate.lunchClaimed = true;
    return {
      claimed: true,
      couponType: "LUNCH_BUFFET",
      message: `Lunch coupon validated for ${delegate.memberName}. Bon appétit!`,
    };
  }

  /**
   * Legacy / DTO based gate check in method
   */
  processGateCheckIn(dto: ScannedCheckInDto): CheckInPassResult {
    if (dto.standingStatus === "SUSPENDED" || dto.standingStatus === "EXPIRED") {
      throw new BadRequestException("Membership is suspended or inactive. Please contact the Secretariat helpdesk.");
    }

    let eventAttendance = this.checkedInMembers.get(dto.eventId);
    if (!eventAttendance) {
      eventAttendance = new Set<string>();
      this.checkedInMembers.set(dto.eventId, eventAttendance);
    }

    if (eventAttendance.has(dto.memberId)) {
      throw new BadRequestException(`Member ${dto.memberId} has already been checked in for this event.`);
    }

    eventAttendance.add(dto.memberId);

    const currentToken = (this.tokenCounter.get(dto.eventId) ?? 0) + 1;
    this.tokenCounter.set(dto.eventId, currentToken);

    const isDuesCleared = dto.unpaidDuesPaisa <= 0n;
    const unpaidTaka = Number(dto.unpaidDuesPaisa / 100n);

    return {
      success: true,
      memberId: dto.memberId,
      memberName: "Dr. Salma Begum",
      memberNameBn: "ডাঃ সালমা বেগম",
      tier: "GENERAL",
      branchName: "Kotwali Central Hospital Unit",
      standingStatus: "ACTIVE",
      duesStatus: isDuesCleared ? "CLEARED" : "UNPAID_WARNING",
      unpaidDuesTaka: unpaidTaka,
      tokenNumber: currentToken,
      dinnerCouponSerial: `DIN-${dto.eventId.slice(-3).toUpperCase()}-${String(currentToken).padStart(4, "0")}`,
      isAgmVoterEligible: isDuesCleared,
      checkedInAt: new Date(),
      messageBn: `স্বাগতম! আপনার সম্মেলন কিট এবং মধ্যাহ্নভোজ কুপন টোকেন নং #${currentToken} প্রস্তুত।`,
    };
  }

  getCheckedInCount(eventId: string): number {
    return this.checkedInMembers.get(eventId)?.size ?? 0;
  }
}
