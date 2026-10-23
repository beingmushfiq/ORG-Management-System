"use client";

import React from "react";
import Link from "next/link";
import {
  MapPin,
  PhoneCall,
  Mail,
  ShieldCheck,
  FileText,
  RefreshCcw,
  Truck,
  Award,
  Globe,
  Sparkles,
} from "lucide-react";
import { OrgLogo } from "@/components/brand/org-logo";

interface FooterProps {
  lang?: "en" | "bn";
}

export function InstitutionalFooter({ lang = "en" }: FooterProps) {
  return (
    <footer className="border-t border-border bg-card/95 backdrop-blur-md mt-auto text-card-foreground">
      {/* Primary Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Column 1: Organization Story & Trade License (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-block">
              <OrgLogo
                size="md"
                tenantName="National Agricultural Olympiad"
                tenantNameBn="জাতীয় কৃষি অলিম্পিয়াড"
                subtitle="Empowering Youth for Sustainable Agriculture"
                subtitleBn="টেকসই কৃষির রূপান্তরে তরুণ প্রজন্মের নেতৃত্ব"
              />
            </Link>

            <p className="text-xs text-muted-foreground leading-relaxed">
              {lang === "en"
                ? "The National Agricultural Olympiad is Bangladesh's apex platform inspiring youth, school, college, and university students to drive innovation, climate resilience, and food security in agriculture."
                : "জাতীয় কৃষি অলিম্পিয়াড বাংলাদেশের শীর্ষ প্ল্যাটফর্ম যা আধুনিক ও জলবায়ু-সহনশীল স্মার্ট কৃষির রূপান্তরে স্কুল, কলেজ ও বিশ্ববিদ্যালয়ের তরুণ নেতৃত্ব তৈরিতে অঙ্গীকারবদ্ধ।"}
            </p>

            {/* Official Trade License Compliance Badge */}
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 space-y-1">
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider">
                <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Govt. Registered & Licensed</span>
              </div>
              <div className="text-xs font-mono">
                <span className="font-semibold text-foreground">Trade License No:</span>{" "}
                <span className="font-bold text-emerald-700 dark:text-emerald-400">03247/2023-2025</span>
              </div>
              <p className="text-[11px] text-muted-foreground">
                Dhaka City Corporation Authorized Voluntary Education & Youth Platform
              </p>
            </div>
          </div>

          {/* Column 2: Quick Links & Competitions (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              {lang === "en" ? "Olympiad Tracks" : "প্রতিযোগিতা ক্যাটাগরি"}
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground font-medium">
              <li>
                <Link href="/#categories" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  {lang === "en" ? "Junior Class (6–8)" : "জুনিয়র ক্যাটাগরি (৬ষ্ঠ–৮ম)"}
                </Link>
              </li>
              <li>
                <Link href="/#categories" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  {lang === "en" ? "Secondary Class (9–10)" : "মাধ্যমিক ক্যাটাগরি (৯ম–১০ম)"}
                </Link>
              </li>
              <li>
                <Link href="/#categories" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  {lang === "en" ? "Higher Secondary (11–12)" : "উচ্চ মাধ্যমিক (১১শ–১২শ)"}
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  {lang === "en" ? "Agri-Skill Courses (BDT)" : "কৃষি স্কিল কোর্সসমূহ"}
                </Link>
              </li>
              <li>
                <Link href="/apply" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  {lang === "en" ? "Register Season 2025" : "রেজিস্ট্রেশন করুন"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Statutory Policies (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              {lang === "en" ? "Statutory & Merchant Policies" : "আইনগত ও মার্চেন্ট নীতিমালা"}
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground font-medium">
              <li>
                <Link
                  href="/about"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                  <span>{lang === "en" ? "About Us (Company Story)" : "আমাদের সম্পর্কে"}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-condition"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                  <span>{lang === "en" ? "Terms & Conditions" : "শর্তাবলী ও নীতিমালা"}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/refund-policy"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <RefreshCcw className="w-3.5 h-3.5 text-slate-400" />
                  <span>{lang === "en" ? "Return & Refund Policy" : "রিটার্ন ও রিফান্ড পলিসি"}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                  <span>{lang === "en" ? "Privacy Policy" : "গোপনীয়তা নীতিমালা"}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/delivery-policy"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <Truck className="w-3.5 h-3.5 text-slate-400" />
                  <span>{lang === "en" ? "Delivery Policy" : "ডেলিভারি পলিসি"}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Physical Office Address & WhatsApp Hotline (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              {lang === "en" ? "Secretariat & Contact" : "যোগাযোগ ও প্রধান কার্যালয়"}
            </h4>
            <address className="not-italic space-y-2.5 text-xs text-muted-foreground">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  House 04, Road 12/b, Sector 10,
                  <br />
                  Uttara Model Town, Dhaka, Bangladesh
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <PhoneCall className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <div>
                  <a
                    href="tel:+8801717395047"
                    className="font-mono font-bold text-foreground hover:text-emerald-600 transition-colors"
                  >
                    +880 1717-395047
                  </a>
                  <span className="ml-1 text-[10px] text-emerald-600 font-semibold">(WhatsApp Available)</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <a
                  href="mailto:agriculturalolympiad@gmail.com"
                  className="hover:text-emerald-600 transition-colors break-all"
                >
                  agriculturalolympiad@gmail.com
                </a>
              </div>
            </address>

            {/* Currency Indicator */}
            <div className="pt-2">
              <div className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>Currency: <strong className="text-foreground">BDT (Bangladeshi Taka / ৳)</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* SSLCommerz & Payment Methods Banner */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-xs font-bold text-foreground flex items-center justify-center md:justify-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Secure Checkout via SSLCommerz Gateway</span>
            </div>
            <p className="text-[11px] text-muted-foreground">
              Supported Payment Methods: bKash Direct, Nagad, Rocket, Upay, Visa, Mastercard, AMEX, Internet Banking
            </p>
          </div>

          {/* Payment Method Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-[10px] font-mono font-bold">
            <span className="px-2.5 py-1 rounded-md bg-pink-500/10 text-pink-700 dark:text-pink-300 border border-pink-500/20">
              bKash
            </span>
            <span className="px-2.5 py-1 rounded-md bg-orange-500/10 text-orange-700 dark:text-orange-300 border border-orange-500/20">
              Nagad
            </span>
            <span className="px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20">
              Rocket
            </span>
            <span className="px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20">
              Visa / MC
            </span>
            <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
              EPS PSO
            </span>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div>
            © {new Date().getFullYear()} National Agricultural Olympiad (জাতীয় কৃষি অলিম্পিয়াড). All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-3 text-[11px]">
            <Link href="/terms-condition" className="hover:underline">
              Terms & Conditions
            </Link>
            <span>·</span>
            <Link href="/refund-policy" className="hover:underline">
              Refund Policy
            </Link>
            <span>·</span>
            <Link href="/privacy-policy" className="hover:underline">
              Privacy Policy
            </Link>
            <span>·</span>
            <Link href="/delivery-policy" className="hover:underline">
              Delivery Policy
            </Link>
            <span>·</span>
            <Link href="/portal" className="hover:underline font-semibold text-emerald-600 dark:text-emerald-400">
              Council Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
