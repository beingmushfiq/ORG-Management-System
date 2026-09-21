import { Injectable, Logger, BadRequestException } from "@nestjs/common";
import { SslWirelessSmsProvider } from "./providers/ssl-wireless.provider";
import { AlphaSmsProvider } from "./providers/alpha-sms.provider";
import { GreenwebSmsProvider } from "./providers/greenweb.provider";
import {
  ISmsProvider,
  TenantSmsCredentials,
  SmsSendResult,
  SmsBalanceResult,
} from "./interfaces/sms-provider.interface";
import { TemplateEngine, RenderTemplateOptions } from "./template-engine";

export interface EmergencyBroadcastDto {
  organizationId: string;
  senderId: string;
  targetBranchNodePathPrefix?: string | undefined; // e.g. "/root/ctg-central"
  messageHeadline: string;
  noticeUrl: string;
  recipients: Array<{
    mobile: string;
    name: string;
    branchPath: string;
  }>;
  locale?: "en" | "bn" | undefined;
}

export interface BroadcastSummary {
  broadcastId: string;
  totalTargeted: number;
  totalSent: number;
  provider: string;
  senderId: string;
  sampleMessage: string;
  dispatchedAt: Date;
}

@Injectable()
export class CommunicationsService {
  private readonly providers: Map<string, ISmsProvider> = new Map();
  private readonly logger = new Logger(CommunicationsService.name);

  constructor(
    sslWirelessProvider: SslWirelessSmsProvider,
    alphaSmsProvider: AlphaSmsProvider,
    greenwebProvider: GreenwebSmsProvider
  ) {
    this.providers.set("SSL_WIRELESS", sslWirelessProvider);
    this.providers.set("ALPHA_SMS", alphaSmsProvider);
    this.providers.set("GREENWEB", greenwebProvider);
  }

  getProvider(providerName: "SSL_WIRELESS" | "ALPHA_SMS" | "GREENWEB"): ISmsProvider {
    const provider = this.providers.get(providerName);
    if (!provider) {
      throw new BadRequestException(`SMS provider ${providerName} is not configured`);
    }
    return provider;
  }

  async checkBalance(credentials: TenantSmsCredentials): Promise<SmsBalanceResult> {
    const provider = this.getProvider(credentials.provider);
    return provider.checkBalance(credentials);
  }

  /**
   * Executes Priority Emergency Broadcast with Materialized Path branch tree filtering
   */
  async dispatchEmergencyBroadcast(
    credentials: TenantSmsCredentials,
    dto: EmergencyBroadcastDto
  ): Promise<BroadcastSummary> {
    const provider = this.getProvider(credentials.provider);

    // Filter recipients by branch path prefix (if provided)
    const eligibleRecipients = dto.targetBranchNodePathPrefix
      ? dto.recipients.filter((r) => r.branchPath.startsWith(dto.targetBranchNodePathPrefix!))
      : dto.recipients;

    const template = TemplateEngine.STANDARD_TEMPLATES["EMERGENCY_CIRCULAR"]!;
    const locale = dto.locale ?? "bn";

    const rendered = TemplateEngine.render({
      template,
      locale,
      variables: {
        orgName: credentials.senderId,
        headline: dto.messageHeadline,
        noticeLink: dto.noticeUrl,
      },
    });

    this.logger.warn(
      `[EMERGENCY BROADCAST] Tenant: ${dto.organizationId}, Scope: ${dto.targetBranchNodePathPrefix || "ALL_BRANCHES"}. Sending to ${eligibleRecipients.length} recipients.`
    );

    const mobileList = eligibleRecipients.map((r) => r.mobile);

    const results = await provider.sendBatchSms({
      tenantCredentials: credentials,
      recipientMobiles: mobileList,
      messageBody: rendered.renderedText,
      isUnicode: rendered.isUnicode,
    });

    const successCount = results.filter((r) => r.success).length;

    return {
      broadcastId: `BCAST-${Date.now()}`,
      totalTargeted: eligibleRecipients.length,
      totalSent: successCount,
      provider: credentials.provider,
      senderId: credentials.senderId,
      sampleMessage: rendered.renderedText,
      dispatchedAt: new Date(),
    };
  }
}
