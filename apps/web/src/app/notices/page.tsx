"use client";

import React, { useState } from "react";
import {
  FileText,
  Search,
  Calendar,
  ArrowRight,
} from "lucide-react";
import { Button, Badge, Card } from "@org/ui";
import Link from "next/link";
import { InstitutionalHeader } from "@/components/layout/institutional-header";
import { InstitutionalFooter } from "@/components/layout/institutional-footer";

interface NoticeItem {
  id: string;
  memoNo: string;
  title: string;
  titleBn: string;
  category: "DIRECTIVE" | "GAZETTE" | "POLICY" | "CIRCULAR";
  categoryLabel: string;
  categoryLabelBn: string;
  publishedAt: string;
  publishedAtBn: string;
  signatory: string;
  signatoryDesignation: string;
  summary: string;
  summaryBn: string;
  isUrgent?: boolean;
}

const NOTICES_DATA: NoticeItem[] = [
  {
    id: "not-2025-001",
    memoNo: "NAO/SEC/2025/CIR-01",
    title: "Official Directive: National Agricultural Olympiad 2025 Season 2 & 3 Registration Guidelines & Eligibility",
    titleBn: "সরকারী নির্দেশনা: জাতীয় কৃষি অলিম্পিয়াড ২০২৫ সিজন ২ ও ৩ নিবন্ধন সময়সূচি ও নির্দেশিকা প্রকাশ",
    category: "DIRECTIVE",
    categoryLabel: "National Circular",
    categoryLabelBn: "জাতীয় পরিপত্র",
    publishedAt: "September 18, 2026",
    publishedAtBn: "৩ আশ্বিন ১৪৩৩",
    signatory: "Prof. Dr. A. K. Azad",
    signatoryDesignation: "National Advisory Convener",
    summary:
      "Official directives establishing admission guidelines for Junior (Grades 6–8), Secondary (Grades 9–10), and Higher Secondary (Grades 11–12) students across all 64 districts. Early-bird registration fee is BDT 70.00 payable via SSLCommerz.",
    summaryBn:
      "দেশব্যাপী ৬৪টি জেলার স্কুল ও কলেজের শিক্ষার্থীদের জন্য জাতীয় কৃষি অলিম্পিয়াডের ৩টি ক্যাটাগরিতে অংশগ্রহণের যোগ্যতা, ফি (৭০ টাকা) এবং নিবন্ধন সময়সূচি সংক্রান্ত সংবিধিবদ্ধ নির্দেশিকা।",
    isUrgent: true,
  },
  {
    id: "not-2025-002",
    memoNo: "NAO/EXAM/2025/DIR-04",
    title: "Admit Card Download Schedule & Online Screening Examination Terminal Protocols",
    titleBn: "প্রবেশপত্র সংগ্রহ এবং অনলাইন প্রাথমিক বাছাই পরীক্ষা সংক্রান্ত নির্দেশিকা",
    category: "GAZETTE",
    categoryLabel: "Exam Gazette",
    categoryLabelBn: "পরীক্ষা গেজেট",
    publishedAt: "September 12, 2026",
    publishedAtBn: "২৭ ভাদ্র ১৪৩৩",
    signatory: "Dr. Kazi Mostafa Kamal",
    signatoryDesignation: "Controller of Examinations",
    summary:
      "Step-by-step procedures for candidates to download digital E-Admit Cards with cryptographically verifiable QR authentication codes. System requirements and mock screening tests for remote participants.",
    summaryBn:
      "ডিজিটাল অ্যাডমিট কার্ড ডাউনলোড, কিউআর কোড ভেরিফিকেশন এবং প্রত্যন্ত অঞ্চলের শিক্ষার্থীদের জন্য অনলাইন মক টেস্ট পরিচালনা বিষয়ক পরীক্ষা নিয়ন্ত্রকের বিজ্ঞপ্তি।",
  },
  {
    id: "not-2025-003",
    memoNo: "NAO/ACAD/2025/SYL-02",
    title: "Academic Syllabus Breakdown & Recommended Study Manuals: Climate-Smart Farming & Plant Genetics",
    titleBn: "পাঠ্যক্রম ও সিলেবাস নির্দেশিকা: জলবায়ু সহনশীল কৃষি, হাইড্রোপনিক্স ও উদ্ভিদ বংশগতিবিদ্যা",
    category: "CIRCULAR",
    categoryLabel: "Academic Bulletin",
    categoryLabelBn: "অ্যাকাডেমিক বুলেটিন",
    publishedAt: "August 28, 2026",
    publishedAtBn: "১২ ভাদ্র ১৪৩৩",
    signatory: "Prof. Dr. Mahmudul Hasan",
    signatoryDesignation: "Academic Council Lead, BAU",
    summary:
      "Full academic module list, recommended reading list from BARI and BRRI research papers, and sample question banks for all competitive tracks.",
    summaryBn:
      "জুনিয়র, মাধ্যমিক ও উচ্চ মাধ্যমিক ক্যাটাগরির পাঠ্যসূচি, সহায়ক গবেষণাপত্র তালিকা এবং নমুনা প্রশ্নব্যাংক প্রকাশ সংক্রান্ত অ্যাকাডেমিক বুলেটিন।",
  },
  {
    id: "not-2025-004",
    memoNo: "NAO/EVENT/2025/REG-08",
    title: "BAU Grand Finale Venue Logistics, Accommodation & Travel Grant Eligibility Directive",
    titleBn: "বাকৃবি গ্র্যান্ড ফিনালে ভেন্যু ব্যবস্থাপনা, আবাসন ও ভ্রমণ অনুদান সংক্রান্ত পরিপত্র",
    category: "POLICY",
    categoryLabel: "Logistics Directive",
    categoryLabelBn: "ব্যবস্থাপনা পরিপত্র",
    publishedAt: "August 15, 2026",
    publishedAtBn: "৩০ শ্রাবণ ১৪৩৩",
    signatory: "National Organizing Secretariat",
    signatoryDesignation: "Uttara Model Town Secretariat",
    summary:
      "Accommodation arrangements at Bangladesh Agricultural University (BAU) halls for regional champions and eligibility criteria for travel stipends awarded to marginalized farming family qualifiers.",
    summaryBn:
      "বিভাগীয় চ্যাম্পিয়নদের ময়মনসিংহে বাকৃবি ছাত্রাবাসে বিনামূল্যে থাকা-খাওয়া এবং প্রান্তিক পরিবারের সন্তানদের যাতায়াত ভাতা প্রদান সংক্রান্ত নির্দেশনা।",
  },
];

export default function NoticesDirectoryPage() {
  const [lang, setLang] = useState<"en" | "bn">("en");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("ALL");

  const filteredNotices = NOTICES_DATA.filter((item) => {
    const matchesFilter = selectedFilter === "ALL" || item.category === selectedFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      item.title.toLowerCase().includes(q) ||
      item.titleBn.includes(q) ||
      item.memoNo.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-amber-500/20 transition-colors">
      {/* Institutional Top Header */}
      <InstitutionalHeader lang={lang} onToggleLang={() => setLang(lang === "en" ? "bn" : "en")} />

      {/* Hero Section */}
      <section className="relative border-b border-border bg-muted/20 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-semibold mb-3">
            <FileText className="w-3.5 h-3.5 text-amber-500" />
            <span>Official Secretariat Gazettes & Notices · Season 2025</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-serif text-foreground">
            {lang === "en"
              ? "Secretariat Circulars, Gazettes & Guidelines"
              : "জাতীয় সচিবালয় বিজ্ঞপ্তি, গেজেট ও পরিপত্র"}
          </h1>

          <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-3xl leading-relaxed">
            {lang === "en"
              ? "Official administrative directives, examination schedules, academic syllabi, and statutory circulars promulgated by the National Organizing Secretariat of the National Agricultural Olympiad."
              : "জাতীয় কৃষি অলিম্পিয়াড কেন্দ্রীয় সচিবালয় কর্তৃক জারিকৃত সকল সরকারী সার্কুলার, পরীক্ষার রুটিন, সিলেবাস এবং প্রশাসনিক নির্দেশনা এই পোর্টালে সংরক্ষিত।"}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4 text-xs font-mono text-muted-foreground">
            <span className="p-2 rounded-lg bg-card border border-border">
              Trade License: 03247/2023-2025
            </span>
            <span className="p-2 rounded-lg bg-card border border-border">
              Secretariat: House 04, Road 12/b, Sector 10, Uttara Model Town, Dhaka
            </span>
          </div>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <div className="border-b border-border bg-card/60 backdrop-blur-md sticky top-20 z-30">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={lang === "en" ? "Search notices by title or memo number..." : "বিজ্ঞপ্তির নাম বা স্মারক নং অনুসন্ধান..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-background border border-border text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1">
            {[
              { key: "ALL", label: "All Circulars" },
              { key: "DIRECTIVE", label: "Directives" },
              { key: "GAZETTE", label: "Gazettes" },
              { key: "CIRCULAR", label: "Syllabi" },
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => setSelectedFilter(f.key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedFilter === f.key
                    ? "bg-[#0F5132] text-white shadow-sm"
                    : "bg-muted border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Notices List */}
      <main className="max-w-6xl mx-auto px-6 py-12 flex-1 w-full space-y-6">
        {filteredNotices.map((n) => (
          <Card
            key={n.id}
            className="bg-card border border-border hover:border-emerald-500/40 rounded-3xl p-6 sm:p-8 transition-all shadow-sm"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-3">
              <div className="flex items-center gap-2">
                <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                  {lang === "en" ? n.categoryLabel : n.categoryLabelBn}
                </Badge>
                {n.isUrgent && (
                  <Badge className="bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30 text-[10px] font-bold">
                    URGENT
                  </Badge>
                )}
                <span className="text-xs font-mono text-muted-foreground">{n.memoNo}</span>
              </div>
              <div className="text-xs text-muted-foreground font-mono flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                <span>{lang === "en" ? n.publishedAt : n.publishedAtBn}</span>
              </div>
            </div>

            <div className="pt-4 space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-foreground hover:text-emerald-600 transition-colors">
                <Link href={`/notices/${n.id}`}>{lang === "en" ? n.title : n.titleBn}</Link>
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {lang === "en" ? n.summary : n.summaryBn}
              </p>
            </div>

            <div className="pt-4 border-t border-border flex items-center justify-between">
              <div className="text-xs text-muted-foreground">
                Signatory: <strong className="text-foreground">{n.signatory}</strong> ({n.signatoryDesignation})
              </div>

              <Link href={`/notices/${n.id}`}>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs font-bold gap-1 border-border text-foreground hover:bg-muted"
                >
                  {lang === "en" ? "Read Full Circular" : "পূর্ণাঙ্গ নোটিশ পড়ুন"}
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </main>

      {/* Institutional Footer */}
      <InstitutionalFooter lang={lang} />
    </div>
  );
}
