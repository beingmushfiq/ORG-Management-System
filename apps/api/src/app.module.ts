import { Module } from "@nestjs/common";
import { ClsModule } from "nestjs-cls";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { TenantContextInterceptor } from "./common/interceptors/tenant-context.interceptor";
import { ScopeInterceptor } from "./common/interceptors/scope.interceptor";

@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
    }),
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
