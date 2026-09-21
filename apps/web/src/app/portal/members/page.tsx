"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Users,
  Search,
  CheckCircle2,
  AlertCircle,
  Check,
  UserCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Button,
  Badge,
  Card,
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
import { InstitutionalMemberCard } from "@/components/cards/holographic-member-card";

export default function MembersDirectoryPage() {
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(15);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [tierFilter, setTierFilter] = useState("ALL");

  // Selected member for detail view/action modal
  const [selectedMember, setSelectedMember] = useState<any | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [endorseNotes, setEndorseNotes] = useState("");
  const [approveTier, setApproveTier] = useState<string>("GENERAL");
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const fetchMembers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiClient.membership.list({
        page,
        limit,
        search: search.trim() || undefined,
        status: statusFilter === "ALL" ? undefined : statusFilter,
        tier: tierFilter === "ALL" ? undefined : tierFilter,
      });
      setMembers(res.items || []);
      setTotal(res.total || 0);
    } catch {
      setMembers([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [page, limit, search, statusFilter, tierFilter]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const handleEndorse = async () => {
    if (!selectedMember) return;
    setActionLoading(true);
    setFeedback(null);
    try {
      await apiClient.membership.endorse(selectedMember.id, endorseNotes);
      setFeedback({ type: "success", msg: "Member application endorsed successfully by Branch Secretariat." });
      await fetchMembers();
      const updated = await apiClient.membership.getById(selectedMember.id);
      setSelectedMember(updated);
    } catch (err: any) {
      setFeedback({ type: "error", msg: err.message || "Failed to endorse membership." });
    } finally {
      setActionLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!selectedMember) return;
    setActionLoading(true);
    setFeedback(null);
    try {
      await apiClient.membership.approve(selectedMember.id, approveTier);
      setFeedback({ type: "success", msg: "Membership approved! Official ID number issued." });
      await fetchMembers();
      const updated = await apiClient.membership.getById(selectedMember.id);
      setSelectedMember(updated);
    } catch (err: any) {
      setFeedback({ type: "error", msg: err.message || "Failed to approve membership." });
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return <Badge variant="success">Active</Badge>;
      case "BRANCH_ENDORSED":
        return <Badge variant="warning">Branch Endorsed</Badge>;
      case "PENDING_KYC":
        return <Badge variant="outline">Pending KYC</Badge>;
      case "SUSPENDED":
        return <Badge variant="destructive">Suspended</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case "LIFE":
        return <Badge variant="gold">Life Member</Badge>;
      case "GENERAL":
        return <Badge variant="default">General</Badge>;
      case "ASSOCIATE":
        return <Badge variant="secondary">Associate</Badge>;
      case "HONORARY":
        return <Badge variant="outline">Honorary</Badge>;
      default:
        return <Badge variant="secondary">{tier}</Badge>;
    }
  };

  const totalPages = Math.ceil(total / limit) || 1;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Official Member Registry"
        titleBn="সদস্য তালিকা ও কেওয়াইসি যাচাই"
        description="Search, inspect, endorse branch applications, and grant official executive membership credentials."
        badge={
          <Badge variant="outline" className="font-mono">
            {total} Total Registered
          </Badge>
        }
      />

      {/* Filter & Search Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search by name, NID, mobile, or ID..."
                className="w-full pl-9 pr-4 py-2 text-xs rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* Filter Selectors */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
                className="h-9 px-3 py-1 text-xs rounded-md border border-input bg-background text-foreground"
              >
                <option value="ALL">All Statuses</option>
                <option value="ACTIVE">Active</option>
                <option value="BRANCH_ENDORSED">Branch Endorsed</option>
                <option value="PENDING_KYC">Pending KYC</option>
                <option value="SUSPENDED">Suspended</option>
              </select>

              <select
                value={tierFilter}
                onChange={(e) => {
                  setTierFilter(e.target.value);
                  setPage(1);
                }}
                className="h-9 px-3 py-1 text-xs rounded-md border border-input bg-background text-foreground"
              >
                <option value="ALL">All Tiers</option>
                <option value="ASSOCIATE">Associate</option>
                <option value="GENERAL">General</option>
                <option value="LIFE">Life Member</option>
                <option value="HONORARY">Honorary</option>
              </select>

              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearch("");
                  setStatusFilter("ALL");
                  setTierFilter("ALL");
                  setPage(1);
                }}
                className="text-xs"
              >
                Reset
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Members Data Table */}
      <Card>
        {loading ? (
          <div className="p-12 text-center text-xs text-muted-foreground animate-pulse">
            Querying authoritative member database...
          </div>
        ) : members.length === 0 ? (
          <EmptyState
            icon={<Users className="h-8 w-8 text-muted-foreground" />}
            title="No Members Found"
            titleBn="কোনো সদস্য পাওয়া যায়নি"
            description={
              search || statusFilter !== "ALL" || tierFilter !== "ALL"
                ? "Try adjusting your filter criteria or search keywords."
                : "The membership register currently contains no records for this scope."
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member / Applicant</TableHead>
                  <TableHead>Membership ID</TableHead>
                  <TableHead>Tier</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map((m) => (
                  <TableRow key={m.id}>
                    <TableCell>
                      <div>
                        <p className="font-semibold text-foreground text-sm">
                          {m.user?.fullName || "Doctor"}
                        </p>
                        {m.user?.fullNameBn && (
                          <p className="text-xs text-muted-foreground font-bangla">
                            {m.user.fullNameBn}
                          </p>
                        )}
                        <p className="text-[11px] text-muted-foreground">
                          {m.user?.occupation || "Physician"}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-mono text-xs font-semibold text-primary">
                        {m.membershipNumber || "Pending"}
                      </span>
                    </TableCell>
                    <TableCell>{getTierBadge(m.tier)}</TableCell>
                    <TableCell>{getStatusBadge(m.status)}</TableCell>
                    <TableCell>
                      <div className="text-xs text-muted-foreground space-y-0.5">
                        <p className="font-mono">{m.user?.phone}</p>
                        <p className="truncate max-w-[160px]">{m.user?.email}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          setSelectedMember(m);
                          setFeedback(null);
                        }}
                      >
                        Inspect
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Pagination Controls */}
        {total > limit && (
          <div className="p-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
            <span>
              Showing {(page - 1) * limit + 1} to{" "}
              {Math.min(page * limit, total)} of {total} records
            </span>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
              >
                <ChevronLeft className="h-3.5 w-3.5 mr-1" /> Prev
              </Button>
              <span className="px-2 font-mono">
                Page {page} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
              >
                Next <ChevronRight className="h-3.5 w-3.5 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Member Detail & Action Dialog */}
      {selectedMember && (
        <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <span>Member Profile & Statutory KYC</span>
                {getStatusBadge(selectedMember.status)}
              </DialogTitle>
            </DialogHeader>

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
                  <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
                )}
                <span>{feedback.msg}</span>
              </div>
            )}

            {/* Profile Overview */}
            <div className="grid grid-cols-2 gap-3 text-xs p-4 rounded-lg bg-muted/40 border border-border">
              <div>
                <span className="text-muted-foreground block text-[10px] uppercase">
                  Full Name
                </span>
                <span className="font-semibold text-foreground text-sm">
                  {selectedMember.user?.fullName}
                </span>
                {selectedMember.user?.fullNameBn && (
                  <span className="block text-muted-foreground font-bangla">
                    {selectedMember.user?.fullNameBn}
                  </span>
                )}
              </div>

              <div>
                <span className="text-muted-foreground block text-[10px] uppercase">
                  Membership ID
                </span>
                <span className="font-mono font-bold text-primary text-sm">
                  {selectedMember.membershipNumber || "Pending Issuance"}
                </span>
              </div>

              <div>
                <span className="text-muted-foreground block text-[10px] uppercase">
                  Mobile Number
                </span>
                <span className="font-mono text-foreground">
                  {selectedMember.user?.phone}
                </span>
              </div>

              <div>
                <span className="text-muted-foreground block text-[10px] uppercase">
                  Official Email
                </span>
                <span className="text-foreground">
                  {selectedMember.user?.email}
                </span>
              </div>

              <div>
                <span className="text-muted-foreground block text-[10px] uppercase">
                  National ID (NID)
                </span>
                <span className="font-mono text-foreground">
                  {selectedMember.user?.nidNumber || "Verified via NID / Student Pass"}
                </span>
              </div>

              <div>
                <span className="text-muted-foreground block text-[10px] uppercase">
                  Blood Group
                </span>
                <span className="font-semibold text-rose-500">
                  {selectedMember.user?.bloodGroup || "O+"}
                </span>
              </div>
            </div>

            {/* Credential Card Preview */}
            <div className="py-2">
              <p className="text-xs font-semibold text-muted-foreground mb-2">
                Authoritative Member Credential:
              </p>
              <InstitutionalMemberCard
                memberName={selectedMember.user?.fullName}
                memberNameBn={selectedMember.user?.fullNameBn}
                memberId={selectedMember.membershipNumber || "PENDING"}
                tier={selectedMember.tier}
                bloodGroup={selectedMember.user?.bloodGroup || "B+"}
              />
            </div>

            {/* Workflow Action Desk: Endorsement & Approval */}
            <div className="space-y-3 pt-3 border-t border-border">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground font-mono">
                Executive Governance Actions
              </h4>

              {selectedMember.status === "PENDING_KYC" && (
                <div className="p-3 rounded-lg border border-amber-500/30 bg-amber-500/10 space-y-2">
                  <p className="text-xs font-semibold text-amber-300">
                    Step 1: Branch Secretariat Endorsement
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Certify that this applicant's chapter credentials and active volunteer status have been verified.
                  </p>
                  <input
                    type="text"
                    value={endorseNotes}
                    onChange={(e) => setEndorseNotes(e.target.value)}
                    placeholder="Secretariat review notes..."
                    className="w-full px-3 py-1.5 text-xs rounded border border-input bg-background"
                  />
                  <Button
                    variant="gold"
                    size="sm"
                    onClick={handleEndorse}
                    loading={actionLoading}
                    leftIcon={<UserCheck className="h-3.5 w-3.5" />}
                  >
                    Endorse Branch Application
                  </Button>
                </div>
              )}

              {(selectedMember.status === "BRANCH_ENDORSED" ||
                selectedMember.status === "PENDING_KYC") && (
                <div className="p-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 space-y-2">
                  <p className="text-xs font-semibold text-emerald-300">
                    Step 2: Executive Council Final Approval
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Grants official membership, enters record into statutory register, and issues sequential number.
                  </p>
                  <div className="flex items-center gap-2">
                    <select
                      value={approveTier}
                      onChange={(e) => setApproveTier(e.target.value)}
                      className="px-3 py-1.5 text-xs rounded border border-input bg-background text-foreground"
                    >
                      <option value="GENERAL">General Member (৳500/yr)</option>
                      <option value="LIFE">Life Member (৳25,000)</option>
                      <option value="ASSOCIATE">Associate Member</option>
                    </select>

                    <Button
                      variant="primary"
                      size="sm"
                      onClick={handleApprove}
                      loading={actionLoading}
                      leftIcon={<Check className="h-3.5 w-3.5" />}
                    >
                      Approve & Issue ID
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
