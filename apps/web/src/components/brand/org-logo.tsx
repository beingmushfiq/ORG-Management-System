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
  tenantName = "Bangladesh Medical Association",
  tenantNameBn = "বাংলাদেশ মেডিকেল এসোসিয়েশন",
  subtitle = "Chattogram Division · Estd. 1972",
  subtitleBn = "চট্টগ্রাম বিভাগ · প্রতিষ্ঠিত ১৯৭২",
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
      aria-label={`${tenantName} Seal`}
    >
      <defs>
        <linearGradient id="crestGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="45%" stopColor="#EAB308" />
          <stop offset="100%" stopColor="#CA8A04" />
        </linearGradient>
        <linearGradient id="crestBlue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="50%" stopColor="#0F172A" />
          <stop offset="100%" stopColor="#020617" />
        </linearGradient>
        <linearGradient id="crestEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#EAB308" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Outer Golden Fluted Medallion Ring */}
      <circle cx="50" cy="50" r="47" stroke="url(#crestGold)" strokeWidth="2.5" />
      <circle cx="50" cy="50" r="44" stroke="url(#crestGold)" strokeWidth="1" strokeDasharray="2 3" opacity="0.8" />

      {/* Inner Rich Midnight Medallion Disc */}
      <circle cx="50" cy="50" r="41.5" fill="url(#crestBlue)" stroke="url(#crestGold)" strokeWidth="1.5" />

      {/* Hexagonal / Octagonal Star Lattice of Integrity */}
      <polygon
        points="50,15 62,38 85,50 62,62 50,85 38,62 15,50 38,38"
        fill="none"
        stroke="url(#crestGold)"
        strokeWidth="0.8"
        opacity="0.35"
      />

      {/* Twin Laurel Branches of Honor */}
      <path
        d="M26 62C24 54 26 42 34 32C32 37 32 45 35 52C32 54 29 58 26 62Z"
        fill="url(#crestGold)"
        opacity="0.85"
      />
      <path
        d="M74 62C76 54 74 42 66 32C68 37 68 45 65 52C68 54 71 58 74 62Z"
        fill="url(#crestGold)"
        opacity="0.85"
      />

      {/* Open Book of Ethics & Science */}
      <path
        d="M36 68C42 65 47 66 50 69C53 66 58 65 64 68V55C58 52 53 53 50 56C47 53 42 52 36 55V68Z"
        fill="url(#crestGold)"
      />
      <line x1="50" y1="56" x2="50" y2="70" stroke="#0F172A" strokeWidth="1.2" />

      {/* Central Asclepius Staff of Medicine */}
      <line x1="50" y1="24" x2="50" y2="58" stroke="url(#crestGold)" strokeWidth="3" strokeLinecap="round" />
      <circle cx="50" cy="22" r="3" fill="url(#crestGold)" filter="url(#goldGlow)" />

      {/* Coiled Serpent of Healing */}
      <path
        d="M48 27C55 28 55 33 49 35C43 37 43 43 51 45C57 47 55 52 49 53"
        stroke="url(#crestEmerald)"
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      />

      {/* Cardinal Stars */}
      <circle cx="50" cy="11" r="1.5" fill="url(#crestGold)" />
      <circle cx="50" cy="89" r="1.5" fill="url(#crestGold)" />
      <circle cx="11" cy="50" r="1.5" fill="url(#crestGold)" />
      <circle cx="89" cy="50" r="1.5" fill="url(#crestGold)" />
    </svg>
  );

  if (variant === "mark") {
    return <div className={`inline-flex items-center ${className}`}>{emblem}</div>;
  }

  return (
    <div className={`inline-flex items-center gap-3.5 ${className}`}>
      {emblem}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-white tracking-tight leading-none text-base sm:text-lg">
            {tenantName}
          </span>
          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-amber-500/15 text-amber-300 border border-amber-500/30">
            BMA
          </span>
        </div>
        <div
          className="text-[11px] text-muted-foreground font-bangla tracking-wide mt-1 flex items-center gap-2"
          title={`${tenantNameBn} — ${subtitleBn}`}
        >
          <span>{tenantNameBn}</span>
          <span className="w-1 h-1 rounded-full bg-slate-600 hidden sm:inline-block" />
          <span className="text-[10px] text-amber-400/80 font-mono hidden sm:inline-block">
            {subtitle}
          </span>
        </div>
      </div>
    </div>
  );
}
