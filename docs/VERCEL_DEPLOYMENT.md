# Deploying the Frontend (@org/web) to Vercel

This repository is structured as a high-performance **pnpm + Turborepo monorepo**. The frontend application ([`@org/web`](../apps/web)) is completely configured, decoupled, and optimized for instant one-click deployment on **Vercel**.

---

## 🚀 Option 1: Deploy via Vercel Web Dashboard (Recommended)

### Step 1: Import the Repository
1. Go to your [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **"Add New..."** > **"Project"**.
3. Select your Git repository (`ORG-Management-System`).

### Step 2: Project Configuration
Vercel will detect Turborepo automatically. Choose **either** of the following two project directory options:

#### A. Monorepo Root Setup (Default)
- **Root Directory**: Leave as `./` (root).
- **Framework Preset**: `Next.js`.
- **Build Command**: `turbo run build --filter=@org/web...` (or `pnpm run build:web`).
- **Output Directory**: `apps/web/.next`.
- **Install Command**: `pnpm install`.
*(Note: These are pre-configured in the repository root [`vercel.json`](../vercel.json), so Vercel can detect them automatically).*

#### B. Direct `apps/web` Root Setup
- **Root Directory**: Click "Edit" and choose `apps/web`.
- **Framework Preset**: `Next.js`.
- **Build & Output Settings**: Leave as default (`next build` / `.next`).
*(Note: [`apps/web/vercel.json`](../apps/web/vercel.json) ensures Vercel handles Next.js directly while leveraging Turborepo caching).*

---

## 🔑 Environment Variables to Configure in Vercel

In your Vercel Project Settings > **Environment Variables**, configure:

| Variable | Required | Description | Example |
|---|---|---|---|
| `NEXT_PUBLIC_API_URL` | **Yes** (Production) | Production NestJS Backend API URL (requests to `/api/*` are dynamically proxied here) | `https://api.yourdomain.com` |
| `API_URL` | Optional | Internal backend URL for Next.js server-side rewrites (if different from public) | `https://api.yourdomain.com` |
| `NEXT_PUBLIC_DEFAULT_TENANT` | Optional | Default fallback tenant slug on primary/preview domains | `bma-ctg` or `rsm-bd` |
| `NEXT_PUBLIC_PLATFORM_DOMAIN` | Optional | Platform base domain for multi-tenant subdomain resolution | `yourdomain.com` |

---

## ⚡ Option 2: Deploy via Vercel CLI

You can also deploy directly from your terminal using the Vercel CLI:

```bash
# 1. Install Vercel CLI globally (if not already installed)
npm i -g vercel

# 2. Link your project
vercel link

# 3. Deploy Preview
vercel

# 4. Deploy Production
vercel --prod
```

---

## 🌐 Multi-Tenant Subdomain Configuration

The application features edge middleware that resolves tenant organizations via subdomains:
- **Production Wildcard**: In Vercel Domains, add `*.yourdomain.com` (alongside `yourdomain.com`).
- **Subdomain Routing**:
  - `bma-ctg.yourdomain.com` -> Loads the `bma-ctg` organization context.
  - `my-org.yourdomain.com` -> Loads the `my-org` organization context.
- **Preview & Fallback Support**:
  - Vercel preview URLs (e.g., `https://project.vercel.app`) automatically fall back to `NEXT_PUBLIC_DEFAULT_TENANT` (default: `bma-ctg`).
  - You can preview any tenant dynamically using the query parameter: `https://project.vercel.app?org=any-tenant-slug`.

---

## 🛠️ Local Verification Commands

Before deploying to Vercel, you can verify builds locally:

```bash
# Filtered production build for web
pnpm run build:web

# Filtered production build for backend API
pnpm run build:api

# Typecheck validation
pnpm run typecheck:web
pnpm run typecheck:api

# Full monorepo build
pnpm run build
```

---

## 🖥️ Deploying the Backend API (@org/api) to Vercel

The NestJS backend API is configured with a dedicated **Vercel Serverless Function** adapter:
- Entry handler: [`apps/api/src/serverless.ts`](../apps/api/src/serverless.ts)
- Vercel function: [`apps/api/api/index.js`](../apps/api/api/index.js)
- Vercel config: [`apps/api/vercel.json`](../apps/api/vercel.json)

### Step 1: Create a Second Project in Vercel
1. In your Vercel Dashboard, click **"Add New..."** > **"Project"**.
2. Select the same repository (`ORG-Management-System`).
3. Set **Root Directory** to `apps/api`.
4. Framework Preset: **Other**.
5. Build Command: `pnpm --filter @org/database build && pnpm --filter @org/api build`.
6. Output Directory: Leave blank / default.

### Step 2: Configure Backend Environment Variables
In the API Vercel Project Settings > **Environment Variables**, add:
- `DATABASE_URL`: Cloud MySQL connection string (e.g., PlanetScale, Aiven, Railway, or AWS RDS).
- `JWT_ACCESS_SECRET`: Secret key for access tokens (min 32 chars).
- `JWT_REFRESH_SECRET`: Secret key for refresh tokens (min 32 chars).
- `PLATFORM_DOMAIN`: e.g. `yourdomain.com` or your web frontend domain.

### Step 3: Connect Frontend to Backend
Once deployed (e.g. `https://my-org-api.vercel.app`):
1. Go to your **Frontend Vercel Project Settings**.
2. Set `NEXT_PUBLIC_API_URL` to your API URL: `https://my-org-api.vercel.app`.
3. Redeploy the frontend.

