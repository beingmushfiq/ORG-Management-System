"use client";

import React, { useState } from "react";
import {
  QrCode,
  CheckCircle2,
  ArrowLeft,
  Camera,
  Ticket,
  Utensils,
  Vote,
} from "lucide-react";
import { Button, Badge } from "@org/ui";
import Link from "next/link";

interface CheckInAttendee {
  memberId: string;
  name: string;
  nameBn: string;
  tier: string;
  branch: string;
  tokenNumber: number;
  dinnerCoupon: string;
  duesStatus: "CLEARED" | "UNPAID_WARNING";
  isVoterEligible: boolean;
  timeCheckedIn: string;
}

export default function GateCheckInPage() {
  const [checkedCount, setCheckedCount] = useState(148);
  const [totalExpected] = useState(260);
  const [scanning, setScanning] = useState(false);
  const [lastAttendee, setLastAttendee] = useState<CheckInAttendee | null>({
    memberId: "BMA-GEN-0142",
    name: "Dr. Salma Begum",
    nameBn: "ডাঃ সালমা বেগম",
    tier: "GENERAL",
    branch: "Kotwali Central Hospital Unit",
    tokenNumber: 148,
    dinnerCoupon: "DIN-AGM-0148",
    duesStatus: "CLEARED",
    isVoterEligible: true,
    timeCheckedIn: "Just now",
  });

  const handleSimulateScan = () => {
    setScanning(true);
    setTimeout(() => {
      const nextToken = checkedCount + 1;
      setCheckedCount(nextToken);
      setLastAttendee({
        memberId: `BMA-GEN-0${nextToken + 50}`,
        name: "Dr. Kazi Mostafa",
        nameBn: "ডাঃ কাজী মোস্তফা",
        tier: "GENERAL",
        branch: "Panchlaish Clinic Circle",
        tokenNumber: nextToken,
        dinnerCoupon: `DIN-AGM-${String(nextToken).padStart(4, "0")}`,
        duesStatus: "CLEARED",
        isVoterEligible: true,
        timeCheckedIn: "Just now",
      });
      setScanning(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500/20 selection:text-amber-300">
      {/* Top Bar */}
      <header className="px-6 py-4 border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-xl flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Link
            href="/portal/command"
            className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-mono tracking-wider uppercase"
          >
            <ArrowLeft className="w-4 h-4" /> Council War Room
          </Link>
          <span className="text-slate-700 font-mono">|</span>
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-amber-400" />
            <span className="text-sm font-semibold tracking-wide uppercase text-slate-300">
              Gate Steward & Conference Reception Scanner
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="outline" className="border-emerald-500/40 text-emerald-400 bg-emerald-500/10 font-mono text-xs">
            Scanner Ready (PWA Offline Synced)
          </Badge>
        </div>
      </header>

      {/* Main Scanner Console */}
      <main className="max-w-4xl w-full mx-auto px-6 py-8 space-y-6">
        {/* Event Banner & Quorum Stat */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <Badge variant="outline" className="border-amber-500/40 text-amber-400 bg-amber-500/10 text-[10px]">
                Active Session
              </Badge>
              <span className="text-xs font-mono text-slate-400">Main Convention Hall (Gate A & B)</span>
            </div>
            <h1 className="text-xl font-display font-bold text-white">
              74th Annual National Conference & General Meeting
            </h1>
            <p className="text-xs text-slate-400 font-bangla">
              ৭৪তম বার্ষিক সাধারণ সভা ও জাতীয় সম্মেলন ২০২৬
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center font-mono shrink-0">
            <p className="text-[10px] uppercase text-slate-500">Total Checked In</p>
            <p className="text-2xl font-bold text-emerald-400">{checkedCount} / {totalExpected}</p>
            <p className="text-[10px] text-amber-400">
              {Math.round((checkedCount / totalExpected) * 100)}% Quorum Progress
            </p>
          </div>
        </div>

        {/* Camera Viewfinder & Trigger */}
        <div className="rounded-3xl border-2 border-dashed border-amber-500/40 bg-slate-900/40 p-8 text-center backdrop-blur-xl relative overflow-hidden">
          <div className="max-w-sm mx-auto space-y-4">
            <div className="relative w-40 h-40 mx-auto rounded-3xl border-2 border-amber-400/80 bg-slate-950/80 flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.15)]">
              {/* Animated scan line */}
              <div className="absolute inset-x-2 h-0.5 bg-amber-400 shadow-[0_0_10px_#f59e0b] animate-scan" />
              <QrCode className="w-20 h-20 text-slate-700" />
            </div>

            <div>
              <p className="text-sm font-semibold text-white">
                Position Member's Holographic Card or Phone QR Code
              </p>
              <p className="text-xs text-slate-400 font-bangla mt-0.5">
                ক্যামেরার সামনে ডিজিটাল বা প্লাস্টিক কার্ডের কিউআর কোডটি ধরুন
              </p>
            </div>

            <Button
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold"
              onClick={handleSimulateScan}
              disabled={scanning}
            >
              <Camera className="w-4 h-4 mr-2" />
              {scanning ? "Reading Card..." : "Scan Member Card (Camera)"}
            </Button>
          </div>
        </div>

        {/* Latest Checked-In Member Badge Card */}
        {lastAttendee && (
          <div className="rounded-2xl border border-emerald-500/40 bg-gradient-to-r from-emerald-950/30 via-slate-900 to-slate-900 p-6 backdrop-blur-xl space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono uppercase text-emerald-400 font-bold">
                      ENTRY AUTHORIZED
                    </span>
                    <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 text-[10px]">
                      {lastAttendee.tier} Member
                    </Badge>
                  </div>
                  <h2 className="text-xl font-bold text-white mt-0.5">{lastAttendee.name}</h2>
                  <p className="text-xs text-slate-400 font-bangla">{lastAttendee.nameBn} · {lastAttendee.memberId}</p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-mono text-slate-500 block uppercase">Reception Token</span>
                <span className="text-2xl font-bold font-mono text-amber-400">#{lastAttendee.tokenNumber}</span>
              </div>
            </div>

            {/* Token Perks Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2.5">
                <Ticket className="w-4 h-4 text-blue-400 shrink-0" />
                <div className="text-xs">
                  <span className="text-slate-400 block text-[10px]">Conference Kit</span>
                  <span className="text-white font-medium">Kit Bag Token Issued</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2.5">
                <Utensils className="w-4 h-4 text-amber-400 shrink-0" />
                <div className="text-xs">
                  <span className="text-slate-400 block text-[10px]">Banquet Coupon</span>
                  <span className="text-amber-300 font-mono font-medium">{lastAttendee.dinnerCoupon}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2.5">
                <Vote className="w-4 h-4 text-emerald-400 shrink-0" />
                <div className="text-xs">
                  <span className="text-slate-400 block text-[10px]">AGM Voting Right</span>
                  <span className="text-emerald-400 font-medium">Eligible Delegate ✓</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
