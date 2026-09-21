# Organization Management SaaS — Master Architecture & Implementation Blueprint
**Awwwards-Grade Interactive Portfolio · High-Performance MySQL Multi-Tenancy · Arbitrary-Depth Branch Hierarchy · Real-Time Governance Engine**

---

## 1. Visual & Interactive Experience Philosophy: Zero AI Slop

This platform rejects generic, boilerplate SaaS aesthetics. Rather than cookie-cutter cards and flat buttons, it delivers a state-of-the-art digital flagship:
- **Kinetic Typography & Staggered Choreography**: `Plus Jakarta Sans` / `Cabinet Grotesk` paired with refined `Hind Siliguri` (বাংলা) animated via GSAP SplitText and ScrollTrigger.
- **Cinematic Fluidity**: Smooth momentum inertia scrolling via **Lenis**, scrubbed scroll timelines, magnetic buttons, and layout transitions via **Framer Motion**.
- **Three.js & WebGL Visual Anchors**:
  - Interactive **3D Spatial Branch Galaxy** representing the organization's nationwide network.
  - Interactive **Holographic 3D Tiltable Member Card** with dynamic iridescent foil shaders and 3D card flip.
  - Cursor-reactive ambient particle constellations.

---

## 2. Locked Core Decisions (User Confirmed)

1. **Payment Ecosystem (All Options Enabled + EPS)**:
   - **EPS (Electronic Payment System — https://www.eps.com.bd/)** integrated as a primary Payment System Operator (PSO) in Bangladesh.
   - **bKash Checkout**, **Nagad**, and **SSLCommerz** fully supported.
   - **Manual Bank Deposit Slip & Personal MFS Reference** verification queue maintained for branch collections.
2. **Dynamic JSON Eligibility Rules Engine**:
   - Each organization can customize its progression rules (e.g. required continuous active months, zero dues compliance, and minimum activity/event points) stored as a dynamic template in `Organization.eligibilityRuleJson`.
3. **Hybrid Committee Governance & Elections**:
   - Supports both offline physical election documentation (uploading signed election gazettes/resolutions and appointing rosters) and a built-in digital secret-ballot election system.
4. **Per-Tenant Configurable SMS Gateway**:
   - Providers decoupled behind a unified adapter. Tenants can input their own provider credentials (SSL Wireless, Alpha SMS, Greenweb) and custom Masking Sender IDs.

---

## 3. Tech Stack Matrix

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend Framework** | **Next.js 15 (App Router)** | Server Components, Subdomain Routing, SEO, Bilingual (বাংলা/EN) |
| **Interactive 3D & Shaders** | **Three.js + React Three Fiber + Drei** | 3D Branch Galaxy, Holographic Tiltable ID Card, Ambient Particles |
| **Motion & Scroll Physics** | **Lenis + GSAP 3 + Framer Motion** | Inertia scroll, scrubbed timelines, micro-interactions, spring physics |
| **Styling & Design System** | **Tailwind CSS + Radix UI** | HSL CSS variable-driven dynamic tenant branding engine |
| **Backend API Engine** | **Node.js (NestJS)** | Strict modular guards, tenant isolation, branch scope security |
| **Database & ORM** | **MySQL 8.0+ (InnoDB) + Prisma** | Materialized Path tree queries, Recursive CTEs, Prisma Tenant Extension |
| **Cache & Background Worker**| **Redis + BullMQ** | Dynamic JSON eligibility calculation, bulk SMS/email dispatching |
| **Storage** | **Cloudflare R2 / AWS S3** | KYC documents, ID card SVGs, and portfolio media assets |
| **Payments** | **EPS + bKash + Nagad + SSLCommerz** | Full multi-gateway support with integer paisa (`BigInt`) ledger |

---

## 4. Multi-Tenant Architecture & Four-Layer Isolation

```
                             REQUEST: https://bma-ctg.saasplatform.com
                                                │
                                                ▼
                               ┌──────────────────────────────────┐
                               │     Next.js 15 Middleware        │
                               │   - Resolves Subdomain 'bma-ctg' │
                               │   - Injects 'x-tenant-id' header │
                               └──────────────────────────────────┘
                                                │
                         ┌──────────────────────┴──────────────────────┐
                         ▼                                             ▼
          ┌─────────────────────────────┐               ┌─────────────────────────────┐
          │  PUBLIC PORTFOLIO WEBSITE   │               │ INTERNAL MANAGEMENT PORTAL  │
          │   - 3D Branch Galaxy (R3F)  │               │   - Executive War Room (GS) │
          │   - Executive Leadership    │               │   - Dynamic Branch Tree     │
          │   - Notice Vault & Events   │               │   - Invoicing & EPS/bKash   │
          │   - Public Verification     │               │   - AGM Quorum & Elections  │
          │   - "Become a Member" Funnel│               │   - BullMQ Eligibility Core │
          └─────────────────────────────┘               └─────────────────────────────┘
                                                │
                                                ▼
                               ┌──────────────────────────────────┐
                               │   NestJS Tenant & Scope Guards   │
                               │   - Validates Tenant & Branch    │
                               │   - Binds to AsyncLocalStorage   │
                               └──────────────────────────────────┘
                                                │
                                                ▼
                               ┌──────────────────────────────────┐
                               │  Prisma Multi-Tenant Extension   │
                               │   - Injects `organizationId`     │
                               │     into every read and write    │
                               └──────────────────────────────────┘
                                                │
                                                ▼
                               ┌──────────────────────────────────┐
                               │           MySQL 8.0+             │
                               │  - Materialized Path Tree Slicing│
                               │  - Native Recursive CTEs         │
                               └──────────────────────────────────┘
```

---

## 5. Execution Roadmap

- **Phase 0**: Monorepo Setup (`Turborepo` + `Next.js 15` + `NestJS` + `MySQL` + `Prisma`), Strict TS, Docker Compose, Baseline Migrations.
- **Phase 1**: Subdomain Routing, Edge Middleware, Redis Tenant Cache, Prisma Tenant Extension, Design Tokens, Bilingual Typography, Lenis + GSAP.
- **Phase 2**: Multi-Position Auth, Materialized Path Branch Hierarchy, RBAC/ABAC Guards (`TenantGuard` $\to$ `PermissionGuard` $\to$ `ScopeInterceptor`), Immutable Audit Log.
- **Phase 3**: Member Onboarding Wizard, S3/R2 Document KYC, Dual-Track Approval State Machine, Privacy-Tiered Member Directory, Digital ID Generator.
- **Phase 4**: Public Portfolio with Three.js 3D Branch Constellation, Holographic 3D Tiltable ID Card, Public Verification Center (`/verify/member/:id`), PWA Shell.
- **Phase 5**: BigInt Paisa Financial Ledger, Invoicing, Recurring Dues, **EPS + bKash + Nagad + SSLCommerz + Manual Slip Verification**.
- **Phase 6**: BullMQ Dynamic JSON Eligibility Engine, **Per-Tenant SMS Gateway Credentials** (SSL Wireless, Alpha SMS, Greenweb), Emergency Broadcast.
- **Phase 7**: Executive War Room, Branch Health Heatmap, Quick-Sign Circulars, AGM Quorum, **Hybrid Committee Elections (Manual Gazette Upload + Digital Secret Ballots)**, Roll of Honor, Super Admin Portal.
- **Phase 8**: Advanced Modules (LMS, Surveys, Meetings, Tasks, Help Desk), Boundary Penetration Testing, WCAG AA Audit, Deployment Runbook.
