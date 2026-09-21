"use client";

import React, { useState } from "react";
import {
  Camera,
  Calendar,
  MapPin,
  X,
  Download,
} from "lucide-react";
import { Button, Badge } from "@org/ui";
import Link from "next/link";

interface GalleryItem {
  id: string;
  title: string;
  titleBn: string;
  category: "CONFERENCE" | "RELIEF" | "GALA" | "CONVOCATION";
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
    title: "Inaugural Plenary of 73rd National Scientific Congress",
    titleBn: "৭৩তম জাতীয় বৈজ্ঞানিক সম্মেলনের উদ্বোধনী অধিবেশন",
    category: "CONFERENCE",
    categoryLabel: "National Congress",
    categoryLabelBn: "জাতীয় সম্মেলন",
    year: "2025",
    date: "November 14, 2025",
    venue: "BICC, Hall of Fame, Dhaka",
    caption:
      "Gathering of over 800 medical delegates from 64 district branches for the inauguration of the annual scientific congress.",
    captionBn: "৬৪ জেলার ৮০০-র অধিক প্রতিনিধির উপস্থিতিতে বিজ্ঞান অধিবেশনের উদ্বোধন।",
    dignitaries: "Prof. Dr. Mahmudul Hasan, National Professor A. K. Azad",
    bgGradient: "from-blue-900 via-indigo-950 to-slate-950",
  },
  {
    id: "gal-02",
    title: "Emergency Mobile Healthcare Flotilla in Flood-Hit Feni",
    titleBn: "ফেনীর প্রত্যন্ত অঞ্চলে জরুরি ভাসমান মেডিকেল ক্যাম্প",
    category: "RELIEF",
    categoryLabel: "Humanitarian Relief",
    categoryLabelBn: "মানবিক ত্রাণ",
    year: "2026",
    date: "August 28, 2026",
    venue: "Parshuram, Feni",
    caption:
      "Volunteer doctors distributing life-saving intravenous fluids, clean drinking water, and antibiotic rations to submerged villages.",
    captionBn: "বন্যা কবলিত প্রত্যন্ত চরাঞ্চলে ভ্রাম্যমাণ মেডিকেল টিমের মাধ্যমে ওষুধ বিতরণ।",
    dignitaries: "Dr. Shahina Sultana, Dr. Ahmed Reza, Youth Volunteer Corps",
    bgGradient: "from-emerald-950 via-teal-950 to-slate-950",
  },
  {
    id: "gal-03",
    title: "Golden Jubilee Consecration & Fellowships Ceremony",
    titleBn: "সুবর্ণ জয়ন্তী সমাবর্তন ও ফেলোশিপ প্রদান অনুষ্ঠান",
    category: "CONVOCATION",
    categoryLabel: "Convocation",
    categoryLabelBn: "সমাবর্তন",
    year: "2024",
    date: "December 18, 2024",
    venue: "InterContinental Dhaka Grand Ballroom",
    caption:
      "Conferring Honorary Lifetime Fellowships to veteran surgeons and pioneering public health champions of Bangladesh.",
    captionBn: "দেশের প্রথিতযশা প্রবীণ চিকিৎসক ও পথিকৃৎ জনস্বাস্থ্যবিদদের আজীবন সম্মাননা প্রদান।",
    dignitaries: "Minister of Health, BMA Executive Council",
    bgGradient: "from-amber-950 via-yellow-950 to-slate-950",
  },
  {
    id: "gal-04",
    title: "Chattogram Divisional Council Executive Investiture",
    titleBn: "চট্টগ্রাম বিভাগীয় শাখা পরিষদের শপথ গ্রহণ ও অভিষেক",
    category: "GALA",
    categoryLabel: "Branch Gala",
    categoryLabelBn: "শাখা অভিষেক",
    year: "2026",
    date: "January 22, 2026",
    venue: "Radisson Blu Chattogram Bay View",
    caption:
      "Newly elected metropolitan executive committee taking solemn oath of office before general members.",
    captionBn: "নবনির্বাচিত চট্টগ্রাম মহানগর কার্যনির্বাহী কমিটির শপথ গ্রহণ ও পরিচিতি সভা।",
    dignitaries: "Divisional President, Secretary & 300 Council Members",
    bgGradient: "from-rose-950 via-slate-950 to-slate-950",
  },
  {
    id: "gal-05",
    title: "Hands-on Advanced Laparoscopic & Robotic Surgery Workshop",
    titleBn: "উন্নত ল্যাপারোস্কোপিক ও রোবোটিক সার্জারি প্রশিক্ষণ কর্মশালা",
    category: "CONFERENCE",
    categoryLabel: "CPD Workshop",
    categoryLabelBn: "সিপিডি কর্মশালা",
    year: "2026",
    date: "April 10, 2026",
    venue: "BSMMU Simulation Lab, Dhaka",
    caption:
      "Young surgical registrars undergoing precision simulation training under renowned international faculties.",
    captionBn: "তরুণ সার্জনদের জন্য বিশ্বমানের সিমুলেশন ল্যাবে আধুনিক সার্জারি প্রশিক্ষণ।",
    dignitaries: "Prof. Dr. M. R. Chowdhury, International Visiting Fellows",
    bgGradient: "from-cyan-950 via-slate-950 to-slate-950",
  },
  {
    id: "gal-06",
    title: "World Health Day National Rally & Free Screening Camp",
    titleBn: "বিশ্ব স্বাস্থ্য দিবস বর্ণাঢ্য র্যালি ও বিনামূল্যে স্বাস্থ্য পরীক্ষা",
    category: "RELIEF",
    categoryLabel: "Public Health",
    categoryLabelBn: "জনস্বাস্থ্য ক্যাম্পেইন",
    year: "2025",
    date: "April 07, 2025",
    venue: "Central Secretariat to Shahbagh Square, Dhaka",
    caption:
      "Nationwide public health rally raising awareness on non-communicable diseases, hypertension, and clean urban water.",
    captionBn: "অসংক্রামক রোগ প্রতিরোধে জনসচেতনতামূলক পদযাত্রা ও ডায়াবেটিস পরীক্ষা ক্যাম্প।",
    dignitaries: "Secretary General, Divisional Heads & Medical College Students",
    bgGradient: "from-purple-950 via-slate-950 to-slate-950",
  },
];

export default function GalleryArchivePage() {
  const [lang, setLang] = useState<"en" | "bn">("en");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedYear, setSelectedYear] = useState<string>("ALL");
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null);

  const filteredItems = GALLERY_DATA.filter((item) => {
    const matchesCat = selectedCategory === "ALL" || item.category === selectedCategory;
    const matchesYear = selectedYear === "ALL" || item.year === selectedYear;
    return matchesCat && matchesYear;
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
                {lang === "en" ? "Photographic Archive & Press Gallery" : "ঐতিহাসিক স্থিরচিত্র ও প্রেস গ্যালারি"}
              </Link>
              <div className="text-xs text-slate-400 font-bangla">
                {lang === "en" ? "Official Photographic Documentation Since 1952" : "জাতীয় সম্মেলন, সমাবর্তন ও মানবিক কাজের প্রামাণ্য দলিল"}
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
            <Link href="/portal">
              <Button size="sm" variant="outline" className="border-amber-500/30 text-amber-300 hover:bg-amber-500/10 text-xs">
                {lang === "en" ? "Member Portal" : "সদস্য পোর্টাল"}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="relative border-b border-white/10 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium mb-4">
            <Camera className="w-3.5 h-3.5" />
            {lang === "en" ? "High-Resolution Institutional Media Archive" : "উচ্চ রেজোলিউশন প্রাতিষ্ঠানিক ফটো সংগ্রহশালা"}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif text-white tracking-tight leading-tight">
            {lang === "en" ? "Capturing Decades of Service & Leadership" : "চিকিৎসক সমাজের ঐক্য, সেবা ও ঐতিহ্যের প্রতিচ্ছবি"}
          </h1>
          <p className="mt-3 text-slate-400 max-w-2xl text-sm sm:text-base leading-relaxed">
            {lang === "en"
              ? "Browse high-fidelity press photography covering annual general meetings, disaster relief missions, scientific convocations, and branch council galas across the republic."
              : "জাতীয় সম্মেলন, সমাবর্তন, বন্যা ও দুর্যোগে আর্তমানবতার সেবা এবং বিভিন্ন শাখার অভিষেক অনুষ্ঠানের সংরক্ষিত প্রামাণ্য স্থিরচিত্র।"}
          </p>

          {/* Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {[
                { key: "ALL", labelEn: "All Categories", labelBn: "সকল ছবি" },
                { key: "CONFERENCE", labelEn: "Conferences", labelBn: "সম্মেলন" },
                { key: "RELIEF", labelEn: "Relief Missions", labelBn: "ত্রাণ কার্যক্রম" },
                { key: "CONVOCATION", labelEn: "Convocations", labelBn: "সমাবর্তন" },
                { key: "GALA", labelEn: "Branch Galas", labelBn: "শাখা অনুষ্ঠান" },
              ].map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedCategory === cat.key
                      ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                      : "bg-slate-900 border border-white/10 text-slate-400 hover:text-white"
                  }`}
                >
                  {lang === "en" ? cat.labelEn : cat.labelBn}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">{lang === "en" ? "Year: " : "বছর: "}</span>
              {["ALL", "2026", "2025", "2024"].map((y) => (
                <button
                  key={y}
                  onClick={() => setSelectedYear(y)}
                  className={`px-2.5 py-1 rounded-md text-xs font-mono transition-colors ${
                    selectedYear === y
                      ? "bg-white/20 text-white font-bold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {y}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Masonry / Grid */}
      <main className="max-w-7xl mx-auto px-6 py-12 flex-1 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActivePhoto(item)}
              className="group cursor-pointer rounded-2xl overflow-hidden border border-white/10 bg-slate-900/60 hover:border-amber-500/50 transition-all duration-300 shadow-xl flex flex-col"
            >
              {/* Image Preview Box with Rich Institutional Gradient & Badge */}
              <div
                className={`h-56 bg-gradient-to-br ${item.bgGradient} p-6 flex flex-col justify-between relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500`}
              >
                <div className="flex items-center justify-between">
                  <Badge className="bg-black/50 text-white border border-white/20 text-[10px] font-semibold backdrop-blur-md">
                    {lang === "en" ? item.categoryLabel : item.categoryLabelBn}
                  </Badge>
                  <span className="text-[11px] font-mono text-amber-400 font-bold bg-black/40 px-2 py-0.5 rounded backdrop-blur-md">
                    {item.year}
                  </span>
                </div>

                <div className="space-y-1 z-10">
                  <div className="text-[11px] text-slate-300 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    <span className="truncate">{item.venue}</span>
                  </div>
                  <div className="text-white font-bold font-serif text-lg leading-tight line-clamp-2">
                    {lang === "en" ? item.title : item.titleBn}
                  </div>
                </div>

                {/* Subtle Grid Accent Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
              </div>

              {/* Caption & Metadata Footer */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                  {lang === "en" ? item.caption : item.captionBn}
                </p>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>{item.date}</span>
                  </div>
                  <span className="text-amber-400 group-hover:underline">
                    {lang === "en" ? "View Details" : "বিস্তারিত"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Interactive Lightbox Modal */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8">
          <div className="bg-slate-900 border border-white/20 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl space-y-6 relative animate-in fade-in zoom-in duration-200">
            {/* Top Bar of Modal */}
            <div className="flex items-center justify-between px-6 pt-6">
              <Badge className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold">
                {lang === "en" ? activePhoto.categoryLabel : activePhoto.categoryLabelBn} • {activePhoto.year}
              </Badge>
              <button
                onClick={() => setActivePhoto(null)}
                className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Simulated High-Res Frame */}
            <div
              className={`h-80 sm:h-96 mx-6 rounded-2xl bg-gradient-to-tr ${activePhoto.bgGradient} p-8 flex flex-col justify-end relative overflow-hidden border border-white/10 shadow-inner`}
            >
              <div className="z-10 space-y-2">
                <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white leading-tight">
                  {lang === "en" ? activePhoto.title : activePhoto.titleBn}
                </h3>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>{activePhoto.venue}</span>
                  <span>•</span>
                  <span>{activePhoto.date}</span>
                </div>
              </div>
            </div>

            {/* Description & Press Credits */}
            <div className="px-6 pb-6 space-y-4">
              <p className="text-sm text-slate-300 leading-relaxed">
                {lang === "en" ? activePhoto.caption : activePhoto.captionBn}
              </p>

              <div className="bg-slate-950 p-4 rounded-xl border border-white/5 space-y-1 text-xs">
                <div className="text-slate-400">
                  <strong className="text-slate-200">{lang === "en" ? "Dignitaries Present: " : "উপস্থিত ব্যক্তিবর্গ: "}</strong>
                  {activePhoto.dignitaries}
                </div>
                <div className="text-slate-400">
                  <strong className="text-slate-200">{lang === "en" ? "Archive Index: " : "নথিপত্র নম্বর: "}</strong>
                  <span className="font-mono text-amber-400">ARCH-BMA-{activePhoto.id.toUpperCase()}-2026</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="text-xs text-slate-500">
                  Official Press Release Photo • Central Secretariat Archive
                </div>
                <Button
                  onClick={() => alert("Downloading 300 DPI high-resolution master copy for publication...")}
                  size="sm"
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold gap-1.5 text-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  {lang === "en" ? "Download High-Res" : "ডাউনলোড"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-white/10 bg-slate-950 py-10 px-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>© 2026 Road Safety Movement • Standing Committee for Press, Media & Publications</div>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-slate-300 transition-colors">
              {lang === "en" ? "Home" : "মূলপাতা"}
            </Link>
            <Link href="/notices" className="hover:text-slate-300 transition-colors">
              {lang === "en" ? "Notices" : "বিজ্ঞপ্তি"}
            </Link>
            <Link href="/events" className="hover:text-slate-300 transition-colors">
              {lang === "en" ? "Conferences" : "সম্মেলন"}
            </Link>
            <Link href="/causes" className="hover:text-slate-300 transition-colors">
              {lang === "en" ? "Causes" : "তহবিল"}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
