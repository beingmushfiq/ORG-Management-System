"use client";

import React, { useState } from "react";
import {
  MapPin,
  Building,
  PhoneCall,
  ArrowRight,
} from "lucide-react";
import { Badge, Button, Card, CardContent } from "@org/ui";
import Link from "next/link";

interface DivisionData {
  id: string;
  nameEn: string;
  nameBn: string;
  headquarters: string;
  president: string;
  generalSecretary: string;
  memberCount: number;
  affiliatedHospitalsCount: number;
  hotline: string;
  keyUnits: string[];
  color: string;
  pathD: string; // Vector polygon path representation
  centerPos: { x: number; y: number };
}

const DIVISIONS: DivisionData[] = [
  {
    id: "dhaka",
    nameEn: "Dhaka Division",
    nameBn: "ঢাকা বিভাগ",
    headquarters: "BMA Bhaban, 15/2 Topkhana Road, Dhaka-1000",
    president: "Prof. Dr. Mahmudul Hasan",
    generalSecretary: "Dr. Kazi Mostafa",
    memberCount: 1420,
    affiliatedHospitalsCount: 18,
    hotline: "+880 2-9562934",
    keyUnits: ["Dhaka Medical College Unit", "BSMMU Unit", "Sir Salimullah Unit", "Suhrawardy Unit"],
    color: "#3b82f6",
    pathD: "M 220 220 L 290 200 L 320 240 L 300 310 L 250 330 L 210 270 Z",
    centerPos: { x: 260, y: 260 },
  },
  {
    id: "chattogram",
    nameEn: "Chattogram Division",
    nameBn: "চট্টগ্রাম বিভাগ",
    headquarters: "BMA Bhaban, 18 K.B. Fazlul Kader Road, Panchlaish, Chattogram",
    president: "Prof. Dr. Mujibul Haque",
    generalSecretary: "Dr. Faisal Ahmed Chowdhury",
    memberCount: 940,
    affiliatedHospitalsCount: 12,
    hotline: "+880 31-654812",
    keyUnits: ["Chattogram Medical College Unit", "Cox's Bazar District Unit", "Feni Emergency Unit", "Cumilla Central"],
    color: "#f59e0b",
    pathD: "M 320 260 L 380 280 L 420 380 L 410 460 L 350 440 L 320 340 Z",
    centerPos: { x: 360, y: 360 },
  },
  {
    id: "rajshahi",
    nameEn: "Rajshahi Division",
    nameBn: "রাজশাহী বিভাগ",
    headquarters: "Medical College Road, Laxmipur, Rajshahi",
    president: "Prof. Dr. S. R. Majumdar",
    generalSecretary: "Dr. M. A. Hye",
    memberCount: 480,
    affiliatedHospitalsCount: 7,
    hotline: "+880 721-772190",
    keyUnits: ["Rajshahi Medical College Unit", "Bogra Shaheed Ziaur Rahman Unit", "Pabna Mental Health Unit"],
    color: "#10b981",
    pathD: "M 110 160 L 210 150 L 230 220 L 170 250 L 100 210 Z",
    centerPos: { x: 160, y: 200 },
  },
  {
    id: "khulna",
    nameEn: "Khulna Division",
    nameBn: "খুলনা বিভাগ",
    headquarters: "Boyra Main Road, Khulna",
    president: "Dr. Sheikh Baharul Alam",
    generalSecretary: "Dr. Mehedi Newaz",
    memberCount: 390,
    affiliatedHospitalsCount: 6,
    hotline: "+880 41-760124",
    keyUnits: ["Khulna Medical College Unit", "Jessore District Unit", "Kushtia Unit"],
    color: "#06b6d4",
    pathD: "M 140 270 L 210 260 L 240 340 L 190 420 L 130 380 Z",
    centerPos: { x: 180, y: 340 },
  },
  {
    id: "sylhet",
    nameEn: "Sylhet Division",
    nameBn: "সিলেট বিভাগ",
    headquarters: "Osmani Medical Road, Kajolshah, Sylhet",
    president: "Prof. Dr. Ehteshamul Haque",
    generalSecretary: "Dr. Azizur Rahman",
    memberCount: 360,
    affiliatedHospitalsCount: 5,
    hotline: "+880 821-714092",
    keyUnits: ["Sylhet MAG Osmani Medical Unit", "Moulvibazar Unit", "Habiganj Unit"],
    color: "#8b5cf6",
    pathD: "M 320 150 L 400 140 L 420 220 L 350 250 L 310 190 Z",
    centerPos: { x: 360, y: 190 },
  },
  {
    id: "barishal",
    nameEn: "Barishal Division",
    nameBn: "বরিশাল বিভাগ",
    headquarters: "Band Road, Barishal Sadar",
    president: "Dr. Ishtiaq Hossain",
    generalSecretary: "Dr. Muniruzzaman Khan",
    memberCount: 220,
    affiliatedHospitalsCount: 4,
    hotline: "+880 431-217640",
    keyUnits: ["Sher-e-Bangla Medical College Unit", "Patuakhali Coastal Unit", "Bhola Island Unit"],
    color: "#ec4899",
    pathD: "M 230 350 L 290 340 L 310 430 L 240 450 L 220 400 Z",
    centerPos: { x: 265, y: 390 },
  },
  {
    id: "rangpur",
    nameEn: "Rangpur Division",
    nameBn: "রংপুর বিভাগ",
    headquarters: "Dhap, Jail Road, Rangpur",
    president: "Dr. Zakir Hossain",
    generalSecretary: "Dr. Shafiqul Islam",
    memberCount: 260,
    affiliatedHospitalsCount: 5,
    hotline: "+880 521-63801",
    keyUnits: ["Rangpur Medical College Unit", "Dinajpur M. Abdur Rahim Unit"],
    color: "#f97316",
    pathD: "M 130 60 L 210 70 L 190 140 L 120 140 Z",
    centerPos: { x: 160, y: 100 },
  },
  {
    id: "mymensingh",
    nameEn: "Mymensingh Division",
    nameBn: "ময়মনসিংহ বিভাগ",
    headquarters: "Charpara, Mymensingh",
    president: "Prof. Dr. Matiur Rahman",
    generalSecretary: "Dr. Baki Billah",
    memberCount: 230,
    affiliatedHospitalsCount: 4,
    hotline: "+880 91-66024",
    keyUnits: ["Mymensingh Medical College Unit", "Jamalpur District Unit"],
    color: "#14b8a6",
    pathD: "M 220 140 L 300 130 L 300 190 L 230 190 Z",
    centerPos: { x: 260, y: 160 },
  },
];

export function BangladeshBranchAtlas() {
  const [selectedDivision, setSelectedDivision] = useState<DivisionData>(DIVISIONS[1]!); // Default to Chattogram
  const [hoveredDivision, setHoveredDivision] = useState<string | null>(null);

  return (
    <div className="w-full bg-slate-950/80 border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden relative">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-2">
            <MapPin className="w-3.5 h-3.5" />
            Nationwide Grassroots Network
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-white tracking-tight">
            Interactive National Branch Atlas of Bangladesh
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            Click on any administrative division to explore local secretariat offices, elected leadership, active physicians roster, and hospital units.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping inline-block" />
          <span>8 Divisional Councils • 64 District Branches Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Interactive Vector Map Canvas */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center relative bg-slate-900/50 rounded-2xl border border-white/5 p-4 sm:p-6 min-h-[420px]">
          <svg
            viewBox="80 40 360 440"
            className="w-full max-w-md h-auto filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)] cursor-pointer select-none"
          >
            <defs>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Render Division Polygons */}
            {DIVISIONS.map((div) => {
              const isSelected = selectedDivision.id === div.id;
              const isHovered = hoveredDivision === div.id;

              return (
                <g key={div.id}>
                  <path
                    d={div.pathD}
                    fill={isSelected ? div.color : isHovered ? `${div.color}cc` : "#1e293b"}
                    stroke={isSelected ? "#ffffff" : isHovered ? div.color : "rgba(255,255,255,0.2)"}
                    strokeWidth={isSelected ? 3 : 1.5}
                    className="transition-all duration-300 hover:opacity-90"
                    onMouseEnter={() => setHoveredDivision(div.id)}
                    onMouseLeave={() => setHoveredDivision(null)}
                    onClick={() => setSelectedDivision(div)}
                  />
                  {/* Division Name Label */}
                  <text
                    x={div.centerPos.x}
                    y={div.centerPos.y}
                    textAnchor="middle"
                    fill={isSelected ? "#ffffff" : "#94a3b8"}
                    fontSize={isSelected ? "11" : "9"}
                    fontWeight={isSelected ? "bold" : "normal"}
                    className="pointer-events-none transition-all duration-200"
                  >
                    {div.nameEn.replace(" Division", "")}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Map Controls / Instructions */}
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            {DIVISIONS.map((d) => (
              <button
                key={d.id}
                onClick={() => setSelectedDivision(d)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                  selectedDivision.id === d.id
                    ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                    : "bg-slate-950 border border-white/10 text-slate-400 hover:text-white"
                }`}
              >
                {d.nameEn.replace(" Division", "")}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Dynamic Division Dossier Card */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="bg-slate-900/90 border border-amber-500/30 rounded-2xl shadow-xl overflow-hidden">
            <div className="h-2 w-full" style={{ backgroundColor: selectedDivision.color }} />
            <CardContent className="p-6 space-y-5">
              <div className="flex items-start justify-between">
                <div>
                  <Badge className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold mb-1">
                    DIVISIONAL HEADQUARTERS
                  </Badge>
                  <h4 className="text-2xl font-bold font-serif text-white">
                    {selectedDivision.nameEn}
                  </h4>
                  <div className="text-xs text-slate-400 font-bangla">{selectedDivision.nameBn}</div>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-black font-serif text-amber-400">
                    {selectedDivision.memberCount}
                  </div>
                  <div className="text-[10px] text-slate-400">Registered Doctors</div>
                </div>
              </div>

              {/* Secretariat Details */}
              <div className="space-y-2 text-xs text-slate-300 bg-slate-950 p-4 rounded-xl border border-white/5">
                <div className="flex items-start gap-2">
                  <Building className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{selectedDivision.headquarters}</span>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
                  <a href={`tel:${selectedDivision.hotline}`} className="hover:underline font-mono text-emerald-400">
                    {selectedDivision.hotline}
                  </a>
                </div>
              </div>

              {/* Elected Leadership */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-950/60 p-3 rounded-xl border border-white/5">
                  <div className="text-[10px] text-slate-400">Divisional President</div>
                  <div className="font-bold text-white mt-0.5 truncate">{selectedDivision.president}</div>
                </div>
                <div className="bg-slate-950/60 p-3 rounded-xl border border-white/5">
                  <div className="text-[10px] text-slate-400">General Secretary</div>
                  <div className="font-bold text-white mt-0.5 truncate">{selectedDivision.generalSecretary}</div>
                </div>
              </div>

              {/* Constituent Hospital Units */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-semibold text-slate-400">
                  Affiliated Units & Medical Colleges ({selectedDivision.affiliatedHospitalsCount} Active):
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedDivision.keyUnits.map((u, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-slate-950 border border-white/10 text-[10px] text-slate-300"
                    >
                      {u}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <Link href="/portal/branches">
                  <Button className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs gap-2 py-2.5">
                    <span>Explore Subtree in Visual Hierarchy</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
