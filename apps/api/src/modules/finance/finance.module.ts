import { Module } from "@nestjs/common";
import { FinanceService } from "./finance.service";
import { EpsPaymentProvider } from "./providers/eps.provider";
import { BkashPaymentProvider } from "./providers/bkash.provider";
import { NagadPaymentProvider } from "./providers/nagad.provider";
import { SslCommerzPaymentProvider } from "./providers/sslcommerz.provider";

import { FinanceController } from "./finance.controller";

@Module({
  controllers: [FinanceController],
  providers: [
    FinanceService,
    EpsPaymentProvider,
    BkashPaymentProvider,
    NagadPaymentProvider,
    SslCommerzPaymentProvider,
  ],
  exports: [
    FinanceService,
    EpsPaymentProvider,
    BkashPaymentProvider,
    NagadPaymentProvider,
    SslCommerzPaymentProvider,
  ],
})
export class FinanceModule {}
