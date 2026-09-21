"use client";

import React, { useState } from "react";
import {
  Calendar,
  MapPin,
  Award,
  Users,
  Sparkles,
  Ticket,
  ChevronRight,
  Search,
} from "lucide-react";
import { Button, Badge, Card, CardContent } from "@org/ui";
import Link from "next/link";

interface EventItem {
  id: string;
  title: string;
  titleBn: string;
  category: "NATIONAL_CONVENTION" | "SCIENTIFIC_SEMINAR" | "CPD_WORKSHOP" | "AGM";
  categoryLabel: string;
  categoryLabelBn: string;
  dateString: string;
  dateStringBn: string;
  venue: string;
  venueBn: string;
  cpdHours?: number;
  feePaisa: bigint; // 0 for free
  registeredCount: number;
  capacity: number;
  keynoteSpeaker: string;
  keynoteSpeakerDesignation: string;
  description: string;
  descriptionBn: string;
}

const EVENTS_DATA: EventItem[] = [
  {
    id: "evt-agm-2026",
    title: "74th National Annual General Meeting & Scientific Congress 2026",
    titleBn: "৭৪তম জাতীয় বার্ষিক সাধারণ সভা ও বৈজ্ঞানিক সম্মেলন ২০২৬",
    category: "NATIONAL_CONVENTION",
    categoryLabel: "National Convention",
    categoryLabelBn: "জাতীয় সম্মেলন",
    dateString: "November 06 - 07, 2026",
    dateStringBn: "৬ - ৭ নভেম্বর ২০২৬",
    venue: "Bangabandhu International Conference Centre (BICC), Dhaka",
    venueBn: "বঙ্গবন্ধু আন্তর্জাতিক সম্মেলন কেন্দ্র (বিআইসিসি), ঢাকা",
    cpdHours: 8.0,
    feePaisa: 150000n, // 1500 BDT
    registeredCount: 420,
    capacity: 650,
    keynoteSpeaker: "Prof. Dr. A. K. Azad",
    keynoteSpeakerDesignation: "National Professor & Fellow",
    description:
      "The premier annual assembly bringing together over 600 healthcare leaders, division heads, and delegates from across Bangladesh to deliberate constitutional policies and cutting-edge clinical breakthroughs.",
    descriptionBn:
      "সারা দেশের ৬০০-র অধিক সিনিয়র চিকিৎসক, গবেষক এবং প্রতিনিধিদের অংশগ্রহণে বার্ষিক সাধারণ সভা ও নীতি নির্ধারণী অধিবেশন।",
  },
  {
    id: "evt-cpd-cardio",
    title: "Advanced Symposium on Interventional Cardiology & Primary Care",
    titleBn: "ইন্টারভেনশনাল কার্ডিওলজি ও আধুনিক প্রাথমিক চিকিৎসা বিষয়ক সিম্পোজিয়াম",
    category: "CPD_WORKSHOP",
    categoryLabel: "CPD Accredited",
    categoryLabelBn: "সিপিডি অ্যাক্রেডিটেড",
    dateString: "October 14, 2026",
    dateStringBn: "১৪ অক্টোবর ২০২৬",
    venue: "Radisson Blu Chattogram Bay View, Chattogram",
    venueBn: "রেডিসন ব্লু চট্টগ্রাম বে ভিউ, চট্টগ্রাম",
    cpdHours: 4.5,
    feePaisa: 80000n, // 800 BDT
    registeredCount: 165,
    capacity: 200,
    keynoteSpeaker: "Dr. Shah Alam",
    keynoteSpeakerDesignation: "Senior Consultant, National Heart Foundation",
    description:
      "Interactive case discussions on highway trauma protocols, evidence-based crash response, and hands-on simulation with recognized Road Safety CPD accreditation points.",
    descriptionBn:
      "হৃদরোগ চিকিৎসা ও প্রাথমিক কেয়ারের আধুনিক গাইডলাইন, ক্লিনিক্যাল কেস স্টাডি এবং সিমুলেশন প্রশিক্ষণ।",
  },
  {
    id: "evt-flood-health",
    title: "Disaster Preparedness and Post-Flood Epidemic Control Summit",
    titleBn: "দুর্যোগ ব্যবস্থাপনা ও বন্যা পরবর্তী মহামারী প্রতিরোধ সম্মেলন",
    category: "SCIENTIFIC_SEMINAR",
    categoryLabel: "Scientific Seminar",
    categoryLabelBn: "বৈজ্ঞানিক সেমিনার",
    dateString: "October 28, 2026",
    dateStringBn: "২৮ অক্টোবর ২০২৬",
    venue: "Sylhet Medical College Auditorium, Sylhet",
    venueBn: "সিলেট ওসমানী মেডিকেল কলেজ মিলনায়তন, সিলেট",
    cpdHours: 3.0,
    feePaisa: 0n, // Free
    registeredCount: 290,
    capacity: 350,
    keynoteSpeaker: "Prof. Dr. Nazma Haque",
    keynoteSpeakerDesignation: "Director, Institute of Epidemiology & Public Health",
    description:
      "Field protocols for community health stewards addressing water-borne infection outbreaks, mobile dispensary management, and public health immunization programs.",
    descriptionBn:
      "বন্যা কবলিত অঞ্চলে পানিবাহিত রোগ প্রতিরোধ, স্যানিটেশন সচেতনতা ও জরুরি ভ্রাম্যমাণ ক্লিনিক পরিচালনা সংক্রান্ত বিশেষ সেমিনার।",
  },
];

export default function EventsDirectoryPage() {
  const [lang, setLang] = useState<"en" | "bn">("en");
  const [selectedFilter, setSelectedFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEvents = EVENTS_DATA.filter((event) => {
    const matchesCategory = selectedFilter === "ALL" || event.category === selectedFilter;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      event.title.toLowerCase().includes(query) ||
      event.titleBn.includes(query) ||
      event.venue.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500/20">
      {/* Navigation Header */}
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-slate-950/85 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center font-black text-slate-950 text-lg shadow-lg"
            >
              BMA
            </Link>
            <div>
              <Link href="/" className="font-bold text-base tracking-tight text-white hover:text-amber-400 transition-colors">
                {lang === "en" ? "Conferences & Academic Congresses" : "সম্মেলন ও অ্যাকাডেমিক সিম্পোজিয়াম"}
              </Link>
              <div className="text-xs text-slate-400 font-bangla">
                {lang === "en" ? "Official Calendar of Scientific Sessions" : "বিজ্ঞান ও পেশাগত সম্মেলন পঞ্জিকা"}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setLang(lang === "en" ? "bn" : "en")}
              className="px-3 py-1.5 rounded-lg border border-white/10 text-xs font-semibold hover:border-amber-400/50 transition-colors"
            >
              {lang === "en" ? "বাংলা সংস্করণ" : "English Version"}
            </button>
            <Link href="/portal/events/checkin">
              <Button size="sm" variant="outline" className="border-amber-500/30 text-amber-300 hover:bg-amber-500/10 text-xs gap-1.5">
                <Ticket className="w-3.5 h-3.5" />
                {lang === "en" ? "Gate Scanner" : "গেট স্ক্যানার"}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative border-b border-white/10 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                {lang === "en" ? "Accredited Continuing Professional Development (CPD)" : "পেশাগত দক্ষতা উন্নয়ন ও সম্মেলন"}
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-serif">
                {lang === "en" ? "Conferences, Seminars & Assemblies" : "পেশাগত সম্মেলন ও অ্যাকাডেমিক অধিবেশন"}
              </h1>
              <p className="mt-3 text-slate-400 max-w-2xl text-sm sm:text-base leading-relaxed">
                {lang === "en"
                  ? "Participate in prestigious national assemblies, acquire certified CPD credits, and connect with distinguished colleagues across all medical disciplines in Bangladesh."
                  : "জাতীয় সম্মেলন সমূহে অংশগ্রহণ করে জ্ঞান ও পেশাগত দক্ষতা বৃদ্ধি করুন, সিপিডি পয়েন্ট অর্জন করুন এবং সারাদেশে সহকর্মীদের সাথে সংযোগ স্থাপন করুন।"}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/portal/lms">
                <Button className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold gap-2 text-xs">
                  <Award className="w-3.5 h-3.5" />
                  {lang === "en" ? "My CPD Certificate Portfolio" : "আমার সিপিডি সার্টিফিকেট"}
                </Button>
              </Link>
            </div>
          </div>

          {/* Search & Tabs */}
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-7 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder={
                  lang === "en"
                    ? "Search conventions by title, location, or subject..."
                    : "সম্মেলনের নাম, ভেন্যু বা বিষয়বস্তু অনুসন্ধান করুন..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            <div className="lg:col-span-5 flex flex-wrap gap-2 items-center">
              {[
                { key: "ALL", labelEn: "All Events", labelBn: "সকল" },
                { key: "NATIONAL_CONVENTION", labelEn: "National AGM", labelBn: "জাতীয় সাধারণ সভা" },
                { key: "CPD_WORKSHOP", labelEn: "CPD Workshops", labelBn: "সিপিডি ওয়ার্কশপ" },
                { key: "SCIENTIFIC_SEMINAR", labelEn: "Symposiums", labelBn: "সিম্পোজিয়াম" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setSelectedFilter(tab.key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedFilter === tab.key
                      ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                      : "bg-slate-900 border border-white/10 text-slate-400 hover:text-white"
                  }`}
                >
                  {lang === "en" ? tab.labelEn : tab.labelBn}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Events List */}
      <main className="max-w-7xl mx-auto px-6 py-12 flex-1 w-full space-y-8">
        {filteredEvents.map((evt) => {
          const feeBDT = Number(evt.feePaisa / 100n);
          const percentFilled = Math.round((evt.registeredCount / evt.capacity) * 100);

          return (
            <Card
              key={evt.id}
              className="bg-slate-900/60 border border-white/10 hover:border-amber-500/40 transition-all duration-300 rounded-2xl overflow-hidden shadow-xl"
            >
              <CardContent className="p-6 sm:p-8">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                  {/* Left Column: Date Stamp & Main Info */}
                  <div className="flex-1 space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <Badge className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold">
                        {lang === "en" ? evt.categoryLabel : evt.categoryLabelBn}
                      </Badge>
                      {evt.cpdHours && (
                        <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                          <Award className="w-3.5 h-3.5" />
                          {evt.cpdHours} CPD Credits
                        </span>
                      )}
                      <span className="text-xs text-slate-400">
                        {lang === "en" ? `${evt.registeredCount} / ${evt.capacity} seats filled` : `${evt.registeredCount} / ${evt.capacity} আসন পূর্ণ`}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight hover:text-amber-400 transition-colors">
                      <Link href={`/events/${evt.id}`}>
                        {lang === "en" ? evt.title : evt.titleBn}
                      </Link>
                    </h2>

                    <p className="text-slate-300 text-sm leading-relaxed max-w-3xl">
                      {lang === "en" ? evt.description : evt.descriptionBn}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-400">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-amber-400" />
                        <span className="text-white font-medium">
                          {lang === "en" ? evt.dateString : evt.dateStringBn}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-amber-400" />
                        <span>{lang === "en" ? evt.venue : evt.venueBn}</span>
                      </div>
                      <div className="flex items-center gap-2 sm:col-span-2">
                        <Users className="w-4 h-4 text-slate-400" />
                        <span>
                          <strong className="text-slate-300">{lang === "en" ? "Keynote: " : "মূল প্রবন্ধ: "}</strong>
                          {evt.keynoteSpeaker} — {evt.keynoteSpeakerDesignation}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Pricing & Registration Action */}
                  <div className="lg:w-64 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-8 space-y-4">
                    <div>
                      <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                        {lang === "en" ? "Delegate Fee" : "প্রতিনিধি নিবন্ধন ফি"}
                      </div>
                      <div className="text-3xl font-black text-white font-serif mt-1">
                        {feeBDT === 0 ? (
                          <span className="text-emerald-400">{lang === "en" ? "Complimentary" : "সদস্যদের জন্য ফ্রি"}</span>
                        ) : (
                          <span>
                            ৳{feeBDT.toLocaleString()}
                            <span className="text-xs font-normal text-slate-400 font-sans ml-1">/ seat</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Progress Bar for Registration */}
                    <div className="space-y-1">
                      <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-white/10">
                        <div
                          className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                          style={{ width: `${percentFilled}%` }}
                        />
                      </div>
                      <div className="text-[11px] text-slate-400 text-right">
                        {percentFilled}% {lang === "en" ? "reserved" : "বুকিং সম্পন্ন"}
                      </div>
                    </div>

                    <Link href={`/events/${evt.id}`}>
                      <Button className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold gap-2 text-xs">
                        {lang === "en" ? "Register / View Program" : "প্রোগ্রাম দেখুন ও নিবন্ধন"}
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-slate-950 py-10 px-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © 2026 Road Safety Movement • Standing Committee for Academic & Public Advocacy
          </div>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-slate-300 transition-colors">
              {lang === "en" ? "Home" : "মূলপাতা"}
            </Link>
            <Link href="/notices" className="hover:text-slate-300 transition-colors">
              {lang === "en" ? "Notice Board" : "বিজ্ঞপ্তি"}
            </Link>
            <Link href="/causes" className="hover:text-slate-300 transition-colors">
              {lang === "en" ? "Causes" : "তহবিল"}
            </Link>
            <Link href="/gallery" className="hover:text-slate-300 transition-colors">
              {lang === "en" ? "Gallery" : "গ্যালারি"}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
