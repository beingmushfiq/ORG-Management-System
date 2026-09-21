"use client";

import React, { useState } from "react";
import {
  DollarSign,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
  CreditCard,
  Building,
  QrCode,
  Download,
  AlertTriangle,
  ArrowLeft,
  Receipt,
  FileCheck,
} from "lucide-react";
import { Button, Badge, Card, CardHeader, CardTitle, CardDescription, CardContent } from "@org/ui";
import Link from "next/link";

interface VerificationQueueItem {
  id: string;
  invoiceNumber: string;
  memberName: string;
  memberNameBn: string;
  memberId: string;
  branchName: string;
  tier: "ASSOCIATE" | "GENERAL" | "LIFE";
  paymentMethod: "BANK_TRANSFER" | "BKASH_PERSONAL" | "NAGAD_PERSONAL";
  amountPaisa: bigint;
  transactionRef: string;
  submittedAt: string;
  slipUrl?: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

const INITIAL_QUEUE: VerificationQueueItem[] = [
  {
    id: "q-1",
    invoiceNumber: "INV-2026-00481",
    memberName: "Dr. Kazi Mostafa",
    memberNameBn: "ডাঃ কাজী মোস্তফা",
    memberId: "BMA-GEN-0294",
    branchName: "Kotwali Central Hospital Unit",
    tier: "GENERAL",
    paymentMethod: "BANK_TRANSFER",
    amountPaisa: 50000n, // ৳500.00
    transactionRef: "SONALI-DEP-884920",
    submittedAt: "15 minutes ago",
    slipUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=80",
    status: "PENDING",
  },
  {
    id: "q-2",
    invoiceNumber: "INV-2026-00482",
    memberName: "Dr. Nusrat Jahan",
    memberNameBn: "ডাঃ নুসরাত জাহান",
    memberId: "BMA-ASSOC-0112",
    branchName: "Panchlaish Clinic Circle",
    tier: "ASSOCIATE",
    paymentMethod: "BKASH_PERSONAL",
    amountPaisa: 20000n, // ৳200.00
    transactionRef: "9K4L2M8X7P",
    submittedAt: "1 hour ago",
    status: "PENDING",
  },
  {
    id: "q-3",
    invoiceNumber: "INV-2026-00390",
    memberName: "Prof. Dr. Anwar Hossain",
    memberNameBn: "অধ্যাপক ডাঃ আনোয়ার হোসেন",
    memberId: "BMA-LIFE-0089",
    branchName: "Central Executive Secretariat",
    tier: "LIFE",
    paymentMethod: "BANK_TRANSFER",
    amountPaisa: 2500000n, // ৳25,000.00
    transactionRef: "EBL-ONLINE-992384",
    submittedAt: "Yesterday at 4:30 PM",
    slipUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=80",
    status: "APPROVED",
  },
];

export default function TreasurerFinancePortal() {
  const [queue, setQueue] = useState<VerificationQueueItem[]>(INITIAL_QUEUE);
  const [selectedSlip, setSelectedSlip] = useState<VerificationQueueItem | null>(null);
  const [receiptModal, setReceiptModal] = useState<VerificationQueueItem | null>(null);

  const formatTaka = (amountPaisa: bigint) => {
    const taka = Number(amountPaisa / 100n);
    return new Intl.NumberFormat("en-BD", { style: "currency", currency: "BDT" }).format(taka);
  };

  const handleApprove = (id: string) => {
    const item = queue.find((q) => q.id === id);
    if (!item) return;

    setQueue((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status: "APPROVED" as const } : q))
    );
    setReceiptModal(item);
  };

  const handleReject = (id: string) => {
    setQueue((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status: "REJECTED" as const } : q))
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500/20 selection:text-amber-300">
      {/* Top Navbar */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-xl px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Link
            href="/portal/members"
            className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-mono tracking-wider uppercase"
          >
            <ArrowLeft className="w-4 h-4" /> Governance Portal
          </Link>
          <span className="text-slate-700 font-mono">|</span>
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-amber-400" />
            <span className="text-sm font-semibold tracking-wide uppercase text-slate-300">
              Treasurer Command & Financial Ledger
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-emerald-500/40 text-emerald-400 bg-emerald-500/10 font-mono text-xs">
            Paisa-Precision (BigInt)
          </Badge>
          <Badge variant="outline" className="border-amber-500/40 text-amber-400 bg-amber-500/10 font-mono text-xs">
            EPS Active
          </Badge>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl w-full mx-auto px-6 py-8 space-y-8">
        {/* KPI Header Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-xl">
            <CardHeader className="pb-2">
              <CardDescription className="text-xs uppercase tracking-wider font-mono text-slate-400">
                Total Dues Collected (MTD)
              </CardDescription>
              <CardTitle className="text-2xl font-bold text-white flex items-baseline justify-between mt-1">
                <span>৳ 4,82,500</span>
                <span className="text-xs font-mono text-emerald-400 flex items-center">
                  +14.2% <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-slate-500 font-mono">48,250,000 paisa settled</p>
            </CardContent>
          </Card>

          <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-xl">
            <CardHeader className="pb-2">
              <CardDescription className="text-xs uppercase tracking-wider font-mono text-slate-400">
                Pending Verification Queue
              </CardDescription>
              <CardTitle className="text-2xl font-bold text-amber-400 flex items-baseline justify-between mt-1">
                <span>{queue.filter((q) => q.status === "PENDING").length} Slips</span>
                <Badge variant="outline" className="border-amber-500/40 text-amber-400 bg-amber-500/10 text-[10px]">
                  Requires Action
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-slate-500 font-mono">Bank slips & personal MFS references</p>
            </CardContent>
          </Card>

          <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-xl">
            <CardHeader className="pb-2">
              <CardDescription className="text-xs uppercase tracking-wider font-mono text-slate-400">
                Delinquency Alerts (30-60d)
              </CardDescription>
              <CardTitle className="text-2xl font-bold text-rose-400 flex items-baseline justify-between mt-1">
                <span>18 Members</span>
                <span className="text-xs font-mono text-rose-400 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> Action
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-slate-500 font-mono">Automatic SMS reminder queued</p>
            </CardContent>
          </Card>

          <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-xl">
            <CardHeader className="pb-2">
              <CardDescription className="text-xs uppercase tracking-wider font-mono text-slate-400">
                Active Payment Gateways
              </CardDescription>
              <CardTitle className="text-2xl font-bold text-white flex items-baseline justify-between mt-1">
                <span>4 Adapters</span>
                <span className="text-xs font-mono text-emerald-400">100% Uptime</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-slate-500 font-mono">EPS · bKash · Nagad · SSLCommerz</p>
            </CardContent>
          </Card>
        </div>

        {/* Multi-Gateway Status Bar */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 backdrop-blur-xl flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
              Gateway Settlement Health
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-1.5 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>EPS PSO: Live (৳2,18,000 MTD)</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>bKash Checkout: Live (৳1,45,500 MTD)</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Nagad PGW: Live (৳78,000 MTD)</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>SSLCommerz: Live (৳41,000 MTD)</span>
            </div>
          </div>
        </div>

        {/* Verification Queue Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-amber-400" />
                Treasurer Verification Queue
              </h2>
              <p className="text-xs text-slate-400">
                Manual bank transfer deposits and personal MFS transaction IDs awaiting executive review
              </p>
            </div>
            <Badge variant="outline" className="border-slate-800 text-slate-400 text-xs">
              Showing {queue.length} items
            </Badge>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-950/80 text-xs uppercase font-mono text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="px-6 py-3.5">Invoice & Member</th>
                    <th className="px-6 py-3.5">Branch Node</th>
                    <th className="px-6 py-3.5">Method & Reference</th>
                    <th className="px-6 py-3.5 text-right">Amount (Paisa)</th>
                    <th className="px-6 py-3.5">Status</th>
                    <th className="px-6 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {queue.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-white">{item.memberName}</div>
                        <div className="text-xs text-slate-400 font-bangla">{item.memberNameBn}</div>
                        <div className="text-xs font-mono text-amber-400/80 mt-0.5">
                          {item.memberId} · {item.invoiceNumber}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-xs font-medium text-slate-300 flex items-center gap-1">
                          <Building className="w-3.5 h-3.5 text-slate-500" />
                          {item.branchName}
                        </div>
                        <Badge variant="outline" className="border-slate-700 text-slate-400 text-[10px] mt-1">
                          {item.tier}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-mono text-xs text-slate-200">{item.transactionRef}</div>
                        <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {item.paymentMethod} · {item.submittedAt}
                        </div>
                        {item.slipUrl && (
                          <button
                            onClick={() => setSelectedSlip(item)}
                            className="text-xs text-blue-400 hover:underline inline-flex items-center gap-1 mt-1 font-mono"
                          >
                            <FileText className="w-3 h-3" /> View Deposit Slip
                          </button>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right font-mono">
                        <div className="font-bold text-white">{formatTaka(item.amountPaisa)}</div>
                        <div className="text-[10px] text-slate-500 font-mono">
                          {item.amountPaisa.toString()} paisa
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {item.status === "PENDING" && (
                          <Badge variant="outline" className="border-amber-500/40 text-amber-400 bg-amber-500/10 text-xs">
                            Under Review
                          </Badge>
                        )}
                        {item.status === "APPROVED" && (
                          <Badge variant="outline" className="border-emerald-500/40 text-emerald-400 bg-emerald-500/10 text-xs">
                            Settled & Cleared
                          </Badge>
                        )}
                        {item.status === "REJECTED" && (
                          <Badge variant="outline" className="border-rose-500/40 text-rose-400 bg-rose-500/10 text-xs">
                            Rejected
                          </Badge>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {item.status === "PENDING" ? (
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-rose-500/40 text-rose-400 hover:bg-rose-500/10 text-xs"
                              onClick={() => handleReject(item.id)}
                            >
                              <XCircle className="w-3.5 h-3.5 mr-1" /> Reject
                            </Button>
                            <Button
                              size="sm"
                              className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs"
                              onClick={() => handleApprove(item.id)}
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Approve & Issue
                            </Button>
                          </div>
                        ) : item.status === "APPROVED" ? (
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-slate-700 text-slate-300 hover:text-white text-xs"
                            onClick={() => setReceiptModal(item)}
                          >
                            <Receipt className="w-3.5 h-3.5 mr-1" /> Receipt
                          </Button>
                        ) : (
                          <span className="text-xs text-slate-500 font-mono">No action</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Deposit Slip Preview Modal */}
      {selectedSlip && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-lg w-full rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-400" />
                Deposit Slip Attachment
              </h3>
              <button
                onClick={() => setSelectedSlip(null)}
                className="text-slate-400 hover:text-white text-sm font-mono"
              >
                ✕ Close
              </button>
            </div>
            <div className="space-y-2 text-xs">
              <p className="text-slate-300">
                <strong className="text-white">Member:</strong> {selectedSlip.memberName} (
                {selectedSlip.memberId})
              </p>
              <p className="text-slate-300">
                <strong className="text-white">Reference:</strong> {selectedSlip.transactionRef}
              </p>
              <p className="text-slate-300">
                <strong className="text-white">Amount:</strong> {formatTaka(selectedSlip.amountPaisa)}
              </p>
            </div>
            {selectedSlip.slipUrl && (
              <div className="rounded-xl overflow-hidden border border-slate-800 max-h-80 bg-slate-950 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedSlip.slipUrl}
                  alt="Deposit slip"
                  className="w-full h-auto object-cover"
                />
              </div>
            )}
            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                className="border-slate-700 text-slate-300"
                onClick={() => setSelectedSlip(null)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Digital Money Receipt Modal */}
      {receiptModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full rounded-2xl border border-emerald-500/40 bg-slate-900 p-6 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 text-emerald-400">
                <Receipt className="w-5 h-5" />
                <h3 className="text-base font-bold text-white">Digital Money Receipt</h3>
              </div>
              <button
                onClick={() => setReceiptModal(null)}
                className="text-slate-400 hover:text-white text-sm font-mono"
              >
                ✕ Close
              </button>
            </div>

            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/80 space-y-3 font-mono text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Receipt Serial:</span>
                <span className="text-amber-400 font-bold">RCP-{receiptModal.invoiceNumber.replace("INV-", "")}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Recipient:</span>
                <span className="text-white font-medium">{receiptModal.memberName}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Member ID:</span>
                <span className="text-slate-200">{receiptModal.memberId}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Amount Paid:</span>
                <span className="text-emerald-400 font-bold">{formatTaka(receiptModal.amountPaisa)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Settlement Date:</span>
                <span className="text-slate-200">{new Date().toLocaleDateString("en-BD")}</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                <span className="text-slate-500">QR Authenticity Seal:</span>
                <span className="text-emerald-400 flex items-center gap-1 font-mono">
                  <QrCode className="w-3.5 h-3.5" /> SHA256-VERIFIED
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 border-slate-700 text-slate-300"
                onClick={() => window.print()}
              >
                <Download className="w-4 h-4 mr-1.5" /> Print / Save
              </Button>
              <Button
                size="sm"
                className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold"
                onClick={() => setReceiptModal(null)}
              >
                Done
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
