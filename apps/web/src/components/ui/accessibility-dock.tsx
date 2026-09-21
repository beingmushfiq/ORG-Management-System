"use client";

import React, { useState } from "react";
import {
  PhoneCall,
  Type,
  Sun,
  X,
  ShieldAlert,
  Check,
} from "lucide-react";
import { useToast } from "@org/ui";

export function AccessibilityDock() {
  const [isOpen, setIsOpen] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [showSosModal, setShowSosModal] = useState(false);
  const { success, info } = useToast();

  const toggleTextSize = () => {
    const next = !largeText;
    setLargeText(next);
    if (next) {
      document.documentElement.classList.add("text-lg-override");
      info("Senior Physician Reading Mode Enabled", "Larger font scale applied across bylaws and circulars.");
    } else {
      document.documentElement.classList.remove("text-lg-override");
      info("Standard Font Scale Restored");
    }
  };

  const toggleContrast = () => {
    const next = !highContrast;
    setHighContrast(next);
    if (next) {
      document.documentElement.classList.add("contrast-high");
      success("High Contrast Mode Enabled", "Maximum luminance contrast applied for clinical environments.");
    } else {
      document.documentElement.classList.remove("contrast-high");
      info("Standard Contrast Restored");
    }
  };

  return (
    <>
      {/* Floating Bottom Action Trigger */}
      <div className="fixed bottom-6 left-6 z-[9990] flex items-center gap-2 print:hidden">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="h-11 px-3.5 rounded-full bg-slate-900/90 border border-amber-500/40 text-xs font-semibold text-white shadow-xl hover:border-amber-400 hover:bg-slate-850 backdrop-blur-xl flex items-center gap-2 group transition-all"
          title="Physician Assistance & Accessibility Dock"
        >
          <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
            ⚕
          </div>
          <span className="hidden sm:inline-block text-slate-200">Doctor Desk</span>
        </button>

        {isOpen && (
          <div className="rounded-full bg-slate-900/95 border border-white/15 p-1 flex items-center gap-1 shadow-2xl backdrop-blur-2xl animate-in slide-in-from-left-2 duration-200">
            {/* Font Scale Button */}
            <button
              type="button"
              onClick={toggleTextSize}
              className={`p-2 rounded-full text-xs font-bold transition-all ${
                largeText
                  ? "bg-amber-500 text-slate-950 shadow-md"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
              title="Toggle Larger Text"
            >
              <Type className="w-4 h-4" />
            </button>

            {/* High Contrast Mode */}
            <button
              type="button"
              onClick={toggleContrast}
              className={`p-2 rounded-full text-xs font-bold transition-all ${
                highContrast
                  ? "bg-amber-500 text-slate-950 shadow-md"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
              title="Toggle Clinical High Contrast"
            >
              <Sun className="w-4 h-4" />
            </button>

            {/* 24/7 SOS Emergency Hotline */}
            <button
              type="button"
              onClick={() => {
                setShowSosModal(true);
                setIsOpen(false);
              }}
              className="p-2 rounded-full text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors"
              title="24/7 Physician Emergency Helpline"
            >
              <PhoneCall className="w-4 h-4 animate-bounce" />
            </button>
          </div>
        )}
      </div>

      {/* 24/7 Physician SOS Modal */}
      {showSosModal && (
        <div className="fixed inset-0 z-[10001] bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full rounded-2xl bg-slate-900 border border-red-500/40 p-6 shadow-2xl space-y-5 text-white animate-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold leading-tight">
                    24/7 Doctor Emergency Hotline
                  </h3>
                  <p className="text-xs text-slate-400 font-bangla mt-0.5">
                    কেন্দ্রীয় চিকিৎসক সহায়তা ও জরুরি হেল্পলাইন
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowSosModal(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Dedicated emergency channel for registered physicians encountering workplace harassment,
              clinical emergencies, or urgent blood supply requirements across Chattogram Division.
            </p>

            <div className="p-4 rounded-xl bg-slate-950 border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Central Secretariat Desk:</span>
                <span className="font-mono font-bold text-amber-400">+880 1819 000111</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Welfare & Blood Taskforce:</span>
                <span className="font-mono font-bold text-emerald-400">+880 1819 000222</span>
              </div>
            </div>

            <div className="flex gap-3">
              <a
                href="tel:+8801819000111"
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                Call Central Desk
              </a>
              <button
                type="button"
                onClick={() => {
                  setShowSosModal(false);
                  success("Secretariat Alert Dispatched", "Duty Officer notified via priority SMS.");
                }}
                className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
              >
                <Check className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
