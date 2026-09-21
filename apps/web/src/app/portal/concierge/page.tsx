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
import { Button, Badge, Card, CardContent, useToast, CopyButton } from "@org/ui";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function MemberConciergePage() {
  const [lang, setLang] = useState<"en" | "bn">("en");
  const [showGoodStandingModal, setShowGoodStandingModal] = useState(false);
  const [showTaxModal, setShowTaxModal] = useState(false);
  const [chamberSaved, setChamberSaved] = useState(false);
  const [isGeneratingGoodStanding, setIsGeneratingGoodStanding] = useState(false);
  const [isGeneratingTax, setIsGeneratingTax] = useState(false);
  const [isSavingChamber, setIsSavingChamber] = useState(false);
  const { success } = useToast();

  // Deployment Desk State
  const [chapterUnit, setChapterUnit] = useState("Dhaka Central Secretariat / DU Chapter");
  const [corridorZone, setCorridorZone] = useState("Shahbagh - Farmgate - Airport Corridor");
  const [availability, setAvailability] = useState("24/7 Rapid Crash Response & Weekend Drives");
  const [phone, setPhone] = useState("01819-112233");

  const handleGenerateGoodStanding = () => {
    setIsGeneratingGoodStanding(true);
    setTimeout(() => {
      setIsGeneratingGoodStanding(false);
      setShowGoodStandingModal(true);
      success(
        "Certificate Cryptographically Signed",
        "Activist Accreditation Certificate #RSM-GS-2026-08821 generated with official QR seal."
      );
    }, 700);
  };

  const handleGenerateTax = () => {
    setIsGeneratingTax(true);
    setTimeout(() => {
      setIsGeneratingTax(false);
      setShowTaxModal(true);
      success(
        "Tax Statement Compiled",
        "Fiscal Year 2026-2027 statement generated under Section 44(2)."
      );
    }, 700);
  };

  const handleSaveDeployment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingChamber(true);
    setTimeout(() => {
      setIsSavingChamber(false);
      setChamberSaved(true);
      success(
        "Deployment Desk Synchronized",
        "Your activist assignment and emergency response hours have been updated in the national volunteer directory."
      );
      setTimeout(() => setChamberSaved(false), 3000);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-amber-500/20 transition-colors">
      {/* Top Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-card/80 backdrop-blur-2xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/portal"
              className="flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {lang === "en" ? "Back to Member Portal" : "পোর্টাল ড্যাশবোর্ডে ফিরুন"}
            </Link>
            <div className="h-4 w-[1px] bg-border hidden sm:block" />
            <div className="text-xs font-bold text-foreground">
              {lang === "en" ? "Fast-Track Member & Activist Concierge Desk" : "সদস্য ডিজিটাল সেবা ও সনদ ডেস্ক"}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle variant="pill" />
            <button
              onClick={() => setLang(lang === "en" ? "bn" : "en")}
              className="px-3 py-1 rounded-lg border border-border bg-card text-xs font-semibold text-foreground hover:border-amber-500/50 transition-colors"
            >
              {lang === "en" ? "বাংলা" : "English"}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Header */}
      <section className="relative border-b border-border bg-muted/20 py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <Badge className="bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30 text-xs font-semibold mb-3">
            INSTANT VERIFIABLE CREDENTIAL SERVICES
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-foreground tracking-tight leading-tight">
            {lang === "en" ? "Fast-Track Member Services & Official Certificates" : "অনলাইন সেবা ও তাৎক্ষণিক সনদপত্র সংগ্রহ"}
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-2xl leading-relaxed">
            {lang === "en"
              ? "Download cryptographically authenticated Certificates of Good Standing, NBR Income Tax deduction summaries, or register your rapid action deployment schedule with zero administrative friction."
              : "কোনো প্রকার ভোগান্তি ছাড়াই চারিত্রিক ও সক্রিয় স্বেচ্ছাসেবক প্রত্যয়নপত্র, আয়কর রেয়াত সনদপত্র এবং অ্যাকশন ডেস্ক তথ্য হালনাগাদ করুন।"}
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <main className="max-w-6xl mx-auto px-6 py-10 flex-1 w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 7 Cols: Instant Certificates */}
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-xl font-bold font-serif text-foreground flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            {lang === "en" ? "Instant Institutional Certificates" : "তাৎক্ষণিক প্রাতিষ্ঠানিক সনদপত্র"}
          </h2>

          {/* Good Standing Certificate Card */}
          <Card className="bg-card border border-border hover:border-amber-500/40 transition-all rounded-2xl p-6 shadow-md">
            <CardContent className="p-0 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 shadow-inner">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-serif text-foreground">
                      {lang === "en" ? "Activist Accreditation & Good Standing Certificate" : "সক্রিয় সংগঠক ও চারিত্রিক প্রশংসাপত্র"}
                    </h3>
                    <div className="text-xs text-muted-foreground font-bangla">
                      {lang === "en" ? "For Fellowships, Higher Studies & Legal Panels" : "আন্তর্জাতিক ফেলোশিপ, উচ্চশিক্ষা ও আইনি সহায়তার জন্য"}
                    </div>
                  </div>
                </div>

                <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                  ELIGIBLE
                </Badge>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">
                {lang === "en"
                  ? "Formally certifies your verified active activist standing, campus chapter leadership, and unblemished civic conduct under the seal of the National Executive Council."
                  : "আপনার সক্রিয় সংগঠক মর্যাদা, ক্যাম্পাস বা জেলা চ্যাপ্টারে ভূমিকা এবং নিষ্কলুষ রেকর্ড নিশ্চিত করে জাতীয় সচিবালয়ের অফিশিয়াল সিলযুক্ত সনদ।"}
              </p>

              <div className="pt-2 flex items-center justify-between border-t border-border text-xs">
                <span className="text-muted-foreground font-mono">Format: Signed PDF with QR Hash</span>
                <Button
                  onClick={handleGenerateGoodStanding}
                  size="sm"
                  loading={isGeneratingGoodStanding}
                  loadingText="Signing..."
                  leftIcon={<Download className="w-3.5 h-3.5" />}
                  className="font-bold text-xs shadow-sm"
                >
                  {lang === "en" ? "Generate & Download" : "সনদ গ্রহণ করুন"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tax Deduction Certificate Card */}
          <Card className="bg-card border border-border hover:border-emerald-500/40 transition-all rounded-2xl p-6 shadow-md">
            <CardContent className="p-0 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-inner">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-serif text-foreground">
                      {lang === "en" ? "NBR Tax Rebate Certificate (FY 2026-2027)" : "আয়কর রেয়াত ও অনুদান প্রত্যয়নপত্র (২০২৬-২০২৭)"}
                    </h3>
                    <div className="text-xs text-muted-foreground font-bangla">
                      {lang === "en" ? "Section 44(2) of Income Tax Act 2023" : "আয়কর আইন ২০২৩ এর ধারা ৪৪(২)"}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-bold font-mono text-emerald-600 dark:text-emerald-400">৳30,000.00</div>
                  <div className="text-[10px] text-muted-foreground">Total Deductible</div>
                </div>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">
                {lang === "en"
                  ? "Aggregates all volunteer membership fees and road crash victim relief donations into a certified tax exemption statement for submission to the National Board of Revenue."
                  : "বার্ষিক চাঁদা ও সড়ক ক্র্যাশ ভিকটিম ত্রাণ তহবিলে প্রদত্ত অনুদানের সম্পূর্ণ নিরীক্ষিত স্টেটমেন্ট যা জাতীয় রাজস্ব বোর্ডে দাখিলযোগ্য।"}
              </p>

              <div className="pt-2 flex items-center justify-between border-t border-border text-xs">
                <span className="text-muted-foreground font-mono">Deduction Ref: NBR-RSM-TAX-8821</span>
                <Button
                  onClick={handleGenerateTax}
                  size="sm"
                  loading={isGeneratingTax}
                  loadingText="Compiling..."
                  leftIcon={<Download className="w-3.5 h-3.5" />}
                  className="font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
                >
                  {lang === "en" ? "Download Tax Certificate" : "ট্যাক্স সনদপত্র"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right 5 Cols: Deployment Desk Registrar */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="bg-card border border-border rounded-2xl p-6 shadow-md space-y-4">
            <div>
              <Badge className="bg-blue-500/15 text-blue-700 dark:text-blue-400 border border-blue-500/30 text-[10px] font-bold mb-1">
                VOLUNTEER DEPLOYMENT
              </Badge>
              <h3 className="text-lg font-bold font-serif text-foreground">
                {lang === "en" ? "Action Desk & Patrol Schedule" : "মাঠপর্যায়ের দায়িত্ব ও শিডিউল"}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {lang === "en"
                  ? "Keep your emergency corridor assignment updated for rapid accident response and zebra crossing safety patrols."
                  : "আপনার দায়িত্বপ্রাপ্ত মহাসড়ক করিডোর ও ইমার্জেন্সি রেসপন্স শিডিউল হালনাগাদ রাখুন।"}
              </p>
            </div>

            <form onSubmit={handleSaveDeployment} className="space-y-3.5 text-xs">
              <div>
                <label className="text-foreground font-semibold block mb-1">Assigned Chapter / Campus Unit</label>
                <input
                  type="text"
                  required
                  value={chapterUnit}
                  onChange={(e) => setChapterUnit(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-background border border-border text-foreground text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-foreground font-semibold block mb-1">Patrol Corridor / Zone</label>
                <input
                  type="text"
                  required
                  value={corridorZone}
                  onChange={(e) => setCorridorZone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-background border border-border text-foreground text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-foreground font-semibold block mb-1">Emergency Availability</label>
                <input
                  type="text"
                  required
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-background border border-border text-foreground text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-foreground font-semibold block mb-1">Emergency Hotline / Phone</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-background border border-border text-foreground text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <Button
                type="submit"
                loading={isSavingChamber}
                loadingText="Synchronizing..."
                className="w-full font-bold text-xs py-2.5 shadow-sm"
              >
                {chamberSaved ? "Saved Successfully! (সংরক্ষিত)" : "Update Deployment Desk"}
              </Button>
            </form>
          </Card>
        </div>
      </main>

      {/* Good Standing Modal Preview */}
      {showGoodStandingModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border-2 border-amber-500/40 rounded-3xl p-6 sm:p-10 max-w-lg w-full shadow-2xl space-y-6 animate-in fade-in zoom-in duration-200 text-card-foreground">
            <div className="text-center space-y-1">
              <Badge className="bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30 text-[11px] font-bold">
                OFFICIAL CERTIFICATE
              </Badge>
              <h3 className="text-xl font-bold font-serif text-foreground">Certificate of Good Standing</h3>
              <div className="text-xs text-muted-foreground">Road Safety Movement • National Secretariat</div>
            </div>

            <div className="bg-muted/50 border border-border rounded-2xl p-6 text-xs space-y-3 font-sans">
              <div className="flex justify-between items-center border-b border-border pb-2 font-mono text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">CERT NO: RSM-GS-2026-08821</span>
                  <CopyButton text="RSM-GS-2026-08821" label="Copy" />
                </div>
                <span className="text-amber-600 dark:text-amber-400 font-bold">VALID: 1 YEAR</span>
              </div>

              <p className="text-foreground/90 leading-relaxed">
                This is to certify that <strong>Engr. Tanvir Ahmed</strong>, holder of Activist ID <strong>RSM-VOL-2018-001</strong> and Executive Standing in <strong>Dhaka Central Secretariat</strong>, is an active organizer in good standing of the Road Safety Movement (নিরাপদ সড়ক আন্দোলন).
              </p>

              <p className="text-muted-foreground leading-relaxed text-[11px]">
                There are no disciplinary proceedings or ethical violations pending against the holder under organizational bylaws.
              </p>

              <div className="pt-4 border-t border-border flex items-center justify-between text-[11px]">
                <div>
                  <div className="font-bold text-foreground">Tanvir Ahmed</div>
                  <div className="text-muted-foreground">Chief National Coordinator</div>
                </div>
                <div className="w-16 h-16 bg-white p-1 rounded-lg flex items-center justify-center border border-border">
                  <QrCode className="w-full h-full text-slate-950" />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => window.print()}
                variant="outline"
                className="flex-1 text-xs"
              >
                <Printer className="w-3.5 h-3.5 mr-1.5" />
                Print Certificate
              </Button>
              <Button
                onClick={() => setShowGoodStandingModal(false)}
                className="flex-1 font-bold text-xs"
              >
                Done
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Tax Certificate Modal Preview */}
      {showTaxModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-10 max-w-lg w-full shadow-2xl space-y-6 animate-in fade-in zoom-in duration-200 text-card-foreground">
            <div className="text-center space-y-1">
              <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 text-[11px] font-bold">
                NBR TAX EXEMPTION CERTIFICATE
              </Badge>
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
