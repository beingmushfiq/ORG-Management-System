import { Module } from "@nestjs/common";
import { CommunicationsService } from "./communications.service";
import { SslWirelessSmsProvider } from "./providers/ssl-wireless.provider";
import { AlphaSmsProvider } from "./providers/alpha-sms.provider";
import { GreenwebSmsProvider } from "./providers/greenweb.provider";

import { CommunicationsController } from "./communications.controller";

@Module({
  controllers: [CommunicationsController],
  providers: [
    CommunicationsService,
    SslWirelessSmsProvider,
    AlphaSmsProvider,
    GreenwebSmsProvider,
  ],
  exports: [
    CommunicationsService,
    SslWirelessSmsProvider,
    AlphaSmsProvider,
    GreenwebSmsProvider,
  ],
})
export class CommunicationsModule {}
