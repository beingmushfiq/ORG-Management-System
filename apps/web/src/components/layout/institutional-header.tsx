"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Globe,
  Menu,
  X,
  Sparkles,
  ArrowRight,
  LogIn,
} from "lucide-react";
import { Button } from "@org/ui";
import { OrgLogo } from "@/components/brand/org-logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { CommandPalette } from "@/components/ui/command-palette";

interface HeaderProps {
  lang: "en" | "bn";
  onToggleLang: () => void;
}

export function InstitutionalHeader({ lang, onToggleLang }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/85 backdrop-blur-2xl transition-colors">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="shrink-0 flex items-center gap-3">
          <OrgLogo
            size="md"
            tenantName="National Agricultural Olympiad"
            tenantNameBn="জাতীয় কৃষি অলিম্পিয়াড"
            subtitle="Season 2025 · Empowering Youth in Smart Agriculture"
            subtitleBn="স্মার্ট ও টেকসই কৃষির জাতীয় প্ল্যাটফর্ম"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-700 dark:text-slate-200">
          <Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            {lang === "en" ? "Home" : "মূলপাতা"}
          </Link>
          <Link href="/about" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            {lang === "en" ? "About Us" : "আমাদের সম্পর্কে"}
          </Link>
          <a href="/#categories" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            {lang === "en" ? "Categories" : "ক্যাটাগরি"}
          </a>
          <a href="/#prizes" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            {lang === "en" ? "Prizes" : "পুরস্কার"}
          </a>
          <Link href="/courses" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            {lang === "en" ? "Courses (BDT)" : "কোর্সসমূহ"}
          </Link>
          <Link href="/events" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            {lang === "en" ? "Events" : "ইভেন্ট"}
          </Link>
          <Link href="/causes" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            {lang === "en" ? "Impact Funds" : "তহবিল ও অনুদান"}
          </Link>
          <Link href="/notices" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            {lang === "en" ? "Notices" : "বিজ্ঞপ্তি"}
          </Link>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <CommandPalette />
          <ThemeToggle variant="pill" />

          {/* Bilingual Language Switcher */}
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleLang}
            className="gap-1.5 text-xs text-foreground border-border bg-card"
          >
            <Globe className="w-3.5 h-3.5 text-amber-500" />
            <span>{lang === "en" ? "বাংলা" : "English"}</span>
          </Button>

          {/* Portal Login Gateway */}
          <Link href="/portal" className="hidden sm:inline-flex">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs font-semibold text-foreground hover:text-emerald-600 gap-1.5"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{lang === "en" ? "Portal Login" : "লগইন"}</span>
            </Button>
          </Link>

          {/* HopeNest Gold Primary CTA: Register Now (BDT 70) */}
          <Link href="/apply">
            <Button
              variant="primary"
              size="sm"
              className="gap-1.5 text-xs font-extrabold bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 shadow-md shadow-amber-500/20"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === "en" ? "Register (BDT 70)" : "রেজিস্ট্রেশন (৭০ ৳)"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg border border-border bg-card text-foreground"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-border bg-background/95 px-6 py-4 space-y-3">
          <div className="flex flex-col space-y-2 text-sm font-semibold">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-muted text-foreground"
            >
              {lang === "en" ? "Home" : "মূলপাতা"}
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-muted text-foreground"
            >
              {lang === "en" ? "About Us (Company Story)" : "আমাদের সম্পর্কে"}
            </Link>
            <Link
              href="/courses"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-muted text-foreground"
            >
              {lang === "en" ? "Agri-Skill Courses (BDT)" : "কোর্সসমূহ (বিডিটি)"}
            </Link>
            <Link
              href="/events"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-muted text-foreground"
            >
              {lang === "en" ? "Olympiad Events & Finale" : "অলিম্পিয়াড ইভেন্ট ও ফিনালে"}
            </Link>
            <Link
              href="/causes"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-muted text-foreground"
            >
              {lang === "en" ? "Youth Agri-Impact Funds" : "তহবিল ও অনুদান"}
            </Link>
            <Link
              href="/notices"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-muted text-foreground"
            >
              {lang === "en" ? "Notices & Guidelines" : "বিজ্ঞপ্তি"}
            </Link>
            <Link
              href="/terms-condition"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-muted text-muted-foreground text-xs"
            >
              Terms & Conditions
            </Link>
            <Link
              href="/refund-policy"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-muted text-muted-foreground text-xs"
            >
              Return & Refund Policy
            </Link>
            <Link
              href="/privacy-policy"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-muted text-muted-foreground text-xs"
            >
              Privacy Policy
            </Link>
            <Link
              href="/delivery-policy"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-muted text-muted-foreground text-xs"
            >
              Delivery Policy
            </Link>
            <Link
              href="/portal"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold"
            >
              Executive Council Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
