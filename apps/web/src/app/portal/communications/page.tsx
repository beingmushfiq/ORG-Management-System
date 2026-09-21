"use client";

import React, { useState } from "react";
import {
  Radio,
  Send,
  Building,
  CheckCircle2,
  ArrowLeft,
  Smartphone,
} from "lucide-react";
import { Button, Badge, Card, CardHeader, CardTitle, CardDescription, CardContent } from "@org/ui";
import Link from "next/link";

interface BranchOption {
  id: string;
  path: string;
  name: string;
  memberCount: number;
}

const BRANCHES: BranchOption[] = [
  { id: "all", path: "/", name: "Entire Organization (All Branches)", memberCount: 1420 },
  { id: "b-1", path: "/1", name: "Central Executive Secretariat", memberCount: 48 },
  { id: "b-2", path: "/1/2", name: "Chattogram Division Secretariat", memberCount: 850 },
  { id: "b-3", path: "/1/2/4", name: "Kotwali Central Hospital Unit", memberCount: 320 },
  { id: "b-4", path: "/1/2/5", name: "Panchlaish Clinic Circle", memberCount: 185 },
];

export default function CommunicationsPortal() {
  const [selectedBranch, setSelectedBranch] = useState<BranchOption>(BRANCHES[0]!);
  const [activeProvider, setActiveProvider] = useState<"SSL_WIRELESS" | "ALPHA_SMS" | "GREENWEB">("SSL_WIRELESS");
  const [senderId] = useState("BMA-CTG");
  const [messageText, setMessageText] = useState(
    "জরুরী বিজ্ঞপ্তি: বাংলাদেশ মেডিকেল এসোসিয়েশন (BMA) এর জরুরী কাউন্সিল অধিবেশন আজ সন্ধ্যা ৬টায় অনুষ্ঠিত হবে।"
  );
  const [dispatched, setDispatched] = useState(false);

  const isUnicode = /[\u0980-\u09FF]/.test(messageText);
  const charLength = messageText.length;
  const segments = isUnicode
    ? charLength <= 70 ? 1 : Math.ceil(charLength / 67)
    : charLength <= 160 ? 1 : Math.ceil(charLength / 153);
  const maxPartChars = isUnicode
    ? (segments === 1 ? 70 : segments * 67)
    : (segments === 1 ? 160 : segments * 153);

  const handleDispatch = () => {
    setDispatched(true);
    setTimeout(() => {
      setDispatched(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500/20 selection:text-amber-300">
      {/* Top Header */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-xl px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Link
            href="/portal/members"
            className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-mono tracking-wider uppercase"
          >
            <ArrowLeft className="w-4 h-4" /> Portal
          </Link>
          <span className="text-slate-700 font-mono">|</span>
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-rose-500 animate-pulse" />
            <span className="text-sm font-semibold tracking-wide uppercase text-slate-300">
              Multi-Vendor Communications & Priority Broadcast
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-emerald-500/40 text-emerald-400 bg-emerald-500/10 font-mono text-xs">
            Approved Masking SID: {senderId}
          </Badge>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl w-full mx-auto px-6 py-8 space-y-8">
        {/* Gateway Telemetry Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card
            className={`border cursor-pointer transition-all ${
              activeProvider === "SSL_WIRELESS"
                ? "border-amber-500/80 bg-amber-950/20 shadow-lg shadow-amber-500/10"
                : "border-slate-800 bg-slate-900/40"
            }`}
            onClick={() => setActiveProvider("SSL_WIRELESS")}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-bold text-white">SSL Wireless CSMS</CardTitle>
                <Badge variant="outline" className="border-emerald-500/40 text-emerald-400 text-[10px]">
                  Primary
                </Badge>
              </div>
              <CardDescription className="text-xs text-slate-400 font-mono">
                Masking SID: {senderId}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between font-mono text-xs">
                <span className="text-slate-500">Credit Balance:</span>
                <span className="text-amber-400 font-bold text-base">4,250 SMS</span>
              </div>
            </CardContent>
          </Card>

          <Card
            className={`border cursor-pointer transition-all ${
              activeProvider === "ALPHA_SMS"
                ? "border-amber-500/80 bg-amber-950/20 shadow-lg shadow-amber-500/10"
                : "border-slate-800 bg-slate-900/40"
            }`}
            onClick={() => setActiveProvider("ALPHA_SMS")}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-bold text-white">Alpha Net SMS</CardTitle>
                <Badge variant="outline" className="border-slate-700 text-slate-400 text-[10px]">
                  Failover 1
                </Badge>
              </div>
              <CardDescription className="text-xs text-slate-400 font-mono">
                Masking SID: {senderId}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between font-mono text-xs">
                <span className="text-slate-500">Credit Balance:</span>
                <span className="text-white font-bold text-base">1,800 BDT</span>
              </div>
            </CardContent>
          </Card>

          <Card
            className={`border cursor-pointer transition-all ${
              activeProvider === "GREENWEB"
                ? "border-amber-500/80 bg-amber-950/20 shadow-lg shadow-amber-500/10"
                : "border-slate-800 bg-slate-900/40"
            }`}
            onClick={() => setActiveProvider("GREENWEB")}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-bold text-white">Greenweb Gateway</CardTitle>
                <Badge variant="outline" className="border-slate-700 text-slate-400 text-[10px]">
                  Failover 2
                </Badge>
              </div>
              <CardDescription className="text-xs text-slate-400 font-mono">
                Masking SID: {senderId}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between font-mono text-xs">
                <span className="text-slate-500">Credit Balance:</span>
                <span className="text-white font-bold text-base">9,500 SMS</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Composer & Mobile Preview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Cols: Message Composer & Targeting */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-xl">
              <CardHeader className="border-b border-slate-800/80 pb-4">
                <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                  <Radio className="w-4 h-4 text-rose-500" /> Broadcast Scope & Branch Target
                </CardTitle>
                <CardDescription className="text-xs text-slate-400">
                  Select whether to dispatch across all institutional units or narrow down to a specific branch tree
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                    Target Branch Node (Materialized Path)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {BRANCHES.map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => setSelectedBranch(b)}
                        className={`p-3 rounded-xl text-left border transition-all text-xs ${
                          selectedBranch.id === b.id
                            ? "border-amber-500 bg-amber-500/10 text-white font-semibold"
                            : "border-slate-800 bg-slate-950/40 text-slate-400 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5 truncate">
                            <Building className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            {b.name}
                          </span>
                        </div>
                        <div className="text-[10px] font-mono text-slate-500 mt-1 flex justify-between">
                          <span>{b.path}</span>
                          <span className="text-amber-400 font-bold">{b.memberCount} members</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message Body */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                      Message Content (Bilingual SMS)
                    </label>
                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span className={isUnicode ? "text-amber-400" : "text-blue-400"}>
                        {isUnicode ? "UCS-2 Unicode (Bangla)" : "GSM 7-bit (English)"}
                      </span>
                      <span className="text-slate-600">|</span>
                      <span className="text-slate-300">
                        {charLength} / {maxPartChars} chars ({segments} part{segments > 1 ? "s" : ""})
                      </span>
                    </div>
                  </div>

                  <textarea
                    rows={4}
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 font-bangla leading-relaxed"
                    placeholder="Type broadcast message in English or বাংলা..."
                  />

                  {/* Template Quick Insert Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <button
                      type="button"
                      onClick={() =>
                        setMessageText(
                          "জরুরী বিজ্ঞপ্তি: বাংলাদেশ মেডিকেল এসোসিয়েশন (BMA) এর জরুরী কাউন্সিল অধিবেশন আজ সন্ধ্যা ৬টায় অনুষ্ঠিত হবে।"
                        )
                      }
                      className="px-2.5 py-1 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-[11px] text-slate-300 font-mono transition-colors"
                    >
                      + Council Emergency
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setMessageText(
                          "Dear Member, Annual General Meeting (AGM 2026) is scheduled for October 15 at Central Auditorium. Please verify your attendance."
                        )
                      }
                      className="px-2.5 py-1 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-[11px] text-slate-300 font-mono transition-colors"
                    >
                      + AGM Notice
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setMessageText(
                          "শ্রদ্ধেয় সদস্য, আপনার মেম্বারশিপ ফি বকেয়া রয়েছে। ঝামেলাহীন সেবা বজায় রাখতে অনুগ্রহ করে পোর্টাল থেকে পরিশোধ করুন।"
                        )
                      }
                      className="px-2.5 py-1 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-[11px] text-slate-300 font-mono transition-colors"
                    >
                      + Dues Alert (বাংলা)
                    </button>
                  </div>
                </div>

                {/* Dispatch Button & Summary */}
                <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs font-mono text-slate-400 space-y-0.5">
                    <div>
                      Target Audience: <strong className="text-white">{selectedBranch.memberCount} Recipients</strong>
                    </div>
                    <div>
                      Estimated Consumption:{" "}
                      <strong className="text-amber-400">
                        {selectedBranch.memberCount * segments} SMS Units
                      </strong>
                    </div>
                  </div>

                  <Button
                    className="w-full sm:w-auto bg-rose-600 hover:bg-rose-500 text-white font-bold"
                    onClick={handleDispatch}
                    disabled={dispatched}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {dispatched ? "Broadcasting to Mobile Network..." : "Transmit Emergency Broadcast"}
                  </Button>
                </div>

                {dispatched && (
                  <div className="p-4 rounded-xl border border-emerald-500/40 bg-emerald-950/30 text-emerald-300 text-xs font-mono flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    Broadcast transmitted to {selectedBranch.memberCount} recipients via {activeProvider}. DLR webhooks listening.
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Col: Mobile Handset Simulator */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-amber-400" />
              Recipient Viewport Simulator
            </h3>

            {/* Simulated Smartphone Shell */}
            <div className="mx-auto max-w-[280px] rounded-[36px] border-4 border-slate-700 bg-slate-900 p-3 shadow-2xl relative">
              {/* Speaker notch */}
              <div className="w-20 h-4 bg-slate-800 rounded-full mx-auto mb-3" />

              {/* Screen Area */}
              <div className="rounded-[24px] bg-slate-950 p-4 border border-slate-800 min-h-[380px] flex flex-col justify-between">
                <div>
                  {/* SMS Header */}
                  <div className="text-center pb-3 border-b border-slate-800/60">
                    <p className="text-[10px] text-slate-500 uppercase font-mono">Verified Sender</p>
                    <p className="text-xs font-bold text-amber-400 font-mono tracking-wider">{senderId}</p>
                    <p className="text-[9px] text-slate-500">via Bangladesh Telecom</p>
                  </div>

                  {/* SMS Bubble */}
                  <div className="mt-4 p-3 rounded-2xl rounded-tl-sm bg-slate-800/80 border border-white/5 text-xs text-white font-bangla leading-relaxed shadow-sm">
                    {messageText || "No message entered"}
                    <span className="block text-[9px] text-slate-400 font-mono text-right mt-1.5">
                      Now · {isUnicode ? "Unicode" : "GSM"}
                    </span>
                  </div>
                </div>

                {/* Footer seal */}
                <div className="pt-2 text-center text-[9px] font-mono text-slate-600">
                  Encrypted DLR Monitored
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
