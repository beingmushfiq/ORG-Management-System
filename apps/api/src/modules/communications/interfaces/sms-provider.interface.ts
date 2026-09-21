/**
 * Decoupled Multi-Vendor SMS Gateway Architecture
 * Enables per-tenant encrypted credentials, Masking Sender IDs, and Delivery Report (DLR) tracking.
 */

export interface TenantSmsCredentials {
  organizationId: string;
  provider: "SSL_WIRELESS" | "ALPHA_SMS" | "GREENWEB";
  apiKey: string;
  apiSecret?: string | undefined;
  senderId: string; // e.g. "BMA-CTG" (Approved Masking Sender ID)
  isApprovedMasking: boolean;
}

export interface SendSmsParams {
  tenantCredentials: TenantSmsCredentials;
  recipientMobile: string; // "01XXXXXXXXX" or "+8801XXXXXXXXX"
  messageBody: string;
  isUnicode?: boolean | undefined; // Bengali text requires UCS-2 Unicode encoding
  referenceId?: string | undefined;
}

export interface SmsSendResult {
  success: boolean;
  messageId: string;
  recipientMobile: string;
  provider: "SSL_WIRELESS" | "ALPHA_SMS" | "GREENWEB";
  segmentsCount: number;
  statusCode: string;
  statusMessage: string;
  rawResponse: Record<string, unknown>;
}

export interface SmsBalanceResult {
  organizationId: string;
  provider: string;
  balanceCredits: number;
  currency: "BDT" | "CREDITS";
}

export interface DlrReport {
  messageId: string;
  recipientMobile: string;
  status: "DELIVERED" | "FAILED" | "PENDING" | "UNDELIVERABLE";
  deliveredAt?: Date | undefined;
  errorCode?: string | undefined;
}

export interface ISmsProvider {
  readonly providerName: "SSL_WIRELESS" | "ALPHA_SMS" | "GREENWEB";

  sendSingleSms(params: SendSmsParams): Promise<SmsSendResult>;
  sendBatchSms(params: Omit<SendSmsParams, "recipientMobile"> & { recipientMobiles: string[] }): Promise<SmsSendResult[]>;
  checkBalance(credentials: TenantSmsCredentials): Promise<SmsBalanceResult>;
  parseDlrCallback(payload: Record<string, unknown>): DlrReport;
}
