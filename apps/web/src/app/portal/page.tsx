"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  CreditCard,
  Crown,
  CheckCircle2,
  Clock,
  ArrowRight,
  FileCheck,
  RefreshCw,
} from "lucide-react";
import { Button, Badge, Card, CardContent, CardHeader, CardTitle, PageHeader, EmptyState } from "@org/ui";
import { apiClient } from "@/lib/api-client";

export default function PortalDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalMembers: 0,
    pendingMembers: 0,
    totalBilledBdt: "৳0.00",
    totalCollectedBdt: "৳0.00",
    pendingSlips: 0,
    upcomingMeetings: 0,
  });

  const [pendingApplications, setPendingApplications] = useState<any[]>([]);
  const [pendingSlips, setPendingSlips] = useState<any[]>([]);
  const [meetings, setMeetings] = useState<any[]>([]);
  const [notices, setNotices] = useState<any[]>([]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [membersRes, financeStats, slipsRes, meetingsRes, noticesRes] =
        await Promise.allSettled([
          apiClient.membership.list({ limit: 5, status: "PENDING_KYC" }),
          apiClient.finance.getStats(),
          apiClient.finance.listInvoices({ status: "UNDER_VERIFICATION", limit: 5 }),
          apiClient.governance.listMeetings(),
          apiClient.communications.listNotices(),
        ]);

      if (membersRes.status === "fulfilled") {
        setPendingApplications(membersRes.value.items || []);
        setStats((prev) => ({
          ...prev,
          pendingMembers: membersRes.value.total || 0,
        }));
      }

      if (financeStats.status === "fulfilled") {
        setStats((prev) => ({
          ...prev,
          totalBilledBdt: financeStats.value.totalBilledBdt || "৳0.00",
          totalCollectedBdt: financeStats.value.totalCollectedBdt || "৳0.00",
          pendingSlips: financeStats.value.pendingVerificationCount || 0,
        }));
      }

      if (slipsRes.status === "fulfilled") {
        setPendingSlips(slipsRes.value.items || []);
      }

      if (meetingsRes.status === "fulfilled") {
        setMeetings(meetingsRes.value || []);
        setStats((prev) => ({
          ...prev,
          upcomingMeetings: (meetingsRes.value || []).length,
        }));
      }

      if (noticesRes.status === "fulfilled") {
        setNotices(noticesRes.value || []);
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
      {/* Page Header */}
      <PageHeader
        title="Executive Command Workspace"
        titleBn="নির্বাহী কমান্ড ও ওয়ার্কস্পেস"
        description="Unified operational overview across membership KYC, statutory treasury, governance councils, and branch directives."
        badge={
          <Badge variant="success" size="sm">
            Operational
          </Badge>
        }
        actions={
          <Button
            variant="outline"
            size="sm"
            onClick={loadData}
            loading={loading}
            leftIcon={<RefreshCw className="h-3.5 w-3.5" />}
          >
            Refresh
          </Button>
        }
      />

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Membership */}
        <Card>
          <CardContent className="p-4 space-y-2">
            <div className="flex items-center justify-between text-muted-foreground text-xs">
              <span className="font-medium">Membership Applications</span>
              <Users className="h-4 w-4 text-blue-500" />
            </div>
            <div className="text-2xl font-bold tracking-tight text-foreground">
              {stats.pendingMembers}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-amber-500 font-medium">
              <Clock className="h-3.5 w-3.5" />
              <span>Awaiting KYC / Endorsement</span>
            </div>
          </CardContent>
        </Card>

        {/* KPI 2: Treasury Collected */}
        <Card>
          <CardContent className="p-4 space-y-2">
            <div className="flex items-center justify-between text-muted-foreground text-xs">
              <span className="font-medium">Treasury Collection</span>
              <CreditCard className="h-4 w-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-bold tracking-tight text-emerald-500">
              {stats.totalCollectedBdt}
            </div>
            <div className="text-xs text-muted-foreground">
              Total Billed: <span className="font-mono">{stats.totalBilledBdt}</span>
            </div>
          </CardContent>
        </Card>

        {/* KPI 3: Bank Slips */}
        <Card>
          <CardContent className="p-4 space-y-2">
            <div className="flex items-center justify-between text-muted-foreground text-xs">
              <span className="font-medium">Deposit Slip Queue</span>
              <FileCheck className="h-4 w-4 text-amber-500" />
            </div>
            <div className="text-2xl font-bold tracking-tight text-foreground">
              {stats.pendingSlips}
            </div>
            <div className="text-xs text-muted-foreground">
              Manual bank transfers awaiting signoff
            </div>
          </CardContent>
        </Card>

        {/* KPI 4: Governance */}
        <Card>
          <CardContent className="p-4 space-y-2">
            <div className="flex items-center justify-between text-muted-foreground text-xs">
              <span className="font-medium">Governance Sessions</span>
              <Crown className="h-4 w-4 text-primary" />
            </div>
            <div className="text-2xl font-bold tracking-tight text-foreground">
              {stats.upcomingMeetings}
            </div>
            <div className="text-xs text-muted-foreground">
              Executive council & branch meetings
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Operational Queues: 2 Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Queue 1: Pending KYC & Endorsements */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-base">Pending Membership Applications</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5 font-bangla">
                নতুন সদস্য আবেদন এবং কেওয়াইসি যাচাই তালিকা
              </p>
            </div>
            <Link href="/portal/members">
              <Button variant="ghost" size="sm" className="text-xs">
                View All <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="pt-0 space-y-3">
            {pendingApplications.length === 0 ? (
              <EmptyState
                icon={<CheckCircle2 className="h-6 w-6 text-emerald-500" />}
                title="No Pending Applications"
                titleBn="সকল সদস্য আবেদন যাচাই সম্পন্ন হয়েছে"
                description="All submitted membership applications have been reviewed."
              />
            ) : (
              <div className="divide-y divide-border">
                {pendingApplications.map((app) => (
                  <div
                    key={app.id}
                    className="py-3 flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <p className="font-semibold text-foreground text-sm">
                        {app.user?.fullName || "Applicant"}
                      </p>
                      <p className="text-muted-foreground font-mono text-[11px]">
                        App #{app.membershipNumber} · {app.user?.phone}
                      </p>
                      <Badge variant="outline" size="sm" className="mt-1">
                        {app.status}
                      </Badge>
                    </div>

                    <Link href={`/portal/members?id=${app.id}`}>
                      <Button variant="secondary" size="sm">
                        Review KYC
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Queue 2: Deposit Slip Verification */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-base">Deposit Slips Under Verification</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5 font-bangla">
                ব্যাংক ডিপোজিট স্লিপ ও চালান যাচাই
              </p>
            </div>
            <Link href="/portal/finance">
              <Button variant="ghost" size="sm" className="text-xs">
                Treasury Desk <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="pt-0 space-y-3">
            {pendingSlips.length === 0 ? (
              <EmptyState
                icon={<CheckCircle2 className="h-6 w-6 text-emerald-500" />}
                title="Slip Queue Clean"
                titleBn="কোনো ব্যাংক স্লিপ যাচাইয়ের জন্য অপেক্ষমাণ নেই"
                description="All submitted deposit receipts have been reconciled."
              />
            ) : (
              <div className="divide-y divide-border">
                {pendingSlips.map((invoice) => (
                  <div
                    key={invoice.id}
                    className="py-3 flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <p className="font-semibold text-foreground text-sm">
                        {invoice.user?.fullName || "Member"}
                      </p>
                      <p className="text-muted-foreground font-mono text-[11px]">
                        Inv #{invoice.invoiceNumber} · Ref: {invoice.transactionRef || "N/A"}
                      </p>
                      <span className="font-semibold text-emerald-500 font-mono block mt-0.5">
                        ৳{(Number(invoice.amountPaisa) / 100).toFixed(2)}
                      </span>
                    </div>

                    <Link href="/portal/finance">
                      <Button variant="secondary" size="sm">
                        Verify Slip
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Queue 3: Upcoming Council Meetings & Notices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Governance Meetings */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-base">Executive Council Meetings</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5 font-bangla">
                কার্যনির্বাহী পরিষদের সভার বিবরণ ও আলোচ্যসূচি
              </p>
            </div>
            <Link href="/portal/command">
              <Button variant="ghost" size="sm" className="text-xs">
                Manage <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="pt-0">
            {meetings.length === 0 ? (
              <EmptyState
                title="No Scheduled Sessions"
                titleBn="আপাতত কোনো সভা নির্ধারিত নেই"
                description="Create a draft council agenda to convene a formal session."
              />
            ) : (
              <div className="divide-y divide-border">
                {meetings.map((m) => (
                  <div
                    key={m.id}
                    className="py-3 flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <p className="font-semibold text-foreground text-sm">{m.title}</p>
                      <p className="text-muted-foreground text-[11px]">
                        {new Date(m.scheduledAt).toLocaleDateString("en-BD", {
                          dateStyle: "medium",
                        })}{" "}
                        · Venue: {m.venue}
                      </p>
                      <Badge variant="outline" size="sm" className="mt-1">
                        {m.status}
                      </Badge>
                    </div>

                    <Link href={`/portal/command?meetingId=${m.id}`}>
                      <Button variant="outline" size="sm">
                        Agenda & Minutes
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Notices & Directives */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-base">Official Circulars & Directives</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5 font-bangla">
                সর্বশেষ বিজ্ঞপ্তি ও নির্দেশনা
              </p>
            </div>
            <Link href="/portal/communications">
              <Button variant="ghost" size="sm" className="text-xs">
                Broadcast Desk <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="pt-0">
            {notices.length === 0 ? (
              <EmptyState
                title="No Active Circulars"
                titleBn="কোনো সক্রিয় বিজ্ঞপ্তি প্রকাশিত হয়নি"
                description="Publish an official notice or dispatch an emergency SMS broadcast."
              />
            ) : (
              <div className="divide-y divide-border">
                {notices.slice(0, 4).map((n) => (
                  <div key={n.id} className="py-2.5 space-y-0.5 text-xs">
                    <p className="font-semibold text-foreground text-sm">{n.title}</p>
                    {n.titleBn && (
                      <p className="text-muted-foreground text-[11px] font-bangla">
                        {n.titleBn}
                      </p>
                    )}
                    <p className="text-[10px] text-muted-foreground font-mono">
                      Published: {new Date(n.publishedAt || n.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
