"use client";

import React, { useState } from "react";
import {
  Sun,
  Users,
  CreditCard,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Send,
} from "lucide-react";
import { Button } from "@org/ui";
import Link from "next/link";

export function ExecutiveMorningBriefing() {
  const [approvedAll, setApprovedAll] = useState(false);
  const [pendingCount, setPendingCount] = useState(12);

  const handleBulkApprove = () => {
    setApprovedAll(true);
    setPendingCount(0);
  };

  return (
    <div className="w-full rounded-3xl border border-amber-500/30 bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-950 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
            <Sun className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: "12s" }} />
            Executive Daily Briefing • ২২ সেপ্টেম্বর ২০২৬ (০৭ আশ্বিন ১৪৩৩)
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-white tracking-tight">
            Good Morning, General Secretary Dr. Kazi Mostafa
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            All 64 district branches are connected. Here is your synthesized institutional status report for today's executive docket.
          </p>
        </div>

        {/* Quick Executive Actions */}
        <div className="flex flex-wrap gap-2.5">
          <Link href="/portal/command/resolutions">
            <Button size="sm" className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs gap-1.5 shadow-md shadow-amber-500/20">
              <Calendar className="w-3.5 h-3.5" />
              <span>Draft Minutes & Resolutions</span>
            </Button>
          </Link>
          <Link href="/portal/communications">
            <Button size="sm" variant="outline" className="border-white/10 text-slate-200 hover:text-white text-xs gap-1.5">
              <Send className="w-3.5 h-3.5 text-amber-400" />
              <span>Dispatch SMS Broadcast</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Pending Approvals */}
        <div className="bg-slate-950/80 border border-white/5 rounded-2xl p-4 flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Pending Approvals</span>
            <Users className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black font-serif text-white">
            {pendingCount} Candidates
          </div>
          <div className="text-[11px] text-slate-400">
            {approvedAll ? (
              <span className="text-emerald-400 flex items-center gap-1 font-bold">
                <CheckCircle2 className="w-3 h-3" /> All 12 Endorsed
              </span>
            ) : (
              <button
                onClick={handleBulkApprove}
                className="text-amber-400 hover:underline font-semibold"
              >
                1-Click Endorse All (সব অনুমোদন)
              </button>
            )}
          </div>
        </div>

        {/* Treasury Dues Collection */}
        <div className="bg-slate-950/80 border border-white/5 rounded-2xl p-4 flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">September Inflows</span>
            <CreditCard className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black font-serif text-emerald-400">
            ৳4,85,000
          </div>
          <div className="text-[11px] text-slate-400">
            92% Dues Cleared • 0 Hardship Pending
          </div>
        </div>

        {/* Next Council Meeting */}
        <div className="bg-slate-950/80 border border-white/5 rounded-2xl p-4 flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Next Plenary Session</span>
            <Calendar className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-lg font-bold font-serif text-white">
            74th National AGM
          </div>
          <div className="text-[11px] text-slate-400">
            06 Nov 2026 • 420 Delegates Confirmed
          </div>
        </div>

        {/* Urgent Task Alert */}
        <div className="bg-slate-950/80 border border-red-500/20 rounded-2xl p-4 flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-red-400 font-semibold">Priority Action</span>
            <AlertTriangle className="w-4 h-4 text-red-400 animate-pulse" />
          </div>
          <div className="text-sm font-bold text-white">
            Monsoon Flood Camp 4
          </div>
          <div className="text-[11px] text-slate-400">
            Feni Parshuram flotilla operational
          </div>
        </div>
      </div>
    </div>
  );
}
