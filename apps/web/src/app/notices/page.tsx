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
import { ThemeToggle } from "@/components/ui/theme-toggle";

interface NoticeItem {
  id: string;
  memoNo: string;
  title: string;
  titleBn: string;
  category: "DIRECTIVE" | "GAZETTE" | "POLICY" | "CIRCULAR" | "PRESS_RELEASE";
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
    id: "not-2026-001",
    memoNo: "RSM/POLICY/2026/DIR-001",
    title: "Official Directive: Mandatory Institutional Paradigm Shift from 'Road Accident' to 'Road Crash'",
    titleBn: "সরকারী নির্দেশনা: 'সড়ক দুর্ঘটনা'র পরিবর্তে 'সড়ক ক্র্যাশ' পরিভাষা ব্যবহারের প্রাতিষ্ঠানিক দাবি ও নির্দেশনা",
    category: "DIRECTIVE",
    categoryLabel: "National Directive",
    categoryLabelBn: "জাতীয় নির্দেশনা",
    publishedAt: "September 18, 2026",
    publishedAtBn: "৩ আশ্বিন ১৪৩৩",
    signatory: "Tanvir Ahmed",
    signatoryDesignation: "Chief National Coordinator",
    summary:
      "Pursuant to the Safe Systems Approach, the National Executive Council mandates all affiliate chapters, legal aid panels, and media partners to eradicate the misleading term 'accident' from official documentation. Crashes are preventable systemic failures of road geometry, vehicle fitness, and regulatory governance.",
    summaryBn:
      "নিরাপদ সড়ক আন্দোলনের নির্বাহী পরিষদের সিদ্ধান্ত অনুযায়ী সকল আঞ্চলিক শাখা ও আইনি সহায়তা প্যানেলে 'দুর্ঘটনা' পরিভাষার পরিবর্তে 'ক্র্যাশ' ব্যবহার বাধ্যতামূলক করা হলো। ক্র্যাশ কোনো নিয়তি বা আকস্মিক ঘটনা নয়, এটি অবকাঠামো ও আইন প্রয়োগের ব্যর্থতা।",
    isUrgent: true,
  },
  {
    id: "not-2026-002",
    memoNo: "RSM/RESEARCH/2026/REP-042",
    title: "National Hazard Index: 420 High-Risk Highway Blackspots Engineering Audit & Blackspot Rectification Charter",
    titleBn: "জাতীয় মহাসড়কের ৪২০টি ঝুঁকিপূর্ণ ব্ল্যাকস্পট জরিপ ও জ্যামিতিক নকশা সংশোধন সংক্রান্ত অডিট রিপোর্ট প্রকাশ",
    category: "GAZETTE",
    categoryLabel: "Official Gazette",
    categoryLabelBn: "অফিসিয়াল গেজেট",
    publishedAt: "September 12, 2026",
    publishedAtBn: "২৭ ভাদ্র ১৪৩৩",
    signatory: "Dr. Kazi Mostafa & BUET Transport Cell",
    signatoryDesignation: "Research Director",
    summary:
      "Comprehensive GIS geospatial audit detailing 420 hazardous collision zones across Dhaka-Chattogram, Dhaka-Sylhet, and N2 Highway corridors. Demanding prompt median installations, rumble strips, and pedestrian overpasses before upcoming national holiday travel seasons.",
    summaryBn:
      "বুয়েট ও ঢাকা বিশ্ববিদ্যালয় রিসার্চ সেলের যৌথ উদ্যোগে ঢাকা-চট্টগ্রাম ও ঢাকা-সিলেট মহাসড়কের ৪২০টি ব্ল্যাকস্পটের ভৌগোলিক সমীক্ষা ও প্রযুক্তিগত প্রতিকার প্রতিবেদন গেজেট আকারে উন্মুক্ত করা হলো।",
  },
  {
    id: "not-2026-003",
    memoNo: "RSM/LEGAL/2026/CIRC-19",
    title: "Executive Circular: Free Legal Aid & Compensation Litigation Panel for Road Crash Bereaved Families",
    titleBn: "নির্বাহী পরিপত্র: সড়ক দুর্ঘটনায় হতাহত ও শহীদ পরিবারগুলোর জন্য বিনামূল্যে লিগ্যাল এইড ও ক্ষতিপূরণ মামলা সেল",
    category: "CIRCULAR",
    categoryLabel: "Welfare Circular",
    categoryLabelBn: "আইনি সহায়তা পরিপত্র",
    publishedAt: "August 28, 2026",
    publishedAtBn: "১২ ভাদ্র ১৪৩৩",
    signatory: "Barrister Rafiqul Islam",
    signatoryDesignation: "Head of Legal Affairs",
    summary:
      "Mobilization of the Section 53 Financial Assistance Fund under Road Transport Act 2018. The Central Secretariat establishes rapid-response legal teams in all 8 administrative divisions to assist crash victims in securing statutory restitution from transport insurers.",
    summaryBn:
      "সড়ক পরিবহন আইন ২০১৮ এর ৫৩ ধারা অনুযায়ী গঠিত ট্রাস্টি বোর্ডের আর্থিক সহায়তা দ্রুততম সময়ে ক্ষতিগ্রস্থ পরিবারের নিকট পৌঁছে দিতে ৮টি বিভাগীয় লিগ্যাল এইড ডেস্ক চালু করা হয়েছে।",
  },
  {
    id: "not-2026-004",
    memoNo: "RSM/VOL/2026/ACT-088",
    title: "Student Safety Brigades Mobilization for Nationwide School-Zone Zebra Crossing Re-Marking Campaign",
    titleBn: "সারাদেশের শিক্ষা প্রতিষ্ঠানের সামনে ছাত্র ট্রাফিক ব্রিগেড গঠন ও জেব্রা ক্রসিং অঙ্কন কর্মসূচি",
    category: "PRESS_RELEASE",
    categoryLabel: "Youth Action",
    categoryLabelBn: "ছাত্র কর্মসূচি",
    publishedAt: "August 10, 2026",
    publishedAtBn: "২৫ শ্রাবণ ১৪৩৩",
    signatory: "Sadia Rahman",
    signatoryDesignation: "Youth Chapter Coordinator",
    summary:
      "Deployment of 9,000+ student volunteers across 82 campus and district chapters to paint reflective high-visibility zebra stripes and conduct pedestrian speed-limit awareness drives in front of 500+ primary schools and colleges.",
    summaryBn:
      "দেশের ৮২টি ক্যাম্পাস ও জেলা ইউনিটের ৯,০০০+ স্বেচ্ছাসেবীর মাধ্যমে ৫ শতাধিক শিক্ষা প্রতিষ্ঠানের সামনে আধুনিক থার্মোপ্লাস্টিক জেব্রা ক্রসিং তৈরি ও ট্রাফিক সচেতনতা ক্যাম্পেইনের সময়সূচী।",
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
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-amber-500/20 transition-colors">
      {/* Top Bar Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-card/80 backdrop-blur-2xl transition-colors">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center font-black text-slate-950 text-base shadow-md shrink-0"
            >
              RSM
            </Link>
            <div>
              <Link href="/" className="font-bold text-base tracking-tight text-foreground hover:text-amber-500 transition-colors">
                {lang === "en" ? "Official Gazettes & Notice Board" : "অফিসিয়াল গেজেট ও নোটিশ বোর্ড"}
              </Link>
              <div className="text-xs text-muted-foreground font-bangla">
                {lang === "en" ? "Road Safety Movement • National Secretariat Archive" : "নিরাপদ সড়ক আন্দোলন • কেন্দ্রীয় সচিবালয় ও নথিপত্র"}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle variant="pill" />
            <button
              onClick={() => setLang(lang === "en" ? "bn" : "en")}
              className="px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-semibold text-foreground hover:border-amber-500/50 transition-colors"
            >
              {lang === "en" ? "বাংলা সংস্করণ" : "English Version"}
            </button>
            <Link href="/portal">
              <Button size="sm" variant="outline" className="border-amber-500/40 text-foreground hover:bg-amber-500/10 text-xs">
                {lang === "en" ? "Portal Login" : "লগইন"}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Banner with Official Seal Accent */}
      <section className="relative border-b border-border bg-muted/20 py-12 sm:py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-semibold mb-3">
                <ShieldCheck className="w-3.5 h-3.5" />
                {lang === "en" ? "Officially Authenticated Digital Gazettes" : "ডিজিটালভাবে সত্যায়িত সরকারী নোটিশ ও গেজেট"}
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
                {lang === "en" ? "Secretariat Circulars & Directives" : "সচিবালয় বিজ্ঞপ্তি, পরিপত্র ও নীতি গেজেট"}
              </h1>
              <p className="mt-3 text-muted-foreground max-w-2xl text-sm sm:text-base leading-relaxed">
                {lang === "en"
                  ? "Access authoritative directives, crash audit reports, legislative submissions, and public policy gazettes issued under the seal of the National Executive Council."
                  : "জাতীয় নির্বাহী পরিষদ কর্তৃক ঘোষিত সকল প্রশাসনিক সিদ্ধান্ত, ব্ল্যাকস্পট অডিট রিপোর্ট, সড়ক আইন বাস্তবায়ন নোটিশ এবং নীতি গেজেটের প্রামাণিক ডিজিটাল সংগ্রহশালা।"}
              </p>
            </div>

            {/* Quick Action Button */}
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link href="/portal/communications">
                <Button className="font-bold gap-2 text-xs shadow-md">
                  <Sparkles className="w-3.5 h-3.5" />
                  {lang === "en" ? "Subscribe for Alerts" : "বিজ্ঞপ্তির অ্যালার্ট চালু করুন"}
                </Button>
              </Link>
            </div>
          </div>

          {/* Search & Category Filter Bar */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-7 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder={
                  lang === "en"
                    ? "Search notices by memo number, title, or keyword..."
                    : "স্মারক নং, শিরোনাম বা বিষয়বস্তু দিয়ে অনুসন্ধান করুন..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-amber-500 transition-colors shadow-sm"
              />
            </div>

            <div className="lg:col-span-5 flex flex-wrap gap-2 items-center">
              {[
                { key: "ALL", labelEn: "All Notices", labelBn: "সকল" },
                { key: "DIRECTIVE", labelEn: "Directives", labelBn: "নির্দেশনা" },
                { key: "GAZETTE", labelEn: "Gazettes", labelBn: "গেজেট" },
                { key: "CIRCULAR", labelEn: "Circulars", labelBn: "পরিপত্র" },
                { key: "PRESS_RELEASE", labelEn: "Youth Action", labelBn: "ছাত্র কর্মসূচি" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setSelectedCategory(tab.key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedCategory === tab.key
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-card border border-border text-muted-foreground hover:text-foreground"
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
      <main className="max-w-7xl mx-auto px-6 py-10 flex-1 w-full">
        {filteredNotices.length === 0 ? (
          <div className="text-center py-20 bg-card rounded-2xl border border-border">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <div className="text-lg font-bold text-foreground">
              {lang === "en" ? "No notices found matching your criteria" : "আপনার অনুসন্ধানের সাথে মিলিয়ে কোনো নোটিশ পাওয়া যায়নি"}
            </div>
            <p className="text-muted-foreground text-xs mt-1">
              {lang === "en" ? "Try clearing search filters or search for another term." : "অনুসন্ধানের শব্দ পরিবর্তন করে পুনরায় চেষ্টা করুন।"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredNotices.map((notice) => (
              <Card
                key={notice.id}
                className="bg-card border border-border hover:border-amber-500/40 transition-all duration-300 rounded-2xl overflow-hidden group shadow-md"
              >
                <CardContent className="p-6 sm:p-7">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                    <div className="flex-1 space-y-2.5">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <Badge className="bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30 text-[11px] font-semibold">
                          {lang === "en" ? notice.categoryLabel : notice.categoryLabelBn}
                        </Badge>
                        {notice.isUrgent && (
                          <Badge className="bg-red-500/15 text-red-700 dark:text-red-400 border border-red-500/30 text-[11px] font-bold animate-pulse">
                            {lang === "en" ? "URGENT ACTION" : "জরুরি করণীয়"}
                          </Badge>
                        )}
                        <span className="text-xs font-mono text-muted-foreground bg-muted px-2.5 py-0.5 rounded-md border border-border">
                          {notice.memoNo}
                        </span>
                      </div>

                      <h2 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-amber-500 transition-colors leading-snug">
                        <Link href={`/notices/${notice.id}`}>
                          {lang === "en" ? notice.title : notice.titleBn}
                        </Link>
                      </h2>

                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {lang === "en" ? notice.summary : notice.summaryBn}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-2 border-t border-border">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-amber-500" />
                          <span>{lang === "en" ? notice.publishedAt : notice.publishedAtBn}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Building className="w-3.5 h-3.5 text-muted-foreground" />
                          <span>
                            {notice.signatory} ({notice.signatoryDesignation})
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex lg:flex-col items-center sm:items-end justify-end gap-3 pt-4 lg:pt-0 shrink-0">
                      <Link href={`/notices/${notice.id}`} className="w-full sm:w-auto">
                        <Button className="w-full gap-2 text-xs font-semibold">
                          {lang === "en" ? "Read Gazette" : "সম্পূর্ণ পড়ুন"}
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                      <button
                        onClick={() => window.print()}
                        className="px-3 py-2 rounded-lg bg-muted border border-border text-muted-foreground hover:text-foreground hover:border-amber-500/40 transition-colors text-xs flex items-center gap-1.5"
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
      <footer className="border-t border-border bg-card py-8 px-6 text-center text-xs text-muted-foreground">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © 2026 Road Safety Movement (নিরাপদ সড়ক আন্দোলন). Official Publication under Societies Registration Act XXI of 1860.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-foreground transition-colors">
              {lang === "en" ? "Home" : "মূলপাতা"}
            </Link>
            <Link href="/events" className="hover:text-foreground transition-colors">
              {lang === "en" ? "Campaigns" : "ক্যাম্পেইন"}
            </Link>
            <Link href="/causes" className="hover:text-foreground transition-colors">
              {lang === "en" ? "Victim Relief" : "মানবিক তহবিল"}
            </Link>
            <Link href="/gallery" className="hover:text-foreground transition-colors">
              {lang === "en" ? "Historical Archive" : "আর্কাইভ"}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
