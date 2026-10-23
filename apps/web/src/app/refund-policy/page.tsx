"use client";

import React, { useState } from "react";
import Link from "next/link";
import { RefreshCcw, Clock, CreditCard, ArrowLeft, Building } from "lucide-react";
import { InstitutionalHeader } from "@/components/layout/institutional-header";
import { InstitutionalFooter } from "@/components/layout/institutional-footer";

export default function ReturnAndRefundPolicyPage() {
  const [lang, setLang] = useState<"en" | "bn">("en");

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-amber-500/30 selection:text-foreground">
      <InstitutionalHeader lang={lang} onToggleLang={() => setLang((prev) => (prev === "en" ? "bn" : "en"))} />

      <main className="flex-1 max-w-4xl mx-auto px-6 py-12 w-full space-y-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" /> {lang === "en" ? "Back to Home" : "মূল পাতায় ফিরে যান"}
        </Link>

        {/* Page Title Header */}
        <div className="border-b border-border pb-6 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <RefreshCcw className="w-3.5 h-3.5" />
            Merchant Transparency Standard
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Return & Refund Policy (রিটার্ন ও রিফান্ড পলিসি)
          </h1>
          <p className="text-xs text-muted-foreground font-mono">
            Compliance with Bangladesh Bank & SSLCommerz Digital Commerce Guidelines · Effective 2025
          </p>
        </div>

        {/* Policy Body */}
        <div className="space-y-8 text-sm text-foreground/90 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <span className="text-emerald-600 font-mono">01.</span> General Refund Principles
            </h2>
            <p>
              At the National Agricultural Olympiad (Bangladesh Agricultural Olympiad), we strive to ensure maximum academic value and satisfaction for all participating students, guardians, and educators. If you need to request a refund after completing registration for an Olympiad season or purchasing a course, you may do so under the transparent guidelines stipulated below.
            </p>
            <p className="text-xs text-muted-foreground font-bangla">
              জাতীয় কৃষি অলিম্পিয়াডের যেকোনো ক্যাটাগরিতে নিবন্ধন বা কোর্স ফি প্রদানের পর কোনো কারণে রিফান্ড প্রয়োজন হলে নিচের নিয়ম অনুযায়ী আবেদন করা যাবে।
            </p>
          </section>

          {/* SLA Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
            <div className="p-5 rounded-2xl bg-card border border-border space-y-2">
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                <Clock className="w-4 h-4" />
                <span>14-Day Application SLA</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Refund applications must be submitted within <strong>14 calendar days</strong> of registration or purchase, provided the respective examination or preliminary contest has not commenced.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border space-y-2">
              <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
                <CreditCard className="w-4 h-4" />
                <span>5–7 Working Days Turnaround</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Approved refunds are processed and disbursed within <strong>5 to 7 working days</strong> back to the customer&apos;s original payment method (bKash, Nagad, or Bank Card).
              </p>
            </div>
          </div>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <span className="text-emerald-600 font-mono">02.</span> Rules & Conditions of Refund
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-xs text-muted-foreground">
              <li>
                <strong className="text-foreground">Original Payment Channel:</strong> All refunds are issued exclusively via the same channel used during checkout (e.g. if paid via bKash, the refund will be credited to that specific bKash wallet number; if paid via credit card, credited back to the issuing bank).
              </li>
              <li>
                <strong className="text-foreground">Payment Gateway & Transaction Charges:</strong> Any non-refundable gateway processing fees (typically 1.5% to 2.5%) levied by third-party payment gateways (SSLCommerz) will be deducted from the refund amount, unless the refund is initiated due to technical system error on our platform.
              </li>
              <li>
                <strong className="text-foreground">Revocation of Digital Privileges:</strong> Upon execution of the refund, the participant&apos;s digital admit card, registration pass, online examination portal access, and LMS course rights are immediately deactivated.
              </li>
              <li>
                <strong className="text-foreground">Event Rescheduling or Cancellation:</strong> If an Olympiad round is postponed or cancelled due to force majeure or administrative reasons, participants are entitled to a full 100% refund without deductions.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <span className="text-emerald-600 font-mono">03.</span> Non-Refundable Situations
            </h2>
            <p>Refunds cannot be granted under the following circumstances:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-muted-foreground">
              <li>Requests submitted after the 14-day statutory eligibility period has lapsed.</li>
              <li>Requests submitted after the student has logged in, participated in, or submitted an examination paper.</li>
              <li>Participants disqualified due to academic misconduct, plagiarism, or false institutional declarations.</li>
              <li>Printed merchandise, study booklets, or participant kits that have already been dispatched with valid tracking through our courier partner.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <span className="text-emerald-600 font-mono">04.</span> How to Initiate a Refund Application
            </h2>
            <p>
              To lodge a formal refund request, please email our financial verification desk at{" "}
              <a href="mailto:agriculturalolympiad@gmail.com" className="text-emerald-600 font-bold underline">
                agriculturalolympiad@gmail.com
              </a>{" "}
              with the subject line: <code>[Refund Request] - [Your Name] - [Registration/Invoice ID]</code>.
            </p>
            <div className="p-4 rounded-xl bg-muted/60 border border-border text-xs space-y-1">
              <div className="font-semibold text-foreground">Required Application Details:</div>
              <div>1. Full Name of Student & Guardian</div>
              <div>2. Registered Contact Mobile Number & Email</div>
              <div>3. Transaction ID (TrxID) / SSLCommerz Payment Reference</div>
              <div>4. Clear statement of the reason for cancellation</div>
            </div>
          </section>

          {/* Statutory Footer Box */}
          <div className="p-6 rounded-2xl bg-card border border-border space-y-2 mt-8">
            <div className="font-bold text-foreground flex items-center gap-2">
              <Building className="w-4 h-4 text-emerald-600" />
              <span>National Secretariat & Compliance Authority</span>
            </div>
            <p className="text-xs text-muted-foreground">
              National Agricultural Olympiad · Trade License: <strong className="text-foreground">03247/2023-2025</strong>
              <br />
              House 04, Road 12/b, Sector 10, Uttara Model Town, Dhaka, Bangladesh
              <br />
              Customer Support Hotline: <strong className="text-foreground">+880 1717-395047</strong> (WhatsApp Active)
            </p>
          </div>
        </div>
      </main>

      <InstitutionalFooter lang={lang} />
    </div>
  );
}
