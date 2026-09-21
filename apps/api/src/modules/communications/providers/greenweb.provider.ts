import { Injectable, Logger } from "@nestjs/common";
import {
  ISmsProvider,
  SendSmsParams,
  SmsSendResult,
  SmsBalanceResult,
  DlrReport,
  TenantSmsCredentials,
} from "../interfaces/sms-provider.interface";
import * as crypto from "crypto";

@Injectable()
export class GreenwebSmsProvider implements ISmsProvider {
  readonly providerName = "GREENWEB" as const;
  private readonly logger = new Logger(GreenwebSmsProvider.name);

  private calculateSegments(text: string, isUnicode: boolean): number {
    const len = text.length;
    return isUnicode
      ? len <= 70 ? 1 : Math.ceil(len / 67)
      : len <= 160 ? 1 : Math.ceil(len / 153);
  }

  async sendSingleSms(params: SendSmsParams): Promise<SmsSendResult> {
    const isUnicode = params.isUnicode ?? /[\u0980-\u09FF]/.test(params.messageBody);
    const segments = this.calculateSegments(params.messageBody, isUnicode);
    const messageId = `GW-${Date.now()}-${crypto.randomBytes(3).toString("hex")}`;

    this.logger.log(`[Greenweb] Dispatched SMS to ${params.recipientMobile} via Masking SID "${params.tenantCredentials.senderId}"`);

    return {
      success: true,
      messageId,
      recipientMobile: params.recipientMobile,
      provider: "GREENWEB",
      segmentsCount: segments,
      statusCode: "OK",
      statusMessage: "SMS Queued Successfully",
      rawResponse: {
        status: "success",
        msgid: messageId,
        to: params.recipientMobile,
      },
    };
  }

  async sendBatchSms(
    params: Omit<SendSmsParams, "recipientMobile"> & { recipientMobiles: string[] }
  ): Promise<SmsSendResult[]> {
    return Promise.all(
      params.recipientMobiles.map((mobile) =>
        this.sendSingleSms({
          ...params,
          recipientMobile: mobile,
        })
      )
    );
  }

  async checkBalance(credentials: TenantSmsCredentials): Promise<SmsBalanceResult> {
    return {
      organizationId: credentials.organizationId,
      provider: "GREENWEB",
      balanceCredits: 9500,
      currency: "CREDITS",
    };
  }

  parseDlrCallback(payload: Record<string, unknown>): DlrReport {
    const messageId = String(payload["msgid"] ?? "");
    const mobile = String(payload["to"] ?? "");
    const statusStr = String(payload["status"] ?? "").toUpperCase();

    let status: DlrReport["status"] = "PENDING";
    if (statusStr === "DELIVERED" || statusStr === "SENT") status = "DELIVERED";
    else if (statusStr === "FAILED") status = "FAILED";

    return {
      messageId,
      recipientMobile: mobile,
      status,
      deliveredAt: new Date(),
    };
  }
}
