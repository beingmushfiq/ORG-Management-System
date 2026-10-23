"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Clock,
  Award,
  QrCode,
  Ticket,
  Printer,
  Sparkles,
} from "lucide-react";
import { Button, Badge, Card } from "@org/ui";
import Link from "next/link";
import { InstitutionalHeader } from "@/components/layout/institutional-header";
import { InstitutionalFooter } from "@/components/layout/institutional-footer";

export default function EventProgramDetailPage() {
  const [lang, setLang] = useState<"en" | "bn">("en");
  const [candidateRollInput, setCandidateRollInput] = useState("NAO-2025-0814");
  const [showPassModal, setShowPassModal] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPassModal(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-amber-500/20 transition-colors">
      {/* Institutional Top Header */}
      <InstitutionalHeader lang={lang} onToggleLang={() => setLang(lang === "en" ? "bn" : "en")} />

      {/* Hero Banner */}
      <section className="relative border-b border-border bg-muted/20 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-emerald-600 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            {lang === "en" ? "Back to All Olympiad Events" : "সকল ইভেন্ট তালিকায় ফিরুন"}
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 text-xs font-semibold">
              {lang === "en" ? "National Grand Finale · Season 2025" : "জাতীয় গ্র্যান্ড ফিনালে · সিজন ২০২৫"}
            </Badge>
            <span className="inline-flex items-center gap-1.5 text-xs text-amber-700 dark:text-amber-400 font-semibold bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30">
              <Award className="w-3.5 h-3.5" />
              100 National Merit Points & Research Tour
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif text-foreground tracking-tight leading-tight">
            {lang === "en"
              ? "National Agricultural Olympiad 2025 — Grand Finale & Award Gala"
              : "জাতীয় কৃষি অলিম্পিয়াড ২০২৫ — গ্র্যান্ড ফিনালে ও জাতীয় পুরস্কার বিতরণী"}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-muted-foreground font-mono">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-600" />
              <span>{lang === "en" ? "November 20 - 21, 2026" : "২০ - ২১ নভেম্বর ২০২৬"}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-500" />
              <span>
                {lang === "en"
                  ? "BAU Auditorium, Mymensingh-2202"
                  : "বাংলাদেশ কৃষি বিশ্ববিদ্যালয় (বাকৃবি) মিলনায়তন, ময়মনসিংহ"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-sky-500" />
              <span>09:00 AM – 06:00 PM BST</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid Content */}
      <main className="max-w-6xl mx-auto px-6 py-12 flex-1 w-full grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column (8 Cols): Program Blueprint & Schedule */}
        <div className="lg:col-span-8 space-y-10">
          {/* Executive Overview */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-foreground flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              {lang === "en" ? "Olympiad Overview & National Assembly" : "অলিম্পিয়াড বিবরণ ও জাতীয় সমাবেশ"}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {lang === "en"
                ? "The National Agricultural Olympiad Grand Finale convenes the finest young agricultural minds, junior researchers, and school innovators from all 64 districts. Finalists compete in written examinations, prototype exhibitions, and viva examinations before a distinguished jury of agricultural scientists and university vice-chancellors."
                : "জাতীয় কৃষি অলিম্পিয়াডের গ্র্যান্ড ফিনালেতে ৬৪টি জেলার সেরা শিক্ষার্থী ও উদ্ভাবকেরা অংশ নিচ্ছেন। বাকৃবি ক্যাম্পাসে অনুষ্ঠিতব্য এই দ্বিদিসীয় আয়োজনে লিখিত পরীক্ষা, কৃষি প্রজেক্ট প্রদর্শনী এবং কৃষিবিজ্ঞানীদের উপস্থিতিতে ভাইভা অনুষ্ঠিত হবে।"}
            </p>
          </section>

          {/* Academic Timeline / Schedule */}
          <section className="space-y-4">
            <h3 className="text-lg font-bold font-serif text-foreground">
              {lang === "en" ? "Official Examination & Plenary Schedule" : "পরীক্ষা ও অধিবেশন সময়সূচি"}
            </h3>

            <div className="space-y-3">
              {[
                {
                  time: "Day 1 · 09:00 - 10:30 AM",
                  titleEn: "National Flag Hoisting & Inaugural Ceremony",
                  titleBn: "জাতীয় পতাকা উত্তোলন ও উদ্বোধনী সমাবেশ",
                  location: "BAU Central Playground",
                },
                {
                  time: "Day 1 · 11:00 AM - 01:00 PM",
                  titleEn: "Grand Written Olympiad (Junior, Secondary & Higher Secondary)",
                  titleBn: "জাতীয় লিখিত পরীক্ষা (জুনিয়র, মাধ্যমিক ও উচ্চ মাধ্যমিক)",
                  location: "Faculty of Agriculture Examination Halls",
                },
                {
                  time: "Day 1 · 02:30 - 05:00 PM",
                  titleEn: "Youth Smart-Agro Innovation Fair & Prototype Judging",
                  titleBn: "স্মার্ট কৃষি উদ্ভাবনী মেলা ও প্রজেক্ট মূল্যায়ন",
                  location: "BAU Innovation Gallery",
                },
                {
                  time: "Day 2 · 09:30 AM - 01:00 PM",
                  titleEn: "Educational Research Tour: BARI, BRRI & BAU Germplasm Center",
                  titleBn: "মাঠ গবেষণা পরিদর্শন: ব্রি, বারি ও বাকৃবি জার্মপ্লাজম সেন্টার",
                  location: "Mymensingh Research Corridors",
                },
                {
                  time: "Day 2 · 03:00 - 06:00 PM",
                  titleEn: "National Award Gala: Laptop, Trophy & Fellowship Conferral",
                  titleBn: "জাতীয় পুরস্কার বিতরণী: চ্যাম্পিয়ন ল্যাপটপ, ক্রেস্ট ও সনদ প্রদান",
                  location: "BAU Grand Auditorium",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-card border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-sm"
                >
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                      {item.time}
                    </span>
                    <h4 className="text-sm font-bold text-foreground">
                      {lang === "en" ? item.titleEn : item.titleBn}
                    </h4>
                  </div>
                  <div className="text-xs text-muted-foreground font-mono flex items-center gap-1.5 shrink-0">
                    <MapPin className="w-3.5 h-3.5 text-amber-500" />
                    <span>{item.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Academic Patronage & Jury */}
          <section className="space-y-4">
            <h3 className="text-lg font-bold font-serif text-foreground">
              {lang === "en" ? "Academic Jury Panel & Patrons" : "অ্যাকাডেমিক জুরি প্যানেল ও উপদেষ্টা"}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-card border border-border space-y-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold">
                  BAU
                </div>
                <h4 className="text-sm font-bold text-foreground">Prof. Dr. A. K. Azad</h4>
                <p className="text-xs text-muted-foreground">Vice-Chancellor, Bangladesh Agricultural University</p>
              </div>

              <div className="p-4 rounded-2xl bg-card border border-border space-y-2">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-400 flex items-center justify-center font-bold">
                  BARI
                </div>
                <h4 className="text-sm font-bold text-foreground">Dr. Kazi Mostafa Kamal</h4>
                <p className="text-xs text-muted-foreground">Director General & Chief Scientist, BARI</p>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column (4 Cols): Registration & E-Pass Card */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="bg-card border-2 border-emerald-500/40 rounded-3xl p-6 shadow-md space-y-5">
            <div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-700 dark:text-emerald-400">
                OFFICIAL ADMISSION PASS
              </span>
              <h3 className="text-xl font-bold font-serif text-foreground mt-2">
                {lang === "en" ? "Finale Admission Gate Pass" : "ফিনালে প্রবেশপত্র ও সিট প্ল্যান"}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Enter your Candidate Roll Number to download your cryptographically verified E-Admit Card.
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-foreground block mb-1">
                  Candidate Roll Number
                </label>
                <input
                  type="text"
                  required
                  value={candidateRollInput}
                  onChange={(e) => setCandidateRollInput(e.target.value)}
                  placeholder="e.g. NAO-2025-0814"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-sm font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-muted/50 border border-border space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Registration Fee:</span>
                  <span className="font-bold text-foreground">৳70.00 BDT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Access:</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">All 2 Days + Food</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Kit Included:</span>
                  <span className="text-foreground">Official T-Shirt & File</span>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#0F5132] hover:bg-[#0c4028] text-white font-bold text-xs gap-1.5 shadow-md py-3"
              >
                <Ticket className="w-3.5 h-3.5 text-amber-400" />
                {lang === "en" ? "Generate Verified Delegate Pass" : "ভেরিফায়েড প্রবেশপত্র তৈরি করুন"}
              </Button>
            </form>

            <div className="text-[11px] text-muted-foreground font-mono border-t border-border pt-3">
              Trade License: 03247/2023-2025
              <br />
              Secretariat Hotline: +880 1717-395047
            </div>
          </Card>
        </div>
      </main>

      {/* Delegate Pass Modal Preview */}
      {showPassModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 animate-in fade-in zoom-in duration-200 text-card-foreground">
            <div className="flex items-start justify-between border-b border-border pb-3">
              <div>
                <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-700 dark:text-emerald-400">
                  NATIONAL AGRICULTURAL OLYMPIAD 2025
                </span>
                <h3 className="text-base font-bold font-serif text-foreground mt-1">
                  Official Candidate E-Admit Card
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowPassModal(false)}
                className="text-muted-foreground hover:text-foreground text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-muted/60 border border-border space-y-3 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Roll Number:</span>
                <span className="font-bold text-foreground">{candidateRollInput}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Seat Allocation:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">Hall-A · Row 04 · Seat 18</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Venue:</span>
                <span className="text-foreground">BAU Auditorium, Mymensingh</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Reporting:</span>
                <span className="text-foreground">Nov 20, 08:30 AM</span>
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-between">
                <QrCode className="w-12 h-12 text-foreground" />
                <div className="text-right text-[10px] text-muted-foreground">
                  <span className="font-bold text-foreground">SHA-256 Ledger Authenticated</span>
                  <br />
                  Scan at Entrance Terminal
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.print()}
                className="flex-1 text-xs font-bold gap-1"
              >
                <Printer className="w-3.5 h-3.5" />
                Print Admit Card
              </Button>
              <Button
                size="sm"
                onClick={() => setShowPassModal(false)}
                className="bg-[#0F5132] hover:bg-[#0c4028] text-white text-xs font-bold"
              >
                Done
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Institutional Footer */}
      <InstitutionalFooter lang={lang} />
    </div>
  );
}
