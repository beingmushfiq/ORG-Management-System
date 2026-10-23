"use client";

import React, { useState } from "react";
import {
  Palette,
  Layout,
  FileText,
  Calendar,
  Building,
  Radio,
  Save,
  Plus,
  Eye,
  ArrowLeft,
  ExternalLink,
  Smartphone,
  Monitor,
  Lock,
  ShieldCheck,
  Award,
  BookOpen,
  Truck,
  RefreshCcw,
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

export default function TenantCmsStudioPage() {
  const { success } = useToast();
  const [activeTab, setActiveTab] = useState<"PORTFOLIO" | "STATUTORY" | "COURSES" | "OPERATIONS" | "PREVIEW">("PORTFOLIO");
  const [portfolioSection, setPortfolioSection] = useState<
    "HERO" | "BRAND" | "CATEGORIES" | "NOTICES" | "EVENTS" | "GALLERY"
  >("HERO");
  const [previewDevice, setPreviewDevice] = useState<"DESKTOP" | "MOBILE">("DESKTOP");
  const [isSaving, setIsSaving] = useState(false);

  // 1. Organization & Compliance State (Agricultural Olympiad)
  const [orgData, setOrgData] = useState({
    name: "National Agricultural Olympiad",
    nameBn: "জাতীয় কৃষি অলিম্পিয়াড",
    slug: "agriolympiad",
    customDomain: "agriculturalolympiad.com",
    tagline: "Empowering Youth to Shape a Sustainable Future for Bangladesh Agriculture",
    taglineBn: "টেকসই কৃষির রূপান্তরে তরুণ প্রজন্মের নেতৃত্ব ও উদ্ভাবন",
    motto: "Youth Leadership, Smart Farming, Food Security",
    mottoBn: "স্মার্ট কৃষি, তরুণ নেতৃত্ব, খাদ্য নিরাপত্তা",
    primaryColorHsl: "142 76% 22%", // Forest Emerald Green
    accentColorHsl: "38 92% 50%",   // Harvest Sun Gold
    contactEmail: "agriculturalolympiad@gmail.com",
    contactPhone: "+880 1717-395047",
    whatsappNumber: "+880 1717-395047",
    headOfficeAddress: "House 04, Road 12/b, Sector 10, Uttara Model Town, Dhaka, Bangladesh",
    headOfficeAddressBn: "বাড়ি ০৪, রোড ১২/বি, সেক্টর ১০, উত্তরা মডেল টাউন, ঢাকা, বাংলাদেশ",
    tradeLicenseNumber: "03247/2023-2025",
    tinNumber: "7829-1029-4412",
    defaultCurrency: "BDT",

    // Legal Policies
    termsHtml: "Official Terms and Conditions for participation in National Agricultural Olympiad Season 2025.",
    termsHtmlBn: "জাতীয় কৃষি অলিম্পিয়াড ২০২৫-এ অংশগ্রহণের আনুষ্ঠানিক শর্তাবলী ও নীতিমালা।",
    refundPolicyHtml: "Refund requests submitted within 14 calendar days of registration will be reviewed and processed within 5-7 working days back to the original payment channel (bKash/Nagad/Card via SSLCommerz).",
    refundPolicyHtmlBn: "নিবন্ধনের ১৪ দিনের মধ্যে রিফান্ডের আবেদন জমা দিলে পরবর্তী ৫-৭ কার্যদিবসের মধ্যে মূল পেমেন্ট মাধ্যমে (বিকাশ/নগদ/কার্ড) টাকা ফেরত দেওয়া হবে।",
    privacyPolicyHtml: "We collect student names, school/college details, contact numbers, and district info strictly for examination seating, admit card issuance, and result verification.",
    privacyPolicyHtmlBn: "শিক্ষার্থী ও অভিভাবকদের তথ্যের গোপনীয়তা রক্ষা করা হয়। কোনো তথ্য বাণিজ্যিক উদ্দেশ্যে তৃতীয় পক্ষের নিকট হস্তান্তর করা হয় না।",
    deliveryPolicyHtml: "Digital admit cards and certificates delivered within 24 hours. Physical medals, crests, and participant gift kits delivered via courier within 3-7 business days across all 64 districts in Bangladesh.",
    deliveryPolicyHtmlBn: "ডিজিটাল প্রবেশপত্র ও সনদপত্র ২৪ ঘণ্টার মধ্যে সরবরাহ করা হয়। ফিজিক্যাল মেডেল ও কিট কুরিয়ারের মাধ্যমে ৩-৭ কার্যদিবসের মধ্যে সমগ্র বাংলাদেশে পৌঁছে দেওয়া হয়।",
    aboutStoryHtml: "The National Agricultural Olympiad is Bangladesh's pioneering nationwide competition and youth empowerment movement, dedicated to transforming smart farming, climate resilience, and food systems through scientific education.",
    aboutStoryHtmlBn: "জাতীয় কৃষি অলিম্পিয়াড বাংলাদেশের সর্ববৃহৎ কৃষিভিত্তিক মেধা অন্বেষণ প্ল্যাটফর্ম—যা আধুনিক কৃষি প্রযুক্তি, জলবায়ু অভিযোজন এবং খাদ্য সুরক্ষায় শিক্ষার্থীদের সম্পৃক্ত করতে কাজ করে যাচ্ছে।",
  });

  // 2. Competition Categories
  const [categories] = useState([
    { id: "cat-1", name: "Junior Class (Grades 6–8)", nameBn: "জুনিয়র শ্রেণি (৬ষ্ঠ–৮ম)", feeBdt: 70, spots: 5000 },
    { id: "cat-2", name: "Secondary Class (Grades 9–10 & SSC)", nameBn: "মাধ্যমিক শ্রেণি (৯ম–১০ম ও এসএসসি)", feeBdt: 70, spots: 8000 },
    { id: "cat-3", name: "Higher Secondary (Grades 11–12 & HSC)", nameBn: "উচ্চ মাধ্যমিক (১১শ–১২শ ও এইচএসসি)", feeBdt: 70, spots: 7000 },
    { id: "cat-4", name: "University Agri-Fellowship Track", nameBn: "বিশ্ববিদ্যালয় ফেলোশিপ ট্র্যাক", feeBdt: 200, spots: 2000 },
  ]);

  // 3. Courses in BDT
  const [courses, setCourses] = useState([
    { id: "c-1", title: "Foundations of Smart Agriculture & Hydroponics", feeBdt: 150, lessons: 10, hours: 12 },
    { id: "c-2", title: "Climate-Resilient Crop Management & Soil Health", feeBdt: 250, lessons: 15, hours: 18 },
    { id: "c-3", title: "Agricultural Biotechnology & Genetic Improvement", feeBdt: 350, lessons: 20, hours: 24 },
  ]);

  // 4. Notices State
  const [notices] = useState([
    {
      id: "not-1",
      title: "Notice: National Agricultural Olympiad 2025 Season 2 Registration Open",
      titleBn: "বিজ্ঞপ্তি: জাতীয় কৃষি অলিম্পিয়াড ২০২৫ সিজন ২ নিবন্ধন শুরু",
      memoNo: "MEMO-AGRI-2025-001",
      category: "Academic",
      isPinned: true,
      publishedAt: "2025-01-15",
    },
    {
      id: "not-2",
      title: "Syllabus & Guidelines Published for 64-District Preliminary Round",
      titleBn: "৬৪ জেলার প্রিলিমিনারি রাউন্ডের সিলেবাস ও নিয়মাবলী প্রকাশ",
      memoNo: "MEMO-AGRI-2025-002",
      category: "Guidelines",
      isPinned: false,
      publishedAt: "2025-01-20",
    },
  ]);

  // 5. Events State
  const [events] = useState([
    {
      id: "ev-1",
      title: "National Agricultural Olympiad 2025 Grand Finale & Gala",
      titleBn: "জাতীয় কৃষি অলিম্পিয়াড ২০২৫ গ্র্যান্ড ফিনালে",
      date: "Nov 20-21, 2026",
      venue: "Bangladesh Agricultural University (BAU) Auditorium, Mymensingh",
      feeBdt: 70,
    },
  ]);

  // 6. Branch Network
  const [branches, setBranches] = useState([
    { id: "b-1", name: "National Organizing Secretariat (Uttara HQ)", level: "Root Secretariat", code: "AGRI-HQ", path: "1" },
    { id: "b-2", name: "BAU Mymensingh Chapter", level: "University Division", code: "AGRI-BAU", path: "1/1" },
    { id: "b-3", name: "Dhaka Regional Coordination Council", level: "Division Chapter", code: "AGRI-DHK", path: "1/2" },
    { id: "b-4", name: "Chattogram Division Chapter", level: "Division Chapter", code: "AGRI-CTG", path: "1/3" },
  ]);

  const handlePublish = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      success("Changes Published to Edge!", "Your Agricultural Olympiad portal website and statutory compliance rules are now live.");
    }, 700);
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
                CMS Studio & Compliance
              </Badge>
            </div>
            <p className="text-xs text-slate-400 font-mono flex items-center gap-2 mt-0.5">
              <span>Domain: {orgData.customDomain}</span>
              <span>·</span>
              <span className="text-emerald-400">Trade License: {orgData.tradeLicenseNumber}</span>
              <span>·</span>
              <span className="text-amber-400">Currency: {orgData.defaultCurrency}</span>
            </p>
          </div>
        </div>

        {/* Top Control Actions */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center rounded-xl border border-slate-800 bg-slate-950/80 p-1 overflow-x-auto">
            <button
              onClick={() => setActiveTab("PORTFOLIO")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all whitespace-nowrap ${
                activeTab === "PORTFOLIO"
                  ? "bg-emerald-600 text-white font-bold shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Layout className="w-3.5 h-3.5" />
              Website UI
            </button>
            <button
              onClick={() => setActiveTab("STATUTORY")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all whitespace-nowrap ${
                activeTab === "STATUTORY"
                  ? "bg-emerald-600 text-white font-bold shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Statutory & Policies
            </button>
            <button
              onClick={() => setActiveTab("COURSES")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all whitespace-nowrap ${
                activeTab === "COURSES"
                  ? "bg-emerald-600 text-white font-bold shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Courses (BDT)
            </button>
            <button
              onClick={() => setActiveTab("OPERATIONS")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all whitespace-nowrap ${
                activeTab === "OPERATIONS"
                  ? "bg-emerald-600 text-white font-bold shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Building className="w-3.5 h-3.5" />
              Chapters & SMS
            </button>
            <button
              onClick={() => setActiveTab("PREVIEW")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all whitespace-nowrap ${
                activeTab === "PREVIEW"
                  ? "bg-emerald-600 text-white font-bold shadow-md"
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
        {/* ========================================================================= */}
        {/* TAB 1: WEBSITE UI & HOMEPAGE SECTIONS                                     */}
        {/* ========================================================================= */}
        {activeTab === "PORTFOLIO" && (
          <div className="space-y-6">
            {/* Section Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
              {[
                { id: "HERO", label: "Hero Banner & Tagline", icon: Layout },
                { id: "BRAND", label: "Theme & Palette", icon: Palette },
                { id: "CATEGORIES", label: "Competition Tracks (BDT)", icon: Award },
                { id: "NOTICES", label: "Notices & Circulars", icon: FileText },
                { id: "EVENTS", label: "Olympiad Calendar", icon: Calendar },
              ].map((sec) => {
                const Icon = sec.icon;
                const isCurrent = portfolioSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => setPortfolioSection(sec.id as any)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-mono flex items-center gap-2 whitespace-nowrap transition-all ${
                      isCurrent
                        ? "bg-slate-800 border border-emerald-500/40 text-emerald-400 font-bold shadow-lg"
                        : "border border-slate-800/60 bg-slate-900/40 text-slate-400 hover:text-white hover:border-slate-700"
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isCurrent ? "text-emerald-400" : "text-slate-500"}`} />
                    {sec.label}
                  </button>
                );
              })}
            </div>

            {/* HERO SECTION */}
            {portfolioSection === "HERO" && (
              <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                    <Layout className="w-4 h-4 text-emerald-400" />
                    HopeNest Hero Headline & Identity
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-400">
                    The visual centerpiece of the National Agricultural Olympiad flagship portal.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-mono uppercase text-slate-400">
                        Organization Title (English)
                      </label>
                      <input
                        type="text"
                        value={orgData.name}
                        onChange={(e) => setOrgData({ ...orgData, name: e.target.value })}
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-mono uppercase text-slate-400">
                        Organization Title (বাংলা)
                      </label>
                      <input
                        type="text"
                        value={orgData.nameBn}
                        onChange={(e) => setOrgData({ ...orgData, nameBn: e.target.value })}
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 font-bangla"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-slate-400">
                      Primary Tagline / Headline (English)
                    </label>
                    <textarea
                      rows={2}
                      value={orgData.tagline}
                      onChange={(e) => setOrgData({ ...orgData, tagline: e.target.value })}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-slate-400">
                      Primary Tagline / Headline (বাংলা অনুবাদ)
                    </label>
                    <textarea
                      rows={2}
                      value={orgData.taglineBn}
                      onChange={(e) => setOrgData({ ...orgData, taglineBn: e.target.value })}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 font-bangla"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* BRAND SECTION */}
            {portfolioSection === "BRAND" && (
              <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                    <Palette className="w-4 h-4 text-amber-400" />
                    Agricultural Olympiad Palette (HopeNest Styling)
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-400">
                    Forest Emerald Green (`#0F5132`) and Harvest Sun Gold (`#F59E0B`).
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white">Primary Theme HSL</div>
                        <div className="text-xs font-mono text-emerald-400">{orgData.primaryColorHsl}</div>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-[#0F5132] border border-white/20" />
                    </div>

                    <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white">Accent Theme HSL</div>
                        <div className="text-xs font-mono text-amber-400">{orgData.accentColorHsl}</div>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-[#F59E0B] border border-white/20" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* CATEGORIES SECTION */}
            {portfolioSection === "CATEGORIES" && (
              <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-xl">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                        <Award className="w-4 h-4 text-emerald-400" />
                        Competition Categories & BDT Fees
                      </CardTitle>
                      <CardDescription className="text-xs text-slate-400">
                        Manage entry tracks for Junior, Secondary, Higher Secondary, and Fellowship tiers.
                      </CardDescription>
                    </div>
                    <Badge variant="success" size="sm">
                      BDT Standard Active
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {categories.map((cat) => (
                      <div key={cat.id} className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-white">{cat.name}</span>
                          <span className="text-xs font-mono font-bold text-emerald-400">BDT {cat.feeBdt}.00</span>
                        </div>
                        <div className="text-[11px] text-slate-400 font-bangla">{cat.nameBn}</div>
                        <div className="text-[10px] text-slate-500 font-mono">Capacity: {cat.spots.toLocaleString()} Students</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* NOTICES SECTION */}
            {portfolioSection === "NOTICES" && (
              <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-400" />
                    Published Notices & Gazette Circulars
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {notices.map((n) => (
                    <div key={n.id} className="p-3.5 rounded-xl border border-slate-800 bg-slate-950 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white">{n.title}</div>
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5">{n.memoNo} · {n.publishedAt}</div>
                      </div>
                      <Badge variant="cyan" size="sm">
                        Live
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* EVENTS SECTION */}
            {portfolioSection === "EVENTS" && (
              <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-400" />
                    Olympiad Events & Finale Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {events.map((ev) => (
                    <div key={ev.id} className="p-3.5 rounded-xl border border-slate-800 bg-slate-950 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white">{ev.title}</div>
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5">{ev.date} · {ev.venue}</div>
                      </div>
                      <Badge variant="gold" size="sm">
                        BDT {ev.feeBdt}.00
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: STATUTORY COMPLIANCE & LEGAL POLICIES CMS                          */}
        {/* ========================================================================= */}
        {activeTab === "STATUTORY" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Statutory Licensing & Address Card */}
            <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Trade License & Registered Business Secretariat
                  </CardTitle>
                  <Badge variant="success" size="sm">
                    SSLCommerz Mandated
                  </Badge>
                </div>
                <CardDescription className="text-xs text-slate-400">
                  Must be visibly displayed on website footer to satisfy Bangladesh Bank e-commerce regulations.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-slate-400">
                      Official Trade License Number *
                    </label>
                    <input
                      type="text"
                      value={orgData.tradeLicenseNumber}
                      onChange={(e) => setOrgData({ ...orgData, tradeLicenseNumber: e.target.value })}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-emerald-400 font-mono font-bold focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-slate-400">
                      TIN Registration Number
                    </label>
                    <input
                      type="text"
                      value={orgData.tinNumber}
                      onChange={(e) => setOrgData({ ...orgData, tinNumber: e.target.value })}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-slate-400">
                      Default Currency
                    </label>
                    <input
                      type="text"
                      value={orgData.defaultCurrency}
                      readOnly
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-amber-400 font-mono font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-slate-400">
                      Physical Secretariat Address (English) *
                    </label>
                    <input
                      type="text"
                      value={orgData.headOfficeAddress}
                      onChange={(e) => setOrgData({ ...orgData, headOfficeAddress: e.target.value })}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-slate-400 font-bangla">
                      প্রধান কার্যালয়ের ঠিকানা (বাংলা) *
                    </label>
                    <input
                      type="text"
                      value={orgData.headOfficeAddressBn}
                      onChange={(e) => setOrgData({ ...orgData, headOfficeAddressBn: e.target.value })}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 font-bangla"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-slate-400">
                      Contact Hotline *
                    </label>
                    <input
                      type="text"
                      value={orgData.contactPhone}
                      onChange={(e) => setOrgData({ ...orgData, contactPhone: e.target.value })}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-slate-400">
                      WhatsApp Support Number *
                    </label>
                    <input
                      type="text"
                      value={orgData.whatsappNumber}
                      onChange={(e) => setOrgData({ ...orgData, whatsappNumber: e.target.value })}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-emerald-400 font-mono focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-slate-400">
                      Official Inquiries Email *
                    </label>
                    <input
                      type="email"
                      value={orgData.contactEmail}
                      onChange={(e) => setOrgData({ ...orgData, contactEmail: e.target.value })}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Legal Policies CMS Editors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Terms & Conditions */}
              <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-400" />
                    Terms & Conditions (`/terms-condition`)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <textarea
                    rows={4}
                    value={orgData.termsHtml}
                    onChange={(e) => setOrgData({ ...orgData, termsHtml: e.target.value })}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
                  />
                  <textarea
                    rows={3}
                    placeholder="বাংলা অনুবাদ..."
                    value={orgData.termsHtmlBn}
                    onChange={(e) => setOrgData({ ...orgData, termsHtmlBn: e.target.value })}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-white font-bangla focus:outline-none focus:border-emerald-500"
                  />
                </CardContent>
              </Card>

              {/* Return & Refund Policy */}
              <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
                    <RefreshCcw className="w-4 h-4 text-amber-400" />
                    Return & Refund Policy (`/refund-policy`)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <textarea
                    rows={4}
                    value={orgData.refundPolicyHtml}
                    onChange={(e) => setOrgData({ ...orgData, refundPolicyHtml: e.target.value })}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
                  />
                  <textarea
                    rows={3}
                    placeholder="বাংলা অনুবাদ..."
                    value={orgData.refundPolicyHtmlBn}
                    onChange={(e) => setOrgData({ ...orgData, refundPolicyHtmlBn: e.target.value })}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-white font-bangla focus:outline-none focus:border-amber-500"
                  />
                </CardContent>
              </Card>

              {/* Privacy Policy */}
              <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-blue-400" />
                    Privacy Policy (`/privacy-policy`)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <textarea
                    rows={4}
                    value={orgData.privacyPolicyHtml}
                    onChange={(e) => setOrgData({ ...orgData, privacyPolicyHtml: e.target.value })}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-white font-mono focus:outline-none focus:border-blue-500"
                  />
                  <textarea
                    rows={3}
                    placeholder="বাংলা অনুবাদ..."
                    value={orgData.privacyPolicyHtmlBn}
                    onChange={(e) => setOrgData({ ...orgData, privacyPolicyHtmlBn: e.target.value })}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-white font-bangla focus:outline-none focus:border-blue-500"
                  />
                </CardContent>
              </Card>

              {/* Delivery Policy */}
              <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
                    <Truck className="w-4 h-4 text-purple-400" />
                    Delivery Policy (`/delivery-policy`)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <textarea
                    rows={4}
                    value={orgData.deliveryPolicyHtml}
                    onChange={(e) => setOrgData({ ...orgData, deliveryPolicyHtml: e.target.value })}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-white font-mono focus:outline-none focus:border-purple-500"
                  />
                  <textarea
                    rows={3}
                    placeholder="বাংলা অনুবাদ..."
                    value={orgData.deliveryPolicyHtmlBn}
                    onChange={(e) => setOrgData({ ...orgData, deliveryPolicyHtmlBn: e.target.value })}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-white font-bangla focus:outline-none focus:border-purple-500"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: COURSE CATALOGUE CMS (IN BDT)                                      */}
        {/* ========================================================================= */}
        {activeTab === "COURSES" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-emerald-400" />
                      Active Courses & Syllabus Modules (BDT)
                    </CardTitle>
                    <CardDescription className="text-xs text-slate-400">
                      All fees are explicitly stated and collected in Bangladeshi Taka.
                    </CardDescription>
                  </div>
                  <Button
                    size="sm"
                    variant="glass"
                    onClick={() => {
                      const newCourse = {
                        id: `c-${Date.now()}`,
                        title: "Agribusiness & Vertical Farm Engineering",
                        feeBdt: 300,
                        lessons: 14,
                        hours: 16,
                      };
                      setCourses([...courses, newCourse]);
                      success("Course Added", "Course created in BDT catalogue.");
                    }}
                    leftIcon={<Plus className="w-3.5 h-3.5" />}
                  >
                    Add Course
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {courses.map((course) => (
                    <div key={course.id} className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-2">
                      <div className="font-bold text-xs text-white">{course.title}</div>
                      <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                        <span className="text-slate-400">{course.lessons} Lessons · {course.hours}h</span>
                        <span className="font-mono font-bold text-emerald-400">BDT {course.feeBdt}.00</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: CHAPTER HIERARCHY & SMS GATEWAY                                    */}
        {/* ========================================================================= */}
        {activeTab === "OPERATIONS" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Branch Network Hierarchy Editor */}
              <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-xl">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                      <Building className="w-4 h-4 text-emerald-400" />
                      Olympiad Chapter Network & Branches
                    </CardTitle>
                    <Badge variant="cyan" size="sm">
                      Materialized Path
                    </Badge>
                  </div>
                  <CardDescription className="text-xs text-slate-400">
                    64 District hubs and Agricultural University chapters across Bangladesh.
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
                            {b.level} · Code: <span className="text-emerald-400">{b.code}</span>
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
                        name: "Rajshahi Division Olympiad Chapter",
                        level: "Division Chapter",
                        code: "AGRI-RAJ",
                        path: "1/4",
                      };
                      setBranches([...branches, newBranch]);
                      success("Chapter Created", "Branch added to nationwide hierarchy.");
                    }}
                    leftIcon={<Plus className="w-3.5 h-3.5" />}
                  >
                    Add District / University Branch
                  </Button>
                </CardContent>
              </Card>

              {/* SMS Masking Gateway Settings */}
              <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-xl">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                      <Radio className="w-4 h-4 text-emerald-400" />
                      BTRC Masking SMS Sender ID
                    </CardTitle>
                    <Badge variant="success" size="sm">
                      Active
                    </Badge>
                  </div>
                  <CardDescription className="text-xs text-slate-400">
                    Carrier-approved Sender ID for participant seat plans and admit alerts.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-slate-400">
                      Approved Masking Sender ID
                    </label>
                    <input
                      type="text"
                      defaultValue="AGRI-OLYMP"
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-emerald-400 font-mono font-bold focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-slate-400">
                      SMS Provider Adapter
                    </label>
                    <select className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-emerald-500">
                      <option>SSL Wireless (Enterprise Gateway)</option>
                      <option>Alpha SMS API</option>
                      <option>Greenweb Bangladesh</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: SIMULATED LIVE PREVIEW                                             */}
        {/* ========================================================================= */}
        {activeTab === "PREVIEW" && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div className="text-xs font-mono text-slate-400">
                Live Edge Preview · SSLCommerz Gateway Verified · BDT Standard
              </div>
              <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setPreviewDevice("DESKTOP")}
                  className={`p-1.5 rounded-lg text-xs flex items-center gap-1 font-mono ${
                    previewDevice === "DESKTOP" ? "bg-emerald-600 text-white font-bold" : "text-slate-400"
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" /> Desktop
                </button>
                <button
                  onClick={() => setPreviewDevice("MOBILE")}
                  className={`p-1.5 rounded-lg text-xs flex items-center gap-1 font-mono ${
                    previewDevice === "MOBILE" ? "bg-emerald-600 text-white font-bold" : "text-slate-400"
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" /> Mobile
                </button>
              </div>
            </div>

            <div
              className={`mx-auto rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl overflow-hidden transition-all duration-300 ${
                previewDevice === "MOBILE" ? "max-w-sm" : "max-w-5xl"
              }`}
            >
              <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex-1 text-center font-mono text-[10px] text-slate-400 bg-slate-950 py-0.5 rounded border border-slate-800 flex items-center justify-center gap-1">
                  <Lock className="w-2.5 h-2.5 text-emerald-400" />
                  https://{orgData.customDomain}
                </div>
              </div>

              <div className="p-8 space-y-6 bg-gradient-to-b from-slate-900 to-slate-950">
                <div className="text-center space-y-3">
                  <Badge variant="success" size="sm">
                    Trade License: {orgData.tradeLicenseNumber}
                  </Badge>
                  <h1 className="text-2xl font-black text-white">{orgData.name}</h1>
                  <p className="text-xs text-slate-400 max-w-lg mx-auto">{orgData.tagline}</p>
                </div>

                <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white">Season 2025 Registration Live</span>
                    <p className="text-slate-400 text-[11px]">All 64 districts participating</p>
                  </div>
                  <span className="font-mono font-bold text-emerald-400">BDT 70.00</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
