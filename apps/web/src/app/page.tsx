"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  FileText,
  QrCode,
  ArrowRight,
  Globe,
  Sparkles,
  ExternalLink,
  PhoneCall,
  Mail,
  MapPin,
} from "lucide-react";
import { Button, Badge, Card, CopyButton } from "@org/ui";
import { InstitutionalMemberCard } from "@/components/cards/holographic-member-card";
import { BangladeshBranchAtlas } from "@/components/geo/bangladesh-branch-atlas";
import { HeritageChronicleTimeline } from "@/components/heritage/heritage-chronicle-timeline";
import { InteractiveOrganogram } from "@/components/governance/interactive-organogram";
import { OrgLogo } from "@/components/brand/org-logo";
import { DevCenterPointBranding } from "@/components/brand/devcenterpoint-branding";
import { CommandPalette } from "@/components/ui/command-palette";

export default function TenantPublicPortfolio() {
  const [lang, setLang] = useState<"en" | "bn">("en");

  const toggleLang = () => {
    setLang((prev) => (prev === "en" ? "bn" : "en"));
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/30">
      {/* ================= 1. FROSTED GLASS NAVIGATION ================= */}
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-slate-950/75 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/">
            <OrgLogo size="md" />
          </Link>

          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <a href="#atlas" className="hover:text-white transition-colors">
              {lang === "en" ? "Branch Atlas" : "শাখা মানচিত্র"}
            </a>
            <a href="#heritage" className="hover:text-white transition-colors">
              {lang === "en" ? "Heritage (1952–2026)" : "ঐতিহ্য ও ইতিহাস"}
            </a>
            <a href="#organogram" className="hover:text-white transition-colors">
              {lang === "en" ? "Organogram" : "সাংগঠনিক কাঠামো"}
            </a>
            <Link href="/journal" className="hover:text-white transition-colors">
              {lang === "en" ? "Journal" : "জার্নাল"}
            </Link>
            <Link href="/memorial" className="hover:text-white transition-colors">
              {lang === "en" ? "Memorial" : "স্মৃতি চিরন্তন"}
            </Link>
            <Link href="/events" className="hover:text-white transition-colors">
              {lang === "en" ? "Conferences" : "সম্মেলন"}
            </Link>
            <Link href="/notices" className="hover:text-white transition-colors">
              {lang === "en" ? "Notices" : "বিজ্ঞপ্তি"}
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            {/* Quick Institutional Navigator */}
            <CommandPalette />

            {/* Language Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLang}
              className="gap-1.5 text-xs text-muted-foreground hover:text-white border-white/10"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              {lang === "en" ? "বাংলা" : "English"}
            </Button>

            {/* Private Portal Gateway */}
            <Link href="/portal">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs font-semibold hover:text-white"
              >
                {lang === "en" ? "Portal Login" : "লগইন"}
              </Button>
            </Link>

            {/* Direct Member Onboarding Funnel */}
            <Link href="/portal/concierge">
              <Button
                variant="primary"
                size="sm"
                className="gap-1.5 text-xs font-semibold shadow-lg shadow-primary/20"
              >
                <Sparkles className="w-3.5 h-3.5" />
                {lang === "en" ? "Fast-Track Concierge" : "দ্রুত সেবা কেন্দ্র"}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* ================= 2. KINETIC HERO SECTION ================= */}
      <section className="relative pt-24 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Ambient Glow */}
        <div className="absolute top-1/3 -translate-y-1/2 w-[600px] h-[350px] bg-primary/20 rounded-full blur-[140px] pointer-events-none -z-10" />

        {/* Accreditation Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-8">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-xs font-medium text-slate-300">
            {lang === "en"
              ? "Established 1972 · Over 50 Years of Medical Leadership"
              : "১৯৭২ সালে প্রতিষ্ঠিত · ৫০ বছরেরও বেশি সময় ধরে চিকিৎসা নেতৃত্বের প্রতীক"}
          </span>
        </div>

        {/* Display H1 Kinetic Typography */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.08] max-w-5xl">
          {lang === "en" ? (
            <>
              Uniting Physicians, Advancing Science,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-amber-300">
                Serving Humanity.
              </span>
            </>
          ) : (
            <>
              চিকিৎসক ঐক্য, চিকিৎসা বিজ্ঞানের উৎকর্ষ এবং{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-amber-300">
                মানবিক স্বাস্থ্যসেবার শপথ।
              </span>
            </>
          )}
        </h1>

        <p className="mt-6 text-base sm:text-xl text-muted-foreground max-w-3xl leading-relaxed">
          {lang === "en"
            ? "The apex representative statutory body for medical practitioners across Chattogram Division, governing professional ethics, scientific advancement, and community health."
            : "চট্টগ্রাম বিভাগের চিকিৎসকদের শীর্ষ পেশাজীবী সংগঠন — চিকিৎসা নীতি, উচ্চতর বিজ্ঞান গবেষণা ও সার্বজনীন স্বাস্থ্যসেবা প্রসারে অঙ্গিকারবদ্ধ।"}
        </p>

        {/* Primary Call-to-Actions */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href="/apply">
            <Button
              variant="gold"
              size="lg"
              shimmer
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              {lang === "en" ? "Register as Associate Member" : "সহযোগী সদস্যপদ আবেদন"}
            </Button>
          </Link>

          <Link href="/verify/member/BMAC-2026-00421">
            <Button
              variant="glass"
              size="lg"
              leftIcon={<ShieldCheck className="w-4 h-4 text-emerald-400" />}
            >
              {lang === "en" ? "Verify Member Registry" : "সদস্য রেজিস্ট্রি যাচাই"}
            </Button>
          </Link>

          <Link href="/portal/concierge">
            <Button
              variant="navy"
              size="lg"
            >
              {lang === "en" ? "Fast-Track Concierge" : "মেম্বার কনসিয়ার্জ"}
            </Button>
          </Link>
        </div>

        {/* ================= 3. STATS TICKER ================= */}
        <div className="mt-20 w-full grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: lang === "en" ? "Registered Physicians" : "নিবন্ধিত চিকিৎসক", value: "3,850+" },
            { label: lang === "en" ? "Affiliated Hospitals" : "সংযুক্ত হাসপাতাল", value: "48" },
            { label: lang === "en" ? "Active Local Units" : "সক্রিয় স্থানীয় ইউনিট", value: "14" },
            { label: lang === "en" ? "Relief Disbursed" : "জরুরি চিকিৎসা সহায়তা", value: "৳1.4 Cr" },
          ].map((stat, i) => (
            <Card
              key={i}
              interactive
              accent={i === 0 ? "gold" : i === 1 ? "blue" : i === 2 ? "emerald" : "none"}
              className="p-6 flex flex-col items-center justify-center text-center"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {stat.value}
              </div>
              <div className="mt-1 text-xs sm:text-sm text-muted-foreground font-medium">
                {stat.label}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* ================= 4. BANGLADESH BRANCH & DIVISION ATLAS ================= */}
      <section id="atlas" className="py-20 px-6 max-w-7xl mx-auto w-full border-t border-white/10">
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <Badge variant="warning" className="mb-2">
            64-District Presence
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {lang === "en" ? "National Branch & Hospital Atlas" : "সারাদেশের শাখা ও হাসপাতাল নেটওয়ার্ক"}
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            {lang === "en"
              ? "Select any administrative division or district branch to inspect local executive leadership, active registered doctors, and 24/7 doctor emergency helplines."
              : "বিভাগ অথবা জেলা শাখা নির্বাচন করে স্থানীয় নেতৃত্ব, সক্রিয় চিকিৎসকদের বিবরণ এবং সার্বক্ষণিক জরুরি সহায়তা লাইন দেখুন।"}
          </p>
        </div>
        <BangladeshBranchAtlas />
      </section>

      {/* ================= 5. INSTITUTIONAL MEMBER CREDENTIAL SHOWCASE ================= */}
      <section className="py-20 px-6 max-w-7xl mx-auto w-full border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="success" className="mb-3">
              Tamper-Proof Digital Identity
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {lang === "en" ? (
                <>
                  Institutional Digital Credentials for{" "}
                  <span className="text-primary font-semibold">
                    Every Verified Member.
                  </span>
                </>
              ) : (
                <>
                  প্রত্যেক যাচাইকৃত সদস্যের জন্য{" "}
                  <span className="text-primary font-semibold">
                    প্রাতিষ্ঠানিক ডিজিটাল সনদ ও পরিচয়পত্র।
                  </span>
                </>
              )}
            </h2>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              {lang === "en"
                ? "Paper-free, cryptographically verifiable membership identification. Each active physician holds an authoritative digital credential with instant QR code public verification, active tier endorsement, and standard printable pass export."
                : "কাগজের সনদের দিন শেষ। প্রতিটি সক্রিয় সদস্য ক্রিপ্টোগ্রাফিক সুরক্ষা সিল, রিয়েল-টাইম কিউআর যাচাই এবং উচ্চ-মানের প্রিন্টযোগ্য ডিজিটাল আইডি কার্ড উপভোগ করেন।"}
            </p>

            <ul className="mt-6 space-y-3 text-sm text-slate-300">
              <li className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Cryptographic SHA-256 integrity hash issued by institutional ledger.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <QrCode className="w-4 h-4 text-primary shrink-0" />
                <span>Instant QR-based public register verification for statutory authorities.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Multi-tier lifecycle (Associate, General, Life, Honorary) with branch endorsements.</span>
              </li>
            </ul>
          </div>

          <div className="flex justify-center">
            <InstitutionalMemberCard />
          </div>
        </div>
      </section>

      {/* ================= 6. EXECUTIVE LEADERSHIP ROSTER ================= */}
      <section id="leadership" className="py-20 px-6 max-w-7xl mx-auto w-full border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge variant="default" className="mb-2">
            Governance Council
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {lang === "en" ? "Executive Committee (2026–2028)" : "কার্যনির্বাহী পরিষদ (২০২৬–২০২৮)"}
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            {lang === "en"
              ? "Elected office-bearers leading policy, academic excellence, and institutional affairs."
              : "নীতিমালা, শিক্ষা কার্যক্রম ও প্রাতিষ্ঠানিক ব্যবস্থাপনায় নেতৃত্বদানকারী নির্বাচিত নেতৃবৃন্দ।"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              role: "President",
              roleBn: "সভাপতি",
              name: "Prof. Dr. Mujibul Haque",
              nameBn: "অধ্যাপক ডাঃ মুজিবুল হক",
              specialty: "FCPS (Medicine), FRCP (Glasg)",
              tenure: "Term: 2026–2028",
            },
            {
              role: "General Secretary",
              roleBn: "সাধারণ সম্পাদক",
              name: "Dr. Faisal Ahmed Chowdhury",
              nameBn: "ডাঃ ফয়সাল আহমেদ চৌধুরী",
              specialty: "MS (Ortho), FICS (USA)",
              tenure: "Term: 2026–2028",
            },
            {
              role: "Treasurer",
              roleBn: "কোষাধ্যক্ষ",
              name: "Dr. Nasrin Sultana",
              nameBn: "ডাঃ নাসরিন সুলতানা",
              specialty: "FCPS (Paediatrics), MD",
              tenure: "Term: 2026–2028",
            },
          ].map((leader, i) => (
            <div key={i} className="glass-card rounded-2xl p-6 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/30 to-amber-500/20 border-2 border-primary/40 flex items-center justify-center font-bold text-2xl text-white shadow-xl mb-4">
                {leader.name.split(" ")[2]?.[0] || "DR"}
              </div>
              <Badge variant="secondary" className="mb-2 text-[10px] uppercase font-bold tracking-wider">
                {lang === "en" ? leader.role : leader.roleBn}
              </Badge>
              <h4 className="text-lg font-bold text-white tracking-tight">{leader.name}</h4>
              <p className="text-xs text-muted-foreground font-bangla">{leader.nameBn}</p>
              <p className="text-xs text-slate-400 mt-2 font-medium">{leader.specialty}</p>
              <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-amber-400 font-medium">
                {leader.tenure}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= 6B. INTERACTIVE ORGANOGRAM & COMMITTEES ================= */}
      <section id="organogram" className="py-20 px-6 max-w-7xl mx-auto w-full border-t border-white/10">
        <InteractiveOrganogram />
      </section>

      {/* ================= 6C. HISTORICAL HERITAGE CHRONICLE ================= */}
      <section id="heritage" className="py-20 px-6 max-w-7xl mx-auto w-full border-t border-white/10">
        <HeritageChronicleTimeline />
      </section>

      {/* ================= 7. NOTICE VAULT & OFFICIAL CIRCULARS ================= */}
      <section id="notices" className="py-20 px-6 max-w-7xl mx-auto w-full border-t border-white/10">
        <div className="flex items-center justify-between mb-10">
          <div>
            <Badge variant="warning" className="mb-2">Official Circulars</Badge>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              {lang === "en" ? "Notice Board & Announcements" : "বিজ্ঞপ্তি বোর্ড ও ঘোষণা"}
            </h2>
          </div>
          <Button variant="outline" size="sm" className="text-xs text-muted-foreground hover:text-white">
            {lang === "en" ? "View Archive" : "আর্কাইভ দেখুন"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              tag: "General Assembly",
              date: "September 24, 2026",
              title: "Notice for 52nd Annual General Meeting (AGM) and Academic Session",
              titleBn: "৫২তম বার্ষিক সাধারণ সভা (এজিএম) ও বৈজ্ঞানিক অধিবেশনের নোটিশ",
              isPinned: true,
            },
            {
              tag: "Elections",
              date: "September 18, 2026",
              title: "Draft Voter List Publication for Central & Branch Executive Election 2026-2028",
              titleBn: "কার্যনির্বাহী নির্বাচন ২০২৬-২০২৮ এর খসড়া ভোটার তালিকা প্রকাশ",
              isPinned: false,
            },
          ].map((notice, i) => (
            <div key={i} className="glass-card rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                  <span className="font-semibold text-amber-400">{notice.tag}</span>
                  <span>{notice.date}</span>
                </div>
                <h4 className="text-base font-bold text-white leading-snug hover:text-primary transition-colors cursor-pointer">
                  {lang === "en" ? notice.title : notice.titleBn}
                </h4>
              </div>
              <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/10">
                <span className="text-xs text-emerald-400 flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5" /> PDF Signed Circular
                </span>
                <Button variant="ghost" size="sm" className="h-8 text-xs gap-1 text-primary">
                  Download <ExternalLink className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= 8. PUBLIC VERIFICATION DESK ================= */}
      <section id="verify" className="py-20 px-6 max-w-7xl mx-auto w-full border-t border-white/10">
        <div className="glass-card rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-2xl">
            <Badge variant="success" className="mb-3">
              Public Trust Registry
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {lang === "en"
                ? "Verify Member Card or Conference Certificate"
                : "সদস্য কার্ড অথবা সনদপত্র সত্যতা যাচাই করুন"}
            </h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              {lang === "en"
                ? "Enter the member registration number (e.g. BMA-LIFE-0001) or scan the QR code to verify standing, executive appointments, and validity status in real time."
                : "সদস্য নিবন্ধন নম্বর লিখুন অথবা কিউআর কোড স্ক্যান করে তাৎক্ষণিকভাবে বৈধতা ও কার্যনির্বাহী পদবি যাচাই করুন।"}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="e.g. BMA-LIFE-0001"
                className="h-12 px-5 rounded-xl bg-slate-900/80 border border-white/15 text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm flex-1"
              />
              <Button
                variant="gold"
                size="lg"
                shimmer
                leftIcon={<ShieldCheck className="w-4 h-4" />}
                className="h-12 text-sm font-semibold shadow-lg"
              >
                {lang === "en" ? "Verify Status" : "যাচাই করুন"}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 9. EDITORIAL FOOTER ================= */}
      <footer className="mt-auto border-t border-white/10 bg-slate-950 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4 md:col-span-2">
            <OrgLogo size="lg" />
            <p className="text-xs text-muted-foreground max-w-md leading-relaxed">
              Autonomous statutory association governing medical ethics, continuing medical education,
              and professional welfare across Chattogram Division. Registered under Societies Registration Act XXI of 1860.
            </p>
            <div className="text-xs text-slate-500 pt-1">
              Powered by Multi-Tenant Organization Operating System · MySQL 8.0 & Next.js 15 PWA
            </div>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Institutional Links
            </h5>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li><Link href="/journal" className="hover:text-white transition-colors">Peer-Reviewed Journal (ISSN 0301-4975)</Link></li>
              <li><Link href="/memorial" className="hover:text-white transition-colors">Memorial Hall of Eternal Respect</Link></li>
              <li><Link href="/events" className="hover:text-white transition-colors">Scientific Sessions & Conferences</Link></li>
              <li><Link href="/notices" className="hover:text-white transition-colors">Official Gazette & Circulars</Link></li>
              <li><Link href="/causes" className="hover:text-white transition-colors">Physician Welfare Fund</Link></li>
              <li><Link href="/portal/concierge" className="hover:text-white transition-colors">Member Fast-Track Concierge</Link></li>
              <li><Link href="/portal/reports" className="hover:text-white transition-colors">Societies Act 1860 Registers</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Secretariat Contact
            </h5>
            <ul className="space-y-3 text-xs text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                <span>BMA Bhaban, K.B. Fazlul Kader Road, Chattogram, Bangladesh</span>
              </li>
              <li className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>+880 1819 000111</span>
                </div>
                <CopyButton text="+8801819000111" />
              </li>
              <li className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>secretariat@bma-ctg.org</span>
                </div>
                <CopyButton text="secretariat@bma-ctg.org" />
              </li>
            </ul>
          </div>
        </div>

        {/* DevCenterPoint Engineering Attribution */}
        <div className="max-w-7xl mx-auto">
          <DevCenterPointBranding />
        </div>
      </footer>
    </div>
  );
}
