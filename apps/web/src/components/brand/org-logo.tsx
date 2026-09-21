"use client";

import React from "react";

interface OrgLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "full" | "mark" | "badge";
  className?: string;
  tenantName?: string;
  tenantNameBn?: string;
  subtitle?: string;
  subtitleBn?: string;
}

export function OrgLogo({
  size = "md",
  variant = "full",
  className = "",
  tenantName = "Road Safety Movement",
  tenantNameBn = "নিরাপদ সড়ক আন্দোলন",
  subtitle = "Estd. 2018 · Born from the Students' Movement",
  subtitleBn = "২০১৮ সালের ঐতিহাসিক নিরাপদ সড়ক আন্দোলন থেকে প্রতিষ্ঠিত",
}: OrgLogoProps) {
  const dimension = {
    sm: 32,
    md: 44,
    lg: 64,
    xl: 96,
  }[size];

  const emblem = (
    <svg
      width={dimension}
      height={dimension}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 drop-shadow-md"
      aria-label={`${tenantName} Official Insignia`}
    >
      <defs>
        <linearGradient id="safetyAmberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="50%" stopColor="#EAB308" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
        <linearGradient id="safetyGreenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="roadAsphalt" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
        <filter id="rsmGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#F59E0B" floodOpacity="0.4" />
        </filter>
      </defs>

      {/* Protective Shield Outer Boundary */}
      <path
        d="M50 8 L85 24 V52 C85 72 50 92 50 92 C50 92 15 72 15 52 V24 Z"
        fill="url(#roadAsphalt)"
        stroke="url(#safetyAmberGrad)"
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* Inner Accent Inlay Ring */}
      <path
        d="M50 14 L80 28 V52 C80 68 50 85 50 85 C50 85 20 68 20 52 V28 Z"
        fill="none"
        stroke="url(#safetyGreenGrad)"
        strokeWidth="1.2"
        strokeDasharray="3 2"
        opacity="0.75"
      />

      {/* Dynamic Road Highway converging to horizon */}
      <polygon
        points="44,38 56,38 68,76 32,76"
        fill="#020617"
        stroke="#475569"
        strokeWidth="1"
      />

      {/* Center Dashed Highway Dividing Line (Safety Yellow) */}
      <line x1="50" y1="42" x2="50" y2="48" stroke="url(#safetyAmberGrad)" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="52" x2="50" y2="60" stroke="url(#safetyAmberGrad)" strokeWidth="3" strokeLinecap="round" />
      <line x1="50" y1="64" x2="50" y2="74" stroke="url(#safetyAmberGrad)" strokeWidth="3.5" strokeLinecap="round" />

      {/* Pedestrian Crosswalk / Zebra Crossing Stripes */}
      <line x1="38" y1="68" x2="44" y2="68" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
      <line x1="56" y1="68" x2="62" y2="68" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.9" />

      {/* Guiding Safety Star / Beacon of Hope */}
      <circle cx="50" cy="30" r="4.5" fill="url(#safetyAmberGrad)" filter="url(#rsmGlow)" />
      <path
        d="M50 20 V25 M50 35 V40 M42 30 H45 M55 30 H58"
        stroke="url(#safetyAmberGrad)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Twin Protective Green Laurel Arcs */}
      <path
        d="M24 50 C24 64 36 74 46 79"
        stroke="url(#safetyGreenGrad)"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M76 50 C76 64 64 74 54 79"
        stroke="url(#safetyGreenGrad)"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );

  if (variant === "mark") {
    return <div className={`inline-flex items-center ${className}`}>{emblem}</div>;
  }

  return (
    <div className={`inline-flex items-center gap-3.5 shrink-0 select-none ${className}`}>
      {emblem}
      <div className="flex flex-col justify-center min-w-0">
        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="font-extrabold text-slate-900 dark:text-white tracking-tight leading-none text-base sm:text-lg">
            {tenantName}
          </span>
          <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold tracking-wider uppercase bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
            RSM
          </span>
        </div>
        <div
          className="text-[11px] text-slate-600 dark:text-slate-300 font-bangla font-medium tracking-wide mt-1 flex items-center gap-2"
          title={`${tenantNameBn} — ${subtitleBn}`}
        >
          <span className="text-emerald-700 dark:text-emerald-400 font-bold">{tenantNameBn}</span>
          <span className="w-1 h-1 rounded-full bg-slate-400 dark:bg-slate-600 hidden sm:inline-block" />
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono hidden sm:inline-block">
            {subtitle}
          </span>
        </div>
      </div>
    </div>
  );
}
