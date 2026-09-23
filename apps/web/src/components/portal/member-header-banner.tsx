"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CheckCircle2, MinusCircle, XCircle, ShieldCheck } from "lucide-react";

export interface MemberHeaderBannerProps {
  member?: {
    fullName?: string;
    fullNameBn?: string;
    membershipNumber?: string;
    joinedDate?: string;
    status?: "ACTIVE" | "INACTIVE" | "SUSPENDED" | string;
    tier?: string;
    branchName?: string;
    avatarUrl?: string;
    positionTitle?: string;
  };
}

export function MemberHeaderBanner({ member }: MemberHeaderBannerProps) {
  // Use passed data with graceful defaults matching the provided sample design
  const fullName = member?.fullName || "Tanvir Rahman";
  const fullNameBn = member?.fullNameBn || "তানভীর তানভীর";
  const memberId = member?.membershipNumber || "18-23";
  const joiningDate = member?.joinedDate || "20 june 2018";
  const [currentStatus, setCurrentStatus] = useState<string>(
    member?.status?.toUpperCase() || "ACTIVE"
  );

  return (
    <div className="relative w-full rounded-2xl bg-[#164e32] text-white p-6 sm:p-7 shadow-lg overflow-hidden border border-emerald-700/40">
      {/* Background Subtle Geometric Inlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/40 via-transparent to-emerald-950/60 pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Left Side: Avatar Box + Names + Metadata */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start md:items-center gap-5 text-center sm:text-left">
          {/* Avatar in White Frame */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-white p-1.5 shadow-md shrink-0 flex items-center justify-center overflow-hidden border-2 border-emerald-400/30">
            {member?.avatarUrl ? (
              <Image
                src={member.avatarUrl}
                alt={fullName}
                fill
                className="object-cover rounded-lg"
              />
            ) : (
              // Styled professional photo silhouette placeholder
              <div className="w-full h-full rounded-lg bg-gradient-to-b from-slate-100 to-slate-200 flex flex-col items-center justify-center text-slate-700 relative overflow-hidden">
                <svg
                  className="w-16 h-16 text-slate-400 mt-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
                <div className="absolute bottom-1 bg-emerald-800 text-[9px] text-white font-mono px-1.5 py-0.5 rounded">
                  RSM-BD
                </div>
              </div>
            )}
          </div>

          {/* Member Details */}
          <div className="space-y-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white drop-shadow-sm">
                {fullName}
              </h1>
              {member?.tier && (
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-800/80 text-emerald-200 border border-emerald-600/50">
                  {member.tier}
                </span>
              )}
            </div>

            <p className="text-base sm:text-lg text-emerald-100 font-bangla font-medium">
              {fullNameBn}
            </p>

            <div className="pt-1.5 flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4 text-xs text-emerald-100/90 font-sans">
              <div className="flex items-center gap-1 justify-center sm:justify-start">
                <span className="text-emerald-300 font-medium">Member ID:</span>
                <span className="font-mono font-semibold tracking-wide bg-emerald-900/60 px-2 py-0.5 rounded border border-emerald-700/50 text-white">
                  {memberId}
                </span>
              </div>

              <div className="flex items-center gap-1 justify-center sm:justify-start">
                <span className="text-emerald-300 font-medium">Joining Date:</span>
                <span className="font-medium text-white">{joiningDate}</span>
              </div>
            </div>

            {member?.positionTitle && (
              <div className="pt-1 text-xs text-amber-300 flex items-center justify-center sm:justify-start gap-1.5 font-medium">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>{member.positionTitle}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Status Badges (Active, Inactive, Suspended) matching sample mockup */}
        <div className="flex flex-row md:flex-col items-center justify-center gap-2 shrink-0 pt-2 md:pt-0">
          {/* Active Badge */}
          <button
            type="button"
            onClick={() => setCurrentStatus("ACTIVE")}
            className={`w-32 py-1.5 px-3 rounded-md flex items-center justify-between text-xs font-medium transition-all ${
              currentStatus === "ACTIVE"
                ? "bg-[#10b981] text-white font-semibold ring-2 ring-emerald-300/40 shadow-sm"
                : "bg-emerald-950/60 text-emerald-300/70 border border-emerald-800/60 hover:bg-emerald-900/60"
            }`}
          >
            <span>Active</span>
            <CheckCircle2 className="h-4 w-4 ml-2 shrink-0" />
          </button>

          {/* Inactive Badge */}
          <button
            type="button"
            onClick={() => setCurrentStatus("INACTIVE")}
            className={`w-32 py-1.5 px-3 rounded-md flex items-center justify-between text-xs font-medium transition-all ${
              currentStatus === "INACTIVE"
                ? "bg-[#f59e0b] text-slate-950 font-bold ring-2 ring-amber-300/40 shadow-sm"
                : "bg-emerald-950/60 text-amber-300/70 border border-emerald-800/60 hover:bg-emerald-900/60"
            }`}
          >
            <span>Inactive</span>
            <MinusCircle className="h-4 w-4 ml-2 shrink-0" />
          </button>

          {/* Suspended Badge */}
          <button
            type="button"
            onClick={() => setCurrentStatus("SUSPENDED")}
            className={`w-32 py-1.5 px-3 rounded-md flex items-center justify-between text-xs font-medium transition-all ${
              currentStatus === "SUSPENDED"
                ? "bg-[#ef4444] text-white font-bold ring-2 ring-rose-300/40 shadow-sm"
                : "bg-emerald-950/60 text-rose-300/70 border border-emerald-800/60 hover:bg-emerald-900/60"
            }`}
          >
            <span>Suspended</span>
            <XCircle className="h-4 w-4 ml-2 shrink-0" />
          </button>
        </div>
      </div>
    </div>
  );
}
