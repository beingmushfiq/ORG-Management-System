"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Truck, PackageCheck, Zap, ArrowLeft, Building } from "lucide-react";
import { InstitutionalHeader } from "@/components/layout/institutional-header";
import { InstitutionalFooter } from "@/components/layout/institutional-footer";

export default function DeliveryPolicyPage() {
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
            <Truck className="w-3.5 h-3.5" />
            Service Fulfillment & Dispatch Policy
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Delivery Policy (ডেলিভারি পলিসি)
          </h1>
          <p className="text-xs text-muted-foreground font-mono">
            Digital Fulfillment & Physical Logistics SLA · National Agricultural Olympiad Platform 2025
          </p>
        </div>

        {/* Policy Body */}
        <div className="space-y-8 text-sm text-foreground/90 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <span className="text-emerald-600 font-mono">01.</span> Scope of Service & Product Delivery
            </h2>
            <p>
              The National Agricultural Olympiad (Bangladesh Agricultural Olympiad) provides both digital educational services (Olympiad registrations, exam admit passes, online courses, and digital certificates) and physical consignments (competition medals, winner crests, participant kits, and merchandise). This Delivery Policy specifies the exact fulfilment timelines and dispatch procedures for each category.
            </p>
            <p className="text-xs text-muted-foreground font-bangla">
              আমাদের সকল ডিজিটাল সেবা (প্রবেশপত্র, কোর্স এক্সেস, সার্টিফিকেট) এবং ফিজিক্যাল পার্সেল (মেডেল, ক্রেস্ট, গিফট বক্স) বিতরণের স্পষ্ট নিয়মাবলী নিচে উল্লেখ করা হলো।
            </p>
          </section>

          {/* Dual Delivery Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
            <div className="p-5 rounded-2xl bg-card border border-border space-y-3">
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-base">
                <Zap className="w-5 h-5" />
                <span>Digital Delivery: Instant – 24h</span>
              </div>
              <ul className="text-xs text-muted-foreground space-y-2 list-disc pl-4">
                <li>
                  <strong className="text-foreground">Admit Card & Roll Number:</strong> Generated instantly or dispatched via SMS/Email within <strong>24 hours</strong> of verified payment.
                </li>
                <li>
                  <strong className="text-foreground">Course LMS Access:</strong> Immediate automatic unlock upon successful checkout.
                </li>
                <li>
                  <strong className="text-foreground">E-Certificates:</strong> Published to participant profiles within <strong>48–72 hours</strong> following result publication.
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border space-y-3">
              <div className="flex items-center gap-2 text-amber-600 font-bold text-base">
                <PackageCheck className="w-5 h-5" />
                <span>Physical Courier: 3–7 Days</span>
              </div>
              <ul className="text-xs text-muted-foreground space-y-2 list-disc pl-4">
                <li>
                  <strong className="text-foreground">Inside Dhaka City:</strong> Delivered within <strong>2 to 3 business days</strong> via authorized courier partners.
                </li>
                <li>
                  <strong className="text-foreground">Outside Dhaka (64 Districts):</strong> Delivered within <strong>3 to 7 business days</strong> to Upazila/District hubs.
                </li>
                <li>
                  <strong className="text-foreground">Tracking Number:</strong> SMS notification dispatched with live consignment tracking link.
                </li>
              </ul>
            </div>
          </div>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <span className="text-emerald-600 font-mono">02.</span> Logistics Partners & Tracking
            </h2>
            <p>
              Physical parcels, including medals, printed certificates of excellence, laptops for top winners, and official gift hampers, are dispatched via certified courier services in Bangladesh (Steadfast Courier, Sundarban Courier, or Pathao Parcel).
            </p>
            <p>
              Once your shipment is picked up by the courier, you will receive an SMS containing your Consignment Number (CN) to monitor package movement in real time.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <span className="text-emerald-600 font-mono">03.</span> Shipping Charges in BDT
            </h2>
            <p>
              Standard digital registration fees include all online delivery costs. When purchasing optional physical study materials or kits, delivery charges are calculated transparently in <strong>Bangladeshi Taka (BDT)</strong> and displayed before payment confirmation:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-muted-foreground">
              <li>Digital services & admission passes: <strong>BDT 0.00 (Free)</strong></li>
              <li>Standard Physical Kit Delivery (Dhaka): <strong>BDT 70.00</strong></li>
              <li>Standard Physical Kit Delivery (All Districts Nationwide): <strong>BDT 130.00</strong></li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <span className="text-emerald-600 font-mono">04.</span> Damaged or Missing Shipments
            </h2>
            <p>
              Participants are requested to inspect the physical packaging upon delivery. If a parcel arrives visibly damaged or tampered with, please take a photograph and notify our support hotline within <strong>48 hours</strong> at <strong className="text-foreground">+880 1717-395047</strong> or email <code>agriculturalolympiad@gmail.com</code>. We will arrange a free replacement without delay.
            </p>
          </section>

          {/* Statutory Footer Box */}
          <div className="p-6 rounded-2xl bg-card border border-border space-y-2 mt-8">
            <div className="font-bold text-foreground flex items-center gap-2">
              <Building className="w-4 h-4 text-emerald-600" />
              <span>National Secretariat Logistics & Dispatch Unit</span>
            </div>
            <p className="text-xs text-muted-foreground">
              National Agricultural Olympiad · Trade License: <strong className="text-foreground">03247/2023-2025</strong>
              <br />
              House 04, Road 12/b, Sector 10, Uttara Model Town, Dhaka, Bangladesh
              <br />
              Logistics Helpdesk: <strong className="text-foreground">+880 1717-395047</strong> (WhatsApp Active)
            </p>
          </div>
        </div>
      </main>

      <InstitutionalFooter lang={lang} />
    </div>
  );
}
