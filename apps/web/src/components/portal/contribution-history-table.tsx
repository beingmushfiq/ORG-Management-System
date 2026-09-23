"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Download,
  ArrowRight,
  Printer,
  CheckCircle2,
  CreditCard,
  X,
  ShieldCheck,
  QrCode,
} from "lucide-react";
import { Button } from "@org/ui";
import { OrgLogo } from "@/components/brand/org-logo";

export interface ContributionItem {
  id: string;
  month: string;
  amountTaka: number;
  status: "PAID" | "PENDING" | "WAIVED";
  paidDate?: string;
  receiptNumber?: string;
  paymentMethod?: string;
  securityHash?: string;
}

const DEFAULT_CONTRIBUTIONS: ContributionItem[] = [
  {
    id: "inv-2026-09",
    month: "Sep 2026",
    amountTaka: 300,
    status: "PENDING",
  },
  {
    id: "inv-2026-08",
    month: "Aug 2026",
    amountTaka: 300,
    status: "PAID",
    paidDate: "10 Aug 2026",
    receiptNumber: "RSM-RCT-2026-0814",
    paymentMethod: "bKash Tokenized Checkout",
    securityHash: "7b4c6e9a8f2d1e0b5c3a4f6d8e9a2b1c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a",
  },
  {
    id: "inv-2026-07",
    month: "Jul 2026",
    amountTaka: 300,
    status: "PAID",
    paidDate: "08 Jul 2026",
    receiptNumber: "RSM-RCT-2026-0722",
    paymentMethod: "EPS Gateway",
    securityHash: "2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b",
  },
  {
    id: "inv-2026-06",
    month: "Jun 2026",
    amountTaka: 300,
    status: "PAID",
    paidDate: "12 Jun 2026",
    receiptNumber: "RSM-RCT-2026-0619",
    paymentMethod: "Nagad PGW",
    securityHash: "f1e2d3c4b5a69870123456789abcdef0123456789abcdef0123456789abcdef0",
  },
  {
    id: "inv-2026-05",
    month: "May 2026",
    amountTaka: 300,
    status: "PAID",
    paidDate: "05 May 2026",
    receiptNumber: "RSM-RCT-2026-0530",
    paymentMethod: "bKash Tokenized Checkout",
    securityHash: "c0d1e2f3a4b567890123456789abcdef0123456789abcdef0123456789abcdef",
  },
];

export function ContributionHistoryTable() {
  const [items, setItems] = useState<ContributionItem[]>(DEFAULT_CONTRIBUTIONS);
  const [selectedReceipt, setSelectedReceipt] = useState<ContributionItem | null>(null);
  const [payModalItem, setPayModalItem] = useState<ContributionItem | null>(null);
  const [paying, setPaying] = useState(false);
  const [paidSuccess, setPaidSuccess] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const executePayment = (gateway: string) => {
    setPaying(true);
    setTimeout(() => {
      setPaying(false);
      setPaidSuccess(true);
      if (payModalItem) {
        setItems((prev) =>
          prev.map((item) =>
            item.id === payModalItem.id
              ? {
                  ...item,
                  status: "PAID",
                  paidDate: "Today",
                  paymentMethod: `${gateway} Tokenized Checkout`,
                  receiptNumber: `RSM-RCT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
                  securityHash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
                }
              : item
          )
        );
      }
      setTimeout(() => {
        setPayModalItem(null);
        setPaidSuccess(false);
      }, 1500);
    }, 1200);
  };

  return (
    <div className="w-full rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-4">
      {/* Panel Header */}
      <div className="flex items-center justify-between pb-2 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-foreground">Contribution History</h2>
            <p className="text-[11px] text-muted-foreground font-bangla">
              মাসিক চাঁদা ও আর্থিক অবদানের বিবরণী
            </p>
          </div>
        </div>

        <Link
          href="/portal/finance"
          className="text-xs text-primary font-medium hover:underline flex items-center gap-1"
        >
          View All <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      {/* Tabular Ledger */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead>
            <tr className="border-b border-border text-muted-foreground font-semibold">
              <th className="py-2.5 px-3">Month</th>
              <th className="py-2.5 px-3">Amount</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3 text-right">Receipt</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {items.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-muted/40 transition-colors group"
              >
                {/* Month */}
                <td className="py-3 px-3 font-medium text-foreground">
                  {item.month}
                </td>

                {/* Amount */}
                <td className="py-3 px-3 font-mono font-bold text-foreground">
                  ৳{item.amountTaka}
                </td>

                {/* Status */}
                <td className="py-3 px-3">
                  {item.status === "PAID" ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                      Paid
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setPayModalItem(item)}
                      className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 hover:bg-amber-500/25 transition-colors cursor-pointer"
                      title="Click to Pay Online"
                    >
                      Pending • Pay Now
                    </button>
                  )}
                </td>

                {/* Receipt Download Action */}
                <td className="py-3 px-3 text-right">
                  {item.status === "PAID" ? (
                    <button
                      type="button"
                      onClick={() => setSelectedReceipt(item)}
                      className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-emerald-600 transition-colors"
                      title="View & Download Official Receipt"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  ) : (
                    <span className="text-muted-foreground/60 font-mono">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Official Cryptographic Money Receipt Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-2xl space-y-5 text-card-foreground">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-500" />
                <h3 className="text-sm font-bold uppercase tracking-wider font-mono">
                  Official Electronic Money Receipt
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedReceipt(null)}
                className="p-1 rounded-md text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Printable Receipt Card */}
            <div className="rounded-xl border border-border bg-background p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <OrgLogo size="sm" />
                <div className="text-right">
                  <p className="text-[10px] font-mono text-muted-foreground">Receipt Number</p>
                  <p className="text-xs font-mono font-bold text-foreground">
                    {selectedReceipt.receiptNumber}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-muted-foreground block text-[11px]">Received From:</span>
                  <span className="font-semibold text-foreground">Tanvir Rahman</span>
                  <span className="block text-[11px] font-mono text-muted-foreground">
                    Member ID: 18-23
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[11px]">Payment Date:</span>
                  <span className="font-medium text-foreground">{selectedReceipt.paidDate}</span>
                  <span className="block text-[11px] text-emerald-600 font-medium">
                    Status: Verified Paid
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-muted/60 border border-border flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-foreground">
                    Monthly Contribution ({selectedReceipt.month})
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Via {selectedReceipt.paymentMethod}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-base font-bold font-mono text-foreground">
                    ৳{selectedReceipt.amountTaka}.00
                  </span>
                  <p className="text-[10px] text-muted-foreground font-bangla">তিনশত টাকা মাত্র</p>
                </div>
              </div>

              {/* SHA-256 Stamp */}
              <div className="pt-1 flex items-center gap-2 text-[10px] font-mono text-muted-foreground border-t border-border/80">
                <QrCode className="h-6 w-6 text-muted-foreground shrink-0" />
                <div className="overflow-hidden">
                  <span className="block text-foreground font-semibold">
                    SHA-256 Audit Validation Seal:
                  </span>
                  <span className="truncate block opacity-80">
                    {selectedReceipt.securityHash}
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-1">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrint}
                leftIcon={<Printer className="h-3.5 w-3.5" />}
              >
                Print Receipt
              </Button>

              <Button
                variant="primary"
                size="sm"
                onClick={() => setSelectedReceipt(null)}
                className="bg-[#164e32] hover:bg-[#113d27] text-white"
              >
                Done
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Online Payment Modal */}
      {payModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl space-y-5 text-card-foreground">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                <h3 className="text-sm font-bold text-foreground">
                  Pay Monthly Dues: {payModalItem.month}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setPayModalItem(null)}
                className="p-1 rounded-md text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {paidSuccess ? (
              <div className="py-6 text-center space-y-2">
                <CheckCircle2 className="h-12 w-12 text-emerald-500 mx-auto" />
                <h4 className="font-bold text-foreground">Payment Successful!</h4>
                <p className="text-xs text-muted-foreground font-bangla">
                  ৳{payModalItem.amountTaka} সফলভাবে পরিশোধ হয়েছে। মানি রিসিপ্ট প্রস্তুত করা হয়েছে।
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-muted/60 border border-border flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-foreground">Amount Payable</p>
                    <p className="text-[11px] text-muted-foreground font-bangla">মাসিক চাঁদা</p>
                  </div>
                  <div className="text-lg font-mono font-bold text-foreground">
                    ৳{payModalItem.amountTaka}.00
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-mono uppercase text-muted-foreground">
                    Select Payment Gateway
                  </p>

                  <button
                    type="button"
                    disabled={paying}
                    onClick={() => executePayment("bKash")}
                    className="w-full p-3 rounded-xl border border-pink-500/30 bg-pink-500/10 hover:bg-pink-500/20 text-pink-700 dark:text-pink-300 text-xs font-semibold flex items-center justify-between transition-all"
                  >
                    <span>bKash Instant Checkout</span>
                    <span className="font-mono text-[11px]">বিকাশ</span>
                  </button>

                  <button
                    type="button"
                    disabled={paying}
                    onClick={() => executePayment("Nagad")}
                    className="w-full p-3 rounded-xl border border-orange-500/30 bg-orange-500/10 hover:bg-orange-500/20 text-orange-700 dark:text-orange-300 text-xs font-semibold flex items-center justify-between transition-all"
                  >
                    <span>Nagad PGW Payment</span>
                    <span className="font-mono text-[11px]">নগদ</span>
                  </button>

                  <button
                    type="button"
                    disabled={paying}
                    onClick={() => executePayment("EPS")}
                    className="w-full p-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center justify-between transition-all"
                  >
                    <span>EPS (Electronic Payment System)</span>
                    <span className="font-mono text-[11px]">PSO Interoperable</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
