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
    title: "64-District Branch & Hospital Atlas",
    titleBn: "সারাদেশের ৬৪ জেলা শাখা ও হাসপাতাল মানচিত্র",
    category: "Navigation",
    href: "/#atlas",
    icon: Building,
    badge: "Interactive",
  },
  {
    id: "concierge",
    title: "Fast-Track Member Concierge Desk",
    titleBn: "দ্রুত সেবা কেন্দ্র ও সনদপত্র",
    category: "Concierge",
    href: "/portal/concierge",
    icon: ShieldCheck,
    badge: "1-Click",
  },
  {
    id: "tax-rebate",
    title: "Section 44 Income Tax Rebate Certificate",
    titleBn: "আয়কর রেয়াত ও অনুদান প্রত্যয়ন",
    category: "Concierge",
    href: "/portal/concierge",
    icon: CreditCard,
  },
  {
    id: "resolutions",
    title: "Meeting Minutes & Statutory Resolution Compiler",
    titleBn: "সভার কার্যবিবরণী ও রেজোলিউশন প্রণয়ন",
    category: "Governance",
    href: "/portal/command/resolutions",
    icon: FileText,
    badge: "Quorum",
  },
  {
    id: "command",
    title: "Executive Command War Room",
    titleBn: "নির্বাহী কমান্ড সেন্টার ও টেলিমেট্রি",
    category: "Governance",
    href: "/portal/command",
    icon: Vote,
  },
  {
    id: "journal",
    title: "Peer-Reviewed Medical Journal Archive",
    titleBn: "মেডিকেল জার্নাল ও গবেষণা প্রকাশনা",
    category: "Academic",
    href: "/journal",
    icon: BookOpen,
    badge: "ISSN 0301-4975",
  },
  {
    id: "memorial",
    title: "Memorial Hall of Eternal Respect",
    titleBn: "স্মৃতি চিরন্তন - শোক ও শ্রদ্ধাঞ্জলি",
    category: "Academic",
    href: "/memorial",
    icon: Heart,
  },
  {
    id: "blood-bank",
    title: "Physician Emergency Blood Radar",
    titleBn: "জরুরি রক্তদান ও চিকিৎসক নেটওয়ার্ক",
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
    title: "Official Gazettes & Circulars",
    titleBn: "অফিসিয়াল গেজেট ও সার্কুলার",
    category: "Navigation",
    href: "/notices",
    icon: FileText,
  },
  {
    id: "events",
    title: "Conferences & Academic Congresses",
    titleBn: "সম্মেলন ও অ্যাকাডেমিক কংগ্রেস",
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
        className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-slate-400 hover:text-white hover:border-amber-400/40 transition-all shadow-sm group"
        title="Quick Navigator (Ctrl+K or ⌘K)"
      >
        <Search className="w-3.5 h-3.5 text-amber-400/80 group-hover:scale-110 transition-transform" />
        <span className="font-medium">Quick Jump...</span>
        <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-white/10 text-[10px] font-mono text-slate-400 group-hover:text-amber-300">
          ⌘K
        </kbd>
      </button>

      {/* Spotlight Modal Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-[10000] bg-slate-950/80 backdrop-blur-md flex items-start justify-center pt-20 px-4">
          <div
            className="w-full max-w-xl rounded-2xl bg-slate-900 border border-amber-500/30 shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
              <Search className="w-5 h-5 text-amber-400 shrink-0" />
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
                className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-400 hover:text-white border border-white/5"
              >
                ESC
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-80 overflow-y-auto p-2 space-y-1">
              {filteredItems.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-400 space-y-1">
                  <div>No institutional modules found for &ldquo;{query}&rdquo;</div>
                  <div className="text-[11px] text-slate-500">Try searching for &quot;Concierge&quot;, &quot;Atlas&quot;, &quot;Journal&quot;, or &quot;Tax&quot;</div>
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
                          ? "bg-amber-500/15 border border-amber-500/30 text-white"
                          : "text-slate-300 hover:bg-slate-800/60"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                            isSelected
                              ? "bg-amber-500 text-slate-950 font-bold"
                              : "bg-slate-800 text-slate-400"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>

                        <div className="min-w-0">
                          <div className="text-xs font-bold truncate flex items-center gap-2">
                            <span>{item.title}</span>
                            {item.badge && (
                              <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-white/10 text-amber-300">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-slate-400 font-bangla truncate">
                            {item.titleBn}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] text-slate-500 uppercase font-mono">
                          {item.category}
                        </span>
                        {isSelected && <ArrowRight className="w-3.5 h-3.5 text-amber-400" />}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Hints */}
            <div className="px-4 py-2.5 border-t border-white/5 bg-slate-950/60 text-[11px] text-slate-400 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span>Navigate: <kbd className="px-1 rounded bg-slate-800 text-slate-300">↑</kbd> <kbd className="px-1 rounded bg-slate-800 text-slate-300">↓</kbd></span>
                <span>Select: <kbd className="px-1 rounded bg-slate-800 text-slate-300">↵</kbd></span>
              </div>
              <div className="flex items-center gap-1.5 text-amber-400 font-medium">
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
