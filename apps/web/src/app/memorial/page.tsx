"use client";

import React, { useState } from "react";
import {
  Flower2,
  CheckCircle2,
} from "lucide-react";
import { Button, Card, CardContent } from "@org/ui";
import Link from "next/link";

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
    name: "Prof. Dr. Mohammad Nurul Islam",
    nameBn: "জাতীয় অধ্যাপক ডাঃ মোহাম্মদ নুরুল ইসলাম",
    lifeSpan: "1938 – 2024",
    lifeSpanBn: "১৯৩৮ – ২০২৪",
    designation: "Past President & National Professor of Medicine",
    designationBn: "সাবেক কেন্দ্রীয় সভাপতি ও জাতীয় অধ্যাপক",
    specialty: "Internal Medicine & Cardiology",
    branch: "Dhaka Central Secretariat",
    biography:
      "A towering pioneer of medical education in Bangladesh. Over six decades, he mentored thousands of physicians, founded regional rural health dispensaries, and served as President of the Association during crucial healthcare reforms.",
    biographyBn:
      "বাংলাদেশে আধুনিক চিকিৎসা শিক্ষা ও গবেষণার পথিকৃৎ। ছয় দশকের বর্ণাঢ্য কর্মজীবনে তিনি সহস্রাধিক চিকিৎসক গড়ে তুলেছেন এবং সংগঠনের সভাপতি হিসেবে দেশের স্বাস্থ্যখাতের নীতি নির্ধারণে ঐতিহাসিক ভূমিকা পালন করেন।",
    tributesCount: 1420,
  },
  {
    id: "mem-02",
    name: "Dr. A. K. M. Shamsuddin (Shaheed Doctor)",
    nameBn: "শহীদ ডাঃ এ. কে. এম. শামসুদ্দীন",
    lifeSpan: "1931 – 1971",
    lifeSpanBn: "১৯৩১ – ১৯৭১",
    designation: "Martyr Physician of the 1971 Liberation War",
    designationBn: "১৯৭১ সালের মহান মুক্তিযুদ্ধে শহীদ চিকিৎসক",
    specialty: "Surgery & Trauma Care",
    branch: "Sylhet Medical College Unit",
    biography:
      "Martyred while selflessly operating on wounded freedom fighters during the brutal 1971 war. His unwavering moral courage remains the eternal moral compass of the Bangladesh Medical Association.",
    biographyBn:
      "১৯৭১ সালের মহান মুক্তিযুদ্ধে অবরুদ্ধ সিলেটে জীবনের ঝুঁকি নিয়ে যুদ্ধাহত বীর মুক্তিযোদ্ধাদের অস্ত্রোপচার করেন এবং পাকিস্তানি হানাদার বাহিনীর হাতে আত্মোৎসর্গ করেন।",
    tributesCount: 3890,
  },
  {
    id: "mem-03",
    name: "Dr. Shahana Akhter",
    nameBn: "ডাঃ শাহানা আক্তার",
    lifeSpan: "1974 – 2023",
    lifeSpanBn: "১৯৭৪ – ২০২৩",
    designation: "Associate Professor & Humanitarian Steward",
    designationBn: "সহযোগী অধ্যাপক ও মানবিক স্বাস্থ্যসেবক",
    specialty: "Obstetrics & Gynaecology",
    branch: "Chattogram Medical College Unit",
    biography:
      "Dedicated her life to rural maternal health in remote coastal islands of Chattogram. Her benevolent work continues through the dedicated BMA Mother & Child Healthcare Endowment.",
    biographyBn:
      "উপকূলীয় চরাঞ্চলে মা ও নবজাতকের জরুরি চিকিৎসায় আজীবন নিবেদিতপ্রাণ। তাঁর স্মৃতির উদ্দেশ্যে বিএমএ মাতৃ ও শিশু কল্যাণ ট্রাস্ট পরিচালিত হচ্ছে।",
    tributesCount: 940,
  },
];

export default function MemorialHallPage() {
  const [lang, setLang] = useState<"en" | "bn">("en");
  const [tributes, setTributes] = useState<Record<string, number>>({
    "mem-01": 1420,
    "mem-02": 3890,
    "mem-03": 940,
  });
  const [offeredSet, setOfferedSet] = useState<Set<string>>(new Set());

  const handleOfferFlower = (id: string) => {
    if (offeredSet.has(id)) return;
    setTributes((prev) => ({
      ...prev,
      [id]: (prev[id] ?? 0) + 1,
    }));
    setOfferedSet((prev) => new Set(prev).add(id));
  };

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
                {lang === "en" ? "Memorial Hall of Eternal Respect" : "স্মৃতি চিরন্তন • শোক ও শ্রদ্ধাঞ্জলি"}
              </Link>
              <div className="text-xs text-slate-400 font-bangla">
                {lang === "en" ? "Honoring Our Departed Physicians & Martyr Heroes" : "প্রয়াত সহকর্মী ও ভাষা-মুক্তিযুদ্ধের শহীদ চিকিৎসকদের স্মরণে"}
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
            <Link href="/causes">
              <Button size="sm" variant="outline" className="border-amber-500/30 text-amber-300 hover:bg-amber-500/10 text-xs">
                {lang === "en" ? "Benevolent Family Fund" : "কল্যাণ ট্রাস্ট"}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Solemn Hero Section */}
      <section className="relative border-b border-white/10 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-medium">
            <Flower2 className="w-3.5 h-3.5 text-rose-400" />
            {lang === "en" ? "In Sacred Memory of Departed Colleagues" : "শ্রদ্ধা, ভালোবাসা ও আজীবন কৃতজ্ঞতা"}
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-white tracking-tight leading-tight">
            {lang === "en" ? "Memorial Hall of Eternal Respect" : "স্মৃতি চিরন্তন • শোক ও শ্রদ্ধাঞ্জলি কক্ষ"}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {lang === "en"
              ? "We bow in solemn respect to the mentor physicians, surgical pioneers, and wartime martyrs who devoted their lives to relieving human suffering and building our healthcare republic."
              : "দেশের স্বাস্থ্য ব্যবস্থা বিনির্মাণ এবং মানবতার সেবায় আত্মোৎসর্গকারী প্রথিতযশা শিক্ষক, গবেষক ও শহীদ চিকিৎসকদের প্রতি বিনম্র শ্রদ্ধাঞ্জলি।"}
          </p>
        </div>
      </section>

      {/* Main Memorial Dossiers Grid */}
      <main className="max-w-5xl mx-auto px-6 py-12 flex-1 w-full space-y-8">
        {MEMORIAL_ROSTER.map((person) => {
          const currentTributes = tributes[person.id] ?? person.tributesCount;
          const isOffered = offeredSet.has(person.id);

          return (
            <Card
              key={person.id}
              className="bg-slate-900/60 border border-white/10 hover:border-amber-500/30 transition-all rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-10"
            >
              <CardContent className="p-0 flex flex-col md:flex-row items-start gap-8">
                {/* Memorial Photo Frame Accent */}
                <div className="flex flex-col items-center shrink-0 w-full md:w-48">
                  <div className="w-36 h-36 rounded-full bg-gradient-to-tr from-slate-800 via-slate-700 to-slate-800 border-4 border-amber-500/40 p-1 flex items-center justify-center shadow-2xl relative">
                    <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center font-serif text-3xl font-black text-amber-200">
                      {person.name.split(" ")[2]?.[0] || "DR"}
                    </div>
                  </div>
                  <div className="mt-3 font-serif font-bold text-amber-400 text-sm">
                    {lang === "en" ? person.lifeSpan : person.lifeSpanBn}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">{person.branch}</div>
                </div>

                {/* Profile Narrative & Tribute Action */}
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white leading-tight">
                      {lang === "en" ? person.name : person.nameBn}
                    </h3>
                    <div className="text-sm font-semibold text-amber-300 font-serif mt-1">
                      {lang === "en" ? person.designation : person.designationBn}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">{person.specialty}</div>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {lang === "en" ? person.biography : person.biographyBn}
                  </p>

                  <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Flower2 className="w-4 h-4 text-rose-400" />
                      <span>
                        <strong className="text-white font-mono">{currentTributes.toLocaleString()}</strong>{" "}
                        {lang === "en" ? "floral tributes offered" : "জন শ্রদ্ধাঞ্জলি অর্পণ করেছেন"}
                      </span>
                    </div>

                    <Button
                      onClick={() => handleOfferFlower(person.id)}
                      disabled={isOffered}
                      className={`gap-2 text-xs font-bold transition-all ${
                        isOffered
                          ? "bg-emerald-600/30 text-emerald-300 border border-emerald-500/30"
                          : "bg-rose-950 hover:bg-rose-900 text-rose-200 border border-rose-800"
                      }`}
                    >
                      {isOffered ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {lang === "en" ? "Tribute Offered (শ্রদ্ধাঞ্জলি অর্পিত)" : "শ্রদ্ধাঞ্জলি অর্পিত"}
                        </>
                      ) : (
                        <>
                          <Flower2 className="w-3.5 h-3.5 text-rose-400" />
                          {lang === "en" ? "Offer Floral Tribute" : "শ্রদ্ধাঞ্জলি অর্পণ করুন"}
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-slate-950 py-10 px-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>© 2026 Bangladesh Medical Association • Standing Committee for Benevolent & Memorial Affairs</div>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-slate-300 transition-colors">
              {lang === "en" ? "Home" : "মূলপাতা"}
            </Link>
            <Link href="/causes" className="hover:text-slate-300 transition-colors">
              {lang === "en" ? "Family Benevolence Fund" : "কল্যাণ তহবিল"}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
