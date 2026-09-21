"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, ShieldCheck } from "lucide-react";

interface InstitutionalLoaderProps {
  label?: string;
  labelBn?: string;
  fullscreen?: boolean;
  size?: "sm" | "md" | "lg";
}

const TELEMETRY_MESSAGES = [
  { en: "Verifying cryptographic SHA-256 seal...", bn: "ডিজিটাল সিকিউরিটি সিল যাচাই করা হচ্ছে..." },
  { en: "Loading 64-district branch registry...", bn: "৬৪ জেলার শাখা রেজিস্ট্রি লোড হচ্ছে..." },
  { en: "Securing 4-layer multi-tenant boundary...", bn: "মাল্টি-টেন্যান্ট নিরাপত্তা স্তর নিশ্চিত করা হচ্ছে..." },
  { en: "Synchronizing Societies Act 1860 ledger...", bn: "১৮৬০ সালের সমিতি আইনের লেজার সিঙ্ক হচ্ছে..." },
];

export function InstitutionalLoader({
  label,
  labelBn,
  fullscreen = false,
  size = "md",
}: InstitutionalLoaderProps) {
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIdx((prev) => (prev + 1) % TELEMETRY_MESSAGES.length);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  const dimensions = {
    sm: "w-10 h-10",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  }[size];

  const content = (
    <div className="flex flex-col items-center justify-center text-center p-6 space-y-5">
      {/* Animated Rotating Crest Spinner */}
      <div className={`relative ${dimensions} flex items-center justify-center`}>
        {/* Outer ambient glow */}
        <div className="absolute inset-0 rounded-full bg-amber-500/20 blur-xl animate-pulse" />

        {/* Counter-rotating geometric outer ring */}
        <div className="absolute inset-0 rounded-full border-2 border-amber-500/30 border-t-amber-400 animate-spin" style={{ animationDuration: "3s" }} />

        {/* Inner fast-spinning dashed ring */}
        <div className="absolute inset-2 rounded-full border border-dashed border-amber-400/60 animate-spin" style={{ animationDirection: "reverse", animationDuration: "6s" }} />

        {/* Central Core Emblem */}
        <div className="relative z-10 w-3/5 h-3/5 rounded-full bg-slate-950 border border-amber-400/80 shadow-lg flex items-center justify-center text-amber-400">
          <span className="text-sm sm:text-base font-serif font-black select-none">
            ⚕
          </span>
        </div>
      </div>

      {/* Progress Bar & Telemetry */}
      <div className="max-w-xs w-full space-y-2">
        <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5 relative">
          <div className="h-full bg-gradient-to-r from-amber-500 via-yellow-300 to-amber-500 rounded-full animate-indeterminate-bar" />
        </div>

        <div className="space-y-0.5">
          <div className="text-xs font-semibold text-slate-200 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" />
            <span>{label || TELEMETRY_MESSAGES[msgIdx]?.en}</span>
          </div>
          <div className="text-[11px] text-slate-400 font-bangla">
            {labelBn || TELEMETRY_MESSAGES[msgIdx]?.bn}
          </div>
        </div>
      </div>

      {/* Institutional Security Pill */}
      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-muted/60 border border-border text-[10px] text-muted-foreground font-mono">
        <ShieldCheck className="w-3 h-3 text-emerald-500" />
        <span>RSM Autonomous Governance System</span>
      </div>
    </div>
  );

  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-background/85 backdrop-blur-xl flex items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
}
