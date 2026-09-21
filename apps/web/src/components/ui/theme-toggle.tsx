"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";

interface ThemeToggleProps {
  variant?: "icon" | "pill" | "badge";
  className?: string;
}

export function ThemeToggle({ variant = "pill", className = "" }: ThemeToggleProps) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`inline-flex items-center justify-center w-9 h-9 rounded-full border border-border bg-card opacity-50 ${className}`}
        aria-hidden="true"
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className={`relative inline-flex items-center justify-center w-9 h-9 rounded-full border border-border bg-card hover:bg-muted text-foreground transition-all duration-200 shadow-sm ${className}`}
        title={`Switch to ${isDark ? "Light" : "Dark"} Mode`}
        aria-label={`Switch to ${isDark ? "Light" : "Dark"} Mode`}
      >
        <Sun
          className={`w-4 h-4 text-amber-500 transition-all duration-300 ${
            isDark ? "rotate-90 scale-0 opacity-0 absolute" : "rotate-0 scale-100 opacity-100"
          }`}
        />
        <Moon
          className={`w-4 h-4 text-sky-400 transition-all duration-300 ${
            isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0 absolute"
          }`}
        />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card/80 hover:bg-card text-xs font-semibold text-foreground transition-all duration-200 shadow-sm hover:shadow-md hover:border-primary/50 group ${className}`}
      title={`Switch to ${isDark ? "Light" : "Dark"} Mode (100% High-Visibility Mode)`}
      aria-label={`Switch to ${isDark ? "Light" : "Dark"} Mode`}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        <Sun
          className={`w-4 h-4 text-amber-500 transition-all duration-300 ${
            isDark ? "rotate-90 scale-0 opacity-0 absolute" : "rotate-0 scale-100 opacity-100"
          }`}
        />
        <Moon
          className={`w-4 h-4 text-sky-400 transition-all duration-300 ${
            isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0 absolute"
          }`}
        />
      </div>
      <span className="capitalize text-slate-700 dark:text-slate-200">
        {isDark ? "Dark" : "Light"}
      </span>
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
    </button>
  );
}
