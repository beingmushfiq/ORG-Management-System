"use client";

import React, { useState, useMemo } from "react";
import {
  MapPin,
  Search,
  ShieldCheck,
  Users,
  AlertTriangle,
  Layers,
  RotateCcw,
  Phone,
  Sparkles,
  ArrowRight,
  Palette,
} from "lucide-react";
import { soundEffects } from "@/lib/audio-effects";
import Link from "next/link";
import DISTRICTS_GEO_RAW from "./bangladesh-districts-geo.json";

export interface DistrictData {
  id: string;
  nameEn: string;
  nameBn: string;
  divisionId: string;
  divisionNameEn: string;
  divisionNameBn: string;
  volunteers: number;
  committeesCount: number;
  keyChapters: string[];
  blackspotsIdentified: number;
  initiatives: string[];
  coordinatorName: string;
  coordinatorPhone: string;
  center: { x: number; y: number };
  pathD: string;
}

export const DISTRICTS_64: DistrictData[] = DISTRICTS_GEO_RAW as DistrictData[];

export const DIVISIONS = [
  { id: "all", nameEn: "All 64 Districts", nameBn: "সমগ্র বাংলাদেশ (৬৪ জেলা)", color: "#f59e0b" },
  { id: "dhaka", nameEn: "Dhaka", nameBn: "ঢাকা বিভাগ", count: 13, color: "#3b82f6" },
  { id: "chattogram", nameEn: "Chattogram", nameBn: "চট্টগ্রাম বিভাগ", count: 11, color: "#f59e0b" },
  { id: "rajshahi", nameEn: "Rajshahi", nameBn: "রাজশাহী বিভাগ", count: 8, color: "#10b981" },
  { id: "khulna", nameEn: "Khulna", nameBn: "খুলনা বিভাগ", count: 10, color: "#06b6d4" },
  { id: "barishal", nameEn: "Barishal", nameBn: "বরিশাল বিভাগ", count: 6, color: "#ec4899" },
  { id: "sylhet", nameEn: "Sylhet", nameBn: "সিলেট বিভাগ", count: 4, color: "#8b5cf6" },
  { id: "rangpur", nameEn: "Rangpur", nameBn: "রংপুর বিভাগ", count: 8, color: "#f97316" },
  { id: "mymensingh", nameEn: "Mymensingh", nameBn: "ময়মনসিংহ বিভাগ", count: 4, color: "#14b8a6" },
];

export function BangladeshBranchAtlas() {
  const [selectedDivision, setSelectedDivision] = useState<string>("all");
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>("dhaka");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"map" | "grid">("map");
  // Map color style: "emerald" (authentic green matching sample) or "theme" (adaptive to light/dark)
  const [mapTheme, setMapTheme] = useState<"emerald" | "theme">("emerald");
  const [hoveredDistrict, setHoveredDistrict] = useState<DistrictData | null>(null);

  const filteredDistricts = useMemo(() => {
    return DISTRICTS_64.filter((d) => {
      const matchDivision = selectedDivision === "all" || d.divisionId === selectedDivision;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        d.nameEn.toLowerCase().includes(q) ||
        d.nameBn.includes(q) ||
        d.divisionNameEn.toLowerCase().includes(q) ||
        d.divisionNameBn.includes(q) ||
        d.keyChapters.some((c) => c.toLowerCase().includes(q));
      return matchDivision && matchSearch;
    });
  }, [selectedDivision, searchQuery]);

  const activeDistrict: DistrictData = useMemo(() => {
    const found = DISTRICTS_64.find((d) => d.id === selectedDistrictId);
    return found ?? DISTRICTS_64[0]!;
  }, [selectedDistrictId]);

  const handleSelectDistrict = (id: string) => {
    soundEffects.playClick(720);
    setSelectedDistrictId(id);
  };

  const handleDivisionChange = (divId: string) => {
    soundEffects.playClick(580);
    setSelectedDivision(divId);
    if (divId !== "all") {
      const firstInDiv = DISTRICTS_64.find((d) => d.divisionId === divId);
      if (firstInDiv) setSelectedDistrictId(firstInDiv.id);
    }
  };

  return (
    <div className="w-full space-y-8" id="atlas">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 pb-4 border-b border-border">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            National Geographic Network · 64 Districts
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Interactive Branch & Blackspot Atlas of Bangladesh
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 font-bangla mt-1">
            বাংলাদেশের ৬৪টি জেলায় নিরাপদ সড়ক আন্দোলনের ৮২টি কমিটি, ৯,০১০+ স্বেচ্ছাসেবী এবং ৪২০+ কালো স্থান (Blackspot) পর্যবেক্ষণ নেটওয়ার্ক
          </p>
        </div>

        {/* View & Theme Toggle Buttons */}
        <div className="flex flex-wrap items-center gap-2 self-stretch md:self-auto">
          {/* Map Color Palette Toggle */}
          <button
            type="button"
            onClick={() => {
              soundEffects.playClick(600);
              setMapTheme((prev) => (prev === "emerald" ? "theme" : "emerald"));
            }}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 border shadow-sm ${
              mapTheme === "emerald"
                ? "bg-emerald-600 text-white border-emerald-500"
                : "bg-card border-border text-slate-700 dark:text-slate-300 hover:bg-muted"
            }`}
            title="Toggle between authentic National Green map and Adaptive Theme map"
          >
            <Palette className="w-3.5 h-3.5" />
            <span>{mapTheme === "emerald" ? "National Green Map" : "Adaptive Theme Map"}</span>
          </button>

          {/* Map / Grid View Switch */}
          <div className="inline-flex rounded-lg border border-border bg-muted/40 p-0.5">
            <button
              type="button"
              onClick={() => {
                soundEffects.playClick(620);
                setViewMode("map");
              }}
              className={`px-3.5 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === "map"
                  ? "bg-amber-500 text-slate-950 shadow-sm"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              Map View
            </button>
            <button
              type="button"
              onClick={() => {
                soundEffects.playClick(620);
                setViewMode("grid");
              }}
              className={`px-3.5 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === "grid"
                  ? "bg-amber-500 text-slate-950 shadow-sm"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Grid ({filteredDistricts.length})
            </button>
          </div>
        </div>
      </div>

      {/* Filter Bar & Search */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by District (e.g. Bogura, ঢাকা, Sylhet, Cox's Bazar, B. Baria)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 shadow-sm"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 shrink-0">
            Showing <span className="font-bold text-slate-900 dark:text-white">{filteredDistricts.length}</span> of 64 Districts
          </div>
        </div>

        {/* Division Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          {DIVISIONS.map((div) => {
            const isSelected = selectedDivision === div.id;
            return (
              <button
                key={div.id}
                type="button"
                onClick={() => handleDivisionChange(div.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm ring-2 ring-amber-500/40"
                    : "bg-card border border-border text-slate-700 dark:text-slate-300 hover:bg-muted"
                }`}
              >
                <span>{div.nameEn}</span>
                {div.count !== undefined && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      isSelected
                        ? "bg-amber-500 text-slate-950"
                        : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    {div.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === "map" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ================= SVG VECTOR MAP ================= */}
          <div
            className={`lg:col-span-7 rounded-2xl border transition-all p-4 sm:p-6 relative overflow-hidden shadow-lg ${
              mapTheme === "emerald"
                ? "bg-[#05572e] border-[#044424] text-white"
                : "bg-card border-border text-foreground"
            }`}
          >
            {/* Top Status Bar inside Map Box */}
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                <span
                  className={`text-xs font-bold uppercase tracking-wider ${
                    mapTheme === "emerald" ? "text-emerald-100" : "text-slate-700 dark:text-slate-300"
                  }`}
                >
                  Geographic Map · All 64 Districts Active
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  soundEffects.playClick(500);
                  setSelectedDivision("all");
                  setSearchQuery("");
                  setSelectedDistrictId("dhaka");
                }}
                className="text-xs font-semibold text-amber-400 hover:text-amber-300 underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                Reset View
              </button>
            </div>

            {/* Hover Tooltip Overlay */}
            {hoveredDistrict && (
              <div
                className="absolute top-5 right-5 z-20 px-3 py-1.5 rounded-lg bg-slate-950/90 text-white text-xs backdrop-blur-md border border-amber-400/40 shadow-xl pointer-events-none transition-all"
              >
                <div className="font-extrabold flex items-center gap-1.5 text-amber-400">
                  <MapPin className="w-3 h-3" />
                  {hoveredDistrict.nameEn} ({hoveredDistrict.nameBn})
                </div>
                <div className="text-[11px] text-slate-300 mt-0.5">
                  {hoveredDistrict.divisionNameEn} Division · {hoveredDistrict.volunteers} Volunteers
                </div>
              </div>
            )}

            {/* SVG Bangladesh Map */}
            <div className="relative w-full aspect-[850/1100] max-h-[720px] mx-auto flex items-center justify-center">
              <svg
                viewBox="0 0 850 1100"
                className="w-full h-full select-none"
                style={{ filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.18))" }}
              >
                {/* Background River / Bay Ocean Backdrop */}
                <rect
                  width="100%"
                  height="100%"
                  rx="16"
                  fill={mapTheme === "emerald" ? "#064e29" : "transparent"}
                />

                {/* All 64 District Geographic MultiPolygons */}
                <g id="bangladesh-districts-polygons">
                  {DISTRICTS_64.map((dist) => {
                    const isSelected = dist.id === activeDistrict.id;
                    const isHovered = hoveredDistrict?.id === dist.id;
                    const isMatch = filteredDistricts.some((fd) => fd.id === dist.id);

                    // Colors based on mapTheme
                    let fill = "#22c55e"; // default emerald
                    let stroke = "#075e33";

                    if (mapTheme === "emerald") {
                      if (isSelected) {
                        fill = "#f59e0b"; // glowing safety amber
                        stroke = "#ffffff";
                      } else if (isHovered) {
                        fill = "#4ade80"; // brighter green
                        stroke = "#fef08a";
                      } else if (!isMatch) {
                        fill = "#15803d"; // dimmer for filtered-out
                        stroke = "#044424";
                      } else {
                        fill = "#22c55e"; // lush green matching sample
                        stroke = "#064426";
                      }
                    } else {
                      // Adaptive Theme Map
                      if (isSelected) {
                        fill = "#f59e0b";
                        stroke = "#ffffff";
                      } else if (isHovered) {
                        fill = "rgba(245, 158, 11, 0.35)";
                        stroke = "#f59e0b";
                      } else if (!isMatch) {
                        fill = "hsl(var(--muted))";
                        stroke = "hsl(var(--border))";
                      } else {
                        fill = "hsl(var(--card))";
                        stroke = "hsl(var(--border))";
                      }
                    }

                    return (
                      <path
                        key={dist.id}
                        id={`map-district-${dist.id}`}
                        d={dist.pathD}
                        fill={fill}
                        stroke={stroke}
                        strokeWidth={isSelected ? "2.8" : isHovered ? "2.2" : "1.1"}
                        opacity={isMatch ? 1 : 0.4}
                        className="transition-colors duration-150 cursor-pointer"
                        onMouseEnter={() => setHoveredDistrict(dist)}
                        onMouseLeave={() => setHoveredDistrict(null)}
                        onClick={() => handleSelectDistrict(dist.id)}
                      />
                    );
                  })}
                </g>

                {/* District Text Labels (Printed exactly like the sample image) */}
                <g id="bangladesh-districts-labels" pointerEvents="none">
                  {DISTRICTS_64.map((dist) => {
                    const isSelected = dist.id === activeDistrict.id;
                    const isMatch = filteredDistricts.some((fd) => fd.id === dist.id);

                    // Choose font size based on district size
                    const smallDistricts = ["dhaka", "narayanganj", "meherpur", "jhalakathi", "feni", "chuadanga"];
                    const fontSize = isSelected ? 12 : smallDistricts.includes(dist.id) ? 7.5 : 9;

                    return (
                      <text
                        key={`label-${dist.id}`}
                        x={dist.center.x}
                        y={dist.center.y}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize={fontSize}
                        fontWeight="700"
                        fill={isSelected ? "#090d16" : mapTheme === "emerald" ? "#ffffff" : "currentColor"}
                        opacity={isMatch ? 1 : 0.45}
                        className="select-none tracking-tight"
                        style={{
                          textShadow:
                            isSelected || mapTheme !== "emerald"
                              ? "none"
                              : "0 1px 2px rgba(0,0,0,0.85)",
                        }}
                      >
                        {dist.nameEn}
                      </text>
                    );
                  })}
                </g>

                {/* Radar Beacon Pulse Ring on Selected District */}
                <g pointerEvents="none">
                  <circle
                    cx={activeDistrict.center.x}
                    cy={activeDistrict.center.y}
                    r="8"
                    fill="#f59e0b"
                    stroke="#ffffff"
                    strokeWidth="2"
                    className="drop-shadow-md"
                  />
                  <circle
                    cx={activeDistrict.center.x}
                    cy={activeDistrict.center.y}
                    r="24"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="2.5"
                    className="animate-ping origin-center opacity-75"
                  />
                </g>
              </svg>
            </div>

            {/* Division Legend */}
            <div
              className={`mt-4 pt-4 border-t grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-medium ${
                mapTheme === "emerald"
                  ? "border-emerald-700/50 text-emerald-100"
                  : "border-border text-slate-600 dark:text-slate-400"
              }`}
            >
              {DIVISIONS.filter((d) => d.id !== "all").map((d) => (
                <div key={d.id} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                  <span>
                    {d.nameEn} ({d.count})
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ================= SELECTED DISTRICT SAFETY DOSSIER ================= */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-card rounded-2xl border-2 border-amber-500/40 p-6 shadow-xl relative overflow-hidden">
              {/* Header Badge & Action */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wide mb-2">
                    <MapPin className="w-3.5 h-3.5" />
                    {activeDistrict.divisionNameEn} Division · {activeDistrict.divisionNameBn}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-baseline gap-2">
                    <span>{activeDistrict.nameEn}</span>
                    <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400 font-bangla">
                      {activeDistrict.nameBn}
                    </span>
                  </h3>
                </div>

                <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 shrink-0">
                  {activeDistrict.committeesCount} {activeDistrict.committeesCount > 1 ? "Committees" : "Committee"}
                </span>
              </div>

              {/* Metric Highlights */}
              <div className="grid grid-cols-2 gap-3 my-5">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-border">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                    <Users className="w-3.5 h-3.5 text-blue-500" />
                    <span>Volunteers Active</span>
                  </div>
                  <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                    {activeDistrict.volunteers.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                    100% Certified Brigades
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-border">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                    <span>Blackspots Monitored</span>
                  </div>
                  <div className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">
                    {activeDistrict.blackspotsIdentified}
                  </div>
                  <span className="text-[10px] text-amber-700 dark:text-amber-300 font-medium">
                    Continuous Speed Audits
                  </span>
                </div>
              </div>

              {/* Local Key Chapters */}
              <div className="space-y-2 mb-5">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Campus & Upazila Chapters:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeDistrict.keyChapters.map((ch, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md text-xs font-medium bg-muted text-slate-700 dark:text-slate-200 border border-border/80"
                    >
                      {ch}
                    </span>
                  ))}
                </div>
              </div>

              {/* Ongoing Local Initiatives */}
              <div className="space-y-2 mb-5">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Active Safety Initiatives:
                </div>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  {activeDistrict.initiatives.map((init, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      <span>{init}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* District Coordinator Contact & Helpline */}
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-4 mb-5">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300 block">
                    District Volunteer Coordinator:
                  </span>
                  <span className="font-extrabold text-sm text-slate-900 dark:text-white block mt-0.5">
                    {activeDistrict.coordinatorName}
                  </span>
                  <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 block mt-0.5">
                    {activeDistrict.coordinatorPhone}
                  </span>
                </div>
                <a
                  href={`tel:${activeDistrict.coordinatorPhone}`}
                  onClick={() => soundEffects.playClick(800)}
                  className="p-2.5 rounded-xl bg-amber-500 text-slate-950 hover:bg-amber-400 transition-colors shadow-sm"
                  title="Direct Call"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>

              {/* Action Link: Apply in this District */}
              <Link
                href="/apply"
                onClick={() => soundEffects.playClick(750)}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              >
                <Sparkles className="w-4 h-4" />
                <span>Join Volunteer Brigade in {activeDistrict.nameEn}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      ) : (
        /* ================= 64-DISTRICT COMPLETE DIRECTORY GRID ================= */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredDistricts.map((dist) => {
            const isSelected = dist.id === activeDistrict.id;
            return (
              <div
                key={dist.id}
                onClick={() => {
                  handleSelectDistrict(dist.id);
                  setViewMode("map");
                }}
                className={`p-4 rounded-xl border transition-all cursor-pointer select-none relative ${
                  isSelected
                    ? "border-amber-500 bg-amber-500/10 shadow-md ring-2 ring-amber-500/30"
                    : "border-border bg-card hover:border-slate-400 dark:hover:border-slate-600 hover:shadow-sm"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">{dist.nameEn}</h4>
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 font-bangla">
                      {dist.nameBn}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {dist.divisionNameEn}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-border/60 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Volunteers:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{dist.volunteers}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Blackspots:</span>
                    <span className="font-bold text-amber-600 dark:text-amber-400">
                      {dist.blackspotsIdentified}
                    </span>
                  </div>
                </div>

                <div className="mt-2.5 flex items-center justify-between text-[11px] font-bold text-amber-600 dark:text-amber-400">
                  <span>{dist.committeesCount} Committee</span>
                  <span className="flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    View in Map →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
