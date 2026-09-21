# Development Standards & Core Rules — Organization Management SaaS (Multi-Tenant)

This repository enforces strict enterprise rules for building the Multi-Tenant Organization Management SaaS. All engineers and AI pair programmers must follow these instructions without deviation.

---

## 1. Non-Negotiable Architectural Invariants

### 1.1 Four-Layer Tenant Isolation (MySQL 8.0 / InnoDB)
MySQL has **no Row-Level Security (RLS)**. Isolation is 100% enforced by software:
1. **Next.js Edge Middleware**: Subdomain (`org.domain.com`) → resolves `organizationId` via Redis cache → injects `x-tenant-id`.
2. **NestJS AsyncLocalStorage (`ClsService`)**: Binds `organizationId` per request context. Never accept `organizationId` from client body or query params.
3. **Prisma Client Extension**: Automatically injects `{ where: { organizationId } }` on every `findMany`, `findFirst`, `update`, `delete`, `count`, `aggregate`, and sets it on `create`.
4. **Database Indexes**: All composite indexes and unique constraints MUST lead with `organizationId`: e.g. `@@unique([organizationId, membershipNumber])`.
5. **Identifiers**: Use UUIDv7 or ULID for all public IDs. Never expose auto-increment integer IDs.

### 1.2 Dual-Track Permission Architecture
- **Membership Tier**: `ASSOCIATE` → `GENERAL` → `LIFE` (governs entitlements).
- **Organizational Position**: `President`, `General Secretary`, `Branch Secretary`, etc. (governs authority).
- Never conflate the two. A user can hold multiple active positions across different branch nodes.
- Execution pipeline on protected endpoints:
  `TenantGuard` → `PermissionGuard(resource, action)` → `ScopeInterceptor` (restricts result set to user's branch subtree).

### 1.3 Unlimited Branch Hierarchy Engine
- Implemented with **Materialized Path + Adjacency List**:
  ```prisma
  model BranchNode {
    id               String   @id @default(uuid())
    organizationId   String
    parentId         String?
    name             String
    nameBn           String?
    levelLabel       String   // "Division", "District", "Upazila", "Local Unit"
    depth            Int
    materializedPath String   @db.VarChar(500) // "1/4/12"
    @@index([organizationId, materializedPath(191)])
    @@index([organizationId, parentId])
  }
  ```
- Any branch move transaction MUST atomically update `materializedPath` for the node and **all its descendants** in a single database transaction.

### 1.4 Strict Financial Modeling
- Store all money as **integer paisa** (`BigInt`), never float. ৳100.50 = `10050`.
- All payments require an `idempotencyKey`.
- Double-entry traceable; payment records are immutable (supersede with new records).

### 1.5 Bilingual by Construction (English + বাংলা)
- All user-facing strings must come from locale dictionaries. No hardcoded English strings.
- Content models have dual fields (`name`/`nameBn`, `title`/`titleBn`).
- Typography pairing: `Plus Jakarta Sans` / `Cabinet Grotesk` (Latin) + `Hind Siliguri` / `Noto Serif Bengali` (Bangla).
- Test Bangla conjuncts (ক্ষ, ঞ্জ, ্র, ্য) across all font weights.

### 1.6 Visual & Motion Quality Standard: Zero AI Slop
- Editorial, high-contrast aesthetic: frosted glass (`backdrop-blur-2xl`), ambient noise overlays, dynamic cursor glow borders.
- Smooth momentum scrolling via **Lenis**, scrubbed timelines via **GSAP 3**, and spring micro-interactions via **Framer Motion**.
- Interactive 3D WebGL anchors: **3D Branch Constellation** and **Holographic 3D Tiltable Member Card** with iridescent shaders.
- Accessibility: Fully respects `prefers-reduced-motion` with static high-quality fallbacks; meets WCAG AA contrast.

---

## 2. Feature Specification Requirement
Before writing code for any module, create a specification document in `/docs/modules/<module-name>.md` following this structure:
```markdown
Feature:      <name>
Users:        <membership tiers / positions>
Functions:    <verbs supported>
Data:         <entities, fields, relationships, indexes>
Permissions:  <matrix of position × action>
Workflow:     <state machine with transitions and actors>
Automation:   <scheduled jobs, triggers, notifications>
Scope rules:  <how branch hierarchy narrows visibility>
Audit:        <what gets logged>
```

---

## 3. Working Method & Quality Gates
1. **Vertical Slices**: Deliver Schema + API + Guard + UI + Tests together per feature capability.
2. **Boundary Testing**: Every feature must have a test verifying that Tenant B cannot access Tenant A data, and branch officer X cannot access sibling branch Y.
3. **Clean Code**: Zero `any` types in TypeScript, zero dead code, zero unhandled promises, and zero TODO placeholders in merged work.
