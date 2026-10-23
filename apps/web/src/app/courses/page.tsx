"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Clock,
  Video,
  Award,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Button, Badge, Card, CardContent } from "@org/ui";
import { InstitutionalHeader } from "@/components/layout/institutional-header";
import { InstitutionalFooter } from "@/components/layout/institutional-footer";

interface CourseItem {
  id: string;
  title: string;
  titleBn: string;
  category: "JUNIOR" | "SECONDARY" | "HIGHER_SECONDARY" | "AGRI_TECH";
  categoryLabel: string;
  categoryLabelBn: string;
  priceBdt: number;
  durationHours: number;
  lessonsCount: number;
  description: string;
  descriptionBn: string;
  features: string[];
  featuresBn: string[];
  instructor: string;
  instructorTitle: string;
}

const COURSES: CourseItem[] = [
  {
    id: "course-1",
    title: "Foundations of Smart Agriculture & Hydroponics",
    titleBn: "স্মার্ট কৃষি ও হাইড্রোপনিক্স পরিচিতি",
    category: "JUNIOR",
    categoryLabel: "Junior Class (Grades 6–8)",
    categoryLabelBn: "জুনিয়র শ্রেণি (৬ষ্ঠ–৮ম)",
    priceBdt: 150,
    durationHours: 12,
    lessonsCount: 10,
    description: "An engaging beginner-friendly course introducing modern soilless farming, nutrient solutions, and urban micro-farming for younger students.",
    descriptionBn: "মাটিবিহীন চাষাবাদ, পুষ্টি দ্রবণ এবং নগর কৃষির আধুনিক কলাকৌশল নিয়ে জুনিয়র শিক্ষার্থীদের জন্য সহজবোধ্য কোর্স।",
    features: ["10 Interactive Video Lessons", "Hands-on DIY Hydroponic Guide", "Quiz & Completion Certificate", "Olympiad Syllabus Aligned"],
    featuresBn: ["১০টি ভিডিও ক্লাস", "ব্যবহারিক প্রজেক্ট গাইড", "কুইজ ও সার্টিফিকেট", "অলিম্পিয়াড সিলেবাস সংশ্লিষ্ট"],
    instructor: "Dr. Farhana Yasmin",
    instructorTitle: "Senior Researcher, Horticulture Research Center",
  },
  {
    id: "course-2",
    title: "Climate-Resilient Crop Management & Soil Health",
    titleBn: "জলবায়ু সহনশীল শস্য ব্যবস্থাপনা ও মৃত্তিকা স্বাস্থ্য",
    category: "SECONDARY",
    categoryLabel: "Secondary Class (Grades 9–10)",
    categoryLabelBn: "মাধ্যমিক শ্রেণি (৯ম–১০ম)",
    priceBdt: 250,
    durationHours: 18,
    lessonsCount: 15,
    description: "Master techniques for managing saline, drought, and flood-prone agricultural ecosystems, soil biome enrichment, and integrated pest management.",
    descriptionBn: "লবণাক্ততা ও খরা সহনশীল জাত, মাটির গুণাগুণ রক্ষা এবং পরিবেশবান্ধব বালাইনাশক ব্যবস্থাপনার বিস্তারিত গাইড।",
    features: ["15 In-depth Lecture Modules", "Case Studies on Coastal Agriculture", "Field Research Assignment", "Official Digital Certificate"],
    featuresBn: ["১৫টি বিস্তারিত লেকচার", "উপকূলীয় কৃষি কেস স্টাডি", "ফিল্ড রিসার্চ অ্যাসাইনমেন্ট", "ডিজিটাল সনদপত্র"],
    instructor: "Prof. Md. Rafiqul Islam",
    instructorTitle: "Department of Agronomy, BAU Mymensingh",
  },
  {
    id: "course-3",
    title: "Agricultural Biotechnology & Genetic Improvement",
    titleBn: "কৃষি বায়োটেকনোলজি ও জেনেটিক উন্নয়ন",
    category: "HIGHER_SECONDARY",
    categoryLabel: "Higher Secondary (Grades 11–12 & HSC)",
    categoryLabelBn: "উচ্চ মাধ্যমিক (১১শ–১২শ ও এইচএসসি)",
    priceBdt: 350,
    durationHours: 24,
    lessonsCount: 20,
    description: "Deep-dive into plant tissue culture, molecular markers, CRISPR applications in crop science, and sustainable genetic engineering.",
    descriptionBn: "উদ্ভিদ টিস্যু কালচার, মলিকুলার মার্কার এবং ফসলের জাত উন্নয়নে বায়োটেকনোলজির আধুনিক প্রয়োগ।",
    features: ["20 Advanced Scientific Modules", "Virtual Lab Demonstrations", "Research Paper Reading Guide", "Accredited Certificate"],
    featuresBn: ["২০টি অ্যাডভান্সড মডিউল", "ভার্চুয়াল ল্যাব ডেমো", "গবেষণা প্রবন্ধ পর্যালোচনা", "যাচাইযোগ্য সনদ"],
    instructor: "Dr. Tanzina Akhter",
    instructorTitle: "Biotechnology & Genetic Engineering Institute",
  },
  {
    id: "course-4",
    title: "Agribusiness Leadership, Cold-Chain & Value Networks",
    titleBn: "কৃষি ব্যবসা, কোল্ড-চেইন ও সাপ্লাই চেইন নেটওয়ার্ক",
    category: "AGRI_TECH",
    categoryLabel: "Agri-Tech & University Cohort",
    categoryLabelBn: "কৃষি প্রযুক্তি ও বিশ্ববিদ্যালয় পর্যায়",
    priceBdt: 400,
    durationHours: 26,
    lessonsCount: 22,
    description: "Explore market linkage mechanisms, post-harvest loss minimization, smart cold-chain sensor logistics, and agricultural startup models.",
    descriptionBn: "কৃষি পণ্যের সঠিক বাজারজাতকরণ, কোল্ড চেইন প্রযুক্তি ও আধুনিক এগ্রি-বিজনেস স্টার্টআপ ব্যবস্থাপনা।",
    features: ["22 Comprehensive Industry Modules", "Cold-Chain Logistics Frameworks", "Startup Pitch Deck Template", "Executive Credential"],
    featuresBn: ["২২টি শিল্পমানের মডিউল", "লজিস্টিক ফ্রেমওয়ার্ক", "স্টার্টআপ পিচ ডেক টেমপ্লেট", "এক্সিকিউটিভ ক্রেডেনশিয়াল"],
    instructor: "Engr. Kamrul Hasan",
    instructorTitle: "Agri-Logistics Specialist & Supply Chain Advisor",
  },
  {
    id: "course-5",
    title: "National Olympiad Exam Prep & Problem-Solving Masterclass",
    titleBn: "জাতীয় কৃষি অলিম্পিয়াড প্রস্তুতি ও সমস্যা সমাধান মাস্টারক্লাস",
    category: "JUNIOR",
    categoryLabel: "All Competition Tiers",
    categoryLabelBn: "সকল ক্যাটাগরির জন্য উন্মুক্ত",
    priceBdt: 200,
    durationHours: 14,
    lessonsCount: 12,
    description: "Intensive preparatory course analyzing past season questions, model test simulations, and high-scoring techniques across all rounds.",
    descriptionBn: "পূর্ববর্তী সিজনের প্রশ্ন বিশ্লেষণ, মডেল টেস্ট এবং অলিম্পিয়াডে শীর্ষ স্থান অর্জনের কৌশল নিয়ে বিশেষ প্রস্তুতি কোর্স।",
    features: ["12 Model Test Question Sets", "Detailed Answer Explanations", "Live Doubt-Clearing Access", "Admit Card Exam Tips"],
    featuresBn: ["১২টি মডেল টেস্ট সেট", "বিস্তারিত সমাধান পর্যালোচনা", "সরাসরি প্রশ্নোত্তরের সুযোগ", "পরীক্ষার বিশেষ দিকনির্দেশনা"],
    instructor: "National Academic Panel",
    instructorTitle: "Bangladesh Agricultural Olympiad Advisory Council",
  },
];

export default function CoursesCatalogPage() {
  const [lang, setLang] = useState<"en" | "bn">("en");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const filteredCourses = selectedCategory === "ALL"
    ? COURSES
    : COURSES.filter((c) => c.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-amber-500/30 selection:text-foreground">
      <InstitutionalHeader lang={lang} onToggleLang={() => setLang((prev) => (prev === "en" ? "bn" : "en"))} />

      <main className="flex-1 max-w-7xl mx-auto px-6 py-12 w-full space-y-10">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            {lang === "en" ? "Academic Curriculum" : "একাডেমিক কারিকুলাম"}
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
            {lang === "en" ? (
              <>
                Agricultural Skill Courses{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-amber-500">
                  in BDT (৳)
                </span>
              </>
            ) : (
              <>
                আধুনিক কৃষি দক্ষতা কোর্সসমূহ{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-amber-500">
                  (বিডিটি / ৳)
                </span>
              </>
            )}
          </h1>

          <p className="text-sm text-muted-foreground leading-relaxed">
            {lang === "en"
              ? "Gain accredited knowledge in climate-resilient farming, crop biotechnology, and agribusiness. All course fees are stated in Bangladeshi Taka (BDT) and payable via SSLCommerz."
              : "আধুনিক স্মার্ট ফার্মিং, জলবায়ু সহনশীল কৃষি এবং বায়োটেকনোলজির উপর দেশের শীর্ষ গবেষক ও অধ্যাপকদের পরিচালিত কোর্স। সকল ফি বাংলাদেশি টাকায় (BDT) ধার্যকৃত।"}
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {[
            { id: "ALL", label: lang === "en" ? "All Courses" : "সকল কোর্স" },
            { id: "JUNIOR", label: lang === "en" ? "Junior (Grades 6–8)" : "জুনিয়র (৬ষ্ঠ–৮ম)" },
            { id: "SECONDARY", label: lang === "en" ? "Secondary (Grades 9–10)" : "মাধ্যমিক (৯ম–১০ম)" },
            { id: "HIGHER_SECONDARY", label: lang === "en" ? "Higher Secondary (11–12)" : "উচ্চ মাধ্যমিক (১১শ–১২শ)" },
            { id: "AGRI_TECH", label: lang === "en" ? "Agri-Tech & Agribusiness" : "কৃষি প্রযুক্তি ও ব্যবসা" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat.id
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/25"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="border-border bg-card flex flex-col hover:border-emerald-500/40 hover:shadow-lg transition-all group">
              <CardContent className="p-6 flex flex-col flex-1 space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <Badge variant="outline" className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 border-emerald-500/30 bg-emerald-500/10">
                    {lang === "en" ? course.categoryLabel : course.categoryLabelBn}
                  </Badge>

                  {/* Explicit BDT Price Tag */}
                  <div className="text-right">
                    <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                      BDT {course.priceBdt}.00
                    </span>
                    <span className="block text-[10px] text-muted-foreground font-mono">
                      (৳ {course.priceBdt})
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-bold text-foreground group-hover:text-emerald-600 transition-colors">
                    {lang === "en" ? course.title : course.titleBn}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {lang === "en" ? course.description : course.descriptionBn}
                  </p>
                </div>

                {/* Course Metadata */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground border-y border-border py-2.5">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    <span>{course.durationHours} Hours</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Video className="w-3.5 h-3.5 text-blue-500" />
                    <span>{course.lessonsCount} Lessons</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-purple-500" />
                    <span>Certificate</span>
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-1.5 text-xs text-foreground/85 flex-1">
                  {(lang === "en" ? course.features : course.featuresBn).map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Instructor */}
                <div className="pt-2 text-[11px] text-muted-foreground">
                  <div className="font-semibold text-foreground">{course.instructor}</div>
                  <div className="truncate">{course.instructorTitle}</div>
                </div>

                {/* Action CTA */}
                <Link href={`/apply?courseId=${course.id}&fee=${course.priceBdt}`}>
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                  >
                    <span>{lang === "en" ? `Enroll Now · BDT ${course.priceBdt}` : `এনরোল করুন · ${course.priceBdt} ৳`}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <InstitutionalFooter lang={lang} />
    </div>
  );
}
