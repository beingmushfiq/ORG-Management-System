"use client";

import React, { useState } from "react";
import {
  Search,
  Download,
  Award,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button, Badge, Card, CardContent } from "@org/ui";
import Link from "next/link";

interface ArticleItem {
  id: string;
  title: string;
  titleBn: string;
  authors: string;
  affiliations: string;
  category: "ORIGINAL_RESEARCH" | "REVIEW_ARTICLE" | "CASE_REPORT" | "EDITORIAL";
  categoryLabel: string;
  volume: string;
  issue: string;
  year: string;
  doi: string;
  abstractText: string;
  abstractBn: string;
}

const SAMPLE_ARTICLES: ArticleItem[] = [
  {
    id: "art-01",
    title: "Surveillance of Water-Borne Pathogens and Antimicrobial Resistance Following 2026 Flash Floods in Southeastern Bangladesh",
    titleBn: "দক্ষিণ-পূর্বাঞ্চলের বন্যায় পানিবাহিত রোগজীবাণু ও অ্যান্টিমাইক্রোবিয়াল রেজিস্ট্যান্স পর্যবেক্ষণ গবেষণা",
    authors: "Prof. Dr. Nazma Haque, Dr. Kabir Hossain, Dr. Shahina Sultana",
    affiliations: "Institute of Epidemiology & BMA Disaster Response Taskforce",
    category: "ORIGINAL_RESEARCH",
    categoryLabel: "Original Research",
    volume: "Vol. 55",
    issue: "No. 3",
    year: "2026",
    doi: "10.3329/bmj.v55i3.99214",
    abstractText:
      "A comprehensive longitudinal cohort survey of 1,240 post-flood clinical stool isolates collected across mobile relief clinics in Feni and Noakhali. Demonstrates emergence of ciprofloxacin-tolerant Vibrio cholerae strains and evaluates immediate field water treatment intervention protocols.",
    abstractBn:
      "ফেনী ও নোয়াখালীর বন্যা কবলিত অঞ্চলে ভ্রাম্যমাণ ক্লিনিক থেকে সংগৃহীত ১,২৪০টি নমুনার ক্লিনিক্যাল পর্যবেক্ষণ। সিপ্রোফ্লক্সাসিন প্রতিরোধী কলেরা জীবাণুর বিস্তার এবং পানি বিশুদ্ধকরণের মাঠপর্যায়ের প্রভাব মূল্যায়ন।",
  },
  {
    id: "art-02",
    title: "Clinical Outcomes of Primary Percutaneous Coronary Intervention in Acute Myocardial Infarction: A 5-Year Registry from Chattogram",
    titleBn: "তীব্র হৃদরোগে জরুরি প্রাইমারি পিসিআই এর ক্লিনিক্যাল সাফল্য: চট্টগ্রাম রেজিস্ট্রি ভিত্তিক ৫ বছরের সমীক্ষা",
    authors: "Dr. Shah Alam, Prof. Dr. Mujibul Haque, Dr. Faisal Ahmed Chowdhury",
    affiliations: "Department of Cardiology, Chattogram Medical College Hospital",
    category: "ORIGINAL_RESEARCH",
    categoryLabel: "Original Research",
    volume: "Vol. 55",
    issue: "No. 3",
    year: "2026",
    doi: "10.3329/bmj.v55i3.99215",
    abstractText:
      "Retrospective audit of 2,150 emergency primary angioplasties performed with door-to-balloon intervals below 90 minutes. Examines 30-day major adverse cardiac event (MACE) rates and long-term functional survival in regional referral hospitals.",
    abstractBn:
      "চট্টগ্রাম মেডিকেল কলেজে জরুরি প্রাইমারি এনজিওপ্লাস্টির মাধ্যমে চিকিৎসা গ্রহণকারী ২,১৫০ জন রোগীর ৫ বছরের তুলনামূলক পর্যালোচনা ও বেঁচে থাকার হার বিশ্লেষণ।",
  },
  {
    id: "art-03",
    title: "Universal Health Coverage and the Essential Health Service Package: Policy Directions for Bangladesh 2026-2035",
    titleBn: "সার্বজনীন স্বাস্থ্য সুরক্ষা ও অত্যাবশ্যকীয় সেবা প্যাকেজ: বাংলাদেশ প্রেক্ষিত ২০২৬-২০৩৫",
    authors: "Prof. Dr. Mahmudul Hasan, Engr. Tanvir Ahmed",
    affiliations: "Research & Policy Council, Road Safety Movement",
    category: "EDITORIAL",
    categoryLabel: "Executive Editorial",
    volume: "Vol. 55",
    issue: "No. 2",
    year: "2026",
    doi: "10.3329/bmj.v55i2.98102",
    abstractText:
      "A critical institutional policy roadmap addressing outpatient out-of-pocket medical expenditures, primary healthcare financing mechanisms, and integration of general practitioners across Upazila health complexes.",
    abstractBn:
      "উপজেলা স্বাস্থ্য কমপ্লেক্স থেকে শুরু করে তৃণমূল পর্যায়ে স্বাস্থ্যসেবা ব্যয় হ্রাস এবং সাধারণ চিকিৎসকদের সম্পৃক্তকরণের জাতীয় রূপরেখা।",
  },
];

export default function MedicalJournalPage() {
  const [lang, setLang] = useState<"en" | "bn">("en");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>("art-01");

  const filteredArticles = SAMPLE_ARTICLES.filter((art) => {
    const q = searchQuery.toLowerCase();
    return (
      art.title.toLowerCase().includes(q) ||
      art.authors.toLowerCase().includes(q) ||
      art.doi.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500/20">
      {/* Navigation Header */}
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-slate-950/85 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center font-black text-slate-950 text-sm shadow-lg"
            >
              RSM
            </Link>
            <div>
              <Link href="/" className="font-bold text-base tracking-tight text-white hover:text-amber-400 transition-colors">
                {lang === "en" ? "Road Safety & Trauma Research Journal" : "সড়ক নিরাপত্তা ও ট্রমা গবেষণা জার্নাল"}
              </Link>
              <div className="text-xs text-slate-400 font-bangla">
                {lang === "en" ? "Official Peer-Reviewed Quarterly Scientific Publication • ISSN 0301-4975" : "নিরাপদ সড়ক আন্দোলনের অফিসিয়াল গবেষণা সাময়িকী (আইএসএসএন: ০৩০১-৪৯৭৫)"}
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
            <Link href="/portal/lms">
              <Button size="sm" variant="outline" className="border-amber-500/30 text-amber-300 hover:bg-amber-500/10 text-xs">
                {lang === "en" ? "CPD Academy" : "সিপিডি একাডেমি"}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative border-b border-white/10 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium mb-3">
              <Award className="w-3.5 h-3.5" />
              {lang === "en" ? "Indexed in Bangladesh Journals Online (BanglaJOL) & WHO IMSEAR" : "আন্তর্জাতিক ইনডেক্স ও পিয়ার-রিভিউড জার্নাল"}
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-white tracking-tight leading-tight">
              {lang === "en" ? "Scholarly Research & Clinical Monographs" : "চিকিৎসাবিজ্ঞান গবেষণা ও জার্নাল আর্কাইভ"}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              {lang === "en"
                ? "The official scientific research organ of the Road Safety Movement, publishing high-impact peer-reviewed crash research, forensic engineering, trauma clinical trials, and epidemiological field surveys continuously since 2018."
                : "২০১৮ সাল থেকে নিরবচ্ছিন্নভাবে প্রকাশিত সড়ক দুর্ঘটনা বিশ্লেষণ, ট্রাফিক ফরেনসিক্স এবং ট্রমা ব্যবস্থাপনা সংক্রান্ত গবেষণা প্রকাশনা।"}
            </p>
          </div>

          <div className="bg-slate-900/90 border border-white/10 p-5 rounded-2xl text-xs space-y-1">
            <div className="text-slate-400">Current Issue:</div>
            <div className="text-white font-bold font-serif text-sm">Volume 55, Issue 3 (September 2026)</div>
            <div className="text-amber-400 font-mono text-[11px]">ISSN: 0301-4975 (Print) / 2224-7750 (Online)</div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-7xl mx-auto mt-8">
          <div className="relative max-w-xl">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder={lang === "en" ? "Search papers by keyword, author, or DOI..." : "শিরোনাম, লেখক বা ডিওআই দিয়ে প্রবন্ধ অনুসন্ধান করুন..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-purple-400"
            />
          </div>
        </div>
      </section>

      {/* Articles Feed */}
      <main className="max-w-7xl mx-auto px-6 py-12 flex-1 w-full space-y-6">
        {filteredArticles.map((art) => {
          const isExpanded = expandedId === art.id;

          return (
            <Card
              key={art.id}
              className="bg-slate-900/60 border border-white/10 hover:border-purple-500/30 transition-all rounded-2xl overflow-hidden shadow-xl"
            >
              <CardContent className="p-6 sm:p-8 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-bold">
                      {art.categoryLabel}
                    </Badge>
                    <span className="text-xs text-slate-400 font-mono">
                      {art.volume}, {art.issue} ({art.year})
                    </span>
                  </div>

                  <span className="text-xs text-amber-400 font-mono">DOI: {art.doi}</span>
                </div>

                <div>
                  <h2 className="text-xl sm:text-2xl font-bold font-serif text-white leading-tight">
                    {lang === "en" ? art.title : art.titleBn}
                  </h2>
                  <div className="text-xs font-semibold text-slate-300 mt-2">{art.authors}</div>
                  <div className="text-[11px] text-slate-400">{art.affiliations}</div>
                </div>

                {/* Abstract Section */}
                <div className="bg-slate-950 p-4 rounded-xl border border-white/5 space-y-2">
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : art.id)}
                    className="w-full flex items-center justify-between text-xs font-bold text-amber-400 hover:text-amber-300"
                  >
                    <span>{lang === "en" ? "Abstract & Findings" : "সারসংক্ষেপ ও ফলাফল"}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {isExpanded && (
                    <p className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-white/5">
                      {lang === "en" ? art.abstractText : art.abstractBn}
                    </p>
                  )}
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <Button
                    onClick={() => alert(`Downloading verified PDF copy for ${art.doi}...`)}
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    {lang === "en" ? "Download Full-Text PDF" : "সম্পূর্ণ প্রবন্ধ (পিডিএফ)"}
                  </Button>

                  <span className="text-[11px] text-slate-500 font-mono">Open Access • CC BY 4.0</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-slate-950 py-10 px-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>© 2026 Road Safety Movement Journal • Standing Committee for Research & Publications</div>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-slate-300 transition-colors">
              {lang === "en" ? "Home" : "মূলপাতা"}
            </Link>
            <Link href="/events" className="hover:text-slate-300 transition-colors">
              {lang === "en" ? "Conferences" : "সম্মেলন"}
            </Link>
            <Link href="/notices" className="hover:text-slate-300 transition-colors">
              {lang === "en" ? "Notices" : "বিজ্ঞপ্তি"}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
