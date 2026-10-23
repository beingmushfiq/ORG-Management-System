"use client";

import React, { useState } from "react";
import { Flower2, Sprout } from "lucide-react";
import { Button, useToast, Badge } from "@org/ui";
import { InstitutionalHeader } from "@/components/layout/institutional-header";
import { InstitutionalFooter } from "@/components/layout/institutional-footer";
import { soundEffects } from "@/lib/audio-effects";

interface MemorialProfile {
  id: string;
  name: string;
  nameBn: string;
  lifeSpan: string;
  lifeSpanBn: string;
  designation: string;
  designationBn: string;
  specialty: string;
  branch: string;
  biography: string;
  biographyBn: string;
  tributesCount: number;
}

const MEMORIAL_ROSTER: MemorialProfile[] = [
  {
    id: "mem-01",
    name: "Dr. Kazi M. Badruddoza",
    nameBn: "ড. কাজী এম বদরুদ্দোজা",
    lifeSpan: "1927 – 2023",
    lifeSpanBn: "১৯২৭ – ২০২৩",
    designation: "Father of Modern Agricultural Research in Bangladesh",
    designationBn: "বাংলাদেশের আধুনিক কৃষি গবেষণার জনক ও পথিকৃৎ বিজ্ঞানী",
    specialty: "Plant Genetics & Breeder of 'Kazi Peyara'",
    branch: "BARI, Gazipur & BAU Mymensingh",
    biography:
      "Renowned plant breeder, former Director General of BARI, and founding architect of modern agricultural research institutes in Bangladesh. Best remembered for developing the high-yield 'Kazi Peyara' and introducing disease-resistant wheat varieties during national food security crises.",
    biographyBn:
      "বাংলাদেশের কৃষি গবেষণার প্রাণপুরুষ, বারির প্রতিষ্ঠাতা মহাপরিচালক এবং বিশ্বখ্যাত 'কাজী পেয়ারা'র উদ্ভাবক। দেশে উচ্চফলনশীল গম ও ফলমূল গবেষণায় তাঁর অবদান চিরভাস্বর।",
    tributesCount: 14200,
  },
  {
    id: "mem-02",
    name: "Dr. Maqsudul Alam",
    nameBn: "ড. মাকসুদুল আলম",
    lifeSpan: "1954 – 2014",
    lifeSpanBn: "১৯৫৪ – ২০১৪",
    designation: "Pioneering Genomic Scientist & Decoder of Jute Genome",
    designationBn: "পাটের জীবনরহস্য (জিনোম) উন্মোচনকারী বিশ্ববরেণ্য জীববিজ্ঞানী",
    specialty: "Plant Genomics & Molecular Biology",
    branch: "National Jute Genome Project, Dhaka",
    biography:
      "Visionary molecular biologist who decoded the genome sequence of tossa jute (Corchorus olitorius) and the harmful fungus Macrophomina phaseolina, placing Bangladesh prominently on the global biotechnology map.",
    biographyBn:
      "তোষা পাটের জিনোম সিকোয়েন্স সফলভাবে উন্মোচন করে বিশ্বমঞ্চে বাংলাদেশের বিজ্ঞানের সক্ষমতা প্রমাণকারী বরেণ্য জিনবিজ্ঞানী।",
    tributesCount: 18500,
  },
  {
    id: "mem-03",
    name: "Sir Jagadish Chandra Bose",
    nameBn: "স্যার জগদীশ চন্দ্র বসু",
    lifeSpan: "1858 – 1937",
    lifeSpanBn: "১৮৫৮ – ১৯৩৭",
    designation: "Pioneer of Plant Physiology & Biophysics",
    designationBn: "উদ্ভিদ শারীরতত্ত্ব ও আধুনিক জীবপদার্থবিজ্ঞানের পথিকৃৎ",
    specialty: "Crescograph & Plant Response Measurement",
    branch: "Bikrampur & Bengal Academic Heritage",
    biography:
      "Polymath and biologist who invented the crescograph to measure microscopic plant responses to external stimuli, conclusively demonstrating that plants possess sensitive physiological response mechanisms analogous to animals.",
    biographyBn:
      "ক্রেসকোগ্রাফ আবিষ্কারের মাধ্যমে উদ্ভিদের প্রাণ ও সংবেদনশীলতা বৈজ্ঞানিকভাবে প্রমাণকারী অবিভক্ত বাংলার শ্রেষ্ঠ বিজ্ঞানী।",
    tributesCount: 24000,
  },
];

export default function MemorialPage() {
  const [lang, setLang] = useState<"en" | "bn">("en");
  const [roster, setRoster] = useState(MEMORIAL_ROSTER);
  const { success } = useToast();

  const handlePayTribute = (id: string, name: string) => {
    soundEffects.playRatification();
    setRoster((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, tributesCount: item.tributesCount + 1 } : item
      )
    );
    success(
      lang === "en" ? "Floral Tribute Placed" : "শ্রদ্ধাঞ্জলি অর্পণ সম্পন্ন",
      lang === "en"
        ? `You offered respect to the enduring legacy of ${name}.`
        : `${name} এর অমর স্মৃতির প্রতি গভীর শ্রদ্ধা জানানো হলো।`
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-amber-500/20 transition-colors">
      {/* Institutional Top Header */}
      <InstitutionalHeader lang={lang} onToggleLang={() => setLang(lang === "en" ? "bn" : "en")} />

      {/* Hero Header */}
      <section className="relative border-b border-border bg-muted/20 py-16 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-semibold">
            <Sprout className="w-3.5 h-3.5 text-amber-500" />
            {lang === "en" ? "Hall of Agricultural Pioneers & Legends" : "কৃষি পথিকৃৎ স্মারক শ্রদ্ধাঞ্জলি"}
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-serif text-foreground">
            {lang === "en" ? "Pioneers of Agricultural Science" : "বাংলার কৃষিবিজ্ঞানের দিকপাল ও পথিকৃৎ বিজ্ঞানী"}
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {lang === "en"
              ? "Honoring the legendary scientists and breeders whose groundbreaking discoveries in plant physiology, genomics, and crop breeding built the foundation of Bangladesh's food security."
              : "উদ্ভিদ শারীরতত্ত্ব, জিনোম সিকোয়েন্স এবং উচ্চফলনশীল জাত উদ্ভাবনে যে বরেণ্য বিজ্ঞানীরা বাংলাদেশের খাদ্য সুরক্ষার ভিত্তি গড়ে দিয়েছিলেন, তাঁদের প্রতি জাতীয় কৃষি অলিম্পিয়াডের বিনম্র শ্রদ্ধা।"}
          </p>
        </div>
      </section>

      {/* Roster of Agricultural Pioneers */}
      <main className="max-w-5xl mx-auto px-6 py-14 flex-1 w-full space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {roster.map((pioneer) => (
            <div
              key={pioneer.id}
              className="rounded-3xl bg-card border border-border hover:border-emerald-500/50 p-6 flex flex-col justify-between space-y-5 shadow-sm hover:shadow-md transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                  <Badge variant="outline" className="text-[10px] font-bold border-emerald-500/30 text-emerald-700 dark:text-emerald-400">
                    {pioneer.specialty}
                  </Badge>
                  <span>{lang === "en" ? pioneer.lifeSpan : pioneer.lifeSpanBn}</span>
                </div>

                <div>
                  <h3 className="text-xl font-bold font-serif text-foreground">
                    {lang === "en" ? pioneer.name : pioneer.nameBn}
                  </h3>
                  <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 font-bangla mt-0.5">
                    {lang === "en" ? pioneer.designation : pioneer.designationBn}
                  </p>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {lang === "en" ? pioneer.biography : pioneer.biographyBn}
                </p>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between">
                <span className="text-xs font-mono text-muted-foreground">
                  {pioneer.tributesCount.toLocaleString()} {lang === "en" ? "Tributes" : "শ্রদ্ধাঞ্জলি"}
                </span>

                <Button
                  size="sm"
                  onClick={() => handlePayTribute(pioneer.id, pioneer.name)}
                  className="bg-[#0F5132] hover:bg-[#0c4028] text-white text-xs font-bold gap-1.5 shadow-sm"
                >
                  <Flower2 className="w-3.5 h-3.5 text-amber-400" />
                  {lang === "en" ? "Offer Tribute" : "শ্রদ্ধাঞ্জলি"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Institutional Footer */}
      <InstitutionalFooter lang={lang} />
    </div>
  );
}
