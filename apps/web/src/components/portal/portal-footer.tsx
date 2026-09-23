"use client";

import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Download, CheckCircle2 } from "lucide-react";
import { usePwa } from "@/components/pwa/pwa-provider";

export function PortalFooter() {
  const { isInstalled, canInstall, promptInstall, isOnline } = usePwa();

  return (
    <footer className="w-full bg-[#0d3b25] text-emerald-50 mt-12 border-t border-emerald-800/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Column 1: Organization Identity */}
          <div className="space-y-3">
            <h3 className="font-serif font-bold text-lg text-white tracking-wide">
              Road Safety Movement (নিরাপদ সড়ক আন্দোলন)
            </h3>
            <p className="text-xs text-emerald-100/80 leading-relaxed font-bangla">
              একটি নিরাপদ, টেকসই ও মানবিক সড়ক যোগাযোগ ব্যবস্থা গড়ে তোলার লক্ষ্যে কাজ করে যাওয়া জাতীয় নাগরিক প্ল্যাটফর্ম। ২০১৮ সালের ঐতিহাসিক নিরাপদ সড়ক আন্দোলনের চেতনা বাস্তবায়নে নিবেদিত।
            </p>
            <div className="pt-2 text-[11px] font-mono text-emerald-300/80">
              Estd. 2018 · Registered Under Societies Registration Act XXI of 1860
            </div>
          </div>

          {/* Column 2: Useful Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wide uppercase font-mono border-b border-emerald-700/50 pb-1.5 inline-block">
              Useful Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/portal/command"
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <span className="text-amber-400 font-bold">›</span> Executive Committee (কেন্দ্রীয় কার্যনির্বাহী পরিষদ)
                </Link>
              </li>
              <li>
                <Link
                  href="/portal/branches"
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <span className="text-amber-400 font-bold">›</span> Central Committee & Directorate
                </Link>
              </li>
              <li>
                <Link
                  href="/portal/branches"
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <span className="text-amber-400 font-bold">›</span> Branch Committees (শাখা ও আঞ্চলিক কমিটি)
                </Link>
              </li>
              <li>
                <Link
                  href="/portal/notices"
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <span className="text-amber-400 font-bold">›</span> Member & Committee Policy (সদস্য ও সাংগঠনিক নীতিমালা)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Emergency Helpline */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wide uppercase font-mono border-b border-emerald-700/50 pb-1.5 inline-block">
              Central Secretariat
            </h4>
            <div className="space-y-2 text-xs text-emerald-100/90">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <span>RSM National Headquarters, Level 4, Farmgate, Dhaka-1215, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-amber-400 shrink-0" />
                <span className="font-mono font-semibold">Emergency Helpline: 01521 336 207</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-amber-400 shrink-0" />
                <span>secretariat@roadsafetymovement.org</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="pt-2 flex items-center gap-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-emerald-600 bg-emerald-800/60 hover:bg-amber-500 hover:text-slate-900 transition-all flex items-center justify-center text-xs font-bold"
                title="Facebook"
              >
                f
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-emerald-600 bg-emerald-800/60 hover:bg-amber-500 hover:text-slate-900 transition-all flex items-center justify-center text-xs font-bold"
                title="Twitter"
              >
                𝕏
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-emerald-600 bg-emerald-800/60 hover:bg-amber-500 hover:text-slate-900 transition-all flex items-center justify-center text-xs font-bold"
                title="YouTube"
              >
                ▶
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-emerald-600 bg-emerald-800/60 hover:bg-amber-500 hover:text-slate-900 transition-all flex items-center justify-center text-xs font-bold"
                title="Instagram"
              >
                📷
              </a>
            </div>
          </div>
        </div>

        {/* Dynamic PWA Status & Copyright Bar */}
        <div className="mt-8 pt-6 border-t border-emerald-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-emerald-200/80">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-700/50">
              <span className={`w-2 h-2 rounded-full ${isOnline ? "bg-emerald-400 animate-pulse" : "bg-amber-400"}`} />
              <span>{isOnline ? "PWA Online & Synced" : "PWA Offline Mode"}</span>
            </span>
            {isInstalled ? (
              <span className="flex items-center gap-1 text-emerald-300">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Installed App</span>
              </span>
            ) : canInstall ? (
              <button
                type="button"
                onClick={promptInstall}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-all cursor-pointer shadow-sm"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Install Road Safety App</span>
              </button>
            ) : null}
          </div>

          <div className="text-center sm:text-right">
            © 2026 Road Safety Movement (নিরাপদ সড়ক আন্দোলন). All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
