import React from "react";
import {
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Badge, Button, Card, CardContent, CardHeader, CardTitle, PageHeader } from "@org/ui";

export default function MemberApplicationsPage() {

  return (
    <div className="space-y-6">
      <PageHeader
        title="Membership Applications & Upgrades"
        titleBn="সদস্যপদ পদোন্নতি ও আবেদন পোর্টাল"
        description="Formal statutory requests for tier progression (Associate → General → Life), card re-issues, and credentials."
        badge={
          <Badge variant="outline" className="text-xs font-mono text-emerald-600 border-emerald-500/30 bg-emerald-500/10">
            Statutory Petitions
          </Badge>
        }
      />

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tier Upgrade Option */}
        <Card className="hover:border-emerald-500/40 transition-colors">
          <CardHeader>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold">
                ELIGIBILITY TRACKED
              </span>
              <Sparkles className="h-4 w-4 text-amber-500" />
            </div>
            <CardTitle className="text-base font-bold pt-1">
              Associate → General Membership Promotion
            </CardTitle>
            <p className="text-xs text-muted-foreground font-bangla">
              ২ বছর সক্রিয় দায়িত্ব পালন ও চাঁদা পরিশোধের প্রেক্ষিতে সাধারণ সদস্যপদে পদোন্নতি
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 rounded-lg bg-muted/60 border border-border text-xs space-y-1.5 font-mono">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Active Duration:</span>
                <span className="font-semibold text-foreground">1 Year 7 Months</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Eligibility Standard:</span>
                <span className="text-amber-600 font-bold">5 Months Remaining</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Statutory Fee:</span>
                <span className="text-foreground font-bold">৳১,০০০.০০</span>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs"
              disabled
            >
              Requirements Evaluating (5 Months Left)
            </Button>
          </CardContent>
        </Card>

        {/* Life Membership Option */}
        <Card className="hover:border-emerald-500/40 transition-colors">
          <CardHeader>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground font-bold">
                CONSTITUTIONAL TIER
              </span>
              <ShieldCheck className="h-4 w-4 text-primary" />
            </div>
            <CardTitle className="text-base font-bold pt-1">
              General → Life Membership Petition
            </CardTitle>
            <p className="text-xs text-muted-foreground font-bangla">
              সাধারণ সদস্য হিসেবে ৪ বছর পূর্ণ হওয়ার পর আজীবন সদস্যপদের আবেদন
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 rounded-lg bg-muted/60 border border-border text-xs space-y-1.5 font-mono">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Requirement:</span>
                <span className="font-semibold text-foreground">4 Years as General Member</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">One-Time Dues:</span>
                <span className="text-foreground font-bold">৳১০,০০০.০০</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Approval Authority:</span>
                <span className="text-foreground font-bold">President & GS</span>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs"
              disabled
            >
              Unlocked after General Member Standing
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Past Submissions History */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-bold">Submitted Petition Log</CardTitle>
          <p className="text-xs text-muted-foreground font-bangla">
            আপনার অতীতের আবেদন ও সচিবালয় পর্যালোচনার বিবরণী
          </p>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="divide-y divide-border text-xs">
            <div className="py-3 flex items-center justify-between">
              <div>
                <p className="font-semibold text-foreground">
                  Original Associate Volunteer Enrollment
                </p>
                <p className="text-[11px] font-mono text-muted-foreground">
                  Ref #APP-2018-0023 · Submitted: 20 June 2018
                </p>
              </div>
              <Badge variant="success" className="text-[11px] font-mono">
                APPROVED & ACTIVE
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
