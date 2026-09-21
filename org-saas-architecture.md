# Organization Management SaaS — Architecture & Role Framework v1
**Multi-tenant platform · Each org = isolated tenant with own subdomain**

---

## 1. Tech Stack Recommendation

| Layer | Choice | কেন |
|---|---|---|
| Frontend | **Next.js 15 + TypeScript** | আপনি DevCenterPoint-এ ইতিমধ্যে ব্যবহার করেছেন — consistency, App Router দিয়ে subdomain-based routing সহজ, Server Components দিয়ে dashboard performance ভালো থাকবে |
| Styling/UI | Tailwind CSS + shadcn/ui | Fast, consistent design system, bilingual (বাংলা/English) layout সহজে handle করা যায় |
| Backend | **Node.js (NestJS)** অথবা Next.js API Routes + separate service layer | NestJS recommend করছি কারণ RBAC/Permission-heavy backend-এর জন্য এর Module + Guard + Decorator system perfectly fits করে (Role guards, Tenant guards আলাদা আলাদা লেখা যাবে) |
| Database | **PostgreSQL** | Hierarchical data (branch tree), Row-Level Security (tenant isolation), JSONB (dynamic permission sets) — সবকিছুর জন্য Postgres সবচেয়ে উপযুক্ত |
| ORM | Prisma | Type-safe, schema migration সহজ, tenant-scoped query middleware লেখা যায় |
| Auth | NextAuth/Auth.js অথবা custom JWT + refresh token | Multi-role, multi-org session handling দরকার — একজন user একই সময়ে একাধিক org-এ role রাখতে পারবেন এমন session design লাগবে |
| File/Media | S3-compatible storage (DigitalOcean Spaces/Cloudflare R2) | Document upload, certificates, ID cards, event photos |
| Background Jobs | BullMQ + Redis | Eligibility calculation (Associate→General→Life), notification sending, report generation — এগুলো async job হিসেবে চালানো ভালো |
| Notifications | SMS gateway (local provider — bKash/SSL Wireless/Alpha SMS ধরনের) + Email (Resend/SES) | |
| Hosting | VPS/Cloud (DigitalOcean/AWS) + subdomain wildcard DNS (`*.yourapp.com`) | Subdomain-per-tenant routing এর জন্য wildcard DNS + middleware দরকার |

**Multi-tenancy model: Shared Database, Tenant-Isolated (Row-Level Security)**
প্রতিটি organization-এর জন্য আলাদা database না রেখে, একটা shared PostgreSQL database-এ প্রতিটি table-এ `organization_id` রাখা হবে, এবং Postgres Row-Level Security (RLS) দিয়ে enforce করা হবে যাতে ভুলেও এক tenant-এর query আরেক tenant-এর data touch করতে না পারে। এটা:
- Cost-effective (আলাদা DB per client হলে hosting cost অনেক বেড়ে যায়)
- Maintainable (একটা migration সব tenant-এ apply হয়)
- তবুও secure (RLS + application-layer tenant middleware — দুই layer protection)

Subdomain (`org1.yourapp.com`) হিট হলে middleware সেই subdomain থেকে `organization_id` resolve করবে এবং সব DB query তে সেটা inject হবে।

---

## 2. Platform-Level Roles (Tenant-এর উপরে)

| Role | Scope | কাজ |
|---|---|---|
| **Platform Super Admin** | সব tenant | নতুন Organization তৈরি/approve, subscription/plan assign, subdomain provision, platform-wide monitoring — কিন্তু কোনো tenant-এর member data দেখতে পারবে না by default |
| **Platform Support (optional)** | সব tenant, read-only | Client-কে সাহায্য করার জন্য limited/audited access |

## 3. Tenant-Level Roles (প্রতিটি Organization-এর ভেতরে)

আপনার document অনুযায়ী অপরিবর্তিত রাখা হচ্ছে, শুধু Data Model-এ কীভাবে বসবে সেটা নিচে:

```
Organization (Tenant)
   └── Branch Node (self-referencing: parent_id → child nodes, unlimited depth)
          └── User
                 ├── Membership (Associate / General / Life) — independent
                 └── Organizational Position(s) — independent, multiple allowed
                        └── scoped to a specific Branch Node
```

### Core tables (conceptual)
- `organizations` — tenant record, subdomain, plan, status
- `branch_nodes` — id, organization_id, parent_id (nullable = root/Executive), name, level_label
- `users` — id, organization_id (primary org), profile info
- `memberships` — user_id, type (associate/general/life), status, joined_date, eligibility fields
- `positions` — id, name (President/Secretary/etc), rank/weight
- `user_positions` — user_id, position_id, branch_node_id, start_date, end_date (handles multi-role + election terms)
- `permissions` — action-level grants, either by position template or per-user override
- `activity_log` — for eligibility tracking (event participation, fee payment, training, etc.)
- `audit_log` — who did what, when (mandatory for GS-level full-access accountability)

### Access resolution logic (runtime)
প্রতিটি request-এ user-এর effective access এভাবে resolve হবে:
1. User-এর সব active `user_positions` বের করা
2. প্রতিটি position-এর জন্য: Position Template Permission + Branch Node Scope
3. Scope অনুযায়ী branch_node এর subtree (descendant IDs) বের করা — এটাই তার visible data range
4. President/GS হলে org_id = root scope (পুরো tenant)
5. একাধিক position থাকলে সব scope-এর **union** নেওয়া হবে (সবচেয়ে বেশি access যেটা দেয়, সেটা প্রযোজ্য)

এই approach-এ hierarchy যত গভীর হোক (৩ লেভেল বা ৮ লেভেল), logic একই থাকবে — recursive CTE (Postgres `WITH RECURSIVE`) দিয়ে subtree বের করা যায়, তাই "future-proof unlimited levels" এই requirement সরাসরি পূরণ হয়।

---

## 4. Membership Lifecycle Engine

```
Application Submitted
      ↓
Admin Review (Branch/GS level, based on membership type)
      ↓
Approved → Membership record created, status = Active
      ↓
[Background Job — runs daily/weekly]
      ↓
Eligibility Calculator checks:
  - Continuous active duration (no unresolved suspension gaps)
  - Fee payment compliance
  - Minimum activity/event/training participation threshold (needs your input — see open questions)
      ↓
Eligible → notification sent + "Apply Now" unlocked on dashboard
      ↓
Upgrade Application → Fee → President/GS Approval → New Membership Tier
```

এই পুরো flow BullMQ background job দিয়ে চলবে যাতে প্রতিটি page load-এ heavy calculation না হয়ে, precomputed eligibility status DB-তে থাকে এবং dashboard শুধু সেটা পড়ে।

---

## 5. Open Business Questions (এখনো দরকার)

এই তিনটা বাদে বাকি সব architecture-level decision নেওয়া হয়ে গেছে। নিচেরগুলো এখনো lock করা দরকার — এগুলো feature-spec লেখার সময় দরকার হবে তাই একদম শুরুতেই জানলে ভালো:

1. **Activity threshold** — "2 years active" মানে কি ন্যূনতম কতগুলো event/training/fee payment লাগবে, নাকি শুধু "কোনো suspension না থাকা" যথেষ্ট? এই rule টা branch-ভেদে ভিন্ন হতে পারে কিনা?
2. **Payment gateway** — bKash/Nagad/Rocket/Card — কোনটা priority, নাকি manual bank-transfer confirmation দিয়ে শুরু হবে?
3. **Committee/Election term** — Position-গুলোর (President, Secretary...) কি fixed term (২/৩ বছর) আছে, আর term শেষে election workflow platform-এর ভেতরে দরকার নাকি manual/offline থাকবে?
4. **Budget ও Timeline** — Phase-wise development-এর জন্য rough budget/deadline কী, যাতে MVP scope ঠিক করতে পারি (সব ১৩টা module একসাথে না করে কোনটা আগে দরকার)?
5. **SMS Provider** — বাংলাদেশে কোন SMS gateway ব্যবহার করবেন (SSL Wireless, Alpha SMS, ইত্যাদি) — নাকি এটা Phase 2-তে যাবে?

---

## 6. Next Step

আপনার original plan অনুযায়ী — এখন Role & Access Architecture চূড়ান্ত হয়ে গেছে (উপরে #2, #3, #4)। পরবর্তী ধাপ: আপনার ১৩টি Member Dashboard Feature একটা একটা করে নেওয়া, প্রতিটার জন্য Feature → Functions → Data → Permission → Workflow → Automation টেবিল বানানো (Membership module দিয়ে শুরু করা যায়, যেহেতু সেটা সবচেয়ে জটিল)।
