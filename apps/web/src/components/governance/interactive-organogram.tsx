"use client";

import React, { useState } from "react";
import {
  Shield,
  BookOpen,
  Heart,
  Scale,
  Building,
  GripVertical,
  CheckCircle2,
  GraduationCap,
  Megaphone,
  Sprout,
} from "lucide-react";
import { useToast } from "@org/ui";
import { soundEffects } from "@/lib/audio-effects";

export interface RSMCommittee {
  id: string;
  rank: number;
  nameEn: string;
  nameBn: string;
  convener: string;
  convenerTitle: string;
  memberCount: number;
  mandate: string;
  mandateBn: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  contactEmail: string;
}

const INITIAL_COMMITTEES: RSMCommittee[] = [
  {
    id: "exec-secretariat",
    rank: 1,
    nameEn: "National Organizing Secretariat (Uttara HQ)",
    nameBn: "জাতীয় সমন্বয় সচিবালয় (উত্তরা)",
    convener: "Prof. Dr. A. K. Azad",
    convenerTitle: "National Advisory Convener & VC, BAU",
    memberCount: 21,
    mandate: "Apex national governing council overseeing all 64 district chapters and university campuses across Bangladesh.",
    mandateBn: "সমগ্র দেশের ৬৪টি জেলা চ্যাপ্টার ও বিশ্ববিদ্যালয় সেল পরিচালনা এবং জাতীয় নীতিনির্ধারণের শীর্ষ পরিষদ।",
    icon: Shield,
    accentColor: "from-emerald-600 to-teal-700",
    contactEmail: "agriculturalolympiad@gmail.com",
  },
  {
    id: "academic-jury",
    rank: 2,
    nameEn: "Academic Jury & Olympiad Syllabus Council",
    nameBn: "অ্যাকাডেমিক জুরি ও পাঠ্যক্রম কাউন্সিল",
    convener: "Prof. Dr. Mahmudul Hasan",
    convenerTitle: "Senior Agricultural Scientist, BAU Mymensingh",
    memberCount: 16,
    mandate: "Formulating question banks, evaluation rubrics for Junior, Secondary, and Higher Secondary tracks, and presiding over the Grand Finale oral viva.",
    mandateBn: "জুনিয়র, মাধ্যমিক ও উচ্চ মাধ্যমিক ক্যাটাগরির প্রশ্ন প্রণয়ন, মূল্যায়ন এবং জাতীয় ফিনালের মৌখিক ভাইভা পরিচালনা।",
    icon: BookOpen,
    accentColor: "from-amber-600 to-yellow-600",
    contactEmail: "academic@agriculturalolympiad.com",
  },
  {
    id: "regional-coordination",
    rank: 3,
    nameEn: "Regional Qualifiers & 64-District Coordination Wing",
    nameBn: "আঞ্চলিক বাছাই ও ৬৪ জেলা সমন্বয় সেল",
    convener: "Dr. Kazi Mostafa Kamal",
    convenerTitle: "Director of Regional Operations & BARI Lead",
    memberCount: 24,
    mandate: "Supervising 8 division screening centers, venue logistics, exam invigilators, and district coordinator appointments.",
    mandateBn: "৮টি বিভাগীয় বাছাই পরীক্ষা কেন্দ্র পরিচালনা, ভেন্যু ব্যবস্থাপনা এবং ৬৪ জেলায় সমন্বয়ক নেটওয়ার্ক তদারকি।",
    icon: Building,
    accentColor: "from-blue-600 to-indigo-600",
    contactEmail: "regional@agriculturalolympiad.com",
  },
  {
    id: "innovation-incubation",
    rank: 4,
    nameEn: "Youth Smart-Agro Innovation & Incubation Cell",
    nameBn: "স্মার্ট এগ্রো-টেক উদ্ভাবন ও ইনকিউবেশন সেল",
    convener: "Dr. Nazma Haque",
    convenerTitle: "Lead Specialist, Precision Agro-Robotics Lab",
    memberCount: 18,
    mandate: "Mentoring student prototypes in hydroponics, IoT soil sensors, climate-resilient farming, and awarding seed grants.",
    mandateBn: "শিক্ষার্থীদের আধুনিক এগ্রো-প্রজেক্ট, হাইড্রোপনিক্স এবং আইওটি উদ্ভাবন মেন্টরিং ও সিড ফান্ডিং প্রদান।",
    icon: Sprout || Heart,
    accentColor: "from-green-600 to-emerald-600",
    contactEmail: "innovation@agriculturalolympiad.com",
  },
  {
    id: "campus-chapters",
    rank: 5,
    nameEn: "Agricultural Universities & Campus Chapters Directorate",
    nameBn: "কৃষি বিশ্ববিদ্যালয় ও ক্যাম্পাস চ্যাপ্টার পর্ষদ",
    convener: "Shariful Islam",
    convenerTitle: "Campus Ambassador Lead (BAU & BSMRAU)",
    memberCount: 32,
    mandate: "Uniting student volunteers and campus ambassadors across BAU, BSMRAU, SAU, PSTU, CVASU, RU, and CU.",
    mandateBn: "বাকৃবি, ইকরিমবি, সিকৃবি, পটুয়াখালী ও চট্টগ্রাম ভেটেরিনারি বিশ্ববিদ্যালয় সমূহে শিক্ষার্থী ক্যাম্পাস অ্যাম্বাসেডর সমন্বয়।",
    icon: GraduationCap,
    accentColor: "from-purple-600 to-violet-600",
    contactEmail: "campus@agriculturalolympiad.com",
  },
  {
    id: "statutory-treasury",
    rank: 6,
    nameEn: "Statutory Compliance & Treasury Bureau",
    nameBn: "সংবিধিবদ্ধ কমপ্লায়েন্স ও ট্রেজারি ব্যুরো",
    convener: "Adv. Fahmida Sultana",
    convenerTitle: "Legal Counsel & Chief Compliance Officer",
    memberCount: 12,
    mandate: "Maintaining Trade License 03247/2023-2025 compliance, audit registers, SSLCommerz financial reconciliation, and BDT disbursements.",
    mandateBn: "ট্রেড লাইসেন্স ০৩২৪৭/২০২৩-২০২৫ কমপ্লায়েন্স রক্ষা, অডিট হিসাব, গেটওয়ে সেটেলমেন্ট এবং বিডিটি আর্থিক সমন্বয়।",
    icon: Scale,
    accentColor: "from-rose-600 to-red-600",
    contactEmail: "compliance@agriculturalolympiad.com",
  },
  {
    id: "media-relations",
    rank: 7,
    nameEn: "Public Media, Press & Campaign Directorate",
    nameBn: "গণমাধ্যম, প্রেস ও জাতীয় প্রচারণা সেল",
    convener: "Syeda Nabila Hossain",
    convenerTitle: "Chief Communications Officer",
    memberCount: 12,
    mandate: "Media briefings, broadcast partnerships, agricultural journalism fellowships, and nationwide Olympiad publicity campaigns.",
    mandateBn: "কৃষি সাংবাদিকতা ফেলোশিপ, জাতীয় গণমাধ্যম প্রচার এবং অলিম্পিয়াড বিষয়ক তথ্য সম্প্রচার সেল।",
    icon: Megaphone,
    accentColor: "from-orange-600 to-amber-600",
    contactEmail: "media@agriculturalolympiad.com",
  },
];

export function InteractiveOrganogram() {
  const [committees, setCommittees] = useState<RSMCommittee[]>(INITIAL_COMMITTEES);
  const [selectedCommittee, setSelectedCommittee] = useState<RSMCommittee>(INITIAL_COMMITTEES[0]!);
  const [isReorderingMode, setIsReorderingMode] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const { success, info } = useToast();

  const handleSelect = (comm: RSMCommittee) => {
    soundEffects.playClick(640);
    setSelectedCommittee(comm);
  };

  // Drag and Drop Reordering Handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    if (!isReorderingMode) return;
    setDraggedIndex(index);
    soundEffects.playClick(440);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    if (!isReorderingMode) return;
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    if (!isReorderingMode || draggedIndex === null || draggedIndex === targetIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }
    e.preventDefault();

    const updated = [...committees];
    const [movedItem] = updated.splice(draggedIndex, 1);
    if (!movedItem) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }
    updated.splice(targetIndex, 0, movedItem);

    // Recalculate rank orders
    const reranked = updated.map((item, idx) => ({
      ...item,
      rank: idx + 1,
    }));

    setCommittees(reranked);
    soundEffects.playReorderDrop();
    success(
      "Organogram Rank Precedence Updated",
      `${movedItem.nameEn} shifted to Rank #${targetIndex + 1}. Live ratification applied.`
    );

    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  return (
    <div className="w-full space-y-8" id="organogram">
      {/* Header & Reorder Mode Toggle */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pb-4 border-b border-border">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Building className="w-3.5 h-3.5" />
            Institutional Governance & Leadership Architecture
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            National Executive Council & Standing Wings
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 font-bangla mt-1">
            নিরাপদ সড়ক আন্দোলনের জাতীয় নির্বাহী পরিষদ এবং স্থায়ী পরিচালক পর্ষদের দায়িত্ব ও কাঠামো
          </p>
        </div>

        {/* Drag-and-Drop Admin Mode Switch */}
        <button
          type="button"
          onClick={() => {
            soundEffects.playClick(isReorderingMode ? 480 : 750);
            const next = !isReorderingMode;
            setIsReorderingMode(next);
            if (next) {
              info("Council Reordering Mode Active", "Drag executive cards vertically to adjust committee precedence.");
            }
          }}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-sm ${
            isReorderingMode
              ? "bg-amber-500 text-slate-950 ring-2 ring-amber-400 animate-pulse"
              : "bg-card border border-border text-slate-700 dark:text-slate-200 hover:bg-muted"
          }`}
        >
          <GripVertical className="w-4 h-4" />
          <span>{isReorderingMode ? "Reordering Active (Drag Cards)" : "Council Admin: Reorder Ranks"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Committee Rank List (Drag-and-Drop Enabled) */}
        <div className="lg:col-span-6 space-y-3">
          {isReorderingMode && (
            <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs text-amber-700 dark:text-amber-400 font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              <span>Drag any committee card vertically to reorder institutional precedence.</span>
            </div>
          )}

          {committees.map((comm, idx) => {
            const isSelected = comm.id === selectedCommittee.id;
            const isDragging = draggedIndex === idx;
            const isTarget = dragOverIndex === idx;
            const Icon = comm.icon;

            return (
              <div
                key={comm.id}
                draggable={isReorderingMode}
                onDragStart={(e) => handleDragStart(e, idx)}
                onDragOver={(e) => handleDragOver(e, idx)}
                onDrop={(e) => handleDrop(e, idx)}
                onClick={() => handleSelect(comm)}
                className={`p-4 rounded-xl border transition-all select-none cursor-pointer flex items-center gap-4 ${
                  isDragging
                    ? "opacity-40 scale-95 border-dashed border-amber-500"
                    : isTarget
                    ? "border-amber-400 bg-amber-500/10 scale-[1.01]"
                    : isSelected
                    ? "border-amber-500 bg-card shadow-md ring-2 ring-amber-500/20"
                    : "border-border bg-card hover:border-slate-400 dark:hover:border-slate-600"
                }`}
              >
                {/* Drag Handle */}
                {isReorderingMode && (
                  <div className="cursor-grab text-slate-400 hover:text-amber-500" title="Drag to reorder">
                    <GripVertical className="w-5 h-5" />
                  </div>
                )}

                {/* Precedence Rank Badge */}
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center font-extrabold text-xs shrink-0 ${
                    isSelected
                      ? "bg-amber-500 text-slate-950 shadow-sm"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                  }`}
                >
                  #{comm.rank}
                </div>

                {/* Icon */}
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${comm.accentColor} flex items-center justify-center text-white shrink-0 shadow-sm`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white truncate">
                      {comm.nameEn}
                    </h4>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-bangla truncate mt-0.5">
                    {comm.nameBn}
                  </div>
                </div>

                <div className="text-right shrink-0 hidden sm:block">
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                    {comm.memberCount} Officers
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Selected Committee Detail Dossier */}
        <div className="lg:col-span-6 bg-card rounded-2xl border-2 border-border p-6 shadow-xl relative overflow-hidden">
          {/* Accent Line */}
          <div className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${selectedCommittee.accentColor}`} />

          <div className="flex items-start justify-between gap-4 mt-2">
            <div>
              <span className="px-2.5 py-0.5 rounded text-[11px] font-extrabold uppercase tracking-wide bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30">
                Official Standing Directorate · Rank #{selectedCommittee.rank}
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-2">
                {selectedCommittee.nameEn}
              </h3>
              <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 font-bangla mt-0.5">
                {selectedCommittee.nameBn}
              </p>
            </div>

            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center text-amber-400 border border-border shadow-md shrink-0">
              <selectedCommittee.icon className="w-6 h-6" />
            </div>
          </div>

          {/* Mandate & Mission */}
          <div className="my-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-border space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Standing Directorate Mandate:
            </div>
            <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
              {selectedCommittee.mandate}
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-bangla pt-1 border-t border-border/50">
              {selectedCommittee.mandateBn}
            </p>
          </div>

          {/* Convener & Leadership */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
            <div className="p-3.5 rounded-xl border border-border bg-card">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Director / Convener:
              </span>
              <span className="font-extrabold text-sm text-slate-900 dark:text-white block mt-0.5">
                {selectedCommittee.convener}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">
                {selectedCommittee.convenerTitle}
              </span>
            </div>

            <div className="p-3.5 rounded-xl border border-border bg-card">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Direct Contact & Inquiries:
              </span>
              <span className="font-mono font-bold text-xs text-amber-600 dark:text-amber-400 block mt-0.5">
                {selectedCommittee.contactEmail}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">
                Council Secretariat Liaison
              </span>
            </div>
          </div>

          {/* Ratification Badge */}
          <div className="flex items-center justify-between pt-4 border-t border-border text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Charter Ratified by National Assembly</span>
            </div>
            <span className="font-mono font-bold">Term 2026-2028</span>
          </div>
        </div>
      </div>
    </div>
  );
}
