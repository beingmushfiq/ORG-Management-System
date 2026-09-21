"use client";

import React, { useState } from "react";
import { Flower2, ArrowLeft } from "lucide-react";
import { Button, useToast } from "@org/ui";
import Link from "next/link";
import { OrgLogo } from "@/components/brand/org-logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { soundEffects } from "@/lib/audio-effects";

interface MemorialProfile {
  id: string;
  name: string;
  nameBn: string;
  lifeSpan: string;
  lifeSpanBn: string;
  designation: string;
  designationBn: string;
  specialty: string;
  branch: string;
  biography: string;
  biographyBn: string;
  tributesCount: number;
}

const MEMORIAL_ROSTER: MemorialProfile[] = [
  {
    id: "mem-01",
    name: "Diya Khanam Mim & Abdul Karim Rajib",
    nameBn: "দিয়া খানম মিম ও আব্দুল করিম রাজিব",
    lifeSpan: "1999 – 2018",
    lifeSpanBn: "১৯৯৯ – ২০১৮",
    designation: "Martyrs of the 2018 Students' Safe Road Movement",
    designationBn: "২০১৮ সালের ঐতিহাসিক নিরাপদ সড়ক আন্দোলনের প্রেরণা ও শহীদ শিক্ষার্থী",
    specialty: "Shaheed Ramiz Uddin Cantonment College",
    branch: "Airport Road, Dhaka",
    biography:
      "Two bright students whose lives were tragically cut short by reckless competitive racing between buses on Airport Road on July 29, 2018. Their loss ignited the nationwide student uprising that gave birth to the Road Safety Movement.",
    biographyBn:
      "২০১৮ সালের ২৯ জুলাই বিমানবন্দর সড়কে দুই বাসের বেপরোয়া প্রতিযোগিতায় নিহত হন এই দুই শিক্ষার্থী। তাঁদের আত্মত্যাগ সমগ্র বাংলাদেশের সাধারণ শিক্ষার্থীদের রাজপথে নামিয়ে এনে নিরাপদ সড়কের ৯ দফা দাবির ঐতিহাসিক আন্দোলন সূচনা করে।",
    tributesCount: 9420,
  },
  {
    id: "mem-02",
    name: "Tareque Masud & Mishuk Munier",
    nameBn: "তারেক মাসুদ ও মিশুক মুনীর",
    lifeSpan: "1956 – 2011",
    lifeSpanBn: "১৯৫৬ – ২০১১",
    designation: "Acclaimed Filmmaker & Broadcast Journalist",
    designationBn: "আন্তর্জাতিক খ্যাতিসম্পন্ন চলচ্চিত্রকার ও বরেণ্য গণমাধ্যম ব্যক্তিত্ব",
    specialty: "National Cultural Icons & Road Safety Precedent",
    branch: "Dhaka-Aricha Highway, Ghior, Manikganj",
    biography:
      "Tragically lost alongside three production colleagues in a head-on collision on the Dhaka-Aricha Highway. Their landmark Supreme Court compensation judgment established the legal framework holding commercial transport owners financially liable for crash fatalities.",
    biographyBn:
      "২০১১ সালে ঢাকা-আরিচা মহাসড়কে মর্মান্তিক রোড ক্র্যাশে নিহত হন এই দুই বরেণ্য ব্যক্তিত্ব। তাঁদের পরিবারকে ক্ষতিপূরণ প্রদানের সুপ্রিম কোর্টের ঐতিহাসিক রায় বাংলাদেশে পরিবহন মালিকদের আর্থিক জবাবদিহিতার ভিত্তি স্থাপন করে।",
    tributesCount: 7890,
  },
  {
    id: "mem-03",
    name: "Abrar Ahmed Chowdhury",
    nameBn: "আবরার আহমেদ চৌধুরী",
    lifeSpan: "1998 – 2019",
    lifeSpanBn: "১৯৯৮ – ২০১৯",
    designation: "Student Activist & Road Safety Symbol",
    designationBn: "নিরাপদ সড়ক আন্দোলনের শহীদ শিক্ষার্থী",
    specialty: "Bangladesh University of Professionals (BUP)",
    branch: "Pragati Sarani, Norda, Dhaka",
    biography:
      "Struck down by a reckless bus while lawfully crossing at a pedestrian zebra zone on Pragati Sarani. His tragic crash led to the construction of the Abrar Ahmed Footover Bridge and sparked stricter enforcement of zebra crossing right-of-way in metropolitan Dhaka.",
    biographyBn:
      "২০১৯ সালের ১৯ মার্চ প্রগতি সরণিতে জেব্রা ক্রসিং দিয়ে রাস্তা পারাপারের সময় বেপরোয়া বাসের চাপায় নিহত হন বিইউপি শিক্ষার্থী আবরার। তাঁর স্মরণে সেখানে পদচারী-সেতু নির্মিত হয় এবং পথচারী সুরক্ষার আন্দোলন বেগবান হয়।",
    tributesCount: 5120,
  },
];

export default function RoadSafetyMemorialPage() {
  const [tributes, setTributes] = useState<Record<string, number>>({});
  const { success } = useToast();

  const handlePayTribute = (id: string, name: string) => {
    soundEffects.playRatification();
    setTributes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
    success(
      "শ্রদ্ধাঞ্জলি অর্পণ সম্পন্ন",
      `Tribute flower and prayer offered in memory of ${name}.`
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col transition-colors duration-200">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/">
            <OrgLogo size="md" />
          </Link>

          <div className="flex items-center gap-3">
            <ThemeToggle variant="pill" />
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-1.5 text-xs font-semibold">
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-6 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-extrabold uppercase tracking-wider mb-6">
          <Flower2 className="w-3.5 h-3.5" />
          In Memoriam · স্মৃতি চিরন্তন
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Road Crash Victims & Movement Martyrs Memorial
        </h1>
        <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400 font-bangla mt-2">
          রোড ক্র্যাশে অকালে ঝরে যাওয়া প্রাণ ও নিরাপদ সড়ক আন্দোলনের অমর শহীদদের স্মরণে
        </p>
        <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Every crosswalk and every safety speed table we fight for is dedicated to their memory. We honor their lives not with silence, but with relentless action for safe and humane roads.
        </p>
      </section>

      {/* Memorial Profiles Roster */}
      <section className="pb-20 px-6 max-w-5xl mx-auto w-full space-y-8">
        {MEMORIAL_ROSTER.map((mem) => {
          const count = (tributes[mem.id] || 0) + mem.tributesCount;
          return (
            <div
              key={mem.id}
              className="p-6 sm:p-8 rounded-3xl bg-card border-2 border-border hover:border-amber-500/50 shadow-xl transition-all relative overflow-hidden"
            >
              <div className="flex flex-col md:flex-row items-start justify-between gap-6">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-md text-xs font-black font-mono bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30">
                      {mem.lifeSpan}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 font-bangla">
                      {mem.lifeSpanBn}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                    {mem.name}
                  </h2>
                  <h3 className="text-lg font-bold text-emerald-600 dark:text-emerald-400 font-bangla">
                    {mem.nameBn}
                  </h3>

                  <div className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-2">
                    <span>{mem.designation}</span>
                    <span>·</span>
                    <span>{mem.branch}</span>
                  </div>

                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed pt-2">
                    {mem.biography}
                  </p>

                  <p className="text-xs text-slate-600 dark:text-slate-400 font-bangla leading-relaxed p-4 rounded-xl bg-muted/60 border border-border">
                    {mem.biographyBn}
                  </p>
                </div>

                <div className="shrink-0 flex flex-col items-center gap-3 w-full md:w-auto p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-border">
                  <div className="w-12 h-12 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-500">
                    <Flower2 className="w-6 h-6" />
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-black text-slate-900 dark:text-white">
                      {count.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">
                      Floral Tributes Offered
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePayTribute(mem.id, mem.name)}
                    className="w-full text-xs font-bold gap-1.5 border-border text-slate-800 dark:text-slate-200"
                  >
                    <Flower2 className="w-3.5 h-3.5 text-red-500" />
                    Offer Floral Tribute
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
