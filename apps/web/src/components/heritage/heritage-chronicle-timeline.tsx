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
    year: "2018 (July)",
    period: "The Historic Student Uprising",
    periodBn: "ঐতিহাসিক নিরাপদ সড়ক আন্দোলন ২০১৮",
    title: "Birth of the Movement: Students Take to the Streets",
    titleBn: "শিক্ষার্থীদের স্বতঃস্ফূর্ত জাগরণ ও ৯ দফা গণদাবি",
    narrative:
      "Following the tragic loss of students Diya and Rajib on Airport Road in Dhaka, school and college students took to the streets in an unprecedented peaceful movement. Students checked driving licenses, enforced designated emergency lanes, and united the nation around a singular call: 'We Want Justice, We Want Safe Roads'.",
    narrativeBn:
      "২০১৮ সালের জুলাই মাসে বিমানবন্দর সড়কে দুই শিক্ষার্থীর মর্মান্তিক মৃত্যুর পর স্কুল-কলেজের সাধারণ শিক্ষার্থীরা রাস্তায় নেমে আসে। সুশৃঙ্খল ট্রাফিক নিয়ন্ত্রণ, জরুরি লেন তৈরি এবং 'উই ওয়ান্ট জাস্টিস' স্লোগানে পুরো জাতিকে পথ দেখায় তরুণ প্রজন্ম।",
    historicalSignificance: "Formation of the core student volunteer brigades that evolved into the Road Safety Movement.",
    significanceBn: "শিক্ষার্থী আন্দোলনের ভিত্তি থেকে একটি প্রাতিষ্ঠানিক নাগরিক প্ল্যাটফর্মের রূপলাভ।",
    accentColor: "from-amber-600 to-red-600",
  },
  {
    year: "2018 (Sept)",
    period: "Legislative Reform",
    periodBn: "আইন প্রণয়ন ও সাংবিধানিক দাবি",
    title: "Enactment of the Road Transport Act 2018",
    titleBn: "সড়ক পরিবহন আইন ২০১৮ প্রণয়ন ও ৯ দফা সনদ",
    narrative:
      "In response to the youth mobilization, the national parliament passed the long-awaited Road Transport Act 2018 with elevated penalties for reckless driving, stringent vehicle fitness mandates, and institutional oversight.",
    narrativeBn:
      "শিক্ষার্থী ও নাগরিক সমাজের সম্মিলিত দাবির মুখে মহান জাতীয় সংসদে বহু প্রতীক্ষিত 'সড়ক পরিবহন আইন ২০১৮' পাস হয়, যা চালকের যোগ্যতা ও ফিটনেস সংক্রান্ত কড়াকড়ি নিশ্চিত করে।",
    historicalSignificance: "Official statutory baseline anchoring road accountability in Bangladesh transport law.",
    significanceBn: "সড়কে নাগরিক অধিকারের প্রথম সমন্বিত আইনি স্বীকৃতি।",
    accentColor: "from-blue-600 to-indigo-600",
  },
  {
    year: "2020",
    period: "Scientific Blackspot Audit",
    periodBn: "কালো স্থান ম্যাপিং ও গবেষণা কার্যক্রম",
    title: "Nationwide Highway Crash Registry & 420+ Blackspot Demarcation",
    titleBn: "জাতীয় হাইওয়ে ক্র্যাশ রেজিস্ট্রি ও ৪২০টি ব্ল্যাকস্পট চিহ্নিতকরণ",
    narrative:
      "Transitioning from protest to evidence-based science, the movement partnered with transport engineering researchers to survey national highways, pinpointing 420+ deadly blackspots with blind corners, absence of speed tables, and missing pedestrian footbridges.",
    narrativeBn:
      "প্রকৌশলী ও বিশেষজ্ঞদের সাথে যৌথ গবেষণায় দেশের জাতীয় মহাসড়কগুলোতে ৪২০টিরও বেশি ঝুঁকিপূর্ণ 'কালো স্থান' চিহ্নিত করে বৈজ্ঞানিক সমাধানের প্রস্তাবনা উপস্থাপন।",
    historicalSignificance: "Launch of Bangladesh's first civic-led open crash data repository.",
    significanceBn: "নাগরিক উদ্যোগে প্রথম উন্মুক্ত রোড ক্র্যাশ ডেটাবেজ প্রতিষ্ঠা।",
    accentColor: "from-emerald-600 to-teal-600",
  },
  {
    year: "2022",
    period: "National Safety Campaigns",
    periodBn: "সারাদেশে গণসচেতনতা কর্মসূচি",
    title: "National Helmet Enforcement, Speed Checks & Campus Desks",
    titleBn: "সার্বজনীন হেলমেট ব্যবহার ও স্কুল জোন নিরাপত্তা ক্যাম্পেইন",
    narrative:
      "Mobilized across 40+ districts with intensive campaigns targeting two-wheeler helmet compliance, pedestrian zebra crossing repainting, and establishment of dedicated road safety desks in schools and colleges.",
    narrativeBn:
      "মোটরসাইকেল আরোহীদের শতভাগ হেলমেট ব্যবহার, স্কুলের সামনে নিরাপদ স্পিড টেবিল স্থাপন এবং জেব্রা ক্রসিং সংস্কারে দেশব্যাপী প্রত্যক্ষ নাগরিক কর্মসূচি।",
    historicalSignificance: "Over 25,000 citizens directly trained in pedestrian safety and defensive habits.",
    significanceBn: "২৫,০০০-এর বেশি নাগরিক ও শিক্ষার্থীকে সরাসরি প্রশিক্ষণ প্রদান।",
    accentColor: "from-purple-600 to-pink-600",
  },
  {
    year: "2024",
    period: "Paradigm Shift Advocacy",
    periodBn: "'দুর্ঘটনা' নয়, 'রোড ক্র্যাশ' আন্দোলন",
    title: "Call for Terminology Shift: 'Road Crash' Not 'Accident'",
    titleBn: "সড়ক নিরাপত্তা নিশ্চিতকরণে 'দুর্ঘটনা' নয়, 'রোড ক্র্যাশ' শব্দ ব্যবহারের ডাক",
    narrative:
      "Launched the nationwide media and policy campaign establishing that crashes caused by negligence, overspeeding, or defective brakes are preventable crimes of neglect—not unavoidable 'accidents' (দৈব দুর্ঘটনা). This historic paradigm shift was embraced across national press councils.",
    narrativeBn:
      "বেপরোয়া গতি, ত্রুটিপূর্ণ যানবাহন ও ওভারটেকিং দৈব দুর্ঘটনা নয়—এটি প্রতিরোধযোগ্য মানবসৃষ্ট রোড ক্র্যাশ। দায়মুক্তির সংস্কৃতি দূর করতে গণমাধ্যম ও নীতিমালায় শব্দ পরিবর্তনের জোরালো আহ্বান।",
    historicalSignificance: "Adopted by leading media outlets, setting legal precedents for accountability.",
    significanceBn: "জাতীয় গণমাধ্যম ও আইনি সংস্কৃতিতে দায়বদ্ধতার স্থায়ী পরিবর্তন।",
    accentColor: "from-amber-600 to-emerald-600",
  },
  {
    year: "2026",
    period: "Digital Movement OS Era",
    periodBn: "ডিজিটাল প্ল্যাটফর্ম ও স্থায়ী ভিকটিম তহবিল",
    title: "9,010+ Volunteers, 82 Committees & Digital Movement OS",
    titleBn: "৮২টি কমিটি, ৯,০১০+ স্বেচ্ছাসেবী এবং ডিজিটাল অর্গানাইজেশন প্ল্যাটফর্ম",
    narrative:
      "Today, Road Safety Movement operates as Bangladesh's largest structured road advocacy body, uniting 9,010+ registered youth volunteers, 82 active regional/campus committees, and a 24/7 crash victim legal relief and emergency fund.",
    narrativeBn:
      "একটি সংগঠিত পেশাদার ও স্বেচ্ছাসেবী প্রতিষ্ঠান হিসেবে বর্তমানে দেশের ৬৪ জেলায় ৮২টি কমিটি, ৯,০১০+ সক্রিয় তরুণ নেতৃত্ব এবং ক্র্যাশ ভিকটিমদের জন্য জরুরি আইনি ও পুনর্বাসন সহায়তা কার্যক্রম চলমান।",
    historicalSignificance: "A self-sustaining, youth-driven institutional force for human dignity and safe transit.",
    significanceBn: "নিরাপদ, টেকসই ও মানবিক সড়ক যোগাযোগ ব্যবস্থার টেকসই আন্দোলন।",
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
                RSM-CHRONICLE-{activeMilestone.year.slice(0, 4)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
