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
  Car,
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
    nameEn: "Central Executive Secretariat",
    nameBn: "কেন্দ্রীয় কার্যনির্বাহী সচিবালয়",
    convener: "Engr. Tanvir Ahmed",
    convenerTitle: "President & 2018 Student Movement Organizer",
    memberCount: 21,
    mandate: "Apex national governing council overseeing all 82 district and campus committees across Bangladesh.",
    mandateBn: "সমগ্র দেশের ৮২টি জেলা ও ক্যাম্পাস চ্যাপ্টার পরিচালনা এবং জাতীয় নীতিনির্ধারণের শীর্ষ পরিষদ।",
    icon: Shield,
    accentColor: "from-amber-600 to-yellow-600",
    contactEmail: "secretariat@roadsafetymovement.org",
  },
  {
    id: "legal-advocacy",
    rank: 2,
    nameEn: "Policy Advocacy & Transport Law Reform Wing",
    nameBn: "আইনগত সংস্কার ও নীতিগত দাবি সেল",
    convener: "Adv. Fahmida Sultana",
    convenerTitle: "Supreme Court Advocate & Legal Counsel",
    memberCount: 14,
    mandate: "Advocating for strict enforcement of the Road Transport Act 2018, driver licensing integrity, and demanding use of 'Road Crash' instead of 'Accident'.",
    mandateBn: "সড়ক পরিবহন আইন ২০১৮ কঠোর বাস্তবায়ন, জবাবদিহিতা নিশ্চিতকরণ এবং 'দুর্ঘটনা'র বদলে 'রোড ক্র্যাশ' শব্দ প্রচলনে আইনি কার্যক্রম।",
    icon: Scale,
    accentColor: "from-blue-600 to-indigo-600",
    contactEmail: "legal@roadsafetymovement.org",
  },
  {
    id: "research-audit",
    rank: 3,
    nameEn: "Crash Research, Blackspot Mapping & Data Cell",
    nameBn: "গবেষণা, কালো স্থান চিহ্নিতকরণ ও রোড ক্র্যাশ অডিট সেল",
    convener: "Dr. Kazi Mostafa Kamal",
    convenerTitle: "Senior Transport Data Scientist, BUET Lead",
    memberCount: 16,
    mandate: "Conducting scientific road audits, geometric highway surveys, pedestrian blackspot demarcation, and publishing the Annual Crash Almanac.",
    mandateBn: "বিজ্ঞানসম্মত হাইওয়ে অডিট, বিপজ্জনক ব্লাইন্ড স্পট ম্যাপিং এবং বার্ষিক রোড ক্র্যাশ পরিসংখ্যান প্রকাশ।",
    icon: BookOpen,
    accentColor: "from-emerald-600 to-teal-600",
    contactEmail: "research@roadsafetymovement.org",
  },
  {
    id: "victim-support",
    rank: 4,
    nameEn: "Victim Relief & Legal Rehabilitation Fund",
    nameBn: "রোড ক্র্যাশ ভিকটিম পুনর্বাসন ও আইনি সহায়তা তহবিল",
    convener: "Prof. Dr. Zahidul Haque",
    convenerTitle: "Director of Humanitarian Operations",
    memberCount: 18,
    mandate: "Emergency medical financial assistance, free litigation support for crash survivor families, and prosthetic rehabilitation pathways.",
    mandateBn: "ক্র্যাশে ক্ষতিগ্রস্ত পরিবারগুলোর জরুরি চিকিৎসাসেবা, আইনি সহায়তা প্রদান এবং স্থায়ী পুনর্বাসন তহবিল পরিচালনা।",
    icon: Heart,
    accentColor: "from-red-600 to-rose-600",
    contactEmail: "victimsupport@roadsafetymovement.org",
  },
  {
    id: "campus-chapters",
    rank: 5,
    nameEn: "Campus Chapters & Youth Action Directorate",
    nameBn: "ক্যাম্পাস চ্যাপ্টার ও তরুণ নেতৃত্ব পর্ষদ",
    convener: "Shariful Islam",
    convenerTitle: "National Youth Mobilization Lead (DU Chapter)",
    memberCount: 32,
    mandate: "Directing 9,010+ volunteer students across universities, colleges, and schools for campus traffic safety desks and zebra crossing campaigns.",
    mandateBn: "দেশের পাবলিক-প্রাইভেট বিশ্ববিদ্যালয় এবং কলেজ সমূহে ৯,০১০+ শিক্ষার্থী স্বেচ্ছাসেবী নেটওয়ার্ক সমন্বয়।",
    icon: GraduationCap,
    accentColor: "from-purple-600 to-violet-600",
    contactEmail: "youth@roadsafetymovement.org",
  },
  {
    id: "driver-training",
    rank: 6,
    nameEn: "Driver Education & Defensive Road Academy",
    nameBn: "ড্রাইভার প্রশিক্ষণ ও নিরাপদ সড়ক একাডেমি",
    convener: "Capt. (Retd.) Mahfuzur Rahman",
    convenerTitle: "Director of Fleet Safety Standards",
    memberCount: 15,
    mandate: "Professional defensive driving courses for commercial bus and freight drivers, road sign mastery, and speed limiter training.",
    mandateBn: "পেশাদার দূরপাল্লার বাস ও ট্রাক চালকদের ডিফেন্সিভ ড্রাইভিং প্রশিক্ষণ এবং পথচারী সুরক্ষাবিধি সচেতনতা কর্মশালা।",
    icon: Car,
    accentColor: "from-cyan-600 to-blue-600",
    contactEmail: "training@roadsafetymovement.org",
  },
  {
    id: "media-relations",
    rank: 7,
    nameEn: "Public Media, Press & Campaign Directorate",
    nameBn: "গণমাধ্যম, প্রেস ও জাতীয় প্রচারণা সেল",
    convener: "Syeda Nabila Hossain",
    convenerTitle: "Chief Communications Officer",
    memberCount: 12,
    mandate: "Media briefings, investigative journalism fellowships on road corruption, national TV PSAs, and social media road safety movements.",
    mandateBn: "সড়ক অব্যবস্থাপনা নিয়ে গণমাধ্যম ক্যাম্পেইন, অনুসন্ধানী সাংবাদিকতা এবং জাতীয় জনসচেতনতামূলক ক্যাম্পেইন।",
    icon: Megaphone,
    accentColor: "from-orange-600 to-amber-600",
    contactEmail: "media@roadsafetymovement.org",
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
