"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Building,
  FileText,
  ShieldCheck,
  Heart,
  Vote,
  Sparkles,
  ArrowRight,
  BookOpen,
  Award,
  CreditCard,
  X,
} from "lucide-react";

interface CommandItem {
  id: string;
  title: string;
  titleBn: string;
  category: "Navigation" | "Concierge" | "Governance" | "Welfare" | "Academic";
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const COMMAND_ITEMS: CommandItem[] = [
  {
    id: "atlas",
    title: "64-District Chapter Atlas & Highway Radar",
    titleBn: "সারাদেশের ৬৪ জেলা শাখা ও হাইওয়ে সেফটি রেডার",
    category: "Navigation",
    href: "/#atlas",
    icon: Building,
    badge: "Interactive",
  },
  {
    id: "apply",
    title: "Apply for Digital Volunteer Pass",
    titleBn: "স্বেচ্ছাসেবী নিবন্ধন ও ডিজিটাল পরিচয়পত্র আবেদন",
    category: "Concierge",
    href: "/apply",
    icon: ShieldCheck,
    badge: "Join Now",
  },
  {
    id: "concierge",
    title: "Rapid Crash Legal Aid & Member Concierge Desk",
    titleBn: "সড়ক দুর্ঘটনা আইনি সহায়তা ও দ্রুত সেবা কেন্দ্র",
    category: "Concierge",
    href: "/portal/concierge",
    icon: ShieldCheck,
    badge: "1-Click",
  },
  {
    id: "tax-rebate",
    title: "Section 44 Income Tax Rebate & Donor Certificate",
    titleBn: "আয়কর রেয়াত ও অনুদান প্রত্যয়নপত্র",
    category: "Concierge",
    href: "/portal/concierge",
    icon: CreditCard,
  },
  {
    id: "resolutions",
    title: "National Council Resolutions & Meeting Minutes",
    titleBn: "জাতীয় নির্বাহী পরিষদ রেজোলিউশন ও কার্যবিবরণী",
    category: "Governance",
    href: "/portal/command/resolutions",
    icon: FileText,
    badge: "Quorum",
  },
  {
    id: "command",
    title: "Executive Command War Room & Telemetry",
    titleBn: "জাতীয় কমান্ড সেন্টার ও লাইভ টেলিমেট্রি",
    category: "Governance",
    href: "/portal/command",
    icon: Vote,
  },
  {
    id: "journal",
    title: "Road Safety & Crash Investigation Journal",
    titleBn: "সড়ক দুর্ঘটনা ও পরিবহন নিরাপত্তা গবেষণা জার্নাল",
    category: "Academic",
    href: "/journal",
    icon: BookOpen,
    badge: "Research",
  },
  {
    id: "memorial",
    title: "Road Crash Victims Memorial of Eternal Respect",
    titleBn: "সড়ক দুর্ঘটনায় শহীদ ও নিহতদের স্মৃতি চিরন্তন",
    category: "Academic",
    href: "/memorial",
    icon: Heart,
  },
  {
    id: "blood-bank",
    title: "Rapid Trauma Blood Donor Network",
    titleBn: "জরুরি রক্তদান ও ট্রমা রেসকিউ নেটওয়ার্ক",
    category: "Welfare",
    href: "/portal/blood-bank",
    icon: Heart,
    badge: "24/7 SOS",
  },
  {
    id: "reports",
    title: "Societies Registration Act 1860 Registers",
    titleBn: "১৮৬০ সালের সমিতি আইনের সরকারি রেজিস্টার",
    category: "Governance",
    href: "/portal/reports",
    icon: Award,
  },
  {
    id: "notices",
    title: "Official Gazettes, Circulars & Press Releases",
    titleBn: "অফিসিয়াল গেজেট, প্রেস বিজ্ঞপ্তি ও সার্কুলার",
    category: "Navigation",
    href: "/notices",
    icon: FileText,
  },
  {
    id: "events",
    title: "National Road Safety Conventions & Campaigns",
    titleBn: "জাতীয় সড়ক নিরাপত্তা সম্মেলন ও মাঠপর্যায়ের ক্যাম্পেইন",
    category: "Academic",
    href: "/events",
    icon: Award,
  },
];

export function CommandPalette() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut listener (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Focus search input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const filteredItems = COMMAND_ITEMS.filter((item) => {
    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.titleBn.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  });

  const handleSelect = (item: CommandItem) => {
    setIsOpen(false);
    router.push(item.href);
  };

  // Keyboard navigation within results
  const handleNavKeys = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
    } else if (e.key === "Enter" && filteredItems[selectedIndex]) {
      e.preventDefault();
      handleSelect(filteredItems[selectedIndex]);
    }
  };

  return (
    <>
      {/* Floating Trigger Pill in Navigation */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-muted/70 hover:bg-muted border border-border text-xs text-muted-foreground hover:text-foreground hover:border-amber-500/40 transition-all shadow-sm group"
        title="Quick Navigator (Ctrl+K or ⌘K)"
      >
        <Search className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 group-hover:scale-110 transition-transform" />
        <span className="font-medium">Quick Jump...</span>
        <kbd className="px-1.5 py-0.5 rounded bg-background border border-border text-[10px] font-mono text-muted-foreground group-hover:text-amber-600 dark:group-hover:text-amber-300">
          ⌘K
        </kbd>
      </button>

      {/* Spotlight Modal Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-[10000] bg-slate-950/70 dark:bg-slate-950/85 backdrop-blur-md flex items-start justify-center pt-20 px-4">
          <div
            className="w-full max-w-xl rounded-2xl bg-card border-2 border-amber-500/40 shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200 text-card-foreground"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-card">
              <Search className="w-5 h-5 text-amber-500 dark:text-amber-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleNavKeys}
                placeholder="Type a command, district, service, or register..."
                className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              >
              </input>
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground hover:text-foreground border border-border"
              >
                ESC
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-80 overflow-y-auto p-2 space-y-1 bg-card">
              {filteredItems.length === 0 ? (
                <div className="p-8 text-center text-xs text-muted-foreground space-y-1">
                  <div>No institutional modules found for &ldquo;{query}&rdquo;</div>
                  <div className="text-[11px] text-muted-foreground/80">Try searching for &quot;Volunteer&quot;, &quot;Atlas&quot;, &quot;Legal&quot;, or &quot;Tax&quot;</div>
                </div>
              ) : (
                filteredItems.map((item, index) => {
                  const isSelected = index === selectedIndex;
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-amber-500/15 border border-amber-500/40 text-foreground"
                          : "text-foreground/80 hover:bg-muted/70"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                            isSelected
                              ? "bg-amber-500 text-slate-950 font-bold"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>

                        <div className="min-w-0">
                          <div className="text-xs font-bold truncate flex items-center gap-2">
                            <span>{item.title}</span>
                            {item.badge && (
                              <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-muted-foreground font-bangla truncate">
                            {item.titleBn}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] text-muted-foreground uppercase font-mono">
                          {item.category}
                        </span>
                        {isSelected && <ArrowRight className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Hints */}
            <div className="px-4 py-2.5 border-t border-border bg-muted/40 text-[11px] text-muted-foreground flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span>Navigate: <kbd className="px-1 rounded bg-background border border-border text-foreground">↑</kbd> <kbd className="px-1 rounded bg-background border border-border text-foreground">↓</kbd></span>
                <span>Select: <kbd className="px-1 rounded bg-background border border-border text-foreground">↵</kbd></span>
              </div>
              <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-medium">
                <Sparkles className="w-3 h-3" />
                <span>Instant Institutional Search</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
