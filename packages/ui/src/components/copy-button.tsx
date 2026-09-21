"use client";

import * as React from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "../lib/utils";
import { useToast } from "./toast";

export interface CopyButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  label?: string;
  toastMessage?: string;
  copiedDuration?: number;
}

export function CopyButton({
  text,
  label,
  toastMessage = "Copied to clipboard",
  copiedDuration = 2000,
  className,
  ...props
}: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false);
  const { success } = useToast();

  const handleCopy = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (typeof window !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(text);
      }
      setCopied(true);
      success(toastMessage);
      setTimeout(() => setCopied(false), copiedDuration);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), copiedDuration);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={label ?? "Copy to clipboard"}
      title={label ?? "Copy to clipboard"}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded-lg transition-all duration-150 select-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/70 focus-visible:ring-offset-1 focus-visible:ring-offset-slate-950",
        copied
          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm shadow-emerald-500/10"
          : "bg-white/5 hover:bg-white/10 text-slate-400 hover:text-slate-200 border border-white/10 active:scale-95",
        className
      )}
      {...props}
    >
      {copied ? (
        <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 animate-in zoom-in-50 duration-150" />
      ) : (
        <Copy className="w-3.5 h-3.5 flex-shrink-0 transition-transform duration-150 group-hover:scale-110" />
      )}
      {label && (
        <span className={copied ? "text-emerald-300 font-semibold" : ""}>
          {copied ? "Copied!" : label}
        </span>
      )}
    </button>
  );
}
