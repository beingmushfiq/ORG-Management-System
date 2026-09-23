"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, Clock, X } from "lucide-react";
import { Button, Badge } from "@org/ui";

export interface MembershipProgressTrackerProps {
  currentTier?: "ASSOCIATE" | "GENERAL" | "LIFE" | string;
  activeMonths?: number;
  totalRequiredMonths?: number;
  isEligible?: boolean;
}

export function MembershipProgressTracker({
  currentTier = "ASSOCIATE",
  activeMonths = 19, // 1 Year 7 Months
  totalRequiredMonths = 24, // 2 Years for Associate -> General
  isEligible = false,
}: MembershipProgressTrackerProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [applied, setApplied] = useState(false);

  // Compute remaining time
  const remainingMonths = Math.max(0, totalRequiredMonths - activeMonths);
  const progressPercent = Math.min(100, Math.round((activeMonths / totalRequiredMonths) * 100));
  const eligibleNow = isEligible || remainingMonths === 0;

  const targetTier = currentTier === "ASSOCIATE" ? "General Membership" : "Life Membership";
  const targetTierBn = currentTier === "ASSOCIATE" ? "সাধারণ সদস্যপদ" : "আজীবন সদস্যপদ";

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setApplied(true);
      setTimeout(() => {
        setModalOpen(false);
      }, 1500);
    }, 1000);
  };

  return (
    <div className="w-full rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 sm:p-5 text-card-foreground">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left: Standing & Progress */}
        <div className="space-y-1.5 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5 font-mono">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              Membership Lifecycle Progression
            </span>
            <Badge variant="outline" className="text-[10px] font-mono border-emerald-500/40 text-emerald-700 dark:text-emerald-400">
              {currentTier} TIER
            </Badge>
          </div>

          <div className="text-sm font-medium text-foreground flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>
              Active for: <strong className="font-semibold text-foreground">1 Year 7 Months</strong>
            </span>
            <span className="text-muted-foreground/60">•</span>
            <span>
              {targetTier} Eligibility:{" "}
              {eligibleNow ? (
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">Fulfilled</span>
              ) : (
                <strong className="font-semibold text-amber-600 dark:text-amber-400">
                  {remainingMonths} Months Remaining
                </strong>
              )}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full max-w-md pt-1">
            <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-amber-500 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-muted-foreground pt-1 font-mono">
              <span>0 Months</span>
              <span>{progressPercent}% Complete</span>
              <span>{totalRequiredMonths} Months</span>
            </div>
          </div>
        </div>

        {/* Right: Notification Banner & Apply Button */}
        <div className="shrink-0 flex flex-col sm:items-end justify-center gap-2">
          {eligibleNow || progressPercent >= 75 ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-300 font-semibold bg-emerald-500/10 px-3 py-1 rounded-md border border-emerald-500/20">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Eligible for {targetTier}</span>
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setModalOpen(true)}
                className="bg-[#164e32] hover:bg-[#113d27] text-white text-xs px-4"
              >
                Apply Now <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/60 px-3 py-1.5 rounded-md border border-border">
              <Clock className="h-3.5 w-3.5 text-amber-500" />
              <span>Automated eligibility evaluation in progress</span>
            </div>
          )}
        </div>
      </div>

      {/* Upgrade Application Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-2xl space-y-5 text-card-foreground">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="space-y-0.5">
                <h3 className="text-base font-bold text-foreground">
                  Apply for {targetTier} ({targetTierBn})
                </h3>
                <p className="text-xs text-muted-foreground font-bangla">
                  সংবিধিবদ্ধ ২ বছরের নিরবচ্ছিন্ন সক্রিয় কার্যক্রমের ভিত্তিতে সাধারণ সদস্যপদ পদোন্নতি
                </p>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-md text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {applied ? (
              <div className="py-6 text-center space-y-2">
                <CheckCircle2 className="h-12 w-12 text-emerald-500 mx-auto" />
                <h4 className="font-bold text-foreground">Application Dispatched</h4>
                <p className="text-xs text-muted-foreground font-bangla">
                  আপনার আবেদনটি কেন্দ্রীয় সভাপতি ও সাধারণ সম্পাদকের অনুমোদনের জন্য জমা দেওয়া হয়েছে।
                </p>
              </div>
            ) : (
              <form onSubmit={handleApply} className="space-y-4">
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs space-y-1">
                  <div className="font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    <span>Prerequisites Verified</span>
                  </div>
                  <ul className="list-disc list-inside text-emerald-700 dark:text-emerald-300/90 text-[11px] space-y-0.5">
                    <li>Continuous Active Duration: 1 Year 7+ Months verified</li>
                    <li>Subscription Dues: 100% Paid (No pending invoices)</li>
                    <li>Events Participated: 18 Road Safety Workshops</li>
                  </ul>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase text-muted-foreground">
                    Volunteer Achievements Summary
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe your major contributions, blackspot audits, or road safety campaigns..."
                    className="w-full p-2.5 rounded-lg border border-input bg-background text-xs text-foreground focus:outline-none focus:border-primary"
                    defaultValue="Conducted 4 high-risk road blackspot surveys in Dhaka-Mymensingh corridor and led 3 defensive driving youth training sessions."
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="text-xs font-mono">
                    <span className="text-muted-foreground">Statutory Fee: </span>
                    <strong className="text-foreground">৳১,০০০ (General Tier)</strong>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setModalOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      size="sm"
                      loading={submitting}
                      className="bg-[#164e32] hover:bg-[#113d27] text-white"
                    >
                      Submit Application
                    </Button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
