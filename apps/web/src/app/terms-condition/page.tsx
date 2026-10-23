"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FileText, ArrowLeft, Building } from "lucide-react";
import { InstitutionalHeader } from "@/components/layout/institutional-header";
import { InstitutionalFooter } from "@/components/layout/institutional-footer";

export default function TermsAndConditionsPage() {
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
            <FileText className="w-3.5 h-3.5" />
            Statutory Legal Agreement
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Terms & Conditions (শর্তাবলী ও নীতিমালা)
          </h1>
          <p className="text-xs text-muted-foreground font-mono">
            Effective Date: January 1, 2025 · Applicable to National Agricultural Olympiad Platform & Competitions
          </p>
        </div>

        {/* Policy Body */}
        <div className="space-y-8 text-sm text-foreground/90 leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <span className="text-emerald-600 font-mono">01.</span> Acceptance of Terms
            </h2>
            <p>
              Welcome to the National Agricultural Olympiad platform (operated by Bangladesh Agricultural Olympiad). By accessing, browsing, registering for competition seasons, purchasing courses, or submitting project documentation through this website, you acknowledge that you have read, understood, and agreed to be bound by these Terms and Conditions and our associated Return & Refund Policy, Privacy Policy, and Delivery Policy.
            </p>
            <p className="text-xs text-muted-foreground font-bangla">
              জাতীয় কৃষি অলিম্পিয়াডের ওয়েবসাইটে নিবন্ধন বা যেকোনো সেবা গ্রহণের মাধ্যমে আপনি এই শর্তাবলী সম্পূর্ণরূপে মেনে নিচ্ছেন বলে গণ্য হবে।
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <span className="text-emerald-600 font-mono">02.</span> Eligibility & Competition Categories
            </h2>
            <p>
              Participation in the National Agricultural Olympiad is divided into distinct academic cohorts. Participants must be enrolled in a recognized educational institution in Bangladesh at the time of registration:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-muted-foreground">
              <li>
                <strong className="text-foreground">Junior Category:</strong> Students currently enrolled in Classes 6 through 8.
              </li>
              <li>
                <strong className="text-foreground">Secondary Category:</strong> Students currently enrolled in Classes 9 and 10, or appearing for SSC.
              </li>
              <li>
                <strong className="text-foreground">Higher Secondary Category:</strong> Students enrolled in Classes 11 and 12, or HSC candidates.
              </li>
              <li>
                <strong className="text-foreground">Undergraduate / Fellowship Track:</strong> University students enrolled in agriculture, life sciences, or related STEM faculties.
              </li>
            </ul>
            <p className="text-xs text-amber-700 dark:text-amber-400 bg-amber-500/10 p-3 rounded-xl border border-amber-500/20">
              Note: Falsification of student identity, class tier, or academic credentials will lead to immediate disqualification and forfeiture of registration fees.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <span className="text-emerald-600 font-mono">03.</span> Pricing, BDT Currency & Payment Gateway Terms
            </h2>
            <p>
              In accordance with Bangladesh Bank e-commerce regulations, all competition registration fees, skill courses, and examination materials are strictly denominated and billed in <strong>Bangladeshi Taka (BDT / ৳)</strong>.
            </p>
            <p>
              Payments are securely collected through our authorized Payment System Operator (PSO) and Payment Gateway Provider, <strong>SSLCommerz</strong>, supporting bKash Direct Checkout, Nagad, Rocket, Upay, Visa, Mastercard, AMEX, and Bangladeshi Internet Banking.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <span className="text-emerald-600 font-mono">04.</span> Academic Ethics & Contest Rules
            </h2>
            <p>
              All examination answers, essays, research posters, and agricultural innovation exhibits submitted must be the original work of the registered participant. Plagiarism, algorithmic cheating, or external proxy assistance during online/offline rounds is strictly prohibited. The decision of the National Academic Jury Panel is final and binding.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <span className="text-emerald-600 font-mono">05.</span> Intellectual Property & Media Release
            </h2>
            <p>
              Participants retain intellectual ownership of their original project inventions. However, by participating, you grant the National Agricultural Olympiad a non-exclusive license to publish event photographs, winning project abstracts, and academic highlights for youth educational promotion.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <span className="text-emerald-600 font-mono">06.</span> Statutory Registration & Governing Law
            </h2>
            <p>
              These Terms and Conditions shall be governed by and construed in accordance with the laws of the People&apos;s Republic of Bangladesh. Any dispute arising out of or relating to these terms shall be subject to the exclusive jurisdiction of the competent courts of Dhaka, Bangladesh.
            </p>
          </section>

          {/* Statutory Footer Box */}
          <div className="p-6 rounded-2xl bg-card border border-border space-y-2 mt-8">
            <div className="font-bold text-foreground flex items-center gap-2">
              <Building className="w-4 h-4 text-emerald-600" />
              <span>National Secretariat & Licensing Details</span>
            </div>
            <p className="text-xs text-muted-foreground">
              National Agricultural Olympiad · Trade License: <strong className="text-foreground">03247/2023-2025</strong>
              <br />
              House 04, Road 12/b, Sector 10, Uttara Model Town, Dhaka, Bangladesh
              <br />
              Hotline: <strong className="text-foreground">+880 1717-395047</strong> · Email: <strong className="text-foreground">agriculturalolympiad@gmail.com</strong>
            </p>
          </div>
        </div>
      </main>

      <InstitutionalFooter lang={lang} />
    </div>
  );
}
