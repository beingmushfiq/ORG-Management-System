/**
 * Unified Multi-Gateway Payment Provider Interface
 * Supports EPS (Electronic Payment System), bKash Checkout, Nagad, and SSLCommerz.
 * All monetary amounts are handled strictly in integer paisa (BigInt) to prevent IEEE 754 precision loss.
 */

export interface CreatePaymentSessionParams {
  organizationId: string;
  invoiceId: string;
  invoiceNumber: string;
  amountPaisa: bigint;
  currency: "BDT";
  customerName: string;
  customerEmail?: string | undefined;
  customerPhone: string;
  callbackUrl: string;
  cancelUrl: string;
  ipnUrl: string;
}

export interface PaymentSessionResult {
  sessionId: string;
  redirectUrl: string;
  provider: "EPS" | "BKASH" | "NAGAD" | "SSLCOMMERZ";
  gatewayReference?: string | undefined;
  expiresAt?: Date | undefined;
}

export interface VerifyPaymentParams {
  organizationId: string;
  invoiceId: string;
  transactionRef: string;
  gatewayProvider: "EPS" | "BKASH" | "NAGAD" | "SSLCOMMERZ";
  verificationPayload?: Record<string, unknown> | undefined;
}

export interface PaymentVerificationResult {
  isSuccess: boolean;
  transactionRef: string;
  paidAmountPaisa: bigint;
  paidAt: Date;
  statusMessage: string;
  rawGatewayResponse: Record<string, unknown>;
}

export interface WebhookValidationResult {
  isValid: boolean;
  transactionRef: string;
  invoiceId: string;
  amountPaisa: bigint;
  isPaid: boolean;
  idempotencyKey: string;
  rawPayload: Record<string, unknown>;
}

export interface IPaymentProvider {
  readonly providerName: "EPS" | "BKASH" | "NAGAD" | "SSLCOMMERZ";

  /**
   * Initiates payment flow and returns redirect URL or checkout token
   */
  createPaymentSession(params: CreatePaymentSessionParams): Promise<PaymentSessionResult>;

  /**
   * Actively queries the gateway API to verify a transaction status
   */
  verifyPayment(params: VerifyPaymentParams): Promise<PaymentVerificationResult>;

  /**
   * Validates and verifies incoming asynchronous webhook / IPN callback
   */
  validateWebhook(payload: Record<string, unknown>, signatureHeader?: string | undefined): Promise<WebhookValidationResult>;
}
