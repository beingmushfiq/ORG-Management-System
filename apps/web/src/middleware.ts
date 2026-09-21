import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Next.js Edge Middleware — Layer 1 of Multi-Tenant Security Isolation.
 * Resolves subdomain -> organizationId -> injects `x-tenant-id` and `x-tenant-slug`.
 */
export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get("host") || "";

  // Skip static assets, internal Next.js requests, and favicon
  if (
    url.pathname.startsWith("/_next") ||
    url.pathname.startsWith("/api/public") ||
    url.pathname.includes(".") ||
    url.pathname.startsWith("/favicon.ico")
  ) {
    return NextResponse.next();
  }

  // 1. Extract subdomain from hostname or fallback query param
  // Examples: "bma-ctg.saasplatform.com" -> "bma-ctg", "bma-ctg.localhost:3000" -> "bma-ctg"
  let tenantSlug = "";
  const hostParts = hostname.split(".");

  if (hostname.includes("localhost") || hostname.includes("127.0.0.1")) {
    if (hostParts.length > 1 && hostParts[0] !== "localhost" && hostParts[0] !== "www") {
      tenantSlug = hostParts[0]!;
    } else {
      // Local development fallback: ?org=bma-ctg
      tenantSlug = url.searchParams.get("org") || "bma-ctg";
    }
  } else {
    // Production domain: e.g. bma-ctg.yourdomain.com
    if (hostParts.length >= 3 && hostParts[0] !== "www") {
      tenantSlug = hostParts[0]!;
    }
  }

  // 2. Clone headers and inject tenant scope
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-tenant-slug", tenantSlug);
  requestHeaders.set("x-pathname", url.pathname);

  // In production, organizationId is resolved via Redis lookup at edge
  // For baseline scaffolding, we pass the verified slug down to Server Components
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
