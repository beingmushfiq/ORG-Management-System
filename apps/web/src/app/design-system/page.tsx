"use client";

import React, { useState } from "react";
import { Button, Badge, Card, CardHeader, CardTitle, CardDescription, CardContent, Input } from "@org/ui";
import { ArrowLeft, CheckCircle2, Sparkles, Sliders } from "lucide-react";
import Link from "next/link";

const PRESET_THEMES = [
  {
    name: "BMA Royal Blue (Default)",
    primaryHsl: "221 83% 53%",
    accentHsl: "38 92% 50%",
    bgPreview: "bg-blue-600",
  },
  {
    name: "Red Crescent Forest Green",
    primaryHsl: "158 64% 42%",
    accentHsl: "45 93% 47%",
    bgPreview: "bg-emerald-600",
  },
  {
    name: "Alumni Crimson Maroon",
    primaryHsl: "348 83% 47%",
    accentHsl: "210 40% 98%",
    bgPreview: "bg-rose-700",
  },
  {
    name: "IEB Engineering Cyan",
    primaryHsl: "199 89% 48%",
    accentHsl: "24 94% 53%",
    bgPreview: "bg-sky-500",
  },
];

const BENGALI_CONJUNCTS = [
  { char: "ক্ষ", label: "ক্ + ষ (kṣa)", example: "চিকিৎসক, পরীক্ষা, ক্ষেত্র" },
  { char: "ঞ্জ", label: "ঞ্ + জ (ñja)", example: "বিজ্ঞান, সঞ্জয়, ব্যঞ্জন" },
  { char: "ষ্ণ", label: "ষ্ + ণ (ṣṇa)", example: "উষ্ণতা, বৈষ্ণব, কৃষ্ণ" },
  { char: "ঙ্ঘ", label: "ঙ্ + ঘ (ṅgha)", example: "সঙ্ঘ, লঙ্ঘন, জঙ্ঘা" },
  { char: "ঙ্গ", label: "ঙ্ + গ (ṅga)", example: "বঙ্গবন্ধু, অঙ্গ, সঙ্গম" },
  { char: "ত্র", label: "ত্ + র (tra)", example: "নেতৃত্ব, ছাত্র, চরিত্র" },
  { char: "ঙ্ক", label: "ঙ্ + ক (ṅka)", example: "অঙ্কুর, কঙ্কণ, আতঙ্ক" },
  { char: "ঞ্চ", label: "ঞ্ + চ (ñca)", example: "অঞ্চল, কাঞ্চন, পঞ্চায়েত" },
];

export default function DesignSystemValidationPage() {
  const [activeTheme, setActiveTheme] = useState(PRESET_THEMES[0]!);

  const applyTheme = (theme: typeof PRESET_THEMES[0]) => {
    setActiveTheme(theme);
    if (typeof document !== "undefined") {
      document.documentElement.style.setProperty("--primary", theme.primaryHsl);
      document.documentElement.style.setProperty("--accent", theme.accentHsl);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8 max-w-6xl mx-auto space-y-12">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-white mb-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Public Portfolio
          </Link>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Design System & Bilingual Typography Lab
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Validating dynamic tenant HSL theme shifting, Bengali conjunct ligature fidelity, and UI primitives.
          </p>
        </div>
        <Badge variant="success" className="gap-1.5 px-3 py-1 text-xs">
          <CheckCircle2 className="w-3.5 h-3.5" /> Phase 1 Verified
        </Badge>
      </div>

      {/* ================= 1. DYNAMIC TENANT THEME SHIFTER ================= */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Sliders className="w-4 h-4" />
            Runtime Tenant Customizer
          </div>
          <CardTitle>Dynamic HSL CSS-Variable Palette Engine</CardTitle>
          <CardDescription>
            Switch organization themes instantly. The entire UI recalculates contrast and shadows without reloading.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {PRESET_THEMES.map((theme) => {
              const isSelected = activeTheme.name === theme.name;
              return (
                <button
                  key={theme.name}
                  onClick={() => applyTheme(theme)}
                  className={`p-4 rounded-xl border text-left flex flex-col justify-between transition-all ${
                    isSelected
                      ? "border-primary bg-primary/10 shadow-lg ring-2 ring-primary/40"
                      : "border-white/10 bg-slate-900/40 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-3">
                    <span className={`w-5 h-5 rounded-full ${theme.bgPreview} shadow`} />
                    {isSelected && <Sparkles className="w-4 h-4 text-primary" />}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{theme.name}</div>
                    <div className="text-[11px] text-muted-foreground font-mono mt-0.5">
                      HSL({theme.primaryHsl})
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="p-5 rounded-xl border border-white/10 bg-slate-950 flex flex-wrap items-center gap-4">
            <Button variant="primary">Active Primary CTA</Button>
            <Button variant="secondary">Secondary Action</Button>
            <Button variant="outline">Outline Action</Button>
            <Button variant="glass">Frosted Glass Action</Button>
            <Badge variant="default">Primary Badge</Badge>
            <Badge variant="warning">Warning Badge</Badge>
          </div>
        </CardContent>
      </Card>

      {/* ================= 2. BENGALI CONJUNCT LIGATURE LAB ================= */}
      <Card>
        <CardHeader>
          <div className="text-emerald-400 text-xs font-bold uppercase tracking-wider">
            Typography Validation
          </div>
          <CardTitle>Bangla Conjunct Ligature Integrity Suite</CardTitle>
          <CardDescription>
            Ensures complex Bengali conjuncts render flawlessly without disjointed glyphs across all weights.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {BENGALI_CONJUNCTS.map((item, i) => (
              <div
                key={i}
                className="p-5 rounded-xl border border-white/10 bg-slate-900/50 flex flex-col justify-between"
              >
                <div className="flex items-start justify-between">
                  <span className="text-4xl font-extrabold text-white font-bangla">
                    {item.char}
                  </span>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-white/10 text-slate-300">
                    {item.label}
                  </span>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10">
                  <div className="text-xs text-muted-foreground">Contextual Sample:</div>
                  <div className="text-sm font-semibold text-slate-200 font-bangla mt-0.5">
                    {item.example}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bilingual Full Paragraph Test */}
          <div className="mt-8 p-6 rounded-xl border border-white/10 bg-slate-950 space-y-3 font-bangla">
            <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground font-sans">
              Bilingual Editorial Rendering (Hind Siliguri + Plus Jakarta Sans)
            </div>
            <p className="text-lg text-slate-200 leading-relaxed">
              বাংলাদেশ মেডিকেল এসোসিয়েশন (বিএমএ) চট্টগ্রাম মহানগর শাখার সকল সম্মানিত চিকিৎসকদের
              অঙ্গিকার—উচ্চতর চিকিৎসা গবেষণা, বিজ্ঞানমনস্ক দৃষ্টিভঙ্গি এবং যেকোনো প্রাকৃতিক দুর্যোগ ও
              মহামারীতে মানবিক স্বাস্থ্যসেবা নিশ্চিতকরণ।
            </p>
            <p className="text-xs text-muted-foreground font-sans">
              Line height: 1.75 · Optical kerning enabled · Feature settings: cv02, cv03, cv04, cv11
            </p>
          </div>
        </CardContent>
      </Card>

      {/* ================= 3. UI FORM PRIMITIVES TEST ================= */}
      <Card>
        <CardHeader>
          <CardTitle>Accessible Form Primitives</CardTitle>
          <CardDescription>
            Validating Input, Button, Card and responsive focus states.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                Member Full Name
              </label>
              <Input placeholder="Prof. Dr. Mujibul Haque" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                Membership Number
              </label>
              <Input placeholder="BMA-LIFE-0001" />
            </div>
            <div className="flex items-end">
              <Button className="w-full h-11">Search Directory</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
