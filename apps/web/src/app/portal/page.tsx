"use client";

import React, { useState } from "react";
import {
  Users,
  Building,
  Shield,
  CreditCard,
  Vote,
  Radio,
  Ticket,
  Heart,
  BookOpen,
  Award,
  Crown,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { Button, Badge, Card, CardContent } from "@org/ui";
import Link from "next/link";
import { RoleSelector } from "@/components/auth/role-selector";

interface PortalModule {
  title: string;
  titleBn: string;
  description: string;
  descriptionBn: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  accentColor: string;
  requiredRole?: string;
}

const MODULES: PortalModule[] = [
  {
    title: "Official Member Registry",
    titleBn: "সদস্য নিবন্ধন ও তালিকা",
    description: "Browse 3-tier privacy masked member directory, verify credentials, and view standing.",
    descriptionBn: "সাধারণ ও আজীবন সদস্যদের তালিকা, পেশাগত পরিচয় ও সদস্যপদ যাচাই।",
    href: "/portal/members",
    icon: Users,
    accentColor: "from-blue-600 to-indigo-600",
  },
  {
    title: "Branch Network Explorer",
    titleBn: "শাখা পরিষদ ও পদক্রম",
    description: "Navigate materialized-path organizational units, committees, and local secretariats.",
    descriptionBn: "শাখা পরিষদের স্তরবিন্যাস, স্থানীয় কমিটি এবং আঞ্চলিক পদবিনীতি।",
    href: "/portal/branches",
    icon: Building,
    accentColor: "from-cyan-600 to-blue-600",
  },
  {
    title: "Executive Command War Room",
    titleBn: "নির্বাহী কমান্ড ও সভার সিদ্ধান্ত",
    description: "Executive Council agendas, resolution quorum counters, and minutes signing.",
    descriptionBn: "কার্যনির্বাহী পরিষদের মিটিং আলোচ্যসূচি, কোরাম মনিটর ও প্রস্তাবনা অনুমোদন।",
    href: "/portal/command",
    icon: Crown,
    badge: "Executive",
    accentColor: "from-amber-600 to-yellow-600",
  },
  {
    title: "Treasury & Paisa Ledger",
    titleBn: "কোষাধ্যক্ষ ও অর্থ ব্যবস্থাপনা",
    description: "Double-entry accounting, deposit slip queue, hardship waivers, and gateway reconciliations.",
    descriptionBn: "বার্ষিক চাঁদা, ব্যাংক রসিদ যাচাই, মওকুফ আবেদন ও গেটওয়ে নিষ্পত্তি।",
    href: "/portal/finance",
    icon: CreditCard,
    accentColor: "from-emerald-600 to-teal-600",
  },
  {
    title: "Voter Eligibility Radar",
    titleBn: "ভোটার যোগ্যতা ও সাধারণ সভা",
    description: "Zero-dues verification, suspension interval deductions, and voting eligibility certificates.",
    descriptionBn: "এজিএম ভোটার অনুমোদন, চাঁদা স্থিতি যাচাই এবং নির্বাচনী যোগ্যতা স্কোর।",
    href: "/portal/eligibility",
    icon: Vote,
    accentColor: "from-purple-600 to-pink-600",
  },
  {
    title: "SMS Emergency Broadcast",
    titleBn: "জরুরি এসএমএস সম্প্রচার",
    description: "Multi-vendor SMS gateway dispatch with official masking sender ID and bilingual templates.",
    descriptionBn: "মাস্কিং প্রেরক আইডি দিয়ে সমগ্র শাখায় দ্বৈত ভাষার জরুরি এসএমএস প্রেরণ।",
    href: "/portal/communications",
    icon: Radio,
    accentColor: "from-rose-600 to-red-600",
  },
  {
    title: "Conference Gate Steward",
    titleBn: "সম্মেলন কিউআর চেক-ইন",
    description: "High-speed camera barcode scanner, kit & meal coupon issuance, and dues alerts.",
    descriptionBn: "প্রবেশদ্বারে ডিজিটাল কিউআর স্ক্যান করে সম্মেলন কিট ও দুপুরের খাবার কুপন ইস্যু।",
    href: "/portal/events/checkin",
    icon: Ticket,
    badge: "Event Day",
    accentColor: "from-amber-500 to-orange-500",
  },
  {
    title: "Community Blood Network",
    titleBn: "রক্তদাতা নেটওয়ার্ক ও কল্যাণ",
    description: "Voluntary physician donor radar with 90-day medical interval protection and appeals.",
    descriptionBn: "স্বেচ্ছাসেবী চিকিৎসক রক্তদাতা সন্ধান, বিরতি পর্যবেক্ষণ ও মানবিক সহায়তা।",
    href: "/portal/blood-bank",
    icon: Heart,
    accentColor: "from-red-600 to-rose-700",
  },
  {
    title: "Statutory & Audit Reports",
    titleBn: "সরকারী নিরীক্ষা ও রেজিষ্ট্রার",
    description: "1-Click printable Societies Act Member Register, AGM Voter Rolls, and Cash Book.",
    descriptionBn: "১৮৬০ সালের আইন অনুযায়ী সদস্য তালিকা, স্বাক্ষরযুক্ত ভোটার লিস্ট ও ক্যাশ বুক।",
    href: "/portal/reports",
    icon: BookOpen,
    badge: "Statutory",
    accentColor: "from-teal-600 to-emerald-700",
  },
  {
    title: "CPD Academy & Certificates",
    titleBn: "সিপিডি একাডেমি ও প্রশিক্ষণ",
    description: "Accredited clinical modules, verifiable PDF graduation passes, and learning history.",
    descriptionBn: "ক্লিনিক্যাল প্রশিক্ষণ কোর্স, বিএমডিসি পয়েন্ট ও ডিজিটাল সনদ ডাউনলোড।",
    href: "/portal/lms",
    icon: Award,
    accentColor: "from-blue-500 to-cyan-500",
  },
  {
    title: "Platform Super Admin",
    titleBn: "সিস্টেম সুপার অ্যাডমিন",
    description: "Multi-tenant lifecycle, custom domain certificates, and DB performance tuning.",
    descriptionBn: "বহু-সংগঠন ক্লাউড আর্কিটেকচার, ডোমেইন ম্যাপিং ও সিস্টেম পর্যবেক্ষণ।",
    href: "/portal/superadmin",
    icon: Shield,
    badge: "SuperAdmin",
    accentColor: "from-slate-700 to-slate-900",
  },
];

export default function MemberPortalDashboard() {
  const [lang, setLang] = useState<"en" | "bn">("en");

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500/20">
      {/* Top Header */}
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-slate-950/85 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center font-black text-slate-950 text-lg shadow-lg"
            >
              BMA
            </Link>
            <div>
              <Link href="/" className="font-bold text-base tracking-tight text-white hover:text-amber-400 transition-colors">
                {lang === "en" ? "Member & Officer Central Secretariat" : "সদস্য ও নির্বাহী পরিষদ পোর্টাল"}
              </Link>
              <div className="text-xs text-slate-400 font-bangla">
                {lang === "en" ? "Chattogram Metropolitan Division" : "চট্টগ্রাম মহানগর বিভাগ • ডিজিটাল গভর্ন্যান্স"}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setLang(lang === "en" ? "bn" : "en")}
              className="px-3 py-1.5 rounded-lg border border-white/10 text-xs font-semibold hover:border-amber-400/50 transition-colors"
            >
              {lang === "en" ? "বাংলা" : "English"}
            </button>
            {/* Dual-Track Role Selector Dropdown */}
            <RoleSelector />
          </div>
        </div>
      </header>

      {/* Hero Welcome Banner */}
      <section className="relative border-b border-white/10 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              {lang === "en" ? "Verified Officer Session • Fully Authenticated" : "যাচাইকৃত সক্রিয় অধিবেশন"}
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-white tracking-tight leading-tight">
              {lang === "en" ? "Welcome, Dr. Kazi Mostafa" : "স্বাগতম, ডাঃ কাজী মোস্তফা"}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              {lang === "en"
                ? "Active Context: Honorary General Secretary • Chattogram Metropolitan Branch Council"
                : "বর্তমান পদবী: মহাসচিব • চট্টগ্রাম মহানগর শাখা পরিষদ"}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/portal/events/checkin">
              <Button size="sm" className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold gap-1.5 text-xs">
                <Ticket className="w-3.5 h-3.5" />
                {lang === "en" ? "Gate Scanner" : "গেট স্ক্যানার"}
              </Button>
            </Link>
            <Link href="/portal/reports">
              <Button size="sm" variant="outline" className="border-white/10 text-slate-200 hover:text-white text-xs gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                {lang === "en" ? "Audit Registers" : "অডিট নথিপত্র"}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Module Grid */}
      <main className="max-w-7xl mx-auto px-6 py-12 flex-1 w-full">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold font-serif text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            {lang === "en" ? "Institutional Governance & Operations" : "প্রাতিষ্ঠানিক সেবা ও পরিচালনা মডিউল সমূহ"}
          </h2>
          <span className="text-xs text-slate-400">{MODULES.length} active management modules</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MODULES.map((mod) => {
            const Icon = mod.icon;

            return (
              <Link key={mod.href} href={mod.href} className="group">
                <Card className="h-full bg-slate-900/60 border border-white/10 hover:border-amber-500/40 transition-all duration-300 rounded-2xl overflow-hidden shadow-xl group-hover:scale-[1.01] flex flex-col justify-between">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div
                        className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${mod.accentColor} flex items-center justify-center text-white shadow-lg`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      {mod.badge && (
                        <Badge className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold">
                          {mod.badge}
                        </Badge>
                      )}
                    </div>

                    <div>
                      <h3 className="text-lg font-bold font-serif text-white group-hover:text-amber-400 transition-colors">
                        {lang === "en" ? mod.title : mod.titleBn}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        {lang === "en" ? mod.description : mod.descriptionBn}
                      </p>
                    </div>
                  </CardContent>

                  <div className="px-6 py-3 bg-slate-950/60 border-t border-white/5 flex items-center justify-between text-xs text-slate-400 group-hover:text-amber-400 transition-colors">
                    <span className="font-semibold">{lang === "en" ? "Open Console" : "প্রবেশ করুন"}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-slate-950 py-10 px-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © 2026 Bangladesh Medical Association • Enterprise Multi-Tenant Governance Cloud
          </div>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-slate-300 transition-colors">
              {lang === "en" ? "Public Portfolio" : "মূল ওয়েবসাইট"}
            </Link>
            <Link href="/notices" className="hover:text-slate-300 transition-colors">
              {lang === "en" ? "Notice Board" : "বিজ্ঞপ্তি"}
            </Link>
            <Link href="/events" className="hover:text-slate-300 transition-colors">
              {lang === "en" ? "Conferences" : "সম্মেলন"}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
