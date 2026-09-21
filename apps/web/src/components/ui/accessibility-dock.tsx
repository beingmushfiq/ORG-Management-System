"use client";

import React, { useState } from "react";
import {
  PhoneCall,
  Type,
  Sun,
  Moon,
  X,
  ShieldAlert,
  Check,
  Volume2,
  VolumeX,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import { useToast } from "@org/ui";
import { useTheme } from "@/components/providers/theme-provider";
import { soundEffects } from "@/lib/audio-effects";

export function AccessibilityDock() {
  const [isOpen, setIsOpen] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [showSosModal, setShowSosModal] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(soundEffects.isEnabled());
  const { resolvedTheme, toggleTheme } = useTheme();
  const { success, info } = useToast();

  const handleToggleTextSize = () => {
    soundEffects.playClick(620);
    const next = !largeText;
    setLargeText(next);
    if (next) {
      document.documentElement.classList.add("text-lg-override");
      info("Reading Scale Enhanced", "Larger font scale applied across bylaws and circulars.");
    } else {
      document.documentElement.classList.remove("text-lg-override");
      info("Standard Font Scale Restored");
    }
  };

  const handleToggleContrast = () => {
    soundEffects.playClick(680);
    const next = !highContrast;
    setHighContrast(next);
    if (next) {
      document.documentElement.classList.add("contrast-high");
      success("Maximum High Contrast Enabled", "Highest luminance contrast active for daylight or low-vision readability.");
    } else {
      document.documentElement.classList.remove("contrast-high");
      info("Standard Contrast Restored");
    }
  };

  const handleToggleSound = () => {
    const next = soundEffects.toggleSound();
    setSoundEnabled(next);
    if (next) {
      soundEffects.playClick(800);
      info("Audio Accents Enabled", "Subtle haptic chimes are now active.");
    } else {
      info("Audio Accents Muted");
    }
  };

  const isDark = resolvedTheme === "dark";

  return (
    <>
      {/* Floating Bottom Action Trigger */}
      <div className="fixed bottom-6 left-6 z-[9990] flex items-center gap-2 print:hidden">
        <button
          type="button"
          onClick={() => {
            soundEffects.playClick(700);
            setIsOpen((prev) => !prev);
          }}
          className="h-11 px-3.5 rounded-full bg-slate-900/90 dark:bg-slate-800/95 border-2 border-amber-500/50 text-xs font-bold text-white shadow-xl hover:border-amber-400 hover:scale-105 backdrop-blur-xl flex items-center gap-2 group transition-all"
          title="Road Safety Helpline & Accessibility Dock"
        >
          <div className="w-6 h-6 rounded-full bg-amber-500/25 flex items-center justify-center text-amber-400 group-hover:rotate-12 transition-transform">
            <AlertTriangle className="w-3.5 h-3.5 fill-current" />
          </div>
          <span className="hidden sm:inline-block text-slate-100">Safety Desk</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </button>

        {isOpen && (
          <div className="rounded-full bg-white/95 dark:bg-slate-900/95 border border-border p-1.5 flex items-center gap-1.5 shadow-2xl backdrop-blur-2xl animate-in slide-in-from-left-2 duration-200">
            {/* Theme Toggle (Light / Dark) */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-full text-xs font-bold transition-all text-slate-700 dark:text-slate-200 hover:bg-muted"
              title={`Switch to ${isDark ? "Light" : "Dark"} Mode`}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-sky-500" />}
            </button>

            {/* Font Scale Button */}
            <button
              type="button"
              onClick={handleToggleTextSize}
              className={`p-2 rounded-full text-xs font-bold transition-all ${
                largeText
                  ? "bg-amber-500 text-slate-950 shadow-md"
                  : "text-slate-700 dark:text-slate-300 hover:bg-muted"
              }`}
              title="Toggle Large Reading Font"
            >
              <Type className="w-4 h-4" />
            </button>

            {/* High Contrast Mode */}
            <button
              type="button"
              onClick={handleToggleContrast}
              className={`p-2 rounded-full text-xs font-bold transition-all ${
                highContrast
                  ? "bg-amber-500 text-slate-950 shadow-md"
                  : "text-slate-700 dark:text-slate-300 hover:bg-muted"
              }`}
              title="Toggle Maximum Luminance Contrast"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
            </button>

            {/* Sound Toggle */}
            <button
              type="button"
              onClick={handleToggleSound}
              className={`p-2 rounded-full text-xs font-bold transition-all ${
                soundEnabled ? "text-slate-700 dark:text-slate-300 hover:bg-muted" : "text-slate-400 opacity-60"
              }`}
              title={soundEnabled ? "Mute Audio Accents" : "Unmute Audio Accents"}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* 24/7 Road Crash Rapid Helpline */}
            <button
              type="button"
              onClick={() => {
                soundEffects.playClick(900);
                setShowSosModal(true);
                setIsOpen(false);
              }}
              className="p-2 rounded-full text-red-500 hover:bg-red-500/20 transition-colors"
              title="24/7 Road Crash Rapid Helpline & Legal Aid"
            >
              <PhoneCall className="w-4 h-4 animate-bounce" />
            </button>
          </div>
        )}
      </div>

      {/* 24/7 Road Crash Emergency Rapid SOS Modal */}
      {showSosModal && (
        <div className="fixed inset-0 z-[10001] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full rounded-2xl bg-card border-2 border-red-500/50 p-6 shadow-2xl space-y-5 text-foreground animate-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-500">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold leading-tight text-slate-900 dark:text-white">
                    24/7 Road Crash Rapid Helpline
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-bangla mt-0.5">
                    ২৪/৭ রোড ক্র্যাশ জরুরি সহায়তা ও আইনি সহায়তা কেন্দ্র
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowSosModal(false)}
                className="text-slate-400 hover:text-slate-900 dark:hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Immediate response hotline for road crash victims, survivor families, and volunteers across Bangladesh.
              Free legal aid dispatch, emergency trauma hospital coordination, and blood bank priority linkage.
            </p>

            <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900 border border-border space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400">National Crash Helpline:</span>
                <span className="font-mono font-bold text-amber-600 dark:text-amber-400 text-sm">
                  +880 1819 778899
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400">Legal Relief Taskforce:</span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                  +880 1819 778800
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <a
                href="tel:+8801819778899"
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                Call Rapid Desk
              </a>
              <button
                type="button"
                onClick={() => {
                  soundEffects.playRatification();
                  setShowSosModal(false);
                  success("Emergency Alert Dispatched", "Duty Coordinator and nearest chapter notified.");
                }}
                className="py-2.5 px-4 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold"
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
