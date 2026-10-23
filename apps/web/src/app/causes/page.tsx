"use client";

import React, { useState } from "react";
import {
  Heart,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@org/ui";
import Link from "next/link";
import { InstitutionalHeader } from "@/components/layout/institutional-header";
import { InstitutionalFooter } from "@/components/layout/institutional-footer";
import { soundEffects } from "@/lib/audio-effects";

interface CauseItem {
  id: string;
  title: string;
  titleBn: string;
  category: "AGRI_LABS" | "YOUTH_GRANTS" | "FELLOWSHIPS" | "SCHOLARSHIPS";
  categoryLabel: string;
  categoryLabelBn: string;
  targetPaisa: bigint;
  raisedPaisa: bigint;
  donorCount: number;
  description: string;
  descriptionBn: string;
  bankAccount: string;
  routingNo: string;
  isUrgent?: boolean;
}

const CAUSES_DATA: CauseItem[] = [
  {
    id: "cause-school-agrolabs",
    title: "Nationwide High School Smart-Agro Labs & Hydroponics Kits",
    titleBn: "সারাদেশে মাধ্যমিক বিদ্যালয়ে স্মার্ট এগ্রো-ল্যাব ও হাইড্রোপনিক্স কিট স্থাপন",
    category: "AGRI_LABS",
    categoryLabel: "School Innovation",
    categoryLabelBn: "বিদ্যালয় উদ্ভাবন",
    targetPaisa: 500000000n, // 50,00,000 BDT
    raisedPaisa: 384500000n, // 38,45,000 BDT
    donorCount: 642,
    description:
      "Deploying soilless hydroponics units, soil testing kits, and IoT moisture sensors across 100 rural high schools to inspire practical agricultural science from grade 6 to 10.",
    descriptionBn:
      "১০০টি গ্রামীণ বিদ্যালয়ে সয়েল টেস্টিং কিট, হাইড্রোপনিক্স ইউনিট এবং আইওটি আর্দ্রতা সেন্সর সমৃদ্ধ মিনি-এগ্রো ল্যাব স্থাপন প্রকল্প।",
    bankAccount: "Agricultural Olympiad Youth Innovation Fund A/C: 104-120-449102",
    routingNo: "Sonali Bank PLC, Uttara Model Town Branch, Dhaka",
    isUrgent: true,
  },
  {
    id: "cause-climate-grants",
    title: "Youth Climate-Resilience & Agro-Biotechnology Research Grants",
    titleBn: "জলবায়ু সহনশীল কৃষি উদ্ভাবন ও বায়োটেকনোলজি যুব গবেষণা অনুদান",
    category: "YOUTH_GRANTS",
    categoryLabel: "Climate Action",
    categoryLabelBn: "জলবায়ু ও জীবপ্রযুক্তি",
    targetPaisa: 1000000000n, // 1,00,00,000 BDT
    raisedPaisa: 812000000n, // 81,20,000 BDT
    donorCount: 1140,
    description:
      "Awarding competitive seed funding to college and university students researching drought-resistant seeds, saline agriculture in coastal belts, and biological pest control.",
    descriptionBn:
      "উপকূলীয় লবণাক্ততা ও খরা সহনশীল জাত উদ্ভাবন এবং পরিবেশবান্ধব বালাইনাশক গবেষণায় তরুণ গবেষকদের সিড ফান্ডিং প্রদান।",
    bankAccount: "National Agricultural Olympiad Trust A/C: 002-111-987441",
    routingNo: "Pubali Bank PLC, Central Branch, Dhaka",
    isUrgent: true,
  },
  {
    id: "cause-university-fellowships",
    title: "Undergraduate Fellowships for Agricultural University Students",
    titleBn: "কৃষি বিশ্ববিদ্যালয়ের স্নাতক শিক্ষার্থীদের জন্য উচ্চতর গবেষণা ফেলোশিপ",
    category: "FELLOWSHIPS",
    categoryLabel: "Higher Education",
    categoryLabelBn: "উচ্চশিক্ষা ফেলোশিপ",
    targetPaisa: 300000000n, // 30,00,000 BDT
    raisedPaisa: 215000000n, // 21,50,000 BDT
    donorCount: 480,
    description:
      "Full academic travel and stipend grants for undergraduate researchers from BAU, BSMRAU, SAU, and PSTU conducting field trials in remote farming communities.",
    descriptionBn:
      "বাকৃবি, ইকরিমবি, সিকৃবি ও পটুয়াখালী বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয়ের শিক্ষার্থীদের মাঠপর্যায়ের গবেষণা ও ভ্রমণের জন্য ফেলোশিপ বৃত্তি।",
    bankAccount: "NAO Academic Fellowship Fund A/C: 220-450-112390",
    routingNo: "Islami Bank Bangladesh PLC, Uttara Branch, Dhaka",
  },
  {
    id: "cause-marginalized-scholarship",
    title: "Marginalized Farmer-Child Olympiad Participation & Travel Sponsorship",
    titleBn: "প্রান্তিক কৃষক পরিবারের সন্তানদের অলিম্পিয়াড অংশগ্রহণ ও ভ্রমণ সহায়তা তহবিল",
    category: "SCHOLARSHIPS",
    categoryLabel: "Equal Opportunity",
    categoryLabelBn: "সমঅধিকার ও সামাজিক অন্তর্ভুক্তি",
    targetPaisa: 200000000n, // 20,00,000 BDT
    raisedPaisa: 145000000n, // 14,50,000 BDT
    donorCount: 390,
    description:
      "Covering registration fees (BDT 70), regional travel, exam kits, and lodging at Bangladesh Agricultural University for promising children of smallholder farming families.",
    descriptionBn:
      "প্রান্তিক কৃষক পরিবারের মেধাবী সন্তানদের বিনামূল্যে অলিম্পিয়াড নিবন্ধন, বিভাগীয় ভ্রমণ এবং জাতীয় ফিনালেতে থাকা-খাওয়ার সম্পূর্ণ ব্যয় বহন।",
    bankAccount: "NAO Marginalized Student Fund A/C: 310-900-554120",
    routingNo: "Dutch-Bangla Bank PLC, Uttara Model Town Branch, Dhaka",
  },
];

const RECENT_DONATIONS = [
  { donor: "BAU Alumni Agriculturists Guild", branch: "Mymensingh", amount: "৳50,000", time: "12m ago" },
  { donor: "Chattogram Agro-Exporters Association", branch: "Chattogram", amount: "৳1,50,000", time: "1h ago" },
  { donor: "Anonymous Plant Breeder", branch: "Dhaka HQ", amount: "৳25,000", time: "3h ago" },
  { donor: "Sylhet Agricultural University Youth Cell", branch: "Sylhet", amount: "৳35,000", time: "5h ago" },
  { donor: "Barishal Coastal Farmers Collective", branch: "Barishal", amount: "৳1,00,000", time: "8h ago" },
];

export default function CausesPage() {
  const [lang, setLang] = useState<"en" | "bn">("en");
  const [selectedCause, setSelectedCause] = useState<CauseItem | null>(null);
  const [donationAmount, setDonationAmount] = useState<number>(5000);
  const [donorName, setDonorName] = useState("");
  const [gateway, setGateway] = useState<"BKASH" | "NAGAD" | "EPS" | "SSL">("SSL");
  const [donationSuccess, setDonationSuccess] = useState(false);

  const handleOpenDonate = (cause: CauseItem) => {
    soundEffects.playClick(600);
    setSelectedCause(cause);
    setDonationSuccess(false);
  };

  const handleSubmitDonation = (e: React.FormEvent) => {
    e.preventDefault();
    soundEffects.playRatification();
    setDonationSuccess(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col transition-colors duration-200">
      {/* Institutional Top Header */}
      <InstitutionalHeader lang={lang} onToggleLang={() => setLang(lang === "en" ? "bn" : "en")} />

      {/* Hero Header */}
      <section className="py-14 px-6 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
          <Heart className="w-3.5 h-3.5 text-amber-500" />
          {lang === "en" ? "HopeNest Impact Campaigns · 100% Transparent Trust" : "হোপনেস্ট ইমপ্যাক্ট ক্যাম্পেইন · শতভাগ স্বচ্ছতা"}
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight font-serif">
          {lang === "en" ? "Youth Agricultural Innovation Funds & Sponsorships" : "কৃষি উদ্ভাবন তহবিল ও শিক্ষার্থী সহায়তা প্রকল্প"}
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto mt-3 leading-relaxed">
          {lang === "en"
            ? "Your contribution directly finances high school science kits, climate resilience research fellowships, and full travel sponsorships for children of marginalized farming families across Bangladesh."
            : "আপনার প্রতিটি অনুদান সরাসরি গ্রামীণ স্কুলে স্মার্ট এগ্রো-ল্যাব স্থাপন, তরুণদের জলবায়ু কৃষি গবেষণা এবং প্রান্তিক কৃষকের সন্তানদের জাতীয় অলিম্পিয়াড অংশগ্রহণে ব্যবহৃত হয়।"}
        </p>

        {/* Statutory Compliance Mention */}
        <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs font-mono">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Statutory Registered · Trade License: 03247/2023-2025 · Prices Denominated in BDT (৳)</span>
        </div>
      </section>

      {/* Main Causes Grid */}
      <section className="pb-20 px-6 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Causes Cards */}
        <div className="lg:col-span-8 space-y-6">
          {CAUSES_DATA.map((cause) => {
            const raised = Number(cause.raisedPaisa) / 100;
            const target = Number(cause.targetPaisa) / 100;
            const percent = Math.min(100, Math.round((raised / target) * 100));

            return (
              <div
                key={cause.id}
                className="p-6 rounded-3xl bg-card border-2 border-border hover:border-emerald-500/50 shadow-md transition-all space-y-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-md text-xs font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
                      {lang === "en" ? cause.categoryLabel : cause.categoryLabelBn}
                    </span>
                    {cause.isUrgent && (
                      <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-amber-600" />
                        {lang === "en" ? "Season 2025 Priority" : "সিজন ২০২৫ অগ্রাধিকার"}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-semibold text-muted-foreground font-mono">
                    {cause.donorCount} {lang === "en" ? "Patron Donors" : "দাতা সদস্য"}
                  </span>
                </div>

                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-foreground font-serif">
                    {lang === "en" ? cause.title : cause.titleBn}
                  </h2>
                  <h3 className="text-sm font-bold text-emerald-600 dark:text-emerald-400 font-bangla mt-1">
                    {lang === "en" ? cause.titleBn : cause.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
                    {lang === "en" ? cause.description : cause.descriptionBn}
                  </p>
                </div>

                {/* HopeNest Progress Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold font-mono">
                    <span className="text-foreground">
                      ৳{raised.toLocaleString()} BDT raised
                    </span>
                    <span className="text-muted-foreground">
                      Goal: ৳{target.toLocaleString()} BDT ({percent}%)
                    </span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-muted overflow-hidden border border-border">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-600 to-amber-500 rounded-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-border">
                  <div className="text-xs text-muted-foreground">
                    Bank Account: <span className="font-mono font-bold text-foreground">{cause.bankAccount}</span>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleOpenDonate(cause)}
                    className="font-bold text-xs gap-1.5 shadow-md w-full sm:w-auto bg-[#0F5132] hover:bg-[#0c4028] text-white"
                  >
                    <Heart className="w-3.5 h-3.5 text-amber-400" />
                    {lang === "en" ? "Contribute in BDT" : "বিডিটি অনুদান দিন"}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right 4 Cols: Live Impact & Recent Patrons */}
        <div className="lg:col-span-4 space-y-6">
          {/* Statutory Trust Card */}
          <div className="p-6 rounded-3xl bg-card border border-border space-y-4">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
              <ShieldCheck className="w-5 h-5" />
              <span>National Governance Trust</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              National Agricultural Olympiad operates strictly under transparent civic governance. Detailed quarterly expenditure registers for lab kit distribution and student sponsorships are audited annually.
            </p>
            <div className="text-[11px] font-mono text-muted-foreground border-t border-border pt-3">
              Trade License: <span className="font-bold text-foreground">03247/2023-2025</span>
              <br />
              Secretariat: House 04, Road 12/b, Sector 10, Uttara Model Town, Dhaka
            </div>
          </div>

          {/* Recent Contributions Ticker */}
          <div className="p-6 rounded-3xl bg-card border border-border space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Recent Benefactors (BDT)
            </h3>
            <div className="space-y-3">
              {RECENT_DONATIONS.map((d, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs pb-2 border-b border-border/50 last:border-0 last:pb-0">
                  <div>
                    <div className="font-semibold text-foreground">{d.donor}</div>
                    <div className="text-[10px] text-muted-foreground">{d.branch} · {d.time}</div>
                  </div>
                  <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{d.amount}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Direct WhatsApp Contact */}
          <div className="p-6 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-950 dark:text-emerald-200 space-y-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
              Institutional / CSR Partnerships
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Agri-businesses, universities, and philanthropic foundations interested in sponsoring an entire district round or endowed medals may contact our Secretariat directly.
            </p>
            <div className="pt-1 text-xs font-mono font-bold text-emerald-700 dark:text-emerald-300">
              Hotline & WhatsApp: +880 1717-395047
            </div>
          </div>
        </div>
      </section>

      {/* Donation Modal */}
      {selectedCause && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5 animate-in fade-in zoom-in duration-200 text-card-foreground">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-700 dark:text-emerald-400">
                  OFFICIAL BDT CONTRIBUTION
                </span>
                <h3 className="text-lg font-bold font-serif text-foreground mt-1">
                  {selectedCause.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCause(null)}
                className="text-muted-foreground hover:text-foreground text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            {donationSuccess ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-foreground">Contribution Pledged Successfully!</h4>
                <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
                  Thank you for empowering future agriculturists of Bangladesh. An automated money receipt has been reserved under your reference.
                </p>
                <div className="p-3 rounded-xl bg-muted text-xs font-mono">
                  Pledged: <span className="font-bold text-emerald-600 dark:text-emerald-400">৳{donationAmount.toLocaleString()} BDT</span>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setSelectedCause(null)}
                  className="font-bold text-xs mt-2"
                >
                  Return to Impact Campaigns
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmitDonation} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-foreground block mb-1">
                    Select Contribution Amount (BDT ৳)
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[1000, 2500, 5000, 10000].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => {
                          soundEffects.playClick(600);
                          setDonationAmount(amt);
                        }}
                        className={`py-2 rounded-xl text-xs font-bold font-mono transition-all ${
                          donationAmount === amt
                            ? "bg-emerald-600 text-white shadow-sm"
                            : "bg-muted border border-border text-foreground hover:bg-muted/80"
                        }`}
                      >
                        ৳{amt.toLocaleString()}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-foreground block mb-1">
                    Benefactor Name / Organization
                  </label>
                  <input
                    type="text"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder="Enter your name or organization (or anonymous)"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-foreground block mb-1">
                    Payment Gateway (Bangladesh Bank Compliant)
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {["SSL", "BKASH", "NAGAD", "EPS"].map((gw) => (
                      <button
                        key={gw}
                        type="button"
                        onClick={() => setGateway(gw as any)}
                        className={`py-2 rounded-xl text-xs font-bold transition-all ${
                          gateway === gw
                            ? "bg-[#0F5132] text-white shadow-sm"
                            : "bg-muted border border-border text-foreground hover:bg-muted/80"
                        }`}
                      >
                        {gw === "SSL" ? "SSLCommerz" : gw}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-muted/40 border border-border text-[11px] text-muted-foreground leading-relaxed">
                  By confirming, you agree to the{" "}
                  <Link href="/terms-condition" target="_blank" className="text-emerald-600 hover:underline font-semibold">
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link href="/refund-policy" target="_blank" className="text-emerald-600 hover:underline font-semibold">
                    Refund Policy
                  </Link>
                  . All funds are charged in Bangladeshi Taka (BDT).
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="w-full font-bold text-xs gap-1.5 shadow-md mt-2 bg-[#0F5132] hover:bg-[#0c4028] text-white"
                >
                  <Heart className="w-3.5 h-3.5 text-amber-400" />
                  Confirm Contribution of ৳{donationAmount.toLocaleString()} BDT
                </Button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Institutional Footer */}
      <InstitutionalFooter lang={lang} />
    </div>
  );
}
