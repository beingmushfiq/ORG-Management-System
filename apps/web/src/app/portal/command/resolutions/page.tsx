"use client";

import React, { useState } from "react";
import {
  Plus,
  Trash2,
  Printer,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { Button, Badge } from "@org/ui";
import Link from "next/link";

interface AgendaItem {
  id: string;
  title: string;
  titleBn: string;
  decisionText: string;
  decisionBn: string;
  isUnanimous: boolean;
}

export default function MeetingMinutesBuilderPage() {
  const [lang, setLang] = useState<"en" | "bn">("en");
  const [meetingCategory, setMeetingCategory] = useState("CENTRAL_EXECUTIVE_COUNCIL");
  const [meetingTitle, setMeetingTitle] = useState("5th Bi-Monthly Executive Council Meeting 2026");
  const [venue, setVenue] = useState("Executive Boardroom, BMA Bhaban, Topkhana Road, Dhaka");
  const [totalSeats] = useState(25);
  const [presentSeats, setPresentSeats] = useState(20);

  const [agendas, setAgendas] = useState<AgendaItem[]>([
    {
      id: "ag-1",
      title: "Confirmation of Minutes of the 4th Executive Meeting",
      titleBn: "৪র্থ কার্যনির্বাহী সভার কার্যবিবরণী পাঠ ও অনুমোদন",
      decisionText: "Resolved unanimously that the minutes of the previous meeting be formally approved as recorded.",
      decisionBn: "সর্বসম্মত সিদ্ধান্ত গৃহীত হইল যে, বিগত সভার কার্যবিবরণী সভাপতি ও মহাসচিব কর্তৃক স্বাক্ষরিত হইয়া চূড়ান্ত অনুমোদন পাইল।",
      isUnanimous: true,
    },
    {
      id: "ag-2",
      title: "Approval of Audit Report and Balance Sheet for FY 2025-2026",
      titleBn: "২০২৫-২০২৬ অর্থ বছরের নিরীক্ষিত আর্থিক হিসাব ও ব্যালেন্স শিট অনুমোদন",
      decisionText: "Audited statement presented by Honorary Treasurer is ratified for presentation to the upcoming 74th National AGM.",
      decisionBn: "কোষাধ্যক্ষ কর্তৃক উপস্থাপিত নিরীক্ষিত আয়-ব্যয় হিসাব আগামী সাধারণ সভায় উপস্থাপনের জন্য সর্বসম্মতভাবে অনুমোদিত হইল।",
      isUnanimous: true,
    },
  ]);

  const quorumPercentage = Math.round((presentSeats / totalSeats) * 100);
  const isQuorumMet = quorumPercentage >= 50;

  const handleAddAgenda = () => {
    const nextNo = agendas.length + 1;
    setAgendas((prev) => [
      ...prev,
      {
        id: `ag-${Date.now()}`,
        title: `Agenda Item #${nextNo}`,
        titleBn: `আলোচ্যসূচি নং ${nextNo}`,
        decisionText: "Resolved that the proposal be approved and executed by the Secretariat.",
        decisionBn: "প্রস্তাবনাটি বিবেচনাপূর্বক অনুমোদিত হইল এবং সচিবালয়কে প্রয়োজনীয় ব্যবস্থা গ্রহণের নির্দেশ প্রদান করা হইল।",
        isUnanimous: true,
      },
    ]);
  };

  const handleRemoveAgenda = (id: string) => {
    setAgendas((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500/20 print:bg-white print:text-black">
      {/* Top Header (Hidden in Print) */}
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-slate-950/85 backdrop-blur-2xl print:hidden">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/portal/command"
              className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {lang === "en" ? "Back to Command War Room" : "কমান্ড সেন্টারে ফিরুন"}
            </Link>
            <div className="h-4 w-[1px] bg-white/10 hidden sm:block" />
            <div className="text-xs font-bold text-white">
              {lang === "en" ? "Statutory Meeting Minutes & Resolution Compiler" : "সভার কার্যবিবরণী ও রেজোলিউশন প্রণয়ন"}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === "en" ? "bn" : "en")}
              className="px-3 py-1 rounded-lg border border-white/10 text-xs font-semibold hover:border-amber-400/50 transition-colors"
            >
              {lang === "en" ? "বাংলা" : "English"}
            </button>
            <Button
              onClick={() => window.print()}
              size="sm"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold gap-1.5 text-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              {lang === "en" ? "Print Official Signed Minutes" : "কার্যবিবরণী প্রিন্ট"}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Document / Workspace */}
      <main className="max-w-5xl mx-auto px-6 py-10 flex-1 w-full space-y-8 print:p-0 print:max-w-none">
        {/* Editor Controls (Hidden in Print) */}
        <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-6 shadow-xl space-y-4 print:hidden">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold font-serif text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Meeting Configuration & Quorum Calculator
              </h2>
              <p className="text-xs text-slate-400">
                Configure attendees and draft formal institutional resolutions with automated legal memo numbers.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Badge
                className={`text-xs font-bold ${
                  isQuorumMet
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : "bg-red-500/20 text-red-300 border border-red-500/30"
                }`}
              >
                Quorum: {quorumPercentage}% ({presentSeats}/{totalSeats} Present) — {isQuorumMet ? "VALID" : "INSUFFICIENT"}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Meeting Category</label>
              <select
                value={meetingCategory}
                onChange={(e) => setMeetingCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-amber-400"
              >
                <option value="CENTRAL_EXECUTIVE_COUNCIL">Central Executive Council (কেবিনেট সভা)</option>
                <option value="ANNUAL_GENERAL_MEETING">Annual General Meeting (বার্ষিক সাধারণ সভা)</option>
                <option value="STANDING_COMMITTEE">Standing Committee (স্থায়ী উপ-কমিটি)</option>
              </select>
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Meeting Title</label>
              <input
                type="text"
                value={meetingTitle}
                onChange={(e) => setMeetingTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Venue</label>
              <input
                type="text"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Present Seats ({presentSeats}/{totalSeats})</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="1"
                  max={totalSeats}
                  value={presentSeats}
                  onChange={(e) => setPresentSeats(Number(e.target.value))}
                  className="w-20 px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white font-mono focus:outline-none focus:border-amber-400"
                />
                <Button
                  onClick={handleAddAgenda}
                  size="sm"
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-white border border-white/10 text-xs gap-1"
                >
                  <Plus className="w-3 h-3" /> Add Agenda
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* The Printable Official Minutes Document */}
        <div className="bg-slate-900/90 border border-white/10 rounded-2xl p-8 sm:p-14 shadow-2xl relative space-y-6 print:bg-transparent print:border-none print:shadow-none print:p-0">
          {/* Official Letterhead */}
          <div className="border-b-2 border-amber-500/40 pb-6 text-center space-y-1 print:border-black">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white uppercase font-serif tracking-wider print:text-black">
              Bangladesh Medical Association
            </h1>
            <p className="text-xs text-slate-300 font-bangla print:text-gray-700">
              কেন্দ্রীয় সচিবালয় • বিএমএ ভবন, ১৫/২ তোপখানা রোড, ঢাকা-১০০০ (সোসাইটিজ রেজিস্ট্রেশন আইন ১৮৬০)
            </p>
            <div className="text-sm font-bold font-serif text-amber-400 pt-2 uppercase tracking-wide print:text-black">
              {meetingTitle}
            </div>
          </div>

          {/* Meeting Metadata Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-3 border-b border-white/10 text-xs text-slate-300 font-mono print:text-black print:border-black">
            <div>
              <span className="text-slate-500 block">MEMO REF:</span>
              <span className="font-bold text-amber-400 print:text-black">BMA/MINUTES/2026/CEC-492</span>
            </div>
            <div>
              <span className="text-slate-500 block">MEETING DATE:</span>
              <span>22 September 2026</span>
            </div>
            <div>
              <span className="text-slate-500 block">QUORUM STATUS:</span>
              <span className="font-bold text-emerald-400 print:text-black">{quorumPercentage}% (Quorum Met)</span>
            </div>
            <div>
              <span className="text-slate-500 block">VENUE:</span>
              <span className="text-white print:text-black font-sans truncate block" title={venue}>{venue}</span>
            </div>
          </div>

          {/* Resolutions List */}
          <div className="space-y-6 pt-4">
            <h3 className="text-base font-bold font-serif text-white uppercase tracking-wider print:text-black">
              Adoption of Agenda Items & Resolutions (গৃহীত প্রস্তাবনাসমূহ):
            </h3>

            {agendas.map((item, idx) => (
              <div
                key={item.id}
                className="bg-slate-950/70 border border-white/10 rounded-xl p-5 space-y-3 relative group print:bg-transparent print:border print:border-black"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-mono font-bold print:text-black">
                      RESOLUTION #{String(idx + 1).padStart(2, "0")} • RES-BMA-2026-{String(idx + 1).padStart(3, "0")}
                    </Badge>
                    {item.isUnanimous && (
                      <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 print:text-black">
                        Unanimously Adopted (সর্বসম্মত)
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleRemoveAgenda(item.id)}
                    className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 transition-opacity print:hidden"
                    title="Remove Agenda"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <h4 className="text-base font-bold text-white font-serif print:text-black">
                    {item.title}
                  </h4>
                  <div className="text-xs text-slate-400 font-bangla print:text-gray-700">{item.titleBn}</div>
                </div>

                <div className="bg-slate-900/80 p-3.5 rounded-lg border border-white/5 space-y-1 text-xs text-slate-200 print:bg-gray-50 print:border-black print:text-black">
                  <div className="font-semibold text-amber-300 print:text-black">Official Decision / Resolution:</div>
                  <p className="leading-relaxed">{item.decisionText}</p>
                  <p className="font-bangla leading-relaxed text-slate-300 print:text-black pt-1">{item.decisionBn}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Statutory Certification & Signatures */}
          <div className="mt-14 pt-8 border-t border-white/10 space-y-8 print:border-black">
            <p className="text-xs text-slate-400 font-bangla italic text-center print:text-black">
              "উক্ত সভার সকল প্রস্তাবনা ও কার্যবিবরণী বাংলাদেশ মেডিকেল এসোসিয়েশনের গঠনতন্ত্র অনুযায়ী যথারীতি পর্যালোচিত ও সর্বসম্মত সিদ্ধান্তে চূড়ান্ত অনুমোদিত হইল।"
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-8 pt-4">
              <div className="text-center sm:text-left space-y-1">
                <div className="w-40 border-b border-white/30 print:border-black mb-1 mx-auto sm:mx-0" />
                <div className="text-xs font-bold text-white print:text-black">Prof. Dr. Mahmudul Hasan</div>
                <div className="text-[11px] text-slate-400 print:text-gray-600">President, BMA</div>
              </div>

              <div className="text-center sm:text-right space-y-1">
                <div className="w-40 border-b border-white/30 print:border-black mb-1 mx-auto sm:ml-auto sm:mr-0" />
                <div className="text-xs font-bold text-white print:text-black">Dr. Kazi Mostafa</div>
                <div className="text-[11px] text-slate-400 print:text-gray-600">Honorary General Secretary, BMA</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
