import { Injectable, BadRequestException, NotFoundException, ConflictException } from "@nestjs/common";
import { EpsPaymentProvider } from "./providers/eps.provider";
import { BkashPaymentProvider } from "./providers/bkash.provider";
import { NagadPaymentProvider } from "./providers/nagad.provider";
import { SslCommerzPaymentProvider } from "./providers/sslcommerz.provider";
import { IPaymentProvider } from "./interfaces/payment-provider.interface";
import * as crypto from "crypto";

export interface CreateDuesInvoiceDto {
  organizationId: string;
  userId: string;
  tier: "ASSOCIATE" | "GENERAL" | "LIFE" | "HONORARY";
  period: "MONTHLY" | "ANNUAL" | "ONETIME";
  dueDate: Date;
}

export interface HardshipWaiverRequestDto {
  organizationId: string;
  invoiceId: string;
  userId: string;
  reason: string;
  supportingDocumentUrl?: string | undefined;
}

export interface ManualPaymentSubmissionDto {
  organizationId: string;
  invoiceId: string;
  userId: string;
  paymentMethod: "BANK_TRANSFER" | "BKASH" | "NAGAD" | "CASH";
  transactionRef: string;
  slipReceiptUrl?: string | undefined;
  amountPaisa: bigint;
}

export interface TreasurerVerificationDto {
  organizationId: string;
  invoiceId: string;
  treasurerId: string;
  approved: boolean;
  notes?: string | undefined;
}

export interface MoneyReceipt {
  receiptNumber: string;
  invoiceNumber: string;
  organizationId: string;
  recipientName: string;
  amountPaisa: bigint;
  amountFormattedBdt: string;
  paymentMethod: string;
  transactionRef: string;
  paidAt: Date;
  verificationQrUrl: string;
  securityHash: string;
}

// In-memory registry for demonstration / unit testing
export interface MockInvoiceRecord {
  id: string;
  organizationId: string;
  userId: string;
  invoiceNumber: string;
  description: string;
  amountPaisa: bigint;
  paidPaisa: bigint;
  status: "UNPAID" | "PAID" | "PARTIALLY_PAID" | "UNDER_VERIFICATION" | "WAIVED" | "CANCELLED";
  dueDate: Date;
  paidAt?: Date | undefined;
  idempotencyKey?: string | undefined;
  paymentMethod?: string | undefined;
  transactionRef?: string | undefined;
  slipReceiptUrl?: string | undefined;
  verifiedById?: string | undefined;
  waiverReason?: string | undefined;
}

@Injectable()
export class FinanceService {
  private readonly providers: Map<string, IPaymentProvider> = new Map();
  private readonly invoices: Map<string, MockInvoiceRecord> = new Map();
  private readonly processedIdempotencyKeys: Set<string> = new Set();

  constructor(
    epsProvider: EpsPaymentProvider,
    bkashProvider: BkashPaymentProvider,
    nagadProvider: NagadPaymentProvider,
    sslCommerzProvider: SslCommerzPaymentProvider
  ) {
    this.providers.set("EPS", epsProvider);
    this.providers.set("BKASH", bkashProvider);
    this.providers.set("NAGAD", nagadProvider);
    this.providers.set("SSLCOMMERZ", sslCommerzProvider);
  }

  getProvider(providerName: "EPS" | "BKASH" | "NAGAD" | "SSLCOMMERZ"): IPaymentProvider {
    const provider = this.providers.get(providerName);
    if (!provider) {
      throw new BadRequestException(`Unsupported payment gateway provider: ${providerName}`);
    }
    return provider;
  }

  /**
   * Generates integer paisa dues invoice based on tier
   */
  createDuesInvoice(dto: CreateDuesInvoiceDto): MockInvoiceRecord {
    let amountPaisa = 50000n; // Default General: ৳500.00
    if (dto.tier === "ASSOCIATE") {
      amountPaisa = 20000n; // ৳200.00
    } else if (dto.tier === "LIFE") {
      amountPaisa = 2500000n; // ৳25,000.00
    } else if (dto.tier === "HONORARY") {
      amountPaisa = 0n;
    }

    const invoiceId = `inv_${crypto.randomUUID()}`;
    const invoiceNumber = `INV-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;

    const invoice: MockInvoiceRecord = {
      id: invoiceId,
      organizationId: dto.organizationId,
      userId: dto.userId,
      invoiceNumber,
      description: `${dto.tier} Membership Dues (${dto.period})`,
      amountPaisa,
      paidPaisa: 0n,
      status: amountPaisa === 0n ? "PAID" : "UNPAID",
      dueDate: dto.dueDate,
    };

    this.invoices.set(invoiceId, invoice);
    return invoice;
  }

  /**
   * Evaluates grace period and delinquency status
   */
  evaluateGracePeriod(invoice: MockInvoiceRecord, now: Date = new Date()): {
    isDelinquent: boolean;
    daysOverdue: number;
    recommendedAction: "NONE" | "REMINDER" | "WARNING" | "SUSPENSION_TRIGGER";
  } {
    if (invoice.status === "PAID" || invoice.status === "WAIVED") {
      return { isDelinquent: false, daysOverdue: 0, recommendedAction: "NONE" };
    }

    const diffMs = now.getTime() - invoice.dueDate.getTime();
    const daysOverdue = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (daysOverdue <= 0) {
      return { isDelinquent: false, daysOverdue: 0, recommendedAction: "NONE" };
    }

    if (daysOverdue < 30) {
      return { isDelinquent: true, daysOverdue, recommendedAction: "REMINDER" };
    } else if (daysOverdue < 60) {
      return { isDelinquent: true, daysOverdue, recommendedAction: "WARNING" };
    } else {
      return { isDelinquent: true, daysOverdue, recommendedAction: "SUSPENSION_TRIGGER" };
    }
  }

  /**
   * Member submits hardship waiver request
   */
  submitHardshipWaiver(dto: HardshipWaiverRequestDto): MockInvoiceRecord {
    const invoice = this.invoices.get(dto.invoiceId);
    if (!invoice || invoice.organizationId !== dto.organizationId) {
      throw new NotFoundException(`Invoice not found`);
    }

    if (invoice.status === "PAID") {
      throw new BadRequestException(`Cannot request waiver for already paid invoice`);
    }

    invoice.waiverReason = dto.reason;
    invoice.status = "UNDER_VERIFICATION";
    return invoice;
  }

  /**
   * Member submits manual bank deposit slip or MFS reference
   */
  submitManualPaymentProof(dto: ManualPaymentSubmissionDto): MockInvoiceRecord {
    const invoice = this.invoices.get(dto.invoiceId);
    if (!invoice || invoice.organizationId !== dto.organizationId) {
      throw new NotFoundException(`Invoice not found`);
    }

    invoice.paymentMethod = dto.paymentMethod;
    invoice.transactionRef = dto.transactionRef;
    invoice.slipReceiptUrl = dto.slipReceiptUrl;
    invoice.status = "UNDER_VERIFICATION";
    return invoice;
  }

  /**
   * Treasurer verifies and settles manual payment or approves waiver
   */
  verifyManualPaymentByTreasurer(dto: TreasurerVerificationDto): MockInvoiceRecord {
    const invoice = this.invoices.get(dto.invoiceId);
    if (!invoice || invoice.organizationId !== dto.organizationId) {
      throw new NotFoundException(`Invoice not found`);
    }

    invoice.verifiedById = dto.treasurerId;

    if (dto.approved) {
      if (invoice.waiverReason) {
        invoice.status = "WAIVED";
      } else {
        invoice.status = "PAID";
        invoice.paidPaisa = invoice.amountPaisa;
        invoice.paidAt = new Date();
      }
    } else {
      invoice.status = "UNPAID";
    }

    return invoice;
  }

  /**
   * Settle invoice via automated payment gateway with idempotency check
   */
  settleGatewayPayment(
    organizationId: string,
    invoiceId: string,
    amountPaisa: bigint,
    gatewayProvider: "EPS" | "BKASH" | "NAGAD" | "SSLCOMMERZ",
    transactionRef: string,
    idempotencyKey: string
  ): MockInvoiceRecord {
    if (this.processedIdempotencyKeys.has(idempotencyKey)) {
      throw new ConflictException(`Duplicate payment callback ignored: IdempotencyKey ${idempotencyKey}`);
    }

    const invoice = this.invoices.get(invoiceId);
    if (!invoice || invoice.organizationId !== organizationId) {
      throw new NotFoundException(`Invoice not found`);
    }

    if (invoice.status === "PAID") {
      return invoice; // Already settled
    }

    invoice.paidPaisa = amountPaisa;
    invoice.status = amountPaisa >= invoice.amountPaisa ? "PAID" : "PARTIALLY_PAID";
    invoice.paymentMethod = gatewayProvider;
    invoice.transactionRef = transactionRef;
    invoice.idempotencyKey = idempotencyKey;
    invoice.paidAt = new Date();

    this.processedIdempotencyKeys.add(idempotencyKey);
    return invoice;
  }

  /**
   * Generates a tamper-proof digital money receipt
   */
  generateMoneyReceipt(invoiceId: string, recipientName: string): MoneyReceipt {
    const invoice = this.invoices.get(invoiceId);
    if (!invoice || invoice.status !== "PAID") {
      throw new BadRequestException(`Cannot generate receipt for unpaid or non-existent invoice`);
    }

    const taka = invoice.paidPaisa / 100n;
    const remainder = invoice.paidPaisa % 100n;
    const formattedBdt = `৳ ${taka}.${remainder < 10n ? `0${remainder}` : remainder}`;

    const receiptNumber = `RCP-${invoice.invoiceNumber.replace("INV-", "")}`;
    const securityPayload = `${receiptNumber}|${invoice.id}|${invoice.paidPaisa}|${invoice.transactionRef}`;
    const securityHash = crypto.createHash("sha256").update(securityPayload).digest("hex");

    return {
      receiptNumber,
      invoiceNumber: invoice.invoiceNumber,
      organizationId: invoice.organizationId,
      recipientName,
      amountPaisa: invoice.paidPaisa,
      amountFormattedBdt: formattedBdt,
      paymentMethod: invoice.paymentMethod ?? "EPS",
      transactionRef: invoice.transactionRef ?? `TXN-${receiptNumber}`,
      paidAt: invoice.paidAt ?? new Date(),
      verificationQrUrl: `https://app.orgos.bd/verify/receipt/${receiptNumber}?hash=${securityHash.substring(0, 16)}`,
      securityHash,
    };
  }
}
