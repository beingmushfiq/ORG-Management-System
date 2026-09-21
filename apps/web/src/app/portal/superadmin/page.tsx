"use client";

import React, { useState } from "react";
import {
  Server,
  Building,
  Shield,
  Activity,
  Plus,
  ArrowLeft,
  Key,
  Database,
  Search,
} from "lucide-react";
import { Button, Badge, Card, CardHeader, CardTitle, CardDescription, CardContent } from "@org/ui";
import Link from "next/link";

interface TenantRecord {
  id: string;
  name: string;
  nameBn: string;
  slug: string;
  customDomain?: string;
  plan: "STARTER" | "PROFESSIONAL" | "ENTERPRISE";
  status: "ACTIVE" | "TRIAL" | "SUSPENDED";
  memberCount: number;
  monthlyPaisaVolume: bigint;
  createdAt: string;
}

const INITIAL_TENANTS: TenantRecord[] = [
  {
    id: "org-1",
    name: "Bangladesh Medical Association — Chattogram",
    nameBn: "বাংলাদেশ মেডিকেল এসোসিয়েশন — চট্টগ্রাম",
    slug: "bma-ctg",
    customDomain: "ctg.bma.org.bd",
    plan: "ENTERPRISE",
    status: "ACTIVE",
    memberCount: 1420,
    monthlyPaisaVolume: 48250000n, // ৳482,500
    createdAt: "Jan 2026",
  },
  {
    id: "org-2",
    name: "Institution of Engineers Bangladesh — Dhaka Center",
    nameBn: "ইনস্টিটিউশন অব ইঞ্জিনিয়ার্স বাংলাদেশ — ঢাকা",
    slug: "ieb-dhaka",
    customDomain: "dhaka.ieb.org.bd",
    plan: "ENTERPRISE",
    status: "ACTIVE",
    memberCount: 3840,
    monthlyPaisaVolume: 125000000n, // ৳1,250,000
    createdAt: "Feb 2026",
  },
  {
    id: "org-3",
    name: "Dhaka University Alumni Association",
    nameBn: "ঢাকা বিশ্ববিদ্যালয় অ্যালামনাই অ্যাসোসিয়েশন",
    slug: "du-alumni",
    plan: "PROFESSIONAL",
    status: "ACTIVE",
    memberCount: 2200,
    monthlyPaisaVolume: 65000000n, // ৳650,000
    createdAt: "Mar 2026",
  },
];

export default function PlatformSuperAdminPortal() {
  const [tenants, setTenants] = useState<TenantRecord[]>(INITIAL_TENANTS);
  const [impersonatingTenant, setImpersonatingTenant] = useState<TenantRecord | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newOrgName, setNewOrgName] = useState("");
  const [newOrgSlug, setNewOrgSlug] = useState("");

  const handleCreateTenant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrgName || !newOrgSlug) return;

    const newTenant: TenantRecord = {
      id: `org-${Date.now()}`,
      name: newOrgName,
      nameBn: newOrgName,
      slug: newOrgSlug.toLowerCase().replace(/[^a-z0-9-]/g, ""),
      plan: "STARTER",
      status: "ACTIVE",
      memberCount: 1,
      monthlyPaisaVolume: 0n,
      createdAt: "Just now",
    };

    setTenants([newTenant, ...tenants]);
    setNewOrgName("");
    setNewOrgSlug("");
    setShowCreateModal(false);
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
            <Server className="w-5 h-5 text-amber-400" />
            <span className="text-sm font-semibold tracking-wide uppercase text-slate-300">
              Platform Super Admin & Multi-Tenant Orchestration
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-emerald-500/40 text-emerald-400 bg-emerald-500/10 font-mono text-xs">
            Global Cluster Healthy
          </Badge>
          <Button
            size="sm"
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
            onClick={() => setShowCreateModal(true)}
          >
            <Plus className="w-3.5 h-3.5 mr-1" /> Onboard Tenant
          </Button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl w-full mx-auto px-6 py-8 space-y-8">
        {/* Global Cluster KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-xl">
            <CardHeader className="pb-2">
              <CardDescription className="text-xs uppercase tracking-wider font-mono text-slate-400">
                Active Tenant Organizations
              </CardDescription>
              <CardTitle className="text-2xl font-bold text-white flex items-baseline justify-between mt-1">
                <span>{tenants.length} Tenants</span>
                <Building className="w-4 h-4 text-amber-400" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-slate-500 font-mono">Subdomains mapped & active</p>
            </CardContent>
          </Card>

          <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-xl">
            <CardHeader className="pb-2">
              <CardDescription className="text-xs uppercase tracking-wider font-mono text-slate-400">
                Total Platform Members
              </CardDescription>
              <CardTitle className="text-2xl font-bold text-emerald-400 flex items-baseline justify-between mt-1">
                <span>7,460 Members</span>
                <Shield className="w-4 h-4 text-emerald-400" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-slate-500 font-mono">Isolated across software layers</p>
            </CardContent>
          </Card>

          <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-xl">
            <CardHeader className="pb-2">
              <CardDescription className="text-xs uppercase tracking-wider font-mono text-slate-400">
                Monthly Paisa Settlement Volume
              </CardDescription>
              <CardTitle className="text-2xl font-bold text-white flex items-baseline justify-between mt-1">
                <span>৳ 23.82 Lakh</span>
                <Activity className="w-4 h-4 text-blue-400" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-slate-500 font-mono">238,250,000 paisa cleared</p>
            </CardContent>
          </Card>

          <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-xl">
            <CardHeader className="pb-2">
              <CardDescription className="text-xs uppercase tracking-wider font-mono text-slate-400">
                Core Data Stores
              </CardDescription>
              <CardTitle className="text-2xl font-bold text-white flex items-baseline justify-between mt-1">
                <span>MySQL 8 + Redis</span>
                <Database className="w-4 h-4 text-amber-400" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-slate-500 font-mono">Zero deadlocks · 100% SLA</p>
            </CardContent>
          </Card>
        </div>

        {/* Tenant Registry Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Building className="w-5 h-5 text-amber-400" />
                Multi-Tenant Organization Directory
              </h2>
              <p className="text-xs text-slate-400">
                Manage subdomain routing, subscription tiers, and audited consent-gated support impersonation
              </p>
            </div>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
              <input
                type="text"
                placeholder="Search organizations..."
                className="pl-9 pr-4 py-1.5 rounded-xl border border-slate-800 bg-slate-900 text-xs text-white focus:outline-none focus:border-amber-500 w-64"
              />
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-950/80 text-xs uppercase font-mono text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="px-6 py-3.5">Organization & Subdomain</th>
                    <th className="px-6 py-3.5">Tier Plan</th>
                    <th className="px-6 py-3.5 text-center">Active Members</th>
                    <th className="px-6 py-3.5 text-right">Settled Volume</th>
                    <th className="px-6 py-3.5">Status</th>
                    <th className="px-6 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {tenants.map((tenant) => (
                    <tr key={tenant.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-white">{tenant.name}</div>
                        <div className="text-xs text-slate-400 font-bangla">{tenant.nameBn}</div>
                        <div className="text-xs font-mono text-amber-400/80 mt-0.5">
                          {tenant.slug}.orgos.bd {tenant.customDomain && `(${tenant.customDomain})`}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="outline" className="border-slate-700 text-slate-300 text-[10px] font-mono">
                          {tenant.plan}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-center font-mono text-white font-medium">
                        {tenant.memberCount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-right font-mono text-white font-medium">
                        ৳ {(Number(tenant.monthlyPaisaVolume / 100n)).toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="outline" className="border-emerald-500/40 text-emerald-400 bg-emerald-500/10 text-xs">
                          {tenant.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-slate-700 text-amber-400 hover:bg-amber-500/10 text-xs font-mono"
                          onClick={() => setImpersonatingTenant(tenant)}
                        >
                          <Key className="w-3.5 h-3.5 mr-1" /> Impersonate
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Audited Impersonation Modal */}
      {impersonatingTenant && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full rounded-2xl border border-amber-500/40 bg-slate-900 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Shield className="w-4 h-4 text-amber-400" />
                Audited Support Impersonation
              </h3>
              <button
                onClick={() => setImpersonatingTenant(null)}
                className="text-slate-400 hover:text-white text-sm font-mono"
              >
                ✕ Close
              </button>
            </div>
            <p className="text-xs text-slate-300">
              You are about to establish an authenticated session into <strong className="text-white">{impersonatingTenant.name}</strong> as Platform Support.
            </p>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-400 space-y-1">
              <div>Tenant ID: {impersonatingTenant.id}</div>
              <div>Subdomain: {impersonatingTenant.slug}.orgos.bd</div>
              <div className="text-amber-400">Audit Trail: Logged to immutable central security ledger</div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                className="border-slate-700 text-slate-300"
                onClick={() => setImpersonatingTenant(null)}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold"
                onClick={() => {
                  alert(`Access token granted for ${impersonatingTenant.slug}`);
                  setImpersonatingTenant(null);
                }}
              >
                Confirm & Launch Portal
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Onboard Tenant Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Building className="w-4 h-4 text-amber-400" />
                Onboard New Tenant Organization
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-white text-sm font-mono"
              >
                ✕ Close
              </button>
            </div>
            <form onSubmit={handleCreateTenant} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-slate-400">Organization Name</label>
                <input
                  type="text"
                  required
                  value={newOrgName}
                  onChange={(e) => setNewOrgName(e.target.value)}
                  placeholder="e.g. Bangladesh Chemical Society"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-slate-400">Subdomain Slug</label>
                <div className="flex items-center rounded-xl border border-slate-800 bg-slate-950 px-4 py-2">
                  <input
                    type="text"
                    required
                    value={newOrgSlug}
                    onChange={(e) => setNewOrgSlug(e.target.value)}
                    placeholder="bcs"
                    className="w-full bg-transparent text-sm text-white focus:outline-none"
                  />
                  <span className="text-xs font-mono text-slate-500">.orgos.bd</span>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="border-slate-700 text-slate-300"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold"
                >
                  Create Organization
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
