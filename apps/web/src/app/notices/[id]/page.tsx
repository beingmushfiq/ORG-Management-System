"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  Printer,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@org/ui";
import Link from "next/link";
import { useParams } from "next/navigation";
import { InstitutionalHeader } from "@/components/layout/institutional-header";
import { InstitutionalFooter } from "@/components/layout/institutional-footer";

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
  "not-2025-001": {
    memoNo: "NAO/SEC/2025/CIR-01",
    titleEn: "Official Directive: National Agricultural Olympiad 2025 Season 2 & 3 Nationwide Registration Schedule & Guidelines",
    titleBn: "সরকারী নির্দেশনা: জাতীয় কৃষি অলিম্পিয়াড ২০২৫ সিজন ২ ও ৩ নিবন্ধন সময়সূচি ও নির্দেশিকা প্রকাশ",
    categoryEn: "National Directive & Regulation",
    categoryBn: "জাতীয় নির্দেশনা ও পরিপত্র",
    dateEn: "18 September 2026 (03 Ashwin 1433 BS)",
    dateBn: "১৮ সেপ্টেম্বর ২০২৬ (০৩ আশ্বিন ১৪৩৩ বঙ্গাব্দ)",
    signatory: "Prof. Dr. A. K. Azad",
    signatoryDesignationEn: "National Advisory Convener",
    signatoryDesignationBn: "জাতীয় উপদেষ্টা আহ্বায়ক",
    paragraphsEn: [
      "Pursuant to the resolutions ratified by the National Advisory Council of the National Agricultural Olympiad, official registration for Season 2025 is formally declared open for all primary, secondary, and higher secondary educational institutions across Bangladesh.",
      "The competition aims to ignite youthful passion for smart farming technologies, hydroponics, soil biology, climate-smart agriculture, and food system sustainability. Candidates must register through the official portal under the statutory fee of BDT 70.00.",
    ],
    paragraphsBn: [
      "জাতীয় কৃষি অলিম্পিয়াড উপদেষ্টা পরিষদের সিদ্ধান্ত অনুযায়ী দেশব্যাপী ৬৪টি জেলার স্কুল ও কলেজের শিক্ষার্থীদের জন্য ২০২৫ সিজনের আনুষ্ঠানিক নিবন্ধন কার্যক্রম উন্মুক্ত ঘোষণা করা হলো।",
      "এই প্রতিযোগিতার মূল লক্ষ্য হলো ভবিষ্যৎ প্রজন্মকে আধুনিক স্মার্ট কৃষি, মাটিহীন চাষাবাদ, জলবায়ু অভিযোজন এবং খাদ্য সুরক্ষায় দক্ষ করে গড়ে তোলা। নিবন্ধনের জন্য নির্ধারিত ফি ৭০.০০ টাকা (বিডিটি) অনলাইন পেমেন্ট গেটওয়ের মাধ্যমে প্রদেয়।",
    ],
    bulletsEn: [
      {
        title: "Eligibility Tracks: ",
        desc: "Junior Class (Grades 6–8), Secondary Class (Grades 9–10), and Higher Secondary Class (Grades 11–12 & HSC Examinees).",
      },
      {
        title: "Examination Format: ",
        desc: "Division-level screening followed by National Grand Finale at Bangladesh Agricultural University (BAU) Mymensingh.",
      },
      {
        title: "Prize Conferral: ",
        desc: "Champion Laptop, ৳50,000 cash fellowship, research center tours to BARI and BRRI, and certificates of merit.",
      },
    ],
    bulletsBn: [
      {
        title: "অংশগ্রহণের ক্যাটাগরি: ",
        desc: "জুনিয়র শ্রেণি (৬ষ্ঠ-৮ম), মাধ্যমিক শ্রেণি (৯ম-১০ম) এবং উচ্চ মাধ্যমিক শ্রেণি (১১শ-১২শ ও এইচএসসি পরীক্ষার্থী)।",
      },
      {
        title: "পরীক্ষা পদ্ধতি: ",
        desc: "বিভাগীয় বাছাই পরীক্ষা এবং বাংলাদেশ কৃষি বিশ্ববিদ্যালয়ে (বাকৃবি) দ্বিদিসীয় জাতীয় গ্র্যান্ড ফিনালে।",
      },
      {
        title: "পুরস্কার ও ফেলোশিপ: ",
        desc: "চ্যাম্পিয়ন ট্রফি, ল্যাপটপ, নগদ ৫০,০০০ টাকা, ব্রি ও বারি গবেষণা সফর এবং মেধা সনদপত্র।",
      },
    ],
  },
};

export default function NoticeDetailPage() {
  const params = useParams();
  const noticeId = (params?.id as string) || "not-2025-001";
  const [lang, setLang] = useState<"en" | "bn">("en");

  const notice = NOTICES_LOOKUP[noticeId] ?? NOTICES_LOOKUP["not-2025-001"]!;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-amber-500/20 transition-colors">
      {/* Institutional Top Header */}
      <InstitutionalHeader lang={lang} onToggleLang={() => setLang(lang === "en" ? "bn" : "en")} />

      {/* Main Gazette Container */}
      <main className="max-w-4xl mx-auto px-6 py-10 flex-1 w-full space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <Link
            href="/notices"
            className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-emerald-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {lang === "en" ? "Back to Gazettes & Circulars" : "সকল বিজ্ঞপ্তি তালিকায় ফিরুন"}
          </Link>

          <Button
            size="sm"
            variant="outline"
            onClick={() => window.print()}
            className="text-xs font-bold gap-1.5 border-border"
          >
            <Printer className="w-3.5 h-3.5" />
            {lang === "en" ? "Print Gazette" : "গেজেট প্রিন্ট"}
          </Button>
        </div>

        {/* Gazette Sheet */}
        <div className="bg-card border border-border rounded-3xl p-8 sm:p-12 shadow-md space-y-6 print:border-none print:shadow-none print:p-0">
          {/* Official Letterhead */}
          <div className="text-center border-b-2 border-emerald-600/40 pb-6 space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold font-serif tracking-tight text-foreground uppercase">
              {lang === "en" ? "National Agricultural Olympiad" : "জাতীয় কৃষি অলিম্পিয়াড"}
            </h1>
            <p className="text-xs text-muted-foreground">
              National Organizing Secretariat · House 04, Road 12/b, Sector 10, Uttara Model Town, Dhaka
            </p>
            <div className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-bold">
              Trade License: 03247/2023-2025 · Official Gazette Release
            </div>
          </div>

          {/* Memo & Meta */}
          <div className="flex flex-wrap items-center justify-between text-xs font-mono text-muted-foreground border-b border-border/60 pb-3">
            <div>
              <span className="font-bold text-foreground">Memo No:</span> {notice.memoNo}
            </div>
            <div>
              <span className="font-bold text-foreground">Date:</span>{" "}
              {lang === "en" ? notice.dateEn : notice.dateBn}
            </div>
          </div>

          {/* Title */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-700 dark:text-emerald-400">
              {lang === "en" ? notice.categoryEn : notice.categoryBn}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-foreground pt-1 leading-snug">
              {lang === "en" ? notice.titleEn : notice.titleBn}
            </h2>
          </div>

          {/* Paragraphs */}
          <div className="space-y-4 text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {(lang === "en" ? notice.paragraphsEn : notice.paragraphsBn).map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* Key Directives / Bullets */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
              {lang === "en" ? "Key Directives & Terms" : "মূল নির্দেশনাবলী ও শর্তসমূহ"}
            </h3>
            <ul className="space-y-2 text-xs text-muted-foreground">
              {(lang === "en" ? notice.bulletsEn : notice.bulletsBn).map((b, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-foreground">{b.title}</strong>
                    {b.desc}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Signatures */}
          <div className="pt-8 border-t border-border flex justify-end">
            <div className="text-right space-y-1 font-mono text-xs">
              <div className="font-serif font-bold text-foreground text-sm">{notice.signatory}</div>
              <div className="text-muted-foreground">
                {lang === "en" ? notice.signatoryDesignationEn : notice.signatoryDesignationBn}
              </div>
              <div className="text-[10px] text-emerald-600 dark:text-emerald-400">
                National Agricultural Olympiad Secretariat
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Institutional Footer */}
      <InstitutionalFooter lang={lang} />
    </div>
  );
}
