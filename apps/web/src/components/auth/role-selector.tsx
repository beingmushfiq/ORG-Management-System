"use client";

import React, { useState } from "react";
import { Shield, ChevronDown, Check, Building } from "lucide-react";

export interface PositionItem {
  id: string;
  title: string;
  titleBn: string;
  branchName: string;
  isCentral: boolean;
}

const SAMPLE_POSITIONS: PositionItem[] = [
  {
    id: "pos-1",
    title: "President",
    titleBn: "সভাপতি",
    branchName: "Central Executive Secretariat",
    isCentral: true,
  },
  {
    id: "pos-2",
    title: "Branch President",
    titleBn: "শাখা সভাপতি",
    branchName: "Chattogram Division Secretariat",
    isCentral: false,
  },
  {
    id: "pos-3",
    title: "Convener",
    titleBn: "আহ্বায়ক",
    branchName: "Scientific & CME Committee",
    isCentral: true,
  },
];

export function ActiveRoleSelector() {
  const [positions] = useState<PositionItem[]>(SAMPLE_POSITIONS);
  const [activeId, setActiveId] = useState<string>("pos-1");
  const [isOpen, setIsOpen] = useState(false);

  const activePosition = positions.find((p) => p.id === activeId) ?? positions[0]!;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-xs text-amber-200 transition-all font-mono"
      >
        <Shield className="w-3.5 h-3.5 text-amber-400" />
        <div className="text-left">
          <div className="font-semibold text-white leading-none flex items-center gap-1">
            {activePosition.title} ({activePosition.titleBn})
          </div>
          <div className="text-[10px] text-amber-400/80 leading-none mt-0.5">
            {activePosition.branchName}
          </div>
        </div>
        <ChevronDown className="w-3 h-3 text-amber-400/70 ml-1" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-72 rounded-2xl border border-slate-800 bg-slate-900/95 p-2 shadow-2xl backdrop-blur-xl z-50 space-y-1 font-sans text-xs">
            <div className="px-3 py-2 text-[10px] uppercase font-mono tracking-wider text-slate-400 border-b border-slate-800">
              Switch Operational Role
            </div>

            {positions.map((pos) => {
              const isSelected = pos.id === activeId;
              return (
                <button
                  key={pos.id}
                  onClick={() => {
                    setActiveId(pos.id);
                    setIsOpen(false);
                  }}
                  className={`w-full p-2.5 rounded-xl text-left transition-all flex items-start justify-between ${
                    isSelected
                      ? "bg-amber-500/20 text-white font-medium border border-amber-500/30"
                      : "text-slate-300 hover:bg-slate-800/60"
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="font-semibold text-white flex items-center gap-1.5">
                      {pos.title}
                      <span className="text-[11px] text-slate-400 font-bangla">({pos.titleBn})</span>
                    </div>
                    <div className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Building className="w-3 h-3 text-slate-500" /> {pos.branchName}
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export { ActiveRoleSelector as RoleSelector };
