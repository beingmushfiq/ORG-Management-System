"use client";

import React, { useState } from "react";
import {
  Heart,
  ShieldCheck,
  Sparkles,
  Users,
  CheckCircle2,
  Receipt,
} from "lucide-react";
import { Button, Badge, Card, CardContent } from "@org/ui";
import Link from "next/link";

interface CauseItem {
  id: string;
  title: string;
  titleBn: string;
  category: "RELIEF" | "WELFARE" | "HEALTHCARE" | "EDUCATION";
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
    id: "cause-flood-2026",
    title: "Monsoon Flood Emergency Medical Aid & Field Dispensary Fund",
    titleBn: "আকস্মিক বন্যা দুর্গতদের জরুরি ওষুধ ও ভ্রাম্যমাণ মেডিকেল ক্যাম্প তহবিল",
    category: "RELIEF",
    categoryLabel: "Disaster Relief",
    categoryLabelBn: "জরুরি দুর্যোগ ত্রাণ",
    targetPaisa: 500000000n, // 50,00,000 BDT
    raisedPaisa: 384500000n, // 38,45,000 BDT
    donorCount: 428,
    description:
      "Rapid deployment of doctors, emergency intravenous fluids, water purification kits, and life-saving anti-venoms across flooded sub-districts of Feni, Noakhali, and Cumilla.",
    descriptionBn:
      "ফেনী, নোয়াখালী ও কুমিল্লার দুর্গম এলাকায় ভ্রাম্যমাণ মেডিকেল টিম এবং পানি বিশুদ্ধকরণ ওষুধ বিতরণের লক্ষ্যে তহবিল সংগ্রহ।",
    bankAccount: "BMA Relief Fund A/C: 104-120-449102",
    routingNo: "Sonali Bank PLC, High Court Branch",
    isUrgent: true,
  },
  {
    id: "cause-benevolent",
    title: "Benevolent Family Pension Fund for Deceased Physicians' Dependents",
    titleBn: "প্রয়াত চিকিৎসকদের পরিবার ও সন্তানদের স্থায়ী কল্যাণ পেনশন তহবিল",
    category: "WELFARE",
    categoryLabel: "Member Welfare",
    categoryLabelBn: "সদস্য কল্যাণ",
    targetPaisa: 1000000000n, // 1,00,00,000 BDT
    raisedPaisa: 789000000n, // 78,90,000 BDT
    donorCount: 914,
    description:
      "Permanent endowment providing recurring educational stipends and monthly subsistence allowances to the widows and orphan children of late medical colleagues who passed away in active service.",
    descriptionBn:
      "অকালে প্রয়াত সহকর্মীদের সন্তানদের পড়াশোনা ও পরিবারকে নিয়মিত মাসিক সম্মানী অনুদান প্রদান করার স্থায়ী তহবিল।",
    bankAccount: "BMA Benevolent Trust A/C: 002-111-987441",
    routingNo: "Pubali Bank PLC, Topkhana Road",
  },
  {
    id: "cause-child-cancer",
    title: "Pediatric Oncology & Bone Marrow Transplant Subsidies",
    titleBn: "দরিদ্র শিশুদের ক্যান্সার ও অস্থিমজ্জা প্রতিস্থাপন চিকিৎসা সহায়তা",
    category: "HEALTHCARE",
    categoryLabel: "Healthcare Subsidy",
    categoryLabelBn: "চিকিৎসা অনুদান",
    targetPaisa: 300000000n, // 30,00,000 BDT
    raisedPaisa: 142000000n, // 14,20,000 BDT
    donorCount: 205,
    description:
      "Subsidizing costly targeted chemotherapy drugs and HLA testing for underprivileged children admitted to Dhaka Medical College Pediatric Hematology Ward.",
    descriptionBn:
      "ঢাকা মেডিকেল কলেজ হাসপাতালের শিশু হেমাটোলজি ওয়ার্ডে চিকিৎসাধীন দরিদ্র শিশুদের ওষুধ ও টেস্টের খরচ অনুদান।",
    bankAccount: "BMA Child Care Trust A/C: 220-450-112390",
    routingNo: "Islami Bank Bangladesh PLC, VIP Road",
  },
];

const RECENT_DONATIONS = [
  { donor: "Dr. Shah Alam & Family", branch: "Dhaka Central", amount: "৳50,000", time: "12m ago" },
  { donor: "Chattogram Metropolitan Branch Council", branch: "Chattogram", amount: "৳2,50,000", time: "1h ago" },
  { donor: "Anonymous Well-wisher", branch: "Sylhet", amount: "৳10,000", time: "3h ago" },
  { donor: "Dr. Farhana Yasmin", branch: "Rajshahi", amount: "৳25,000", time: "5h ago" },
  { donor: "BMA Khulna District Committee", branch: "Khulna", amount: "৳1,00,000", time: "8h ago" },
];

export default function CausesPage() {
  const [lang, setLang] = useState<"en" | "bn">("en");
  const [selectedCause, setSelectedCause] = useState<CauseItem | null>(null);
  const [donationAmount, setDonationAmount] = useState<number>(5000);
  const [donorName, setDonorName] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [gateway, setGateway] = useState<"BKASH" | "EPS" | "NAGAD" | "SSL">("BKASH");
  const [donationSuccess, setDonationSuccess] = useState(false);

  const handleOpenDonate = (cause: CauseItem) => {
    setSelectedCause(cause);
    setDonationSuccess(false);
  };

  const handleSubmitDonation = (e: React.FormEvent) => {
    e.preventDefault();
    setDonationSuccess(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500/20">
      {/* Navigation Header */}
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-slate-950/85 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center font-black text-slate-950 text-lg shadow-lg"
            >
              BMA
            </Link>
            <div>
              <Link href="/" className="font-bold text-base tracking-tight text-white hover:text-amber-400 transition-colors">
                {lang === "en" ? "Humanitarian & Member Benevolence Funds" : "মানবিক ত্রাণ ও সদস্য কল্যাণ তহবিল"}
              </Link>
              <div className="text-xs text-slate-400 font-bangla">
                {lang === "en" ? "Transparent Philanthropy & Community Support" : "স্বচ্ছ মানবিক অনুদান ও সামাজিক সহায়তা"}
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
            <Link href="/portal/blood-bank">
              <Button size="sm" variant="outline" className="border-red-500/30 text-red-300 hover:bg-red-500/10 text-xs gap-1.5">
                <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                {lang === "en" ? "Blood Donor Network" : "রক্তদাতা নেটওয়ার্ক"}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="relative border-b border-white/10 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            {lang === "en" ? "Audited & Tax-Deductible Under NBR Section 44" : "জাতীয় রাজস্ব বোর্ড (এনবিআর) ধারা ৪৪ অনুমোদিত কর অব্যাহতিপ্রাপ্ত"}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif text-white tracking-tight leading-tight">
            {lang === "en" ? "Humanitarian Appeals & Benevolent Care" : "মানবিক আবেদন ও সদস্য সাহায্য কার্যক্রম"}
          </h1>
          <p className="mt-3 text-slate-400 max-w-2xl text-sm sm:text-base leading-relaxed">
            {lang === "en"
              ? "Every paisa donated is audited by chartered accountants and directly distributed to flood-affected communities and distressed medical families across Bangladesh."
              : "আপনার প্রতিটি অনুদানের অর্থ শতভাগ স্বচ্ছতার সাথে চার্টার্ড অ্যাকাউন্ট্যান্ট দ্বারা নিরীক্ষিত এবং সরাসরি দুর্যোগ কবলিত মানুষ ও অসচ্ছল সহকর্মীদের পরিবারে পৌঁছে দেওয়া হয়।"}
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-900/80 border border-white/10 rounded-xl p-4">
              <div className="text-xs text-slate-400">{lang === "en" ? "Total Mobilized" : "মোট সংগৃহীত"}</div>
              <div className="text-xl sm:text-2xl font-black text-amber-400 font-serif mt-1">৳1,31,55,000</div>
            </div>
            <div className="bg-slate-900/80 border border-white/10 rounded-xl p-4">
              <div className="text-xs text-slate-400">{lang === "en" ? "Total Donors" : "মোট অনুদানকারী"}</div>
              <div className="text-xl sm:text-2xl font-black text-white font-serif mt-1">1,547+</div>
            </div>
            <div className="bg-slate-900/80 border border-white/10 rounded-xl p-4">
              <div className="text-xs text-slate-400">{lang === "en" ? "Medical Camps" : "ক্যাম্প পরিচালিত"}</div>
              <div className="text-xl sm:text-2xl font-black text-emerald-400 font-serif mt-1">42 Camps</div>
            </div>
            <div className="bg-slate-900/80 border border-white/10 rounded-xl p-4">
              <div className="text-xs text-slate-400">{lang === "en" ? "Families Supported" : "উপকৃত পরিবার"}</div>
              <div className="text-xl sm:text-2xl font-black text-white font-serif mt-1">18,200+</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid: Causes Cards & Live Roll of Honor */}
      <main className="max-w-7xl mx-auto px-6 py-12 flex-1 w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 8 Cols: Causes List */}
        <div className="lg:col-span-8 space-y-8">
          {CAUSES_DATA.map((cause) => {
            const targetBDT = Number(cause.targetPaisa / 100n);
            const raisedBDT = Number(cause.raisedPaisa / 100n);
            const percent = Math.min(100, Math.round((raisedBDT / targetBDT) * 100));

            return (
              <Card
                key={cause.id}
                className="bg-slate-900/60 border border-white/10 hover:border-amber-500/40 transition-all rounded-2xl overflow-hidden shadow-xl"
              >
                <CardContent className="p-6 sm:p-8 space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold">
                        {lang === "en" ? cause.categoryLabel : cause.categoryLabelBn}
                      </Badge>
                      {cause.isUrgent && (
                        <Badge className="bg-red-500/20 text-red-300 border border-red-500/30 text-xs font-bold animate-pulse">
                          {lang === "en" ? "CRITICAL APPEAL" : "জরুরি আবেদন"}
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-slate-400 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5" />
                      {cause.donorCount} {lang === "en" ? "contributions" : "টি অনুদান"}
                    </span>
                  </div>

                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white leading-tight">
                      {lang === "en" ? cause.title : cause.titleBn}
                    </h2>
                    <p className="text-slate-300 text-sm leading-relaxed mt-2">
                      {lang === "en" ? cause.description : cause.descriptionBn}
                    </p>
                  </div>

                  {/* Fund Thermometer */}
                  <div className="space-y-2 bg-slate-950/70 p-4 rounded-xl border border-white/5">
                    <div className="flex justify-between text-xs sm:text-sm">
                      <div>
                        <span className="text-slate-400">{lang === "en" ? "Raised: " : "সংগৃহীত: "}</span>
                        <strong className="text-emerald-400 font-serif text-base">৳{raisedBDT.toLocaleString()}</strong>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-400">{lang === "en" ? "Target: " : "লক্ষ্যমাত্রা: "}</span>
                        <strong className="text-white font-serif text-base">৳{targetBDT.toLocaleString()}</strong>
                      </div>
                    </div>

                    <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden border border-white/10">
                      <div
                        className="bg-gradient-to-r from-amber-500 via-emerald-400 to-emerald-300 h-full rounded-full transition-all duration-700"
                        style={{ width: `${percent}%` }}
                      />
                    </div>

                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>{percent}% {lang === "en" ? "achieved" : "অর্জিত"}</span>
                      <span>{lang === "en" ? "Remaining: " : "বাকি: "} ৳{(targetBDT - raisedBDT).toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Action Row */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-white/10">
                    <div className="text-xs text-slate-400">
                      <span className="font-semibold text-slate-300">{cause.bankAccount}</span> • {cause.routingNo}
                    </div>

                    <Button
                      onClick={() => handleOpenDonate(cause)}
                      className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold gap-2 text-xs px-6 py-2.5"
                    >
                      <Heart className="w-3.5 h-3.5 fill-slate-950" />
                      {lang === "en" ? "Contribute to Fund" : "তহবিলে অনুদান দিন"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Right 4 Cols: Live Roll of Honor & Tax Notice */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="bg-slate-900/80 border border-white/10 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold font-serif text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              {lang === "en" ? "Roll of Honor • Recent Donors" : "সম্মাননা তালিকা • সাম্প্রতিক অনুদান"}
            </h3>
            <p className="text-xs text-slate-400">
              {lang === "en"
                ? "Gratefully recognizing the generosity of our constituent branches and philanthropists."
                : "মানবতার সেবায় এগিয়ে আসা সম্মানিত সদস্য ও শাখাসমূহের অবদান।" }
            </p>

            <div className="space-y-3 pt-2">
              {RECENT_DONATIONS.map((d, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-white/5 text-xs">
                  <div>
                    <div className="font-bold text-white">{d.donor}</div>
                    <div className="text-[11px] text-slate-400">{d.branch}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-emerald-400 font-serif">{d.amount}</div>
                    <div className="text-[10px] text-slate-400">{d.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Tax Exemption Card */}
          <Card className="bg-slate-900/80 border border-emerald-500/20 rounded-2xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <Receipt className="w-4 h-4" />
              {lang === "en" ? "NBR Tax Exemption Notice" : "কর অব্যাহতি সংক্রান্ত তথ্য"}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {lang === "en"
                ? "Donations made to the Bangladesh Medical Association Benevolent & Relief Fund qualify for personal and corporate income tax rebate under Section 44, Sub-section (2) of the Income Tax Act 2023. Instant e-receipts with institutional seal are issued upon transaction clearance."
                : "আয়কর আইন ২০২৩ এর ধারা ৪৪(২) অনুযায়ী বিএমএ ত্রাণ ও কল্যাণ তহবিলে প্রদত্ত অনুদান সম্পূর্ণ কর রেয়াতযোগ্য। অনুদান সম্পন্ন হওয়ার সাথে সাথে সিলযুক্ত ডিজিটাল রশিদ প্রদান করা হয়।"}
            </p>
          </Card>
        </div>
      </main>

      {/* Contribution Modal */}
      {selectedCause && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-amber-500/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 animate-in fade-in zoom-in duration-200">
            {!donationSuccess ? (
              <>
                <div className="text-center space-y-1">
                  <Badge className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold">
                    OFFICIAL CHARITABLE RECEIPT
                  </Badge>
                  <h3 className="text-xl font-bold font-serif text-white">
                    {lang === "en" ? "Donate to Humanitarian Fund" : "তহবিলে অনুদান প্রদান"}
                  </h3>
                  <div className="text-xs text-slate-400">{selectedCause.title}</div>
                </div>

                <form onSubmit={handleSubmitDonation} className="space-y-4">
                  {/* Preset Amount Pills */}
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-2">
                      {lang === "en" ? "Select Contribution Amount (BDT)" : "অনুদানের পরিমাণ নির্ধারণ করুন (টাকা)"}
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {[1000, 2500, 5000, 10000].map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => setDonationAmount(amt)}
                          className={`py-2 rounded-xl text-xs font-bold transition-all ${
                            donationAmount === amt
                              ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                              : "bg-slate-950 border border-white/10 text-white hover:border-amber-400/50"
                          }`}
                        >
                          ৳{amt.toLocaleString()}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      {lang === "en" ? "Donor Name or Organization" : "দাতা বা প্রতিষ্ঠানের নাম"}
                    </label>
                    <input
                      type="text"
                      disabled={isAnonymous}
                      placeholder={isAnonymous ? "Anonymous Donor" : "e.g. Dr. Kazi Mostafa"}
                      value={isAnonymous ? "" : donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400 disabled:opacity-50"
                    />
                  </div>

                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="rounded border-white/20 bg-slate-950 text-amber-500 focus:ring-0"
                    />
                    {lang === "en" ? "Keep my donation anonymous on public honor roll" : "সম্মাননা তালিকায় নাম প্রকাশ না করে বেনামে অনুদান দিতে চাই"}
                  </label>

                  {/* Payment Gateway Radio */}
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-2">
                      {lang === "en" ? "Select Payment Channel" : "পেমেন্ট মাধ্যম বেছে নিন"}
                    </label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {[
                        { id: "BKASH", name: "bKash Checkout", sub: "Instant OTP" },
                        { id: "EPS", name: "EPS Net Banking", sub: "BEFTN / NPSB" },
                        { id: "NAGAD", name: "Nagad", sub: "Direct Wallet" },
                        { id: "SSL", name: "Cards / SSLCommerz", sub: "Visa, Mastercard" },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setGateway(item.id as any)}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            gateway === item.id
                              ? "bg-amber-500/10 border-amber-400 text-white font-bold"
                              : "bg-slate-950 border-white/10 text-slate-400 hover:border-white/20"
                          }`}
                        >
                          <div className="text-xs text-white">{item.name}</div>
                          <div className="text-[10px] text-slate-400">{item.sub}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs py-3">
                    {lang === "en" ? `Proceed to Pay ৳${donationAmount.toLocaleString()}` : `৳${donationAmount.toLocaleString()} অনুদান পরিশোধ করুন`}
                  </Button>
                </form>
              </>
            ) : (
              <div className="text-center space-y-4 py-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-serif text-white">
                  {lang === "en" ? "Thank You for Your Benevolence!" : "আপনার মহানুভব অনুদানের জন্য ধন্যবাদ!"}
                </h3>
                <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                  {lang === "en"
                    ? `Your contribution of ৳${donationAmount.toLocaleString()} has been safely debited and credited to ${selectedCause.title}. Official tax receipt has been generated.`
                    : `আপনার ৳${donationAmount.toLocaleString()} টাকার অনুদান সফলভাবে তহবিলে জমা হয়েছে এবং ট্যাক্স রিসিট প্রস্তুত করা হয়েছে।`}
                </p>

                <div className="bg-slate-950 p-4 rounded-xl border border-white/10 text-xs font-mono text-slate-400 space-y-1">
                  <div>RECEIPT NO: BMA-DON-2026-8821</div>
                  <div>TRANSACTION ID: TXN_EPS_992019488</div>
                  <div className="text-emerald-400 font-bold">STATUS: CLEARED (PAISA LEDGER COMMITTED)</div>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    onClick={() => window.print()}
                    variant="outline"
                    className="flex-1 border-white/10 text-xs text-slate-300"
                  >
                    {lang === "en" ? "Download Receipt" : "রশিদ ডাউনলোড"}
                  </Button>
                  <Button
                    onClick={() => setSelectedCause(null)}
                    className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
                  >
                    {lang === "en" ? "Close" : "বন্ধ করুন"}
                  </Button>
                </div>
              </div>
            )}

            {!donationSuccess && (
              <button
                onClick={() => setSelectedCause(null)}
                className="w-full text-center text-xs text-slate-400 hover:text-white transition-colors"
              >
                {lang === "en" ? "Cancel & Return" : "বাতিল করুন"}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-white/10 bg-slate-950 py-10 px-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>© 2026 Bangladesh Medical Association • Standing Committee for Disaster & Member Welfare</div>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-slate-300 transition-colors">
              {lang === "en" ? "Home" : "মূলপাতা"}
            </Link>
            <Link href="/notices" className="hover:text-slate-300 transition-colors">
              {lang === "en" ? "Notices" : "বিজ্ঞপ্তি"}
            </Link>
            <Link href="/events" className="hover:text-slate-300 transition-colors">
              {lang === "en" ? "Conferences" : "সম্মেলন"}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
