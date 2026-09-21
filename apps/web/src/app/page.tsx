"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  QrCode,
  ArrowRight,
  Globe,
  Sparkles,
  ExternalLink,
  PhoneCall,
  Mail,
  MapPin,
  AlertTriangle,
  Users,
  HeartHandshake,
  Compass,
} from "lucide-react";
import { Button } from "@org/ui";
import { InstitutionalMemberCard } from "@/components/cards/holographic-member-card";
import { BangladeshBranchAtlas } from "@/components/geo/bangladesh-branch-atlas";
import { HeritageChronicleTimeline } from "@/components/heritage/heritage-chronicle-timeline";
import { InteractiveOrganogram } from "@/components/governance/interactive-organogram";
import { OrgLogo } from "@/components/brand/org-logo";
import { DevCenterPointBranding } from "@/components/brand/devcenterpoint-branding";
import { CommandPalette } from "@/components/ui/command-palette";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { soundEffects } from "@/lib/audio-effects";

export default function RoadSafetyPublicPortfolio() {
  const [lang, setLang] = useState<"en" | "bn">("en");

  const toggleLang = () => {
    soundEffects.playClick(650);
    setLang((prev) => (prev === "en" ? "bn" : "en"));
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-amber-500/30 selection:text-foreground transition-colors duration-200">
      {/* ================= 1. FROSTED GLASS NAVIGATION ================= */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-2xl transition-colors">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-6">
          <Link href="/" onClick={() => soundEffects.playClick(500)} className="shrink-0">
            <OrgLogo size="md" />
          </Link>

          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-600 dark:text-slate-300">
            <a href="#atlas" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              {lang === "en" ? "64-District Atlas" : "৬৪ জেলা মানচিত্র"}
            </a>
            <a href="#heritage" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              {lang === "en" ? "Movement Heritage" : "ঐতিহ্য ও ইতিহাস"}
            </a>
            <a href="#organogram" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              {lang === "en" ? "Organogram" : "সাংগঠনিক কাঠামো"}
            </a>
            <a href="#pillars" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              {lang === "en" ? "Activities" : "কার্যক্রম"}
            </a>
            <Link href="/causes" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              {lang === "en" ? "Projects" : "প্রকল্পসমূহ"}
            </Link>
            <Link href="/memorial" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              {lang === "en" ? "Victim Memorial" : "স্মৃতি চিরন্তন"}
            </Link>
            <Link href="/notices" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              {lang === "en" ? "Notices & Press" : "বিজ্ঞপ্তি"}
            </Link>
          </nav>

          <div className="flex items-center gap-2.5">
            {/* Quick Command Navigator */}
            <CommandPalette />

            {/* High-Visibility Light/Dark Theme Switcher */}
            <ThemeToggle variant="pill" />

            {/* Language Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLang}
              className="gap-1.5 text-xs text-slate-700 dark:text-slate-200 border-border bg-card"
            >
              <Globe className="w-3.5 h-3.5 text-amber-500" />
              {lang === "en" ? "বাংলা" : "English"}
            </Button>

            {/* Private Portal Gateway */}
            <Link href="/portal">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white"
              >
                {lang === "en" ? "Portal Login" : "লগইন"}
              </Button>
            </Link>

            {/* Direct Member Onboarding Funnel */}
            <Link href="/portal/concierge">
              <Button
                variant="primary"
                size="sm"
                className="gap-1.5 text-xs font-bold shadow-md shadow-primary/20 hidden sm:inline-flex"
              >
                <Sparkles className="w-3.5 h-3.5" />
                {lang === "en" ? "Volunteer Desk" : "স্বেচ্ছাসেবী ডেস্ক"}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* ================= 2. KINETIC HERO SECTION ================= */}
      <section className="relative pt-20 pb-16 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Ambient Warm Amber & Emerald Glow */}
        <div className="absolute top-1/3 -translate-y-1/2 w-[600px] h-[350px] bg-amber-500/15 dark:bg-amber-500/20 rounded-full blur-[140px] pointer-events-none -z-10" />
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[250px] bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-[120px] pointer-events-none -z-10" />

        {/* Accreditation Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 backdrop-blur-xl mb-8">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
          <span className="text-xs font-bold text-amber-700 dark:text-amber-400 font-mono">
            {lang === "en"
              ? "ESTD. 2018 · BORN FROM THE STUDENTS' SAFE ROAD MOVEMENT"
              : "২০১৮ সালের ঐতিহাসিক নিরাপদ সড়ক আন্দোলন থেকে প্রতিষ্ঠিত"}
          </span>
        </div>

        {/* Display H1 Kinetic Typography */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.08] max-w-5xl">
          {lang === "en" ? (
            <>
              1.19 Million People Die on the Roads Every Year.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-500">
                Join Us to Ensure Safe Roads.
              </span>
            </>
          ) : (
            <>
              প্রতি বছর সড়কে ঝরে যায় ১১ লক্ষ ৯০ হাজার প্রাণ।{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-500">
                নিরাপদ ও মানবিক সড়কের প্রত্যয়ে ঐক্যবদ্ধ হোন।
              </span>
            </>
          )}
        </h1>

        <p className="mt-6 text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          {lang === "en"
            ? "Road Safety Movement is Bangladesh's apex volunteer-driven organization working to transform transportation into an accountable, sustainable, and humane system through crash research, policy advocacy, driver education, and victim rehabilitation."
            : "নিরাপদ সড়ক আন্দোলন (Road Safety Movement) বাংলাদেশের শীর্ষ স্বেচ্ছাসেবী নাগরিক সংগঠন—গবেষণা, নীতি সংস্কার, চালক প্রশিক্ষণ এবং ভিকটিম সহায়তার মাধ্যমে একটি নিরাপদ ও টেকসই যোগাযোগ ব্যবস্থা প্রতিষ্ঠায় অঙ্গীকারবদ্ধ।"}
        </p>

        {/* Primary Call-to-Actions */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href="/apply">
            <Button
              variant="primary"
              size="lg"
              className="gap-2 text-sm font-extrabold shadow-lg shadow-amber-500/25 px-7 py-3"
            >
              <Users className="w-4 h-4" />
              {lang === "en" ? "Become A Volunteer" : "স্বেচ্ছাসেবী হিসেবে যোগ দিন"}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>

          <a href="#atlas">
            <Button
              variant="outline"
              size="lg"
              className="gap-2 text-sm font-bold border-border bg-card text-slate-800 dark:text-slate-200 px-6 py-3"
            >
              <Compass className="w-4 h-4 text-amber-500" />
              {lang === "en" ? "Explore 64 Districts Atlas" : "৬৪ জেলা নেটওয়ার্ক দেখুন"}
            </Button>
          </a>

          <Link href="/memorial">
            <Button
              variant="ghost"
              size="lg"
              className="gap-2 text-sm font-bold text-red-600 dark:text-red-400 hover:bg-red-500/10 px-5 py-3"
            >
              <HeartHandshake className="w-4 h-4" />
              {lang === "en" ? "Victim Relief Fund" : "ভিকটিম সহায়তা তহবিল"}
            </Button>
          </Link>
        </div>

        {/* ================= 3. STAT METRIC COUNTERS ================= */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-5xl">
          <div className="p-5 rounded-2xl bg-card border border-border text-center shadow-sm">
            <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">9,010+</div>
            <div className="text-xs font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-400 mt-1">
              Registered Volunteers
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-bangla mt-0.5">দেশব্যাপী সক্রিয় স্বেচ্ছাসেবী</div>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border text-center shadow-sm">
            <div className="text-3xl sm:text-4xl font-black text-amber-600 dark:text-amber-400">82</div>
            <div className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 mt-1">
              Active Committees
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-bangla mt-0.5">জেলা ও ক্যাম্পাস চ্যাপ্টার</div>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border text-center shadow-sm">
            <div className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400">6</div>
            <div className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 mt-1">
              Ongoing Projects
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-bangla mt-0.5">চলমান জাতীয় কর্মসূচি</div>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border text-center shadow-sm">
            <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">25,000+</div>
            <div className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mt-1">
              People Reached
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-bangla mt-0.5">প্রশিক্ষিত ও সচেতন নাগরিক</div>
          </div>
        </div>
      </section>

      {/* ================= 4. 'ROAD CRASH, NOT ACCIDENT' SPOTLIGHT ================= */}
      <section className="py-12 px-6 max-w-7xl mx-auto w-full">
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500/10 via-card to-emerald-500/10 border-2 border-amber-500/40 shadow-xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-3 flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-extrabold uppercase tracking-wider">
                <AlertTriangle className="w-3.5 h-3.5" />
                National Paradigm Shift Campaign
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                সড়ক নিরাপত্তা নিশ্চিতকরণে ‘দুর্ঘটনা’ নয়, ‘রোড ক্র্যাশ’ শব্দ ব্যবহারের আহ্বান
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Reckless driving, unlicensed operators, defective fitness, and missing road signage are not unavoidable acts of fate.
                Calling collisions “Accidents” excuses culpability. Road Safety Movement champions the legal and cultural shift to
                <strong className="text-slate-900 dark:text-white"> “Road Crash”</strong> to demand accountability, justice, and reform.
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3">
              <Link href="/notices">
                <Button variant="outline" size="sm" className="font-bold text-xs border-border">
                  Read Press Release
                </Button>
              </Link>
              <Link href="/apply">
                <Button variant="primary" size="sm" className="font-bold text-xs shadow-md">
                  Support the Charter
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 5. CORE ACTION PILLARS ================= */}
      <section className="py-16 px-6 max-w-7xl mx-auto w-full" id="pillars">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
            Strategic Pillars
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Our Core Strategic Activities
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 font-bangla mt-2">
            নিরাপদ সড়ক আন্দোলনের ৫টি মৌলিক প্রাতিষ্ঠানিক কার্যক্রম ও কর্মসূচি
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {/* Pillar 1 */}
          <div className="p-6 rounded-2xl bg-card border border-border hover:border-amber-500/50 hover:shadow-lg transition-all space-y-3 group">
            <div className="text-3xl font-black text-amber-500/40 group-hover:text-amber-500 transition-colors font-mono">
              01.
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Education & Awareness</h3>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bangla font-semibold">
              শিক্ষা ও জনসচেতনতা
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Promoting defensive habits through school programs, driver workshops, and community education for responsible road behavior.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-6 rounded-2xl bg-card border border-border hover:border-blue-500/50 hover:shadow-lg transition-all space-y-3 group">
            <div className="text-3xl font-black text-blue-500/40 group-hover:text-blue-500 transition-colors font-mono">
              02.
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Policy Advocacy</h3>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bangla font-semibold">
              আইন সংস্কার ও অ্যাডভোকেসি
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Advocating for strict enforcement of the Road Transport Act 2018, modern road infrastructure, and total transport accountability.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-6 rounded-2xl bg-card border border-border hover:border-emerald-500/50 hover:shadow-lg transition-all space-y-3 group">
            <div className="text-3xl font-black text-emerald-500/40 group-hover:text-emerald-500 transition-colors font-mono">
              03.
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Research & Data</h3>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bangla font-semibold">
              ক্র্যাশ ডেটা ও ব্ল্যাকস্পট গবেষণা
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Conducting geometric road audits to identify deadly blackspots and providing data-driven engineering solutions for national highways.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="p-6 rounded-2xl bg-card border border-border hover:border-red-500/50 hover:shadow-lg transition-all space-y-3 group">
            <div className="text-3xl font-black text-red-500/40 group-hover:text-red-500 transition-colors font-mono">
              04.
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Victim Support</h3>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bangla font-semibold">
              ভিকটিম সহায়তা ও পুনর্বাসন
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Providing road crash victim families with emergency guidance, legal aid, medical assistance, and prosthetic rehabilitation pathways.
            </p>
          </div>

          {/* Pillar 5 */}
          <div className="p-6 rounded-2xl bg-card border border-border hover:border-purple-500/50 hover:shadow-lg transition-all space-y-3 group">
            <div className="text-3xl font-black text-purple-500/40 group-hover:text-purple-500 transition-colors font-mono">
              05.
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Youth Initiatives</h3>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bangla font-semibold">
              ক্যাম্পাস ও সামাজিক উদ্যোগ
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Mobilizing 9,010+ volunteer students across universities and colleges to foster a grassroots culture of road safety and shared civic responsibility.
            </p>
          </div>
        </div>
      </section>

      {/* ================= 6. INTERACTIVE 64-DISTRICT NATIONAL ATLAS ================= */}
      <section className="py-16 px-6 max-w-7xl mx-auto w-full">
        <BangladeshBranchAtlas />
      </section>

      {/* ================= 7. MOVEMENT HERITAGE TIMELINE ================= */}
      <section className="py-16 px-6 max-w-7xl mx-auto w-full">
        <HeritageChronicleTimeline />
      </section>

      {/* ================= 8. INTERACTIVE ORGANOGRAM WITH DRAG-AND-DROP ================= */}
      <section className="py-16 px-6 max-w-7xl mx-auto w-full">
        <InteractiveOrganogram />
      </section>

      {/* ================= 9. HOLOGRAPHIC VOLUNTEER ID CARD SHOWCASE ================= */}
      <section className="py-16 px-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-card rounded-3xl border-2 border-border p-8 shadow-xl">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
              <QrCode className="w-3.5 h-3.5" />
              Digital Volunteer Registry Pass
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Cryptographically Verified Activist Credential
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Every registered volunteer, campus chapter coordinator, and council officer in the Road Safety Movement receives an official CR80-compliant digital ID pass with verifiable QR authentication, blood group records, and chapter assignment.
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-bangla leading-relaxed p-3.5 rounded-xl bg-muted/60 border border-border">
              স্বেচ্ছাসেবীদের মাঠপর্যায়ে ট্রাফিক শৃঙ্খলা ও সচেতনতামূলক কার্যক্রমে অংশগ্রহণের জন্য ডিজিটাল পরিচয়পত্র প্রদান করা হয়।
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <Link href="/apply">
                <Button variant="primary" size="md" className="font-bold text-xs gap-1.5 shadow-md">
                  Apply for Volunteer Pass
                </Button>
              </Link>
              <Link href="/verify/member/RSM-VOL-2018-001">
                <Button variant="outline" size="md" className="font-semibold text-xs border-border">
                  Verify Sample Pass
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            <InstitutionalMemberCard />
          </div>
        </div>
      </section>

      {/* ================= 10. ACTION FOOTER ================= */}
      <footer className="border-t border-border bg-card/60 mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <OrgLogo size="md" />
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Road Safety Movement is a non-profit and voluntary organization that emerged from the historic 2018 Students' Safe Road Movement in Bangladesh.
              </p>
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bangla font-semibold">
                নিরাপদ সড়ক আন্দোলন — সকলের জন্য নিরাপদ ও মানবিক সড়ক
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
                Quick Navigation
              </h4>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
                <li>
                  <a href="#atlas" className="hover:text-amber-500 transition-colors">64-District Branch Atlas</a>
                </li>
                <li>
                  <a href="#heritage" className="hover:text-amber-500 transition-colors">Movement Chronicle (2018–2026)</a>
                </li>
                <li>
                  <a href="#organogram" className="hover:text-amber-500 transition-colors">National Executive Council</a>
                </li>
                <li>
                  <Link href="/causes" className="hover:text-amber-500 transition-colors">Ongoing Road Projects</Link>
                </li>
                <li>
                  <Link href="/memorial" className="hover:text-amber-500 transition-colors">Road Crash Victims Memorial</Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
                National Secretariat
              </h4>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <li className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Dhaka, Bangladesh</span>
                </li>
                <li className="flex items-center gap-2">
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span className="font-mono font-semibold">+880 1819 778899</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <span>contact@roadsafetymovement.org</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Platform Architecture
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Powered by DevCenterPoint Institutional Operating System. Enterprise multi-tenant governance with high-availability crash reporting.
              </p>
              <DevCenterPointBranding variant="subtle" />
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
            <div>
              © 2018–2026 Road Safety Movement (নিরাপদ সড়ক আন্দোলন). All rights reserved.
            </div>
            <div className="flex items-center gap-4 text-[11px]">
              <a href="https://www.roadsafetymovement.org" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
                Official Website <ExternalLink className="w-3 h-3" />
              </a>
              <span>·</span>
              <Link href="/portal" className="hover:underline">Council Portal</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
