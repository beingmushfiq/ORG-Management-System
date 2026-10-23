"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Building,
  User,
  CreditCard,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  Award,
  Lock,
} from "lucide-react";
import { Button, Badge, Card, CardHeader, CardTitle, CardDescription, CardContent, Input } from "@org/ui";
import { InstitutionalHeader } from "@/components/layout/institutional-header";
import { InstitutionalFooter } from "@/components/layout/institutional-footer";
import { soundEffects } from "@/lib/audio-effects";

const DIVISIONS = [
  "Dhaka (ঢাকা)",
  "Chattogram (চট্টগ্রাম)",
  "Rajshahi (রাজশাহী)",
  "Khulna (খুলনা)",
  "Barishal (বরিশাল)",
  "Sylhet (সিলেট)",
  "Rangpur (রংপুর)",
  "Mymensingh (ময়মনসিংহ)",
];

const CATEGORIES = [
  {
    id: "JUNIOR",
    name: "Junior Class (Grades 6–8)",
    nameBn: "জুনিয়র শ্রেণি (৬ষ্ঠ–৮ম)",
    feeBdt: 70,
    desc: "Foundation agriculture concepts, plant biology, soil, water & climate basics.",
  },
  {
    id: "SECONDARY",
    name: "Secondary Class (Grades 9–10 & SSC)",
    nameBn: "মাধ্যমিক শ্রেণি (৯ম–১০ম ও এসএসসি)",
    feeBdt: 70,
    desc: "Agronomy, climate-smart farming, horticulture, poultry & fisheries.",
  },
  {
    id: "HIGHER_SECONDARY",
    name: "Higher Secondary (Grades 11–12 & HSC)",
    nameBn: "উচ্চ মাধ্যমিক (১১শ–১২শ ও এইচএসসি)",
    feeBdt: 70,
    desc: "Advanced crop genetics, biotechnology, agribusiness & sustainable food systems.",
  },
  {
    id: "UNIVERSITY",
    name: "University Agri-Fellowship Cohort",
    nameBn: "বিশ্ববিদ্যালয় ফেলোশিপ ট্র্যাক",
    feeBdt: 200,
    desc: "Undergraduate research track, hydroponic automation & smart logistics.",
  },
];

export default function RegistrationAndCheckoutWizardPage() {
  const [lang, setLang] = useState<"en" | "bn">("en");
  const [step, setStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    categoryId: "SECONDARY",
    includeStudyKit: false,
    fullName: "",
    fullNameBn: "",
    instituteName: "",
    division: "Dhaka (ঢাকা)",
    district: "Dhaka",
    upazila: "Uttara",
    phone: "",
    email: "",
    guardianName: "",
    guardianPhone: "",
    studentIdNo: "",
    paymentMethod: "SSLCOMMERZ",
  });

  const [policiesAccepted, setPoliciesAccepted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [registrationPassId, setRegistrationPassId] = useState("");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const selectedCategory = (CATEGORIES.find((c) => c.id === formData.categoryId) ?? CATEGORIES[0])!;
  const kitFeeBdt = formData.includeStudyKit ? 430 : 0;
  const totalFeeBdt = selectedCategory.feeBdt + kitFeeBdt;

  const nextStep = () => {
    soundEffects.playClick(650);
    setStep((prev) => Math.min(prev + 1, 4));
  };
  const prevStep = () => {
    soundEffects.playClick(480);
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!policiesAccepted) {
      setSubmitError("You must accept the Terms & Conditions, Refund Policy, Privacy Policy, and Delivery Policy to proceed.");
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      // Simulate/Trigger API Registration
      const generatedId = `AGRI-2025-${Math.floor(100000 + Math.random() * 900000)}`;
      setRegistrationPassId(generatedId);
      soundEffects.playRatification();
      setIsSubmitted(true);
    } catch (err: any) {
      setSubmitError(err.message || "Failed to submit registration.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-amber-500/30 selection:text-foreground">
      <InstitutionalHeader lang={lang} onToggleLang={() => setLang((prev) => (prev === "en" ? "bn" : "en"))} />

      <main className="flex-1 max-w-4xl mx-auto px-6 py-12 w-full space-y-8">
        {/* Breadcrumb & Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-2"
            >
              <ArrowLeft className="w-4 h-4" /> {lang === "en" ? "Back to Homepage" : "মূল পাতায় ফিরে যান"}
            </Link>
            <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
              {lang === "en" ? "National Agricultural Olympiad Registration" : "জাতীয় কৃষি অলিম্পিয়াড নিবন্ধন ফরম"}
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Season 2025 · 64 Districts · Official Accreditation · Trade License No: 03247/2023-2025
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs px-3 py-1.5 font-bold rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
              {lang === "en" ? `Fee: BDT ${totalFeeBdt}.00` : `ফি: ${totalFeeBdt} ৳`}
            </span>
          </div>
        </div>

        {!isSubmitted ? (
          <>
            {/* Step Wizard Progress Tabs */}
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              {[
                { num: 1, label: lang === "en" ? "Category" : "ক্যাটাগরি", icon: Award },
                { num: 2, label: lang === "en" ? "Student" : "শিক্ষার্থী", icon: User },
                { num: 3, label: lang === "en" ? "Institute" : "প্রতিষ্ঠান", icon: Building },
                { num: 4, label: lang === "en" ? "Checkout" : "পেমেন্ট", icon: CreditCard },
              ].map((s) => {
                const isCurrent = step === s.num;
                const isDone = step > s.num;
                return (
                  <div
                    key={s.num}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                      isCurrent
                        ? "bg-emerald-500/15 border-emerald-500 text-foreground ring-1 ring-emerald-500/40 font-bold"
                        : isDone
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                        : "bg-muted/40 border-border text-muted-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-1 font-bold">
                      <span>Step {s.num}</span>
                    </div>
                    <span className="font-semibold text-[11px]">{s.label}</span>
                  </div>
                );
              })}
            </div>

            {/* Error Banner */}
            {submitError && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{submitError}</span>
              </div>
            )}

            {/* Step Card Body */}
            <Card className="border border-border bg-card text-card-foreground shadow-sm">
              {/* STEP 1: CATEGORY SELECTION */}
              {step === 1 && (
                <>
                  <CardHeader>
                    <CardTitle className="text-xl">
                      {lang === "en" ? "Select Your Olympiad Category" : "আপনার অলিম্পিয়াড ক্যাটাগরি নির্বাচন করুন"}
                    </CardTitle>
                    <CardDescription>
                      Choose the competition track matching your current educational grade in Bangladesh.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {CATEGORIES.map((cat) => {
                        const isSelected = formData.categoryId === cat.id;
                        return (
                          <div
                            key={cat.id}
                            onClick={() => setFormData({ ...formData, categoryId: cat.id })}
                            className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between space-y-3 ${
                              isSelected
                                ? "bg-emerald-500/10 border-emerald-500 ring-2 ring-emerald-500/30"
                                : "bg-muted/20 border-border hover:border-emerald-500/40"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h4 className="font-bold text-sm text-foreground">
                                  {lang === "en" ? cat.name : cat.nameBn}
                                </h4>
                                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                                  {cat.desc}
                                </p>
                              </div>
                              {isSelected && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                            </div>

                            <div className="pt-2 border-t border-border flex items-center justify-between text-xs font-bold text-emerald-600">
                              <span>Entry Fee:</span>
                              <span className="font-mono text-sm">BDT {cat.feeBdt}.00</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Optional Study Kit Package Add-on */}
                    <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="kitAddon"
                        checked={formData.includeStudyKit}
                        onChange={(e) => setFormData({ ...formData, includeStudyKit: e.target.checked })}
                        className="mt-1 h-4 w-4 rounded border-border text-amber-600 focus:ring-amber-500"
                      />
                      <label htmlFor="kitAddon" className="text-xs text-foreground cursor-pointer space-y-0.5">
                        <div className="font-bold text-amber-800 dark:text-amber-400">
                          Add Physical Study Kit, Olympiad T-Shirt & Handbook (+BDT 430.00)
                        </div>
                        <p className="text-muted-foreground">
                          Includes printed Olympiad syllabus book, official cotton t-shirt, lapel pin, and physical Certificate of Participation delivered via courier.
                        </p>
                      </label>
                    </div>
                  </CardContent>
                </>
              )}

              {/* STEP 2: STUDENT PROFILE */}
              {step === 2 && (
                <>
                  <CardHeader>
                    <CardTitle className="text-xl">
                      {lang === "en" ? "Student Personal Information" : "শিক্ষার্থীর ব্যক্তিগত তথ্য"}
                    </CardTitle>
                    <CardDescription>
                      Ensure name matches your institutional student identity card or birth certificate.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase text-muted-foreground">
                          Student Full Name (English) *
                        </label>
                        <Input
                          required
                          placeholder="e.g. Abrar Fahim"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase text-muted-foreground font-bangla">
                          শিক্ষার্থীর পূর্ণ নাম (বাংলা)
                        </label>
                        <Input
                          placeholder="উদাঃ আবরার ফাহিম"
                          value={formData.fullNameBn}
                          onChange={(e) => setFormData({ ...formData, fullNameBn: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase text-muted-foreground">
                          Student Mobile Number (WhatsApp) *
                        </label>
                        <Input
                          required
                          placeholder="017XXXXXXXX"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase text-muted-foreground">
                          Student Email Address *
                        </label>
                        <Input
                          type="email"
                          required
                          placeholder="abrar@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase text-muted-foreground">
                          Guardian Name *
                        </label>
                        <Input
                          required
                          placeholder="e.g. Md. Shahidul Islam"
                          value={formData.guardianName}
                          onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase text-muted-foreground">
                          Guardian Contact Phone *
                        </label>
                        <Input
                          required
                          placeholder="018XXXXXXXX"
                          value={formData.guardianPhone}
                          onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                        />
                      </div>
                    </div>
                  </CardContent>
                </>
              )}

              {/* STEP 3: INSTITUTION & GEOGRAPHY */}
              {step === 3 && (
                <>
                  <CardHeader>
                    <CardTitle className="text-xl">
                      {lang === "en" ? "Academic Institution & Location" : "শিক্ষা প্রতিষ্ঠান ও আঞ্চলিক ঠিকানা"}
                    </CardTitle>
                    <CardDescription>
                      Your preliminary exam center and district ranking will be allocated based on this data.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase text-muted-foreground">
                        School / College / University Name *
                      </label>
                      <Input
                        required
                        placeholder="e.g. Notre Dame College, Dhaka / BAU Mymensingh"
                        value={formData.instituteName}
                        onChange={(e) => setFormData({ ...formData, instituteName: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase text-muted-foreground">
                          Division *
                        </label>
                        <select
                          value={formData.division}
                          onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-border bg-card text-xs text-foreground focus:outline-none focus:border-emerald-600"
                        >
                          {DIVISIONS.map((div) => (
                            <option key={div} value={div}>
                              {div}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase text-muted-foreground">
                          District (জেলা) *
                        </label>
                        <Input
                          required
                          placeholder="e.g. Dhaka, Bogura, Mymensingh"
                          value={formData.district}
                          onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase text-muted-foreground">
                          Upazila / Thana *
                        </label>
                        <Input
                          required
                          placeholder="e.g. Uttara, Mirpur, Sadar"
                          value={formData.upazila}
                          onChange={(e) => setFormData({ ...formData, upazila: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase text-muted-foreground">
                        Student ID / Roll / Registration Number (Optional)
                      </label>
                      <Input
                        placeholder="e.g. Roll 1042 / Student ID"
                        value={formData.studentIdNo}
                        onChange={(e) => setFormData({ ...formData, studentIdNo: e.target.value })}
                      />
                    </div>
                  </CardContent>
                </>
              )}

              {/* STEP 4: CHECKOUT, BDT PRICE & MANDATORY POLICIES ACCEPTANCE */}
              {step === 4 && (
                <>
                  <CardHeader>
                    <CardTitle className="text-xl">
                      {lang === "en" ? "Review & Complete Payment" : "পেমেন্ট ও পলিসি অনুমোদন"}
                    </CardTitle>
                    <CardDescription>
                      Review fee breakdown in BDT and accept required statutory policies to complete registration.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* BDT Price Invoice Breakdown Card */}
                    <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-3">
                      <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
                        <div>
                          <div className="font-bold text-base text-foreground">
                            {selectedCategory.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            National Agricultural Olympiad Season 2025
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-mono font-bold text-sm text-foreground">
                            BDT {selectedCategory.feeBdt}.00
                          </span>
                        </div>
                      </div>

                      {formData.includeStudyKit && (
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>Physical Study Kit, Cotton T-Shirt & Handbook</span>
                          <span className="font-mono font-bold text-foreground">BDT 430.00</span>
                        </div>
                      )}

                      <div className="pt-2 border-t border-emerald-500/20 flex items-center justify-between">
                        <div>
                          <span className="text-xs uppercase font-extrabold text-muted-foreground tracking-wider">
                            Total Payable (BDT):
                          </span>
                          <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-bangla font-semibold">
                            সর্বমোট প্রদেয় ফি (বাংলাদেশি টাকা)
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                            BDT {totalFeeBdt}.00
                          </div>
                          <div className="text-xs font-mono font-bold text-muted-foreground">
                            (৳ {totalFeeBdt})
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Payment Gateway Options */}
                    <div className="space-y-3">
                      <label className="text-xs font-bold uppercase text-muted-foreground">
                        Select Payment Processor:
                      </label>
                      {[
                        {
                          id: "SSLCOMMERZ",
                          name: "SSLCommerz Payment Gateway",
                          desc: "Instant automated payment via bKash, Nagad, Rocket, Upay, Visa, Mastercard, AMEX & Net Banking",
                          badge: "Recommended",
                        },
                        {
                          id: "EPS",
                          name: "EPS (Electronic Payment System)",
                          desc: "Bangladesh Bank Licensed PSO · Direct Bank & Card Debit",
                          badge: "PSO Licensed",
                        },
                        {
                          id: "MANUAL_SLIP",
                          name: "Campus Ambassador Slip / Manual MFS",
                          desc: "Submit payment slip collected by your campus coordinator",
                          badge: "Manual Review",
                        },
                      ].map((method) => {
                        const isSelected = formData.paymentMethod === method.id;
                        return (
                          <div
                            key={method.id}
                            onClick={() => setFormData({ ...formData, paymentMethod: method.id })}
                            className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                              isSelected
                                ? "bg-emerald-500/10 border-emerald-500 ring-1 ring-emerald-500/40 text-foreground"
                                : "bg-muted/20 border-border hover:border-emerald-500/40 text-foreground"
                            }`}
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-bold">{method.name}</span>
                                <Badge variant="outline" className="text-[10px] bg-card">
                                  {method.badge}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground">{method.desc}</p>
                            </div>
                            {isSelected && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                          </div>
                        );
                      })}
                    </div>

                    {/* ========================================================================= */}
                    {/* MANDATORY CHECKOUT COMPLIANCE ACCEPTANCE CHECKBOX (WITH HYPERLINKS)       */}
                    {/* ========================================================================= */}
                    <div className="p-4 rounded-2xl bg-amber-500/10 border-2 border-amber-500/30 space-y-2">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          required
                          checked={policiesAccepted}
                          onChange={(e) => setPoliciesAccepted(e.target.checked)}
                          className="mt-1 h-5 w-5 rounded border-border text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                        />
                        <span className="text-xs text-foreground leading-relaxed select-none">
                          <strong className="text-foreground block mb-1">
                            Mandatory Regulatory & Policy Acceptance:
                          </strong>
                          I confirm that all registration details are true and correct. I have read, understood, and accept the{" "}
                          <Link
                            href="/terms-condition"
                            target="_blank"
                            className="font-bold text-emerald-700 dark:text-emerald-400 underline hover:text-emerald-800"
                          >
                            Terms & Conditions
                          </Link>
                          ,{" "}
                          <Link
                            href="/refund-policy"
                            target="_blank"
                            className="font-bold text-emerald-700 dark:text-emerald-400 underline hover:text-emerald-800"
                          >
                            Return & Refund Policy
                          </Link>
                          ,{" "}
                          <Link
                            href="/privacy-policy"
                            target="_blank"
                            className="font-bold text-emerald-700 dark:text-emerald-400 underline hover:text-emerald-800"
                          >
                            Privacy Policy
                          </Link>
                          , and{" "}
                          <Link
                            href="/delivery-policy"
                            target="_blank"
                            className="font-bold text-emerald-700 dark:text-emerald-400 underline hover:text-emerald-800"
                          >
                            Delivery Policy
                          </Link>
                          . I understand all fees are billed in Bangladeshi Taka (BDT) and digital services are non-refundable after round commencement.
                        </span>
                      </label>
                    </div>
                  </CardContent>
                </>
              )}

              {/* Wizard Navigation Footer */}
              <div className="p-6 border-t border-border flex items-center justify-between">
                {step > 1 ? (
                  <Button variant="outline" size="sm" onClick={prevStep} className="gap-1.5 text-xs">
                    <ArrowLeft className="w-3.5 h-3.5" /> Previous
                  </Button>
                ) : (
                  <div />
                )}

                {step < 4 ? (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={nextStep}
                    className="gap-1.5 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                  >
                    <span>Next Step</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    size="md"
                    disabled={!policiesAccepted || submitting}
                    onClick={handleSubmit}
                    className="gap-2 text-xs font-extrabold bg-gradient-to-r from-emerald-600 to-amber-500 hover:from-emerald-700 hover:to-amber-600 text-white shadow-md disabled:opacity-50"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>{submitting ? "Processing Payment..." : `Pay BDT ${totalFeeBdt}.00 via SSLCommerz`}</span>
                  </Button>
                )}
              </div>
            </Card>
          </>
        ) : (
          /* REGISTRATION SUCCESS / ADMIT PASS CARD */
          <Card className="border-2 border-emerald-500 bg-card p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <Badge variant="outline" className="text-xs bg-emerald-500/10 text-emerald-700 border-emerald-500/30">
                Official Registration Confirmed
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                Welcome to National Agricultural Olympiad 2025!
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto">
                Your payment of <strong className="text-foreground">BDT {totalFeeBdt}.00</strong> has been verified via SSLCommerz. Your Digital Admit Card and credentials have been dispatched via SMS to <span className="font-mono font-bold text-foreground">{formData.phone || "+880 17XXXXXXXX"}</span>.
              </p>
            </div>

            {/* Generated Pass Summary Box */}
            <div className="max-w-md mx-auto p-5 rounded-2xl bg-muted/40 border border-border text-left space-y-2.5 text-xs font-mono">
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Participant ID:</span>
                <span className="font-bold text-emerald-600">{registrationPassId}</span>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Category:</span>
                <span className="font-bold text-foreground">{selectedCategory.name}</span>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Trade License:</span>
                <span className="font-bold text-foreground">03247/2023-2025</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount Paid:</span>
                <span className="font-bold text-foreground">BDT {totalFeeBdt}.00</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link href="/">
                <Button variant="outline" size="sm" className="text-xs">
                  Return to Home
                </Button>
              </Link>
              <Link href="/portal">
                <Button variant="primary" size="sm" className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-bold">
                  Open Student Portal
                </Button>
              </Link>
            </div>
          </Card>
        )}
      </main>

      <InstitutionalFooter lang={lang} />
    </div>
  );
}
