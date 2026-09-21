import React from "react";
import { ExternalLink, Sparkles } from "lucide-react";

interface DevCenterPointBrandingProps {
  variant?: "subtle" | "badge" | "footer";
  className?: string;
}

export function DevCenterPointBranding({
  variant = "footer",
  className = "",
}: DevCenterPointBrandingProps) {
  if (variant === "badge") {
    return (
      <a
        href="https://devcenterpoint.com"
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-amber-500/30 text-xs text-slate-300 hover:text-white hover:border-amber-400 transition-all shadow-md group ${className}`}
        title="Visit DevCenterPoint — Enterprise Digital Solutions"
      >
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
        <span className="font-semibold text-slate-200">
          Engineered by <span className="text-amber-400 group-hover:underline">DevCenterPoint</span>
        </span>
        <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-amber-300 transition-colors" />
      </a>
    );
  }

  if (variant === "subtle") {
    return (
      <div className={`text-xs text-slate-500 flex items-center gap-1.5 ${className}`}>
        <span>Architected by</span>
        <a
          href="https://devcenterpoint.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-slate-400 hover:text-amber-400 transition-colors underline decoration-slate-700 underline-offset-2"
        >
          DevCenterPoint
        </a>
      </div>
    );
  }

  return (
    <div
      className={`pt-8 mt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 ${className}`}
    >
      <div className="flex items-center gap-2">
        <span>© {new Date().getFullYear()} Bangladesh Medical Association · All Rights Reserved.</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-slate-500">Platform Architecture & Engineering by</span>
        <a
          href="https://devcenterpoint.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-semibold text-amber-400 hover:text-amber-300 transition-colors group"
        >
          <Sparkles className="w-3 h-3 text-amber-400/80 group-hover:scale-110 transition-transform" />
          <span>DevCenterPoint</span>
          <span className="text-[10px] text-slate-500 font-mono">(devcenterpoint.com)</span>
          <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-amber-300" />
        </a>
      </div>
    </div>
  );
}
