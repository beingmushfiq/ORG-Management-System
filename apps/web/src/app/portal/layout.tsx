"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  User,
  CreditCard,
  Calendar,
  GraduationCap,
  MessageSquare,
  Award,
  BellRing,
  CalendarCheck,
  ClipboardList,
  FileText,
  Settings,
  HelpCircle,
  Users,
  Building2,
  Crown,
  ShieldAlert,
  LogOut,
  Menu,
  X,
  ChevronDown,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { OrgLogo } from "@/components/brand/org-logo";
import { RoleSelector } from "@/components/auth/role-selector";
import { apiClient } from "@/lib/api-client";
import { PortalFooter } from "@/components/portal/portal-footer";

// The 13 Canonical Member Dashboard Menus
const MEMBER_NAV_ITEMS = [
  {
    label: "Dashboard",
    labelBn: "ড্যাশবোর্ড",
    href: "/portal",
    icon: LayoutDashboard,
  },
  {
    label: "Profile",
    labelBn: "প্রোফাইল",
    href: "/portal/profile",
    icon: User,
  },
  {
    label: "Fee & Subscription",
    labelBn: "চাঁদা ও সাবস্ক্রিপশন",
    href: "/portal/finance",
    icon: CreditCard,
  },
  {
    label: "Event & Program",
    labelBn: "ইভেন্ট ও কর্মসূচি",
    href: "/portal/events",
    icon: Calendar,
  },
  {
    label: "Learning Centre",
    labelBn: "লার্নিং সেন্টার (LMS)",
    href: "/portal/lms",
    icon: GraduationCap,
  },
  {
    label: "Survey & Opinion",
    labelBn: "সার্ভে ও মতামত",
    href: "/portal/surveys",
    icon: MessageSquare,
  },
  {
    label: "Certificate",
    labelBn: "সনদ ও প্রত্যয়ন",
    href: "/portal/certificates",
    icon: Award,
  },
  {
    label: "Notices",
    labelBn: "বিজ্ঞপ্তি ও সার্কুলার",
    href: "/portal/notices",
    icon: BellRing,
  },
  {
    label: "Meeting",
    labelBn: "সভা ও রেজোলিউশন",
    href: "/portal/meetings",
    icon: CalendarCheck,
  },
  {
    label: "Tasks & Report",
    labelBn: "টাস্ক ও রিপোর্ট",
    href: "/portal/tasks",
    icon: ClipboardList,
  },
  {
    label: "Application",
    labelBn: "সদস্যপদ আবেদন",
    href: "/portal/applications",
    icon: FileText,
  },
  {
    label: "Settings",
    labelBn: "সেটিংস",
    href: "/portal/settings",
    icon: Settings,
  },
  {
    label: "Help",
    labelBn: "সহায়তা ও হটলাইন",
    href: "/portal/concierge",
    icon: HelpCircle,
  },
];

// Operational & Leadership Governance Modules (For Branch Officers & Executive Council)
const LEADERSHIP_NAV_ITEMS = [
  {
    label: "Member Registry & KYC",
    labelBn: "সদস্য রেজিস্ট্রি ও কেওয়াইসি",
    href: "/portal/members",
    icon: Users,
  },
  {
    label: "Council & Resolutions",
    labelBn: "কাউন্সিল ও সিদ্ধান্ত",
    href: "/portal/command",
    icon: Crown,
  },
  {
    label: "Branch Network",
    labelBn: "শাখা পরিষদ",
    href: "/portal/branches",
    icon: Building2,
  },
  {
    label: "Statutory Reports",
    labelBn: "অডিট ও প্রতিবেদন",
    href: "/portal/reports",
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
  const [authLoading, setAuthLoading] = useState(true);

  // Dropdown states for top header
  const [aboutDropdown, setAboutDropdown] = useState(false);
  const [projectsDropdown, setProjectsDropdown] = useState(false);
  const [updatesDropdown, setUpdatesDropdown] = useState(false);

  useEffect(() => {
    let isMounted = true;
    apiClient.auth
      .getMe()
      .then((res) => {
        if (!isMounted) return;
        if (res?.user) {
          setUser(res.user);
        } else {
          // Fallback demo user if running locally
          setUser({
            fullName: "Tanvir Rahman",
            fullNameBn: "তানভীর তানভীর",
            email: "convener@roadsafetymovement.org",
            membershipNumber: "18-23",
          });
        }
      })
      .catch(() => {
        if (!isMounted) return;
        // In local mode without active DB session, allow demo persona or redirect
        const cookieExists = typeof document !== "undefined" && document.cookie.includes("access_token");
        if (cookieExists) {
          setUser({
            fullName: "Tanvir Rahman",
            fullNameBn: "তানভীর তানভীর",
            email: "convener@roadsafetymovement.org",
            membershipNumber: "18-23",
          });
        } else {
          router.push(`/login?returnUrl=${encodeURIComponent(pathname || "/portal")}`);
        }
      })
      .finally(() => {
        if (isMounted) setAuthLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [pathname, router]);

  const handleLogout = async () => {
    try {
      await apiClient.auth.logout();
    } catch {
      // Ignored
    } finally {
      if (typeof document !== "undefined") {
        document.cookie = "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
      window.location.href = "/login";
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      {/* Top Institutional Header matching sample mockup */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-card/98 backdrop-blur-md shadow-xs">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4">
          {/* Left: Mobile Toggle + Official Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted focus:outline-none"
              aria-label="Toggle Navigation Drawer"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            <Link href="/" className="flex items-center gap-3">
              <OrgLogo size="sm" />
            </Link>
          </div>

          {/* Center: Institutional Top Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6 text-xs font-semibold text-foreground/90">
            <Link
              href="/"
              className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            >
              Home
            </Link>

            {/* About Us Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setAboutDropdown(true)}
              onMouseLeave={() => setAboutDropdown(false)}
            >
              <button
                type="button"
                className="flex items-center gap-1 hover:text-amber-600 dark:hover:text-amber-400 transition-colors py-2 cursor-pointer"
              >
                <span>About Us</span>
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
              </button>

              {aboutDropdown && (
                <div className="absolute top-full left-0 w-60 rounded-xl border border-border bg-card p-2 shadow-xl space-y-1 z-50">
                  <Link
                    href="/portal/command"
                    className="block px-3 py-2 rounded-lg text-xs hover:bg-muted text-foreground transition-colors"
                  >
                    Executive Committee (কেন্দ্রীয় কমিটি)
                  </Link>
                  <Link
                    href="/portal/branches"
                    className="block px-3 py-2 rounded-lg text-xs hover:bg-muted text-foreground transition-colors"
                  >
                    Central & Branch Directory
                  </Link>
                  <Link
                    href="/portal/notices"
                    className="block px-3 py-2 rounded-lg text-xs hover:bg-muted text-foreground transition-colors"
                  >
                    Constitutional Policy & Bylaws
                  </Link>
                </div>
              )}
            </div>

            {/* Projects Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setProjectsDropdown(true)}
              onMouseLeave={() => setProjectsDropdown(false)}
            >
              <button
                type="button"
                className="flex items-center gap-1 hover:text-amber-600 dark:hover:text-amber-400 transition-colors py-2 cursor-pointer"
              >
                <span>Projects</span>
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
              </button>

              {projectsDropdown && (
                <div className="absolute top-full left-0 w-60 rounded-xl border border-border bg-card p-2 shadow-xl space-y-1 z-50">
                  <Link
                    href="/causes"
                    className="block px-3 py-2 rounded-lg text-xs hover:bg-muted text-foreground transition-colors"
                  >
                    420 Blackspot Elimination Fund
                  </Link>
                  <Link
                    href="/events"
                    className="block px-3 py-2 rounded-lg text-xs hover:bg-muted text-foreground transition-colors"
                  >
                    Defensive Driving School Symposiums
                  </Link>
                  <Link
                    href="/portal/blood-bank"
                    className="block px-3 py-2 rounded-lg text-xs hover:bg-muted text-foreground transition-colors"
                  >
                    Victim Relief & Blood Donors
                  </Link>
                </div>
              )}
            </div>

            {/* Updates Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setUpdatesDropdown(true)}
              onMouseLeave={() => setUpdatesDropdown(false)}
            >
              <button
                type="button"
                className="flex items-center gap-1 hover:text-amber-600 dark:hover:text-amber-400 transition-colors py-2 cursor-pointer"
              >
                <span>Updates</span>
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
              </button>

              {updatesDropdown && (
                <div className="absolute top-full left-0 w-60 rounded-xl border border-border bg-card p-2 shadow-xl space-y-1 z-50">
                  <Link
                    href="/notices"
                    className="block px-3 py-2 rounded-lg text-xs hover:bg-muted text-foreground transition-colors"
                  >
                    Official Gazettes & Memos
                  </Link>
                  <Link
                    href="/journal"
                    className="block px-3 py-2 rounded-lg text-xs hover:bg-muted text-foreground transition-colors"
                  >
                    Road Crash Data & Journal
                  </Link>
                  <Link
                    href="/gallery"
                    className="block px-3 py-2 rounded-lg text-xs hover:bg-muted text-foreground transition-colors"
                  >
                    Photographic Press Lightbox
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/portal/concierge"
              className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            >
              Contact Us
            </Link>
          </nav>

          {/* Right: User Badge + Role Selector + Forest Green Log Out Pill Button */}
          <div className="flex items-center gap-3">
            {user?.fullName && (
              <span className="hidden md:inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-muted text-foreground/80 border border-border">
                {user.fullName}
              </span>
            )}

            <RoleSelector />

            {/* The Dedicated Deep Forest Green "Log Out" Pill Button from Sample Mockup */}
            <button
              type="button"
              onClick={handleLogout}
              disabled={authLoading}
              className="h-10 px-4 sm:px-5 rounded-full bg-[#1b4332] hover:bg-[#143427] text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-sm hover:shadow-md shrink-0 cursor-pointer"
              title="End Secure Session"
            >
              <span>Log Out</span>
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-white">
                <User className="h-3 w-3" />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Workspace Body: Left Sidebar + Main Viewport */}
      <div className="flex-1 flex overflow-hidden max-w-[1440px] w-full mx-auto">
        {/* Desktop Fixed Left Sidebar matching mockup */}
        <aside className="hidden lg:flex w-64 flex-col border-r border-border bg-card/60 p-4 space-y-6 overflow-y-auto shrink-0">
          <div className="space-y-1">
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground font-mono">
              Member Workspace
            </p>

            <nav className="space-y-1 pt-1.5">
              {MEMBER_NAV_ITEMS.map((item) => {
                const isActive =
                  item.href === "/portal"
                    ? pathname === "/portal"
                    : pathname === item.href || pathname?.startsWith(item.href + "/");
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? "bg-[#1b4332] text-white font-semibold shadow-xs"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/70"
                    }`}
                  >
                    <Icon
                      className={`h-4 w-4 shrink-0 ${
                        isActive ? "text-white" : "text-muted-foreground"
                      }`}
                    />
                    <span className="flex-1">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Leadership & Branch Governance Console */}
          <div className="pt-2 border-t border-border space-y-1">
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground font-mono flex items-center justify-between">
              <span>Branch & Council</span>
              <ShieldCheck className="h-3 w-3 text-emerald-500" />
            </p>

            <nav className="space-y-1 pt-1">
              {LEADERSHIP_NAV_ITEMS.map((item) => {
                const isActive = pathname?.startsWith(item.href);
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3.5 py-2 rounded-lg text-xs font-medium transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground font-semibold"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="flex-1">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Footer Card in Sidebar */}
          <div className="mt-auto pt-4 border-t border-border">
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-emerald-800 dark:text-emerald-300">
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                <span>Scope Isolated</span>
              </div>
              <p className="text-[11px] text-emerald-700 dark:text-emerald-400/90 leading-relaxed font-bangla">
                আপনার শাখার আওতাধীন সকল তথ্য সুরক্ষিত ও ক্রিপ্টোগ্রাফিক্যালি সংরক্ষিত।
              </p>
            </div>
          </div>
        </aside>

        {/* Mobile Navigation Off-Canvas Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Slide-out Menu Panel */}
            <div className="relative w-72 max-w-[85%] bg-card border-r border-border p-5 flex flex-col z-50 shadow-2xl h-full overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-border mb-4">
                <OrgLogo size="sm" />
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Mobile Member Menus */}
              <div className="space-y-1 flex-1">
                <p className="px-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground font-mono">
                  Member Workspace
                </p>

                <nav className="space-y-1 pt-1">
                  {MEMBER_NAV_ITEMS.map((item) => {
                    const isActive =
                      item.href === "/portal"
                        ? pathname === "/portal"
                        : pathname === item.href || pathname?.startsWith(item.href + "/");
                    const Icon = item.icon;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                          isActive
                            ? "bg-[#1b4332] text-white font-semibold"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        }`}
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>

                <p className="px-2 pt-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground font-mono">
                  Branch Leadership
                </p>

                <nav className="space-y-1 pt-1">
                  {LEADERSHIP_NAV_ITEMS.map((item) => {
                    const isActive = pathname?.startsWith(item.href);
                    const Icon = item.icon;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                          isActive
                            ? "bg-primary text-primary-foreground font-semibold"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        }`}
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-4 border-t border-border mt-4">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full py-2.5 px-3 rounded-xl bg-destructive/10 hover:bg-destructive/20 text-destructive text-xs font-semibold flex items-center justify-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Log Out of Workspace</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Viewport */}
        <main className="flex-1 overflow-y-auto bg-background flex flex-col justify-between">
          <div className="p-4 sm:p-6 lg:p-8 flex-1">{children}</div>

          {/* Institutional Forest Green Footer */}
          <PortalFooter />
        </main>
      </div>
    </div>
  );
}
