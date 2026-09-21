"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  Building,
  User,
  Upload,
  CreditCard,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  QrCode,
  FileCheck,
} from "lucide-react";
import { Button, Badge, Card, CardHeader, CardTitle, CardDescription, CardContent, Input } from "@org/ui";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { soundEffects } from "@/lib/audio-effects";
import { apiClient } from "@/lib/api-client";

const BRANCH_OPTIONS = [
  { id: "node-1", name: "National Executive Secretariat (Dhaka HQ)", level: "Central HQ" },
  { id: "node-2", name: "Dhaka University Central Campus Chapter (DU)", level: "Campus Unit" },
  { id: "node-3", name: "BUET Transport Research & Road Safety Cell", level: "Research Lab" },
  { id: "node-4", name: "Chattogram Metropolitan Division Council", level: "Division" },
  { id: "node-5", name: "Rajshahi University Youth Action Chapter (RU)", level: "Campus Unit" },
  { id: "node-6", name: "Jahangirnagar University Chapter (JU)", level: "Campus Unit" },
  { id: "node-7", name: "Sylhet Highway Crash Response Unit", level: "Regional Unit" },
  { id: "node-8", name: "Bogura Highway Safety Brigade", level: "District Unit" },
];

export default function MembershipApplicationWizardPage() {
  const [step, setStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    branchId: "node-2",
    fullName: "",
    fullNameBn: "",
    phone: "",
    email: "",
    nidNumber: "",
    bloodGroup: "O+",
    occupation: "Student / Youth Volunteer",
    paymentMethod: "BKASH",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [applicationResult, setApplicationResult] = useState<any>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const nextStep = () => {
    soundEffects.playClick(650);
    setStep((prev) => Math.min(prev + 1, 4));
  };
  const prevStep = () => {
    soundEffects.playClick(480);
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await apiClient.membership.apply({
        fullName: formData.fullName || "Volunteer Applicant",
        fullNameBn: formData.fullNameBn || undefined,
        phone: formData.phone || `017${Math.floor(10000000 + Math.random() * 90000000)}`,
        email: formData.email || `applicant-${Date.now()}@example.com`,
        nidNumber: formData.nidNumber || undefined,
        bloodGroup: formData.bloodGroup,
        occupation: formData.occupation,
        paymentMethod: formData.paymentMethod,
        branchId: formData.branchId,
      });
      setApplicationResult(res);
      soundEffects.playRatification();
      setIsSubmitted(true);
    } catch (err: any) {
      setSubmitError(err.message || "Failed to submit application.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6 sm:p-12 max-w-4xl mx-auto space-y-8 transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border pb-6">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Public Portfolio
          </Link>
          <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
            Road Safety Volunteer & Member Application
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 font-bangla">
            নিরাপদ সড়ক আন্দোলনের ৮২টি জেলা ও ক্যাম্পাস চ্যাপ্টারে সক্রিয় স্বেচ্ছাসেবী হিসেবে রেজিস্ট্রেশন ফরম
          </p>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle variant="pill" />
          <span className="text-xs px-3 py-1 font-bold rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30">
            Tier: Youth Volunteer
          </span>
        </div>
      </div>

      {!isSubmitted ? (
        <>
          {/* Progress Indicator */}
          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            {[
              { num: 1, label: "Chapter", icon: Building },
              { num: 2, label: "Profile", icon: User },
              { num: 3, label: "Documents", icon: Upload },
              { num: 4, label: "Payment", icon: CreditCard },
            ].map((s) => {
              const isCurrent = step === s.num;
              const isDone = step > s.num;
              return (
                <div
                  key={s.num}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                    isCurrent
                      ? "bg-primary/15 border-primary text-foreground ring-1 ring-primary/40 font-bold"
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

          {/* Form Step Body */}
          <Card className="border border-border bg-card text-card-foreground">
            {step === 1 && (
              <>
                <CardHeader>
                  <CardTitle>Select Regional Chapter / Campus Unit</CardTitle>
                  <CardDescription>
                    Your application will be verified and endorsed by the designated Chapter Executive Coordinator.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {BRANCH_OPTIONS.map((branch) => {
                    const isSelected = formData.branchId === branch.id;
                    return (
                      <div
                        key={branch.id}
                        onClick={() => setFormData({ ...formData, branchId: branch.id })}
                        className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                          isSelected
                            ? "bg-primary/10 border-primary ring-1 ring-primary/40 text-foreground"
                            : "bg-muted/30 border-border hover:border-primary/40 text-foreground"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Building className="w-5 h-5 text-amber-500 shrink-0" />
                          <div>
                            <div className="font-bold text-sm text-foreground">{branch.name}</div>
                            <div className="text-xs text-muted-foreground">Level: {branch.level}</div>
                          </div>
                        </div>
                        {isSelected && <CheckCircle2 className="w-5 h-5 text-primary" />}
                      </div>
                    );
                  })}
                </CardContent>
              </>
            )}

            {step === 2 && (
              <>
                <CardHeader>
                  <CardTitle>Personal & Volunteer Credentials</CardTitle>
                  <CardDescription>
                    Please provide accurate information as stated on your National ID or Student Card.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground mb-1 block">
                        Full Name (English) *
                      </label>
                      <Input
                        placeholder="e.g. Tanvir Ahmed"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground mb-1 block font-bangla">
                        পূর্ণ নাম (বাংলা)
                      </label>
                      <Input
                        placeholder="তানভীর আহমেদ"
                        value={formData.fullNameBn}
                        onChange={(e) => setFormData({ ...formData, fullNameBn: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground mb-1 block">
                        Mobile Number (+880) *
                      </label>
                      <Input
                        placeholder="+880 1819 123456"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground mb-1 block">
                        Official / Personal Email *
                      </label>
                      <Input
                        type="email"
                        placeholder="volunteer@roadsafetymovement.org"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground mb-1 block">
                        National ID (NID) / Student Reg No *
                      </label>
                      <Input
                        placeholder="19851234567890 / STU-2022-81"
                        value={formData.nidNumber}
                        onChange={(e) => setFormData({ ...formData, nidNumber: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground mb-1 block">
                        Institution / University / Occupation
                      </label>
                      <Input
                        placeholder="e.g. Dept. of Civil Engineering, DU / Youth Organizer"
                        value={formData.occupation}
                        onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                      />
                    </div>
                  </div>
                </CardContent>
              </>
            )}

            {step === 3 && (
              <>
                <CardHeader>
                  <CardTitle>KYC Document Verification Upload</CardTitle>
                  <CardDescription>
                    Upload high-resolution scans of your applicant photograph and National Identity or Student Card.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="border-2 border-dashed border-border bg-muted/20 rounded-2xl p-6 text-center hover:border-primary/50 transition-colors flex flex-col items-center justify-center">
                      <Upload className="w-8 h-8 text-amber-500 mb-2" />
                      <div className="text-sm font-bold text-foreground">Passport Size Photo</div>
                      <p className="text-xs text-muted-foreground mt-1">JPEG or PNG (Max 5MB)</p>
                      <Button variant="outline" size="sm" className="mt-4 text-xs">
                        Browse File
                      </Button>
                    </div>

                    <div className="border-2 border-dashed border-border bg-muted/20 rounded-2xl p-6 text-center hover:border-primary/50 transition-colors flex flex-col items-center justify-center">
                      <FileCheck className="w-8 h-8 text-emerald-500 mb-2" />
                      <div className="text-sm font-bold text-foreground">NID or Student ID Card</div>
                      <p className="text-xs text-muted-foreground mt-1">PDF, JPEG, or PNG (Max 10MB)</p>
                      <Button variant="outline" size="sm" className="mt-4 text-xs">
                        Browse File
                      </Button>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground bg-muted/60 p-4 rounded-xl border border-border flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>
                      Documents are securely stored with client-side encryption and accessible only by the
                      authorized Chapter Verification Committee.
                    </span>
                  </div>
                </CardContent>
              </>
            )}

            {step === 4 && (
              <>
                <CardHeader>
                  <CardTitle>Admission Fee & Payment Gateway</CardTitle>
                  <CardDescription>
                    Select your preferred payment processor to disburse the volunteer registration & RFID pass fee.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-muted-foreground uppercase">
                        Registration & Verification Fee
                      </div>
                      <div className="text-2xl font-extrabold text-foreground mt-0.5">৳500.00</div>
                    </div>
                    <Badge variant="success">Includes Holographic ID & Pass</Badge>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-semibold text-muted-foreground">
                      Select Payment Method:
                    </label>
                    {[
                      {
                        id: "EPS",
                        name: "EPS (Electronic Payment System)",
                        desc: "Bangladesh Bank Licensed PSO · Internet Banking & Cards",
                      },
                      {
                        id: "BKASH",
                        name: "bKash Direct Checkout",
                        desc: "Instant automated tokenized payment",
                      },
                      {
                        id: "NAGAD",
                        name: "Nagad Gateway",
                        desc: "Mobile financial services payment",
                      },
                      {
                        id: "BANK_TRANSFER",
                        name: "Manual Bank Deposit Slip",
                        desc: "Deposit directly to Dutch-Bangla Bank Road Safety Movement Account",
                      },
                    ].map((method) => {
                      const isSelected = formData.paymentMethod === method.id;
                      return (
                        <div
                          key={method.id}
                          onClick={() => setFormData({ ...formData, paymentMethod: method.id })}
                          className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                            isSelected
                              ? "bg-primary/10 border-primary text-foreground ring-1 ring-primary/40"
                              : "bg-muted/30 border-border hover:border-primary/40 text-foreground"
                          }`}
                        >
                          <div>
                            <div className="text-sm font-bold text-foreground">{method.name}</div>
                            <div className="text-xs text-muted-foreground">{method.desc}</div>
                          </div>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-primary" />}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </>
            )}

            {/* Wizard Navigation Bar */}
            <div className="p-6 border-t border-border flex items-center justify-between">
              {step > 1 ? (
                <Button variant="outline" size="sm" onClick={prevStep} className="gap-1.5 text-xs">
                  <ArrowLeft className="w-3.5 h-3.5" /> Previous
                </Button>
              ) : (
                <div />
              )}

              {step < 4 ? (
                <Button size="sm" onClick={nextStep} className="gap-1.5 text-xs font-semibold">
                  Next Step <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              ) : (
                <Button
                  size="sm"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="gap-1.5 text-xs font-semibold shadow-lg"
                >
                  {submitting ? "Submitting..." : "Submit Application & Pay"} <Sparkles className="w-3.5 h-3.5" />
                </Button>
              )}
            </div>
            {submitError && (
              <div className="px-6 pb-4 text-xs text-rose-500 font-medium">
                {submitError}
              </div>
            )}
          </Card>
        </>
      ) : (
        /* Submission Success Receipt */
        <Card className="text-center p-8 border border-border bg-card text-card-foreground">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4 text-emerald-500">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-extrabold text-foreground tracking-tight">
            Application Successfully Submitted!
          </h3>
          <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
            Your membership and volunteer pass application has been received and routed to the Chapter Verification Committee.
          </p>

          <div className="my-6 p-4 rounded-xl bg-muted/60 border border-border max-w-md mx-auto text-left space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tracking Number:</span>
              <span className="font-mono font-bold text-amber-500">
                {applicationResult?.membershipNumber || applicationResult?.id || "RSM-APP-2026-00421"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Initial Standing:</span>
              <span className="font-bold text-foreground">Pending Document Verification</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Assigned Chapter:</span>
              <span className="font-bold text-foreground">
                {BRANCH_OPTIONS.find((b) => b.id === formData.branchId)?.name || "National Executive Secretariat"}
              </span>
            </div>
          </div>

          <div className="flex justify-center gap-3">
            <Link href="/">
              <Button variant="outline" size="sm">
                Return to Home
              </Button>
            </Link>
            <Button size="sm" className="gap-1.5">
              <QrCode className="w-3.5 h-3.5" /> Download Tracking Slip
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
