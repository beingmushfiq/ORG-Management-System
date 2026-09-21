"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  CreditCard,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  Plus,
  RefreshCw,
  Printer,
  ShieldCheck,
} from "lucide-react";
import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  PageHeader,
  EmptyState,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@org/ui";
import { apiClient } from "@/lib/api-client";

export default function TreasuryDeskPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>({
    totalBilledBdt: "৳0.00",
    totalCollectedBdt: "৳0.00",
    pendingVerificationCount: 0,
    unpaidCount: 0,
    totalInvoices: 0,
  });

  const [invoices, setInvoices] = useState<any[]>([]);
  const [totalInvoices, setTotalInvoices] = useState(0);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [page, setPage] = useState(1);

  // Verification & Receipt States
  const [verifyingInvoice, setVerifyingInvoice] = useState<any | null>(null);
  const [receiptData, setReceiptData] = useState<any | null>(null);
  const [verifyNotes, setVerifyNotes] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  // New Invoice Modal
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newUserId, setNewUserId] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newAmountTaka, setNewAmountTaka] = useState("500");
  const [newDueDate, setNewDueDate] = useState("");

  const loadFinanceData = useCallback(async () => {
    setLoading(true);
    try {
      const [statsRes, invoicesRes] = await Promise.allSettled([
        apiClient.finance.getStats(),
        apiClient.finance.listInvoices({
          status: statusFilter === "ALL" ? undefined : statusFilter,
          page,
          limit: 15,
        }),
      ]);

      if (statsRes.status === "fulfilled") setStats(statsRes.value);
      if (invoicesRes.status === "fulfilled") {
        setInvoices(invoicesRes.value.items || []);
        setTotalInvoices(invoicesRes.value.total || 0);
      }
    } finally {
      setLoading(false);
    }
  }, [statusFilter, page]);

  useEffect(() => {
    loadFinanceData();
  }, [loadFinanceData]);

  const handleVerifySlip = async (approved: boolean) => {
    if (!verifyingInvoice) return;
    setActionLoading(true);
    setFeedback(null);

    try {
      await apiClient.finance.verifySlip({
        invoiceId: verifyingInvoice.id,
        approved,
        notes: verifyNotes || undefined,
      });

      setFeedback({
        type: "success",
        msg: approved
          ? "Deposit slip verified and invoice settled to PAID."
          : "Deposit slip rejected. Invoice returned to UNPAID.",
      });

      setVerifyingInvoice(null);
      setVerifyNotes("");
      await loadFinanceData();
    } catch (err: any) {
      setFeedback({
        type: "error",
        msg: err.message || "Failed to verify deposit slip.",
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleCreateInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    setFeedback(null);

    try {
      const amountPaisa = (BigInt(newAmountTaka) * 100n).toString();
      await apiClient.finance.createInvoice({
        userId: newUserId.trim(),
        description: newDescription.trim(),
        amountPaisa,
        dueDate: newDueDate || new Date(Date.now() + 30 * 86400000).toISOString(),
      });

      setFeedback({ type: "success", msg: "Invoice issued successfully." });
      setCreateModalOpen(false);
      setNewUserId("");
      setNewDescription("");
      await loadFinanceData();
    } catch (err: any) {
      setFeedback({ type: "error", msg: err.message || "Failed to create invoice." });
    } finally {
      setActionLoading(false);
    }
  };

  const handleViewReceipt = async (invoiceId: string) => {
    setActionLoading(true);
    try {
      const receipt = await apiClient.finance.getReceipt(invoiceId);
      setReceiptData(receipt);
    } catch (err: any) {
      setFeedback({ type: "error", msg: err.message || "Unable to fetch receipt." });
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PAID":
        return <Badge variant="success">Paid</Badge>;
      case "UNDER_VERIFICATION":
        return <Badge variant="warning">Verification Pending</Badge>;
      case "UNPAID":
        return <Badge variant="destructive">Unpaid</Badge>;
      case "OVERDUE":
        return <Badge variant="destructive">Overdue</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Treasury & Paisa Ledger Desk"
        titleBn="কোষাধ্যক্ষ ও অর্থ ব্যবস্থাপনা"
        description="Zero-float integer paisa ledgers, multi-gateway settlement reconciliations, bank slip verification queue, and tamper-proof money receipts."
        badge={
          <Badge variant="success" size="sm">
            Integer Paisa Engine
          </Badge>
        }
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={loadFinanceData}
              leftIcon={<RefreshCw className="h-3.5 w-3.5" />}
            >
              Refresh
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setCreateModalOpen(true)}
              leftIcon={<Plus className="h-3.5 w-3.5" />}
            >
              Issue Invoice
            </Button>
          </div>
        }
      />

      {feedback && (
        <div
          className={`p-3 rounded-md text-xs flex items-center gap-2 ${
            feedback.type === "success"
              ? "bg-emerald-950/40 border border-emerald-800 text-emerald-300"
              : "bg-red-950/40 border border-red-800 text-red-300"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
          ) : (
            <AlertTriangle className="h-4 w-4 shrink-0 text-red-400" />
          )}
          <span>{feedback.msg}</span>
        </div>
      )}

      {/* Primary Financial Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 space-y-1.5">
            <span className="text-xs text-muted-foreground font-medium">
              Total Realized Revenue
            </span>
            <div className="text-2xl font-bold text-emerald-500 font-mono">
              {stats.totalCollectedBdt}
            </div>
            <p className="text-[11px] text-muted-foreground">
              Settled via Gateway & Bank Deposit
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 space-y-1.5">
            <span className="text-xs text-muted-foreground font-medium">
              Total Dues Invoiced
            </span>
            <div className="text-2xl font-bold text-foreground font-mono">
              {stats.totalBilledBdt}
            </div>
            <p className="text-[11px] text-muted-foreground">
              Cumulative billing on membership rolls
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 space-y-1.5">
            <span className="text-xs text-muted-foreground font-medium">
              Slips Awaiting Signoff
            </span>
            <div className="text-2xl font-bold text-amber-500 font-mono">
              {stats.pendingVerificationCount}
            </div>
            <p className="text-[11px] text-muted-foreground">
              Manual bank slips in verification queue
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 space-y-1.5">
            <span className="text-xs text-muted-foreground font-medium">
              Outstanding Dues Invoices
            </span>
            <div className="text-2xl font-bold text-rose-500 font-mono">
              {stats.unpaidCount}
            </div>
            <p className="text-[11px] text-muted-foreground">
              Active members with unpaid annual dues
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-border pb-2 text-xs">
        {["ALL", "UNDER_VERIFICATION", "UNPAID", "PAID"].map((f) => (
          <button
            key={f}
            onClick={() => {
              setStatusFilter(f);
              setPage(1);
            }}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              statusFilter === f
                ? "bg-primary text-primary-foreground font-semibold"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            {f === "ALL"
              ? "All Invoices"
              : f === "UNDER_VERIFICATION"
              ? "Deposit Slips Queue"
              : f === "UNPAID"
              ? "Unpaid Dues"
              : "Settled Paid"}
          </button>
        ))}
      </div>

      {/* Invoices Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle className="text-base">Statutory Dues & Receipts Ledger</CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5 font-bangla">
              সকল ইনভয়েস, পেমেন্ট স্টেটমেন্ট এবং ব্যাংক ডিপোজিট রসিদ
            </p>
          </div>
          <Badge variant="outline">{totalInvoices} Invoices</Badge>
        </CardHeader>
        <CardContent className="pt-0">
          {loading ? (
            <div className="p-8 text-center text-xs text-muted-foreground animate-pulse">
              Querying treasury ledger...
            </div>
          ) : invoices.length === 0 ? (
            <EmptyState
              icon={<CreditCard className="h-8 w-8 text-muted-foreground" />}
              title="No Invoices Found"
              titleBn="কোনো ইনভয়েস পাওয়া যায়নি"
              description="No records match the current status filter."
            />
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice #</TableHead>
                    <TableHead>Member</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((inv) => (
                    <TableRow key={inv.id}>
                      <TableCell>
                        <span className="font-mono font-semibold text-xs text-primary">
                          {inv.invoiceNumber}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-foreground text-xs">
                            {inv.user?.fullName || "Member"}
                          </p>
                          <p className="text-[10px] text-muted-foreground font-mono">
                            {inv.user?.phone}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-xs text-muted-foreground">
                          {inv.description}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="font-mono font-bold text-xs text-foreground">
                          ৳{(Number(inv.amountPaisa) / 100).toFixed(2)}
                        </span>
                      </TableCell>
                      <TableCell>{getStatusBadge(inv.status)}</TableCell>
                      <TableCell>
                        <span className="font-mono text-xs text-muted-foreground">
                          {new Date(inv.dueDate).toLocaleDateString()}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {inv.status === "UNDER_VERIFICATION" && (
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => {
                                setVerifyingInvoice(inv);
                                setVerifyNotes("");
                              }}
                            >
                              Verify Slip
                            </Button>
                          )}

                          {inv.status === "PAID" && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewReceipt(inv.id)}
                              leftIcon={<FileCheck className="h-3.5 w-3.5" />}
                            >
                              Receipt
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal: Bank Slip Verification */}
      {verifyingInvoice && (
        <Dialog open={!!verifyingInvoice} onOpenChange={() => setVerifyingInvoice(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Verify Bank Deposit Slip</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 text-xs">
              <div className="p-3 rounded-lg bg-muted/40 border border-border space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Invoice Number:</span>
                  <span className="font-mono font-bold text-foreground">
                    {verifyingInvoice.invoiceNumber}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Member:</span>
                  <span className="font-semibold text-foreground">
                    {verifyingInvoice.user?.fullName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="font-mono font-bold text-emerald-500">
                    ৳{(Number(verifyingInvoice.amountPaisa) / 100).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bank Ref / Slip Code:</span>
                  <span className="font-mono text-amber-500 font-semibold">
                    {verifyingInvoice.transactionRef || "N/A"}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Audit Verification Notes</label>
                <input
                  type="text"
                  value={verifyNotes}
                  onChange={(e) => setVerifyNotes(e.target.value)}
                  placeholder="e.g. Verified against Sonali Bank credit scroll dated 22/09"
                  className="w-full px-3 py-2 rounded-md border border-input bg-background"
                />
              </div>

              <div className="flex justify-between items-center pt-2">
                <Button
                  variant="destructive"
                  size="sm"
                  disabled={actionLoading}
                  onClick={() => handleVerifySlip(false)}
                >
                  Reject Slip
                </Button>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setVerifyingInvoice(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    loading={actionLoading}
                    onClick={() => handleVerifySlip(true)}
                  >
                    Approve & Settle
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Modal: Official Money Receipt */}
      {receiptData && (
        <Dialog open={!!receiptData} onOpenChange={() => setReceiptData(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-500" />
                Official Money Receipt
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 text-xs border border-border p-4 rounded-lg bg-card text-foreground">
              <div className="text-center pb-3 border-b border-border space-y-1">
                <p className="font-bold text-sm">Road Safety Movement (নিরাপদ সড়ক আন্দোলন)</p>
                <p className="text-[10px] text-muted-foreground">
                  Statutory Non-Profit Organization • Reg. Under Act XXI of 1860
                </p>
                <Badge variant="success" size="sm">
                  PAID & SETTLED
                </Badge>
              </div>

              <div className="space-y-2 font-mono text-[11px]">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Receipt Number:</span>
                  <span className="font-bold text-primary">{receiptData.receiptNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Invoice Reference:</span>
                  <span>{receiptData.invoiceNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Received From:</span>
                  <span className="font-sans font-semibold">{receiptData.recipientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="font-bold text-emerald-500">{receiptData.amountFormattedBdt}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Settlement Method:</span>
                  <span>{receiptData.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Transaction ID:</span>
                  <span className="text-muted-foreground truncate max-w-[180px]">
                    {receiptData.transactionRef}
                  </span>
                </div>
              </div>

              <div className="p-2.5 rounded bg-muted/50 border border-border text-[10px] text-muted-foreground space-y-1">
                <p className="font-semibold text-foreground">Security Hash:</p>
                <p className="font-mono break-all">{receiptData.securityHash}</p>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.print()}
                  leftIcon={<Printer className="h-3.5 w-3.5" />}
                >
                  Print Receipt
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Modal: Issue Invoice */}
      {createModalOpen && (
        <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Issue Membership Dues Invoice</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleCreateInvoice} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Member User ID</label>
                <input
                  type="text"
                  required
                  value={newUserId}
                  onChange={(e) => setNewUserId(e.target.value)}
                  placeholder="Enter member's User ID..."
                  className="w-full px-3 py-2 rounded-md border border-input bg-background font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Invoice Description</label>
                <input
                  type="text"
                  required
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="e.g. Annual General Membership Dues 2026"
                  className="w-full px-3 py-2 rounded-md border border-input bg-background"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Amount (৳ Taka)</label>
                  <input
                    type="number"
                    required
                    value={newAmountTaka}
                    onChange={(e) => setNewAmountTaka(e.target.value)}
                    placeholder="500"
                    className="w-full px-3 py-2 rounded-md border border-input bg-background font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Due Date</label>
                  <input
                    type="date"
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-md border border-input bg-background font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setCreateModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm" loading={actionLoading}>
                  Create Invoice
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
