"use client";

import React, { useState } from "react";
import {
  Heart,
  PhoneCall,
  CheckCircle2,
  ShieldCheck,
  Send,
  ArrowLeft,
  Activity,
} from "lucide-react";
import { Button, Badge, Card, CardContent, CopyButton } from "@org/ui";
import Link from "next/link";

type BloodGroup = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";

interface DonorCard {
  id: string;
  name: string;
  nameBn: string;
  bloodGroup: BloodGroup;
  branch: string;
  district: string;
  phone: string;
  status: "AVAILABLE" | "COOLING_PERIOD";
  lastDonationDate: string;
  totalDonations: number;
  nextEligibleDate?: string;
}

const SAMPLE_DONORS: DonorCard[] = [
  {
    id: "mem-01",
    name: "Dr. Kabir Hossain",
    nameBn: "ডাঃ কবির হোসেন",
    bloodGroup: "O+",
    branch: "Kotwali Central Hospital Unit",
    district: "Chattogram",
    phone: "01811-449901",
    status: "AVAILABLE",
    lastDonationDate: "June 10, 2026",
    totalDonations: 14,
  },
  {
    id: "mem-02",
    name: "Dr. Farhana Begum",
    nameBn: "ডাঃ ফারহানা বেগম",
    bloodGroup: "B+",
    branch: "Panchlaish Medical Zone",
    district: "Chattogram",
    phone: "01711-882233",
    status: "AVAILABLE",
    lastDonationDate: "May 22, 2026",
    totalDonations: 8,
  },
  {
    id: "mem-03",
    name: "Dr. Tariqul Islam",
    nameBn: "ডাঃ তরিকুল ইসলাম",
    bloodGroup: "O+",
    branch: "Agrabad Commercial Unit",
    district: "Chattogram",
    phone: "01912-334455",
    status: "COOLING_PERIOD",
    lastDonationDate: "August 15, 2026",
    nextEligibleDate: "November 15, 2026",
    totalDonations: 6,
  },
  {
    id: "mem-04",
    name: "Dr. Salma Akter",
    nameBn: "ডাঃ সালমা আক্তার",
    bloodGroup: "A-",
    branch: "Sylhet Osmani Medical College Unit",
    district: "Sylhet",
    phone: "01715-667788",
    status: "AVAILABLE",
    lastDonationDate: "January 14, 2026",
    totalDonations: 11,
  },
  {
    id: "mem-05",
    name: "Dr. Mahbubur Rahman",
    nameBn: "ডাঃ মাহবুবুর রহমান",
    bloodGroup: "AB+",
    branch: "Dhaka Central Secretariat",
    district: "Dhaka",
    phone: "01819-221100",
    status: "AVAILABLE",
    lastDonationDate: "April 02, 2026",
    totalDonations: 19,
  },
];

export default function BloodBankPortalPage() {
  const [lang, setLang] = useState<"en" | "bn">("en");
  const [selectedGroup, setSelectedGroup] = useState<string>("ALL");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("Chattogram");
  const [showAppealModal, setShowAppealModal] = useState(false);
  const [appealSuccess, setAppealSuccess] = useState(false);
  const [revealedPhones, setRevealedPhones] = useState<Set<string>>(new Set());

  const handleRevealPhone = (id: string) => {
    setRevealedPhones((prev) => new Set(prev).add(id));
  };

  const filteredDonors = SAMPLE_DONORS.filter((d) => {
    const matchesGroup = selectedGroup === "ALL" || d.bloodGroup === selectedGroup;
    const matchesDistrict = selectedDistrict === "ALL" || d.district.toLowerCase() === selectedDistrict.toLowerCase();
    return matchesGroup && matchesDistrict;
  });

  const handleDispatchAppeal = (e: React.FormEvent) => {
    e.preventDefault();
    setAppealSuccess(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-red-500/20">
      {/* Portal Top Bar */}
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-slate-950/85 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/portal"
              className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {lang === "en" ? "Back to Member Portal" : "পোর্টাল ড্যাশবোর্ডে ফিরুন"}
            </Link>
            <div className="h-4 w-[1px] bg-white/10 hidden sm:block" />
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              {lang === "en" ? "Institutional Blood Network & Member Welfare" : "জরুরি রক্তদাতা নেটওয়ার্ক ও চিকিৎসা কল্যাণ"}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === "en" ? "bn" : "en")}
              className="px-3 py-1 rounded-lg border border-white/10 text-xs font-semibold hover:border-red-500/50 transition-colors"
            >
              {lang === "en" ? "বাংলা" : "English"}
            </button>
            <Button
              onClick={() => {
                setShowAppealModal(true);
                setAppealSuccess(false);
              }}
              size="sm"
              className="bg-red-600 hover:bg-red-500 text-white font-bold gap-1.5 text-xs shadow-lg shadow-red-950"
            >
              <Send className="w-3.5 h-3.5" />
              {lang === "en" ? "Launch Emergency Appeal" : "জরুরি রক্তের আবেদন"}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 py-8 flex-1 w-full space-y-8">
        {/* Banner with Live Metrics */}
        <div className="relative rounded-3xl border border-red-500/20 bg-gradient-to-r from-red-950/40 via-slate-900 to-slate-950 p-8 overflow-hidden shadow-2xl">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              {lang === "en" ? "Physicians & Surgeons Lifeline Network" : "চিকিৎসক সমাজের জরুরি রক্তদান ও মানবিক সেবা"}
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-white tracking-tight leading-tight">
              {lang === "en"
                ? "Emergency Blood Matching & Welfare Assistance"
                : "জীবন রক্ষাকারী রক্তদাতা সন্ধান ও জরুরি সহায়তা"}
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              {lang === "en"
                ? "Instantly locate verified, non-remunerated voluntary donors from our active roster. The system automatically enforces a 90-day medical hiatus between donations to safeguard donor health."
                : "সম্মানিত চিকিৎসকদের স্বেচ্ছাসেবী রক্তদাতা নেটওয়ার্ক থেকে জরুরি প্রয়োজনে রক্তদাতা খুঁজুন। রক্তদাতার স্বাস্থ্য সুরক্ষায় প্রতিটি রক্তদানের মাঝে ৯০ দিনের বিরতি স্বয়ংক্রিয়ভাবে পর্যবেক্ষণ করা হয়।"}
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-950/70 p-4 rounded-xl border border-white/5">
              <div className="text-xs text-slate-400">{lang === "en" ? "Registered Donors" : "নিবন্ধিত রক্তদাতা"}</div>
              <div className="text-2xl font-black text-white font-serif mt-1">1,248</div>
            </div>
            <div className="bg-slate-950/70 p-4 rounded-xl border border-white/5">
              <div className="text-xs text-slate-400">{lang === "en" ? "Ready Now (Eligible)" : "প্রস্তুত আছেন"}</div>
              <div className="text-2xl font-black text-emerald-400 font-serif mt-1">842</div>
            </div>
            <div className="bg-slate-950/70 p-4 rounded-xl border border-white/5">
              <div className="text-xs text-slate-400">{lang === "en" ? "Lives Impacted" : "রক্তদান সম্পন্ন"}</div>
              <div className="text-2xl font-black text-red-400 font-serif mt-1">3,490+</div>
            </div>
            <div className="bg-slate-950/70 p-4 rounded-xl border border-white/5">
              <div className="text-xs text-slate-400">{lang === "en" ? "Avg Response Time" : "গড় রেসপন্স সময়"}</div>
              <div className="text-2xl font-black text-amber-400 font-serif mt-1">18 Mins</div>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Blood Groups Selector */}
            <div className="flex flex-wrap gap-2">
              {["ALL", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                <button
                  key={bg}
                  onClick={() => setSelectedGroup(bg)}
                  className={`w-11 h-9 rounded-xl text-xs font-bold font-mono transition-all ${
                    selectedGroup === bg
                      ? "bg-red-600 text-white shadow-lg shadow-red-900"
                      : "bg-slate-900 border border-white/10 text-slate-400 hover:text-white hover:border-red-500/40"
                  }`}
                >
                  {bg}
                </button>
              ))}
            </div>

            {/* District Selector */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">{lang === "en" ? "District: " : "জেলা: "}</span>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
              >
                <option value="ALL">All Districts (সমগ্র বাংলাদেশ)</option>
                <option value="Chattogram">Chattogram (চট্টগ্রাম)</option>
                <option value="Dhaka">Dhaka (ঢাকা)</option>
                <option value="Sylhet">Sylhet (সিলেট)</option>
                <option value="Rajshahi">Rajshahi (রাজশাহী)</option>
                <option value="Khulna">Khulna (খুলনা)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Donors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDonors.map((donor) => {
            const isPhoneRevealed = revealedPhones.has(donor.id);

            return (
              <Card
                key={donor.id}
                interactive
                accent={donor.status === "AVAILABLE" ? "emerald" : "none"}
                className="bg-slate-900/60 border border-white/10 hover:border-red-500/40 transition-all rounded-2xl overflow-hidden shadow-xl"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-red-600/20 border border-red-500/30 flex items-center justify-center font-black text-red-400 text-lg font-mono shadow-inner">
                        {donor.bloodGroup}
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-base leading-tight">
                          {lang === "en" ? donor.name : donor.nameBn}
                        </h3>
                        <div className="text-xs text-slate-400">{donor.district}</div>
                      </div>
                    </div>

                    <Badge
                      variant={donor.status === "AVAILABLE" ? "success" : "warning"}
                      dot={donor.status === "AVAILABLE"}
                      pulse={donor.status === "AVAILABLE"}
                      size="sm"
                    >
                      {donor.status === "AVAILABLE"
                        ? lang === "en"
                          ? "Ready to Donate"
                          : "রক্তদানে প্রস্তুত"
                        : lang === "en"
                        ? "Cooling Period"
                        : "বিরতিকালীন সময়"}
                    </Badge>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-xl border border-white/5 space-y-1.5 text-xs text-slate-400">
                    <div className="flex justify-between">
                      <span>{lang === "en" ? "Branch Unit:" : " শাখা ইউনিট:"}</span>
                      <span className="text-slate-200 font-medium">{donor.branch}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{lang === "en" ? "Last Donated:" : "সর্বশেষ রক্তদান:"}</span>
                      <span className="text-slate-200">{donor.lastDonationDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{lang === "en" ? "Total Donated:" : "মোট রক্তদান:"}</span>
                      <span className="text-emerald-400 font-bold font-mono">{donor.totalDonations} times</span>
                    </div>
                    {donor.nextEligibleDate && (
                      <div className="flex justify-between text-amber-400 font-semibold pt-1 border-t border-white/5">
                        <span>{lang === "en" ? "Next Eligible:" : "পরবর্তী সম্ভব্য তারিখ:"}</span>
                        <span>{donor.nextEligibleDate}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-2">
                    {donor.status === "AVAILABLE" ? (
                      isPhoneRevealed ? (
                        <div className="flex items-center gap-2">
                          <a
                            href={`tel:${donor.phone}`}
                            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow-lg shadow-emerald-950"
                          >
                            <PhoneCall className="w-3.5 h-3.5" />
                            <span>{donor.phone} ({lang === "en" ? "Call" : "কল"})</span>
                          </a>
                          <CopyButton text={donor.phone} label="Copy" />
                        </div>
                      ) : (
                        <Button
                          onClick={() => handleRevealPhone(donor.id)}
                          variant="outline"
                          size="sm"
                          leftIcon={<ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />}
                          className="w-full text-xs"
                        >
                          {lang === "en" ? "Verify & View Contact" : "নম্বর দেখতে ক্লিক করুন"}
                        </Button>
                      )
                    ) : (
                      <div className="text-center py-2 text-xs text-slate-500 font-medium">
                        {lang === "en" ? "Donor currently observing 90-day rest" : "রক্তদাতা বর্তমানে ৯০ দিনের বিশ্রামে রয়েছেন"}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>

      {/* Emergency Appeal Modal */}
      {showAppealModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-red-500/40 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 animate-in fade-in zoom-in duration-200">
            {!appealSuccess ? (
              <>
                <div className="text-center space-y-1">
                  <Badge className="bg-red-500/20 text-red-300 border border-red-500/30 text-[11px] font-bold">
                    EMERGENCY MASKED SMS BROADCAST
                  </Badge>
                  <h3 className="text-xl font-bold font-serif text-white">
                    {lang === "en" ? "Emergency Blood Requisition" : "জরুরি রক্তের আবেদন ও এসএমএস সম্প্রচার"}
                  </h3>
                  <div className="text-xs text-slate-400">
                    {lang === "en"
                      ? "Dispatches urgent appeal to matching verified local physician donors."
                      : "নিকটবর্তী উপযুক্ত রক্তদাতাদের নিকট জরুরি এসএমএস সতর্কতা প্রেরণ করা হবে।"}
                  </div>
                </div>

                <form onSubmit={handleDispatchAppeal} className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      {lang === "en" ? "Patient Name & Hospital" : "রোগীর নাম ও হাসপাতাল"}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Master Aayan (CMCH, Ward 14, Bed 8)"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">
                        {lang === "en" ? "Blood Group" : "রক্তের গ্রুপ"}
                      </label>
                      <select className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-red-500">
                        <option>O+</option>
                        <option>B+</option>
                        <option>A+</option>
                        <option>AB+</option>
                        <option>O-</option>
                        <option>B-</option>
                        <option>A-</option>
                        <option>AB-</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">
                        {lang === "en" ? "Units Needed" : "রক্তের পরিমাণ (ব্যাগ)"}
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="8"
                        defaultValue="2"
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-red-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      {lang === "en" ? "Attendant Contact Number" : "যোগাযোগকারী স্বজনের মোবাইল নম্বর"}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 01819-000000"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-500 text-white font-bold text-xs py-3">
                    {lang === "en" ? "Broadcast SMS Appeal Now" : "অবিলম্বে এসএমএস বার্তা প্রেরণ করুন"}
                  </Button>
                </form>
              </>
            ) : (
              <div className="text-center space-y-4 py-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-serif text-white">
                  {lang === "en" ? "Emergency Appeal Dispatched!" : "জরুরি আবেদন সফলভাবে প্রেরণ করা হয়েছে!"}
                </h3>
                <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                  {lang === "en"
                    ? "SMS notifications have been broadcast to 14 verified O+ physician donors in Chattogram district. Donors are reaching out directly to the attendant."
                    : "চট্টগ্রাম জেলার ১৪ জন যাচাইকৃত ও+ রক্তদাতার কাছে জরুরি অনুরোধ পৌঁছে গেছে। দাতাগণ সরাসরি রোগীর স্বজনের সাথে যোগাযোগ করবেন।"}
                </p>

                <div className="bg-slate-950 p-4 rounded-xl border border-white/10 text-xs font-mono text-slate-400">
                  <div>DISPATCH TICKET: BLD-EMERG-2026-092</div>
                  <div className="text-emerald-400 font-bold">CARRIER: SSL WIRELESS / ALPHA SMS (MASKED)</div>
                </div>

                <Button
                  onClick={() => setShowAppealModal(false)}
                  className="w-full bg-red-600 hover:bg-red-500 text-white font-bold text-xs"
                >
                  {lang === "en" ? "Return to Radar" : "সম্পন্ন"}
                </Button>
              </div>
            )}

            {!appealSuccess && (
              <button
                onClick={() => setShowAppealModal(false)}
                className="w-full text-center text-xs text-slate-400 hover:text-white transition-colors"
              >
                {lang === "en" ? "Cancel" : "বাতিল"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
