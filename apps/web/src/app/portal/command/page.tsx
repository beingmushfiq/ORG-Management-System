"use client";

import React, { useState } from "react";
import {
  Compass,
  Users,
  DollarSign,
  Vote,
  FileCheck,
  Building,
  CheckCircle2,
  Clock,
  ArrowLeft,
  PenTool,
  Upload,
  BarChart3,
} from "lucide-react";
import { Button, Badge, Card, CardHeader, CardTitle, CardDescription, CardContent } from "@org/ui";
import Link from "next/link";

interface BranchHealthMetric {
  id: string;
  name: string;
  duesCollectionPercent: number;
  activityScore: number;
  vacantSeats: number;
  totalSeats: number;
  status: "OPTIMAL" | "ATTENTION" | "CRITICAL";
}

const BRANCH_HEALTH_DATA: BranchHealthMetric[] = [
  {
    id: "b-1",
    name: "Central Executive Secretariat",
    duesCollectionPercent: 98.4,
    activityScore: 94,
    vacantSeats: 0,
    totalSeats: 15,
    status: "OPTIMAL",
  },
  {
    id: "b-2",
    name: "Chattogram Division Secretariat",
    duesCollectionPercent: 91.2,
    activityScore: 88,
    vacantSeats: 1,
    totalSeats: 12,
    status: "OPTIMAL",
  },
  {
    id: "b-3",
    name: "Kotwali Central Hospital Unit",
    duesCollectionPercent: 78.5,
    activityScore: 82,
    vacantSeats: 2,
    totalSeats: 9,
    status: "ATTENTION",
  },
  {
    id: "b-4",
    name: "Panchlaish Clinic Circle",
    duesCollectionPercent: 64.0,
    activityScore: 61,
    vacantSeats: 3,
    totalSeats: 8,
    status: "CRITICAL",
  },
];

export default function ExecutiveCommandWarRoom() {
  const [quorumMeetingType, setQuorumMeetingType] = useState<"REGULAR_AGM" | "CONSTITUTIONAL_EGM">("REGULAR_AGM");
  const [verifiedAttendees, setVerifiedAttendees] = useState(148);
  const totalVotingRoll = 260; // Paid-up General + Life members

  const quorumThresholdPercent = quorumMeetingType === "REGULAR_AGM" ? 50.0 : 66.67;
  const currentAttendancePercent = Math.round((verifiedAttendees / totalVotingRoll) * 10000) / 100;
  const isQuorumMet = currentAttendancePercent >= quorumThresholdPercent;

  // Circular state
  const [circularHeadline, setCircularHeadline] = useState("");
  const [circularSigned, setCircularSigned] = useState(false);

  // Election mode
  const [electionMode, setElectionMode] = useState<"OFFLINE_GAZETTE" | "DIGITAL_BALLOT">("OFFLINE_GAZETTE");
  const [gazetteUploaded, setGazetteUploaded] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500/20 selection:text-amber-300">
      {/* Executive Command Header */}
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
            <Compass className="w-5 h-5 text-amber-400" />
            <span className="text-sm font-semibold tracking-wide uppercase text-slate-300">
              Executive Command War Room · President & General Secretary
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-amber-500/40 text-amber-400 bg-amber-500/10 font-mono text-xs">
            Term: 2026-2028 Executive Council
          </Badge>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl w-full mx-auto px-6 py-8 space-y-8">
        {/* Real-Time Command Velocity Ticker */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-xl">
            <CardHeader className="pb-2">
              <CardDescription className="text-xs uppercase tracking-wider font-mono text-slate-400">
                Total Registered Members
              </CardDescription>
              <CardTitle className="text-2xl font-bold text-white flex items-baseline justify-between mt-1">
                <span>1,420</span>
                <Users className="w-4 h-4 text-blue-400" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-slate-500 font-mono">Across 4 branch subtrees</p>
            </CardContent>
          </Card>

          <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-xl">
            <CardHeader className="pb-2">
              <CardDescription className="text-xs uppercase tracking-wider font-mono text-slate-400">
                Constitutional Voting Pool
              </CardDescription>
              <CardTitle className="text-2xl font-bold text-amber-400 flex items-baseline justify-between mt-1">
                <span>{totalVotingRoll} Members</span>
                <Vote className="w-4 h-4 text-amber-400" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-slate-500 font-mono">Paid-up General & Life members</p>
            </CardContent>
          </Card>

          <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-xl">
            <CardHeader className="pb-2">
              <CardDescription className="text-xs uppercase tracking-wider font-mono text-slate-400">
                Dues Settlement Velocity
              </CardDescription>
              <CardTitle className="text-2xl font-bold text-emerald-400 flex items-baseline justify-between mt-1">
                <span>88.6%</span>
                <DollarSign className="w-4 h-4 text-emerald-400" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-slate-500 font-mono">৳4,82,500 settled via EPS & MFS</p>
            </CardContent>
          </Card>

          <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-xl">
            <CardHeader className="pb-2">
              <CardDescription className="text-xs uppercase tracking-wider font-mono text-slate-400">
                Council Directives Issued
              </CardDescription>
              <CardTitle className="text-2xl font-bold text-white flex items-baseline justify-between mt-1">
                <span>32 Circulars</span>
                <FileCheck className="w-4 h-4 text-amber-400" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-slate-500 font-mono">Cryptographically sealed</p>
            </CardContent>
          </Card>
        </div>

        {/* Section 1: AGM / EGM Real-Time Quorum Engine */}
        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-xl overflow-hidden shadow-2xl">
          <CardHeader className="border-b border-slate-800/80 pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  AGM / EGM Real-Time Quorum Verification Engine
                </CardTitle>
                <CardDescription className="text-xs text-slate-400">
                  Enforces constitutional quorum threshold before official motions or voting can commence
                </CardDescription>
              </div>

              {/* Meeting Type Selector */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800">
                <button
                  type="button"
                  onClick={() => setQuorumMeetingType("REGULAR_AGM")}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                    quorumMeetingType === "REGULAR_AGM"
                      ? "bg-amber-500 text-slate-950 font-bold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Regular AGM (50%)
                </button>
                <button
                  type="button"
                  onClick={() => setQuorumMeetingType("CONSTITUTIONAL_EGM")}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                    quorumMeetingType === "CONSTITUTIONAL_EGM"
                      ? "bg-amber-500 text-slate-950 font-bold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Special EGM (66.7%)
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-slate-950/80 border border-slate-800">
              <div className="space-y-1 text-center md:text-left">
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <span className="text-xs font-mono uppercase text-slate-400">Current Status:</span>
                  {isQuorumMet ? (
                    <Badge variant="outline" className="border-emerald-500/40 text-emerald-400 bg-emerald-500/10 font-mono text-xs">
                      QUORUM ESTABLISHED ✓
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="border-amber-500/40 text-amber-400 bg-amber-500/10 font-mono text-xs">
                      QUORUM PENDING ...
                    </Badge>
                  )}
                </div>
                <h3 className="text-3xl font-display font-bold text-white">
                  {currentAttendancePercent}% Verified Attendance
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  {verifiedAttendees} Present / {totalVotingRoll} Registered Voting Delegates (Threshold: {quorumThresholdPercent}%)
                </p>
              </div>

              {/* Attendee Simulator Control */}
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-slate-700 text-slate-300 text-xs"
                  onClick={() => setVerifiedAttendees((prev) => Math.max(0, prev - 10))}
                >
                  -10 Attendees
                </Button>
                <Button
                  size="sm"
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
                  onClick={() => setVerifiedAttendees((prev) => Math.min(totalVotingRoll, prev + 10))}
                >
                  +10 Attendees (QR Check-in)
                </Button>
              </div>
            </div>

            {/* Quorum Progress Indicator */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono text-slate-400">
                <span>0 Attendees</span>
                <span className="text-amber-400 font-bold">
                  Quorum Mark: {Math.ceil((totalVotingRoll * quorumThresholdPercent) / 100)} Delegates ({quorumThresholdPercent}%)
                </span>
                <span>{totalVotingRoll} Total</span>
              </div>
              <div className="h-3 w-full rounded-full bg-slate-800 overflow-hidden p-0.5 relative">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    isQuorumMet ? "bg-emerald-400 shadow-[0_0_12px_#10b981]" : "bg-amber-400"
                  }`}
                  style={{ width: `${Math.min(100, currentAttendancePercent)}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Branch Health Heatmap */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-amber-400" />
                Branch Unit Health Heatmap
              </h2>
              <p className="text-xs text-slate-400">
                Monitors dues compliance velocity, activity participation, and executive seat vacancies
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BRANCH_HEALTH_DATA.map((branch) => (
              <Card
                key={branch.id}
                className={`border bg-slate-900/40 backdrop-blur-xl ${
                  branch.status === "OPTIMAL"
                    ? "border-emerald-500/30"
                    : branch.status === "ATTENTION"
                    ? "border-amber-500/40"
                    : "border-rose-500/40"
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-500">{branch.id}</span>
                    <Badge
                      variant="outline"
                      className={`text-[10px] ${
                        branch.status === "OPTIMAL"
                          ? "border-emerald-500/40 text-emerald-400"
                          : branch.status === "ATTENTION"
                          ? "border-amber-500/40 text-amber-400"
                          : "border-rose-500/40 text-rose-400"
                      }`}
                    >
                      {branch.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-sm font-bold text-white flex items-center gap-1.5 mt-1">
                    <Building className="w-4 h-4 text-slate-400 shrink-0" />
                    {branch.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Dues Settled:</span>
                    <span className="text-white font-bold">{branch.duesCollectionPercent}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Activity Score:</span>
                    <span className="text-amber-400 font-bold">{branch.activityScore}/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Executive Seats:</span>
                    <span className="text-slate-300">
                      {branch.totalSeats - branch.vacantSeats} / {branch.totalSeats}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Section 3: Dual Operations Grid (Quick-Sign Circular & Hybrid Elections) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick-Sign Digital Circular Issuer */}
          <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-xl">
            <CardHeader className="border-b border-slate-800/80 pb-4">
              <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                <PenTool className="w-4 h-4 text-amber-400" />
                Quick-Sign Digital Circular Issuer
              </CardTitle>
              <CardDescription className="text-xs text-slate-400">
                Issues executive orders cryptographically signed by the President & General Secretary
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                  Directive / Resolution Headline
                </label>
                <input
                  type="text"
                  value={circularHeadline}
                  onChange={(e) => setCircularHeadline(e.target.value)}
                  placeholder="e.g. Directive regarding flood relief medical camps..."
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 font-bangla"
                />
              </div>

              <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/60 space-y-2 text-xs font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>Signatory Seal:</span>
                  <span className="text-amber-400 font-bold">Central Executive Council (RSA-4096)</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Distribution:</span>
                  <span className="text-slate-200">All Branch Portals & Member Notifications</span>
                </div>
              </div>

              <Button
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold"
                onClick={() => setCircularSigned(true)}
              >
                <PenTool className="w-4 h-4 mr-2" />
                Apply Seal & Transmit Circular
              </Button>

              {circularSigned && (
                <div className="p-3 rounded-xl border border-emerald-500/40 bg-emerald-950/30 text-emerald-300 text-xs font-mono flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  Circular cryptographically sealed with SHA-256 seal and dispatched.
                </div>
              )}
            </CardContent>
          </Card>

          {/* Hybrid Committee Election Console */}
          <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-xl">
            <CardHeader className="border-b border-slate-800/80 pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                  <Vote className="w-4 h-4 text-emerald-400" />
                  Hybrid Committee Election Console
                </CardTitle>
                <div className="flex gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
                  <button
                    onClick={() => setElectionMode("OFFLINE_GAZETTE")}
                    className={`px-2.5 py-0.5 rounded text-[11px] font-mono ${
                      electionMode === "OFFLINE_GAZETTE" ? "bg-amber-500 text-slate-950 font-bold" : "text-slate-400"
                    }`}
                  >
                    Offline Gazette
                  </button>
                  <button
                    onClick={() => setElectionMode("DIGITAL_BALLOT")}
                    className={`px-2.5 py-0.5 rounded text-[11px] font-mono ${
                      electionMode === "DIGITAL_BALLOT" ? "bg-amber-500 text-slate-950 font-bold" : "text-slate-400"
                    }`}
                  >
                    Digital Ballot
                  </button>
                </div>
              </div>
              <CardDescription className="text-xs text-slate-400">
                Supports both traditional signed gazette ratification and paperless digital balloting
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              {electionMode === "OFFLINE_GAZETTE" ? (
                <div className="space-y-4">
                  <p className="text-xs text-slate-300">
                    Upload the Election Commission’s countersigned gazette/resolution PDF. The platform extracts the roster and binds it to governance permissions.
                  </p>
                  <div className="p-6 border-2 border-dashed border-slate-800 hover:border-amber-500/60 rounded-2xl text-center cursor-pointer transition-colors bg-slate-950/40">
                    <Upload className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                    <p className="text-xs font-semibold text-white">
                      Drop Official Gazette Resolution PDF
                    </p>
                    <p className="text-[10px] text-slate-500 font-mono mt-1">
                      Signed by Chief Election Commissioner
                    </p>
                  </div>
                  <Button
                    size="sm"
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
                    onClick={() => setGazetteUploaded(true)}
                  >
                    Ratify Gazette & Update Executive Roster
                  </Button>
                  {gazetteUploaded && (
                    <div className="p-3 rounded-xl border border-emerald-500/40 bg-emerald-950/30 text-emerald-300 text-xs font-mono flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      Gazette validated: SHA-256 seal 9f83...e185 recorded in immutable ledger.
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex justify-between text-slate-400">
                      <span>Ballot Status:</span>
                      <span className="text-emerald-400 font-bold">SEALED & ANONYMIZED</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Voter Turnout:</span>
                      <span className="text-white">214 / 260 (82.3%)</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                    <div className="text-slate-400 font-bold">Presidential Candidates:</div>
                    <div className="flex justify-between text-white">
                      <span>1. Prof. Dr. Mujibul Haque</span>
                      <span className="text-amber-400 font-bold">142 votes (66.4%)</span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span>2. Dr. Kazi Mostafa</span>
                      <span className="text-slate-400 font-bold">72 votes (33.6%)</span>
                    </div>
                  </div>
                  <Badge variant="outline" className="border-emerald-500/40 text-emerald-400 bg-emerald-500/10 text-[10px] w-full justify-center py-1">
                    Cryptographic Tally Verified
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
