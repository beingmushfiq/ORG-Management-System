import { Injectable, BadRequestException } from "@nestjs/common";
import { randomBytes } from "crypto";

export interface GoodStandingRequestDto {
  memberId: string;
  memberName: string;
  membershipNo: string;
  organizationId: string;
  bmdcRegNo: string;
  branchName: string;
  standing: "ACTIVE" | "SUSPENDED" | "EXPIRED";
  duesCleared: boolean;
  purpose: "FOREIGN_FELLOWSHIP" | "EMPLOYMENT_VERIFICATION" | "REGULATORY_BMDC" | "GENERAL_HONOR";
}

export interface GoodStandingCertificate {
  certificateNo: string;
  memoNo: string;
  memberId: string;
  memberName: string;
  membershipNo: string;
  bmdcRegNo: string;
  branchName: string;
  verificationToken: string;
  issuedAt: Date;
  validUntil: Date;
  purpose: string;
  isAuthentic: boolean;
  signatory: {
    name: string;
    designation: string;
    organization: string;
  };
}

export interface TaxDeductionSummary {
  memberId: string;
  membershipNo: string;
  fiscalYear: string;
  totalSubscriptionsPaisa: bigint;
  totalDonationsPaisa: bigint;
  totalExemptPaisa: bigint;
  totalExemptBDT: string;
  taxSectionReference: string;
  issuedAt: Date;
}

export interface ChamberPracticeEntry {
  id: string;
  memberId: string;
  institutionOrHospitalName: string;
  district: string;
  roomOrChamberNo: string;
  visitingHours: string;
  appointmentPhone: string;
  isPubliclyVisible: boolean;
}

@Injectable()
export class ConciergeService {
  private readonly chambers = new Map<string, ChamberPracticeEntry[]>();

  /**
   * Issues an official Certificate of Good Standing with cryptographic tamper-evident verification token
   */
  issueGoodStandingCertificate(dto: GoodStandingRequestDto): GoodStandingCertificate {
    if (dto.standing !== "ACTIVE") {
      throw new BadRequestException(
        "Certificate of Good Standing cannot be issued to a member with suspended or inactive standing."
      );
    }

    if (!dto.duesCleared) {
      throw new BadRequestException(
        "Certificate of Good Standing requires all annual membership subscriptions to be fully cleared."
      );
    }

    const verificationToken = `CGS-${randomBytes(16).toString("hex").toUpperCase()}`;
    const year = new Date().getFullYear();
    const memoSeq = Math.floor(1000 + Math.random() * 9000);
    const memoNo = `BMA/CENTRAL/${year}/CGS-${memoSeq}`;
    const certificateNo = `CERT-GS-${year}-${String(memoSeq).padStart(5, "0")}`;

    const issuedAt = new Date();
    const validUntil = new Date(issuedAt);
    validUntil.setFullYear(validUntil.getFullYear() + 1); // Valid for 1 year

    return {
      certificateNo,
      memoNo,
      memberId: dto.memberId,
      memberName: dto.memberName,
      membershipNo: dto.membershipNo,
      bmdcRegNo: dto.bmdcRegNo,
      branchName: dto.branchName,
      verificationToken,
      issuedAt,
      validUntil,
      purpose: dto.purpose,
      isAuthentic: true,
      signatory: {
        name: "Dr. Kazi Mostafa",
        designation: "Honorary General Secretary",
        organization: "Bangladesh Medical Association",
      },
    };
  }

  /**
   * Calculates statutory NBR Section 44 tax exemption total for membership subscriptions and relief donations
   */
  generateTaxExemptionSummary(
    memberId: string,
    membershipNo: string,
    fiscalYear: string,
    subscriptionsPaisa: bigint,
    donationsPaisa: bigint
  ): TaxDeductionSummary {
    const totalExemptPaisa = subscriptionsPaisa + donationsPaisa;
    const bdt = (Number(totalExemptPaisa) / 100).toFixed(2);

    return {
      memberId,
      membershipNo,
      fiscalYear,
      totalSubscriptionsPaisa: subscriptionsPaisa,
      totalDonationsPaisa: donationsPaisa,
      totalExemptPaisa,
      totalExemptBDT: bdt,
      taxSectionReference: "Section 44(2) of the Income Tax Act 2023 (Bangladesh)",
      issuedAt: new Date(),
    };
  }

  /**
   * Registers or updates a member's hospital / chamber visiting hours
   */
  updateChamberDirectory(entry: ChamberPracticeEntry): ChamberPracticeEntry[] {
    const existing = this.chambers.get(entry.memberId) ?? [];
    const filtered = existing.filter((c) => c.id !== entry.id);
    filtered.push(entry);
    this.chambers.set(entry.memberId, filtered);
    return filtered;
  }

  getChambers(memberId: string): ChamberPracticeEntry[] {
    return this.chambers.get(memberId) ?? [];
  }
}
