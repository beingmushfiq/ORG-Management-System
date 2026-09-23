"use client";

import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export function PortalFooter() {
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

          {/* Column 3: Contact Us */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wide uppercase font-mono border-b border-emerald-700/50 pb-1.5 inline-block">
              Contact Us
            </h4>
            <div className="space-y-2.5 text-xs text-emerald-100/90">
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-amber-400 shrink-0" />
                <span className="font-mono font-medium">01521 336 207</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-amber-400 shrink-0" />
                <a
                  href="mailto:roadsafetymovementbd@gmail.com"
                  className="hover:underline hover:text-white"
                >
                  roadsafetymovementbd@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-snug">
                  Commissioner market (2nd floor), Farmgate, Dhaka, Bangladesh
                </span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-2">
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

        {/* Copyright Bar */}
        <div className="mt-8 pt-6 border-t border-emerald-800/60 text-center text-xs text-emerald-200/70 font-mono">
          © 2026 Road Safety Movement (নিরাপদ সড়ক আন্দোলন). All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
