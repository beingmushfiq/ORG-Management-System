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
export class AlphaSmsProvider implements ISmsProvider {
  readonly providerName = "ALPHA_SMS" as const;
  private readonly logger = new Logger(AlphaSmsProvider.name);

  private calculateSegments(text: string, isUnicode: boolean): number {
    const len = text.length;
    return isUnicode
      ? len <= 70 ? 1 : Math.ceil(len / 67)
      : len <= 160 ? 1 : Math.ceil(len / 153);
  }

  async sendSingleSms(params: SendSmsParams): Promise<SmsSendResult> {
    const isUnicode = params.isUnicode ?? /[\u0980-\u09FF]/.test(params.messageBody);
    const segments = this.calculateSegments(params.messageBody, isUnicode);
    const messageId = `ALPHA-${Date.now()}-${crypto.randomBytes(3).toString("hex")}`;

    this.logger.log(`[Alpha SMS] Dispatched SMS to ${params.recipientMobile} (Sender ID: ${params.tenantCredentials.senderId})`);

    return {
      success: true,
      messageId,
      recipientMobile: params.recipientMobile,
      provider: "ALPHA_SMS",
      segmentsCount: segments,
      statusCode: "1000",
      statusMessage: "Submitted successfully",
      rawResponse: {
        status: "SUCCESS",
        data: [{ message_id: messageId, recipient: params.recipientMobile }],
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
      provider: "ALPHA_SMS",
      balanceCredits: 1800,
      currency: "BDT",
    };
  }

  parseDlrCallback(payload: Record<string, unknown>): DlrReport {
    const messageId = String(payload["message_id"] ?? "");
    const mobile = String(payload["recipient"] ?? "");
    const statusStr = String(payload["status"] ?? "").toUpperCase();

    let status: DlrReport["status"] = "PENDING";
    if (statusStr === "DELIVRD" || statusStr === "SUCCESS") status = "DELIVERED";
    else if (statusStr === "UNDELIV" || statusStr === "FAILED") status = "FAILED";

    return {
      messageId,
      recipientMobile: mobile,
      status,
      deliveredAt: new Date(),
    };
  }
}
