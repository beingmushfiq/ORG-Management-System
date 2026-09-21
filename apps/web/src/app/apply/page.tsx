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

const BRANCH_OPTIONS = [
  { id: "node-1", name: "Central Executive Secretariat", level: "HQ" },
  { id: "node-4", name: "Chattogram Metropolitan Division", level: "Division" },
  { id: "node-12", name: "Panchlaish Medical College Unit", level: "Unit" },
  { id: "node-14", name: "Kotwali Central Hospital Unit", level: "Unit" },
  { id: "node-22", name: "Dhanmondi Clinical Unit", level: "Unit" },
];

export default function MembershipApplicationWizardPage() {
  const [step, setStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    branchId: "node-12",
    fullName: "",
    fullNameBn: "",
    phone: "",
    email: "",
    nidNumber: "",
    bloodGroup: "B+",
    occupation: "",
    paymentMethod: "EPS",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6 sm:p-12 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-white mb-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Public Portfolio
          </Link>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Membership Onboarding & KYC Application
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Apply to become an Associate Member of Bangladesh Medical Association (Chattogram Branch).
          </p>
        </div>
        <Badge variant="warning" className="text-xs px-3 py-1">
          Tier: Associate
        </Badge>
      </div>

      {!isSubmitted ? (
        <>
          {/* Progress Indicator */}
          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            {[
              { num: 1, label: "Branch", icon: Building },
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
                      ? "bg-primary/20 border-primary text-white ring-1 ring-primary/40"
                      : isDone
                      ? "bg-slate-900/60 border-emerald-500/30 text-emerald-400"
                      : "bg-slate-900/30 border-white/5 text-muted-foreground"
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
          <Card>
            {step === 1 && (
              <>
                <CardHeader>
                  <CardTitle>Select Affiliated Branch / Hospital Unit</CardTitle>
                  <CardDescription>
                    Your application will be reviewed and endorsed by the designated Branch Executive Secretary.
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
                            ? "bg-primary/15 border-primary ring-1 ring-primary/40 text-white"
                            : "bg-slate-900/40 border-white/10 hover:border-white/20 text-slate-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Building className="w-5 h-5 text-primary" />
                          <div>
                            <div className="font-bold text-sm">{branch.name}</div>
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
                  <CardTitle>Personal & Professional Credentials</CardTitle>
                  <CardDescription>
                    Please provide accurate information as stated on your National ID or Passport.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground mb-1 block">
                        Full Name (English) *
                      </label>
                      <Input
                        placeholder="e.g. Dr. Aayan Rahman"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground mb-1 block font-bangla">
                        পূর্ণ নাম (বাংলা)
                      </label>
                      <Input
                        placeholder="ডাঃ আয়ান রহমান"
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
                        Official Email *
                      </label>
                      <Input
                        type="email"
                        placeholder="doctor@hospital.gov.bd"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground mb-1 block">
                        National ID (NID) / Smart Card *
                      </label>
                      <Input
                        placeholder="19851234567890"
                        value={formData.nidNumber}
                        onChange={(e) => setFormData({ ...formData, nidNumber: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground mb-1 block">
                        Medical Specialty / Designation
                      </label>
                      <Input
                        placeholder="e.g. Registrar, Orthopaedics"
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
                    Upload high-resolution scans of your applicant photograph and National Identity Card.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="border-2 border-dashed border-white/15 rounded-2xl p-6 text-center hover:border-primary/50 transition-colors flex flex-col items-center justify-center">
                      <Upload className="w-8 h-8 text-primary mb-2" />
                      <div className="text-sm font-bold text-white">Passport Size Photo</div>
                      <p className="text-xs text-muted-foreground mt-1">JPEG or PNG (Max 5MB)</p>
                      <Button variant="outline" size="sm" className="mt-4 text-xs">
                        Browse File
                      </Button>
                    </div>

                    <div className="border-2 border-dashed border-white/15 rounded-2xl p-6 text-center hover:border-primary/50 transition-colors flex flex-col items-center justify-center">
                      <FileCheck className="w-8 h-8 text-amber-400 mb-2" />
                      <div className="text-sm font-bold text-white">NID Card Front & Back</div>
                      <p className="text-xs text-muted-foreground mt-1">PDF, JPEG, or PNG (Max 10MB)</p>
                      <Button variant="outline" size="sm" className="mt-4 text-xs">
                        Browse File
                      </Button>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground bg-slate-950 p-4 rounded-xl border border-white/10 flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      Documents are securely stored with client-side encryption and accessible only by the
                      authorized Branch Verification Committee.
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
                    Select your preferred payment processor to disburse the admission fee.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-muted-foreground uppercase">
                        Admission & Verification Fee
                      </div>
                      <div className="text-2xl font-extrabold text-white mt-0.5">৳1,500.00</div>
                    </div>
                    <Badge variant="success">Includes Holographic ID Card</Badge>
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
                        desc: "Deposit directly to Sonali Bank BMA Account and upload receipt",
                      },
                    ].map((method) => {
                      const isSelected = formData.paymentMethod === method.id;
                      return (
                        <div
                          key={method.id}
                          onClick={() => setFormData({ ...formData, paymentMethod: method.id })}
                          className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                            isSelected
                              ? "bg-primary/15 border-primary text-white ring-1 ring-primary/40"
                              : "bg-slate-900/40 border-white/10 hover:border-white/20 text-slate-300"
                          }`}
                        >
                          <div>
                            <div className="text-sm font-bold">{method.name}</div>
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
            <div className="p-6 border-t border-white/10 flex items-center justify-between">
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
                <Button size="sm" onClick={handleSubmit} className="gap-1.5 text-xs font-semibold shadow-lg">
                  Submit Application & Pay <Sparkles className="w-3.5 h-3.5" />
                </Button>
              )}
            </div>
          </Card>
        </>
      ) : (
        /* Submission Success Receipt */
        <Card className="text-center p-8">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4 text-emerald-400">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-extrabold text-white tracking-tight">
            Application Successfully Submitted!
          </h3>
          <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
            Your membership application has been received and routed to the Branch Verification Committee.
          </p>

          <div className="my-6 p-4 rounded-xl bg-slate-950 border border-white/10 max-w-md mx-auto text-left space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tracking Number:</span>
              <span className="font-mono font-bold text-amber-400">APP-2026-00421</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Initial Standing:</span>
              <span className="font-bold text-white">Pending Document Verification</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Assigned Branch:</span>
              <span className="font-bold text-white">Panchlaish Medical College Unit</span>
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
