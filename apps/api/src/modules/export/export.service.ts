import { Injectable } from "@nestjs/common";

export interface MemberRegisterRow {
  serialNo: number;
  membershipNo: string;
  name: string;
  nameBn: string;
  tier: "LIFE" | "GENERAL" | "ASSOCIATE" | "HONORARY";
  branchName: string;
  admissionDate: string;
  nationalIdOrRegNo: string;
  standing: "ACTIVE" | "SUSPENDED";
  duesCleared: boolean;
}

export interface VoterListRow {
  ballotSerial: number;
  voterId: string;
  name: string;
  nameBn: string;
  membershipNo: string;
  branchName: string;
  signatureBoxRequired: boolean;
}

export interface CashBookEntry {
  date: string;
  voucherNo: string;
  particulars: string;
  accountHead: "SUBSCRIPTION" | "CONFERENCE" | "DONATION" | "RELIEF_EXPENSE" | "OFFICE_EXPENSE";
  receiptPaisa: bigint;
  paymentPaisa: bigint;
}

export interface CashBookSummary {
  organizationId: string;
  fiscalYear: string;
  openingBalancePaisa: bigint;
  totalReceiptsPaisa: bigint;
  totalPaymentsPaisa: bigint;
  closingBalancePaisa: bigint;
  entries: CashBookEntry[];
}

@Injectable()
export class ExportService {
  /**
   * Generates formal statutory Member Register compliant with Societies Registration Act XXI of 1860
   */
  generateSocietiesActMemberRegister(organizationId: string, members: MemberRegisterRow[]): {
    header: {
      statutoryAct: string;
      organizationId: string;
      totalEnrolledMembers: number;
      activeVoters: number;
      generatedAt: Date;
    };
    records: MemberRegisterRow[];
  } {
    const activeVoters = members.filter((m) => m.standing === "ACTIVE" && m.duesCleared).length;

    return {
      header: {
        statutoryAct: "Societies Registration Act XXI of 1860 (Section 4 & 5 Compliance)",
        organizationId,
        totalEnrolledMembers: members.length,
        activeVoters,
        generatedAt: new Date(),
      },
      records: members.map((m, index) => ({
        ...m,
        serialNo: index + 1,
      })),
    };
  }

  /**
   * Compiles the official AGM Voter List with signature / thumbprint box layout
   */
  compileAgmVoterRoll(_organizationId: string, _eventId: string, members: MemberRegisterRow[]): VoterListRow[] {
    return members
      .filter((m) => m.standing === "ACTIVE" && m.duesCleared)
      .map((m, index) => ({
        ballotSerial: index + 1,
        voterId: `VTR-${String(index + 1).padStart(4, "0")}`,
        name: m.name,
        nameBn: m.nameBn,
        membershipNo: m.membershipNo,
        branchName: m.branchName,
        signatureBoxRequired: true,
      }));
  }

  /**
   * Generates Double-entry Cash Book report with paisa arithmetic
   */
  generateCashBookStatement(
    organizationId: string,
    fiscalYear: string,
    openingBalancePaisa: bigint,
    entries: CashBookEntry[]
  ): CashBookSummary {
    let totalReceipts = 0n;
    let totalPayments = 0n;

    for (const entry of entries) {
      totalReceipts += entry.receiptPaisa;
      totalPayments += entry.paymentPaisa;
    }

    const closingBalance = openingBalancePaisa + totalReceipts - totalPayments;

    return {
      organizationId,
      fiscalYear,
      openingBalancePaisa,
      totalReceiptsPaisa: totalReceipts,
      totalPaymentsPaisa: totalPayments,
      closingBalancePaisa: closingBalance,
      entries,
    };
  }
}
