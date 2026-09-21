"use client";

import React, { useState } from "react";
import {
  Heart,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  ArrowLeft,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@org/ui";
import Link from "next/link";
import { OrgLogo } from "@/components/brand/org-logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { soundEffects } from "@/lib/audio-effects";

interface CauseItem {
  id: string;
  title: string;
  titleBn: string;
  category: "BLACKSPOT" | "VICTIM_AID" | "SCHOOL_SAFETY" | "HELMET_DRIVE";
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
    id: "cause-blackspot-420",
    title: "Nationwide 420 Highway Blackspot Elimination & Warning Network",
    titleBn: "সারাদেশে ৪২০টি বিপজ্জনক কালো স্থান সংস্কার ও সতর্কতা সংকেত স্থাপন",
    category: "BLACKSPOT",
    categoryLabel: "Highway Engineering",
    categoryLabelBn: "মহাসড়ক প্রকৌশল",
    targetPaisa: 500000000n, // 50,00,000 BDT
    raisedPaisa: 384500000n, // 38,45,000 BDT
    donorCount: 642,
    description:
      "Direct civic intervention at surveyed high-fatality highway blind spots: installing solar-powered blinkers, high-grade convex mirrors, rumble strips, and illuminated chevron signs across 8 divisions.",
    descriptionBn:
      "৮টি বিভাগের বিপজ্জনক মহাসড়ক ব্লাইন্ড স্পটগুলোতে সোলার ব্লিঙ্কার, কনভেক্স মিরর, রাম্বল স্ট্রিপস এবং রিফ্লেক্টিভ সাইনবোর্ড স্থাপন কর্মসূচি।",
    bankAccount: "Road Safety Movement Blackspot Fund A/C: 104-120-449102",
    routingNo: "Sonali Bank PLC, High Court Branch, Dhaka",
    isUrgent: true,
  },
  {
    id: "cause-victim-emergency",
    title: "Road Crash Victims Emergency Medical Aid & Prosthetic Fund",
    titleBn: "রোড ক্র্যাশে আহতদের জরুরি আইসিইউ চিকিৎসা ও কৃত্রিম অঙ্গ প্রতিস্থাপন তহবিল",
    category: "VICTIM_AID",
    categoryLabel: "Humanitarian Relief",
    categoryLabelBn: "মানবিক চিকিৎসা অনুদান",
    targetPaisa: 1000000000n, // 1,00,00,000 BDT
    raisedPaisa: 812000000n, // 81,20,000 BDT
    donorCount: 1140,
    description:
      "Providing immediate financial grants for life-saving trauma surgeries, prosthetic limbs for amputee survivors, and ongoing legal litigation aid for bereaved families seeking justice.",
    descriptionBn:
      "মারাত্মক ক্র্যাশে আহতদের জরুরি অস্ত্রোপচার, কৃত্রিম হাত-পা প্রতিস্থাপন এবং আইনি লড়াইয়ে সহায়তায় সার্বক্ষণিক ভিকটিম তহবিল।",
    bankAccount: "RSM Victim Support Trust A/C: 002-111-987441",
    routingNo: "Pubali Bank PLC, Central Branch, Dhaka",
    isUrgent: true,
  },
  {
    id: "cause-school-zone",
    title: "Safe School Zones: Raised Speed Tables & Zebra Walkways",
    titleBn: "নিরাপদ স্কুল জোন: স্পিড টেবিল ও হাই-ভিজিবিলিটি জেব্রা ক্রসিং প্রজেক্ট",
    category: "SCHOOL_SAFETY",
    categoryLabel: "Child Protection",
    categoryLabelBn: "শিশু ও শিক্ষার্থী সুরক্ষা",
    targetPaisa: 300000000n, // 30,00,000 BDT
    raisedPaisa: 215000000n, // 21,50,000 BDT
    donorCount: 480,
    description:
      "Constructing raised asphalt speed tables, child-safety guardrails, and thermoplastic reflective pedestrian crosswalks in front of 100 high-risk schools across district highways.",
    descriptionBn:
      "মহাসড়ক সংলগ্ন ১০০টি উচ্চ-ঝুঁকিপূর্ণ শিক্ষা প্রতিষ্ঠানের সামনে স্পিড টেবিল, নিরাপত্তা রেলিং এবং থার্মোপ্লাস্টিক জেব্রা ক্রসিং নির্মাণ।",
    bankAccount: "RSM Child Transit Safety A/C: 220-450-112390",
    routingNo: "Islami Bank Bangladesh PLC, Dhaka",
  },
  {
    id: "cause-helmet-drive",
    title: "National Rider Helmet & Night Reflector Distribution Campaign",
    titleBn: "সার্বজনীন স্ট্যান্ডার্ড হেলমেট ও সাইকেল আরোহীদের রিফ্লেক্টর পোশাক ড্রাইভ",
    category: "HELMET_DRIVE",
    categoryLabel: "Preventative Safety",
    categoryLabelBn: "প্রতিরোধমূলক সুরক্ষা",
    targetPaisa: 200000000n, // 20,00,000 BDT
    raisedPaisa: 145000000n, // 14,50,000 BDT
    donorCount: 390,
    description:
      "Distributing certified safety helmets to rural motorcycle commuters and reflective fluorescent vests to night-time highway pedal cyclists and delivery workers.",
    descriptionBn:
      "গ্রাম ও দূরপাল্লার মহাসড়কে চলাচলকারী বাইকার ও সাইকেল আরোহীদের মাঝে মানসম্মত হেলমেট এবং রাতের রিফ্লেক্টিভ জ্যাকেট বিতরণ।",
    bankAccount: "RSM Protective Gear Drive A/C: 310-900-554120",
    routingNo: "Dutch-Bangla Bank PLC, Karwan Bazar Branch",
  },
];

const RECENT_DONATIONS = [
  { donor: "DU Alumni Road Safety Brigade", branch: "Dhaka Central", amount: "৳50,000", time: "12m ago" },
  { donor: "Chattogram Highway Action Council", branch: "Chattogram", amount: "৳1,50,000", time: "1h ago" },
  { donor: "Anonymous Transport Researcher", branch: "Sylhet", amount: "৳25,000", time: "3h ago" },
  { donor: "Rajshahi University Youth Chapter", branch: "Rajshahi", amount: "৳35,000", time: "5h ago" },
  { donor: "RSM Khulna District Committee", branch: "Khulna", amount: "৳1,00,000", time: "8h ago" },
];

export default function CausesPage() {
  const [lang, setLang] = useState<"en" | "bn">("en");
  const [selectedCause, setSelectedCause] = useState<CauseItem | null>(null);
  const [donationAmount, setDonationAmount] = useState<number>(5000);
  const [donorName, setDonorName] = useState("");
  const [gateway, setGateway] = useState<"BKASH" | "EPS" | "NAGAD" | "SSL">("BKASH");
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
      {/* Navigation Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/">
            <OrgLogo size="md" />
          </Link>

          <div className="flex items-center gap-3">
            <ThemeToggle variant="pill" />
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                soundEffects.playClick(650);
                setLang((prev) => (prev === "en" ? "bn" : "en"));
              }}
              className="text-xs font-semibold border-border bg-card"
            >
              {lang === "en" ? "বাংলা" : "English"}
            </Button>
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-1.5 text-xs font-semibold">
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Header */}
      <section className="py-14 px-6 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
          <Heart className="w-3.5 h-3.5" />
          Transparent Civic Trust & Impact Campaigns
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Active Road Safety Projects & Victim Relief
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mt-3 leading-relaxed">
          Every contribution directly funds physical blackspot warning retrofits, pedestrian zebra crossing construction, emergency medical subsidies for crash survivors, and safety gear distribution.
        </p>
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
                className="p-6 rounded-3xl bg-card border-2 border-border hover:border-amber-500/50 shadow-md transition-all space-y-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-md text-xs font-bold bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30">
                      {cause.categoryLabel}
                    </span>
                    {cause.isUrgent && (
                      <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/30 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        Urgent Priority
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 font-mono">
                    {cause.donorCount} Civic Donors
                  </span>
                </div>

                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                    {cause.title}
                  </h2>
                  <h3 className="text-sm font-bold text-emerald-600 dark:text-emerald-400 font-bangla mt-1">
                    {cause.titleBn}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                    {cause.description}
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-900 dark:text-white font-mono">
                      ৳{raised.toLocaleString()} raised
                    </span>
                    <span className="text-slate-500 dark:text-slate-400 font-mono">
                      Goal: ৳{target.toLocaleString()} ({percent}%)
                    </span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-muted overflow-hidden border border-border">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-border">
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Direct Bank Account: <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{cause.bankAccount}</span>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleOpenDonate(cause)}
                    className="font-bold text-xs gap-1.5 shadow-md w-full sm:w-auto"
                  >
                    <Heart className="w-3.5 h-3.5" />
                    Contribute to Project
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Live Donation Feed & Quick Action */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-card border-2 border-border shadow-md space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Recent Civic Contributions
            </h3>
            <div className="space-y-3">
              {RECENT_DONATIONS.map((d, i) => (
                <div key={i} className="p-3 rounded-xl bg-muted/60 border border-border text-xs flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">{d.donor}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">{d.branch} · {d.time}</div>
                  </div>
                  <span className="font-mono font-extrabold text-emerald-600 dark:text-emerald-400">{d.amount}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-amber-500/10 border-2 border-amber-500/30 text-slate-900 dark:text-white space-y-3">
            <h4 className="font-extrabold text-sm flex items-center gap-1.5 text-amber-700 dark:text-amber-400">
              <ShieldCheck className="w-4 h-4" />
              100% Tax-Exempt & Publicly Audited
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Road Safety Movement operates strictly under transparent civic governance. Detailed quarterly expenditure registers for blackspot engineering and victim disbursement are published openly.
            </p>
          </div>
        </div>
      </section>

      {/* Donation Modal */}
      {selectedCause && (
        <div className="fixed inset-0 z-[10000] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full rounded-3xl bg-card border-2 border-amber-500/50 p-6 shadow-2xl space-y-5 text-foreground">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  Civic Action Contribution
                </span>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mt-1">
                  {selectedCause.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCause(null)}
                className="text-slate-400 hover:text-slate-900 dark:hover:text-white font-bold text-lg"
              >
                ✕
              </button>
            </div>

            {donationSuccess ? (
              <div className="p-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-500 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
                  Thank You for Your Civic Solidarity!
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Your contribution voucher <span className="font-mono font-bold text-amber-500">#RSM-TX-{Date.now().toString().slice(-6)}</span> has been registered. An official receipt has been dispatched.
                </p>
                <Button variant="primary" size="sm" onClick={() => setSelectedCause(null)} className="w-full mt-2 font-bold text-xs">
                  Done
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmitDonation} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Select Contribution Amount (BDT)
                  </label>
                  <div className="grid grid-cols-4 gap-2 mb-2">
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
                            ? "bg-amber-500 text-slate-950 shadow-sm"
                            : "bg-muted border border-border text-foreground"
                        }`}
                      >
                        ৳{amt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Donor Name / Organization
                  </label>
                  <input
                    type="text"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder="Enter your name or keep anonymous"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-muted border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Select Payment Method
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {["BKASH", "NAGAD", "EPS", "SSL"].map((gw) => (
                      <button
                        key={gw}
                        type="button"
                        onClick={() => setGateway(gw as any)}
                        className={`py-2 rounded-xl text-xs font-bold transition-all ${
                          gateway === gw
                            ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm"
                            : "bg-muted border border-border text-foreground"
                        }`}
                      >
                        {gw}
                      </button>
                    ))}
                  </div>
                </div>

                <Button type="submit" variant="primary" size="md" className="w-full font-bold text-xs gap-1.5 shadow-md mt-2">
                  <Heart className="w-3.5 h-3.5" />
                  Confirm Contribution of ৳{donationAmount.toLocaleString()}
                </Button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
