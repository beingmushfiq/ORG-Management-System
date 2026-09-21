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

export default function NoticeDetailPage() {
  const [lang, setLang] = useState<"en" | "bn">("en");
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500/20 print:bg-white print:text-black">
      {/* Header (hidden in print) */}
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-slate-950/85 backdrop-blur-2xl print:hidden">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/notices"
            className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-amber-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {lang === "en" ? "Back to Notice Board" : "বিজ্ঞপ্তি বোর্ডে ফিরুন"}
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === "en" ? "bn" : "en")}
              className="px-3 py-1 rounded-lg border border-white/10 text-xs font-semibold hover:border-amber-400/50 transition-colors"
            >
              {lang === "en" ? "বাংলা" : "English"}
            </button>
            <button
              onClick={handleCopyLink}
              className="p-2 rounded-lg border border-white/10 text-slate-300 hover:text-white text-xs flex items-center gap-1.5 transition-colors"
              title="Share Link"
            >
              {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>
            <Button
              onClick={() => window.print()}
              size="sm"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold gap-1.5 text-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              {lang === "en" ? "Print Gazette" : "গেজেট প্রিন্ট"}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Official Gazette Document Container */}
      <main className="max-w-4xl mx-auto px-6 py-10 flex-1 w-full print:p-0 print:max-w-none">
        <div className="bg-slate-900/70 border border-white/10 rounded-2xl p-8 sm:p-14 shadow-2xl relative overflow-hidden print:bg-transparent print:border-none print:shadow-none print:p-0">
          {/* Subtle Watermark Stamp */}
          <div className="absolute right-6 top-10 opacity-5 pointer-events-none select-none text-right font-serif text-8xl font-black text-white uppercase print:opacity-10">
            OFFICIAL
          </div>

          {/* Institutional Letterhead */}
          <div className="border-b-2 border-amber-500/40 pb-6 mb-8 text-center space-y-2 print:border-black">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 text-slate-950 font-black text-2xl shadow-xl mx-auto print:border print:border-black">
              BMA
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide uppercase font-serif print:text-black">
              {lang === "en"
                ? "Bangladesh Medical Association"
                : "বাংলাদেশ মেডিকেল এসোসিয়েশন"}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-bangla print:text-gray-700">
              {lang === "en"
                ? "Central Executive Council • BMA Bhaban, 15/2 Topkhana Road, Dhaka-1000"
                : "কেন্দ্রীয় সচিবালয় • বিএমএ ভবন, ১৫/২ তোপখানা রোড, ঢাকা-১০০০"}
            </p>
            <div className="text-[11px] text-amber-400 font-mono tracking-wider pt-1 print:text-black">
              Registered Under Societies Registration Act XXI of 1860 • Reg No: S-1048
            </div>
          </div>

          {/* Memo & Meta Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 text-xs font-mono text-slate-400 print:text-black print:border-gray-300">
            <div>
              <span className="text-slate-300 font-semibold">{lang === "en" ? "Memo Reference: " : "স্মারক নম্বর: "}</span>
              <span className="text-amber-400 font-bold print:text-black">BMA/CENTRAL/2026/SEC-DIR-088</span>
            </div>
            <div>
              <span className="text-slate-300 font-semibold">{lang === "en" ? "Date of Gazette: " : "প্রকাশের তারিখ: "}</span>
              <span className="text-white font-medium print:text-black">
                {lang === "en" ? "18 September 2026 (03 Ashwin 1433 BS)" : "১৮ সেপ্টেম্বর ২০২৬ (০৩ আশ্বিন ১৪৩৩ বঙ্গাব্দ)"}
              </span>
            </div>
          </div>

          {/* Official Document Subject */}
          <div className="my-8">
            <div className="text-xs uppercase font-bold tracking-widest text-amber-400 mb-2 print:text-black">
              {lang === "en" ? "Official Notification & Circular" : "বিজ্ঞপ্তি ও নির্দেশনামা"}
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight print:text-black">
              {lang === "en"
                ? "Schedule, Voter Enrolment and Delegate Nomination Directive for the 74th National Annual General Meeting (AGM) 2026"
                : "৭৪তম জাতীয় বার্ষিক সাধারণ সভা (এজিএম) ২০২৬ এর সময়সূচী, ভোটার তালিকা প্রকাশ এবং প্রতিনিধি মনোনয়ন সংক্রান্ত নির্দেশিকা"}
            </h2>
          </div>

          {/* Body Content */}
          <div className="space-y-5 text-sm sm:text-base leading-relaxed text-slate-200 print:text-black font-sans">
            <p>
              {lang === "en"
                ? "It is hereby notified for the general information of all registered Life Members, General Members, and Constituent Divisional/District Branch Councils that pursuant to Article 14, Clause (b) of the Bangladesh Medical Association Constitution, the 74th Annual General Meeting (AGM) of the Association will be held on Friday, 6th November 2026 at the Bangabandhu International Conference Centre (BICC), Sher-e-Bangla Nagar, Dhaka."
                : "বাংলাদেশ মেডিকেল এসোসিয়েশনের গঠনতন্ত্রের ১৪ নং অনুচ্ছেদের (খ) উপধারা অনুযায়ী সর্বসাধারণ সদস্য ও সকল জেলা/বিভাগীয় শাখার সদয় অবগতির জন্য জানানো যাচ্ছে যে, এসোসিয়েশনের আগামী ৭৪তম বার্ষিক সাধারণ সভা (এজিএম) আগামী ৬ই নভেম্বর ২০২৬, রোজ শুক্রবার বঙ্গবন্ধু আন্তর্জাতিক সম্মেলন কেন্দ্রে (বিআইসিসি) অনুষ্ঠিত হবে।"}
            </p>

            <p>
              {lang === "en"
                ? "The Central Executive Council has ratified the following mandatory deadlines and protocol guidelines:"
                : "উক্ত সাধারণ সভা সুচারুরূপে সম্পাদনের নিমিত্তে কেন্দ্রীয় নির্বাহী পরিষদ নিম্নোক্ত নির্দেশনা ও সময়সূচী সর্বসম্মতভাবে অনুমোদন করেছে:"}
            </p>

            <div className="bg-slate-950/80 border border-white/10 rounded-xl p-5 my-4 space-y-3 print:border print:border-black print:bg-gray-50">
              <div className="flex items-start gap-3">
                <span className="font-bold text-amber-400 print:text-black">১.</span>
                <p className="text-xs sm:text-sm">
                  <strong>{lang === "en" ? "Branch Voter Register Cutoff: " : "শাখা ভোটার তালিকা চূড়ান্তকরণ: "}</strong>
                  {lang === "en"
                    ? "All branches must submit their audited member registers with verified subscriptions up to FY 2025-2026 no later than 5:00 PM on 15th October 2026 via the Central SaaS Management Portal."
                    : "সকল শাখাকে তাদের হালনাগাদ সদস্য তালিকা এবং ২০২৫-২০২৬ অর্থ বছরের চাঁদা পরিশোধের প্রমাণপত্র আগামী ১৫ অক্টোবর ২০২৬ বিকাল ৫টার মধ্যে সেন্ট্রাল পোর্টালে আপলোড করতে হবে।"}
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="font-bold text-amber-400 print:text-black">২.</span>
                <p className="text-xs sm:text-sm">
                  <strong>{lang === "en" ? "Delegate Accreditation & QR Pass: " : "প্রতিনিধি পাস ও কিউআর অ্যাক্রিডিটেশন: "}</strong>
                  {lang === "en"
                    ? "Physical attendance at the AGM plenary and luncheon requires the Digital Conference Pass generated from the official portal. No proxy delegate admission shall be entertained at the gate."
                    : "সাধারণ সভায় উপস্থিতির জন্য কেন্দ্রীয় পোর্টাল থেকে সংগৃহীত ডিজিটাল কিউআর সম্মেলন পাস আবশ্যক। কোনো প্রক্সি বা অননুমোদিত প্রতিনিধি গেটে প্রবেশাধিকার পাবেন না।"}
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="font-bold text-amber-400 print:text-black">৩.</span>
                <p className="text-xs sm:text-sm">
                  <strong>{lang === "en" ? "Resolutions & Constitutional Amendments: " : "প্রস্তাবনা ও গঠনতন্ত্র সংশোধনী: "}</strong>
                  {lang === "en"
                    ? "Any formal resolutions or constitutional amendments proposed by branch councils must be filed with the General Secretary before 20th October 2026."
                    : "শাখা পরিষদ কর্তৃক উত্থাপিত যে কোনো প্রস্তাব বা গঠনতান্ত্রিক সংশোধনীর নোটিশ আগামী ২০ অক্টোবর ২০২৬ এর মধ্যে মহাসচিব বরাবর প্রেরণ করতে হবে।"}
                </p>
              </div>
            </div>

            <p>
              {lang === "en"
                ? "All distinguished members are cordially invited to take note of the schedule and register their conference attendance through the online portal."
                : "সম্মানিত সকল সদস্য ও শাখাসমূহকে নির্ধারিত সময়সূচী অনুযায়ী প্রয়োজনীয় কার্যক্রম সম্পন্নের বিনীত অনুরোধ জানানো হচ্ছে।"}
            </p>
          </div>

          {/* Signatures & Seal Section */}
          <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-8 print:border-gray-400">
            <div className="text-center sm:text-left space-y-1">
              <div className="text-xs font-mono text-slate-400 print:text-gray-600">
                {lang === "en" ? "By Order of Central Executive Council" : "কেন্দ্রীয় নির্বাহী পরিষদের পক্ষে"}
              </div>
              <div className="font-serif font-bold text-base text-white print:text-black">
                Dr. Kazi Mostafa
              </div>
              <div className="text-xs text-amber-400 print:text-black">
                {lang === "en" ? "Honorary General Secretary" : "মহাসচিব"}
              </div>
              <div className="text-[11px] text-slate-400 print:text-gray-600">
                Bangladesh Medical Association
              </div>
            </div>

            {/* Verification Stamp Pill */}
            <div className="bg-slate-950 border border-emerald-500/30 rounded-2xl p-4 text-center sm:text-right max-w-xs print:border print:border-black">
              <div className="inline-flex items-center gap-1.5 text-emerald-400 font-bold text-xs mb-1 print:text-black">
                <ShieldCheck className="w-4 h-4" />
                {lang === "en" ? "Digital Signature Verified" : "ডিজিটাল স্বাক্ষর যাচাইকৃত"}
              </div>
              <div className="text-[10px] font-mono text-slate-400 break-all print:text-black">
                SHA-256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
              </div>
              <div className="text-[10px] text-slate-400 mt-1 print:text-gray-600">
                {lang === "en" ? "Issued & Timestamped on Blockchain Registry" : "কেন্দ্রীয় ডিজিটাল লেজারে সংরক্ষিত"}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
