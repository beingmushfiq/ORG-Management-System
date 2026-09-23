"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  CreditCard,
  GraduationCap,
  Award,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Sparkles,
  Users,
  Clock,
  CheckCircle2,
  FileCheck,
  Crown,
} from "lucide-react";
import { Badge, Button, Card, CardContent } from "@org/ui";
import { apiClient } from "@/lib/api-client";
import { MemberHeaderBanner } from "@/components/portal/member-header-banner";
import { MembershipProgressTracker } from "@/components/portal/membership-progress-tracker";
import { LmsCourseCards } from "@/components/portal/lms-course-cards";
import { ContributionHistoryTable } from "@/components/portal/contribution-history-table";

export default function MemberPortalDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any>({
    fullName: "Tanvir Rahman",
    fullNameBn: "তানভীর তানভীর",
    membershipNumber: "18-23",
    joinedDate: "20 june 2018",
    status: "ACTIVE",
    tier: "ASSOCIATE",
    positionTitle: "National Executive Secretariat · Founding Member",
  });

  // State for Executive Mode Toggle (when holding administrative office)
  const [viewMode, setViewMode] = useState<"MEMBER" | "EXECUTIVE">("MEMBER");
  const [adminStats, setAdminStats] = useState({
    pendingMembers: 0,
    totalBilledBdt: "৳0.00",
    totalCollectedBdt: "৳0.00",
    pendingSlips: 0,
    upcomingMeetings: 0,
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const [meRes, financeRes, membersRes, meetingsRes] = await Promise.allSettled([
        apiClient.auth.getMe(),
        apiClient.finance.getStats(),
        apiClient.membership.list({ limit: 5, status: "PENDING_KYC" }),
        apiClient.governance.listMeetings(),
      ]);

      if (meRes.status === "fulfilled" && meRes.value?.user) {
        const u = meRes.value.user;
        setUserProfile({
          fullName: u.fullName || "Tanvir Rahman",
          fullNameBn: u.fullNameBn || "তানভীর তানভীর",
          membershipNumber: u.membership?.membershipNumber || "18-23",
          joinedDate: u.membership?.joinedDate
            ? new Date(u.membership.joinedDate).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })
            : "20 june 2018",
          status: u.membership?.status || "ACTIVE",
          tier: u.membership?.tier || "ASSOCIATE",
          positionTitle:
            meRes.value.activePosition?.position?.name ||
            "National Executive Secretariat · Founding Member",
        });
      }

      if (financeRes.status === "fulfilled") {
        setAdminStats((prev) => ({
          ...prev,
          totalBilledBdt: financeRes.value.totalBilledBdt || "৳0.00",
          totalCollectedBdt: financeRes.value.totalCollectedBdt || "৳0.00",
          pendingSlips: financeRes.value.pendingVerificationCount || 0,
        }));
      }

      if (membersRes.status === "fulfilled") {
        setAdminStats((prev) => ({
          ...prev,
          pendingMembers: membersRes.value.total || 0,
        }));
      }

      if (meetingsRes.status === "fulfilled") {
        setAdminStats((prev) => ({
          ...prev,
          upcomingMeetings: (meetingsRes.value || []).length,
        }));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Controls: View Switcher (Member View vs Executive Console) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 border-b border-border/60">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <span>Member Workspace</span>
            <Badge variant="outline" className="text-[11px] font-mono text-emerald-600 border-emerald-500/30 bg-emerald-500/10">
              Verified Session
            </Badge>
          </h2>
          <p className="text-xs text-muted-foreground font-bangla">
            নিরাপদ সড়ক আন্দোলন — সদস্য ড্যাশবোর্ড ও প্রাতিষ্ঠানিক সেবা পোর্টাল
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Executive Mode Switcher */}
          <div className="p-0.5 rounded-lg bg-muted border border-border flex items-center text-xs font-medium">
            <button
              type="button"
              onClick={() => setViewMode("MEMBER")}
              className={`px-3 py-1.5 rounded-md transition-all ${
                viewMode === "MEMBER"
                  ? "bg-card text-foreground font-bold shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Member View
            </button>
            <button
              type="button"
              onClick={() => setViewMode("EXECUTIVE")}
              className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                viewMode === "EXECUTIVE"
                  ? "bg-[#164e32] text-white font-bold shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Crown className="h-3.5 w-3.5 text-amber-400" />
              <span>Executive Console</span>
            </button>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={loadData}
            loading={loading}
            leftIcon={<RefreshCw className="h-3.5 w-3.5" />}
          >
            Sync
          </Button>
        </div>
      </div>

      {viewMode === "MEMBER" ? (
        /* ================= 1. MEMBER DASHBOARD (MATCHING SAMPLE MOCKUP) ================= */
        <div className="space-y-6">
          {/* A. Hero Member Header Card Banner */}
          <MemberHeaderBanner member={userProfile} />

          {/* B. Row of 3 Summary Metric Cards (from sample wireframe) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Metric 1: Monthly Subscription / Contribution Status */}
            <Card className="hover:border-emerald-500/40 transition-colors">
              <CardContent className="p-4 sm:p-5 flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase font-mono">
                    Monthly Contribution
                  </p>
                  <p className="text-2xl font-bold font-mono text-foreground">
                    ৳300.00
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 font-semibold pt-0.5">
                    <Clock className="h-3.5 w-3.5" />
                    <span>Sep 2026 Pending</span>
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  <CreditCard className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>

            {/* Metric 2: Training & CPD Progress */}
            <Card className="hover:border-emerald-500/40 transition-colors">
              <CardContent className="p-4 sm:p-5 flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase font-mono">
                    Academy & Training
                  </p>
                  <p className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
                    3 Courses (60%)
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-0.5">
                    <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                    <span>10 CPD Points Earned</span>
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <GraduationCap className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>

            {/* Metric 3: Movement Attendance & Standing */}
            <Card className="hover:border-emerald-500/40 transition-colors">
              <CardContent className="p-4 sm:p-5 flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase font-mono">
                    Movement Standing
                  </p>
                  <p className="text-2xl font-bold font-mono text-foreground">
                    18 Events (96%)
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold pt-0.5">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Good Standing Verified</span>
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  <Award className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* C. Automated Membership Lifecycle Progress Banner (Section 8 & 9) */}
          <MembershipProgressTracker
            currentTier={userProfile.tier}
            activeMonths={19}
            totalRequiredMonths={24}
            isEligible={false}
          />

          {/* D. Two-Column Main Grid from Sample Image: LMS + Contribution History */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* Left Column: Learning Management System (LMS) */}
            <LmsCourseCards />

            {/* Right Column: Contribution History Table */}
            <ContributionHistoryTable />
          </div>
        </div>
      ) : (
        /* ================= 2. EXECUTIVE & BRANCH COMMAND CONSOLE ================= */
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-[#164e32]/10 border border-emerald-700/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-[#164e32] text-white">
                <Crown className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-foreground">
                  National Executive Council Command War Room
                </h3>
                <p className="text-xs text-muted-foreground font-bangla">
                  পূর্ণাঙ্গ প্রশাসনিক ক্ষমতা: সদস্য অনুমোদন, চাঁদা নিরীক্ষা ও শাখা নিয়ন্ত্রণ
                </p>
              </div>
            </div>

            <Link href="/portal/command">
              <Button size="sm" variant="primary" className="bg-[#164e32] hover:bg-[#113d27] text-white text-xs">
                Open Full War Room <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </Link>
          </div>

          {/* Operational Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center justify-between text-muted-foreground text-xs">
                  <span className="font-medium">Pending KYC Applications</span>
                  <Users className="h-4 w-4 text-blue-500" />
                </div>
                <div className="text-2xl font-bold font-mono text-foreground">
                  {adminStats.pendingMembers}
                </div>
                <div className="text-xs text-amber-500 font-medium flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Awaiting Branch Endorsement</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center justify-between text-muted-foreground text-xs">
                  <span className="font-medium">Treasury Collection</span>
                  <CreditCard className="h-4 w-4 text-emerald-500" />
                </div>
                <div className="text-2xl font-bold font-mono text-emerald-500">
                  {adminStats.totalCollectedBdt}
                </div>
                <div className="text-xs text-muted-foreground">
                  Total Billed: <span className="font-mono">{adminStats.totalBilledBdt}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center justify-between text-muted-foreground text-xs">
                  <span className="font-medium">Bank Deposit Slip Queue</span>
                  <FileCheck className="h-4 w-4 text-amber-500" />
                </div>
                <div className="text-2xl font-bold font-mono text-foreground">
                  {adminStats.pendingSlips}
                </div>
                <div className="text-xs text-muted-foreground">
                  Manual slips awaiting signoff
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center justify-between text-muted-foreground text-xs">
                  <span className="font-medium">Statutory Council Sessions</span>
                  <Crown className="h-4 w-4 text-primary" />
                </div>
                <div className="text-2xl font-bold font-mono text-foreground">
                  {adminStats.upcomingMeetings}
                </div>
                <div className="text-xs text-muted-foreground">
                  Executive council & branch meetings
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Action Navigation Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/portal/members">
              <div className="p-4 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors space-y-1.5 cursor-pointer">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-foreground">Member Registry & KYC</span>
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <p className="text-xs text-muted-foreground font-bangla">
                  নতুন সদস্য আবেদন যাচাই, শাখা অনুমোদন ও বহিষ্কারাদেশ ব্যবস্থাপনা
                </p>
              </div>
            </Link>

            <Link href="/portal/finance">
              <div className="p-4 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors space-y-1.5 cursor-pointer">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-foreground">Treasury Desk & Slips</span>
                  <CreditCard className="h-4 w-4 text-emerald-500" />
                </div>
                <p className="text-xs text-muted-foreground font-bangla">
                  ব্যাংক ডিপোজিট স্লিপ ভেরিফিকেশন, ইনভয়েস তৈরি ও ডিজিটাল মানি রিসিপ্ট
                </p>
              </div>
            </Link>

            <Link href="/portal/branches">
              <div className="p-4 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors space-y-1.5 cursor-pointer">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-foreground">Branch Hierarchy Tree</span>
                  <ShieldCheck className="h-4 w-4 text-blue-500" />
                </div>
                <p className="text-xs text-muted-foreground font-bangla">
                  অসীম শাখা নেটওয়ার্ক, সাব-শাখা ও কমিটি পদমর্যাদা বিন্যাস
                </p>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
