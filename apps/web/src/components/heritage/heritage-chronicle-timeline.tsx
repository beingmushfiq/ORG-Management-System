"use client";

import React, { useState } from "react";
import {
  Clock,
  Award,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@org/ui";

interface HeritageMilestone {
  year: string;
  title: string;
  titleBn: string;
  period: string;
  periodBn: string;
  narrative: string;
  narrativeBn: string;
  historicalSignificance: string;
  significanceBn: string;
  accentColor: string;
}

const MILESTONES: HeritageMilestone[] = [
  {
    year: "1952",
    period: "Language Movement & Foundation",
    periodBn: "ভাষা আন্দোলন ও প্রতিষ্ঠা লগ্ন",
    title: "Birth of the Medical Association & Martyr Physicians' Legacy",
    titleBn: "মেডিকেল এসোসিয়েশনের সূচনা ও ভাষা শহীদ চিকিৎসকদের আত্মত্যাগ",
    narrative:
      "Formed by patriotic physicians during the historic 1952 Language Movement in Dhaka. Doctors opened emergency casualty wards at Dhaka Medical College to treat wounded student demonstrators, forever embedding humanitarian courage into our charter.",
    narrativeBn:
      "১৯৫২ সালের ঐতিহাসিক ভাষা আন্দোলনের উত্তাল দিনগুলোতে দেশপ্রেমিক চিকিৎসকদের উদ্যোগে সংগঠনের সূচনা। ঢাকা মেডিকেল কলেজে আহত ভাষাসৈনিকদের জরুরি চিকিৎসাসেবা প্রদানের মধ্য দিয়ে মানবতার সেবায় আত্মোৎসর্গের যে শপথ গৃহীত হয়, তা আজও আমাদের মূল চালিকাশক্তি।",
    historicalSignificance: "Official Charter inscribed with permanent commitment to free healthcare in national crises.",
    significanceBn: "জাতীয় দুর্যোগ ও সংকটে বিনামূল্যে জরুরি চিকিৎসাসেবা প্রদানের সাংবিধানিক অঙ্গীকার।",
    accentColor: "from-red-900 to-amber-900",
  },
  {
    year: "1971",
    period: "War of Liberation",
    periodBn: "মহান মুক্তিযুদ্ধ",
    title: "Valiant Physicians of Sector 2 & Field Hospitals",
    titleBn: "মুক্তিযুদ্ধের রণাঙ্গন ও বাংলাদেশ ফিল্ড হাসপাতাল",
    narrative:
      "During the 1971 Liberation War, member surgeons, nurses, and medical students established the historic 'Bangladesh Field Hospital' in Agartala under Sector 2, performing over 3,000 surgical procedures on wounded Freedom Fighters.",
    narrativeBn:
      "১৯৭১ সালের মহান মুক্তিযুদ্ধে সংগঠনের চিকিৎসকবৃন্দ ২ নম্বর সেক্টরের অধীনে আগরতলার মেলাঘরে ঐতিহাসিক 'বাংলাদেশ ফিল্ড হাসপাতাল' গড়ে তোলেন এবং সহস্রাধিক যুদ্ধাহত বীর মুক্তিযোদ্ধাদের জীবন রক্ষা করেন।",
    historicalSignificance: "Conferment of National Independence Award in recognition of supreme wartime medical valor.",
    significanceBn: "স্বাধীনতা যুদ্ধে অবিস্মরণীয় অবদান ও আত্মত্যাগের স্বীকৃতি।",
    accentColor: "from-emerald-950 to-teal-900",
  },
  {
    year: "1982",
    period: "National Health Reform",
    periodBn: "জাতীয় ওষুধ নীতি প্রণয়ন",
    title: "Pioneering the National Drug Policy & Essential Medicines Roster",
    titleBn: "জাতীয় ওষুধ নীতি প্রণয়নে ঐতিহাসিক ভূমিকা",
    narrative:
      "Spearheaded the formulation of Bangladesh's historic 1982 National Drug Policy, restricting multinational monopolistic imports and nurturing the domestic pharmaceutical industry into an affordable lifeline for millions.",
    narrativeBn:
      "১৯৮২ সালের ঐতিহাসিক জাতীয় ওষুধ নীতি প্রণয়নে অগ্রণী ভূমিকা পালন, যার মাধ্যমে অপ্রয়োজনীয় বিদেশি ওষুধের আমদানি রোধ করে দেশীয় ওষুধ শিল্প ও সুলভ মূল্যে অত্যাবশ্যকীয় ওষুধপ্রাপ্তি নিশ্চিত হয়।",
    historicalSignificance: "WHO praised Bangladesh's policy as a global model for developing countries.",
    significanceBn: "বিশ্ব স্বাস্থ্য সংস্থা কর্তৃক উন্নয়নশীল বিশ্বের জন্য একটি আদর্শ মডেল হিসেবে স্বীকৃতি।",
    accentColor: "from-blue-950 to-indigo-900",
  },
  {
    year: "2002",
    period: "Golden Jubilee",
    periodBn: "সুবর্ণ জয়ন্তী সমাবর্তন",
    title: "Golden Jubilee Grand Convocation & Fellowship Consecration",
    titleBn: "সুবর্ণ জয়ন্তী মহাসমাবেশ ও আজীবন সম্মাননা",
    narrative:
      "Celebrated 50 years of uninterrupted institutional service at the National Parliament concourse, conferring Lifetime Fellowships to pioneer professors of medicine, surgery, and public health epidemiology.",
    narrativeBn:
      "জাতীয় সংসদের সম্মুখে অনুষ্ঠিত সুবর্ণ জয়ন্তী মহাসমাবেশে ৫০ বছরের ঐতিহ্য উদযাপন এবং দেশের প্রথিতযশা পথিকৃৎ চিকিৎসাবিজ্ঞানীদের সম্মানসূচক ফেলোশিপ প্রদান।",
    historicalSignificance: "Permanent establishment of the BMA Benevolent Trust for deceased physicians' families.",
    significanceBn: "প্রয়াত চিকিৎসকদের পরিবার ও সন্তানদের স্থায়ী সহায়তায় কল্যাণ ট্রাস্ট প্রতিষ্ঠা।",
    accentColor: "from-amber-950 to-yellow-900",
  },
  {
    year: "2026",
    period: "Digital Cloud Governance",
    periodBn: "ডিজিটাল ক্লাউড রূপান্তর",
    title: "Centennial-Ready SaaS Infrastructure & Societies Act XXI Compliance",
    titleBn: "১৮৬০ সালের আইন অনুযায়ী শতভাগ স্বচ্ছ ডিজিটাল প্রশাসনিক রূপান্তর",
    narrative:
      "Complete transformation of all 64 district branches onto an institutional multi-tenant cloud platform featuring zero-float integer paisa ledgers, holographic digital passes, and instant statutory government register generation.",
    narrativeBn:
      "১৮৬০ সালের সোসাইটিজ অ্যাক্ট অনুযায়ী ৬৪ জেলা শাখার সম্পূর্ণ স্বচ্ছ ও ডিজিটাল রূপান্তর, হলোগ্রাফিক স্মার্ট সদস্য কার্ড, এবং তাৎক্ষণিক অডিট রেজিস্টার প্রস্তুতকরণ।",
    historicalSignificance: "First institutional body in South Asia to implement cryptographic tamper-evident governance.",
    significanceBn: "দক্ষিণ এশিয়ার প্রথম পূর্ণাঙ্গ ক্রিপ্টোগ্রাফিক ও পেসা লেজার ভিত্তিক প্রাতিষ্ঠানিক ডিজিটাল গভর্ন্যান্স।",
    accentColor: "from-slate-900 to-amber-950",
  },
];

export function HeritageChronicleTimeline() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const activeMilestone = MILESTONES[currentIndex]!;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : MILESTONES.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < MILESTONES.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="w-full bg-slate-950/80 border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden relative">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-2">
            <Clock className="w-3.5 h-3.5" />
            Heritage & Living Legacy (1952–2026)
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-white tracking-tight">
            Chronicle of Service, Sacrifice & Leadership
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            From the blood-soaked corridors of 1952 to the frontlines of 1971 and modern digital cloud governance, explore our defining historic moments.
          </p>
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-white hover:border-amber-400 flex items-center justify-center transition-colors"
            title="Previous Milestone"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 flex items-center justify-center transition-colors shadow-lg shadow-amber-500/20"
            title="Next Milestone"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Scrubber Timeline Bar */}
      <div className="grid grid-cols-5 gap-2 mb-8">
        {MILESTONES.map((m, idx) => (
          <button
            key={m.year}
            onClick={() => setCurrentIndex(idx)}
            className={`py-3 px-2 rounded-xl text-center border transition-all ${
              idx === currentIndex
                ? "bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-lg shadow-amber-500/20"
                : "bg-slate-900/60 border-white/10 text-slate-400 hover:text-white hover:border-white/20"
            }`}
          >
            <div className="text-sm sm:text-base font-serif font-black">{m.year}</div>
            <div className="text-[10px] truncate hidden sm:block opacity-90">{m.period}</div>
          </button>
        ))}
      </div>

      {/* Featured Milestone Card */}
      <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
        <div
          className={`bg-gradient-to-r ${activeMilestone.accentColor} p-8 sm:p-12 transition-all duration-500 relative`}
        >
          <div className="relative z-10 max-w-4xl space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="bg-black/50 text-amber-300 border border-amber-500/30 text-xs font-bold backdrop-blur-md">
                {activeMilestone.period} • {activeMilestone.year}
              </Badge>
              <span className="text-xs text-slate-300 font-bangla">{activeMilestone.periodBn}</span>
            </div>

            <h4 className="text-2xl sm:text-4xl font-extrabold font-serif text-white leading-tight">
              {activeMilestone.title}
            </h4>
            <div className="text-sm sm:text-base font-bangla text-amber-200/90 font-medium">
              {activeMilestone.titleBn}
            </div>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed pt-2">
              {activeMilestone.narrative}
            </p>
            <p className="text-xs sm:text-sm font-bangla text-slate-300 leading-relaxed">
              {activeMilestone.narrativeBn}
            </p>

            <div className="pt-4 border-t border-white/10 flex items-start gap-2.5 text-xs text-amber-300 font-medium">
              <Award className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong>Historical Impact: </strong>
                {activeMilestone.historicalSignificance}
              </span>
            </div>
          </div>

          {/* Archival Parchment Texture Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none opacity-40" />
        </div>
      </div>
    </div>
  );
}
