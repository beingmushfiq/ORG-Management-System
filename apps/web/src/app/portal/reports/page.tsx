"use client";

import React, { useState } from "react";
import {
  Printer,
  Download,
  ArrowLeft,
  BookOpen,
} from "lucide-react";
import { Button } from "@org/ui";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";

interface MemberRecord {
  serial: number;
  membershipNo: string;
  name: string;
  fatherOrHusbandName: string;
  tier: string;
  branch: string;
  admissionDate: string;
  nationalId: string;
  duesStatus: "CLEARED" | "UNPAID";
  standing: "ACTIVE" | "SUSPENDED";
}

interface CashBookRow {
  date: string;
  voucherNo: string;
  particulars: string;
  accountHead: string;
  receiptTaka: number;
  paymentTaka: number;
}

const SAMPLE_REGISTER: MemberRecord[] = [
  {
    serial: 1,
    membershipNo: "RSM-VOL-2018-001",
    name: "Engr. Tanvir Ahmed",
    fatherOrHusbandName: "Md. Rafiqul Ahmed",
    tier: "PERMANENT",
    branch: "Dhaka Central Secretariat",
    admissionDate: "2018-08-01",
    nationalId: "NID: 19942691230491823",
    duesStatus: "CLEARED",
    standing: "ACTIVE",
  },
  {
    serial: 2,
    membershipNo: "RSM-ACT-2019-042",
    name: "Nusrat Jahan",
    fatherOrHusbandName: "Late Anwar Hossain",
    tier: "CAMPUS_MARSHAL",
    branch: "Dhaka University Campus Chapter",
    admissionDate: "2019-03-15",
    nationalId: "NID: 20002692230491811",
    duesStatus: "CLEARED",
    standing: "ACTIVE",
  },
  {
    serial: 3,
    membershipNo: "RSM-GEN-2020-108",
    name: "Rafiqul Islam",
    fatherOrHusbandName: "Alhaj M. Hossain",
    tier: "GENERAL",
    branch: "Chattogram District Chapter",
    admissionDate: "2020-08-19",
    nationalId: "NID: 19882693230491899",
    duesStatus: "UNPAID",
    standing: "ACTIVE",
  },
  {
    serial: 4,
    membershipNo: "RSM-VOL-2021-319",
    name: "Tasnim Sultana",
    fatherOrHusbandName: "Dr. A. Islam",
    tier: "FIELD_VOLUNTEER",
    branch: "Sylhet District Chapter",
    admissionDate: "2021-01-10",
    nationalId: "NID: 20022694230491855",
    duesStatus: "CLEARED",
    standing: "SUSPENDED",
  },
];

const SAMPLE_CASH_BOOK: CashBookRow[] = [
  {
    date: "2026-09-01",
    voucherNo: "VR-2026-001",
    particulars: "Volunteer Pass Subscriptions & Chapter Allocations",
    accountHead: "MEMBERSHIP_FEE_COLLECTION",
    receiptTaka: 250000,
    paymentTaka: 0,
  },
  {
    date: "2026-09-05",
    voucherNo: "VP-2026-001",
    particulars: "High-Visibility Safety Vests & Zebra Stencils Procurement",
    accountHead: "SAFETY_EQUIPMENT_EXPENSE",
    receiptTaka: 0,
    paymentTaka: 120000,
  },
  {
    date: "2026-09-10",
    voucherNo: "VR-2026-002",
    particulars: "Corporate CSR Donation for Highway Radar Deployment",
    accountHead: "INSTITUTIONAL_DONATION",
    receiptTaka: 500000,
    paymentTaka: 0,
  },
  {
    date: "2026-09-14",
    voucherNo: "VP-2026-002",
    particulars: "Emergency Trauma Hospital Aid & Legal Defense Grants",
    accountHead: "VICTIM_RELIEF_DISBURSEMENT",
    receiptTaka: 0,
    paymentTaka: 230000,
  },
];

export default function StatutoryReportsPage() {
  const [lang, setLang] = useState<"en" | "bn">("en");
  const [activeTab, setActiveTab] = useState<"MEMBER_REGISTER" | "AGM_VOTERS" | "CASH_BOOK">("MEMBER_REGISTER");

  const activeVoters = SAMPLE_REGISTER.filter((m) => m.standing === "ACTIVE" && m.duesStatus === "CLEARED");

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-amber-500/20 print:bg-white print:text-black">
      {/* Header (hidden in print) */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/85 backdrop-blur-2xl print:hidden">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/portal"
              className="flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {lang === "en" ? "Back to Portal" : "পোর্টাল ড্যাশবোর্ডে ফিরুন"}
            </Link>
            <div className="h-4 w-[1px] bg-border hidden sm:block" />
            <div className="flex items-center gap-2 text-xs font-bold text-foreground">
              <BookOpen className="w-4 h-4 text-amber-500" />
              {lang === "en" ? "Statutory Registers & Institutional Audit" : "সংবিধিবদ্ধ রেজিষ্ট্রার ও সরকারী অডিট প্রতিবেদন"}
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
              {lang === "en" ? "Print Official Copy" : "অফিসিয়াল কপি প্রিন্ট"}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 py-8 flex-1 w-full space-y-6 print:p-0 print:max-w-none">
        {/* Navigation Tabs (Hidden in print) */}
        <div className="flex flex-wrap items-center justify-between gap-4 print:hidden">
          <div className="flex flex-wrap gap-2">
            {[
              { key: "MEMBER_REGISTER", labelEn: "Societies Act Member Register", labelBn: "সদস্য রেজিষ্ট্রার (১৮৬০ আইন)" },
              { key: "AGM_VOTERS", labelEn: "National Council Voter Roll", labelBn: "জাতীয় কাউন্সিল ভোটার তালিকা" },
              { key: "CASH_BOOK", labelEn: "Statutory Cash Book Ledger", labelBn: "আয়-ব্যয় ও ক্যাশ বুক" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === tab.key
                    ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {lang === "en" ? tab.labelEn : tab.labelBn}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={() => alert("Exporting certified CSV for government audit submission...")}
              size="sm"
              variant="outline"
              className="border-border text-foreground hover:bg-muted text-xs gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              {lang === "en" ? "Export CSV" : "সিএসভি এক্সপোর্ট"}
            </Button>
          </div>
        </div>

        {/* Printable Document Sheet */}
        <div className="bg-card border border-border rounded-2xl p-8 shadow-2xl relative overflow-hidden print:bg-transparent print:border-none print:shadow-none print:p-0">
          {/* Official Letterhead in Print / Screen Header */}
          <div className="border-b-2 border-amber-500/40 pb-6 mb-6 text-center space-y-1 print:border-black">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground uppercase font-serif tracking-wider print:text-black">
              {lang === "en" ? "Road Safety Movement (নিরাপদ সড়ক আন্দোলন)" : "নিরাপদ সড়ক আন্দোলন — জাতীয় সচিবালয়"}
            </h1>
            <p className="text-xs text-muted-foreground font-bangla print:text-gray-700">
              {lang === "en"
                ? "Secretariat Archive & Statutory Compliance Bureau • Reg No: S-1048 Under Societies Registration Act XXI of 1860"
                : "জাতীয় সচিবালয় • সংবিধিবদ্ধ রেকর্ড ও সরকারী নিরীক্ষা অনুবিভাগ (রেজিস্ট্রেশন নং: এস-১০৪৮)"}
            </p>
            <div className="text-xs font-bold font-serif text-amber-500 dark:text-amber-400 pt-2 uppercase tracking-wide print:text-black">
              {activeTab === "MEMBER_REGISTER" &&
                (lang === "en" ? "Statutory Roll of Enrolled Activists & Council Members" : "সংবিধিবদ্ধ সক্রিয় সংগঠক ও কাউন্সিল সদস্যদের তালিকা")}
              {activeTab === "AGM_VOTERS" &&
                (lang === "en" ? "National Council Certified Voter Roll & Polling Register" : "জাতীয় কাউন্সিল সাধারণ অধিবেশনের চূড়ান্ত অনুমোদিত ভোটার তালিকা")}
              {activeTab === "CASH_BOOK" &&
                (lang === "en" ? "Audited Double-Entry Cash Book Statement (FY 2026-2027)" : "নিরীক্ষিত আয়-ব্যয় হিসাব ও ক্যাশ বুক বিবরণী (অর্থবছর ২০২৬-২০২৭)")}
            </div>
          </div>

          {/* TAB 1: Societies Act Member Register */}
          {activeTab === "MEMBER_REGISTER" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-border text-muted-foreground print:text-black print:border-black font-serif">
                    <th className="py-3 px-3">SL</th>
                    <th className="py-3 px-3">Membership ID</th>
                    <th className="py-3 px-3">Full Name & National ID</th>
                    <th className="py-3 px-3">Father / Spouse Name</th>
                    <th className="py-3 px-3">Cadre</th>
                    <th className="py-3 px-3">Chapter Unit</th>
                    <th className="py-3 px-3">Admission Date</th>
                    <th className="py-3 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60 print:divide-gray-300">
                  {SAMPLE_REGISTER.map((m) => (
                    <tr key={m.serial} className="hover:bg-muted/40 text-foreground print:text-black">
                      <td className="py-3 px-3 font-mono">{m.serial}</td>
                      <td className="py-3 px-3 font-mono font-bold text-amber-600 dark:text-amber-400 print:text-black">
                        {m.membershipNo}
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-bold text-foreground print:text-black">{m.name}</div>
                        <div className="text-[10px] text-muted-foreground print:text-gray-600">{m.nationalId}</div>
                      </td>
                      <td className="py-3 px-3 text-muted-foreground">{m.fatherOrHusbandName}</td>
                      <td className="py-3 px-3 font-semibold">{m.tier}</td>
                      <td className="py-3 px-3">{m.branch}</td>
                      <td className="py-3 px-3 font-mono text-muted-foreground">{m.admissionDate}</td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            m.standing === "ACTIVE" && m.duesStatus === "CLEARED"
                              ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 print:text-black"
                              : "bg-red-500/15 text-red-600 dark:text-red-400 print:text-black"
                          }`}
                        >
                          {m.standing === "ACTIVE" ? (m.duesStatus === "CLEARED" ? "ACTIVE / CLEARED" : "DUES PENDING") : "SUSPENDED"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 2: AGM Certified Voter Roll with Signature Box */}
          {activeTab === "AGM_VOTERS" && (
            <div className="overflow-x-auto space-y-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground pb-2 border-b border-border print:text-black">
                <div>
                  Total Eligible Voting Delegates: <strong className="text-foreground print:text-black">{activeVoters.length}</strong>
                </div>
                <div>Session: National Auditorium, Dhaka • 06 Nov 2026</div>
              </div>

              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-border text-muted-foreground print:text-black print:border-black font-serif">
                    <th className="py-3 px-3">Ballot SL</th>
                    <th className="py-3 px-3">Voter ID</th>
                    <th className="py-3 px-3">Delegate Name</th>
                    <th className="py-3 px-3">Pass No</th>
                    <th className="py-3 px-3">Chapter Council</th>
                    <th className="py-3 px-6 text-center border-l border-border print:border-black">
                      Voter Physical Signature / Thumb Impression
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60 print:divide-gray-300">
                  {activeVoters.map((v, i) => (
                    <tr key={v.membershipNo} className="hover:bg-muted/40 text-foreground print:text-black">
                      <td className="py-4 px-3 font-mono font-bold">{i + 1}</td>
                      <td className="py-4 px-3 font-mono text-amber-600 dark:text-amber-400 font-bold print:text-black">
                        VTR-{String(i + 1).padStart(4, "0")}
                      </td>
                      <td className="py-4 px-3">
                        <div className="font-bold text-foreground print:text-black">{v.name}</div>
                        <div className="text-[10px] text-muted-foreground print:text-gray-600">{v.tier} ACTIVIST</div>
                      </td>
                      <td className="py-4 px-3 font-mono text-muted-foreground">{v.membershipNo}</td>
                      <td className="py-4 px-3">{v.branch}</td>
                      <td className="py-4 px-6 border-l border-border print:border-black text-center">
                        <div className="w-48 h-10 border border-dashed border-border print:border-black rounded mx-auto flex items-end justify-center pb-1 text-[10px] text-muted-foreground print:text-gray-400">
                          (Sign here at Polling Booth)
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 3: Statutory Cash Book */}
          {activeTab === "CASH_BOOK" && (
            <div className="overflow-x-auto space-y-4">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-border text-muted-foreground print:text-black print:border-black font-serif">
                    <th className="py-3 px-3">Date</th>
                    <th className="py-3 px-3">Voucher No</th>
                    <th className="py-3 px-3">Particulars / Head of Account</th>
                    <th className="py-3 px-3 text-right">Receipts (টাকা)</th>
                    <th className="py-3 px-3 text-right">Payments (টাকা)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60 print:divide-gray-300">
                  {SAMPLE_CASH_BOOK.map((c, i) => (
                    <tr key={i} className="hover:bg-muted/40 text-foreground print:text-black">
                      <td className="py-3 px-3 font-mono">{c.date}</td>
                      <td className="py-3 px-3 font-mono font-bold text-amber-600 dark:text-amber-400 print:text-black">{c.voucherNo}</td>
                      <td className="py-3 px-3">
                        <div className="font-bold text-foreground print:text-black">{c.particulars}</div>
                        <div className="text-[10px] text-muted-foreground font-mono print:text-gray-600">{c.accountHead}</div>
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-emerald-600 dark:text-emerald-400 print:text-black">
                        {c.receiptTaka > 0 ? `৳${c.receiptTaka.toLocaleString()}` : "—"}
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-rose-600 dark:text-rose-400 print:text-black">
                        {c.paymentTaka > 0 ? `৳${c.paymentTaka.toLocaleString()}` : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-border print:border-black font-bold text-foreground print:text-black">
                    <td colSpan={3} className="py-3 px-3 text-right font-serif uppercase">
                      Total Receipts & Disbursements:
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-emerald-600 dark:text-emerald-400 print:text-black">৳7,50,000</td>
                    <td className="py-3 px-3 text-right font-mono text-rose-600 dark:text-rose-400 print:text-black">৳3,50,000</td>
                  </tr>
                  <tr className="border-t border-border print:border-black font-bold text-amber-600 dark:text-amber-400 print:text-black">
                    <td colSpan={3} className="py-3 px-3 text-right font-serif uppercase">
                      Closing Net Cash Balance:
                    </td>
                    <td colSpan={2} className="py-3 px-3 text-right font-mono text-base">
                      ৳4,00,000 (Four Lakh Taka Only)
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}

          {/* Statutory Signatures Footer (Always visible in print) */}
          <div className="mt-14 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-8 print:border-black">
            <div className="text-center sm:text-left space-y-1">
              <div className="w-36 border-b border-foreground/30 print:border-black mb-1 mx-auto sm:mx-0" />
              <div className="text-xs font-bold text-foreground print:text-black">Advocate Shafiul Alam</div>
              <div className="text-[11px] text-muted-foreground print:text-gray-600">Executive Council Secretary</div>
            </div>

            <div className="text-center space-y-1">
              <div className="w-36 border-b border-foreground/30 print:border-black mb-1 mx-auto" />
              <div className="text-xs font-bold text-foreground print:text-black">Engr. Farhan Kabir</div>
              <div className="text-[11px] text-muted-foreground print:text-gray-600">Treasurer & Finance Director</div>
            </div>

            <div className="text-center sm:text-right space-y-1">
              <div className="w-36 border-b border-foreground/30 print:border-black mb-1 mx-auto sm:ml-auto sm:mr-0" />
              <div className="text-xs font-bold text-foreground print:text-black">M/s. Hoda Vasi Chowdhury & Co.</div>
              <div className="text-[11px] text-muted-foreground print:text-gray-600">Chartered Accountants (Auditors)</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
