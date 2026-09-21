"use client";

import React, { useState } from "react";
import { ShieldCheck, QrCode, Download, CheckCircle2, Heart } from "lucide-react";
import { Button } from "@org/ui";
import { soundEffects } from "@/lib/audio-effects";
import Link from "next/link";

export interface InstitutionalMemberCardProps {
  memberName?: string;
  memberNameBn?: string;
  memberId?: string;
  tier?: "VOLUNTEER" | "COORDINATOR" | "EXECUTIVE" | "LEGAL_ADVOCATE";
  organizationName?: string;
  organizationNameBn?: string;
  branchName?: string;
  validThrough?: string;
  bloodGroup?: string;
}

export function InstitutionalMemberCard({
  memberName = "Engr. Tanvir Ahmed",
  memberNameBn = "প্রকৌশলী তানভীর আহমেদ",
  memberId = "RSM-VOL-2018-001",
  tier = "EXECUTIVE",
  organizationName = "Road Safety Movement",
  organizationNameBn = "নিরাপদ সড়ক আন্দোলন",
  branchName = "Dhaka Central Secretariat",
  validThrough = "Permanent Active Organizer",
  bloodGroup = "O+",
}: InstitutionalMemberCardProps) {
  const [downloading, setDownloading] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleDownload = () => {
    soundEffects.playClick(650);
    setDownloading(true);
    setTimeout(() => {
      window.print();
      setDownloading(false);
    }, 400);
  };

  const handleCardClick = () => {
    soundEffects.playClick(isFlipped ? 520 : 780);
    setIsFlipped(!isFlipped);
  };

  const tierColors = {
    VOLUNTEER: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
    COORDINATOR: "bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/30",
    EXECUTIVE: "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30",
    LEGAL_ADVOCATE: "bg-purple-500/15 text-purple-700 dark:text-purple-400 border-purple-500/30",
  }[tier] || "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30";

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-md mx-auto select-none">
      {/* Official Road Safety Volunteer / Activist ID Card (Standard CR80 Ratio) */}
      <div
        onClick={handleCardClick}
        className="w-full rounded-2xl border-2 border-amber-500/50 bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 text-white shadow-2xl overflow-hidden p-6 relative cursor-pointer group transition-all duration-300 hover:shadow-amber-500/10 hover:border-amber-400"
      >
        {/* Holographic Refractive Foil Ribbon */}
        <div className="absolute -inset-x-20 top-0 h-1 bg-gradient-to-r from-amber-400 via-emerald-400 to-sky-400 opacity-90 animate-pulse" />
        
        {/* Subtle Watermark Badge */}
        <div className="absolute right-4 bottom-4 opacity-5 pointer-events-none">
          <ShieldCheck className="w-32 h-32" />
        </div>

        {/* Header Ribbon */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-wider text-amber-400">
                Official Credential · ডিজিটাল পরিচয়পত্র
              </p>
              <h4 className="text-sm font-black text-white tracking-tight leading-none mt-0.5">
                {organizationName}
              </h4>
              <p className="text-[11px] text-emerald-400 font-bangla font-semibold mt-0.5">
                {organizationNameBn}
              </p>
            </div>
          </div>

          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${tierColors}`}>
            {tier}
          </span>
        </div>

        {/* Member Profile Body */}
        <div className="grid grid-cols-3 gap-4 items-center">
          {/* Portrait Placeholder & Hologram Seal */}
          <div className="flex flex-col items-center">
            <div className="relative h-24 w-20 rounded-xl overflow-hidden border-2 border-amber-500/40 bg-slate-800 flex items-center justify-center shadow-inner">
              <div className="text-center p-2">
                <ShieldCheck className="h-8 w-8 text-amber-400 mx-auto opacity-80" />
                <span className="text-[9px] font-mono text-slate-300 mt-1 block">
                  RSM PASS
                </span>
              </div>
              {/* Security Shimmer */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
            </div>
            <span className="mt-1.5 inline-flex items-center gap-1 text-[9px] font-bold text-emerald-400">
              <CheckCircle2 className="h-3 w-3" />
              Verified Activist
            </span>
          </div>

          {/* Member Details */}
          <div className="col-span-2 space-y-2">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Full Name / নাম
              </p>
              <p className="text-base font-extrabold text-white leading-tight">
                {memberName}
              </p>
              <p className="text-xs text-slate-300 font-bangla font-semibold">
                {memberNameBn}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-1">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                  Activist ID
                </p>
                <p className="font-mono font-bold text-amber-400 text-[11px]">
                  {memberId}
                </p>
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                  Blood Group
                </p>
                <p className="font-bold text-red-400 text-[11px] flex items-center gap-1">
                  <Heart className="w-3 h-3 fill-current" />
                  {bloodGroup}
                </p>
              </div>
            </div>

            <div>
              <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                Assigned Unit / চ্যাপ্টার
              </p>
              <p className="text-[11px] font-semibold text-slate-200 truncate">
                {branchName}
              </p>
            </div>
          </div>
        </div>

        {/* Card Footer with Verified QR Code */}
        <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
          <div>
            <p className="text-[9px] text-slate-400">Movement Charter Status:</p>
            <p className="text-[10px] font-bold text-emerald-400">{validThrough}</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white p-1 shadow-sm">
              <QrCode className="h-full w-full text-slate-950" />
            </div>
          </div>
        </div>
      </div>

      {/* Card Action Controls */}
      <div className="flex items-center gap-3 w-full">
        <Button
          variant="outline"
          size="sm"
          onClick={handleDownload}
          disabled={downloading}
          className="flex-1 text-xs font-semibold gap-1.5 border-border bg-card text-foreground"
        >
          <Download className="h-3.5 w-3.5" />
          {downloading ? "Preparing Print..." : "Print Official ID"}
        </Button>

        <Link href={`/verify/member/${memberId}`} className="flex-1">
          <Button
            variant="primary"
            size="sm"
            className="w-full text-xs font-semibold gap-1.5 shadow-sm"
          >
            <QrCode className="h-3.5 w-3.5" />
            Verify Digital Seal
          </Button>
        </Link>
      </div>
    </div>
  );
}
