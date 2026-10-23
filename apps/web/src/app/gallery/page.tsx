"use client";

import React, { useState } from "react";
import {
  Camera,
  MapPin,
  Award,
  Sprout,
} from "lucide-react";
import { Button, Badge } from "@org/ui";
import { InstitutionalHeader } from "@/components/layout/institutional-header";
import { InstitutionalFooter } from "@/components/layout/institutional-footer";

interface GalleryItem {
  id: string;
  title: string;
  titleBn: string;
  category: "CEREMONY" | "EXCURSION" | "EXHIBITION" | "WORKSHOP";
  categoryLabel: string;
  categoryLabelBn: string;
  year: string;
  date: string;
  venue: string;
  caption: string;
  captionBn: string;
  dignitaries: string;
  bgGradient: string;
}

const GALLERY_DATA: GalleryItem[] = [
  {
    id: "gal-01",
    title: "National Grand Finale & Champion Trophy Handover at BAU Mymensingh",
    titleBn: "বাংলাদেশ কৃষি বিশ্ববিদ্যালয়ে জাতীয় গ্র্যান্ড ফিনালে ও চ্যাম্পিয়ন ট্রফি প্রদান",
    category: "CEREMONY",
    categoryLabel: "Award Ceremony",
    categoryLabelBn: "পুরস্কার বিতরণী",
    year: "2025",
    date: "November 21, 2025",
    venue: "BAU Grand Auditorium, Mymensingh",
    caption:
      "Awarding Champion Laptop, ৳50,000 cash prize, and national crest to top secondary student innovators before 2,000 delegates.",
    captionBn: "২,০০০ প্রতিনিধির উপস্থিতিতে চ্যাম্পিয়ন শিক্ষার্থীকে ল্যাপটপ, নগদ ৫০,০০০ টাকা ও জাতীয় ক্রেস্ট প্রদান।",
    dignitaries: "Prof. Dr. A. K. Azad (VC, BAU), Senior BARI Scientists",
    bgGradient: "from-emerald-950 via-teal-950 to-slate-950",
  },
  {
    id: "gal-02",
    title: "Educational Field Tour at Bangladesh Rice Research Institute (BRRI)",
    titleBn: "বাংলাদেশ ধান গবেষণা ইনস্টিটিউটে (ব্রি) শিক্ষার্থীদের মাঠ গবেষণা পরিদর্শন",
    category: "EXCURSION",
    categoryLabel: "Research Excursion",
    categoryLabelBn: "মাঠ গবেষণা পরিদর্শন",
    year: "2025",
    date: "November 22, 2025",
    venue: "BRRI Central Research Field, Gazipur",
    caption:
      "National qualifiers inspecting transgenic golden rice plots, deepwater paddy lines, and modern soil testing laboratories.",
    captionBn: "ব্রি-র আধুনিক গবেষণাগারে শিক্ষার্থীদের পুষ্টিসমৃদ্ধ ধান ও জীবপ্রযুক্তি বিষয়ক ব্যবহারিক পরিদর্শন।",
    dignitaries: "Chief Scientific Officer, BRRI Genetic Resources Division",
    bgGradient: "from-amber-950 via-yellow-950 to-slate-950",
  },
  {
    id: "gal-03",
    title: "Youth Smart-Agro Innovation Fair & Prototype Exhibition",
    titleBn: "স্মার্ট কৃষি উদ্ভাবনী মেলা ও তরুণ উদ্ভাবকদের প্রজেক্ট প্রদর্শনী",
    category: "EXHIBITION",
    categoryLabel: "Innovation Expo",
    categoryLabelBn: "উদ্ভাবনী মেলা",
    year: "2025",
    date: "October 18, 2025",
    venue: "Sher-e-Bangla Agricultural University (SAU), Dhaka",
    caption:
      "High school teams demonstrating DIY automated drip irrigation circuits, IoT soil sensors, and rooftop hydroponics.",
    captionBn: "মাধ্যমিক স্তরের শিক্ষার্থীদের সোলার ড্রিপ ইরিগেশন ও ছাদবাগানে হাইড্রোপনিক্স মডেল প্রদর্শনী।",
    dignitaries: "Dean of Agriculture, SAU & National Olympiad Jury",
    bgGradient: "from-green-950 via-emerald-950 to-slate-950",
  },
  {
    id: "gal-04",
    title: "Chattogram Regional Qualifier & Coastal Saline Soil Workshop",
    titleBn: "চট্টগ্রাম বিভাগীয় বাছাই পরীক্ষা ও উপকূলীয় লবণাক্ততা সহনশীল কৃষি কর্মশালা",
    category: "WORKSHOP",
    categoryLabel: "Regional Qualifier",
    categoryLabelBn: "বিভাগীয় বাছাই",
    year: "2025",
    date: "October 25, 2025",
    venue: "CVASU Auditorium, Chattogram",
    caption:
      "Over 600 students from Chattogram, Cox's Bazar, and Feni participating in the regional Olympiad written rounds.",
    captionBn: "চট্টগ্রাম বিভাগের ৬০০-র অধিক শিক্ষার্থীর অংশগ্রহণে আঞ্চলিক লিখিত পরীক্ষা ও মেধা অন্বেষণ।",
    dignitaries: "CVASU Vice-Chancellor & Regional Olympiad Coordinator",
    bgGradient: "from-cyan-950 via-blue-950 to-slate-950",
  },
  {
    id: "gal-05",
    title: "Sylhet Tea Garden Agricultural Biodiversity Expedition",
    titleBn: "সিলেটের চা বাগান ও জীববৈচিত্র্য সংরক্ষণ শিক্ষাসফর",
    category: "EXCURSION",
    categoryLabel: "Field Expedition",
    categoryLabelBn: "জীববৈচিত্র্য শিক্ষাসফর",
    year: "2024",
    date: "December 14, 2024",
    venue: "Sreemangal, Sylhet",
    caption:
      "Winners of Season 1 exploring soil conservation techniques and sustainable agro-forestry in scenic tea ecosystems.",
    captionBn: "প্রথম সিজনের বিজয়ী শিক্ষার্থীদের শ্রীমঙ্গলের চা বাগান ও কৃষি বনায়ন পরিদর্শন।",
    dignitaries: "Sylhet Agricultural University Faculty",
    bgGradient: "from-emerald-950 via-forest-950 to-slate-950",
  },
  {
    id: "gal-06",
    title: "High School Smart-Agro Science Kit Distribution Campaign",
    titleBn: "গ্রামীণ মাধ্যমিক বিদ্যালয়ে এগ্রো-সায়েন্স কিট ও হাইড্রোপনিক্স বিতরণ",
    category: "WORKSHOP",
    categoryLabel: "School Outreach",
    categoryLabelBn: "স্কুল কর্মসূচি",
    year: "2024",
    date: "September 05, 2024",
    venue: "Tangail & Mymensingh District Schools",
    caption:
      "Equipping rural high school laboratories with soil test tubes, digital pH meters, and germination beds.",
    captionBn: "গ্রামীণ স্কুলের বিজ্ঞানাগারে ডিজিটাল পিএইচ মিটার ও বীজ অঙ্কুরোদ্গম কিট বিতরণ কার্যক্রম।",
    dignitaries: "National Secretariat Field Team & District Education Officer",
    bgGradient: "from-stone-900 via-emerald-950 to-slate-950",
  },
];

export default function GalleryPage() {
  const [lang, setLang] = useState<"en" | "bn">("en");
  const [selectedFilter, setSelectedFilter] = useState<string>("ALL");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filteredItems = GALLERY_DATA.filter(
    (item) => selectedFilter === "ALL" || item.category === selectedFilter
  );

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-amber-500/20 transition-colors">
      {/* Institutional Top Header */}
      <InstitutionalHeader lang={lang} onToggleLang={() => setLang(lang === "en" ? "bn" : "en")} />

      {/* Hero Header */}
      <section className="relative border-b border-border bg-muted/20 py-16 px-6">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-semibold">
            <Camera className="w-3.5 h-3.5 text-amber-500" />
            {lang === "en" ? "Visual Chronicle & Academic Heritage" : "ফটোগ্রাফিক আর্কাইভ ও শিক্ষাসফর চিত্র"}
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground font-serif">
            {lang === "en"
              ? "National Agricultural Olympiad Memories"
              : "জাতীয় কৃষি অলিম্পিয়াড স্মৃতি ও গৌরবময় মুহূর্ত"}
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-muted-foreground leading-relaxed">
            {lang === "en"
              ? "Glimpses of nationwide regional qualifier rounds, award galas at Bangladesh Agricultural University (BAU), and research excursions to national agricultural research stations."
              : "দেশব্যাপী বাছাই পরীক্ষা, বাংলাদেশ কৃষি বিশ্ববিদ্যালয়ে গ্র্যান্ড ফিনালে, পুরস্কার বিতরণী এবং জাতীয় গবেষণা প্রতিষ্ঠানে শিক্ষার্থীদের মাঠ পরিদর্শনের চিত্রশালা।"}
          </p>

          {/* Filter Pills */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-2">
            {[
              { key: "ALL", labelEn: "All Chronicles", labelBn: "সকল স্মৃতি" },
              { key: "CEREMONY", labelEn: "Award Ceremonies", labelBn: "পুরস্কার বিতরণী" },
              { key: "EXCURSION", labelEn: "Research Excursions", labelBn: "মাঠ গবেষণা সফর" },
              { key: "EXHIBITION", labelEn: "Innovation Expo", labelBn: "উদ্ভাবনী প্রদর্শনী" },
              { key: "WORKSHOP", labelEn: "Regional Workshops", labelBn: "বিভাগীয় কর্মশালা" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSelectedFilter(tab.key)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedFilter === tab.key
                    ? "bg-[#0F5132] text-white shadow-md shadow-emerald-900/30"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {lang === "en" ? tab.labelEn : tab.labelBn}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <main className="max-w-7xl mx-auto px-6 py-14 flex-1 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group cursor-pointer rounded-3xl bg-card border border-border overflow-hidden shadow-sm hover:shadow-xl hover:border-emerald-500/50 transition-all duration-300 flex flex-col"
            >
              {/* Photo Card Art */}
              <div
                className={`h-52 bg-gradient-to-br ${item.bgGradient} relative p-6 flex flex-col justify-between overflow-hidden text-white`}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.15),transparent_60%)]" />

                <div className="relative z-10 flex items-center justify-between">
                  <Badge className="bg-white/20 text-white backdrop-blur-md border border-white/20 text-[10px] font-bold">
                    {lang === "en" ? item.categoryLabel : item.categoryLabelBn}
                  </Badge>
                  <span className="text-xs font-mono font-bold text-amber-300 bg-black/40 px-2 py-0.5 rounded-full">
                    {item.year}
                  </span>
                </div>

                <div className="relative z-10 flex items-center gap-2 text-xs text-slate-200 font-mono">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="truncate">{item.venue}</span>
                </div>
              </div>

              {/* Caption & Metadata */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-base font-bold font-serif text-foreground group-hover:text-emerald-600 transition-colors leading-snug">
                    {lang === "en" ? item.title : item.titleBn}
                  </h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                    {lang === "en" ? item.caption : item.captionBn}
                  </p>
                </div>

                <div className="pt-3 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground font-mono">
                  <span>{item.date}</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400 group-hover:underline">
                    View Full Story →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal Lightbox */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-card border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-6 animate-in fade-in zoom-in duration-200 text-card-foreground">
            <div className="flex items-start justify-between">
              <div>
                <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                  {selectedItem.categoryLabel} · {selectedItem.year}
                </Badge>
                <h3 className="text-xl font-bold font-serif text-foreground mt-2">
                  {lang === "en" ? selectedItem.title : selectedItem.titleBn}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="text-muted-foreground hover:text-foreground text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div
              className={`h-64 rounded-2xl bg-gradient-to-br ${selectedItem.bgGradient} p-6 flex items-center justify-center text-center text-white relative overflow-hidden`}
            >
              <div className="space-y-2 relative z-10 max-w-md">
                <Sprout className="w-12 h-12 text-amber-400 mx-auto opacity-80" />
                <p className="text-sm font-serif italic text-white/90">
                  &ldquo;{selectedItem.caption}&rdquo;
                </p>
                <div className="text-xs font-mono text-amber-300">
                  {selectedItem.venue} · {selectedItem.date}
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs border-t border-border pt-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Award className="w-4 h-4 text-amber-500 shrink-0" />
                <span>
                  <strong className="text-foreground">Dignitaries Present:</strong>{" "}
                  {selectedItem.dignitaries}
                </span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong className="text-foreground">Venue:</strong> {selectedItem.venue}
                </span>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                size="sm"
                onClick={() => setSelectedItem(null)}
                className="bg-[#0F5132] hover:bg-[#0c4028] text-white text-xs font-bold"
              >
                Close Chronicle
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Institutional Footer */}
      <InstitutionalFooter lang={lang} />
    </div>
  );
}
