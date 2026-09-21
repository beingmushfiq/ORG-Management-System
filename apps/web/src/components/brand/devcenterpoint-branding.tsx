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
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card border border-border text-xs text-muted-foreground hover:text-foreground hover:border-amber-500/50 transition-all shadow-md group ${className}`}
        title="Visit DevCenterPoint — Enterprise Digital Solutions"
      >
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
        <span className="font-semibold text-foreground">
          Engineered by <span className="text-amber-500 group-hover:underline">DevCenterPoint</span>
        </span>
        <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-amber-500 transition-colors" />
      </a>
    );
  }

  if (variant === "subtle") {
    return (
      <div className={`text-xs text-muted-foreground flex items-center gap-1.5 ${className}`}>
        <span>Architected by</span>
        <a
          href="https://devcenterpoint.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-foreground hover:text-amber-500 transition-colors underline decoration-border underline-offset-2"
        >
          DevCenterPoint
        </a>
      </div>
    );
  }

  return (
    <div
      className={`pt-8 mt-12 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground ${className}`}
    >
      <div className="flex items-center gap-2">
        <span>© {new Date().getFullYear()} Road Safety Movement (নিরাপদ সড়ক আন্দোলন) · All Rights Reserved.</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">Platform Architecture & Engineering by</span>
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
