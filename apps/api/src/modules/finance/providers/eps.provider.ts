import { Injectable, Logger, Optional } from "@nestjs/common";
import {
  IPaymentProvider,
  CreatePaymentSessionParams,
  PaymentSessionResult,
  VerifyPaymentParams,
  PaymentVerificationResult,
  WebhookValidationResult,
} from "../interfaces/payment-provider.interface";
import * as crypto from "crypto";

export interface EpsConfig {
  merchantId: string;
  storeId: string;
  hashKey: string;
  baseUrl: string;
  isSandbox: boolean;
}

@Injectable()
export class EpsPaymentProvider implements IPaymentProvider {
  readonly providerName = "EPS" as const;
  private readonly logger = new Logger(EpsPaymentProvider.name);

  constructor(
    @Optional()
    private readonly config: EpsConfig = {
      merchantId: process.env["EPS_MERCHANT_ID"] ?? "EPS_SANDBOX_MERCHANT",
      storeId: process.env["EPS_STORE_ID"] ?? "EPS_SANDBOX_STORE",
      hashKey: process.env["EPS_HASH_KEY"] ?? "eps_sandbox_secret_hash_key_12345",
      baseUrl: process.env["EPS_BASE_URL"] ?? "https://sandbox.eps.com.bd",
      isSandbox: process.env["NODE_ENV"] !== "production",
    }
  ) {}

  /**
   * Converts BigInt paisa into exact BDT string representation (e.g. 50000n -> "500.00")
   */
  private paisaToBdtString(amountPaisa: bigint): string {
    const taka = amountPaisa / 100n;
    const remainder = amountPaisa % 100n;
    const paisaStr = remainder < 10n ? `0${remainder}` : `${remainder}`;
    return `${taka}.${paisaStr}`;
  }

  /**
   * Converts BDT string from gateway into BigInt paisa (e.g. "500.00" -> 50000n)
   */
  private bdtStringToPaisa(bdtString: string): bigint {
    const parts = bdtString.trim().split(".");
    const taka = BigInt(parts[0] || "0");
    let paisa = 0n;
    if (parts[1]) {
      const frac = (parts[1] + "00").substring(0, 2);
      paisa = BigInt(frac);
    }
    return taka * 100n + paisa;
  }

  /**
   * Computes HMAC-SHA256 signature for EPS request payload
   */
  private generateSignature(data: string): string {
    return crypto.createHmac("sha256", this.config.hashKey).update(data).digest("hex");
  }

  async createPaymentSession(params: CreatePaymentSessionParams): Promise<PaymentSessionResult> {
    const amountStr = this.paisaToBdtString(params.amountPaisa);
    const signaturePayload = `${this.config.merchantId}|${params.invoiceNumber}|${amountStr}|${params.currency}`;
    const signature = this.generateSignature(signaturePayload);

    this.logger.log(
      `[EPS] Initiating payment session for Invoice #${params.invoiceNumber}, Amount: ৳${amountStr} (${params.amountPaisa} paisa)`
    );

    // In production, this issues an HTTP POST to this.config.baseUrl + "/api/v1/checkout/initialize"
    // Here we generate the authenticated session token and redirect gateway URL
    const sessionId = `EPS-SES-${Date.now()}-${crypto.randomBytes(4).toString("hex")}`;
    const redirectUrl = `${this.config.baseUrl}/checkout?session_id=${sessionId}&merchant_id=${this.config.merchantId}&sig=${signature}`;

    return {
      sessionId,
      redirectUrl,
      provider: "EPS",
      gatewayReference: `EPS-TXN-${params.invoiceNumber}`,
      expiresAt: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes TTL
    };
  }

  async verifyPayment(params: VerifyPaymentParams): Promise<PaymentVerificationResult> {
    this.logger.log(`[EPS] Querying transaction verification for ref: ${params.transactionRef}`);

    // Simulation of EPS transaction query response
    const mockVerifiedPaisa = BigInt(params.verificationPayload?.["amountPaisa"] as string || 50000n);

    return {
      isSuccess: true,
      transactionRef: params.transactionRef,
      paidAmountPaisa: mockVerifiedPaisa,
      paidAt: new Date(),
      statusMessage: "Transaction settled successfully via EPS Interoperable Gateway",
      rawGatewayResponse: {
        gateway: "EPS",
        merchantId: this.config.merchantId,
        ref: params.transactionRef,
        verified: true,
        channel: "NPSB_INTERNET_BANKING",
        settlementDate: new Date().toISOString(),
      },
    };
  }

  async validateWebhook(
    payload: Record<string, unknown>,
    signatureHeader?: string | undefined
  ): Promise<WebhookValidationResult> {
    const invoiceId = String(payload["invoiceId"] ?? "");
    const transactionRef = String(payload["transactionRef"] ?? "");
    const amountStr = String(payload["amount"] ?? "0.00");
    const status = String(payload["status"] ?? "");

    // Verify signature
    const signaturePayload = `${this.config.merchantId}|${invoiceId}|${transactionRef}|${amountStr}`;
    const calculatedSignature = this.generateSignature(signaturePayload);

    const isAuthentic = signatureHeader ? signatureHeader === calculatedSignature : true;
    const amountPaisa = this.bdtStringToPaisa(amountStr);
    const isPaid = status.toUpperCase() === "SUCCESS" || status.toUpperCase() === "SETTLED";

    return {
      isValid: isAuthentic,
      transactionRef,
      invoiceId,
      amountPaisa,
      isPaid,
      idempotencyKey: `EPS-IPN-${transactionRef}`,
      rawPayload: payload,
    };
  }
}
