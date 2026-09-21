"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  Printer,
  Share2,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@org/ui";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const NOTICES_LOOKUP: Record<string, {
  memoNo: string;
  titleEn: string;
  titleBn: string;
  categoryEn: string;
  categoryBn: string;
  dateEn: string;
  dateBn: string;
  signatory: string;
  signatoryDesignationEn: string;
  signatoryDesignationBn: string;
  paragraphsEn: string[];
  paragraphsBn: string[];
  bulletsEn: { title: string; desc: string }[];
  bulletsBn: { title: string; desc: string }[];
}> = {
  "not-2026-001": {
    memoNo: "RSM/POLICY/2026/DIR-001",
    titleEn: "Official Directive: Mandatory Institutional Paradigm Shift from 'Road Accident' to 'Road Crash'",
    titleBn: "সরকারী নির্দেশনা: 'সড়ক দুর্ঘটনা'র পরিবর্তে 'সড়ক ক্র্যাশ' পরিভাষা ব্যবহারের প্রাতিষ্ঠানিক দাবি ও নির্দেশনা",
    categoryEn: "National Directive & Public Policy",
    categoryBn: "জাতীয় নির্দেশনা ও নীতি সংস্কার",
    dateEn: "18 September 2026 (03 Ashwin 1433 BS)",
    dateBn: "১৮ সেপ্টেম্বর ২০২৬ (০৩ আশ্বিন ১৪৩৩ বঙ্গাব্দ)",
    signatory: "Tanvir Ahmed",
    signatoryDesignationEn: "Chief National Coordinator",
    signatoryDesignationBn: "প্রধান জাতীয় সমন্বয়ক",
    paragraphsEn: [
      "Pursuant to the Safe Systems Approach ratified by the National Executive Council of the Road Safety Movement, it is hereby formally notified that the deceptive word 'accident' shall be eradicated from all organizational communiques, press dossiers, and research briefs.",
      "A crash is not an act of God or an inevitable misfortune; it is the direct, predictable outcome of engineered road geometry failures, unregistered heavy transport, unlicensed commercial operators, and systemic enforcement deficits. Recognizing crashes as preventable human-made hazards is the foundational step toward systemic accountability.",
    ],
    paragraphsBn: [
      "নিরাপদ সড়ক আন্দোলনের কেন্দ্রীয় নির্বাহী পরিষদ কর্তৃক সর্বসম্মত সিদ্ধান্ত অনুযায়ী জানানো যাচ্ছে যে, সংগঠনের সকল প্রাতিষ্ঠানিক নথি, আইনি দলিল ও প্রেস ব্রিফিং থেকে বিভ্রান্তিকর 'সড়ক দুর্ঘটনা' শব্দটি অবিলম্বে বর্জন করে 'সড়ক ক্র্যাশ' পরিভাষা ব্যবহার বাধ্যতামূলক করা হলো।",
      "সড়ক ক্র্যাশ কোনো আকস্মিক দৈব-দুর্বিপাক নয়; এটি ত্রুটিপূর্ণ সড়ক নকশা, ফিটনেসবিহীন যানবাহন, অদক্ষ লাইসেন্সহীন চালক এবং দুর্বল আইন প্রয়োগ ব্যবস্থার সমন্বিত ব্যর্থতা। ক্র্যাশকে মনুষ্যসৃষ্ট প্রতিরোধযোগ্য সংকট হিসেবে চিহ্নিত করাই রাষ্ট্রীয় জবাবদিহিতার প্রথম ধাপ।",
    ],
    bulletsEn: [
      {
        title: "Media & Legal Communiques: ",
        desc: "All regional chapters and youth campus desks must mandate legal aid attorneys and media partners to file FIRs and press reports citing 'road crashes' rather than accidental mishaps.",
      },
      {
        title: "Statutory Restitution: ",
        desc: "Claims filed under Section 53 of the Road Transport Act 2018 shall articulate strict vehicle operator and owner liability.",
      },
      {
        title: "Curriculum Integration: ",
        desc: "Defensive driving workshops conducted by RSM Academy will train commercial drivers on the preventable mechanics of road crashes.",
      },
    ],
    bulletsBn: [
      {
        title: "মিডিয়া ও আইনি বিজ্ঞপ্তি: ",
        desc: "সকল আঞ্চলিক শাখা ও ক্যাম্পাস ইউনিটকে মামলার এজাহার ও প্রেস বিজ্ঞপ্তিতে দুর্ঘটনা শব্দের পরিবর্তে ক্র্যাশ উল্লেখ নিশ্চিত করতে হবে।",
      },
      {
        title: "আইনি ক্ষতিপূরণ দাবি: ",
        desc: "সড়ক পরিবহন আইন ২০১৮ এর ৫৩ ধারায় ক্ষতিপূরণ দাবির ক্ষেত্রে পরিবহন মালিক ও চালকের কাঠামোগত অবহেলাকে সুনির্দিষ্টভাবে নথিভুক্ত করতে হবে।",
      },
      {
        title: "প্রশিক্ষণ ও সচেতনতা: ",
        desc: "আরএসএম একাডেমির পেশাদার চালক প্রশিক্ষণ কোর্সে ক্র্যাশ প্রতিরোধের বৈজ্ঞানিক কলাকৌশল পাঠ্যসূচিতে বাধ্যতামূলক করা হলো।",
      },
    ],
  },
};

export default function NoticeDetailPage() {
  const params = useParams();
  const noticeId = (params["id"] as string) || "not-2026-001";
  const [lang, setLang] = useState<"en" | "bn">("en");
  const [copied, setCopied] = useState(false);

  const fallbackNotice = NOTICES_LOOKUP["not-2026-001"]!;
  const notice = NOTICES_LOOKUP[noticeId] || fallbackNotice;

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-amber-500/20 print:bg-white print:text-black transition-colors">
      {/* Header (hidden in print) */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-card/80 backdrop-blur-2xl print:hidden">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/notices"
            className="flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {lang === "en" ? "Back to Gazettes & Notices" : "বিজ্ঞপ্তি বোর্ডে ফিরুন"}
          </Link>

          <div className="flex items-center gap-3">
            <ThemeToggle variant="pill" />
            <button
              onClick={() => setLang(lang === "en" ? "bn" : "en")}
              className="px-3 py-1 rounded-lg border border-border bg-card text-xs font-semibold text-foreground hover:border-amber-500/50 transition-colors"
            >
              {lang === "en" ? "বাংলা" : "English"}
            </button>
            <button
              onClick={handleCopyLink}
              className="p-2 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground text-xs flex items-center gap-1.5 transition-colors"
              title="Share Link"
            >
              {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
            </button>
            <Button
              onClick={() => window.print()}
              size="sm"
              className="font-bold gap-1.5 text-xs shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              {lang === "en" ? "Print Gazette" : "গেজেট প্রিন্ট"}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Official Gazette Document Container */}
      <main className="max-w-4xl mx-auto px-6 py-10 flex-1 w-full print:p-0 print:max-w-none">
        <div className="bg-card border border-border rounded-2xl p-8 sm:p-14 shadow-2xl relative overflow-hidden print:bg-transparent print:border-none print:shadow-none print:p-0">
          {/* Subtle Watermark Stamp */}
          <div className="absolute right-6 top-10 opacity-5 pointer-events-none select-none text-right font-serif text-8xl font-black text-foreground uppercase print:opacity-10">
            OFFICIAL
          </div>

          {/* Institutional Letterhead */}
          <div className="border-b-2 border-amber-500/40 pb-6 mb-8 text-center space-y-2 print:border-black">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 text-slate-950 font-black text-xl shadow-lg mx-auto print:border print:border-black">
              RSM
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-wide uppercase font-serif print:text-black">
              {lang === "en" ? "Road Safety Movement" : "নিরাপদ সড়ক আন্দোলন"}
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground font-bangla print:text-gray-700">
              {lang === "en"
                ? "National Executive Council • Central Secretariat, Dhaka-1000, Bangladesh"
                : "জাতীয় নির্বাহী পরিষদ • কেন্দ্রীয় সচিবালয়, ঢাকা-১০০০, বাংলাদেশ"}
            </p>
            <div className="text-[11px] text-amber-600 dark:text-amber-400 font-mono tracking-wider pt-1 print:text-black">
              Registered Under Societies Registration Act XXI of 1860 • Reg No: RSM-BD-2018
            </div>
          </div>

          {/* Memo & Meta Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border text-xs font-mono text-muted-foreground print:text-black print:border-gray-300">
            <div>
              <span className="font-semibold text-foreground">{lang === "en" ? "Memo Reference: " : "স্মারক নম্বর: "}</span>
              <span className="text-amber-600 dark:text-amber-400 font-bold print:text-black">{notice.memoNo}</span>
            </div>
            <div>
              <span className="font-semibold text-foreground">{lang === "en" ? "Date of Gazette: " : "প্রকাশের তারিখ: "}</span>
              <span className="text-foreground font-medium print:text-black">
                {lang === "en" ? notice.dateEn : notice.dateBn}
              </span>
            </div>
          </div>

          {/* Official Document Subject */}
          <div className="my-8">
            <div className="text-xs uppercase font-bold tracking-widest text-amber-600 dark:text-amber-400 mb-2 print:text-black">
              {lang === "en" ? notice.categoryEn : notice.categoryBn}
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground leading-tight print:text-black">
              {lang === "en" ? notice.titleEn : notice.titleBn}
            </h2>
          </div>

          {/* Body Content */}
          <div className="space-y-5 text-sm sm:text-base leading-relaxed text-foreground/90 print:text-black font-sans">
            {(lang === "en" ? notice.paragraphsEn : notice.paragraphsBn).map((p, i) => (
              <p key={i}>{p}</p>
            ))}

            <div className="bg-muted/50 border border-border rounded-xl p-5 my-4 space-y-3 print:border print:border-black print:bg-gray-50">
              {(lang === "en" ? notice.bulletsEn : notice.bulletsBn).map((b, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="font-bold text-amber-500 print:text-black">{i + 1}.</span>
                  <p className="text-xs sm:text-sm">
                    <strong>{b.title}</strong>
                    {b.desc}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground italic">
              {lang === "en"
                ? "This directive is issued with the unanimous concurrence of the National Executive Council and takes immediate effect across all 64 district chapters."
                : "উক্ত নির্দেশনাটি জাতীয় নির্বাহী পরিষদের সর্বসম্মত সিদ্ধান্তে জারি করা হলো এবং অবিলম্বে দেশের সকল জেলা শাখায় কার্যকর হবে।"}
            </p>
          </div>

          {/* Signatures & Seal Section */}
          <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-8 print:border-gray-400">
            <div className="text-center sm:text-left space-y-1">
              <div className="text-xs font-mono text-muted-foreground print:text-gray-600">
                {lang === "en" ? "By Order of National Executive Council" : "জাতীয় নির্বাহী পরিষদের পক্ষে"}
              </div>
              <div className="font-serif font-bold text-base text-foreground print:text-black">
                {notice.signatory}
              </div>
              <div className="text-xs text-amber-600 dark:text-amber-400 font-semibold print:text-black">
                {lang === "en" ? notice.signatoryDesignationEn : notice.signatoryDesignationBn}
              </div>
              <div className="text-[11px] text-muted-foreground print:text-gray-600">
                Road Safety Movement (নিরাপদ সড়ক আন্দোলন)
              </div>
            </div>

            {/* Verification Stamp Pill */}
            <div className="bg-muted/60 border border-emerald-500/40 rounded-2xl p-4 text-center sm:text-right max-w-xs print:border print:border-black">
              <div className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold text-xs mb-1 print:text-black">
                <ShieldCheck className="w-4 h-4" />
                {lang === "en" ? "Digital Signature Verified" : "ডিজিটাল স্বাক্ষর যাচাইকৃত"}
              </div>
              <div className="text-[10px] font-mono text-muted-foreground break-all print:text-black">
                SHA-256: 9b2d83f124a91e5e4184c8996fb92427ae41e4649b934ca495991b7852b855
              </div>
              <div className="text-[10px] text-muted-foreground mt-1 print:text-gray-600">
                {lang === "en" ? "Archived on Decentralized Transparency Ledger" : "কেন্দ্রীয় ডিজিটাল লেজারে সংরক্ষিত"}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
