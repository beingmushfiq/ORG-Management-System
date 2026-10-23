"use client";

import React, { useState } from "react";
import {
  Search,
  Download,
  BookOpen,
} from "lucide-react";
import { Button, Badge, Card } from "@org/ui";
import { InstitutionalHeader } from "@/components/layout/institutional-header";
import { InstitutionalFooter } from "@/components/layout/institutional-footer";

interface ArticleItem {
  id: string;
  title: string;
  titleBn: string;
  authors: string;
  affiliations: string;
  category: "STUDENT_INNOVATION" | "FIELD_RESEARCH" | "CASE_STUDY" | "EDITORIAL";
  categoryLabel: string;
  volume: string;
  issue: string;
  year: string;
  doi: string;
  abstractText: string;
  abstractBn: string;
}

const SAMPLE_ARTICLES: ArticleItem[] = [
  {
    id: "art-01",
    title: "Hydroponic & Soilless Vertical Farming: Optimization of Nutrient Solutions for Urban School Rooftops in Dhaka",
    titleBn: "হাইড্রোপনিক্স ও মাটিবিহীন খাড়া চাষাবাদ: ঢাকার নগর স্কুলের ছাদে পুষ্টি দ্রবণ অপটিমাইজেশন",
    authors: "Tanvir Rahman, Nafisa Jahan, Prof. Dr. Mahmudul Hasan",
    affiliations: "National Agricultural Olympiad Junior Fellow & Faculty of Agriculture, BAU",
    category: "STUDENT_INNOVATION",
    categoryLabel: "Olympiad Winner Paper",
    volume: "Vol. 3",
    issue: "No. 2",
    year: "2025",
    doi: "10.5529/naoj.v3i2.202511",
    abstractText:
      "A 6-month experimental evaluation of automated deep-water culture (DWC) and nutrient film technique (NFT) across three school rooftops in Uttara, Dhaka. Demonstrates 85% water conservation compared to soil cultivation and establishes baseline electrical conductivity (EC) parameters for leafy greens under subtropical summer heat.",
    abstractBn:
      "ঢাকার উত্তরা মডেল টাউনের তিনটি স্কুলের ছাদে হাইড্রোপনিক্স পদ্ধতির তুলনামূলক বিশ্লেষণ। মাটির চাষের চেয়ে ৮৫% পানি সাশ্রয় এবং গ্রীষ্মকালীন শাকসবজি উৎপাদনে সুনির্দিষ্ট পুষ্টি দ্রবণের মানদণ্ড নির্ধারণ।",
  },
  {
    id: "art-02",
    title: "Salinity-Tolerant Rice Cultivars (BRRI Dhan-67): Field Adoption and Yield Dynamics Across Coastal Satkhira & Khulna",
    titleBn: "লবণাক্ততা সহনশীল ধান (ব্রি ধান-৬৭): উপকূলীয় সাতক্ষীরা ও খুলনায় ফলন ও কৃষকদের গ্রহণ যোগ্যতা সমীক্ষা",
    authors: "Faisal Ahmed Chowdhury, Dr. Kazi Mostafa Kamal",
    affiliations: "Higher Secondary Olympiad Fellow & Bangladesh Rice Research Institute (BRRI)",
    category: "FIELD_RESEARCH",
    categoryLabel: "Coastal Agriculture",
    volume: "Vol. 3",
    issue: "No. 2",
    year: "2025",
    doi: "10.5529/naoj.v3i2.202512",
    abstractText:
      "Field trials across 45 saline farm plots (8–12 dS/m) in Shyamnagar and Paikgachha. Measures grain yield, seedling survival, and economic benefit-cost ratio of BRRI Dhan-67 compared to local landraces during the Boro season.",
    abstractBn:
      "শ্যামনগর ও পাইকগাছার লবণাক্ত উপকূলীয় জমিতে ব্রি ধান-৬৭ এর ফলন ও টিকে থাকার সক্ষমতা পর্যবেক্ষণ। স্থানীয় জাতের তুলনায় হেক্টর প্রতি উল্লেখযোগ্য ফলন বৃদ্ধি ও লাভজনকতার প্রমাণ।",
  },
  {
    id: "art-03",
    title: "IoT Sensor-Based Drip Irrigation and Soil Moisture Profiling for Smallholder Farmers in the Barind Tract",
    titleBn: "বরেন্দ্র অঞ্চলে ক্ষুদ্র কৃষকদের জন্য আইওটি সেন্সর ভিত্তিক ড্রিপ সেচ ও মৃত্তিকা আর্দ্রতা নিয়ন্ত্রণ",
    authors: "Shahina Sultana, Engr. Kabir Hossain",
    affiliations: "Agri-Youth Fellowship Taskforce & BSMRAU Precision Farming Lab",
    category: "STUDENT_INNOVATION",
    categoryLabel: "Smart Agri-Tech",
    volume: "Vol. 3",
    issue: "No. 1",
    year: "2025",
    doi: "10.5529/naoj.v3i1.202504",
    abstractText:
      "Design and field deployment of low-cost ESP32 microcontroller arrays measuring volumetric water content at 15cm and 30cm root depths in Rajshahi. Achieves 40% reduction in groundwater extraction for high-value winter vegetables.",
    abstractBn:
      "রাজশাহীর বরেন্দ্র অঞ্চলে ভূগর্ভস্থ পানির অপচয় রোধে স্বল্পমূল্যের মাইক্রোকন্ট্রোলার ও আর্দ্রতা সেন্সর দিয়ে তৈরি স্বয়ংক্রিয় সেচ ব্যবস্থার মাঠ প্রয়োগ সমীক্ষা।",
  },
  {
    id: "art-04",
    title: "Policy Whitepaper: Engaging Gen-Z in Smart Agro-Entrepreneurship & Precision Agriculture in Bangladesh",
    titleBn: "পলিসি রূপরেখা: বাংলাদেশে আধুনিক কৃষি উদ্যোক্তা ও প্রিসিশন কৃষিতে তরুণ প্রজন্মের সম্পৃক্তকরণ",
    authors: "National Academic Council, National Agricultural Olympiad",
    affiliations: "Secretariat Working Group & Bangladesh Agricultural University",
    category: "EDITORIAL",
    categoryLabel: "National Whitepaper",
    volume: "Vol. 3",
    issue: "No. 1",
    year: "2025",
    doi: "10.5529/naoj.v3i1.202501",
    abstractText:
      "A strategic policy roadmap addressing the transition from subsistence cultivation to high-technology agribusiness, advocating for national curricula integration of agricultural science, seed-capital access, and Olympiad fellowships.",
    abstractBn:
      "ঐতিহ্যবাহী চাষাবাদ থেকে প্রযুক্তিনির্ভর এগ্রি-ব্যবসা রূপান্তরে জাতীয় শিক্ষাক্রম সংস্কার, যুব উদ্যোক্তা তহবিল এবং কৃষি অলিম্পিয়াড নেটওয়ার্কের ভূমিকা শীর্ষক জাতীয় রূপরেখা।",
  },
];

export default function JournalDirectoryPage() {
  const [lang, setLang] = useState<"en" | "bn">("en");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("ALL");

  const filteredArticles = SAMPLE_ARTICLES.filter((art) => {
    const matchesFilter = selectedFilter === "ALL" || art.category === selectedFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      art.title.toLowerCase().includes(q) ||
      art.titleBn.includes(q) ||
      art.authors.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-amber-500/20 transition-colors">
      {/* Institutional Top Header */}
      <InstitutionalHeader lang={lang} onToggleLang={() => setLang(lang === "en" ? "bn" : "en")} />

      {/* Hero Header */}
      <section className="relative border-b border-border bg-muted/20 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-semibold mb-3">
            <BookOpen className="w-3.5 h-3.5 text-amber-500" />
            <span>ISSN: 2959-8812 (Online) · Peer-Reviewed Youth Research Review</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-serif text-foreground">
            {lang === "en"
              ? "Bangladesh Youth Agricultural Science Review"
              : "জাতীয় কৃষিবিজ্ঞান ও তরুণ উদ্ভাবন গবেষণা জার্নাল"}
          </h1>

          <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-3xl leading-relaxed">
            {lang === "en"
              ? "The official scientific research organ of the National Agricultural Olympiad, publishing peer-reviewed research papers, smart farming prototypes, and agricultural policy whitepapers authored by students, fellows, and university faculty."
              : "জাতীয় কৃষি অলিম্পিয়াডের অফিসিয়াল গবেষণা জার্নাল। স্কুল-কলেজের বিজয়ী শিক্ষার্থী, যুব গবেষক এবং কৃষি বিশ্ববিদ্যালয়ের শিক্ষকদের উদ্ভাবনী কৃষি গবেষণা ও পলিসি বিশ্লেষণ নিয়মিত প্রকাশ করা হয়।"}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4 text-xs font-mono text-muted-foreground">
            <span className="p-2 rounded-lg bg-card border border-border">
              Indexed in CrossRef, AGRI-RES, and Google Scholar
            </span>
            <span className="p-2 rounded-lg bg-card border border-border">
              Trade License: 03247/2023-2025
            </span>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <div className="border-b border-border bg-card/60 backdrop-blur-md sticky top-20 z-30">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={lang === "en" ? "Search papers by title or author..." : "গবেষণা পত্র বা লেখক অনুসন্ধান..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-background border border-border text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1">
            {[
              { key: "ALL", label: "All Papers" },
              { key: "STUDENT_INNOVATION", label: "Olympiad Winners" },
              { key: "FIELD_RESEARCH", label: "Field Trials" },
              { key: "EDITORIAL", label: "Policy Whitepapers" },
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => setSelectedFilter(f.key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedFilter === f.key
                    ? "bg-[#0F5132] text-white shadow-sm"
                    : "bg-muted border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Articles Listing */}
      <main className="max-w-6xl mx-auto px-6 py-12 flex-1 w-full space-y-6">
        {filteredArticles.map((art) => (
          <Card
            key={art.id}
            className="bg-card border border-border hover:border-emerald-500/40 rounded-3xl p-6 sm:p-8 transition-all shadow-sm"
          >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-3">
                <div className="flex items-center gap-2">
                  <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                    {art.categoryLabel}
                  </Badge>
                  <span className="text-xs text-muted-foreground font-mono">
                    {art.volume} · {art.issue} ({art.year})
                  </span>
                </div>
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                  DOI: {art.doi}
                </span>
              </div>

              <div className="pt-4 space-y-2">
                <h2 className="text-xl sm:text-2xl font-bold font-serif text-foreground hover:text-emerald-600 transition-colors">
                  {lang === "en" ? art.title : art.titleBn}
                </h2>
                <div className="text-xs font-medium text-emerald-700 dark:text-emerald-400 font-mono">
                  {art.authors}
                </div>
                <div className="text-[11px] text-muted-foreground">{art.affiliations}</div>
              </div>

              {/* Collapsible Abstract */}
              <div className="pt-4">
                <div className="p-4 rounded-2xl bg-muted/50 border border-border text-xs leading-relaxed">
                  <div className="font-bold text-foreground mb-1">
                    {lang === "en" ? "Scientific Abstract:" : "সারসংক্ষেপ:"}
                  </div>
                  <p className="text-muted-foreground">
                    {lang === "en" ? art.abstractText : art.abstractBn}
                  </p>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => alert(`Downloading peer-reviewed paper: ${art.doi}`)}
                  className="text-xs font-bold gap-1.5 border-border text-foreground hover:bg-muted"
                >
                  <Download className="w-3.5 h-3.5 text-amber-500" />
                  Download Full PDF
                </Button>

                <div className="text-[11px] text-muted-foreground font-mono">
                  Open Access · Creative Commons CC-BY 4.0
                </div>
              </div>
            </Card>
          ))}
      </main>

      {/* Institutional Footer */}
      <InstitutionalFooter lang={lang} />
    </div>
  );
}
