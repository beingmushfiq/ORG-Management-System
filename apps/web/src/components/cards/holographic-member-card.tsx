"use client";

import React, { useState, useRef } from "react";
import { ShieldCheck, QrCode, Sparkles, Download, ArrowRightLeft } from "lucide-react";
import { Button } from "@org/ui";

interface HolographicMemberCardProps {
  memberName?: string;
  memberNameBn?: string;
  memberId?: string;
  tier?: "ASSOCIATE" | "GENERAL" | "LIFE";
  organizationName?: string;
  branchName?: string;
  validThrough?: string;
}

export function HolographicMemberCard({
  memberName = "Prof. Dr. Mujibul Haque",
  memberNameBn = "অধ্যাপক ডাঃ মুজিবুল হক",
  memberId = "BMA-LIFE-0001",
  tier = "LIFE",
  organizationName = "Bangladesh Medical Association",
  branchName = "Central Executive Secretariat",
  validThrough = "Lifetime Member",
}: HolographicMemberCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const [isFlipped, setIsFlipped] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -14;
    const rotY = ((x - centerX) / centerX) * 14;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlarePosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* 3D Perspective Card Wrapper */}
      <div
        className="w-full max-w-[420px] h-[260px] cursor-pointer select-none [perspective:1200px]"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsFlipped((prev) => !prev)}
      >
        <div
          ref={cardRef}
          className="relative w-full h-full rounded-2xl transition-transform duration-200 ease-out [transform-style:preserve-3d] shadow-2xl"
          style={{
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY + (isFlipped ? 180 : 0)}deg)`,
          }}
        >
          {/* ================= FRONT SIDE ================= */}
          <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden glass-card p-6 flex flex-col justify-between border border-white/20 [backface-visibility:hidden]">
            {/* Dynamic Iridescent Light Sheen */}
            <div
              className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay iridescent-foil"
              style={{
                backgroundPosition: `${glarePosition.x}% ${glarePosition.y}%`,
              }}
            />

            {/* Card Header */}
            <div className="relative z-10 flex items-start justify-between">
              <div>
                <div className="text-[10px] uppercase font-bold tracking-widest text-amber-400 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  Official Digital Credential
                </div>
                <h4 className="text-sm font-bold text-white tracking-tight mt-0.5">
                  {organizationName}
                </h4>
                <p className="text-[11px] text-muted-foreground">{branchName}</p>
              </div>
              <div className="px-2.5 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
                {tier} Member
              </div>
            </div>

            {/* Card Center Info */}
            <div className="relative z-10 mt-2">
              <div className="text-xl font-extrabold text-white tracking-tight">
                {memberName}
              </div>
              <div className="text-xs text-muted-foreground font-bangla mt-0.5">
                {memberNameBn}
              </div>
            </div>

            {/* Card Footer */}
            <div className="relative z-10 flex items-end justify-between pt-2 border-t border-white/10">
              <div>
                <div className="text-[9px] uppercase font-semibold text-muted-foreground">
                  Member ID
                </div>
                <div className="text-sm font-mono font-bold text-amber-400 tracking-wider">
                  {memberId}
                </div>
              </div>
              <div className="text-right">
                <div className="text-[9px] uppercase font-semibold text-muted-foreground">
                  Validity
                </div>
                <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {validThrough}
                </div>
              </div>
            </div>
          </div>

          {/* ================= BACK SIDE (FLIPPED) ================= */}
          <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden glass-card p-6 flex flex-col justify-between border border-white/20 [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="text-xs font-bold text-white tracking-wide">
                Cryptographic Security Seal
              </div>
              <span className="text-[10px] text-emerald-400 font-mono">SHA-256 VERIFIED</span>
            </div>

            <div className="flex items-center justify-center py-2">
              <div className="p-3 bg-white rounded-xl shadow-inner flex items-center justify-center">
                <QrCode className="w-20 h-20 text-slate-900" />
              </div>
            </div>

            <div className="text-center text-[10px] text-muted-foreground">
              Scan with camera to verify membership authenticity on public trust registry.
            </div>
          </div>
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsFlipped((prev) => !prev)}
          className="gap-1.5 text-xs"
        >
          <ArrowRightLeft className="w-3.5 h-3.5" />
          Flip to {isFlipped ? "Front" : "QR Code"}
        </Button>
        <Button variant="glass" size="sm" className="gap-1.5 text-xs text-white">
          <Download className="w-3.5 h-3.5" />
          Save Vector Card (PDF)
        </Button>
      </div>
    </div>
  );
}
