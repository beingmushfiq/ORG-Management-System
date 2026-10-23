"use client";

import React, { useState } from "react";
import {
  Clock,
  Award,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { soundEffects } from "@/lib/audio-effects";

interface HeritageMilestone {
  year: string;
  period: string;
  periodBn: string;
  title: string;
  titleBn: string;
  narrative: string;
  narrativeBn: string;
  historicalSignificance: string;
  significanceBn: string;
  accentColor: string;
}

const MILESTONES: HeritageMilestone[] = [
  {
    year: "2023 (Founding)",
    period: "Conception & Academic Coalition",
    periodBn: "উদ্যোগ গ্রহণ ও অ্যাকাডেমিক সূচনা",
    title: "Conception at BAU: Inspiring Youth in Modern Agriculture",
    titleBn: "বাকৃবিতে সূচনা: কৃষি শিক্ষায় তরুণ প্রজন্মকে অনুপ্রাণিত করার মহতী উদ্যোগ",
    narrative:
      "Recognizing the critical need to engage school and college students in food security, agricultural science, and climate-resilience, university faculty and scientists at Bangladesh Agricultural University (BAU) Mymensingh laid the foundations for the National Agricultural Olympiad.",
    narrativeBn:
      "জলবায়ু পরিবর্তন মোকাবিলা ও খাদ্য সুরক্ষায় শিক্ষার্থীদের আধুনিক কৃষির প্রতি আগ্রহী করতে বাংলাদেশ কৃষি বিশ্ববিদ্যালয়ের (বাকৃবি) শিক্ষক ও বিজ্ঞানীদের উদ্যোগে জাতীয় কৃষি অলিম্পিয়াডের যাত্রা শুরু হয়।",
    historicalSignificance: "Formation of Bangladesh's premier youth agricultural science competition network.",
    significanceBn: "দেশের প্রথম সমন্বিত জাতীয় যুব কৃষিবিজ্ঞান অলিম্পিয়াড নেটওয়ার্ক প্রতিষ্ঠা।",
    accentColor: "from-emerald-600 to-teal-700",
  },
  {
    year: "2023 (Dec)",
    period: "Statutory Incorporation",
    periodBn: "সংবিধিবদ্ধ লাইসেন্স ও সচিবালয়",
    title: "Trade License Issuance & Uttara Secretariat Establishment",
    titleBn: "ট্রেড লাইসেন্স অর্জন ও উত্তরা কেন্দ্রীয় সচিবালয় প্রতিষ্ঠা",
    narrative:
      "Formally authorized and registered under Dhaka City Corporation with Trade License No. 03247/2023-2025. The permanent National Organizing Secretariat was inaugurated at House 04, Road 12/b, Sector 10, Uttara Model Town, Dhaka.",
    narrativeBn:
      "ঢাকা উত্তর সিটি কর্পোরেশন থেকে ট্রেড লাইসেন্স (০৩২৪৭/২০২৩-২০২৫) গ্রহণ এবং উত্তরা মডেল টাউনে স্থায়ী কেন্দ্রীয় সমন্বয় সচিবালয় স্থাপন।",
    historicalSignificance: "Official legal compliance baseline under Bangladesh regulations.",
    significanceBn: "সংবিধিবদ্ধ আইনি ও প্রাতিষ্ঠানিক স্বীকৃতির মাইলফলক।",
    accentColor: "from-amber-600 to-yellow-600",
  },
  {
    year: "2024",
    period: "Season 1 National Debut",
    periodBn: "১ম সিজন জাতীয় অভিষেক",
    title: "Season 1 National Olympiad: 15,000+ Enrolled & BAU Grand Finale",
    titleBn: "প্রথম জাতীয় অলিম্পিয়াড: ১৫,০০০+ শিক্ষার্থী ও বাকৃবিতে গ্র্যান্ড ফিনালে",
    narrative:
      "Successfully convened written preliminary tests across all 8 divisions. The Grand Finale was hosted at BAU Mymensingh where Champion trophies, laptops, and research tours to BARI and BRRI were awarded.",
    narrativeBn:
      "৮টি বিভাগে প্রাথমিক বাছাই এবং ময়মনসিংহের বাকৃবি অডিটোরিয়ামে প্রথম জাতীয় গ্র্যান্ড ফিনালে সম্পন্ন। বিজয়ীদের ল্যাপটপ, নগদ অর্থ ও গবেষণা সফর প্রদান।",
    historicalSignificance: "First nationwide agricultural olympiad with over 15,000 participating students.",
    significanceBn: "১৫,০০০-এর বেশি শিক্ষার্থীর প্রত্যক্ষ অংশগ্রহণে সফল অভিষেক।",
    accentColor: "from-blue-600 to-indigo-600",
  },
  {
    year: "2025",
    period: "Curriculum Expansion",
    periodBn: "সিলেবাস সম্প্রসারণ ও ৩টি ক্যাটাগরি",
    title: "Launch of Smart Agriculture, Hydroponics & Junior-Secondary Tracks",
    titleBn: "স্মার্ট এগ্রিকালচার, হাইড্রোপনিক্স ও ৩টি প্রাতিষ্ঠানিক ক্যাটাগরি প্রবর্তন",
    narrative:
      "Structured competitive tracks into Junior Class (Grades 6–8), Secondary Class (Grades 9–10), and Higher Secondary Class (Grades 11–12), integrating hands-on kits for soil testing and soilless vertical farming.",
    narrativeBn:
      "জুনিয়র (৬ষ্ঠ-৮ম), মাধ্যমিক (৯ম-১০ম) এবং উচ্চ মাধ্যমিক (১১শ-১২শ) স্তরে সিলেবাস পুনর্বিন্যাস এবং ব্যবহারিক স্মার্ট এগ্রো-ল্যাব কিট প্রদান।",
    historicalSignificance: "Integration of modern biotechnology, robotics, and climate science into student syllabi.",
    significanceBn: "শিক্ষার্থীদের পাঠ্যক্রমে আধুনিক জীবপ্রযুক্তি ও রোবোটিক্স কৃষির অন্তর্ভুক্তি।",
    accentColor: "from-purple-600 to-violet-600",
  },
  {
    year: "2026",
    period: "Enterprise Platform Era",
    periodBn: "ডিজিটাল প্ল্যাটফর্ম ও ৬৪ জেলা নেটওয়ার্ক",
    title: "25,000+ Students, 64 Districts & DevCenterPoint SaaS Platform",
    titleBn: "২৫,০০০+ শিক্ষার্থী, ৬৪ জেলা নেটওয়ার্ক ও আধুনিক ডিজিটাল প্ল্যাটফর্ম",
    narrative:
      "Adopting the DevCenterPoint Institutional Operating System featuring integer-paisa financial ledger in BDT, SSLCommerz gateway integration, cryptographic E-Admit Cards, and edge CMS governance.",
    narrativeBn:
      "বিডিটি কারেন্সি, এসএসএলকমার্জ পেমেন্ট, কিউআর ভেরিফায়েড প্রবেশপত্র এবং ডিজিটাল সিএমএস সমৃদ্ধ আধুনিক প্রাতিষ্ঠানিক প্ল্যাটফর্ম রূপান্তর।",
    historicalSignificance: "Bangladesh's leading technology-powered youth agricultural platform.",
    significanceBn: "প্রযুক্তিভিত্তিক জাতীয় মেধা অন্বেষণে শীর্ষস্থানীয় প্রাতিষ্ঠানিক প্ল্যাটফর্ম।",
    accentColor: "from-emerald-600 to-sky-600",
  },
];

export function HeritageChronicleTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeMilestone: HeritageMilestone = MILESTONES[activeIndex] ?? MILESTONES[0]!;

  const handlePrev = () => {
    soundEffects.playClick(520);
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : MILESTONES.length - 1));
  };

  const handleNext = () => {
    soundEffects.playClick(680);
    setActiveIndex((prev) => (prev < MILESTONES.length - 1 ? prev + 1 : 0));
  };

  const handleSelect = (idx: number) => {
    soundEffects.playClick(600 + idx * 50);
    setActiveIndex(idx);
  };

  return (
    <div className="w-full space-y-8" id="heritage">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pb-4 border-b border-border">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Clock className="w-3.5 h-3.5" />
            Movement Chronicle · 2018 to 2026
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Heritage of the Safe Road Movement
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 font-bangla mt-1">
            ২০১৮ সালের শিক্ষার্থীদের নিরাপদ সড়ক আন্দোলন থেকে ২০২৬ সালের ডিজিটাল প্ল্যাটফর্ম পর্যন্ত ঐতিহাসিক রূপরেখা
          </p>
        </div>

        {/* Carousel Prev/Next Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrev}
            className="w-9 h-9 rounded-full border border-border bg-card hover:bg-muted flex items-center justify-center text-slate-700 dark:text-slate-300 transition-colors shadow-sm"
            aria-label="Previous Milestone"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="w-9 h-9 rounded-full border border-border bg-card hover:bg-muted flex items-center justify-center text-slate-700 dark:text-slate-300 transition-colors shadow-sm"
            aria-label="Next Milestone"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Milestone Tracker Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {MILESTONES.map((m, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelect(idx)}
              className={`p-3 rounded-xl border text-left transition-all ${
                isActive
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-950 border-amber-500 shadow-md ring-2 ring-amber-500/20"
                  : "bg-card border-border hover:border-slate-400 text-slate-600 dark:text-slate-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-extrabold font-mono ${isActive ? "text-amber-400 dark:text-amber-600" : "text-amber-600 dark:text-amber-400"}`}>
                  {m.year}
                </span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />}
              </div>
              <div className={`text-xs font-bold truncate mt-1 ${isActive ? "text-white dark:text-slate-900" : "text-slate-800 dark:text-slate-200"}`}>
                {m.period}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Milestone Spotlight Card */}
      <div className="bg-card rounded-2xl border-2 border-border p-6 sm:p-8 shadow-xl relative overflow-hidden">
        {/* Ambient Top Glow Line */}
        <div className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${activeMilestone.accentColor}`} />

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="flex-1 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-md text-xs font-black font-mono bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30">
                {activeMilestone.year}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {activeMilestone.period}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {activeMilestone.title}
            </h3>
            <h4 className="text-lg font-bold text-emerald-600 dark:text-emerald-400 font-bangla">
              {activeMilestone.titleBn}
            </h4>

            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              {activeMilestone.narrative}
            </p>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-bangla leading-relaxed p-4 rounded-xl bg-muted/60 border border-border">
              {activeMilestone.narrativeBn}
            </p>
          </div>

          <div className="lg:w-80 w-full space-y-4">
            {/* Historical Significance Box */}
            <div className="p-5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-border space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-amber-600 dark:text-amber-400">
                <Award className="w-4 h-4" />
                Historical Significance
              </div>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                {activeMilestone.historicalSignificance}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-bangla pt-2 border-t border-border/60">
                {activeMilestone.significanceBn}
              </p>
            </div>

            <div className="p-4 rounded-xl border border-dashed border-amber-500/40 bg-amber-500/5 text-center">
              <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
                Archival Record Verified
              </span>
              <span className="text-xs text-slate-600 dark:text-slate-300 font-mono mt-0.5 block">
                NAO-CHRONICLE-{activeMilestone.year.slice(0, 4)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
