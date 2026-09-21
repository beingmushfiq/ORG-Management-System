"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Building2,
  ShieldAlert,
  Plus,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Key,
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

export default function SuperadminPage() {
  const [overview, setOverview] = useState<any>(null);
  const [tenants, setTenants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Tenant Creation Modal
  const [createTenantModalOpen, setCreateTenantModalOpen] = useState(false);
  const [orgName, setOrgName] = useState("");
  const [orgNameBn, setOrgNameBn] = useState("");
  const [slug, setSlug] = useState("");
  const [planId, setPlanId] = useState("starter");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  // Impersonation Modal
  const [impersonateModalOpen, setImpersonateModalOpen] = useState(false);
  const [targetUserId, setTargetUserId] = useState("");
  const [justification, setJustification] = useState("");

  const [actionLoading, setActionLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const loadSuperadminData = useCallback(async () => {
    setLoading(true);
    try {
      const [overRes, tenRes] = await Promise.allSettled([
        apiClient.superadmin.getOverview(),
        apiClient.superadmin.listTenants(),
      ]);

      if (overRes.status === "fulfilled") setOverview(overRes.value);
      if (tenRes.status === "fulfilled") setTenants(tenRes.value || []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSuperadminData();
  }, [loadSuperadminData]);

  const handleCreateTenant = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    setFeedback(null);

    try {
      const res = await apiClient.superadmin.createTenant({
        name: orgName.trim(),
        nameBn: orgNameBn.trim() || undefined,
        slug: slug.trim().toLowerCase(),
        planId,
        contactEmail: contactEmail.trim() || undefined,
        contactPhone: contactPhone.trim() || undefined,
      });

      setFeedback({
        type: "success",
        msg: `Organization tenant "${res.organization.name}" provisioned with root HQ branch and default positions!`,
      });

      setCreateTenantModalOpen(false);
      setOrgName("");
      setOrgNameBn("");
      setSlug("");
      setContactEmail("");
      setContactPhone("");
      await loadSuperadminData();
    } catch (err: any) {
      setFeedback({ type: "error", msg: err.message || "Failed to provision tenant." });
    } finally {
      setActionLoading(false);
    }
  };

  const handleImpersonate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetUserId || !justification) return;
    setActionLoading(true);
    setFeedback(null);

    try {
      const res = await apiClient.superadmin.impersonate({
        targetUserId: targetUserId.trim(),
        justification: justification.trim(),
      });

      setFeedback({
        type: "success",
        msg: `Audited impersonation session active as ${res.impersonatedUser} in ${res.targetOrganization}. Redirecting...`,
      });

      setImpersonateModalOpen(false);
      setTimeout(() => {
        window.location.href = "/portal";
      }, 800);
    } catch (err: any) {
      setFeedback({ type: "error", msg: err.message || "Impersonation failed." });
    } finally {
      setActionLoading(false);
    }
  };

  const handleExitImpersonation = async () => {
    setActionLoading(true);
    try {
      await apiClient.superadmin.exitImpersonate();
      setFeedback({ type: "success", msg: "Exited impersonation session. Session restored to superadmin." });
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (err: any) {
      setFeedback({ type: "error", msg: err.message || "Failed to exit impersonation." });
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Superadmin Multi-Tenant Cloud Console"
        titleBn="সুপারএডমিন ক্লাউড প্ল্যাটফর্ম ও অডিট পোর্টাল"
        description="Platform-wide tenant administration, database isolation health, and strictly audited support impersonation logs."
        badge={
          <Badge variant="destructive" size="sm">
            Platform Root Authority
          </Badge>
        }
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={loadSuperadminData}
              leftIcon={<RefreshCw className="h-3.5 w-3.5" />}
            >
              Refresh
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setCreateTenantModalOpen(true)}
              leftIcon={<Plus className="h-3.5 w-3.5" />}
            >
              Provision New Tenant
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setImpersonateModalOpen(true)}
              leftIcon={<Key className="h-3.5 w-3.5" />}
            >
              Support Impersonation
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
            <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
          )}
          <span>{feedback.msg}</span>
        </div>
      )}

      {/* Platform Overview KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 space-y-1.5">
            <span className="text-xs text-muted-foreground font-medium">Active Tenants</span>
            <div className="text-2xl font-bold text-foreground">
              {overview?.organizationsCount ?? tenants.length}
            </div>
            <p className="text-[11px] text-muted-foreground">
              Isolated organization databases
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 space-y-1.5">
            <span className="text-xs text-muted-foreground font-medium">Registered Users</span>
            <div className="text-2xl font-bold text-foreground font-mono">
              {overview?.usersCount ?? 0}
            </div>
            <p className="text-[11px] text-muted-foreground">
              Across all tenant organizations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 space-y-1.5">
            <span className="text-xs text-muted-foreground font-medium">Active Sessions</span>
            <div className="text-2xl font-bold text-emerald-500 font-mono">
              {overview?.activeSessionsCount ?? 0}
            </div>
            <p className="text-[11px] text-muted-foreground">
              Live cryptographic JWT sessions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 space-y-1.5">
            <span className="text-xs text-muted-foreground font-medium">Audited Impersonations</span>
            <div className="text-2xl font-bold text-amber-500 font-mono">
              {overview?.impersonationLogsCount ?? 0}
            </div>
            <p className="text-[11px] text-muted-foreground">
              Tamper-proof support access logs
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tenants Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle className="text-base flex items-center gap-2">
              <Building2 className="h-4 w-4 text-primary" />
              Tenant Organizations Register
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5 font-bangla">
              সকল প্রাতিষ্ঠানিক ডেটাবেস এবং ডোমেন তালিকা
            </p>
          </div>
          <Badge variant="outline">{tenants.length} Tenants</Badge>
        </CardHeader>
        <CardContent className="pt-0">
          {loading ? (
            <div className="p-8 text-center text-xs text-muted-foreground animate-pulse">
              Querying platform databases...
            </div>
          ) : tenants.length === 0 ? (
            <EmptyState
              title="No Organizations Provisioned"
              titleBn="কোনো প্রতিষ্ঠান নিবন্ধিত নেই"
              description="Provision a new tenant organization using the button above."
            />
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Organization Name</TableHead>
                    <TableHead>Slug / Identifier</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Nodes / Users</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tenants.map((org) => (
                    <TableRow key={org.id}>
                      <TableCell>
                        <div>
                          <p className="font-semibold text-foreground text-sm">{org.name}</p>
                          {org.nameBn && (
                            <p className="text-xs text-muted-foreground font-bangla">
                              {org.nameBn}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-mono text-xs text-primary font-semibold">
                          {org.slug}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" size="sm">
                          {org.planId}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={org.status === "ACTIVE" ? "success" : "destructive"}
                          size="sm"
                        >
                          {org.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-xs font-mono text-muted-foreground space-y-0.5">
                          <span>{org._count?.branchNodes ?? 0} branches</span> ·{" "}
                          <span>{org._count?.users ?? 0} users</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-xs text-muted-foreground">
                          <p>{org.contactEmail || "N/A"}</p>
                          <p className="font-mono">{org.contactPhone || ""}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setTargetUserId(org.id);
                            setImpersonateModalOpen(true);
                          }}
                        >
                          Support Access
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal: Provision Tenant */}
      {createTenantModalOpen && (
        <Dialog open={createTenantModalOpen} onOpenChange={setCreateTenantModalOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Provision Organization Tenant</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleCreateTenant} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Organization Name (English)</label>
                <input
                  type="text"
                  required
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  placeholder="e.g. Bangladesh Dental Society"
                  className="w-full px-3 py-2 rounded-md border border-input bg-background"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">নাম (বাংলা)</label>
                <input
                  type="text"
                  value={orgNameBn}
                  onChange={(e) => setOrgNameBn(e.target.value)}
                  placeholder="e.g. বাংলাদেশ ডেন্টাল সোসাইটি"
                  className="w-full px-3 py-2 rounded-md border border-input bg-background font-bangla"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Unique Slug</label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value.toLowerCase())}
                    placeholder="bds-bd"
                    className="w-full px-3 py-2 rounded-md border border-input bg-background font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Subscription Plan</label>
                  <select
                    value={planId}
                    onChange={(e) => setPlanId(e.target.value)}
                    className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground"
                  >
                    <option value="starter">Starter Plan</option>
                    <option value="professional">Professional Plan</option>
                    <option value="enterprise">Enterprise Cloud</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Contact Email</label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="admin@bds.org.bd"
                    className="w-full px-3 py-2 rounded-md border border-input bg-background"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Contact Phone</label>
                  <input
                    type="tel"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="01712000000"
                    className="w-full px-3 py-2 rounded-md border border-input bg-background font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setCreateTenantModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm" loading={actionLoading}>
                  Provision Tenant
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* Modal: Audited Support Impersonation */}
      {impersonateModalOpen && (
        <Dialog open={impersonateModalOpen} onOpenChange={setImpersonateModalOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-amber-500" />
                Audited Support Impersonation
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleImpersonate} className="space-y-4 text-xs">
              <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 space-y-1">
                <p className="font-semibold text-xs">Statutory Audit Warning</p>
                <p className="text-[11px] leading-relaxed text-amber-200">
                  Every action performed during impersonation is permanently logged with your operator ID, IP address, and stated justification in the immutable ImpersonationLog register.
                </p>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Target User ID</label>
                <input
                  type="text"
                  required
                  value={targetUserId}
                  onChange={(e) => setTargetUserId(e.target.value)}
                  placeholder="Enter User ID to impersonate..."
                  className="w-full px-3 py-2 rounded-md border border-input bg-background font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">
                  Support Justification (Mandatory)
                </label>
                <textarea
                  rows={3}
                  required
                  value={justification}
                  onChange={(e) => setJustification(e.target.value)}
                  placeholder="e.g. Investigating dues reconciliation discrepancy for Ticket #SUP-492..."
                  className="w-full px-3 py-2 rounded-md border border-input bg-background"
                />
              </div>

              <div className="flex justify-between items-center pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleExitImpersonation}
                >
                  Exit Current Session
                </Button>

                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setImpersonateModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="destructive" size="sm" loading={actionLoading}>
                    Begin Impersonation
                  </Button>
                </div>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
