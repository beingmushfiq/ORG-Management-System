"use client";

import React, { useState } from "react";
import {
  Calendar,
  MapPin,
  Award,
  Sparkles,
  Ticket,
  ChevronRight,
  Search,
} from "lucide-react";
import { Button, Badge, Card, CardContent } from "@org/ui";
import Link from "next/link";
import { InstitutionalHeader } from "@/components/layout/institutional-header";
import { InstitutionalFooter } from "@/components/layout/institutional-footer";

interface EventItem {
  id: string;
  title: string;
  titleBn: string;
  category: "NATIONAL_FINALE" | "REGIONAL_QUALIFIER" | "WORKSHOP" | "AWARDS";
  categoryLabel: string;
  categoryLabelBn: string;
  dateString: string;
  dateStringBn: string;
  venue: string;
  venueBn: string;
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
    id: "evt-finale-2025",
    title: "National Agricultural Olympiad 2025 — Grand Finale & Award Gala",
    titleBn: "জাতীয় কৃষি অলিম্পিয়াড ২০২৫ — গ্র্যান্ড ফিনালে ও জাতীয় পুরস্কার বিতরণী",
    category: "NATIONAL_FINALE",
    categoryLabel: "National Grand Finale",
    categoryLabelBn: "জাতীয় গ্র্যান্ড ফিনালে",
    dateString: "November 20 - 21, 2026",
    dateStringBn: "২০ - ২১ নভেম্বর ২০২৬",
    venue: "Bangladesh Agricultural University (BAU) Auditorium, Mymensingh",
    venueBn: "বাংলাদেশ কৃষি বিশ্ববিদ্যালয় (বাকৃবি) অডিটোরিয়াম, ময়মনসিংহ",
    feePaisa: 7000n, // 70 BDT
    registeredCount: 1420,
    capacity: 2000,
    keynoteSpeaker: "Prof. Dr. A. K. Azad",
    keynoteSpeakerDesignation: "National Patron & Vice-Chancellor, BAU",
    description:
      "The apex national assembly bringing together top qualifiers from all 64 districts. Final written olympiad, smart agriculture project pitches, laptop awards, and research tour conferral.",
    descriptionBn:
      "৬৪ জেলার শীর্ষ মেধাবীদের অংশগ্রহণে জাতীয় পর্যায়ের চূড়ান্ত অলিম্পিয়াড, কৃষি প্রযুক্তি প্রদর্শনী, চ্যাম্পিয়ন ল্যাপটপ ও নগদ ৫০,০০০ টাকা পুরস্কার প্রদান।",
  },
  {
    id: "evt-regional-dhaka",
    title: "Dhaka Regional Selection Round & Youth Agri-Hackathon",
    titleBn: "ঢাকা বিভাগীয় বাছাই পর্ব ও যুব এগ্রি-হ্যাক্যাথন ২০২৫",
    category: "REGIONAL_QUALIFIER",
    categoryLabel: "Regional Qualifier",
    categoryLabelBn: "বিভাগীয় বাছাই পর্ব",
    dateString: "October 18, 2026",
    dateStringBn: "১৮ অক্টোবর ২০২৬",
    venue: "Sher-e-Bangla Agricultural University (SAU), Dhaka",
    venueBn: "শেরেবাংলা কৃষি বিশ্ববিদ্যালয় কেন্দ্রীয় মিলনায়তন, ঢাকা",
    feePaisa: 0n, // Free with Admit Card
    registeredCount: 850,
    capacity: 1000,
    keynoteSpeaker: "Dr. Kazi Mostafa Kamal",
    keynoteSpeakerDesignation: "Chief Scientific Officer, BARI",
    description:
      "Regional qualifier for school and college participants of Dhaka division. Top 50 scorers receive direct tickets to the National Grand Finale at BAU Mymensingh.",
    descriptionBn:
      "ঢাকা বিভাগের স্কুল ও কলেজ শিক্ষার্থীদের বিভাগীয় লিখিত পরীক্ষা ও মেধা যাচাই। শীর্ষ ৫০ জন পাবেন জাতীয় ফিনালেতে সরাসরি অংশগ্রহণের সুযোগ।",
  },
  {
    id: "evt-regional-ctg",
    title: "Chattogram Regional Qualifier & Coastal Agri-Innovation Round",
    titleBn: "চট্টগ্রাম বিভাগীয় বাছাই পর্ব ও উপকূলীয় কৃষি উদ্ভাবন প্রতিযোগিতা",
    category: "REGIONAL_QUALIFIER",
    categoryLabel: "Regional Qualifier",
    categoryLabelBn: "বিভাগীয় বাছাই পর্ব",
    dateString: "October 25, 2026",
    dateStringBn: "২৫ অক্টোবর ২০২৬",
    venue: "CVASU Auditorium, Khulshi, Chattogram",
    venueBn: "সিভাসু কেন্দ্রীয় অডিটোরিয়াম, খুলশী, চট্টগ্রাম",
    feePaisa: 0n, // Free
    registeredCount: 620,
    capacity: 800,
    keynoteSpeaker: "Prof. Dr. Shah Alam",
    keynoteSpeakerDesignation: "Dean of Fishery & Coastal Agriculture, CVASU",
    description:
      "Regional qualifier focusing on coastal farming, saline-tolerant crops, and marine agriculture for students from Chattogram, Cox's Bazar, and the Hill Tracts.",
    descriptionBn:
      "চট্টগ্রাম, কক্সবাজার ও পার্বত্য অঞ্চলের শিক্ষার্থীদের জন্য উপকূলীয় কৃষি ও লবণাক্ততা সহনশীল উদ্ভাবন বিষয়ক বিভাগীয় বাছাই পরীক্ষা।",
  },
  {
    id: "evt-workshop-bsmrau",
    title: "Masterclass: Smart Farming, IoT Sensors & Soilless Hydroponics",
    titleBn: "মাস্টারক্লাস: স্মার্ট এগ্রিকালচার, আইওটি সেন্সর ও হাইড্রোপনিক্স প্রশিক্ষণ",
    category: "WORKSHOP",
    categoryLabel: "Hands-on Masterclass",
    categoryLabelBn: "হাতে-কলমে প্রশিক্ষণ",
    dateString: "November 05, 2026",
    dateStringBn: "৫ নভেম্বর ২০২৬",
    venue: "BSMRAU Agri-Tech Incubator, Gazipur",
    venueBn: "ইকরিমবি এগ্রি-টেক ইনকিউবেটর সেন্টার, গাজীপুর",
    feePaisa: 15000n, // 150 BDT
    registeredCount: 290,
    capacity: 350,
    keynoteSpeaker: "Dr. Nazma Haque",
    keynoteSpeakerDesignation: "Lead Specialist, Precision Agro-Robotics Lab",
    description:
      "Interactive technical session on assembling DIY automated drip systems, sensor calibration, nutrient dosing in hydroponics, and greenhouse climate algorithms.",
    descriptionBn:
      "স্মার্ট গ্রিনহাউস সেন্সর, ড্রিপ ইরিগেশন অটোমেশন এবং হাইড্রোপনিক্স পুষ্টি উপাদান নিয়ন্ত্রণের হাতে-কলমে সার্টিফিকেট কর্মশালা।",
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
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-amber-500/20 transition-colors">
      {/* Institutional Top Header */}
      <InstitutionalHeader lang={lang} onToggleLang={() => setLang(lang === "en" ? "bn" : "en")} />

      {/* Hero Section */}
      <section className="relative border-b border-border bg-muted/20 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-semibold mb-4">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                {lang === "en" ? "National Examination & Event Calendar Season 2025" : "জাতীয় পরীক্ষা ও ইভেন্ট ক্যালেন্ডার ২০২৫"}
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground font-serif">
                {lang === "en" ? "Olympiad Rounds, Qualifiers & Grand Finale" : "অলিম্পিয়াড বাছাই পর্ব ও গ্র্যান্ড ফিনালে"}
              </h1>
              <p className="mt-3 text-muted-foreground max-w-2xl text-sm sm:text-base leading-relaxed">
                {lang === "en"
                  ? "Explore regional qualifier dates, examination center locations, masterclass schedules, and the National Grand Finale at Bangladesh Agricultural University (BAU) Mymensingh."
                  : "দেশব্যাপী ৬৪ জেলার আঞ্চলিক বাছাই পরীক্ষা, কেন্দ্র তালিকা, ব্যবহারিক কর্মশালা এবং বাংলাদেশ কৃষি বিশ্ববিদ্যালয়ের গ্র্যান্ড ফিনালের সময়সূচি দেখুন।"}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/apply">
                <Button className="bg-[#0F5132] hover:bg-[#0c4028] text-white font-bold gap-2 text-xs shadow-md">
                  <Ticket className="w-3.5 h-3.5 text-amber-400" />
                  {lang === "en" ? "Register for Season 2025 (BDT 70)" : "নিবন্ধন করুন (৭০ টাকা)"}
                </Button>
              </Link>
            </div>
          </div>

          {/* Search & Tabs */}
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-7 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder={
                  lang === "en"
                    ? "Search competitions by title, university, or venue..."
                    : "ইভেন্টের নাম, বিশ্ববিদ্যালয় বা ভেন্যু অনুসন্ধান করুন..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
              />
            </div>

            <div className="lg:col-span-5 flex items-center gap-2 overflow-x-auto pb-1">
              {[
                { key: "ALL", labelEn: "All Sessions", labelBn: "সব সেশন" },
                { key: "NATIONAL_FINALE", labelEn: "Grand Finale", labelBn: "গ্র্যান্ড ফিনালে" },
                { key: "REGIONAL_QUALIFIER", labelEn: "Regional Rounds", labelBn: "বিভাগীয় বাছাই" },
                { key: "WORKSHOP", labelEn: "Masterclasses", labelBn: "কর্মশালা" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setSelectedFilter(tab.key)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedFilter === tab.key
                      ? "bg-[#0F5132] text-white shadow-sm"
                      : "bg-card border border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {lang === "en" ? tab.labelEn : tab.labelBn}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Events Listing */}
      <main className="max-w-7xl mx-auto px-6 py-12 flex-1 w-full space-y-6">
        <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
          <span>{filteredEvents.length} Sessions Scheduled</span>
          <span>Trade License: 03247/2023-2025 · Prices in BDT</span>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {filteredEvents.map((event) => {
            const feeBdt = Number(event.feePaisa) / 100;
            return (
              <Card
                key={event.id}
                className="bg-card border border-border hover:border-emerald-500/50 transition-all rounded-3xl overflow-hidden shadow-sm hover:shadow-md"
              >
                <CardContent className="p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  {/* Left Column: Date & Details */}
                  <div className="space-y-4 max-w-3xl">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 text-xs font-semibold">
                        {lang === "en" ? event.categoryLabel : event.categoryLabelBn}
                      </Badge>

                      <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-muted px-2.5 py-0.5 rounded-full font-mono">
                        <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                        {lang === "en" ? event.dateString : event.dateStringBn}
                      </span>

                      <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-muted px-2.5 py-0.5 rounded-full font-mono">
                        <MapPin className="w-3.5 h-3.5 text-amber-500" />
                        {lang === "en" ? event.venue : event.venueBn}
                      </span>
                    </div>

                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold font-serif text-foreground hover:text-emerald-600 transition-colors">
                        <Link href={`/events/${event.id}`}>
                          {lang === "en" ? event.title : event.titleBn}
                        </Link>
                      </h2>
                      <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {lang === "en" ? event.description : event.descriptionBn}
                      </p>
                    </div>

                    {/* Keynote / Patron */}
                    <div className="flex items-center gap-2 text-xs text-muted-foreground border-t border-border/60 pt-3">
                      <Award className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>
                        <strong className="text-foreground">{event.keynoteSpeaker}</strong> ·{" "}
                        {event.keynoteSpeakerDesignation}
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Pricing & Registration Action */}
                  <div className="flex sm:flex-row lg:flex-col items-center lg:items-end justify-between gap-4 shrink-0 border-t lg:border-t-0 lg:border-l border-border pt-4 lg:pt-0 lg:pl-8">
                    <div className="text-left lg:text-right">
                      <div className="text-xs text-muted-foreground font-mono">
                        {event.feePaisa === 0n ? "Admission Requirement" : "Registration Fee"}
                      </div>
                      <div className="text-xl sm:text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400">
                        {event.feePaisa === 0n ? "FREE (E-Admit Card)" : `৳${feeBdt.toFixed(2)} BDT`}
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">
                        {event.registeredCount} / {event.capacity} seats filled
                      </div>
                    </div>

                    <Link href={`/events/${event.id}`} className="w-full sm:w-auto">
                      <Button className="w-full sm:w-auto bg-[#0F5132] hover:bg-[#0c4028] text-white font-bold gap-1.5 text-xs shadow-md">
                        <Ticket className="w-3.5 h-3.5 text-amber-400" />
                        {lang === "en" ? "View Schedule & Pass" : "বিবরণ ও পাস"}
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>

      {/* Institutional Footer */}
      <InstitutionalFooter lang={lang} />
    </div>
  );
}
