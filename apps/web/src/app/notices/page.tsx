"use client";

import React, { useState } from "react";
import {
  FileText,
  Search,
  Calendar,
  Building,
  ArrowRight,
  ShieldCheck,
  Printer,
  Sparkles,
} from "lucide-react";
import { Button, Badge, Card, CardContent } from "@org/ui";
import Link from "next/link";

interface NoticeItem {
  id: string;
  memoNo: string;
  title: string;
  titleBn: string;
  category: "DIRECTIVE" | "GAZETTE" | "ELECTION" | "CIRCULAR" | "PRESS_RELEASE";
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
    id: "not-2026-004",
    memoNo: "BMA/CENTRAL/2026/SEC-DIR-088",
    title: "Official Gazette: Schedule and Delegate Nomination for 74th Annual General Meeting (AGM)",
    titleBn: "সরকারী গেজেট: ৭৪তম বার্ষিক সাধারণ সভার (এজিএম) সময়সূচী ও প্রতিনিধি মনোনয়ন বিজ্ঞপ্তি",
    category: "GAZETTE",
    categoryLabel: "Official Gazette",
    categoryLabelBn: "অফিসিয়াল গেজেট",
    publishedAt: "September 18, 2026",
    publishedAtBn: "৩ আশ্বিন ১৪৩৩",
    signatory: "Dr. Kazi Mostafa",
    signatoryDesignation: "Honorary General Secretary",
    summary:
      "Under Section 14 of the Constitution, the Central Executive Council hereby announces the 74th National AGM to be convened at Bangabandhu International Conference Centre (BICC). All constituent branch councils must submit verified voter rosters before October 15, 2026.",
    summaryBn:
      "সংবিধানের ১৪ নং ধারা মোতাবেক কেন্দ্রীয় নির্বাহী পরিষদ আগামী ৭৪তম জাতীয় সাধারণ সভার তারিখ ঘোষণা করছে। সকল অধিভুক্ত শাখা পরিষদকে আগামী ১৫ অক্টোবরের মধ্যে অনুমোদিত ভোটার তালিকা জমা দেওয়ার অনুরোধ করা হলো।",
    isUrgent: true,
  },
  {
    id: "not-2026-003",
    memoNo: "BMA/ELEC/2026/CIRC-02",
    title: "Election Commission Notification: Preliminary Voter List Publication for Biennial Election 2026-2028",
    titleBn: "নির্বাচন কমিশন বিজ্ঞপ্তি: দ্বি-বার্ষিক নির্বাচন ২০২৬-২০২৮ এর প্রাথমিক ভোটার তালিকা প্রকাশ",
    category: "ELECTION",
    categoryLabel: "Election Commission",
    categoryLabelBn: "নির্বাচন কমিশন",
    publishedAt: "September 10, 2026",
    publishedAtBn: "২৫ ভাদ্র ১৪৩৩",
    signatory: "Prof. Dr. M. A. Jalil",
    signatoryDesignation: "Chief Election Commissioner",
    summary:
      "The Election Commission publishes the preliminary voter roll for general and life members across 64 districts. Claims and objections must be lodged through the digital portal or in person with prescribed fee by September 28, 2026.",
    summaryBn:
      "৬৪ জেলার সকল সাধারণ ও আজীবন সদস্যদের প্রাথমিক ভোটার তালিকা প্রকাশ করা হলো। কোনো দাবি বা আপত্তি থাকলে আগামী ২৮ সেপ্টেম্বরের মধ্যে ডিজিটাল পোর্টাল বা স্বশরীরে আবেদন করতে হবে।",
  },
  {
    id: "not-2026-002",
    memoNo: "BMA/WELFARE/2026/CIR-19",
    title: "Executive Circular: Benevolent Fund Grant Disbursement for Monsoon Flood Relief (Feni & Noakhali)",
    titleBn: "নির্বাহী পরিপত্র: ফেনী ও নোয়াখালীতে বন্যা দুর্গতদের স্বাস্থ্যসেবা ও কল্যাণ তহবিল অনুদান বণ্টন",
    category: "DIRECTIVE",
    categoryLabel: "Executive Directive",
    categoryLabelBn: "নির্বাহী আদেশ",
    publishedAt: "August 24, 2026",
    publishedAtBn: "৯ ভাদ্র ১৪৩৩",
    signatory: "Dr. Shahina Sultana",
    signatoryDesignation: "Secretary of Social Welfare",
    summary:
      "Mobilization of emergency medical supplies, water purification tablets, and member humanitarian assistance. Direct subsidy of BDT 15,00,000 sanctioned for mobile clinics in devastated sub-districts.",
    summaryBn:
      "বন্যা কবলিত এলাকায় জরুরি ওষুধ, পানি বিশুদ্ধকরণ ট্যাবলেট এবং সদস্য মানবিক সহায়তা বিতরণের লক্ষ্যে ১৫,০০,০০০ টাকার জরুরি ত্রাণ তহবিল অনুমোদন করা হয়েছে।",
  },
  {
    id: "not-2026-001",
    memoNo: "BMA/FIN/2026/ANN-01",
    title: "Annual Membership Subscription Renewal and Grace Period Notice for FY 2026-2027",
    titleBn: "২০২৬-২০২৭ অর্থ বছরের বার্ষিক সদস্যপদ নবায়ন ফি এবং গ্রেস পিরিয়ড সংক্রান্ত বিজ্ঞপ্তি",
    category: "CIRCULAR",
    categoryLabel: "Secretariat Circular",
    categoryLabelBn: "সচিবালয় বিজ্ঞপ্তি",
    publishedAt: "July 01, 2026",
    publishedAtBn: "১৭ আষাঢ় ১৪৩৩",
    signatory: "Dr. Ahmed Reza",
    signatoryDesignation: "Treasurer",
    summary:
      "All active and associate members are notified to clear their annual subscriptions via digital payment (EPS, bKash, Nagad) before the 60-day grace period expires to preserve voting eligibility in upcoming regional ballots.",
    summaryBn:
      "সকল সক্রিয় ও সহযোগী সদস্যদের জানানো যাচ্ছে যে, ডিজিটাল গেটওয়ে (ইপিএস, বিকাশ, নগদ) মারফত বার্ষিক নবায়ন ফি জমা দিয়ে ভোটাধিকার সুরক্ষিত রাখুন।",
  },
];

export default function NoticeBoardPage() {
  const [lang, setLang] = useState<"en" | "bn">("en");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNotices = NOTICES_DATA.filter((notice) => {
    const matchesCategory = selectedCategory === "ALL" || notice.category === selectedCategory;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      notice.title.toLowerCase().includes(query) ||
      notice.titleBn.includes(query) ||
      notice.memoNo.toLowerCase().includes(query) ||
      notice.summary.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500/20">
      {/* Top Bar Header */}
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-slate-950/85 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center font-black text-slate-950 text-lg shadow-lg">
              BMA
            </Link>
            <div>
              <Link href="/" className="font-bold text-base tracking-tight text-white hover:text-amber-400 transition-colors">
                {lang === "en" ? "Official Notice Board & Gazettes" : "অফিসিয়াল নোটিশ বোর্ড ও গেজেট"}
              </Link>
              <div className="text-xs text-slate-400 font-bangla">
                {lang === "en" ? "Bangladesh Medical Association • Secretariat Archive" : "বাংলাদেশ মেডিকেল এসোসিয়েশন • কেন্দ্রীয় সচিবালয় নথিপত্র"}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setLang(lang === "en" ? "bn" : "en")}
              className="px-3 py-1.5 rounded-lg border border-white/10 text-xs font-semibold hover:border-amber-400/50 transition-colors"
            >
              {lang === "en" ? "বাংলা সংস্করণ" : "English Version"}
            </button>
            <Link href="/portal">
              <Button size="sm" variant="outline" className="border-amber-500/30 text-amber-300 hover:bg-amber-500/10 text-xs">
                {lang === "en" ? "Member Portal" : "সদস্য পোর্টাল"}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Banner with Official Seal Accent */}
      <section className="relative border-b border-white/10 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium mb-4">
                <ShieldCheck className="w-3.5 h-3.5" />
                {lang === "en" ? "Officially Authenticated Digital Gazettes" : "ডিজিটালভাবে সত্যায়িত সরকারী নোটিশ ও গেজেট"}
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-serif">
                {lang === "en" ? "Secretariat Circulars & Notifications" : "সচিবালয় বিজ্ঞপ্তি ও সাধারণ গেজেট সমূহ"}
              </h1>
              <p className="mt-3 text-slate-400 max-w-2xl text-sm sm:text-base leading-relaxed">
                {lang === "en"
                  ? "Access authoritative directives, AGM schedules, voter gazettes, and executive resolutions issued under the seal of the Central Executive Council."
                  : "কেন্দ্রীয় নির্বাহী পরিষদ ও নির্বাচন কমিশন কর্তৃক ঘোষিত সকল প্রশাসনিক সিদ্ধান্ত, ভোটার তালিকা, বার্ষিক সাধারণ সভার গেজেট এবং নোটিশের প্রামাণিক সংগ্রহশালা।"}
              </p>
            </div>

            {/* Quick Action Button for Gazette Subscription */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/portal/communications">
                <Button className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold gap-2 text-xs">
                  <Sparkles className="w-3.5 h-3.5" />
                  {lang === "en" ? "Subscribe via SMS / Email" : "এসএমএস বা ইমেইলে নোটিশ পান"}
                </Button>
              </Link>
            </div>
          </div>

          {/* Search & Category Filter Bar */}
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-7 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder={
                  lang === "en"
                    ? "Search notices by memo number, title, or keyword..."
                    : "স্মারক নং, শিরোনাম বা বিষয়বস্তু দিয়ে অনুসন্ধান করুন..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            <div className="lg:col-span-5 flex flex-wrap gap-2 items-center">
              {[
                { key: "ALL", labelEn: "All Notices", labelBn: "সকল" },
                { key: "GAZETTE", labelEn: "Gazettes", labelBn: "গেজেট" },
                { key: "ELECTION", labelEn: "Elections", labelBn: "নির্বাচন" },
                { key: "DIRECTIVE", labelEn: "Directives", labelBn: "আদেশ" },
                { key: "CIRCULAR", labelEn: "Circulars", labelBn: "পরিপত্র" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setSelectedCategory(tab.key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedCategory === tab.key
                      ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                      : "bg-slate-900 border border-white/10 text-slate-400 hover:text-white"
                  }`}
                >
                  {lang === "en" ? tab.labelEn : tab.labelBn}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Notices Feed */}
      <main className="max-w-7xl mx-auto px-6 py-12 flex-1 w-full">
        {filteredNotices.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/40 rounded-2xl border border-white/5">
            <FileText className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <div className="text-lg font-bold text-slate-300">
              {lang === "en" ? "No notices found matching your criteria" : "আপনার অনুসন্ধানের সাথে মিলিয়ে কোনো নোটিশ পাওয়া যায়নি"}
            </div>
            <p className="text-slate-500 text-xs mt-1">
              {lang === "en" ? "Try clearing search filters or search for another term." : "অনুসন্ধানের শব্দ পরিবর্তন করে পুনরায় চেষ্টা করুন।"}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredNotices.map((notice) => (
              <Card
                key={notice.id}
                className="bg-slate-900/60 border border-white/10 hover:border-amber-500/40 transition-all duration-300 rounded-2xl overflow-hidden group shadow-lg"
              >
                <CardContent className="p-6 sm:p-8">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <Badge className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-semibold">
                          {lang === "en" ? notice.categoryLabel : notice.categoryLabelBn}
                        </Badge>
                        {notice.isUrgent && (
                          <Badge className="bg-red-500/20 text-red-300 border border-red-500/30 text-[11px] font-bold animate-pulse">
                            {lang === "en" ? "URGENT ACTION" : "জরুরি করণীয়"}
                          </Badge>
                        )}
                        <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-md border border-white/5">
                          {notice.memoNo}
                        </span>
                      </div>

                      <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-amber-400 transition-colors font-serif leading-snug">
                        <Link href={`/notices/${notice.id}`}>
                          {lang === "en" ? notice.title : notice.titleBn}
                        </Link>
                      </h2>

                      <p className="text-slate-300 text-sm leading-relaxed">
                        {lang === "en" ? notice.summary : notice.summaryBn}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2 border-t border-white/5">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-amber-400" />
                          <span>{lang === "en" ? notice.publishedAt : notice.publishedAtBn}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Building className="w-3.5 h-3.5 text-slate-400" />
                          <span>
                            {notice.signatory} ({notice.signatoryDesignation})
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex lg:flex-col items-center sm:items-end justify-end gap-3 pt-4 lg:pt-0">
                      <Link href={`/notices/${notice.id}`} className="w-full sm:w-auto">
                        <Button className="w-full bg-slate-800 hover:bg-slate-700 text-white border border-white/10 gap-2 text-xs font-medium">
                          {lang === "en" ? "Read Notice" : "সম্পূর্ণ পড়ুন"}
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                      <button
                        onClick={() => window.print()}
                        className="px-3 py-2 rounded-lg bg-slate-950 border border-white/10 text-slate-300 hover:text-white hover:border-white/20 transition-colors text-xs flex items-center gap-1.5"
                        title={lang === "en" ? "Print Gazette" : "প্রিন্ট করুন"}
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">{lang === "en" ? "Print" : "প্রিন্ট"}</span>
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-slate-950 py-10 px-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © 2026 Bangladesh Medical Association. Official Publication under Societies Registration Act XXI of 1860.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-slate-300 transition-colors">
              {lang === "en" ? "Home" : "মূলপাতা"}
            </Link>
            <Link href="/events" className="hover:text-slate-300 transition-colors">
              {lang === "en" ? "Conferences" : "সম্মেলন"}
            </Link>
            <Link href="/causes" className="hover:text-slate-300 transition-colors">
              {lang === "en" ? "Humanitarian Causes" : "মানবিক তহবিল"}
            </Link>
            <Link href="/gallery" className="hover:text-slate-300 transition-colors">
              {lang === "en" ? "Photo Archive" : "ফটো গ্যালারি"}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
