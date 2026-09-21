"use client";

import React, { useState } from "react";
import { ShieldCheck, QrCode, Download, Building2, CheckCircle2 } from "lucide-react";
import { Button, Badge } from "@org/ui";

export interface InstitutionalMemberCardProps {
  memberName?: string;
  memberNameBn?: string;
  memberId?: string;
  tier?: "ASSOCIATE" | "GENERAL" | "LIFE" | "HONORARY";
  organizationName?: string;
  organizationNameBn?: string;
  branchName?: string;
  validThrough?: string;
  bloodGroup?: string;
}

export function InstitutionalMemberCard({
  memberName = "Prof. Dr. Mujibul Haque",
  memberNameBn = "অধ্যাপক ডাঃ মুজিবুল হক",
  memberId = "BMA-LIFE-0001",
  tier = "LIFE",
  organizationName = "Bangladesh Medical Association",
  organizationNameBn = "বাংলাদেশ মেডিকেল এসোসিয়েশন",
  branchName = "Central Executive Secretariat",
  validThrough = "Permanent Active Member",
  bloodGroup = "B+",
}: InstitutionalMemberCardProps) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      window.print();
      setDownloading(false);
    }, 400);
  };

  const tierBadgeVariant = {
    ASSOCIATE: "secondary" as const,
    GENERAL: "default" as const,
    LIFE: "gold" as const,
    HONORARY: "outline" as const,
  }[tier] || ("default" as const);

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-md mx-auto">
      {/* Official Institutional ID Card (Standard CR80 Ratio) */}
      <div className="w-full rounded-xl border border-slate-700 bg-slate-900 text-slate-100 shadow-xl overflow-hidden p-6 relative">
        {/* Header Ribbon */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-amber-400 border border-slate-700">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Official Credential
              </p>
              <p className="text-sm font-bold text-white leading-tight">
                {organizationName}
              </p>
              {organizationNameBn && (
                <p className="text-[11px] text-slate-400 leading-tight">
                  {organizationNameBn}
                </p>
              )}
            </div>
          </div>
          <Badge variant={tierBadgeVariant} size="sm">
            {tier}
          </Badge>
        </div>

        {/* Card Body */}
        <div className="flex gap-4 items-start">
          {/* Avatar / Photo placeholder */}
          <div className="flex-shrink-0 w-20 h-24 rounded-md border border-slate-700 bg-slate-800 flex flex-col items-center justify-center text-slate-500">
            <ShieldCheck className="h-8 w-8 text-emerald-400 mb-1" />
            <span className="text-[9px] uppercase tracking-wider font-semibold text-slate-400">
              Verified
            </span>
          </div>

          {/* Member Details */}
          <div className="flex-1 min-w-0 space-y-1.5">
            <div>
              <p className="text-sm font-bold text-white truncate">{memberName}</p>
              {memberNameBn && (
                <p className="text-xs font-medium text-slate-300 truncate">
                  {memberNameBn}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-slate-800">
              <div>
                <span className="text-[10px] uppercase text-slate-400 block font-mono">
                  Member ID
                </span>
                <span className="font-mono font-semibold text-amber-300 text-xs">
                  {memberId}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-slate-400 block">
                  Blood Group
                </span>
                <span className="font-semibold text-rose-300 text-xs">
                  {bloodGroup}
                </span>
              </div>
            </div>

            <div className="text-xs pt-1">
              <span className="text-[10px] uppercase text-slate-400 block">
                Branch / Node
              </span>
              <span className="text-slate-300 text-xs truncate block">
                {branchName}
              </span>
            </div>
          </div>
        </div>

        {/* Footer with Cryptographic Verification Link & QR */}
        <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>Cryptographically Verified</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-right">
              <span className="text-[9px] text-slate-400 block">Status</span>
              <span className="text-[10px] font-mono text-slate-200">
                {validThrough}
              </span>
            </div>
            <div className="h-8 w-8 rounded bg-white p-0.5 flex items-center justify-center">
              <QrCode className="h-7 w-7 text-slate-900" />
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleDownload}
          loading={downloading}
          leftIcon={<Download className="h-3.5 w-3.5" />}
        >
          Print / Export Card
        </Button>
      </div>
    </div>
  );
}

// Alias for backward compatibility
export { InstitutionalMemberCard as HolographicMemberCard };
