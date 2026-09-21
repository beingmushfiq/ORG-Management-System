"use client";

import React, { useState } from "react";
import {
  Users,
  Search,
  Eye,
  CreditCard,
  Building,
  Phone,
  Mail,
  Shield,
  Filter,
} from "lucide-react";
import { Button, Badge, Card, Input } from "@org/ui";
import Link from "next/link";
import { maskSensitiveMemberField } from "@/lib/privacy";

interface MemberEntry {
  id: string;
  name: string;
  nameBn: string;
  membershipNumber: string;
  tier: "ASSOCIATE" | "GENERAL" | "LIFE";
  status: "ACTIVE" | "SUSPENDED" | "PENDING_KYC";
  branchName: string;
  bloodGroup: string;
  occupation: string;
  phone: string;
  email: string;
}

const DEMO_MEMBERS: MemberEntry[] = [
  {
    id: "m-1",
    name: "Prof. Dr. Mujibul Haque",
    nameBn: "অধ্যাপক ডাঃ মুজিবুল হক",
    membershipNumber: "BMA-LIFE-0001",
    tier: "LIFE",
    status: "ACTIVE",
    branchName: "Central Executive Secretariat",
    bloodGroup: "B+",
    occupation: "Consultant Cardiologist",
    phone: "+8801819000001",
    email: "president@bma-ctg.org",
  },
  {
    id: "m-2",
    name: "Dr. Faisal Ahmed Chowdhury",
    nameBn: "ডাঃ ফয়সাল আহমেদ চৌধুরী",
    membershipNumber: "BMA-LIFE-0002",
    tier: "LIFE",
    status: "ACTIVE",
    branchName: "Central Executive Secretariat",
    bloodGroup: "O+",
    occupation: "Orthopaedic Surgeon",
    phone: "+8801711223344",
    email: "gs@bma-ctg.org",
  },
  {
    id: "m-3",
    name: "Dr. Salma Begum",
    nameBn: "ডাঃ সালমা বেগম",
    membershipNumber: "BMA-GEN-0142",
    tier: "GENERAL",
    status: "ACTIVE",
    branchName: "Kotwali Central Hospital Unit",
    bloodGroup: "A+",
    occupation: "Gynaecologist",
    phone: "+8801911556677",
    email: "salma.doctor@ctg-hospital.bd",
  },
  {
    id: "m-4",
    name: "Dr. Tariqul Islam",
    nameBn: "ডাঃ তরিকুল ইসলাম",
    membershipNumber: "BMA-ASC-0891",
    tier: "ASSOCIATE",
    status: "ACTIVE",
    branchName: "Panchlaish Medical College Unit",
    bloodGroup: "AB+",
    occupation: "Assistant Registrar",
    phone: "+8801552334455",
    email: "tariqul.islam@cmc.edu.bd",
  },
];

export default function MemberDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTier, setSelectedTier] = useState<string>("ALL");
  const [viewerRole, setViewerRole] = useState<"PUBLIC_VISITOR" | "VERIFIED_MEMBER" | "EXECUTIVE_OFFICER">(
    "PUBLIC_VISITOR"
  );

  const filteredMembers = DEMO_MEMBERS.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.membershipNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.branchName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTier = selectedTier === "ALL" || m.tier === selectedTier;
    return matchesSearch && matchesTier;
  });

  return (
    <div className="min-h-screen bg-background text-foreground p-6 sm:p-12 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between border-b border-white/10 pb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-2">
            <Link href="/" className="hover:text-white">Public Site</Link>
            <span>/</span>
            <span className="text-primary">Member Directory</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Users className="w-8 h-8 text-primary" />
            Member Registry & Three-Tier Privacy Directory
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Faceted search with automatic field masking protecting verified doctors' personal contact details.
          </p>
        </div>

        {/* Interactive Viewer Role Simulator */}
        <div className="p-3 rounded-xl bg-slate-900/90 border border-white/15 flex flex-col sm:flex-row items-center gap-2 text-xs">
          <span className="text-muted-foreground font-semibold flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            Simulate Viewer Context:
          </span>
          <div className="flex gap-1.5">
            {[
              { id: "PUBLIC_VISITOR", label: "Public Visitor" },
              { id: "VERIFIED_MEMBER", label: "Logged-In Member" },
              { id: "EXECUTIVE_OFFICER", label: "Branch Officer" },
            ].map((role) => (
              <button
                key={role.id}
                type="button"
                onClick={() => setViewerRole(role.id as any)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  viewerRole === role.id
                    ? "bg-primary text-white shadow-sm font-bold"
                    : "bg-white/5 text-slate-400 hover:text-white"
                }`}
              >
                {role.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="sm:col-span-2 relative">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
          <Input
            placeholder="Search by Doctor Name, Member ID, or Unit..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex items-center gap-2 sm:col-span-2">
          <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
          <div className="flex gap-1.5 overflow-x-auto w-full">
            {["ALL", "ASSOCIATE", "GENERAL", "LIFE"].map((tier) => (
              <button
                key={tier}
                onClick={() => setSelectedTier(tier)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                  selectedTier === tier
                    ? "bg-primary/20 border-primary text-white"
                    : "bg-slate-900/40 border-white/10 text-muted-foreground hover:text-white"
                }`}
              >
                {tier}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Member Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredMembers.map((member) => {
          const maskedPhone = maskSensitiveMemberField(member.phone, "MEMBERS_ONLY", viewerRole);
          const maskedEmail = maskSensitiveMemberField(member.email, "MEMBERS_ONLY", viewerRole);

          return (
            <Card key={member.id} className="p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">{member.name}</h3>
                    <p className="text-xs text-muted-foreground font-bangla">{member.nameBn}</p>
                  </div>
                  <Badge
                    variant={
                      member.tier === "LIFE"
                        ? "warning"
                        : member.tier === "GENERAL"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {member.tier}
                  </Badge>
                </div>

                <div className="space-y-2 text-xs pt-3 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Member Registration:</span>
                    <span className="font-mono font-bold text-amber-400">{member.membershipNumber}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-primary" /> Branch:
                    </span>
                    <span className="font-semibold text-white">{member.branchName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Blood Group:</span>
                    <span className="font-bold text-rose-400">{member.bloodGroup}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Specialty / Title:</span>
                    <span className="font-medium text-slate-300">{member.occupation}</span>
                  </div>
                </div>

                {/* Privacy-Masked Contact Info */}
                <div className="mt-4 p-3 rounded-xl bg-slate-950/80 border border-white/10 space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="font-mono text-slate-300">{maskedPhone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-3.5 h-3.5 text-sky-400" />
                    <span className="font-mono text-slate-300">{maskedEmail}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5" /> Standing: Active
                </span>
                <Link href="/">
                  <Button variant="ghost" size="sm" className="h-8 text-xs gap-1.5 text-amber-400">
                    <CreditCard className="w-3.5 h-3.5" /> View Digital Card
                  </Button>
                </Link>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
