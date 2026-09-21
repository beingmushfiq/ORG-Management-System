"use client";

import React, { useState } from "react";
import {
  Palette,
  Layout,
  FileText,
  Calendar,
  Image as ImageIcon,
  Heart,
  Flower2,
  Building,
  Radio,
  Save,
  Plus,
  Trash2,
  Eye,
  ArrowLeft,
  ExternalLink,
  Smartphone,
  Monitor,
  Lock,
} from "lucide-react";
import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  useToast,
} from "@org/ui";
import Link from "next/link";
import { useTheme } from "@/components/providers/theme-provider";

export default function TenantCmsStudioPage() {
  const { success, info } = useToast();
  const { setBrandColors } = useTheme();
  const [activeTab, setActiveTab] = useState<"PORTFOLIO" | "OPERATIONS" | "PREVIEW">("PORTFOLIO");
  const [portfolioSection, setPortfolioSection] = useState<
    "HERO" | "BRAND" | "NOTICES" | "EVENTS" | "GALLERY" | "CAUSES" | "MEMORIAL"
  >("HERO");
  const [previewDevice, setPreviewDevice] = useState<"DESKTOP" | "MOBILE">("DESKTOP");
  const [isSaving, setIsSaving] = useState(false);

  // 1. Organization Identity State
  const [orgData, setOrgData] = useState({
    name: "Road Safety Movement",
    nameBn: "নিরাপদ সড়ক আন্দোলন",
    slug: "rsm-bd",
    customDomain: "roadsafetymovement.org",
    tagline: "Building a Safe, Sustainable, and Humane Road Transport System for All",
    taglineBn: "একটি নিরাপদ, টেকসই ও মানবিক সড়ক যোগাযোগ ব্যবস্থা গড়ে তোলার প্রত্যয়ে",
    motto: "Safe Roads, Humane Transit, Zero Crashes",
    mottoBn: "নিরাপদ সড়ক, মানবিক পরিবহন, শূন্য ক্র্যাশ",
    heroBgUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1600",
    primaryColorHsl: "38 92% 50%",
    accentColorHsl: "160 84% 39%",
    contactEmail: "contact@roadsafetymovement.org",
    contactPhone: "+880 1819 778899",
    headOfficeAddress: "Dhaka, Bangladesh",
  });

  // 2. Notices State
  const [notices, setNotices] = useState([
    {
      id: "not-1",
      title: "Notice of 74th Annual General Meeting (AGM) 2026 & Election Schedule",
      titleBn: "৭৪তম বার্ষিক সাধারণ সভা (এজিএম) ২০২৬ ও নির্বাচন সংক্রান্ত জরুরি বিজ্ঞপ্তি",
      memoNo: "MEMO-BMA-CTG-2026-089",
      category: "Administrative",
      isPinned: true,
      publishedAt: "2026-09-18",
    },
    {
      id: "not-2",
      title: "Continuing Medical Education (CME) on Dengue Shock Syndrome Management",
      titleBn: "ডেঙ্গু শক সিন্ড্রোম চিকিৎসা ব্যবস্থাপনা বিষয়ক বিশেষ সিএমই কর্মশালা",
      memoNo: "MEMO-BMA-CTG-2026-074",
      category: "Academic",
      isPinned: false,
      publishedAt: "2026-09-10",
    },
  ]);

  // 3. Events State
  const [events, setEvents] = useState([
    {
      id: "ev-1",
      title: "Chattogram Medical Congress & Scientific Summit 2026",
      titleBn: "চট্টগ্রাম মেডিকেল কংগ্রেস ও বিজ্ঞান সম্মেলন ২০২৬",
      date: "Nov 14-16, 2026",
      venue: "Radisson Blu Chattogram Bay View",
      cpdCredits: 12,
      feeBdt: 3500,
    },
    {
      id: "ev-2",
      title: "Symposium on Artificial Intelligence in Clinical Diagnostics",
      titleBn: "ক্লিনিক্যাল ডায়াগনস্টিক্সে কৃত্রিম বুদ্ধিমত্তা বিষয়ক জাতীয় সিম্পোজিয়াম",
      date: "Dec 05, 2026",
      venue: "BMA Auditorium, Chattogram",
      cpdCredits: 6,
      feeBdt: 1200,
    },
  ]);

  // 4. Memorial Hall State
  const [memorials, setMemorials] = useState([
    {
      id: "mem-1",
      name: "Prof. Dr. Nurul Islam",
      nameBn: "জাতীয় অধ্যাপক ডা. নুরুল ইসলাম",
      tenure: "1928 – 2013",
      title: "National Professor & Founder President",
      floralCount: 412,
    },
    {
      id: "mem-2",
      name: "Dr. Shah Alam Chowdhury",
      nameBn: "ডা. শাহ আলম চৌধুরী",
      tenure: "1935 – 2019",
      title: "Pioneer Surgeon & Former General Secretary",
      floralCount: 289,
    },
  ]);

  // 5. Branches State
  const [branches, setBranches] = useState([
    { id: "b-1", name: "Central Executive Council", level: "Root Secretariat", code: "ROOT", path: "1" },
    { id: "b-2", name: "Chattogram Medical College Unit", level: "Hospital Chapter", code: "CMC", path: "1/2" },
    { id: "b-3", name: "South Chattogram Upazila Council", level: "Regional Committee", code: "STH", path: "1/3" },
  ]);

  // Handle Save
  const handlePublish = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      success("Changes Published to Edge!", "Your organizational portfolio website and management rules are now live.");
    }, 900);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500/20 selection:text-amber-300">
      {/* CMS Studio Header */}
      <header className="border-b border-slate-800/80 bg-slate-900/70 backdrop-blur-2xl px-6 py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Link
            href="/portal"
            className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-mono tracking-wider uppercase"
          >
            <ArrowLeft className="w-4 h-4" /> Portal Hub
          </Link>
          <span className="text-slate-700 font-mono">|</span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-white tracking-wide">
                {orgData.name}
              </span>
              <Badge variant="gold" size="sm">
                CMS Studio
              </Badge>
            </div>
            <p className="text-xs text-slate-400 font-mono flex items-center gap-2 mt-0.5">
              <span>Subdomain: {orgData.slug}.orgms.app</span>
              <span>·</span>
              <span className="text-emerald-400">Custom Domain: {orgData.customDomain}</span>
            </p>
          </div>
        </div>

        {/* Top Control Actions */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center rounded-xl border border-slate-800 bg-slate-950/80 p-1">
            <button
              onClick={() => setActiveTab("PORTFOLIO")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all ${
                activeTab === "PORTFOLIO"
                  ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Layout className="w-3.5 h-3.5" />
              Website Studio
            </button>
            <button
              onClick={() => setActiveTab("OPERATIONS")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all ${
                activeTab === "OPERATIONS"
                  ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Building className="w-3.5 h-3.5" />
              Operations & Rules
            </button>
            <button
              onClick={() => setActiveTab("PREVIEW")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all ${
                activeTab === "PREVIEW"
                  ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              Live Preview
            </button>
          </div>

          <Link href="/" target="_blank">
            <Button size="sm" variant="glass" leftIcon={<ExternalLink className="w-3.5 h-3.5" />}>
              View Live Site
            </Button>
          </Link>

          <Button
            size="sm"
            variant="gold"
            shimmer
            loading={isSaving}
            loadingText="Syncing..."
            onClick={handlePublish}
            leftIcon={<Save className="w-3.5 h-3.5" />}
          >
            Publish to Edge
          </Button>
        </div>
      </header>

      {/* Main Studio Body */}
      <main className="max-w-7xl w-full mx-auto px-6 py-8">
        {/* TAB 1: VISUAL PORTFOLIO WEBSITE STUDIO */}
        {activeTab === "PORTFOLIO" && (
          <div className="space-y-6">
            {/* Section Selector Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
              {[
                { id: "HERO", label: "Hero & Identity", icon: Layout },
                { id: "BRAND", label: "Brand Colors & Theme", icon: Palette },
                { id: "NOTICES", label: "Gazette & Notices", icon: FileText },
                { id: "EVENTS", label: "Conferences & CME", icon: Calendar },
                { id: "GALLERY", label: "Media & Press", icon: ImageIcon },
                { id: "CAUSES", label: "Benevolence Causes", icon: Heart },
                { id: "MEMORIAL", label: "Memorial Hall", icon: Flower2 },
              ].map((sec) => {
                const Icon = sec.icon;
                const isCurrent = portfolioSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => setPortfolioSection(sec.id as any)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-mono flex items-center gap-2 whitespace-nowrap transition-all ${
                      isCurrent
                        ? "bg-slate-800 border border-amber-500/40 text-amber-400 font-bold shadow-lg"
                        : "border border-slate-800/60 bg-slate-900/40 text-slate-400 hover:text-white hover:border-slate-700"
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isCurrent ? "text-amber-400" : "text-slate-500"}`} />
                    {sec.label}
                  </button>
                );
              })}
            </div>

            {/* SECTION: HERO & IDENTITY */}
            {portfolioSection === "HERO" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-200">
                <div className="lg:col-span-2 space-y-4">
                  <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-xl">
                    <CardHeader>
                      <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                        <Layout className="w-4 h-4 text-amber-400" />
                        Institutional Hero & Headlines
                      </CardTitle>
                      <CardDescription className="text-xs text-slate-400">
                        This is the centerpiece of your public portfolio website. Keep it prestigious, bilingual, and memorable.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-mono uppercase text-slate-400">
                            Organization Name (English)
                          </label>
                          <input
                            type="text"
                            value={orgData.name}
                            onChange={(e) => setOrgData({ ...orgData, name: e.target.value })}
                            className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-mono uppercase text-slate-400">
                            Organization Name (বাংলা)
                          </label>
                          <input
                            type="text"
                            value={orgData.nameBn}
                            onChange={(e) => setOrgData({ ...orgData, nameBn: e.target.value })}
                            className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-bangla"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-mono uppercase text-slate-400">
                          Primary Tagline / Institutional Mission
                        </label>
                        <textarea
                          rows={2}
                          value={orgData.tagline}
                          onChange={(e) => setOrgData({ ...orgData, tagline: e.target.value })}
                          className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-mono uppercase text-slate-400">
                          Primary Tagline (বাংলা অনুবাদ)
                        </label>
                        <textarea
                          rows={2}
                          value={orgData.taglineBn}
                          onChange={(e) => setOrgData({ ...orgData, taglineBn: e.target.value })}
                          className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-bangla"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-mono uppercase text-slate-400">
                            Motto / Latin Seal
                          </label>
                          <input
                            type="text"
                            value={orgData.motto}
                            onChange={(e) => setOrgData({ ...orgData, motto: e.target.value })}
                            className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-mono uppercase text-slate-400">
                            Motto (বাংলা)
                          </label>
                          <input
                            type="text"
                            value={orgData.mottoBn}
                            onChange={(e) => setOrgData({ ...orgData, mottoBn: e.target.value })}
                            className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-bangla"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-mono uppercase text-slate-400">
                          Hero Photographic Background URL
                        </label>
                        <input
                          type="text"
                          value={orgData.heroBgUrl}
                          onChange={(e) => setOrgData({ ...orgData, heroBgUrl: e.target.value })}
                          className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Live Card Snapshot */}
                <div className="space-y-4">
                  <Card accent="gold" className="border-slate-800 bg-slate-900/50 backdrop-blur-xl">
                    <CardHeader>
                      <CardTitle className="text-xs font-mono uppercase text-amber-400">
                        Live Hero Preview Card
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div
                        className="rounded-xl p-4 border border-white/10 bg-cover bg-center relative overflow-hidden"
                        style={{ backgroundImage: `url(${orgData.heroBgUrl})` }}
                      >
                        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs" />
                        <div className="relative z-10 space-y-2">
                          <Badge variant="gold" size="sm">
                            EST. 1952
                          </Badge>
                          <div className="font-bold text-white text-sm leading-snug">
                            {orgData.name}
                          </div>
                          <div className="text-xs text-slate-300 font-bangla">
                            {orgData.nameBn}
                          </div>
                          <p className="text-[11px] text-slate-300/90 leading-relaxed italic">
                            "{orgData.tagline}"
                          </p>
                          <div className="pt-2 flex gap-2">
                            <span className="px-2 py-1 rounded bg-amber-500 text-slate-950 font-bold text-[10px]">
                              Apply
                            </span>
                            <span className="px-2 py-1 rounded border border-white/20 text-white text-[10px]">
                              Gazette
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-500 font-mono text-center">
                        Instant live synchronization with edge CDN
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* SECTION: BRAND & THEME */}
            {portfolioSection === "BRAND" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-200">
                <div className="lg:col-span-2 space-y-4">
                  <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-xl">
                    <CardHeader>
                      <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                        <Palette className="w-4 h-4 text-amber-400" />
                        Brand Palette & Typographic Colors
                      </CardTitle>
                      <CardDescription className="text-xs text-slate-400">
                        Adjust your primary institutional theme colors. These automatically cascade to buttons, cards, crest rings, and glowing badges.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-xs font-mono uppercase text-slate-300 flex items-center justify-between">
                          <span>Primary Institutional Color (Navy / Blue / Royal)</span>
                          <span className="text-amber-400 font-mono">{orgData.primaryColorHsl}</span>
                        </label>
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-xl border border-white/20 shadow-inner"
                            style={{ backgroundColor: `hsl(${orgData.primaryColorHsl})` }}
                          />
                          <input
                            type="text"
                            value={orgData.primaryColorHsl}
                            onChange={(e) => {
                              const val = e.target.value;
                              setOrgData({ ...orgData, primaryColorHsl: val });
                              setBrandColors({ primaryHsl: val });
                            }}
                            className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
                          />
                        </div>
                        <div className="flex gap-2 pt-1 flex-wrap">
                          {[
                            { name: "Safety Amber (RSM)", hsl: "38 92% 50%" },
                            { name: "Signal Emerald", hsl: "160 84% 39%" },
                            { name: "Highway Asphalt", hsl: "222 47% 11%" },
                            { name: "Traffic Ruby", hsl: "0 84% 58%" },
                            { name: "Navy Blue", hsl: "221 83% 53%" },
                          ].map((preset) => (
                            <button
                              key={preset.name}
                              type="button"
                              onClick={() => {
                                setOrgData({ ...orgData, primaryColorHsl: preset.hsl });
                                setBrandColors({ primaryHsl: preset.hsl });
                              }}
                              className="px-2.5 py-1 rounded-lg border border-slate-800 bg-slate-950 text-[11px] font-mono text-slate-300 hover:text-white hover:border-amber-500/50"
                            >
                              {preset.name}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-mono uppercase text-slate-300 flex items-center justify-between">
                          <span>Accent Color (Safety Gold / Signal Emerald)</span>
                          <span className="text-amber-400 font-mono">{orgData.accentColorHsl}</span>
                        </label>
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-xl border border-white/20 shadow-inner"
                            style={{ backgroundColor: `hsl(${orgData.accentColorHsl})` }}
                          />
                          <input
                            type="text"
                            value={orgData.accentColorHsl}
                            onChange={(e) => {
                              const val = e.target.value;
                              setOrgData({ ...orgData, accentColorHsl: val });
                              setBrandColors({ accentHsl: val });
                            }}
                            className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Brand Preview Deck */}
                <div className="space-y-4">
                  <Card accent="emerald" className="border-slate-800 bg-slate-900/50 backdrop-blur-xl">
                    <CardHeader>
                      <CardTitle className="text-xs font-mono uppercase text-emerald-400">
                        Theme Token Swatch
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-3">
                        <div
                          className="h-8 rounded-lg flex items-center justify-center font-bold text-xs text-white shadow-md"
                          style={{ backgroundColor: `hsl(${orgData.primaryColorHsl})` }}
                        >
                          Primary Interactive Accent
                        </div>
                        <div
                          className="h-8 rounded-lg flex items-center justify-center font-bold text-xs text-slate-950 shadow-md"
                          style={{ backgroundColor: `hsl(${orgData.accentColorHsl})` }}
                        >
                          Gold Sovereign Emblem
                        </div>
                        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-800/80">
                          <span>Status: Applied</span>
                          <span className="text-emerald-400">Zero CSS Rebuild</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* SECTION: NOTICES & GAZETTES */}
            {portfolioSection === "NOTICES" && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <FileText className="w-4 h-4 text-amber-400" />
                      Official Gazette Memos & Public Notices
                    </h3>
                    <p className="text-xs text-slate-400">
                      Publish official resolutions, election notifications, and academic notices with registered memo numbers.
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="gold"
                    onClick={() => {
                      const newNotice = {
                        id: `not-${Date.now()}`,
                        title: "New Statutory Resolution & Circular",
                        titleBn: "নতুন সংবিধিবদ্ধ রেজুলেশন ও সাধারণ বিজ্ঞপ্তি",
                        memoNo: `MEMO-BMA-CTG-2026-${Math.floor(100 + Math.random() * 900)}`,
                        category: "Administrative",
                        isPinned: false,
                        publishedAt: new Date().toISOString().split("T")[0] || "2026-09-22",
                      };
                      setNotices([newNotice, ...notices]);
                      success("Draft Notice Created", "You can now edit its contents.");
                    }}
                    leftIcon={<Plus className="w-3.5 h-3.5" />}
                  >
                    Draft Notice
                  </Button>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden">
                  <div className="divide-y divide-slate-800/60">
                    {notices.map((not) => (
                      <div key={not.id} className="p-4 flex items-center justify-between hover:bg-slate-800/30 transition-colors">
                        <div className="space-y-1 pr-4">
                          <div className="flex items-center gap-2">
                            {not.isPinned && (
                              <Badge variant="gold" size="sm">
                                Pinned Circular
                              </Badge>
                            )}
                            <Badge variant="outline" className="text-[10px] font-mono border-slate-700 text-slate-400">
                              {not.category}
                            </Badge>
                            <span className="text-xs font-mono text-amber-400/90">{not.memoNo}</span>
                          </div>
                          <div className="font-semibold text-sm text-white">{not.title}</div>
                          <div className="text-xs text-slate-400 font-bangla">{not.titleBn}</div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setNotices(
                                notices.map((n) => (n.id === not.id ? { ...n, isPinned: !n.isPinned } : n))
                              );
                            }}
                            className="text-xs text-slate-400 hover:text-amber-400 font-mono px-2 py-1 rounded bg-slate-800/60"
                          >
                            {not.isPinned ? "Unpin" : "Pin"}
                          </button>
                          <button
                            onClick={() => {
                              setNotices(notices.filter((n) => n.id !== not.id));
                              info("Notice Removed");
                            }}
                            className="text-slate-500 hover:text-rose-400 p-1.5 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SECTION: EVENTS & CME CONFERENCES */}
            {portfolioSection === "EVENTS" && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-amber-400" />
                      Academic Congresses, Conferences & CME
                    </h3>
                    <p className="text-xs text-slate-400">
                      Manage conferences, hour-by-hour agendas, ticket fees, and accredited CPD credit hours.
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="gold"
                    onClick={() => {
                      const newEvent = {
                        id: `ev-${Date.now()}`,
                        title: "National CME Conference on Emergency Medicine",
                        titleBn: "ইমার্জেন্সি মেডিসিন বিষয়ক জাতীয় সিএমই কনফারেন্স",
                        date: "Dec 18-19, 2026",
                        venue: "Auditorium Hall, Chattogram",
                        cpdCredits: 8,
                        feeBdt: 2000,
                      };
                      setEvents([newEvent, ...events]);
                      success("Conference Added", "Configured for public registration.");
                    }}
                    leftIcon={<Plus className="w-3.5 h-3.5" />}
                  >
                    Add Academic Conference
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {events.map((ev) => (
                    <Card key={ev.id} className="border-slate-800 bg-slate-900/50 backdrop-blur-xl">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <Badge variant="success" size="sm">
                            {ev.cpdCredits} CPD Credit Hours
                          </Badge>
                          <span className="font-mono text-xs text-amber-400 font-bold">
                            ৳ {ev.feeBdt.toLocaleString()}
                          </span>
                        </div>
                        <CardTitle className="text-sm font-bold text-white mt-1">{ev.title}</CardTitle>
                        <CardDescription className="text-xs font-bangla text-slate-400">{ev.titleBn}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-xs font-mono text-slate-400 space-y-1">
                          <div>Date: <span className="text-slate-200">{ev.date}</span></div>
                          <div>Venue: <span className="text-slate-200">{ev.venue}</span></div>
                        </div>
                        <div className="flex justify-end pt-3">
                          <button
                            onClick={() => setEvents(events.filter((e) => e.id !== ev.id))}
                            className="text-slate-500 hover:text-rose-400 text-xs font-mono flex items-center gap-1"
                          >
                            <Trash2 className="w-3 h-3" /> Remove
                          </button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION: MEMORIAL HALL OF ETERNAL RESPECT */}
            {portfolioSection === "MEMORIAL" && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Flower2 className="w-4 h-4 text-amber-400" />
                      Memorial Hall of Eternal Respect ("স্মৃতি চিরন্তন")
                    </h3>
                    <p className="text-xs text-slate-400">
                      Honor departed presidents, stalwart founders, and patrons with permanent tributes and floral counters.
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="gold"
                    onClick={() => {
                      const newMem = {
                        id: `mem-${Date.now()}`,
                        name: "Dr. A. K. M. Shamsuddin",
                        nameBn: "ডা. এ. কে. এম. শামসুদ্দিন",
                        tenure: "1940 – 2024",
                        title: "Former President & Philanthropist",
                        floralCount: 154,
                      };
                      setMemorials([...memorials, newMem]);
                      success("Memorial Record Added", "Record placed in Memorial Hall.");
                    }}
                    leftIcon={<Plus className="w-3.5 h-3.5" />}
                  >
                    Add Departed Stalwart
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {memorials.map((mem) => (
                    <Card key={mem.id} className="border-slate-800 bg-slate-900/50 backdrop-blur-xl">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs text-amber-400">{mem.tenure}</span>
                          <Badge variant="glass" size="sm" className="text-rose-300 border-rose-500/30">
                            🌸 {mem.floralCount} Floral Tributes
                          </Badge>
                        </div>
                        <CardTitle className="text-sm font-bold text-white mt-1">{mem.name}</CardTitle>
                        <CardDescription className="text-xs font-bangla text-slate-400">{mem.nameBn}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-slate-300 italic">{mem.title}</p>
                        <div className="flex justify-end pt-3">
                          <button
                            onClick={() => setMemorials(memorials.filter((m) => m.id !== mem.id))}
                            className="text-slate-500 hover:text-rose-400 text-xs font-mono flex items-center gap-1"
                          >
                            <Trash2 className="w-3 h-3" /> Remove
                          </button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: SYSTEM OPERATIONS & GOVERNANCE RULES */}
        {activeTab === "OPERATIONS" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Branch Network Hierarchy Editor */}
              <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-xl">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                      <Building className="w-4 h-4 text-cyan-400" />
                      Branch Network & Organogram
                    </CardTitle>
                    <Badge variant="cyan" size="sm">
                      Materialized Path Active
                    </Badge>
                  </div>
                  <CardDescription className="text-xs text-slate-400">
                    Add hierarchical chapters. Officers assigned to a branch automatically receive authority over all child units.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    {branches.map((b) => (
                      <div
                        key={b.id}
                        className="p-3 rounded-xl border border-slate-800 bg-slate-950 flex items-center justify-between"
                      >
                        <div>
                          <div className="font-semibold text-xs text-white">{b.name}</div>
                          <div className="text-[10px] font-mono text-slate-400">
                            {b.level} · Code: <span className="text-amber-400">{b.code}</span>
                          </div>
                        </div>
                        <div className="font-mono text-[10px] text-slate-500">Path: {b.path}</div>
                      </div>
                    ))}
                  </div>

                  <Button
                    size="sm"
                    variant="glass"
                    className="w-full text-xs font-mono"
                    onClick={() => {
                      const newBranch = {
                        id: `b-${Date.now()}`,
                        name: "Sylhet Regional Hospital Chapter",
                        level: "Unit Chapter",
                        code: "SYL",
                        path: "1/4",
                      };
                      setBranches([...branches, newBranch]);
                      success("Branch Unit Created", "Materialized path assigned.");
                    }}
                    leftIcon={<Plus className="w-3.5 h-3.5" />}
                  >
                    Add Child Branch Node
                  </Button>
                </CardContent>
              </Card>

              {/* SMS Masking Gateway Settings */}
              <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-xl">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                      <Radio className="w-4 h-4 text-rose-400" />
                      SMS Gateway & Masking Sender ID
                    </CardTitle>
                    <Badge variant="destructive" size="sm">
                      Carrier Approved
                    </Badge>
                  </div>
                  <CardDescription className="text-xs text-slate-400">
                    Configure your official BTRC-registered SMS sender ID for OTPs and general notices.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-slate-400">
                      Approved Masking Sender ID
                    </label>
                    <input
                      type="text"
                      defaultValue="BMA-CTG"
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-white font-mono font-bold focus:outline-none focus:border-rose-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-slate-400">
                      SMS Provider Adapter
                    </label>
                    <select className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-rose-500">
                      <option>SSL Wireless (Enterprise Gateway)</option>
                      <option>Alpha SMS API</option>
                      <option>Greenweb Bangladesh</option>
                    </select>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Remaining SMS Balance:</span>
                    <span className="font-bold text-emerald-400">14,280 SMS</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* TAB 3: HOLOGRAPHIC LIVE PREVIEWER */}
        {activeTab === "PREVIEW" && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Eye className="w-4 h-4 text-amber-400" />
                  Holographic Live Portfolio Preview
                </h3>
                <p className="text-xs text-slate-400">
                  Visual representation of how visitors see your organization on the public web.
                </p>
              </div>

              <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1 rounded-xl">
                <button
                  onClick={() => setPreviewDevice("DESKTOP")}
                  className={`p-1.5 rounded-lg text-xs flex items-center gap-1 font-mono ${
                    previewDevice === "DESKTOP" ? "bg-amber-500 text-slate-950 font-bold" : "text-slate-400"
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" /> Desktop
                </button>
                <button
                  onClick={() => setPreviewDevice("MOBILE")}
                  className={`p-1.5 rounded-lg text-xs flex items-center gap-1 font-mono ${
                    previewDevice === "MOBILE" ? "bg-amber-500 text-slate-950 font-bold" : "text-slate-400"
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" /> Mobile
                </button>
              </div>
            </div>

            {/* Simulated Browser Frame */}
            <div
              className={`mx-auto rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl overflow-hidden transition-all duration-300 ${
                previewDevice === "MOBILE" ? "max-w-sm" : "max-w-5xl"
              }`}
            >
              {/* Browser chrome bar */}
              <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex-1 text-center font-mono text-[10px] text-slate-400 bg-slate-950 py-0.5 rounded border border-slate-800 flex items-center justify-center gap-1">
                  <Lock className="w-2.5 h-2.5 text-emerald-400" />
                  https://{orgData.customDomain || `${orgData.slug}.orgms.app`}
                </div>
              </div>

              {/* Simulated Website Hero Area */}
              <div className="p-8 space-y-6 bg-gradient-to-b from-slate-900 to-slate-950">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-lg"
                      style={{ backgroundColor: `hsl(${orgData.primaryColorHsl})` }}
                    >
                      BMA
                    </div>
                    <div>
                      <div className="font-bold text-sm text-white">{orgData.name}</div>
                      <div className="text-[11px] text-slate-400 font-bangla">{orgData.nameBn}</div>
                    </div>
                  </div>
                  <Badge variant="gold" size="sm">
                    {orgData.motto}
                  </Badge>
                </div>

                <div className="py-8 text-center space-y-4 max-w-2xl mx-auto">
                  <h1 className="text-2xl font-extrabold text-white tracking-tight leading-tight">
                    {orgData.tagline}
                  </h1>
                  <p className="text-sm font-bangla text-slate-300 leading-relaxed">
                    {orgData.taglineBn}
                  </p>
                  <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                      className="px-4 py-2 rounded-xl text-xs font-bold text-slate-950 shadow-lg"
                      style={{ backgroundColor: `hsl(${orgData.accentColorHsl})` }}
                    >
                      Apply for Membership
                    </button>
                    <button className="px-4 py-2 rounded-xl text-xs font-medium border border-white/20 text-white hover:bg-white/10">
                      Official Gazette Memos
                    </button>
                  </div>
                </div>

                {/* Simulated Notice Grid */}
                <div className="pt-4 border-t border-white/10">
                  <div className="text-xs font-mono uppercase text-amber-400 mb-3 font-bold">
                    Latest Institutional Circulars
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {notices.map((n) => (
                      <div key={n.id} className="p-3 rounded-xl border border-white/10 bg-slate-900/60 space-y-1">
                        <div className="text-[10px] font-mono text-amber-400">{n.memoNo}</div>
                        <div className="text-xs font-bold text-white">{n.title}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
