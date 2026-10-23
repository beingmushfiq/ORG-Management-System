"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShieldCheck, ArrowLeft, Building } from "lucide-react";
import { InstitutionalHeader } from "@/components/layout/institutional-header";
import { InstitutionalFooter } from "@/components/layout/institutional-footer";

export default function PrivacyPolicyPage() {
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
            <ShieldCheck className="w-3.5 h-3.5" />
            Data Protection & Privacy Standard
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Privacy Policy (গোপনীয়তা নীতিমালা)
          </h1>
          <p className="text-xs text-muted-foreground font-mono">
            Effective Date: January 1, 2025 · Compliant with Digital Security Regulations of Bangladesh
          </p>
        </div>

        {/* Policy Body */}
        <div className="space-y-8 text-sm text-foreground/90 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <span className="text-emerald-600 font-mono">01.</span> Our Privacy Commitment
            </h2>
            <p>
              The National Agricultural Olympiad (Bangladesh Agricultural Olympiad) respects the confidentiality and security of our participants, students, guardians, campus ambassadors, and academic partners. This Privacy Policy explains how we collect, utilize, safeguard, and disclose your personal and educational information when using our web portal, course management system, and competition registry.
            </p>
            <p className="text-xs text-muted-foreground font-bangla">
              শিক্ষার্থী ও অভিভাবকদের তথ্যের গোপনীয়তা রক্ষা করা আমাদের অন্যতম প্রধান দায়িত্ব। আপনার সম্মতি ব্যতিরেকে কোনো তথ্য বাণিজ্যিক উদ্দেশ্যে তৃতীয় পক্ষের নিকট হস্তান্তর করা হয় না।
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <span className="text-emerald-600 font-mono">02.</span> Information We Collect
            </h2>
            <p>During registration, profile setup, and checkout, we may collect the following categories of information:</p>
            <ul className="list-disc pl-5 space-y-2 text-xs text-muted-foreground">
              <li>
                <strong className="text-foreground">Student & Guardian Identity:</strong> Full Name (English and বাংলা), Guardian&apos;s Name, Date of Birth, Gender, and Blood Group.
              </li>
              <li>
                <strong className="text-foreground">Academic Information:</strong> Institutional Name, Academic Grade / Class Level (Junior, Secondary, Higher Secondary, or University Faculty), Roll / Student ID Number.
              </li>
              <li>
                <strong className="text-foreground">Geographic & Contact Details:</strong> Division, District, Upazila/Thana, Physical Mailing Address, Contact Phone Number, and Primary Email Address.
              </li>
              <li>
                <strong className="text-foreground">Financial Security:</strong> We do NOT capture or store confidential credit/debit card numbers, CVVs, or MFS PINs. All payment transactions are executed securely via SSLCommerz with 256-bit SSL encryption.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <span className="text-emerald-600 font-mono">03.</span> How We Use Your Data
            </h2>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-muted-foreground">
              <li>To verify academic tier eligibility and issue cryptographically verifiable Digital Admit Cards and QR Certificates.</li>
              <li>To allocate seating plans and test centers across our nationwide 64-district network.</li>
              <li>To transmit official SMS and email alerts regarding exam schedules, venue guidelines, and Olympiad results using registered BTRC-approved sender IDs.</li>
              <li>To dispatch physical awards, medals, study kits, and certificates via courier partners.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <span className="text-emerald-600 font-mono">04.</span> Data Security & Storage Controls
            </h2>
            <p>
              We enforce multi-tenant cryptographic isolation and role-based access control (RBAC). Only designated Academic Jury and Chapter Coordination Officers have access to participant files. All databases and media are hosted on secure enterprise cloud infrastructure with continuous monitoring and regular encrypted backups.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <span className="text-emerald-600 font-mono">05.</span> Participant Rights & Access
            </h2>
            <p>
              Participants or their legal guardians may request to review, update, or delete their profile information from our database at any time prior to examination roll compilation by contacting our grievance desk at{" "}
              <a href="mailto:agriculturalolympiad@gmail.com" className="text-emerald-600 font-semibold underline">
                agriculturalolympiad@gmail.com
              </a>.
            </p>
          </section>

          {/* Statutory Footer Box */}
          <div className="p-6 rounded-2xl bg-card border border-border space-y-2 mt-8">
            <div className="font-bold text-foreground flex items-center gap-2">
              <Building className="w-4 h-4 text-emerald-600" />
              <span>National Secretariat & Privacy Officer</span>
            </div>
            <p className="text-xs text-muted-foreground">
              National Agricultural Olympiad · Trade License: <strong className="text-foreground">03247/2023-2025</strong>
              <br />
              House 04, Road 12/b, Sector 10, Uttara Model Town, Dhaka, Bangladesh
              <br />
              Data Privacy Desk: <strong className="text-foreground">+880 1717-395047</strong> · Email: <strong className="text-foreground">agriculturalolympiad@gmail.com</strong>
            </p>
          </div>
        </div>
      </main>

      <InstitutionalFooter lang={lang} />
    </div>
  );
}
