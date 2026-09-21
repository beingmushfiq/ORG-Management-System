"use client";

import React, { useState } from "react";
import {
  Award,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  ArrowLeft,
  Calendar,
  DollarSign,
  FileCheck,
} from "lucide-react";
import { Button, Badge, Card, CardHeader, CardTitle, CardDescription, CardContent } from "@org/ui";
import Link from "next/link";

interface MemberEligibilityState {
  memberId: string;
  name: string;
  nameBn: string;
  currentTier: "ASSOCIATE" | "GENERAL" | "LIFE";
  targetTier: "GENERAL" | "LIFE";
  scorePercent: number;
  continuousDays: number;
  requiredDays: number;
  suspensionDays: number;
  unpaidDues: number; // in Taka
  activityPoints: number;
  requiredPoints: number;
  isEligible: boolean;
  applicationStatus?: "IDLE" | "SUBMITTED" | "APPROVED";
}

const INITIAL_MEMBER: MemberEligibilityState = {
  memberId: "BMA-ASSOC-0142",
  name: "Dr. Salma Begum",
  nameBn: "ডাঃ সালমা বেগম",
  currentTier: "ASSOCIATE",
  targetTier: "GENERAL",
  scorePercent: 100,
  continuousDays: 412,
  requiredDays: 365,
  suspensionDays: 0,
  unpaidDues: 0,
  activityPoints: 65,
  requiredPoints: 50,
  isEligible: true,
  applicationStatus: "IDLE",
};

export default function MemberEligibilityPortal() {
  const [member, setMember] = useState<MemberEligibilityState>(INITIAL_MEMBER);
  const [applying, setApplying] = useState(false);

  const handleApply = () => {
    setApplying(true);
    setTimeout(() => {
      setMember((prev) => ({ ...prev, applicationStatus: "SUBMITTED" }));
      setApplying(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500/20 selection:text-amber-300">
      {/* Top Header */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-xl px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Link
            href="/portal/members"
            className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-mono tracking-wider uppercase"
          >
            <ArrowLeft className="w-4 h-4" /> Portal
          </Link>
          <span className="text-slate-700 font-mono">|</span>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="text-sm font-semibold tracking-wide uppercase text-slate-300">
              Constitutional Tier Progression & Eligibility Engine
            </span>
          </div>
        </div>

        <Badge variant="outline" className="border-emerald-500/40 text-emerald-400 bg-emerald-500/10 font-mono text-xs">
          Nightly Calculation Synced
        </Badge>
      </header>

      {/* Main Container */}
      <main className="max-w-5xl w-full mx-auto px-6 py-10 space-y-8">
        {/* Tier Progression Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-950 p-8 backdrop-blur-2xl shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-amber-400/40 text-amber-300 bg-amber-400/10 text-xs">
                  Progression Track
                </Badge>
                <span className="text-xs font-mono text-slate-400">
                  {member.currentTier} → {member.targetTier}
                </span>
              </div>
              <h1 className="text-3xl font-display font-bold text-white">
                {member.name}
              </h1>
              <p className="text-sm text-slate-400 font-bangla">{member.nameBn} · {member.memberId}</p>
            </div>

            {/* Score Radial / Percent */}
            <div className="flex items-center gap-5 p-4 rounded-2xl bg-slate-950/60 border border-white/10 shrink-0">
              <div className="text-right">
                <p className="text-[11px] uppercase font-mono text-slate-400 tracking-wider">
                  Eligibility Score
                </p>
                <p className="text-3xl font-bold font-mono text-amber-400">{member.scorePercent}%</p>
                <p className="text-[10px] text-emerald-400 font-mono">
                  {member.isEligible ? "All Criteria Satisfied" : "Requirements Pending"}
                </p>
              </div>
              <div className="w-14 h-14 rounded-full border-4 border-amber-500/20 border-t-amber-400 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-amber-400" />
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-8 space-y-2">
            <div className="flex justify-between text-xs font-mono text-slate-400">
              <span>Associate Standing</span>
              <span className="text-amber-300 font-bold">100% Unlocked</span>
              <span>General Member (Voting Rights)</span>
            </div>
            <div className="h-3 w-full rounded-full bg-slate-800 overflow-hidden p-0.5 border border-slate-700">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400 transition-all duration-1000 shadow-[0_0_12px_#f59e0b]"
                style={{ width: `${member.scorePercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Criteria Breakdown Grid */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            Audited Constitutional Criteria
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1. Active Tenure */}
            <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-xl">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-400" />
                    <CardTitle className="text-sm font-semibold text-white">
                      Continuous Active Tenure
                    </CardTitle>
                  </div>
                  <Badge variant="outline" className="border-emerald-500/40 text-emerald-400 bg-emerald-500/10 text-xs">
                    Met ✓
                  </Badge>
                </div>
                <CardDescription className="text-xs text-slate-400">
                  Must hold active status for at least 365 continuous days
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline justify-between font-mono text-xs">
                  <span className="text-slate-400">Current Standing:</span>
                  <span className="text-white font-bold text-sm">{member.continuousDays} Days</span>
                </div>
                <div className="flex items-baseline justify-between font-mono text-xs mt-1">
                  <span className="text-slate-400">Requirement:</span>
                  <span className="text-slate-400">{member.requiredDays} Days</span>
                </div>
              </CardContent>
            </Card>

            {/* 2. Disciplinary Gaps */}
            <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-xl">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-emerald-400" />
                    <CardTitle className="text-sm font-semibold text-white">
                      Disciplinary Standing
                    </CardTitle>
                  </div>
                  <Badge variant="outline" className="border-emerald-500/40 text-emerald-400 bg-emerald-500/10 text-xs">
                    Clean Record ✓
                  </Badge>
                </div>
                <CardDescription className="text-xs text-slate-400">
                  Suspension intervals are strictly deducted from active tenure
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline justify-between font-mono text-xs">
                  <span className="text-slate-400">Suspension Gaps:</span>
                  <span className="text-emerald-400 font-bold text-sm">0 Days</span>
                </div>
                <div className="flex items-baseline justify-between font-mono text-xs mt-1">
                  <span className="text-slate-400">Tolerance:</span>
                  <span className="text-slate-400">0 Days Allowed</span>
                </div>
              </CardContent>
            </Card>

            {/* 3. Dues Compliance */}
            <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-xl">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                    <CardTitle className="text-sm font-semibold text-white">
                      Dues & Invoicing Clearance
                    </CardTitle>
                  </div>
                  <Badge variant="outline" className="border-emerald-500/40 text-emerald-400 bg-emerald-500/10 text-xs">
                    Zero Outstanding ✓
                  </Badge>
                </div>
                <CardDescription className="text-xs text-slate-400">
                  Requires 100% dues clearance with zero outstanding paisa
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline justify-between font-mono text-xs">
                  <span className="text-slate-400">Outstanding Balance:</span>
                  <span className="text-emerald-400 font-bold text-sm">৳0.00 (0 Paisa)</span>
                </div>
                <div className="flex items-baseline justify-between font-mono text-xs mt-1">
                  <span className="text-slate-400">Verified By:</span>
                  <span className="text-slate-400">EPS Automated Reconciliation</span>
                </div>
              </CardContent>
            </Card>

            {/* 4. Activity Points */}
            <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-xl">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-amber-400" />
                    <CardTitle className="text-sm font-semibold text-white">
                      Institutional Activity Points
                    </CardTitle>
                  </div>
                  <Badge variant="outline" className="border-emerald-500/40 text-emerald-400 bg-emerald-500/10 text-xs">
                    Met ✓
                  </Badge>
                </div>
                <CardDescription className="text-xs text-slate-400">
                  Earned via scientific seminars, clinical symposiums, and volunteerism
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline justify-between font-mono text-xs">
                  <span className="text-slate-400">Accumulated Points:</span>
                  <span className="text-white font-bold text-sm">{member.activityPoints} Points</span>
                </div>
                <div className="flex items-baseline justify-between font-mono text-xs mt-1">
                  <span className="text-slate-400">Target Threshold:</span>
                  <span className="text-slate-400">{member.requiredPoints} Points</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Promotion Action Card */}
        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-base font-bold text-white flex items-center gap-2 justify-center sm:justify-start">
              <FileCheck className="w-5 h-5 text-emerald-400" />
              Promotion to General Membership
            </h3>
            <p className="text-xs text-slate-400">
              Applications are reviewed by the Central Secretariat and ratified by the President / General Secretary.
            </p>
          </div>

          <div>
            {member.applicationStatus === "IDLE" ? (
              <Button
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold"
                onClick={handleApply}
                disabled={!member.isEligible || applying}
              >
                {applying ? "Submitting Application..." : "Submit Promotion Application"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Badge variant="outline" className="border-emerald-500/40 text-emerald-400 bg-emerald-500/10 px-4 py-2 text-xs font-mono">
                <CheckCircle2 className="w-4 h-4 mr-2 inline" /> Application Awaiting Executive Gazette
              </Badge>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
