import { Controller, Get } from "@nestjs/common";
import { Public } from "./common/decorators/public.decorator";

@Public()
@Controller()
export class AppController {
  @Get()
  getRoot() {
    return {
      status: "online",
      system: "Organization Management System API Engine",
      version: "1.0.0",
      description: "Institutional OS Multi-Tenant Backend",
      endpoints: {
        health: "/api/public/health",
        auth: {
          sendOtp: "/api/auth/send-otp",
          verifyOtp: "/api/auth/verify-otp",
          login: "/api/auth/login",
          me: "/api/auth/me",
          switchPosition: "/api/auth/switch-position",
          logout: "/api/auth/logout",
        },
        members: {
          list: "/api/members",
          apply: "/api/members/apply",
          getById: "/api/members/:id",
          endorse: "/api/members/:id/endorse",
          approve: "/api/members/:id/approve",
        },
        branches: {
          tree: "/api/branches/tree",
          list: "/api/branches",
        },
        finance: {
          invoices: "/api/finance/invoices",
          stats: "/api/finance/stats",
          receipt: "/api/finance/receipt/:id",
        },
        governance: {
          meetings: "/api/governance/meetings",
          resolutions: "/api/governance/resolutions",
        },
        communications: {
          notices: "/api/communications/notices",
          broadcast: "/api/communications/broadcast",
        },
        superadmin: {
          overview: "/api/superadmin/overview",
          tenants: "/api/superadmin/tenants",
        },
      },
    };
  }

  @Get("health")
  getHealth() {
    return {
      status: "healthy",
      timestamp: new Date().toISOString(),
      service: "Organization Operating System API",
    };
  }
}
