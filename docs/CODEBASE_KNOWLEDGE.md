# System Architecture & Codebase Knowledge Base
**Multi-Tenant Organization Management SaaS (Enterprise Civic & Movement Edition)**
*Maintained as the single, persistent source of truth for engineering agents and core maintainers.*
*Reference Organization: Road Safety Movement (নিরাপদ সড়ক আন্দোলন) — [roadsafetymovement.org](https://www.roadsafetymovement.org/)*

---

## 1. Executive Monorepo Topology

```
ORG Management System/
├── apps/
│   ├── api/                    # NestJS Modular Enterprise Backend (Port 4000)
│   │   ├── src/
│   │   │   ├── modules/        # 12 Autonomous Domain Modules (Auth, Finance, Membership, etc.)
│   │   │   ├── common/         # Guards, Interceptors, Filters, Decorators
│   │   │   └── main.ts         # NestJS bootstrap, ValidationPipe, CORS, Global Prefix
│   │   └── test/               # Vitest e2e/unit security & boundary test suites
│   └── web/                    # Next.js 15 App Router Frontend (Port 3000)
│       ├── public/             # Static assets, Web App Manifest (PWA), Service Worker
│       ├── src/
│       │   ├── app/            # 30 Prerendered Static & Dynamic Routes
│       │   ├── components/     # UI, Geo Atlas (64 Districts), Governance Organogram, Brand
│       │   ├── lib/            # Utilities, Web Audio API Synthesizer (audio-effects.ts)
│       │   └── middleware.ts   # Edge subdomain tenant resolution & header injection
├── packages/
│   ├── database/               # Prisma ORM + MySQL 8.0 Engine
│   │   ├── prisma/
│   │   │   ├── schema.prisma   # 20+ Models (BigInt Paisa, Adjacency List + Materialized Path)
│   │   │   └── seed.ts         # Road Safety Movement (RSM) national seed dataset
│   │   ├── src/
│   │   │   ├── hierarchy.ts    # Atomic node-move transactions & cyclic hierarchy protection
│   │   │   └── tenant-extension.ts # Layer 3 Prisma Multi-Tenant Extension
│   │   └── test/               # Vitest tenant-isolation & hierarchy test suites
│   ├── ui/                     # Shared Design System Component Library
│   │   └── src/
│   │       ├── components/     # Button, Badge, Card, Input, Toast, CopyButton, Skeleton, Tooltip
│   │       └── lib/utils.ts    # clsx + tailwind-merge (cn helper)
│   └── config/                 # Monorepo TypeScript & ESLint Presets
├── docs/                       # Architectural specifications and module templates
├── docker-compose.yml          # MySQL 8.0 (InnoDB) + Redis 7.0 container configuration
├── turbo.json                  # Turborepo build pipeline orchestration
└── package.json                # Root pnpm workspaces configuration
```

---

## 2. Multi-Tenancy & Security Invariants

The platform enforces **4-Layer Defense-in-Depth Multi-Tenancy**:

1. **Layer 1 — Next.js Edge Middleware (`apps/web/src/middleware.ts`)**:
   - Intercepts every inbound HTTP request.
   - Extracts subdomain from `Host` header (e.g., `rsm.orgms.app` $\to$ `rsm`).
   - Resolves tenant UUID from Redis cache; rejects suspended/unknown organizations.
   - Injects `x-tenant-id` downstream to Server Components and API proxies.

2. **Layer 2 — NestJS Execution Pipeline (`apps/api/src/common/`)**:
   - `TenantContextInterceptor`: Binds tenant ID to `AsyncLocalStorage` via `nestjs-cls`.
   - `TenantGuard`: Confirms organization subscription status is `ACTIVE`.
   - `PermissionGuard`: Resolves active positions and permission matrix (`VIEW | CREATE | EDIT | DELETE | APPROVE | REJECT | EXPORT | ASSIGN`).
   - `ScopeInterceptor`: Resolves branch tree boundaries (`materializedPath`). A branch officer is mathematically restricted to `path = :p OR path LIKE :p/%`. Root officers receive full tenant scope.

3. **Layer 3 — Prisma Client Multi-Tenant Extension (`packages/database/src/tenant-extension.ts`)**:
   - Extended Prisma Client automatically injects `{ where: { organizationId } }` into all `findMany`, `findFirst`, `update`, `delete`, and `count` operations.
   - Auto-assigns `organizationId` on all record creations.

4. **Layer 4 — Database Foreign Key & Composite Index Invariants**:
   - Every tenant-scoped table has a non-nullable `organizationId` column indexed with domain keys (e.g. `@@index([organizationId, status])`).
   - An immutable, append-only `AuditLog` table records all state mutations.

---

## 3. Financial Invariants: The Integer Paisa Ledger

- **Zero Floating-Point Arithmetic**: All monetary values are stored strictly as `BigInt` paisa (1 BDT = 100 paisa) in MySQL `BIGINT`.
- **Payment Gateway Adapters (`apps/api/src/modules/finance/providers/`)**:
  - **EPS (Electronic Payment System — https://www.eps.com.bd/)**: PSO interoperable payment gateway with HMAC-SHA256 signature verification.
  - **bKash Checkout**: URL-based tokenized API v1.2.0-beta with execute payment callbacks.
  - **Nagad**: PGW initialization and verified callback handlers.
  - **SSLCommerz**: Session initialization with IPN validation.
- **Idempotency**: All gateway callback webhooks use deterministic idempotency keys (`Invoice.id + gatewayRef`) preventing double-credit attacks.

---

## 4. Key Specialized Frontend Subsystems

### 4.1. Geographically Accurate 64-District Bangladesh Atlas
Located in `apps/web/src/components/geo/bangladesh-branch-atlas.tsx` with vector data in `bangladesh-districts-geo.json`:
- Built from official BBS/OCHA administrative MultiPolygon data.
- Dual visual modes:
  - **National Green Map**: Authentic green cartography with white district labels centered at computed centroids.
  - **Adaptive Theme Map**: Automatically adapts contrast to current Light/Dark theme.
- Features real-time division filtering, live search (English/Bangla), hover tooltips, and an interactive safety dossier with direct coordinator call links.

### 4.2. Drag-and-Drop Organogram Reordering
Located in `apps/web/src/components/governance/interactive-organogram.tsx`:
- Provides council administrators with an intuitive HTML5 drag-and-drop interface to reorder executive directorate precedence.
- Real-time automatic rank recalculation with audio feedback and toast ratification notifications.

### 4.3. Dynamic Real-Time DOM Theme Engine
- Managed in `apps/web/src/components/providers/theme-provider.tsx`.
- Connects to CMS color pickers to mutate CSS variables (`--primary`, `--ring`, `--accent`) live on `:root` without page reload.

### 4.4. Web Audio API Haptic Synthesizer
- Implemented in `apps/web/src/lib/audio-effects.ts`.
- Zero external assets. Generates lightweight acoustic frequency clicks, ratification chimes, and drop chords directly via browser audio oscillators.

---

## 5. Complete Frontend Route Catalog (All 30 Routes)

### Public & Civic Portfolio
1. `/` — Institutional Hero, 64-District Atlas, Movement Heritage Chronicle (2018–2026), Executive Organogram.
2. `/apply` — 4-Step Public Volunteer Recruitment & Membership Application Wizard.
3. `/events` — Road Safety Workshops, Rallies, and Defensive Driving Symposiums.
4. `/events/[id]` — Dynamic Event Details, Hour-by-Hour Agenda, Speaker Rosters.
5. `/notices` — Official Gazette & Press Release Vault with bilingual search and memo references.
6. `/notices/[id]` — Dynamic Gazette Memo Reader with printable letterhead.
7. `/causes` — 420 Blackspot Elimination & Victim Relief Funds with instant vouchers.
8. `/gallery` — Photographic Media Archive & Press Lightbox.
9. `/journal` — Road Safety Research Publications & Crash Data Repository.
10. `/memorial` — Road Crash Victims & Movement Martyrs Memorial Hall ("স্মৃতি চিরন্তন").
11. `/verify/member/[id]` — Public Volunteer Pass Verification with cryptographic SHA-256 seal.
12. `/verify/cert/[id]` — Public Training & Good Standing Credential Verification.
13. `/login` — Unified Mobile OTP (+880) & Email/Password Sign-In.
14. `/design-system` — Living Design System & Bengali Typographic Conjunct QA Lab.

### Member & Executive Operational Portal
15. `/portal` — Central Secretariat Module Hub (Routing to all 12 subsystems).
16. `/portal/cms` — Visual Portfolio CMS & Brand Studio with real-time DOM theme swapping.
17. `/portal/concierge` — Fast-Track Member Concierge Desk (Good Standing, Tax Rebate, Helpline).
18. `/portal/members` — Member Directory with live 3-tier privacy enforcement (Public / Member / Executive).
19. `/portal/branches` — Interactive Visual Branch Tree Explorer with materialized path telemetry.
20. `/portal/command` — Executive Command War Room with live velocity ticker and Daily Briefing Card.
21. `/portal/command/resolutions` — Statutory Meeting Minutes & Numbered Resolution Compiler.
22. `/portal/finance` — Treasurer Financial Command Portal with bank slip verification queue & digital money receipts.
23. `/portal/eligibility` — Member Eligibility Dashboard & Tier Progression tracker.
24. `/portal/communications` — Multi-Vendor SMS & Emergency Broadcast Console with handset simulator.
25. `/portal/blood-bank` — Community Blood Donor Network & Emergency Appeal Dispatcher.
26. `/portal/events/checkin` — Gate Steward QR Scanner with attendance logging and coupon issuance.
27. `/portal/lms` — Defensive Driving & Road Law Academy courses & digital certificate issuer.
28. `/portal/reports` — Statutory Government Audit & Societies Registration Act XXI of 1860 export console.
29. `/portal/superadmin` — SaaS Master Control Panel with white-glove 3-step onboarding wizard.
30. `/_not-found` — Branded 404 handler with return navigation.

---

## 6. Quality Gates & Operational Commands

### Automated Test Suites & Validation
```bash
# Strict TypeScript validation across all workspace packages (0 errors permitted)
pnpm typecheck

# Full production build
pnpm build
```

### Database Operations
```bash
# Seed database with Road Safety Movement dataset
pnpm --filter @org/database db:seed
```

---

## 7. Complete API Route & Controller Catalog

The NestJS backend (`apps/api`) serves under the global prefix `/api` (port 4000) and is seamlessly proxied by Next.js (`apps/web` on port 3000) via rewrites (`/api/:path*` $\to$ `http://localhost:4000/api/:path*`).

### Root & System Health
- `GET /api` (`AppController.getRoot`): API status and full dynamic endpoint catalog.
- `GET /api/health` (`AppController.getHealth`): General health check ping.
- `GET /api/public/health` (`PublicController.getHealth`): Public service status probe.

### Public & Onboarding
- `GET /api/public/org/:slug` (`PublicController.getOrganizationPublicProfile`): Returns public tenant profile, branch hierarchy, and central leadership positions.
- `POST /api/public/apply` (`PublicController.apply`): Public member application onboarding (defaults to `rsm-bd`).
- `GET /api/public/notices/:slug` (`PublicController.getPublicNotices`): Public pinned and recent notices.
- `GET /api/public/events/:slug` (`PublicController.getPublicEvents`): Public event schedule.
- `GET /api/public/verify/member/:param` (`PublicController.verifyMember`): Member card cryptographic verification.

### Authentication (`AuthController` at `/api/auth`)
- `POST /api/auth/send-otp` & `/api/auth/otp/send`: Generates 6-digit SMS OTP challenge (accepts `phone` or `phoneOrEmail`).
- `POST /api/auth/verify-otp` & `/api/auth/otp/verify`: Verifies code, issues JWT `access_token` and `refresh_token`.
- `POST /api/auth/login`: Authenticates with email or mobile phone and password.
- `GET /api/auth/me`: Fetches profile and active position for current session.
- `POST /api/auth/switch-position`: Switches active operational position (accepts `targetPositionId` or `userPositionId`).
- `POST /api/auth/logout`: Revokes active session and clears cookies.

### Membership (`MembersController` at `/api/members`)
- `GET /api/members`: Scoped member listing with 3-tier privacy masking and query filters.
- `GET /api/members/:id`: Member details by UUID.
- `POST /api/members/apply`: Direct member application onboarding.
- `POST` & `PATCH /api/members/:id/endorse`: Branch committee endorsement.
- `POST` & `PATCH /api/members/:id/approve`: Central committee final approval and tier assignment.
- `POST` & `PATCH /api/members/:id/suspend`: Member suspension with recorded reason.

### Hierarchy & Branches (`BranchesController` at `/api/branches`)
- `GET /api/branches`: Flat list of active branch nodes.
- `GET /api/branches/tree`: Hierarchical nested branch tree.
- `POST /api/branches`: Create a branch node under parent node.
- `POST /api/branches/:id/move`: Atomically move branch subtree updating materialized paths.

### Finance & Treasury (`FinanceController` at `/api/finance`)
- `GET /api/finance/stats`: Aggregated billing, collection, and pending verification counts.
- `GET /api/finance/invoices`: Paginated invoice listing with BigInt paisa conversion.
- `POST /api/finance/invoices`: Create member invoice.
- `POST /api/finance/initiate-online-payment`: Initiate gateway session (EPS, bKash, Nagad, SSLCommerz).
- `POST /api/finance/submit-slip`: Submit offline bank deposit slip for review.
- `POST /api/finance/verify-slip`: Treasurer approval or rejection of deposit slip.
- `GET /api/finance/receipt/:invoiceId`: Tamper-proof digital money receipt with SHA-256 seal.

### Governance (`GovernanceController` at `/api/governance`)
- `GET /api/governance/meetings`: Meeting listing filtered by status.
- `GET /api/governance/meetings/:id`: Meeting details, agenda, and minutes.
- `POST /api/governance/meetings`: Draft new statutory meeting.
- `POST` & `PATCH /api/governance/meetings/:id/schedule`: Transition meeting to SCHEDULED status.
- `POST` & `PATCH /api/governance/meetings/:id/minutes`: Record minutes and resolutions.
- `POST` & `PATCH /api/governance/meetings/:id/approve`: Approve ratified minutes.
- `GET /api/governance/resolutions`: Searchable numbered resolution registry.
- `POST /api/governance/quorum-check`: Quorum calculation utility.

### Communications (`CommunicationsController` at `/api/communications`)
- `GET /api/communications/notices`: Internal circulars and announcements.
- `POST /api/communications/notices`: Publish circular/notice.
- `POST /api/communications/broadcast`: Send emergency multi-branch SMS broadcast.

### Events (`EventsController` at `/api/events`)
- `GET /api/events`: List scheduled and past events.
- `GET /api/events/:id`: Event details with attendance logs.
- `POST /api/events`: Create an event.
- `POST /api/events/:id/checkin`: Fast gate steward attendance QR verification.

### Audit (`AuditController` at `/api/audit`)
- `GET /api/audit/logs`: Immutable audit trail with pagination and action filters.

### Superadmin (`SuperadminController` at `/api/superadmin`)
- `GET /api/superadmin/overview`: Platform metrics (organizations, users, sessions, impersonation logs).
- `GET /api/superadmin/tenants`: List all provisioned organizations.
- `POST /api/superadmin/tenants`: Provision new tenant with HQ branch and central roles.
- `PATCH /api/superadmin/tenants/:id/status`: Update tenant subscription status.
- `POST /api/superadmin/impersonate`: Audited support impersonation session.
- `POST /api/superadmin/exit-impersonate`: Conclude impersonation session.
