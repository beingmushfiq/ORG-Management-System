"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Award,
  BookOpen,
  Trophy,
  Compass,
  Laptop,
  Smartphone,
  BookMarked,
  Gift,
  ChevronRight,
  GraduationCap,
  Plane,
} from "lucide-react";
import { Button, Badge } from "@org/ui";
import { InstitutionalHeader } from "@/components/layout/institutional-header";
import { InstitutionalFooter } from "@/components/layout/institutional-footer";
import { BangladeshBranchAtlas } from "@/components/geo/bangladesh-branch-atlas";
import { soundEffects } from "@/lib/audio-effects";

export default function AgriculturalOlympiadHomepage() {
  const [lang, setLang] = useState<"en" | "bn">("en");

  const toggleLang = () => {
    soundEffects.playClick(650);
    setLang((prev) => (prev === "en" ? "bn" : "en"));
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-amber-500/30 selection:text-foreground transition-colors duration-200">
      {/* 1. HopeNest-Style Header */}
      <InstitutionalHeader lang={lang} onToggleLang={toggleLang} />

      <main className="flex-1">
        {/* ================= 2. KINETIC HERO SECTION (HopeNest Design) ================= */}
        <section className="relative pt-16 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center overflow-hidden">
          {/* Ambient Emerald & Sun Gold Ambient Glows */}
          <div className="absolute top-1/4 -translate-y-1/2 w-[650px] h-[350px] bg-emerald-500/15 dark:bg-emerald-500/20 rounded-full blur-[140px] pointer-events-none -z-10" />
          <div className="absolute top-1/2 right-1/4 w-[450px] h-[280px] bg-amber-500/15 dark:bg-amber-500/20 rounded-full blur-[130px] pointer-events-none -z-10" />

          {/* Accreditation Tagline Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 backdrop-blur-xl mb-6">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping" />
            <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 font-mono tracking-wider">
              {lang === "en"
                ? "NATIONAL AGRICULTURAL OLYMPIAD 2025 · SEASON 2 & 3"
                : "জাতীয় কৃষি অলিম্পিয়াড ২০২৫ · সিজন ২ ও ৩ · দেশব্যাপী নিবন্ধন উন্মুক্ত"}
            </span>
          </div>

          {/* Display H1 Kinetic Typography */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.08] max-w-5xl">
            {lang === "en" ? (
              <>
                Empowering Youth to Shape a{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-amber-500">
                  Sustainable Future
                </span>{" "}
                for Bangladesh Agriculture.
              </>
            ) : (
              <>
                স্মার্ট ও টেকসই কৃষির প্রত্যয়ে{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-amber-500">
                  তরুণ প্রজন্মের মেধার বিকাশ
                </span>{" "}
                ও জাতীয় নেতৃত্ব।
              </>
            )}
          </h1>

          <p className="mt-6 text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
            {lang === "en"
              ? "Join thousands of school, college, and university students across 64 districts in Bangladesh. Showcase your agricultural solutions, win prestigious laptops and cash rewards, and visit national research centers."
              : "দেশের ৬৪টি জেলার স্কুল, কলেজ ও বিশ্ববিদ্যালয়ের শিক্ষার্থীদের অংশগ্রহণে অনুষ্ঠিত হচ্ছে সর্ববৃহৎ কৃষিভিত্তিক প্রতিযোগিতা। মেধা প্রদর্শন করে জিতে নিন ল্যাপটপ, নগদ অর্থ ও জাতীয় গবেষণা কেন্দ্রে শিক্ষা সফর।"}
          </p>

          {/* Primary Call-to-Actions (HopeNest Charity Style) */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/apply">
              <Button
                variant="primary"
                size="lg"
                className="gap-2 text-sm font-extrabold bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 shadow-xl shadow-amber-500/25 px-8 py-3.5"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>{lang === "en" ? "Register Now · BDT 70.00" : "নিবন্ধন করুন · ৭০.০০ ৳"}</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </Button>
            </Link>

            <a href="#categories">
              <Button
                variant="outline"
                size="lg"
                className="gap-2 text-sm font-bold border-border bg-card text-foreground px-6 py-3.5"
              >
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <span>{lang === "en" ? "Competition Categories" : "ক্যাটাগরি ও সিলেবাস"}</span>
              </Button>
            </a>

            <Link href="/courses">
              <Button
                variant="ghost"
                size="lg"
                className="gap-2 text-sm font-bold text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/10 px-5 py-3.5"
              >
                <GraduationCap className="w-4 h-4" />
                <span>{lang === "en" ? "Skill Courses (BDT)" : "কোর্সসমূহ (বিডিটি)"}</span>
              </Button>
            </Link>
          </div>

          {/* ================= 3. STAT METRIC COUNTERS ================= */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-5xl">
            <div className="p-5 rounded-2xl bg-card border border-border text-center shadow-sm hover:border-emerald-500/40 transition-colors">
              <div className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400">25,000+</div>
              <div className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 mt-1">
                Participating Students
              </div>
              <div className="text-[11px] text-muted-foreground font-bangla mt-0.5">দেশব্যাপী নিবন্ধিত শিক্ষার্থী</div>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border text-center shadow-sm hover:border-amber-500/40 transition-colors">
              <div className="text-3xl sm:text-4xl font-black text-amber-600 dark:text-amber-400">64</div>
              <div className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 mt-1">
                Districts Reached
              </div>
              <div className="text-[11px] text-muted-foreground font-bangla mt-0.5">সমগ্র বাংলাদেশ জুড়ে শাখা</div>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border text-center shadow-sm hover:border-blue-500/40 transition-colors">
              <div className="text-3xl sm:text-4xl font-black text-blue-600 dark:text-blue-400">150+</div>
              <div className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 mt-1">
                Academic Institutions
              </div>
              <div className="text-[11px] text-muted-foreground font-bangla mt-0.5">স্কুল, কলেজ ও বিশ্ববিদ্যালয়</div>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border text-center shadow-sm hover:border-purple-500/40 transition-colors">
              <div className="text-3xl sm:text-4xl font-black text-purple-600 dark:text-purple-400">100K+ BDT</div>
              <div className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 mt-1">
                Grand Prize Pool
              </div>
              <div className="text-[11px] text-muted-foreground font-bangla mt-0.5">নগদ অর্থ ও গ্যাজেট পুরস্কার</div>
            </div>
          </div>
        </section>

        {/* ================= 4. PRIZE PODIUM SHOWCASE (Agricultural Olympiad Rewards) ================= */}
        <section className="py-16 px-6 max-w-7xl mx-auto w-full" id="prizes">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Trophy className="w-3.5 h-3.5" />
              {lang === "en" ? "National Rewards & Awards" : "জাতীয় পুরস্কার ও সম্মাননা"}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              {lang === "en" ? "Prestigious Honors for Top Achievers" : "শীর্ষস্থান অধিকারীদের জন্য রাষ্ট্রীয় সম্মাননা"}
            </h2>
            <p className="text-sm text-muted-foreground font-bangla">
              জাতীয় পর্যায়ে বিজয়ীদের জন্য রয়েছে নগদ অর্থ, ল্যাপটপ, গ্যাজেট ও জাতীয় কৃষি গবেষণা কেন্দ্রে বিশেষ শিক্ষা সফর
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1st Prize */}
            <div className="p-6 rounded-3xl bg-gradient-to-b from-amber-500/15 via-card to-card border-2 border-amber-500/40 shadow-xl space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-600 flex items-center justify-center font-black text-xl">
                  🥇
                </div>
                <div>
                  <Badge variant="gold" size="sm">
                    National Champion
                  </Badge>
                  <h3 className="text-xl font-black text-foreground mt-2">1st Place</h3>
                </div>
                <div className="text-2xl font-black text-amber-600 dark:text-amber-400 font-mono">
                  BDT 50,000
                </div>
                <ul className="text-xs text-muted-foreground space-y-2">
                  <li className="flex items-center gap-2">
                    <Laptop className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Brand New Laptop Device</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Plane className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Agricultural Research Center Tour</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Trophy className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Gold Trophy & Certificate</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Gift className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Official Exclusive Gift Box</span>
                  </li>
                </ul>
              </div>

              <Link href="/apply">
                <Button variant="primary" size="sm" className="w-full text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-950">
                  Compete for Champion
                </Button>
              </Link>
            </div>

            {/* 2nd Prize */}
            <div className="p-6 rounded-3xl bg-card border-2 border-slate-300 dark:border-slate-700 shadow-md space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center font-black text-xl">
                  🥈
                </div>
                <div>
                  <Badge variant="outline" size="sm">
                    1st Runner-Up
                  </Badge>
                  <h3 className="text-xl font-black text-foreground mt-2">2nd Place</h3>
                </div>
                <div className="text-2xl font-black text-slate-800 dark:text-slate-200 font-mono">
                  BDT 30,000
                </div>
                <ul className="text-xs text-muted-foreground space-y-2">
                  <li className="flex items-center gap-2">
                    <BookMarked className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                    <span>E-Book Digital Reader</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Plane className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                    <span>Agricultural Research Center Tour</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Trophy className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                    <span>Silver Trophy & Certificate</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Gift className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                    <span>Official Exclusive Gift Box</span>
                  </li>
                </ul>
              </div>

              <Link href="/apply">
                <Button variant="outline" size="sm" className="w-full text-xs font-bold">
                  Register Now
                </Button>
              </Link>
            </div>

            {/* 3rd Prize */}
            <div className="p-6 rounded-3xl bg-card border-2 border-amber-600/30 shadow-md space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-700/10 text-amber-700 flex items-center justify-center font-black text-xl">
                  🥉
                </div>
                <div>
                  <Badge variant="outline" size="sm">
                    2nd Runner-Up
                  </Badge>
                  <h3 className="text-xl font-black text-foreground mt-2">3rd Place</h3>
                </div>
                <div className="text-2xl font-black text-amber-700 dark:text-amber-500 font-mono">
                  BDT 20,000
                </div>
                <ul className="text-xs text-muted-foreground space-y-2">
                  <li className="flex items-center gap-2">
                    <Smartphone className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span>Android Smartphone</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Plane className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span>Agricultural Research Center Tour</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Trophy className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span>Bronze Trophy & Certificate</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Gift className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span>Official Exclusive Gift Box</span>
                  </li>
                </ul>
              </div>

              <Link href="/apply">
                <Button variant="outline" size="sm" className="w-full text-xs font-bold">
                  Register Now
                </Button>
              </Link>
            </div>

            {/* Top 10 Finalists */}
            <div className="p-6 rounded-3xl bg-card border border-border shadow-md space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-black text-xl">
                  🎖️
                </div>
                <div>
                  <Badge variant="outline" size="sm">
                    Top 10 Finalists
                  </Badge>
                  <h3 className="text-xl font-black text-foreground mt-2">4th – 10th Place</h3>
                </div>
                <div className="text-base font-bold text-emerald-600 font-mono">
                  Honors & Fellowships
                </div>
                <ul className="text-xs text-muted-foreground space-y-2">
                  <li className="flex items-center gap-2">
                    <Plane className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Exclusive Research Center Tour</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Award className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>National Finalist Medal</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Verified E-Certificate</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Gift className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Official Gift Hamper</span>
                  </li>
                </ul>
              </div>

              <Link href="/apply">
                <Button variant="outline" size="sm" className="w-full text-xs font-bold">
                  Join Competition
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ================= 5. OLYMPIAD CATEGORIES (HopeNest Causes Layout) ================= */}
        <section className="py-16 px-6 max-w-7xl mx-auto w-full" id="categories">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
              Academic Tracks
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              {lang === "en" ? "Structured Competition Categories" : "অলিম্পিয়াড প্রতিযোগিতা ক্যাটাগরি"}
            </h2>
            <p className="text-sm text-muted-foreground font-bangla">
              ৬ষ্ঠ শ্রেণি থেকে শুরু করে উচ্চ মাধ্যমিক ও বিশ্ববিদ্যালয় পর্যায় পর্যন্ত সুনির্দিষ্ট সিলেবাস ও মূল্যায়ন পদ্ধতি
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Category 1 */}
            <div className="p-6 rounded-3xl bg-card border border-border hover:border-emerald-500/50 hover:shadow-xl transition-all space-y-4 group">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  Tier 01
                </span>
                <span className="font-mono font-bold text-xs bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 px-2.5 py-1 rounded-md border border-emerald-500/20">
                  Fee: BDT 70.00
                </span>
              </div>
              <h3 className="text-xl font-bold text-foreground group-hover:text-emerald-600 transition-colors">
                {lang === "en" ? "Junior Category" : "জুনিয়র শ্রেণি"}
              </h3>
              <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 font-bangla">
                ৬ষ্ঠ থেকে ৮ম শ্রেণি
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Fundamental agricultural concepts, seed germination, basic soil science, photosynthesis, and urban rooftop micro-gardening.
              </p>
              <div className="pt-2 border-t border-border flex items-center justify-between">
                <Link href="/apply?category=JUNIOR" className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1">
                  <span>Register Tier</span> <ChevronRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-[11px] text-muted-foreground">National Preliminary</span>
              </div>
            </div>

            {/* Category 2 */}
            <div className="p-6 rounded-3xl bg-card border-2 border-emerald-500/40 hover:border-emerald-500 hover:shadow-xl transition-all space-y-4 group">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  Tier 02 · Most Popular
                </span>
                <span className="font-mono font-bold text-xs bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 px-2.5 py-1 rounded-md border border-emerald-500/20">
                  Fee: BDT 70.00
                </span>
              </div>
              <h3 className="text-xl font-bold text-foreground group-hover:text-emerald-600 transition-colors">
                {lang === "en" ? "Secondary Category" : "মাধ্যমিক শ্রেণি"}
              </h3>
              <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 font-bangla">
                ৯ম ও ১০ম শ্রেণি এবং এসএসসি পরীক্ষার্থী
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Agronomy, climate-smart farming, organic fertilizer production, salinity management, and integrated pest control ecosystems.
              </p>
              <div className="pt-2 border-t border-border flex items-center justify-between">
                <Link href="/apply?category=SECONDARY" className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1">
                  <span>Register Tier</span> <ChevronRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-[11px] text-muted-foreground">Regional Rounds</span>
              </div>
            </div>

            {/* Category 3 */}
            <div className="p-6 rounded-3xl bg-card border border-border hover:border-emerald-500/50 hover:shadow-xl transition-all space-y-4 group">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  Tier 03
                </span>
                <span className="font-mono font-bold text-xs bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 px-2.5 py-1 rounded-md border border-emerald-500/20">
                  Fee: BDT 70.00
                </span>
              </div>
              <h3 className="text-xl font-bold text-foreground group-hover:text-emerald-600 transition-colors">
                {lang === "en" ? "Higher Secondary" : "উচ্চ মাধ্যমিক শ্রেণি"}
              </h3>
              <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 font-bangla">
                ১১শ ও ১২শ শ্রেণি এবং এইচএসসি পরীক্ষার্থী
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Crop genetics, tissue culture, hydroponic automation, post-harvest technology, agribusiness, and national food security policies.
              </p>
              <div className="pt-2 border-t border-border flex items-center justify-between">
                <Link href="/apply?category=HIGHER_SECONDARY" className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1">
                  <span>Register Tier</span> <ChevronRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-[11px] text-muted-foreground">National Finale at BAU</span>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 6. INTERACTIVE 64-DISTRICT NATIONAL ATLAS ================= */}
        <section className="py-16 px-6 max-w-7xl mx-auto w-full" id="atlas">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" />
              Nationwide Chapter Network
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              64-District Olympiad Coordination Atlas
            </h2>
            <p className="text-sm text-muted-foreground font-bangla">
              বাংলাদেশের প্রতিটি বিভাগে আঞ্চলিক সমন্বয়ক ও ক্যাম্পাস চ্যাপ্টারের মাধ্যমে কার্যক্রম পরিচালিত হয়
            </p>
          </div>

          <BangladeshBranchAtlas />
        </section>

        {/* ================= 7. HOPE-NEST VOLUNTEER AMBASSADOR BANNER ================= */}
        <section className="py-16 px-6 max-w-7xl mx-auto w-full">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-emerald-800 to-teal-900 text-white shadow-2xl relative overflow-hidden">
            <div className="max-w-2xl space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-300 font-mono">
                Youth Ambassador Fellowship
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Become a Campus Lead for National Agricultural Olympiad 2025
              </h2>
              <p className="text-sm text-emerald-100/90 leading-relaxed">
                Are you a passionate student at an agricultural university, college, or school? Lead the Olympiad movement in your campus, organize preliminary workshops, and receive official credentials & research mentoring.
              </p>
              <div className="pt-4 flex flex-wrap gap-3">
                <Link href="/apply">
                  <Button variant="primary" size="md" className="gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-lg">
                    <span>Apply for Ambassador Pass</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" size="md" className="text-xs font-semibold text-white border-white/30 hover:bg-white/10">
                    Learn More About Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 8. Statutory Merchant Footer */}
      <InstitutionalFooter lang={lang} />
    </div>
  );
}
