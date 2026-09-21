"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Users,
  Building2,
  Crown,
  CreditCard,
  Radio,
  LogOut,
  LayoutDashboard,
  ShieldCheck,
  Menu,
  X,
  ExternalLink,
  ShieldAlert,
} from "lucide-react";
import { OrgLogo } from "@/components/brand/org-logo";
import { RoleSelector } from "@/components/auth/role-selector";
import { apiClient } from "@/lib/api-client";
import { Badge, Button } from "@org/ui";

const NAV_ITEMS = [
  {
    label: "My Workspace",
    labelBn: "ওয়ার্কস্পেস",
    href: "/portal",
    icon: LayoutDashboard,
  },
  {
    label: "Member Registry",
    labelBn: "সদস্য তালিকা",
    href: "/portal/members",
    icon: Users,
  },
  {
    label: "Governance & Council",
    labelBn: "কাউন্সিল ও মিটিং",
    href: "/portal/command",
    icon: Crown,
  },
  {
    label: "Treasury & Dues",
    labelBn: "কোষাধ্যক্ষ ও অর্থ",
    href: "/portal/finance",
    icon: CreditCard,
  },
  {
    label: "Branch Network",
    labelBn: "শাখা পরিষদ",
    href: "/portal/branches",
    icon: Building2,
  },
  {
    label: "Communications",
    labelBn: "যোগাযোগ ও বিজ্ঞপ্তি",
    href: "/portal/communications",
    icon: Radio,
  },
  {
    label: "Superadmin",
    labelBn: "সুপারএডমিন",
    href: "/portal/superadmin",
    icon: ShieldAlert,
  },
];

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    apiClient.auth
      .getMe()
      .then((res) => {
        if (res?.user) setUser(res.user);
      })
      .catch(() => {
        // Handled silently
      });
  }, []);

  const handleLogout = async () => {
    try {
      await apiClient.auth.logout();
    } catch {
      // Ignored
    } finally {
      window.location.href = "/login";
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Institutional Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-card/95 backdrop-blur">
        <div className="px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <Link href="/portal" className="flex items-center gap-3">
              <OrgLogo size="sm" />
            </Link>
            <Badge variant="outline" className="hidden sm:inline-flex text-[11px] font-mono">
              Institutional OS
            </Badge>
            {user?.name && (
              <span className="hidden md:inline text-xs text-muted-foreground font-medium px-2 py-0.5 rounded bg-muted/50 border border-border/50">
                {user.name}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <RoleSelector />

            <Link
              href="/"
              target="_blank"
              className="hidden md:flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors px-2.5 py-1.5 rounded-md hover:bg-muted"
            >
              <span>Public Portal</span>
              <ExternalLink className="h-3 w-3" />
            </Link>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-xs text-muted-foreground hover:text-destructive"
              title="Sign Out"
            >
              <LogOut className="h-4 w-4 mr-1.5" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Workspace Body: Sidebar + Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex w-64 flex-col border-r border-border bg-card/50 p-4 space-y-6">
          <div className="space-y-1">
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground font-mono">
              Operational Modules
            </p>
            <nav className="space-y-1 pt-1">
              {NAV_ITEMS.map((item) => {
                const isActive =
                  item.href === "/portal"
                    ? pathname === "/portal"
                    : pathname?.startsWith(item.href);
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="h-4 w-4 shrink-0" />
                      <span>{item.label}</span>
                    </div>
                    <span
                      className={`text-[10px] ${
                        isActive ? "text-primary-foreground/80" : "text-muted-foreground/60"
                      } font-bangla`}
                    >
                      {item.labelBn}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="mt-auto pt-4 border-t border-border space-y-2">
            <div className="px-3 py-2 rounded-md bg-muted/40 border border-border/50 text-[11px] text-muted-foreground">
              <div className="flex items-center gap-1.5 text-foreground font-semibold mb-0.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                <span>Scope Isolated</span>
              </div>
              <p className="text-[10px] leading-relaxed">
                Actions executed strictly within verified branch & tenant boundaries.
              </p>
            </div>
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="relative w-64 max-w-[80%] bg-card border-r border-border p-4 flex flex-col z-50 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-border mb-4">
                <OrgLogo size="sm" />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-md text-muted-foreground hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="space-y-1 flex-1">
                {NAV_ITEMS.map((item) => {
                  const isActive =
                    item.href === "/portal"
                      ? pathname === "/portal"
                      : pathname?.startsWith(item.href);
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                        isActive
                          ? "bg-primary text-primary-foreground font-semibold"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="h-4 w-4 shrink-0" />
                        <span>{item.label}</span>
                      </div>
                      <span className="text-[10px] font-bangla">{item.labelBn}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        )}

        {/* Main Content Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-background">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
