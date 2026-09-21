import { Module } from "@nestjs/common";
import { ClsModule } from "nestjs-cls";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { TenantContextInterceptor } from "./common/interceptors/tenant-context.interceptor";
import { ScopeInterceptor } from "./common/interceptors/scope.interceptor";

import { AuthModule } from "./modules/auth/auth.module";
import { MembershipModule } from "./modules/membership/membership.module";
import { HierarchyModule } from "./modules/hierarchy/hierarchy.module";
import { FinanceModule } from "./modules/finance/finance.module";
import { GovernanceModule } from "./modules/governance/governance.module";
import { EventsModule } from "./modules/events/events.module";
import { CommunicationsModule } from "./modules/communications/communications.module";
import { PublicModule } from "./modules/public/public.module";
import { AuditModule } from "./modules/audit/audit.module";
import { SuperadminModule } from "./modules/superadmin/superadmin.module";

@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
    }),
    AuthModule,
    MembershipModule,
    HierarchyModule,
    FinanceModule,
    GovernanceModule,
    EventsModule,
    CommunicationsModule,
    PublicModule,
    AuditModule,
    SuperadminModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TenantContextInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ScopeInterceptor,
    },
  ],
})
export class AppModule {}
