"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sprout,
  Award,
  ArrowRight,
  MapPin,
  PhoneCall,
  Mail,
  CheckCircle2,
  Building,
  GraduationCap,
} from "lucide-react";
import { Button, Card, CardContent } from "@org/ui";
import { InstitutionalHeader } from "@/components/layout/institutional-header";
import { InstitutionalFooter } from "@/components/layout/institutional-footer";

export default function AboutUsPage() {
  const [lang, setLang] = useState<"en" | "bn">("en");

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-amber-500/30 selection:text-foreground">
      <InstitutionalHeader lang={lang} onToggleLang={() => setLang((prev) => (prev === "en" ? "bn" : "en"))} />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 px-6 max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6">
            <Sprout className="w-4 h-4" />
            {lang === "en" ? "Our Story & Vision" : "আমাদের গল্প ও লক্ষ্য"}
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-foreground tracking-tight max-w-4xl mx-auto leading-tight">
            {lang === "en" ? (
              <>
                Inspiring the Next Generation of{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-amber-500">
                  Agricultural Innovators
                </span>
              </>
            ) : (
              <>
                টেকসই কৃষির রূপান্তরে{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-amber-500">
                  তরুণ প্রজন্মের মেধা ও নেতৃত্ব
                </span>
              </>
            )}
          </h1>

          <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {lang === "en"
              ? "The National Agricultural Olympiad is Bangladesh's pioneering nationwide competition and youth empowerment movement, dedicated to transforming smart farming, climate resilience, and food systems through scientific education."
              : "জাতীয় কৃষি অলিম্পিয়াড বাংলাদেশের সর্ববৃহৎ কৃষিভিত্তিক মেধা অন্বেষণ প্ল্যাটফর্ম—যা আধুনিক কৃষি প্রযুক্তি, জলবায়ু অভিযোজন এবং খাদ্য সুরক্ষায় শিক্ষার্থীদের সম্পৃক্ত করতে কাজ করে যাচ্ছে।"}
          </p>
        </section>

        {/* Mission & Story Breakdown */}
        <section className="py-12 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-extrabold text-foreground tracking-tight">
                {lang === "en" ? "Our Mission & Journey" : "আমাদের মিশন ও পথচলা"}
              </h2>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {lang === "en"
                  ? "Founded by a dedicated coalition of young agriculturists, academic researchers, and youth activists, the National Agricultural Olympiad was born to bridge the gap between traditional agricultural education and cutting-edge biotechnology, smart farming, and climate resilience."
                  : "তরুণ কৃষিবিদ, গবেষক এবং শিক্ষার্থীদের উদ্যোগে গঠিত এই অলিম্পিয়াড বাংলাদেশের কৃষিকে সনাতন ধারণা থেকে বের করে আধুনিক বায়োটেকনোলজি, স্মার্ট ফার্মিং এবং জলবায়ু সহনশীল প্রযুক্তির দিকে এগিয়ে নিতে অগ্রণী ভূমিকা পালন করছে।"}
              </p>

              <div className="space-y-3">
                {[
                  lang === "en"
                    ? "Over 25,000+ participating students across 64 administrative districts"
                    : "৬৪টি জেলা থেকে ২৫,০০০+ শিক্ষার্থীর সক্রিয় অংশগ্রহণ",
                  lang === "en"
                    ? "Academic partnerships with Bangladesh Agricultural University (BAU) & research institutions"
                    : "বাংলাদেশ কৃষি বিশ্ববিদ্যালয় (বাকৃবি) সহ শীর্ষ গবেষণা প্রতিষ্ঠানের সাথে প্রাতিষ্ঠানিক সম্পৃক্ততা",
                  lang === "en"
                    ? "Cash prizes, laptops, study tours to National Agricultural Research Centers"
                    : "নগদ অর্থ পুরস্কার, ল্যাপটপ এবং জাতীয় কৃষি গবেষণা কেন্দ্রে বিশেষ শিক্ষা সফরের সুযোগ",
                  lang === "en"
                    ? "Structured curriculum tailored for Classes 6 through 12 and university cohorts"
                    : "৬ষ্ঠ থেকে ১২শ শ্রেণি এবং বিশ্ববিদ্যালয় পর্যায়ের জন্য বিশেষভাবে প্রণীত সিলেবাস",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link href="/apply">
                  <Button variant="primary" size="lg" className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold">
                    <span>{lang === "en" ? "Join Season 2025 (BDT 70)" : "২০২৫ সিজনে নিবন্ধন করুন (৭০ ৳)"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Strategic Pillars Card Showcase */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="border-border bg-card">
                <CardContent className="p-6 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                    <Sprout className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-foreground">
                    {lang === "en" ? "Climate-Smart Ag" : "জলবায়ু-সহনশীল কৃষি"}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Educating students on hydroponics, vertical farming, salinity-tolerant cultivars, and ecological conservation.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardContent className="p-6 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600">
                    <Award className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-foreground">
                    {lang === "en" ? "National Recognition" : "জাতীয় স্বীকৃতি ও পুরস্কার"}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Top performers receive prestigious trophies, government research grants, and accredited digital credentials.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardContent className="p-6 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-foreground">
                    {lang === "en" ? "Youth Leadership" : "কৃষি নেতৃত্ব বিকাশ"}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Empowering university ambassadors and school coordinators across Bangladesh to build grassroots science clubs.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardContent className="p-6 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600">
                    <Building className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-foreground">
                    {lang === "en" ? "64-District Reach" : "৬৪ জেলা নেটওয়ার্ক"}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Decentralized regional preliminary examinations hosted simultaneously across all administrative divisions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Official Governance & Statutory Compliance Box */}
        <section className="py-12 px-6 max-w-7xl mx-auto">
          <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-card to-amber-500/10 border-2 border-emerald-500/30 space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 font-mono">
                  Official Entity & Licensing Declaration
                </span>
                <h3 className="text-2xl font-extrabold text-foreground mt-1">
                  National Secretariat & Statutory Compliance
                </h3>
              </div>
              <div className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 font-mono text-xs font-bold border border-emerald-500/30">
                Trade License No: 03247/2023-2025
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-border text-xs">
              <div className="space-y-1">
                <div className="font-semibold text-foreground flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span>Physical Secretariat</span>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  House 04, Road 12/b, Sector 10,
                  <br />
                  Uttara Model Town, Dhaka, Bangladesh
                </p>
              </div>

              <div className="space-y-1">
                <div className="font-semibold text-foreground flex items-center gap-1.5">
                  <PhoneCall className="w-4 h-4 text-amber-600" />
                  <span>Hotline & WhatsApp</span>
                </div>
                <p className="text-muted-foreground font-mono font-bold">
                  +880 1717-395047
                </p>
                <p className="text-[11px] text-muted-foreground">Available Saturday–Thursday, 9:00 AM – 6:00 PM</p>
              </div>

              <div className="space-y-1">
                <div className="font-semibold text-foreground flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <span>Official Inquiries</span>
                </div>
                <p className="text-muted-foreground break-all">
                  agriculturalolympiad@gmail.com
                </p>
                <p className="text-[11px] text-muted-foreground">support@agriolympiad.com</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <InstitutionalFooter lang={lang} />
    </div>
  );
}
