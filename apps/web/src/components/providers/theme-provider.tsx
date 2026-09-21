"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { soundEffects } from "@/lib/audio-effects";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setBrandColors: (colors: { primaryHsl?: string; accentHsl?: string }) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "rsm-ui-theme",
}: {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(storageKey) as Theme | null;
    if (stored) {
      setThemeState(stored);
    } else {
      // Default to light for optimal daytime contrast or system
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setThemeState(prefersDark ? "dark" : "light");
    }

    // Load any custom live brand tokens saved in localStorage
    const savedColors = localStorage.getItem("rsm-brand-tokens");
    if (savedColors) {
      try {
        const { primaryHsl, accentHsl } = JSON.parse(savedColors);
        if (primaryHsl) document.documentElement.style.setProperty("--primary", primaryHsl);
        if (accentHsl) document.documentElement.style.setProperty("--accent", accentHsl);
      } catch {}
    }
  }, [storageKey]);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    let actualTheme: "light" | "dark" = "light";

    if (theme === "system") {
      actualTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    } else {
      actualTheme = theme;
    }

    root.classList.remove("light", "dark");
    root.classList.add(actualTheme);
    setResolvedTheme(actualTheme);
    localStorage.setItem(storageKey, theme);
  }, [theme, mounted, storageKey]);

  const setTheme = (newTheme: Theme) => {
    soundEffects.playClick(newTheme === "dark" ? 440 : 700);
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    const next = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(next);
  };

  const setBrandColors = ({ primaryHsl, accentHsl }: { primaryHsl?: string; accentHsl?: string }) => {
    const root = document.documentElement;
    if (primaryHsl) {
      root.style.setProperty("--primary", primaryHsl);
    }
    if (accentHsl) {
      root.style.setProperty("--accent", accentHsl);
    }
    soundEffects.playClick(880);
    if (typeof window !== "undefined") {
      localStorage.setItem("rsm-brand-tokens", JSON.stringify({ primaryHsl, accentHsl }));
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        resolvedTheme,
        setTheme,
        toggleTheme,
        setBrandColors,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
