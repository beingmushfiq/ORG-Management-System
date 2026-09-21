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
import { ThemeToggle } from "@/components/ui/theme-toggle";

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
  const [venue, setVenue] = useState("National Secretariat Conference Hall, Segunbagicha, Dhaka");
  const [totalSeats] = useState(25);
  const [presentSeats, setPresentSeats] = useState(20);

  const [agendas, setAgendas] = useState<AgendaItem[]>([
    {
      id: "ag-1",
      title: "Confirmation of Minutes of the 4th National Executive Meeting",
      titleBn: "৪র্থ জাতীয় কার্যনির্বাহী পরিষদের সভার কার্যবিবরণী পাঠ ও অনুমোদন",
      decisionText: "Resolved unanimously that the minutes of the previous meeting be formally approved and sealed as recorded.",
      decisionBn: "সর্বসম্মত সিদ্ধান্ত গৃহীত হইল যে, বিগত সভার কার্যবিবরণী প্রধান সমন্বয়ক ও সচিব কর্তৃক স্বাক্ষরিত হইয়া চূড়ান্ত অনুমোদন পাইল।",
      isUnanimous: true,
    },
    {
      id: "ag-2",
      title: "Approval of National Highway Blackspot Audit & FY 2026 Legal Aid Fund",
      titleBn: "২০২৬ সালের জাতীয় মহাসড়ক ব্ল্যাকস্পট অডিট ও দুর্ঘটনা আইনি সহায়তা তহবিল অনুমোদন",
      decisionText: "Audited statement of 420 crash zones and budget for emergency victim legal defense ratified for presentation to the upcoming National Council.",
      decisionBn: "৪২০টি দুর্ঘটনাপ্রবণ এলাকার সমীক্ষা এবং ক্ষতিগ্রস্ত পরিবারদের জরুরি আইনি সহায়তা বাবদ বরাদ্দ বাজেট সর্বসম্মতভাবে অনুমোদিত হইল।",
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
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-amber-500/20 print:bg-white print:text-black">
      {/* Top Header (Hidden in Print) */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/85 backdrop-blur-2xl print:hidden">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/portal/command"
              className="flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {lang === "en" ? "Back to Command War Room" : "কমান্ড সেন্টারে ফিরুন"}
            </Link>
            <div className="h-4 w-[1px] bg-border hidden sm:block" />
            <div className="text-xs font-bold text-foreground">
              {lang === "en" ? "Statutory Meeting Minutes & Resolution Compiler" : "সভার কার্যবিবরণী ও রেজোলিউশন প্রণয়ন"}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle variant="pill" />
            <button
              onClick={() => setLang(lang === "en" ? "bn" : "en")}
              className="px-3 py-1.5 rounded-lg border border-border text-xs font-semibold hover:border-amber-400/50 transition-colors"
            >
              {lang === "en" ? "বাংলা" : "English"}
            </button>
            <Button
              onClick={() => window.print()}
              size="sm"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold gap-1.5 text-xs shadow-sm"
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
        <div className="bg-card border border-border rounded-2xl p-6 shadow-xl space-y-4 print:hidden">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold font-serif text-foreground flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Meeting Configuration & Quorum Calculator
              </h2>
              <p className="text-xs text-muted-foreground">
                Configure attendees and draft formal institutional resolutions with automated legal memo numbers.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Badge
                className={`text-xs font-bold ${
                  isQuorumMet
                    ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30"
                    : "bg-red-500/15 text-red-600 dark:text-red-300 border border-red-500/30"
                }`}
              >
                Quorum: {quorumPercentage}% ({presentSeats}/{totalSeats} Present) — {isQuorumMet ? "VALID" : "INSUFFICIENT"}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div>
              <label className="text-muted-foreground font-semibold block mb-1">Meeting Category</label>
              <select
                value={meetingCategory}
                onChange={(e) => setMeetingCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:border-amber-400"
              >
                <option value="CENTRAL_EXECUTIVE_COUNCIL">Central Executive Council (জাতীয় নির্বাহী পরিষদ)</option>
                <option value="ANNUAL_GENERAL_MEETING">National General Council (জাতীয় সাধারণ অধিবেশন)</option>
                <option value="STANDING_COMMITTEE">Standing Technical Committee (স্থায়ী বিশেষজ্ঞ কমিটি)</option>
              </select>
            </div>

            <div>
              <label className="text-muted-foreground font-semibold block mb-1">Meeting Title</label>
              <input
                type="text"
                value={meetingTitle}
                onChange={(e) => setMeetingTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-muted-foreground font-semibold block mb-1">Venue</label>
              <input
                type="text"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-muted-foreground font-semibold block mb-1">Present Seats ({presentSeats}/{totalSeats})</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="1"
                  max={totalSeats}
                  value={presentSeats}
                  onChange={(e) => setPresentSeats(Number(e.target.value))}
                  className="w-20 px-3 py-2 rounded-xl bg-background border border-border text-foreground font-mono focus:outline-none focus:border-amber-400"
                />
                <Button
                  onClick={handleAddAgenda}
                  size="sm"
                  className="flex-1 bg-muted hover:bg-muted/80 text-foreground border border-border text-xs gap-1"
                >
                  <Plus className="w-3 h-3" /> Add Agenda
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* The Printable Official Minutes Document */}
        <div className="bg-card border border-border rounded-2xl p-8 sm:p-14 shadow-2xl relative space-y-6 print:bg-transparent print:border-none print:shadow-none print:p-0">
          {/* Official Letterhead */}
          <div className="border-b-2 border-amber-500/40 pb-6 text-center space-y-1 print:border-black">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground uppercase font-serif tracking-wider print:text-black">
              Road Safety Movement (নিরাপদ সড়ক আন্দোলন)
            </h1>
            <p className="text-xs text-muted-foreground font-bangla print:text-gray-700">
              জাতীয় সচিবালয় • সেগুনবাগিচা, ঢাকা-১০০০ (সোসাইটিজ রেজিস্ট্রেশন আইন ১৮৬০)
            </p>
            <div className="text-sm font-bold font-serif text-amber-500 dark:text-amber-400 pt-2 uppercase tracking-wide print:text-black">
              {meetingTitle}
            </div>
          </div>

          {/* Meeting Metadata Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-3 border-b border-border text-xs text-muted-foreground font-mono print:text-black print:border-black">
            <div>
              <span className="text-muted-foreground/70 block">MEMO REF:</span>
              <span className="font-bold text-amber-600 dark:text-amber-400 print:text-black">RSM/MINUTES/2026/NEC-01</span>
            </div>
            <div>
              <span className="text-muted-foreground/70 block">MEETING DATE:</span>
              <span className="text-foreground print:text-black">22 September 2026</span>
            </div>
            <div>
              <span className="text-muted-foreground/70 block">QUORUM STATUS:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 print:text-black">{quorumPercentage}% (Quorum Met)</span>
            </div>
            <div>
              <span className="text-muted-foreground/70 block">VENUE:</span>
              <span className="text-foreground print:text-black font-sans truncate block" title={venue}>{venue}</span>
            </div>
          </div>

          {/* Resolutions List */}
          <div className="space-y-6 pt-4">
            <h3 className="text-base font-bold font-serif text-foreground uppercase tracking-wider print:text-black">
              Adoption of Agenda Items & Resolutions (গৃহীত প্রস্তাবনাসমূহ):
            </h3>

            {agendas.map((item, idx) => (
              <div
                key={item.id}
                className="bg-muted/30 border border-border rounded-xl p-5 space-y-3 relative group print:bg-transparent print:border print:border-black"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 text-[10px] font-mono font-bold print:text-black">
                      RESOLUTION #{String(idx + 1).padStart(2, "0")} • RES-RSM-2026-{String(idx + 1).padStart(3, "0")}
                    </Badge>
                    {item.isUnanimous && (
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 print:text-black">
                        Unanimously Adopted (সর্বসম্মত)
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleRemoveAgenda(item.id)}
                    className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-red-500 transition-opacity print:hidden"
                    title="Remove Agenda"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <h4 className="text-base font-bold text-foreground font-serif print:text-black">
                    {item.title}
                  </h4>
                  <div className="text-xs text-muted-foreground font-bangla print:text-gray-700">{item.titleBn}</div>
                </div>

                <div className="bg-card p-3.5 rounded-lg border border-border space-y-1 text-xs text-foreground print:bg-gray-50 print:border-black print:text-black">
                  <div className="font-semibold text-amber-600 dark:text-amber-400 print:text-black">Official Decision / Resolution:</div>
                  <p className="leading-relaxed">{item.decisionText}</p>
                  <p className="font-bangla leading-relaxed text-muted-foreground print:text-black pt-1">{item.decisionBn}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Statutory Certification & Signatures */}
          <div className="mt-14 pt-8 border-t border-border space-y-8 print:border-black">
            <p className="text-xs text-muted-foreground font-bangla italic text-center print:text-black">
              "উক্ত সভার সকল প্রস্তাবনা ও কার্যবিবরণী নিরাপদ সড়ক আন্দোলনের গঠনতন্ত্র অনুযায়ী যথারীতি পর্যালোচিত ও সর্বসম্মত সিদ্ধান্তে চূড়ান্ত অনুমোদিত হইল।"
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-8 pt-4">
              <div className="text-center sm:text-left space-y-1">
                <div className="w-40 border-b border-foreground/30 print:border-black mb-1 mx-auto sm:mx-0" />
                <div className="text-xs font-bold text-foreground print:text-black">Engr. Tanvir Ahmed</div>
                <div className="text-[11px] text-muted-foreground print:text-gray-600">Chief National Coordinator, RSM</div>
              </div>

              <div className="text-center sm:text-right space-y-1">
                <div className="w-40 border-b border-foreground/30 print:border-black mb-1 mx-auto sm:ml-auto sm:mr-0" />
                <div className="text-xs font-bold text-foreground print:text-black">Advocate Shafiul Alam</div>
                <div className="text-[11px] text-muted-foreground print:text-gray-600">Executive Council Secretary, RSM</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
