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
  Search,
  Globe,
  Zap,
} from "lucide-react";
import { Button, Badge, Card, CardHeader, CardTitle, CardDescription, CardContent, CopyButton } from "@org/ui";
import Link from "next/link";

interface TenantRecord {
  id: string;
  name: string;
  nameBn: string;
  slug: string;
  customDomain?: string | undefined;
  cloudflareSslStatus: "ACTIVE_SSL" | "PENDING_DNS" | "ERROR";
  plan: "STARTER" | "GROWTH" | "ENTERPRISE";
  billingCycle: "MONTHLY" | "ANNUAL";
  monthlyFeePaisa: bigint;
  status: "ACTIVE" | "TRIAL" | "SUSPENDED";
  trialDaysRemaining?: number | undefined;
  memberCount: number;
  monthlyPaisaVolume: bigint;
  storageMbUsed: number;
  features: {
    smsBroadcast: boolean;
    digitalVoting: boolean;
    cmeLms: boolean;
    bloodBank: boolean;
    conciergeCerts: boolean;
  };
  rootAdminEmail: string;
  createdAt: string;
}

const INITIAL_TENANTS: TenantRecord[] = [
  {
    id: "org-bma-ctg",
    name: "Bangladesh Medical Association — Chattogram",
    nameBn: "বাংলাদেশ মেডিকেল এসোসিয়েশন — চট্টগ্রাম",
    slug: "bma-ctg",
    customDomain: "ctg.bma.org.bd",
    cloudflareSslStatus: "ACTIVE_SSL",
    plan: "ENTERPRISE",
    billingCycle: "ANNUAL",
    monthlyFeePaisa: 3500000n, // ৳35,000/mo
    status: "ACTIVE",
    memberCount: 1420,
    monthlyPaisaVolume: 48250000n, // ৳482,500
    storageMbUsed: 420,
    features: {
      smsBroadcast: true,
      digitalVoting: true,
      cmeLms: true,
      bloodBank: true,
      conciergeCerts: true,
    },
    rootAdminEmail: "sec.chattogram@bma.org.bd",
    createdAt: "Jan 12, 2026",
  },
  {
    id: "org-ieb-dhaka",
    name: "Institution of Engineers Bangladesh — Dhaka Center",
    nameBn: "ইনস্টিটিউশন অব ইঞ্জিনিয়ার্স বাংলাদেশ — ঢাকা",
    slug: "ieb-dhaka",
    customDomain: "dhaka.ieb.org.bd",
    cloudflareSslStatus: "ACTIVE_SSL",
    plan: "ENTERPRISE",
    billingCycle: "ANNUAL",
    monthlyFeePaisa: 3500000n,
    status: "ACTIVE",
    memberCount: 3840,
    monthlyPaisaVolume: 125000000n, // ৳1,250,000
    storageMbUsed: 890,
    features: {
      smsBroadcast: true,
      digitalVoting: true,
      cmeLms: true,
      bloodBank: false,
      conciergeCerts: true,
    },
    rootAdminEmail: "admin@dhaka.ieb.org.bd",
    createdAt: "Feb 03, 2026",
  },
  {
    id: "org-du-alumni",
    name: "Dhaka University Alumni Association",
    nameBn: "ঢাকা বিশ্ববিদ্যালয় অ্যালামনাই অ্যাসোসিয়েশন",
    slug: "du-alumni",
    customDomain: "alumni.du.ac.bd",
    cloudflareSslStatus: "PENDING_DNS",
    plan: "GROWTH",
    billingCycle: "MONTHLY",
    monthlyFeePaisa: 1500000n, // ৳15,000/mo
    status: "ACTIVE",
    memberCount: 2200,
    monthlyPaisaVolume: 65000000n, // ৳650,000
    storageMbUsed: 310,
    features: {
      smsBroadcast: true,
      digitalVoting: false,
      cmeLms: false,
      bloodBank: true,
      conciergeCerts: true,
    },
    rootAdminEmail: "general.sec@alumni.du.ac.bd",
    createdAt: "Mar 10, 2026",
  },
  {
    id: "org-cba-ctg",
    name: "Chittagong District Bar Association",
    nameBn: "চট্টগ্রাম জেলা আইনজীবী সমিতি",
    slug: "chittagong-bar",
    cloudflareSslStatus: "ACTIVE_SSL",
    plan: "STARTER",
    billingCycle: "MONTHLY",
    monthlyFeePaisa: 500000n, // ৳5,000/mo
    status: "TRIAL",
    trialDaysRemaining: 11,
    memberCount: 840,
    monthlyPaisaVolume: 18000000n,
    storageMbUsed: 120,
    features: {
      smsBroadcast: false,
      digitalVoting: false,
      cmeLms: false,
      bloodBank: false,
      conciergeCerts: true,
    },
    rootAdminEmail: "secretary@chittagongbar.org",
    createdAt: "Sep 15, 2026",
  },
];

export default function PlatformSuperAdminPortal() {
  const [tenants, setTenants] = useState<TenantRecord[]>(INITIAL_TENANTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlanFilter, setSelectedPlanFilter] = useState<string>("ALL");
  const [impersonatingTenant, setImpersonatingTenant] = useState<TenantRecord | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);

  // New Tenant Form State
  const [newOrg, setNewOrg] = useState({
    name: "",
    nameBn: "",
    slug: "",
    customDomain: "",
    plan: "GROWTH" as "STARTER" | "GROWTH" | "ENTERPRISE",
    billingCycle: "ANNUAL" as "MONTHLY" | "ANNUAL",
    adminFullName: "",
    adminEmail: "",
    adminPhone: "",
    features: {
      smsBroadcast: true,
      digitalVoting: true,
      cmeLms: true,
      bloodBank: true,
      conciergeCerts: true,
    },
  });

  // Toggle tenant status
  const handleToggleStatus = (id: string) => {
    setTenants((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextStatus = t.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE";
          return { ...t, status: nextStatus };
        }
        return t;
      })
    );
  };

  // Create Tenant Handler
  const handleCreateTenant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrg.name || !newOrg.slug || !newOrg.adminEmail) return;

    const monthlyFee =
      newOrg.plan === "ENTERPRISE"
        ? 3500000n
        : newOrg.plan === "GROWTH"
        ? 1500000n
        : 500000n;

    const created: TenantRecord = {
      id: `org-${newOrg.slug}`,
      name: newOrg.name,
      nameBn: newOrg.nameBn || newOrg.name,
      slug: newOrg.slug.toLowerCase().replace(/[^a-z0-9-]/g, ""),
      customDomain: newOrg.customDomain || undefined,
      cloudflareSslStatus: newOrg.customDomain ? "PENDING_DNS" : "ACTIVE_SSL",
      plan: newOrg.plan,
      billingCycle: newOrg.billingCycle,
      monthlyFeePaisa: monthlyFee,
      status: "ACTIVE",
      memberCount: 1,
      monthlyPaisaVolume: 0n,
      storageMbUsed: 15,
      features: newOrg.features,
      rootAdminEmail: newOrg.adminEmail,
      createdAt: "Just now",
    };

    setTenants([created, ...tenants]);
    setShowCreateModal(false);
    setWizardStep(1);
    setNewOrg({
      name: "",
      nameBn: "",
      slug: "",
      customDomain: "",
      plan: "GROWTH",
      billingCycle: "ANNUAL",
      adminFullName: "",
      adminEmail: "",
      adminPhone: "",
      features: {
        smsBroadcast: true,
        digitalVoting: true,
        cmeLms: true,
        bloodBank: true,
        conciergeCerts: true,
      },
    });
  };

  const filteredTenants = tenants.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.customDomain && t.customDomain.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesPlan = selectedPlanFilter === "ALL" || t.plan === selectedPlanFilter;
    return matchesSearch && matchesPlan;
  });

  const totalMembers = tenants.reduce((acc, t) => acc + t.memberCount, 0);
  const totalMonthlyFeePaisa = tenants.reduce((acc, t) => acc + t.monthlyFeePaisa, 0n);
  const totalSettledPaisa = tenants.reduce((acc, t) => acc + t.monthlyPaisaVolume, 0n);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500/20 selection:text-amber-300">
      {/* Top Header */}
      <header className="border-b border-slate-800/80 bg-slate-900/70 backdrop-blur-2xl px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Link
            href="/portal"
            className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-mono tracking-wider uppercase"
          >
            <ArrowLeft className="w-4 h-4" /> Organization Portal
          </Link>
          <span className="text-slate-700 font-mono">|</span>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-amber-500/20">
              <Server className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-bold tracking-wide text-slate-100 flex items-center gap-2">
                SaaS Master Control Panel
                <Badge variant="gold" size="sm" pulse>
                  SuperAdmin Mode
                </Badge>
              </div>
              <p className="text-[10px] text-slate-400 font-mono">
                Platform Multi-Tenant Registry · Cloudflare SSL for SaaS · Integer Paisa Billing
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-950/60 text-xs font-mono text-slate-300">
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>Cloudflare Edge SSL Active</span>
          </div>
          <Button
            size="sm"
            variant="gold"
            shimmer
            onClick={() => {
              setShowCreateModal(true);
              setWizardStep(1);
            }}
            leftIcon={<Plus className="w-3.5 h-3.5" />}
          >
            Register New Tenant
          </Button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl w-full mx-auto px-6 py-8 space-y-8">
        {/* Global SaaS Telemetry Deck */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card interactive accent="gold" className="border-slate-800 bg-slate-900/50 backdrop-blur-xl">
            <CardHeader className="pb-2">
              <CardDescription className="text-xs uppercase tracking-wider font-mono text-slate-400 flex items-center justify-between">
                <span>Active Organizations</span>
                <Building className="w-4 h-4 text-amber-400" />
              </CardDescription>
              <CardTitle className="text-3xl font-extrabold text-white mt-1">
                {tenants.length} <span className="text-sm font-normal text-slate-400">Tenants</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Enterprise: {tenants.filter((t) => t.plan === "ENTERPRISE").length}</span>
                <span className="text-emerald-400">100% Edge Resolved</span>
              </div>
            </CardContent>
          </Card>

          <Card interactive accent="emerald" className="border-slate-800 bg-slate-900/50 backdrop-blur-xl">
            <CardHeader className="pb-2">
              <CardDescription className="text-xs uppercase tracking-wider font-mono text-slate-400 flex items-center justify-between">
                <span>Total Network Members</span>
                <Shield className="w-4 h-4 text-emerald-400" />
              </CardDescription>
              <CardTitle className="text-3xl font-extrabold text-emerald-400 mt-1">
                {totalMembers.toLocaleString()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-slate-500 font-mono">
                Isolated via 4-Layer Prisma Extension
              </p>
            </CardContent>
          </Card>

          <Card interactive accent="gold" className="border-slate-800 bg-slate-900/50 backdrop-blur-xl">
            <CardHeader className="pb-2">
              <CardDescription className="text-xs uppercase tracking-wider font-mono text-slate-400 flex items-center justify-between">
                <span>Platform MRR (SaaS Fee)</span>
                <Zap className="w-4 h-4 text-amber-400" />
              </CardDescription>
              <CardTitle className="text-3xl font-extrabold text-white mt-1">
                ৳ {(Number(totalMonthlyFeePaisa / 100n)).toLocaleString()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-amber-400/80 font-mono">
                Strict BigInt Paisa Precision Ledger
              </p>
            </CardContent>
          </Card>

          <Card interactive className="border-slate-800 bg-slate-900/50 backdrop-blur-xl">
            <CardHeader className="pb-2">
              <CardDescription className="text-xs uppercase tracking-wider font-mono text-slate-400 flex items-center justify-between">
                <span>Gross Paisa Settled</span>
                <Activity className="w-4 h-4 text-cyan-400" />
              </CardDescription>
              <CardTitle className="text-3xl font-extrabold text-cyan-400 mt-1">
                ৳ {(Number(totalSettledPaisa / 100n)).toLocaleString()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-slate-500 font-mono">
                EPS, bKash, Nagad & Bank Deposits
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tenant Registry & Control Console */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Building className="w-5 h-5 text-amber-400" />
                Tenant Management & Edge Routing Registry
              </h2>
              <p className="text-xs text-slate-400">
                Register organizations, configure Cloudflare custom hostnames, switch subscription tiers, or perform audited support impersonation.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center rounded-xl border border-slate-800 bg-slate-900/80 p-1">
                {(["ALL", "ENTERPRISE", "GROWTH", "STARTER"] as const).map((plan) => (
                  <button
                    key={plan}
                    onClick={() => setSelectedPlanFilter(plan)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                      selectedPlanFilter === plan
                        ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {plan}
                  </button>
                ))}
              </div>

              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search organization or domain..."
                  className="pl-9 pr-4 py-1.5 rounded-xl border border-slate-800 bg-slate-900 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500 w-64"
                />
              </div>
            </div>
          </div>

          {/* Tenants Data Table */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-2xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-950/80 text-xs uppercase font-mono text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="px-6 py-4">Organization & Subdomain</th>
                    <th className="px-6 py-4">Cloudflare SSL Hostname</th>
                    <th className="px-6 py-4">Plan & Billing</th>
                    <th className="px-6 py-4 text-center">Active Members</th>
                    <th className="px-6 py-4">Status & Health</th>
                    <th className="px-6 py-4 text-right">Master Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredTenants.map((tenant) => (
                    <tr key={tenant.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-white flex items-center gap-2">
                          {tenant.name}
                          {tenant.features.digitalVoting && (
                            <span title="Digital Voting Enabled" className="inline-block w-2 h-2 rounded-full bg-purple-400" />
                          )}
                        </div>
                        <div className="text-xs text-slate-400 font-bangla">{tenant.nameBn}</div>
                        <div className="text-xs font-mono text-amber-400/90 mt-1 flex items-center gap-2">
                          <span>{tenant.slug}.orgms.app</span>
                          <CopyButton text={`${tenant.slug}.orgms.app`} label="" className="h-5 px-1.5 text-[10px]" />
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        {tenant.customDomain ? (
                          <div className="space-y-1">
                            <div className="font-mono text-xs text-slate-200 flex items-center gap-1.5">
                              <Globe className="w-3.5 h-3.5 text-cyan-400" />
                              {tenant.customDomain}
                            </div>
                            {tenant.cloudflareSslStatus === "ACTIVE_SSL" ? (
                              <Badge variant="success" size="sm" dot>
                                Cloudflare SSL Active
                              </Badge>
                            ) : (
                              <Badge variant="warning" size="sm" pulse>
                                Pending CNAME Validation
                              </Badge>
                            )}
                          </div>
                        ) : (
                          <span className="text-xs font-mono text-slate-500">Platform Subdomain Only</span>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <div className="font-mono text-xs text-white font-semibold">
                          ৳ {(Number(tenant.monthlyFeePaisa / 100n)).toLocaleString()}
                          <span className="text-[10px] text-slate-500 font-normal"> /mo</span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-1">
                          <Badge
                            variant={tenant.plan === "ENTERPRISE" ? "gold" : "glass"}
                            size="sm"
                          >
                            {tenant.plan}
                          </Badge>
                          <span className="text-[10px] font-mono text-slate-500 uppercase">
                            {tenant.billingCycle}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-center font-mono text-white font-medium">
                        <div className="text-base font-bold text-white">
                          {tenant.memberCount.toLocaleString()}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {tenant.storageMbUsed} MB storage
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <Badge
                            variant={
                              tenant.status === "ACTIVE"
                                ? "success"
                                : tenant.status === "TRIAL"
                                ? "warning"
                                : "destructive"
                            }
                            size="sm"
                            dot
                          >
                            {tenant.status}
                          </Badge>
                          {tenant.status === "TRIAL" && (
                            <div className="text-[10px] font-mono text-amber-400">
                              {tenant.trialDaysRemaining} days remaining
                            </div>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="sm"
                            variant="glass"
                            className="text-xs text-slate-300 hover:text-white"
                            onClick={() => handleToggleStatus(tenant.id)}
                          >
                            {tenant.status === "ACTIVE" ? "Suspend" : "Activate"}
                          </Button>
                          <Button
                            size="sm"
                            variant="gold"
                            className="text-xs"
                            onClick={() => setImpersonatingTenant(tenant)}
                            leftIcon={<Key className="w-3.5 h-3.5" />}
                          >
                            Impersonate
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* 4-Step White-Glove Tenant Onboarding Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-2xl w-full rounded-2xl border border-amber-500/30 bg-slate-900 p-6 space-y-6 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Building className="w-5 h-5 text-amber-400" />
                  White-Glove Tenant Onboarding Wizard
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Step {wizardStep} of 3: {wizardStep === 1 ? "Organization Identity" : wizardStep === 2 ? "Cloudflare Domain & Plan" : "Admin Credentials & Features"}
                </p>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-white text-sm font-mono"
              >
                ✕
              </button>
            </div>

            {/* Step Progress Indicators */}
            <div className="flex items-center gap-2">
              <div
                className={`flex-1 h-1.5 rounded-full transition-all ${
                  wizardStep >= 1 ? "bg-amber-500 shadow-sm shadow-amber-500/40" : "bg-slate-800"
                }`}
              />
              <div
                className={`flex-1 h-1.5 rounded-full transition-all ${
                  wizardStep >= 2 ? "bg-amber-500 shadow-sm shadow-amber-500/40" : "bg-slate-800"
                }`}
              />
              <div
                className={`flex-1 h-1.5 rounded-full transition-all ${
                  wizardStep >= 3 ? "bg-amber-500 shadow-sm shadow-amber-500/40" : "bg-slate-800"
                }`}
              />
            </div>

            {/* Wizard Form */}
            <form onSubmit={handleCreateTenant} className="space-y-4">
              {wizardStep === 1 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-slate-300">
                      Organization Name (English) *
                    </label>
                    <input
                      type="text"
                      required
                      value={newOrg.name}
                      onChange={(e) => setNewOrg({ ...newOrg, name: e.target.value })}
                      placeholder="e.g. Bangladesh Bar Association — Sylhet Chapter"
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-slate-300">
                      Organization Name (বাংলা)
                    </label>
                    <input
                      type="text"
                      value={newOrg.nameBn}
                      onChange={(e) => setNewOrg({ ...newOrg, nameBn: e.target.value })}
                      placeholder="e.g. বাংলাদেশ বার অ্যাসোসিয়েশন — সিলেট শাখা"
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 font-bangla"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-slate-300">
                      Subdomain Identifier *
                    </label>
                    <div className="flex items-center rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5">
                      <input
                        type="text"
                        required
                        value={newOrg.slug}
                        onChange={(e) =>
                          setNewOrg({ ...newOrg, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "") })
                        }
                        placeholder="sylhet-bar"
                        className="w-full bg-transparent text-sm text-white focus:outline-none font-mono"
                      />
                      <span className="text-xs font-mono text-amber-400">.orgms.app</span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-mono">
                      This will be their permanent edge-routed address.
                    </p>
                  </div>
                </div>
              )}

              {wizardStep === 2 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-slate-300 flex items-center justify-between">
                      <span>Custom Domain (Cloudflare SSL for SaaS)</span>
                      <Badge variant="success" size="sm">
                        Zero-Cert Configuration
                      </Badge>
                    </label>
                    <input
                      type="text"
                      value={newOrg.customDomain}
                      onChange={(e) => setNewOrg({ ...newOrg, customDomain: e.target.value })}
                      placeholder="e.g. members.sylhetbar.org.bd"
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 font-mono"
                    />
                    <p className="text-[11px] text-slate-500 font-mono">
                      Cloudflare will auto-generate an edge SSL certificate once tenant points CNAME to edge.orgms.app.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-3 pt-2">
                    {[
                      { plan: "STARTER", price: "৳ 4,999", desc: "Up to 500 members" },
                      { plan: "GROWTH", price: "৳ 14,999", desc: "Up to 3,000 members" },
                      { plan: "ENTERPRISE", price: "৳ 34,999", desc: "Unlimited + Custom Domain" },
                    ].map((item) => (
                      <div
                        key={item.plan}
                        onClick={() => setNewOrg({ ...newOrg, plan: item.plan as any })}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                          newOrg.plan === item.plan
                            ? "border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/10"
                            : "border-slate-800 bg-slate-950/60 hover:border-slate-700"
                        }`}
                      >
                        <div className="text-xs font-mono font-bold text-white">{item.plan}</div>
                        <div className="text-base font-extrabold text-amber-400 mt-1">{item.price}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{item.desc}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                    <span className="text-slate-300 font-mono">Billing Cycle:</span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setNewOrg({ ...newOrg, billingCycle: "MONTHLY" })}
                        className={`px-3 py-1 rounded-lg text-xs font-mono ${
                          newOrg.billingCycle === "MONTHLY"
                            ? "bg-slate-700 text-white font-bold"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        Monthly
                      </button>
                      <button
                        type="button"
                        onClick={() => setNewOrg({ ...newOrg, billingCycle: "ANNUAL" })}
                        className={`px-3 py-1 rounded-lg text-xs font-mono ${
                          newOrg.billingCycle === "ANNUAL"
                            ? "bg-amber-500 text-slate-950 font-bold"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        Annual (20% Off)
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {wizardStep === 3 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="space-y-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-xs font-mono uppercase text-slate-400 font-bold">
                      Root Administrator Provisioning
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Admin Full Name"
                        value={newOrg.adminFullName}
                        onChange={(e) => setNewOrg({ ...newOrg, adminFullName: e.target.value })}
                        className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                      <input
                        type="email"
                        required
                        placeholder="Admin Email (Official)"
                        value={newOrg.adminEmail}
                        onChange={(e) => setNewOrg({ ...newOrg, adminEmail: e.target.value })}
                        className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Admin Mobile (+8801XXXXXXXXX for SMS OTP)"
                      value={newOrg.adminPhone}
                      onChange={(e) => setNewOrg({ ...newOrg, adminPhone: e.target.value })}
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs font-mono uppercase text-slate-400 font-bold">
                      Platform Feature Toggles
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {[
                        { key: "smsBroadcast", label: "Emergency SMS Gateway" },
                        { key: "digitalVoting", label: "Digital Secret Ballots" },
                        { key: "cmeLms", label: "CME & Accreditation Courses" },
                        { key: "bloodBank", label: "Blood Donor & Welfare" },
                        { key: "conciergeCerts", label: "Good Standing Certificates" },
                      ].map((feature) => (
                        <label
                          key={feature.key}
                          className="flex items-center gap-2 p-2 rounded-lg bg-slate-950 border border-slate-800/80 cursor-pointer text-slate-300 hover:text-white"
                        >
                          <input
                            type="checkbox"
                            checked={(newOrg.features as any)[feature.key]}
                            onChange={(e) =>
                              setNewOrg({
                                ...newOrg,
                                features: {
                                  ...newOrg.features,
                                  [feature.key]: e.target.checked,
                                },
                              })
                            }
                            className="rounded border-slate-700 text-amber-500 focus:ring-0"
                          />
                          <span className="text-xs">{feature.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Modal Navigation Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                {wizardStep > 1 ? (
                  <Button
                    type="button"
                    variant="glass"
                    size="sm"
                    onClick={() => setWizardStep(wizardStep - 1)}
                  >
                    Back
                  </Button>
                ) : (
                  <div />
                )}

                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="border-slate-700 text-slate-300"
                    onClick={() => setShowCreateModal(false)}
                  >
                    Cancel
                  </Button>
                  {wizardStep < 3 ? (
                    <Button
                      type="button"
                      variant="gold"
                      size="sm"
                      onClick={() => setWizardStep(wizardStep + 1)}
                    >
                      Continue
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      variant="gold"
                      size="sm"
                      shimmer
                      leftIcon={<Zap className="w-3.5 h-3.5" />}
                    >
                      Provision Tenant Now
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Audited Impersonation Security Modal */}
      {impersonatingTenant && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full rounded-2xl border border-amber-500/40 bg-slate-900 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Shield className="w-5 h-5 text-amber-400" />
                Audited Support Impersonation
              </h3>
              <button
                onClick={() => setImpersonatingTenant(null)}
                className="text-slate-400 hover:text-white text-sm font-mono"
              >
                ✕ Close
              </button>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              You are about to establish a secure, temporary delegated session into{" "}
              <strong className="text-white">{impersonatingTenant.name}</strong> as Platform SuperAdmin.
            </p>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-400 space-y-1.5">
              <div>Tenant ID: <span className="text-slate-200">{impersonatingTenant.id}</span></div>
              <div>Subdomain: <span className="text-amber-400">{impersonatingTenant.slug}.orgms.app</span></div>
              <div>Root Admin: <span className="text-slate-300">{impersonatingTenant.rootAdminEmail}</span></div>
              <div className="text-emerald-400 pt-1">
                ✓ Cryptographic token will be logged to immutable audit ledger
              </div>
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
              <Link href="/portal/cms">
                <Button
                  size="sm"
                  variant="gold"
                  shimmer
                  onClick={() => setImpersonatingTenant(null)}
                  leftIcon={<Key className="w-3.5 h-3.5" />}
                >
                  Launch Tenant CMS Studio
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
