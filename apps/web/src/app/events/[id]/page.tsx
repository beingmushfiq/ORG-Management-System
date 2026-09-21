"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Clock,
  Award,
  CheckCircle2,
  QrCode,
  Ticket,
  Printer,
} from "lucide-react";
import { Button, Badge, Card, CardContent } from "@org/ui";
import Link from "next/link";

export default function EventProgramDetailPage() {
  const [lang, setLang] = useState<"en" | "bn">("en");
  const [memberIdInput, setMemberIdInput] = useState("BMA-DHK-1004");
  const [showPassModal, setShowPassModal] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPassModal(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500/20">
      {/* Navigation Header */}
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-slate-950/85 backdrop-blur-2xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/events"
            className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-amber-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {lang === "en" ? "Back to All Conferences" : "সম্মেলন তালিকায় ফিরুন"}
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === "en" ? "bn" : "en")}
              className="px-3 py-1 rounded-lg border border-white/10 text-xs font-semibold hover:border-amber-400/50 transition-colors"
            >
              {lang === "en" ? "বাংলা" : "English"}
            </button>
            <Button
              onClick={() => setShowPassModal(true)}
              size="sm"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold gap-1.5 text-xs"
            >
              <Ticket className="w-3.5 h-3.5" />
              {lang === "en" ? "My Delegate Pass" : "প্রতিনিধি পাস"}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="relative border-b border-white/10 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold">
              {lang === "en" ? "National Assembly & Congress" : "জাতীয় সাধারণ সভা ও বৈজ্ঞানিক অধিবেশন"}
            </Badge>
            <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              <Award className="w-3.5 h-3.5" />
              8.0 BMDC CPD Accredited Credits
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif text-white tracking-tight leading-tight">
            {lang === "en"
              ? "74th National Annual General Meeting & Scientific Congress 2026"
              : "৭৪তম জাতীয় বার্ষিক সাধারণ সভা ও বৈজ্ঞানিক সম্মেলন ২০২৬"}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>{lang === "en" ? "Friday & Saturday, 06 - 07 November 2026" : "শুক্র ও শনিবার, ০৬ - ০৭ নভেম্বর ২০২৬"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>{lang === "en" ? "08:30 AM - 08:30 PM (BST)" : "সকাল ৮:৩০ - রাত ৮:৩০ (বিএসটি)"}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>
                {lang === "en"
                  ? "Hall of Fame, Bangabandhu International Conference Centre (BICC), Dhaka"
                  : "হল অব ফেম, বঙ্গবন্ধু আন্তর্জাতিক সম্মেলন কেন্দ্র (বিআইসিসি), ঢাকা"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout: Schedule Timeline & Registration Card */}
      <main className="max-w-6xl mx-auto px-6 py-12 flex-1 w-full grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left 8 Cols: Program Timeline & Keynotes */}
        <div className="lg:col-span-8 space-y-10">
          <div>
            <h2 className="text-2xl font-bold font-serif text-white mb-6 flex items-center gap-3">
              <Clock className="w-6 h-6 text-amber-400" />
              {lang === "en" ? "Official Program Schedule & Plenary Sessions" : "অধিবেশনের সময়সূচী ও কার্যবিবরণী"}
            </h2>

            {/* Timeline cards */}
            <div className="relative border-l-2 border-amber-500/30 ml-4 pl-6 space-y-8">
              {[
                {
                  time: "08:30 AM - 09:30 AM",
                  timeBn: "সকাল ০৮:৩০ - ০৯:৩০",
                  title: "Delegate Gate Check-In & Conference Kit Collection",
                  titleBn: "প্রতিনিধি অভ্যর্থনা, কিউআর চেক-ইন ও সম্মেলন কিট গ্রহণ",
                  speaker: "Secretariat Volunteers & Stewards",
                  hall: "Foyer North Entrance",
                  desc: "Scanning of Digital Passes, distribution of delegate badges, meal coupons, and conference abstracts.",
                },
                {
                  time: "09:30 AM - 11:00 AM",
                  timeBn: "সকাল ০৯:৩০ - ১১:০০",
                  title: "Inaugural Plenary & Welcome Address by CEC",
                  titleBn: "উদ্বোধনী অধিবেশন ও কেন্দ্রীয় সভাপতি মহোদয়ের ভাষণ",
                  speaker: "Prof. Dr. Mahmudul Hasan, President, BMA",
                  hall: "Hall of Fame (Main Auditorium)",
                  desc: "Solemn opening prayer, observance of silence in memory of departed colleagues, and Presidential address.",
                },
                {
                  time: "11:00 AM - 01:15 PM",
                  timeBn: "সকাল ১১:০০ - দুপুর ০১:১৫",
                  title: "Scientific Symposia: Innovations in Primary Healthcare & Universal Coverage",
                  titleBn: "বৈজ্ঞানিক সিম্পোজিয়াম: প্রাথমিক স্বাস্থ্যসেবা ও সর্বজনীন চিকিৎসা অধিকার",
                  speaker: "Prof. Dr. A. K. Azad (Keynote) & Panel of Experts",
                  hall: "Milky Way Plenary Hall",
                  desc: "Accredited scientific papers, peer review presentations, and clinical debate.",
                },
                {
                  time: "01:15 PM - 02:30 PM",
                  timeBn: "দুপুর ০১:১৫ - দুপুর ০২:৩০",
                  title: "Jummah Prayers & Grand Delegate Luncheon",
                  titleBn: "জুমার নামাজ বিরতি ও প্রীতি ভোজ",
                  speaker: "Hosted by Standing Committee for Hospitality",
                  hall: "Celebrity Dining Concourse",
                  desc: "Redeem Luncheon Coupon (Token barcode required at dining entrance).",
                },
                {
                  time: "02:30 PM - 05:30 PM",
                  timeBn: "দুপুর ০২:৩০ - বিকাল ০৫:৩০",
                  title: "74th National Annual General Meeting (AGM) Business Session",
                  titleBn: "৭৪তম বার্ষিক সাধারণ সভার রুদ্ধদ্বার মূল অধিবেশন",
                  speaker: "Presided by President & General Secretary",
                  hall: "Hall of Fame",
                  desc: "Adoption of General Secretary Annual Report, Presentation & Audit of Balance Sheet by Treasurer, and Branch Resolutions.",
                },
                {
                  time: "06:00 PM - 08:30 PM",
                  timeBn: "সন্ধ্যা ০৬:০০ - রাত ০৮:৩০",
                  title: "Fellowship Awards, Cultural Gala & Dinner",
                  titleBn: "সম্মাননা পদক প্রদান, সাংস্কৃতিক সন্ধ্যা ও নৈশভোজ",
                  speaker: "Distinguished Guests & Artists",
                  hall: "Harmony Grand Ballroom",
                  desc: "Conferment of National Lifetime Service awards and cultural musical performance.",
                },
              ].map((item, idx) => (
                <div key={idx} className="relative group">
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-amber-400 group-hover:bg-amber-400 transition-colors" />
                  <div className="bg-slate-900/60 border border-white/10 rounded-xl p-5 hover:border-amber-500/30 transition-all">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-mono font-bold text-amber-400">
                        {lang === "en" ? item.time : item.timeBn}
                      </span>
                      <span className="text-xs text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-white/5">
                        {item.hall}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white font-serif">
                      {lang === "en" ? item.title : item.titleBn}
                    </h3>
                    <p className="text-xs text-slate-300 mt-1">{item.desc}</p>
                    <div className="text-xs text-slate-400 mt-2 font-medium">
                      {lang === "en" ? "Lead / Chair: " : "অধিবেশন প্রধান: "}
                      <span className="text-slate-200">{item.speaker}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Registration Form & Delegate Pass Preview */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="bg-slate-900/90 border border-amber-500/30 rounded-2xl shadow-2xl p-6 sticky top-24">
            <CardContent className="p-0 space-y-6">
              <div>
                <Badge className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold mb-2">
                  {lang === "en" ? "Delegate Registration Open" : "প্রতিনিধি নিবন্ধন চলছে"}
                </Badge>
                <h3 className="text-xl font-bold font-serif text-white">
                  {lang === "en" ? "Register Your Attendance" : "সম্মেলন উপস্থিতি নিশ্চিত করুন"}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {lang === "en"
                    ? "Active members receive complimentary entrance pass, lunch coupon, and CPD certificate."
                    : "নবায়নকৃত সক্রিয় সদস্যদের জন্য সম্মেলন কিট ও দুপুরের খাবার সহ সম্পূর্ণ কমপ্লিমেন্টারি।"}
                </p>
              </div>

              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="text-xs text-slate-300 font-semibold block mb-1">
                    {lang === "en" ? "BMA Membership Registration No." : "বিএমএ সদস্য নম্বর"}
                  </label>
                  <input
                    type="text"
                    required
                    value={memberIdInput}
                    onChange={(e) => setMemberIdInput(e.target.value)}
                    placeholder="e.g. BMA-DHK-1004"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-white/5 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>{lang === "en" ? "Delegate Category:" : "সদস্য শ্রেণী:"}</span>
                    <span className="text-white font-bold">General / Life Member</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>{lang === "en" ? "Annual Dues Standing:" : "বার্ষিক চাঁদা স্থিতি:"}</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Fully Cleared
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>{lang === "en" ? "Registration Fee:" : "নিবন্ধন ফি:"}</span>
                    <span className="text-white font-bold">৳0.00 (Complimentary)</span>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs py-3">
                  {lang === "en" ? "Confirm & Issue Conference Pass" : "নিশ্চিত করুন ও পাস গ্রহণ করুন"}
                </Button>
              </form>

              {/* Gate Pass Modal Trigger / Info */}
              <div className="pt-4 border-t border-white/10 text-center">
                <div className="text-xs text-slate-400">
                  {lang === "en"
                    ? "Gate stewards will scan your digital QR pass to dispense lunch coupons & gift bags."
                    : "প্রবেশদ্বারে কিউআর স্ক্যান করে সম্মেলন কিট ও মধ্যাহ্নভোজ কুপন সংগ্রহ করুন।"}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Delegate QR Pass Modal */}
      {showPassModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-amber-500/40 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 relative animate-in fade-in zoom-in duration-200">
            <div className="text-center space-y-2">
              <Badge className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-bold">
                OFFICIAL DELEGATE PASS • 2026
              </Badge>
              <h3 className="text-xl font-bold font-serif text-white">
                74th National Annual General Meeting
              </h3>
              <div className="text-xs text-slate-400">Bangabandhu International Conference Centre</div>
            </div>

            {/* Card representation with QR */}
            <div className="bg-slate-950 border border-white/10 rounded-2xl p-6 text-center space-y-4">
              <div className="w-40 h-40 bg-white p-3 rounded-2xl mx-auto flex items-center justify-center shadow-lg">
                <QrCode className="w-full h-full text-slate-950" />
              </div>

              <div className="font-mono text-xs text-amber-400 font-bold tracking-widest">
                PASS: CONF-AGM-0148
              </div>

              <div className="border-t border-white/10 pt-3 text-xs space-y-1">
                <div className="font-bold text-white text-sm">Dr. Shah Alam</div>
                <div className="text-slate-400">Member ID: BMA-DHK-1004</div>
                <div className="text-slate-400">Kotwali Central Hospital Branch</div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 text-[11px]">
                <div className="bg-slate-900 p-2 rounded-lg border border-white/5">
                  <div className="text-slate-500">Kit Token</div>
                  <div className="font-mono text-emerald-400 font-bold">KIT-AGM-0148</div>
                </div>
                <div className="bg-slate-900 p-2 rounded-lg border border-white/5">
                  <div className="text-slate-500">Lunch Coupon</div>
                  <div className="font-mono text-emerald-400 font-bold">DIN-AGM-0148</div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => window.print()}
                variant="outline"
                className="flex-1 border-white/10 text-xs text-slate-300"
              >
                <Printer className="w-3.5 h-3.5 mr-1.5" />
                {lang === "en" ? "Print Pass" : "প্রিন্ট"}
              </Button>
              <Button
                onClick={() => setShowPassModal(false)}
                className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
              >
                {lang === "en" ? "Done" : "সম্পন্ন"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-white/10 bg-slate-950 py-10 px-6 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>© 2026 Bangladesh Medical Association • All Rights Reserved.</div>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-slate-300 transition-colors">
              {lang === "en" ? "Home" : "মূলপাতা"}
            </Link>
            <Link href="/notices" className="hover:text-slate-300 transition-colors">
              {lang === "en" ? "Notices" : "বিজ্ঞপ্তি"}
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
