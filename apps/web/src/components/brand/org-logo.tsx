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
  tenantName = "National Agricultural Olympiad",
  tenantNameBn = "জাতীয় কৃষি অলিম্পিয়াড",
  subtitle = "Season 2025 · Empowering Youth for Sustainable Agriculture",
  subtitleBn = "টেকসই কৃষির রূপান্তরে তরুণ প্রজন্মের নেতৃত্ব",
}: OrgLogoProps) {
  const dimension = {
    sm: 32,
    md: 44,
    lg: 64,
    xl: 96,
  }[size];

  const isAgri =
    tenantName.toLowerCase().includes("agri") ||
    tenantName.toLowerCase().includes("olympiad");

  const emblem = isAgri ? (
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
        <linearGradient id="agriSunGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
        <linearGradient id="agriLeafGreen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="agriDeepGreen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#064E3B" />
          <stop offset="100%" stopColor="#022C22" />
        </linearGradient>
        <filter id="agriGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#10B981" floodOpacity="0.35" />
        </filter>
      </defs>

      {/* Outer Emblem Shield / Circular Seal */}
      <circle cx="50" cy="50" r="46" fill="url(#agriDeepGreen)" stroke="url(#agriSunGrad)" strokeWidth="3" />
      <circle cx="50" cy="50" r="41" fill="none" stroke="#10B981" strokeWidth="1.2" strokeDasharray="3 2" opacity="0.8" />

      {/* Golden Rising Sun */}
      <circle cx="50" cy="38" r="14" fill="url(#agriSunGrad)" />

      {/* Sun Rays */}
      <path
        d="M50 18 V22 M50 54 V58 M30 38 H34 M66 38 H70 M36 24 L39 27 M64 24 L61 27"
        stroke="url(#agriSunGrad)"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Sprouting Plant Leaves (Left Leaf) */}
      <path
        d="M50 72 C42 62 30 54 34 40 C46 42 49 56 50 72 Z"
        fill="url(#agriLeafGreen)"
        filter="url(#agriGlow)"
      />

      {/* Sprouting Plant Leaves (Right Leaf) */}
      <path
        d="M50 72 C58 62 70 54 66 40 C54 42 51 56 50 72 Z"
        fill="#10B981"
      />

      {/* Central Sprout Stem & Leaf Vein */}
      <path
        d="M50 78 V48 M50 54 C46 50 42 48 40 48 M50 58 C54 54 58 52 60 52"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Ground / Earth Furrows */}
      <path
        d="M26 80 Q50 74 74 80 M32 86 Q50 81 68 86"
        stroke="url(#agriSunGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  ) : (
    <svg
      width={dimension}
      height={dimension}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 drop-shadow-md"
    >
      <circle cx="50" cy="50" r="46" fill="#0F172A" stroke="#F59E0B" strokeWidth="3" />
      <path d="M50 20 L80 80 H20 Z" fill="#10B981" />
    </svg>
  );

  if (variant === "mark") {
    return <div className={`inline-flex items-center ${className}`}>{emblem}</div>;
  }

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {emblem}
      <div className="flex flex-col justify-center leading-none">
        <div className="flex items-center gap-1.5">
          <span className="font-extrabold text-foreground tracking-tight text-sm sm:text-base">
            {tenantName}
          </span>
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30">
            2025
          </span>
        </div>
        <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 font-bangla mt-0.5">
          {tenantNameBn}
        </div>
        {subtitle && (
          <div className="text-[10px] text-muted-foreground mt-0.5 hidden sm:block truncate max-w-[240px]">
            {subtitle} {subtitleBn ? `· ${subtitleBn}` : ""}
          </div>
        )}
      </div>
    </div>
  );
}
