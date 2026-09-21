# System Architecture & Codebase Knowledge Base
**Multi-Tenant Organization Management SaaS (Enterprise Civic & Professional Edition)**
*Maintained as the single, persistent source of truth for engineering agents and core maintainers.*

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
│   │   └── test/               # 12 Vitest e2e/unit security & boundary test suites (65 tests)
│   └── web/                    # Next.js 15 App Router Frontend (Port 3000)
│       ├── public/             # Static assets, Web App Manifest (PWA), Service Worker
│       ├── src/
│       │   ├── app/            # 29 Prerendered Static & Dynamic Routes
│       │   ├── components/     # UI, 3D Canvas, Geo Atlas, Governance Organogram, Brand
│       │   ├── lib/            # Utilities, Wallet Pass Generator (.pkpass/Google Wallet)
│       │   └── middleware.ts   # Edge subdomain tenant resolution & header injection
├── packages/
│   ├── database/               # Prisma ORM + MySQL 8.0 Engine
│   │   ├── prisma/
│   │   │   ├── schema.prisma   # 20+ Models (BigInt Paisa, Adjacency List + Materialized Path)
│   │   │   └── seed.ts         # Realistic BMA Chattogram Branch seed dataset
│   │   ├── src/
│   │   │   ├── hierarchy.ts    # Atomic node-move transactions & cyclic hierarchy protection
│   │   │   └── tenant-extension.ts # Layer 3 Prisma Multi-Tenant Extension
│   │   └── test/               # Vitest tenant-isolation & hierarchy test suites (8 tests)
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
   - Extracts subdomain from `Host` header (e.g., `bma-ctg.orgms.app` $\to$ `bma-ctg`).
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

## 4. Backend Service Catalog (`apps/api/src/modules/`)

| Module | Core Responsibilities | Key Endpoints / Methods |
|---|---|---|
| **Auth** | Passwordless SMS OTP (+880 carrier normalization) & Email/Password, rotating refresh tokens | `POST /auth/login`, `POST /auth/otp/send`, `POST /auth/otp/verify` |
| **Tenancy** | Organization provisioning, subdomain mapping, custom theme & SMS gateway configs | `GET /tenants/:id`, `POST /tenants` |
| **Hierarchy** | Atomic branch move transactions, descendant materialized path rewriting, cycle prevention | `POST /branches/:id/move`, `GET /branches/tree` |
| **Membership** | 4-step wizard, state machine (`SUBMITTED` $\to$ `VERIFIED` $\to$ `ENDORSED` $\to$ `APPROVED`), 3-tier privacy masking | `POST /members/apply`, `GET /members`, `PATCH /members/:id/status` |
| **Finance** | Paisa dues invoicing, recurring dues workers, 30/60/90-day grace periods, bank slip verification | `POST /finance/invoices`, `POST /finance/pay/:gateway`, `POST /finance/verify-slip` |
| **Eligibility** | Nightly BullMQ worker evaluating `eligibilityRuleJson` (continuous tenure minus suspension, points) | `GET /eligibility/status`, `POST /eligibility/upgrade` |
| **Communications** | Decoupled SMS gateway adapters (SSL Wireless, Alpha SMS, Greenweb), Unicode segmentation, priority emergency broadcast | `POST /communications/sms/send`, `POST /communications/broadcast` |
| **Governance** | Hybrid election engine (gazette upload vs cryptographic digital ballot), AGM/EGM quorum calculator | `GET /governance/elections`, `POST /governance/ballot/cast` |
| **Minutes** | Statutory meeting minuting generator, numbered resolutions (`RES-BMA-YYYY-XXX`), signatory blocks | `POST /minutes/generate`, `GET /minutes/resolutions` |
| **Concierge** | 1-Click Certificate of Good Standing (`CERT-GS-YYYY-XXXXX`), Tax Section 44 rebate calculator, Doctor practice directory sync | `POST /concierge/cert/good-standing`, `GET /concierge/tax-rebate` |
| **Welfare** | 90-day blood donor interval tracker, emergency appeal dispatch console | `GET /welfare/blood/donors`, `POST /welfare/blood/appeal` |
| **Reports** | Societies Registration Act XXI of 1860 statutory register exports, AGM voter lists, Cash book statements | `GET /reports/statutory/societies-act`, `GET /reports/financial/ledger` |

---

## 5. Complete Frontend Route Catalog (All 29 Routes)

### Public & Civic Portfolio
1. `/` — Institutional Hero, Interactive 3D Branch Galaxy, Holographic Member Card, Bangladesh Atlas, Heritage Chronicle (1952–2026), Central Organogram, DevCenterPoint Branding.
2. `/apply` — 4-Step Public Membership Application Wizard.
3. `/events` — Academic Congresses & CME Conferences Directory with CPD credits.
4. `/events/[id]` — Dynamic Event Details, Hour-by-Hour Agenda, Speaker Rosters.
5. `/notices` — Official Gazette & Public Notice Vault with bilingual search and memo references.
6. `/notices/[id]` — Dynamic Gazette Memo Reader with printable letterhead.
7. `/causes` — Humanitarian Relief, Benevolence Fund thermometers, Tax Exemption receipts.
8. `/gallery` — Photographic Media Archive & Press Lightbox.
9. `/journal` — Bangladesh Medical Journal (ISSN: 0301-4975), BanglaJOL/WHO indexed articles.
10. `/memorial` — Memorial Hall of Eternal Respect ("স্মৃতি চিরন্তন") with live floral tribute counters.
11. `/verify/member/[id]` — Public Member Credential Verification with laser scanning & cryptographic SHA-256 seal.
12. `/verify/cert/[id]` — Public Certificate Verification for CME & Good Standing credentials.
13. `/login` — Unified Mobile OTP (+880) & Email/Password Sign-In.
14. `/design-system` — Living Design System & Bengali Typographic Conjunct QA Lab.

### Member & Executive Operational Portal
15. `/portal` — Central Secretariat Module Hub (Routing to all 11 subsystems).
16. `/portal/concierge` — Fast-Track Member Concierge Desk (Good Standing, Section 44 Tax, Chamber Directory).
17. `/portal/members` — Member Directory with live 3-tier privacy enforcement (Public / Member / Executive).
18. `/portal/branches` — Interactive Visual Branch Tree Explorer with materialized path telemetry.
19. `/portal/command` — Executive Command War Room with live velocity ticker and Daily Morning Briefing Card.
20. `/portal/command/resolutions` — Statutory Meeting Minutes & Numbered Resolution Compiler.
21. `/portal/finance` — Treasurer Financial Command Portal with bank slip verification queue & digital money receipts.
22. `/portal/eligibility` — Member Eligibility Dashboard & Tier Progression tracker.
23. `/portal/communications` — Multi-Vendor SMS & Emergency Broadcast Console with handset simulator.
24. `/portal/blood-bank` — Community Blood Donor Network & Emergency Appeal Dispatcher.
25. `/portal/events/checkin` — Gate Steward QR Scanner with attendance logging and coupon issuance.
26. `/portal/lms` — Continuing Medical Education (CME/CPD) courses & digital certificate issuer.
27. `/portal/reports` — Statutory Government Audit & Societies Registration Act XXI of 1860 export console.
28. `/portal/superadmin` — Platform Super Admin portal for tenant onboarding and audited impersonation.
29. `/_not-found` — Branded 404 handler with return navigation.

---

## 6. Shared Design System (`packages/ui`) & Aesthetic Guidelines

### Institutional Visual Language
- **Zero Generic Colors / Zero Futuristic Cyber Clutter**: The design reflects prestigious, historical, and civic institutions.
- **Core Palette**:
  - Deep Midnight Navy: `bg-slate-950` / `bg-slate-900`
  - Institutional Gold / Warm Amber: `from-amber-500 via-amber-400 to-amber-600` (Crest, rings, accents)
  - Civic Medical Emerald: `bg-emerald-600` / `text-emerald-400`
  - Frosted Glassmorphism: `backdrop-blur-2xl bg-slate-900/60 border-white/10`
- **Bilingual Typography Pipeline**:
  - Latin: `Plus Jakarta Sans` / `Cabinet Grotesk`
  - Bengali: `Hind Siliguri` / `Noto Serif Bengali`

### Component Inventory (`@org/ui`)
- `<Button />`: Tactile interactive button supporting `gold`, `navy`, `emerald`, `glass`, `primary`, `secondary`, `outline`, `ghost`, `destructive` variants, with `loading`, `loadingText`, `leftIcon`, `rightIcon`, `shimmer`, and active scale press bounce.
- `<Badge />`: Pill badge supporting `gold`, `emerald`, `amber`, `rose`, `cyan`, `glass` variants, with `pulse`, `dot`, and size scaling.
- `<Card />`: Glassmorphic container with `interactive` hover lift and `accent` top gold/emerald luminous lines.
- `<ToastProvider />` & `useToast()`: Enterprise stacked alerts (`success`, `error`, `warning`, `info`) with auto-dismiss timers.
- `<CopyButton />`: 1-Click clipboard copy button with checkmark icon morph and toast trigger.
- `<Skeleton />`: Shimmering gradient skeleton loader (`SkeletonText`, `SkeletonCard`, `SkeletonAvatar`).
- `<Tooltip />`: Floating micro-tooltip with keyboard shortcut badge.

---

## 7. Quality Gates & Operational Commands

### Automated Test Suites
```bash
# Run all 73 automated tests across all monorepo packages
pnpm test

# Run API tests individually (65 tests across 12 suites)
pnpm --filter @org/api test

# Run Database tests individually (8 tests: tenant-isolation & hierarchy)
pnpm --filter @org/database test
```

### TypeScript Validation & Build
```bash
# Strict TypeScript validation across all 5 workspace projects (0 errors permitted)
pnpm typecheck

# Full production build (Prisma compile + NestJS build + Next.js 15 App Router 29 routes)
pnpm build
```

### Database Operations
```bash
# Apply Prisma migrations locally
pnpm --filter @org/database prisma migrate dev

# Seed database with realistic BMA Chattogram dataset
pnpm --filter @org/database prisma db seed
```
