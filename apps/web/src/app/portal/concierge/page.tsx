"use client";

import React, { useState } from "react";
import {
  FileText,
  Download,
  ShieldCheck,
  ArrowLeft,
  Sparkles,
  QrCode,
  Printer,
} from "lucide-react";
import { Button, Badge, Card, CardContent } from "@org/ui";
import Link from "next/link";

export default function MemberConciergePage() {
  const [lang, setLang] = useState<"en" | "bn">("en");
  const [showGoodStandingModal, setShowGoodStandingModal] = useState(false);
  const [showTaxModal, setShowTaxModal] = useState(false);
  const [chamberSaved, setChamberSaved] = useState(false);

  // Chamber State
  const [hospital, setHospital] = useState("Chattogram Metropolitan Hospital");
  const [roomNo, setRoomNo] = useState("Room 402, 4th Floor");
  const [visitingHours, setVisitingHours] = useState("5:00 PM - 9:00 PM (Sat - Thu)");
  const [phone, setPhone] = useState("01819-112233");

  const handleSaveChamber = (e: React.FormEvent) => {
    e.preventDefault();
    setChamberSaved(true);
    setTimeout(() => setChamberSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500/20">
      {/* Top Header */}
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-slate-950/85 backdrop-blur-2xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/portal"
              className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {lang === "en" ? "Back to Member Portal" : "পোর্টাল ড্যাশবোর্ডে ফিরুন"}
            </Link>
            <div className="h-4 w-[1px] bg-white/10 hidden sm:block" />
            <div className="text-xs font-bold text-white">
              {lang === "en" ? "Fast-Track Member Concierge Desk" : "সদস্য ডিজিটাল সেবা ও সনদ ডেস্ক"}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === "en" ? "bn" : "en")}
              className="px-3 py-1 rounded-lg border border-white/10 text-xs font-semibold hover:border-amber-400/50 transition-colors"
            >
              {lang === "en" ? "বাংলা" : "English"}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Header */}
      <section className="relative border-b border-white/10 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <Badge className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold mb-3">
            INSTANT VERIFIABLE CREDENTIAL SERVICES
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-white tracking-tight leading-tight">
            {lang === "en" ? "Fast-Track Member Services & Official Certificates" : "অনলাইন সেবা ও তাৎক্ষণিক সনদপত্র সংগ্রহ"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            {lang === "en"
              ? "Download cryptographically authenticated Certificates of Good Standing, NBR Income Tax deduction summaries, or register your hospital practice hours with zero administrative friction."
              : "কোনো প্রকার ভোগান্তি ছাড়াই চারিত্রিক ও পেশাগত সনদ, আয়কর রেয়াত প্রত্যয়নপত্র এবং চেম্বার তথ্য হালনাগাদ করুন।"}
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <main className="max-w-6xl mx-auto px-6 py-10 flex-1 w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 7 Cols: Instant Certificates */}
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-xl font-bold font-serif text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            {lang === "en" ? "Instant Institutional Certificates" : "তাৎক্ষণিক প্রাতিষ্ঠানিক সনদপত্র"}
          </h2>

          {/* Good Standing Certificate Card */}
          <Card className="bg-slate-900/70 border border-white/10 hover:border-amber-500/40 transition-all rounded-2xl p-6 shadow-xl">
            <CardContent className="p-0 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-serif text-white">
                      {lang === "en" ? "Certificate of Good Standing" : "চারিত্রিক ও পেশাগত প্রশংসাপত্র"}
                    </h3>
                    <div className="text-xs text-slate-400 font-bangla">
                      {lang === "en" ? "For Foreign Fellowships, Visa & BMDC" : "বিদেশি ফেলোশিপ, কর্মসংস্থান ও বিএমডিসি সনদ"}
                    </div>
                  </div>
                </div>

                <Badge className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                  ELIGIBLE
                </Badge>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {lang === "en"
                  ? "Formally certifies your active general membership, verified BMDC registration, and clean ethical standing under the seal of the Honorary General Secretary."
                  : "আপনার সদস্যপদের সক্রিয়তা, বিএমডিসি সনদ এবং নৈতিক স্বচ্ছতা নিশ্চিত করে মহাসচিবের সিলযুক্ত অফিশিয়াল সনদ।"}
              </p>

              <div className="pt-2 flex items-center justify-between border-t border-white/5 text-xs">
                <span className="text-slate-400 font-mono">Format: Signed PDF with QR Hash</span>
                <Button
                  onClick={() => setShowGoodStandingModal(true)}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  {lang === "en" ? "Generate & Download" : "সনদ গ্রহণ করুন"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tax Deduction Certificate Card */}
          <Card className="bg-slate-900/70 border border-white/10 hover:border-emerald-500/40 transition-all rounded-2xl p-6 shadow-xl">
            <CardContent className="p-0 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-inner">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-serif text-white">
                      {lang === "en" ? "NBR Tax Rebate Certificate (FY 2026-2027)" : "আয়কর রেয়াত প্রত্যয়নপত্র (২০২৬-২০২৭)"}
                    </h3>
                    <div className="text-xs text-slate-400 font-bangla">
                      {lang === "en" ? "Section 44(2) of Income Tax Act 2023" : "আয়কর আইন ২০২৩ এর ধারা ৪৪(২)"}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-bold font-mono text-emerald-400">৳30,000.00</div>
                  <div className="text-[10px] text-slate-400">Total Deductible</div>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {lang === "en"
                  ? "Aggregates all annual subscription dues and benevolent disaster donations into a certified tax statement ready for submission to the National Board of Revenue."
                  : "বাৎসরিক চাঁদা ও মানবিক তহবিলে প্রদত্ত অনুদানের সম্পূর্ণ নিরীক্ষিত স্টেটমেন্ট যা জাতীয় রাজস্ব বোর্ডে দাখিলযোগ্য।"}
              </p>

              <div className="pt-2 flex items-center justify-between border-t border-white/5 text-xs">
                <span className="text-slate-400 font-mono">Deduction Ref: NBR-BMA-TAX-8821</span>
                <Button
                  onClick={() => setShowTaxModal(true)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  {lang === "en" ? "Download Tax Certificate" : "ট্যাক্স সনদপত্র"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right 5 Cols: Chamber Directory Registrar */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="bg-slate-900/90 border border-white/10 rounded-2xl p-6 shadow-xl space-y-4">
            <div>
              <Badge className="bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[10px] font-bold mb-1">
                PATIENT DIRECTORY
              </Badge>
              <h3 className="text-lg font-bold font-serif text-white">
                {lang === "en" ? "Chamber & Practice Hours" : "চেম্বার ও রোগী দেখার সময়সূচী"}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {lang === "en"
                  ? "Keep your clinical practice schedule updated for patient referrals across the republic."
                  : "হাসপাতাল ও চেম্বারের তথ্য হালনাগাদ রাখুন যাতে সাধারণ মানুষ সেবা গ্রহণ করতে পারেন।"}
              </p>
            </div>

            <form onSubmit={handleSaveChamber} className="space-y-3.5 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Hospital / Clinic Name</label>
                <input
                  type="text"
                  required
                  value={hospital}
                  onChange={(e) => setHospital(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Room / Floor Number</label>
                <input
                  type="text"
                  required
                  value={roomNo}
                  onChange={(e) => setRoomNo(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Visiting Hours</label>
                <input
                  type="text"
                  required
                  value={visitingHours}
                  onChange={(e) => setVisitingHours(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Appointment Phone</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs py-2.5">
                {chamberSaved ? "Saved Successfully! (সংরক্ষিত)" : "Update Chamber Directory"}
              </Button>
            </form>
          </Card>
        </div>
      </main>

      {/* Good Standing Modal Preview */}
      {showGoodStandingModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-amber-500/40 rounded-3xl p-6 sm:p-10 max-w-lg w-full shadow-2xl space-y-6 animate-in fade-in zoom-in duration-200">
            <div className="text-center space-y-1">
              <Badge className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-bold">
                OFFICIAL CERTIFICATE
              </Badge>
              <h3 className="text-xl font-bold font-serif text-white">Certificate of Good Standing</h3>
              <div className="text-xs text-slate-400">Bangladesh Medical Association • Central Secretariat</div>
            </div>

            <div className="bg-slate-950 border border-white/10 rounded-2xl p-6 text-xs space-y-3 font-sans">
              <div className="flex justify-between border-b border-white/10 pb-2 font-mono text-[11px]">
                <span className="text-slate-400">CERT NO: CERT-GS-2026-08821</span>
                <span className="text-amber-400 font-bold">VALID: 1 YEAR</span>
              </div>

              <p className="text-slate-200 leading-relaxed">
                This is to certify that <strong>Dr. Kazi Mostafa</strong>, holder of BMDC Registration No. <strong>A-39481</strong> and Life Membership No. <strong>BMA-DHK-1004</strong>, is a registered member in good standing of the Bangladesh Medical Association.
              </p>

              <p className="text-slate-300 leading-relaxed text-[11px]">
                There are no disciplinary or ethical proceedings pending against him under our institutional bylaws.
              </p>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px]">
                <div>
                  <div className="font-bold text-white">Dr. Kazi Mostafa</div>
                  <div className="text-slate-400">Honorary General Secretary</div>
                </div>
                <div className="w-16 h-16 bg-white p-1 rounded-lg flex items-center justify-center">
                  <QrCode className="w-full h-full text-slate-950" />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => window.print()}
                variant="outline"
                className="flex-1 border-white/10 text-xs text-slate-300"
              >
                <Printer className="w-3.5 h-3.5 mr-1.5" />
                Print Certificate
              </Button>
              <Button
                onClick={() => setShowGoodStandingModal(false)}
                className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
              >
                Done
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Tax Certificate Modal Preview */}
      {showTaxModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-emerald-500/40 rounded-3xl p-6 sm:p-10 max-w-lg w-full shadow-2xl space-y-6 animate-in fade-in zoom-in duration-200">
            <div className="text-center space-y-1">
              <Badge className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold">
                NBR TAX EXEMPTION CERTIFICATE
              </Badge>
              <h3 className="text-xl font-bold font-serif text-white">Annual Income Tax Rebate Statement</h3>
              <div className="text-xs text-slate-400">Assessment Year: 2026-2027 • Section 44(2)</div>
            </div>

            <div className="bg-slate-950 border border-white/10 rounded-2xl p-6 text-xs space-y-3 font-mono">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-slate-400">MEMBER ID: BMA-DHK-1004</span>
                <span className="text-emerald-400 font-bold">TAX REF: NBR-BMA-8821</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Annual Subscriptions:</span>
                <span className="text-white">৳5,000.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Disaster Relief Donations:</span>
                <span className="text-white">৳25,000.00</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-2 font-bold text-emerald-400 text-sm">
                <span>Total Tax Exempt Amount:</span>
                <span>৳30,000.00</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => window.print()}
                variant="outline"
                className="flex-1 border-white/10 text-xs text-slate-300"
              >
                <Printer className="w-3.5 h-3.5 mr-1.5" />
                Print Statement
              </Button>
              <Button
                onClick={() => setShowTaxModal(false)}
                className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
              >
                Done
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
