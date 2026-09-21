"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  ShieldCheck,
  QrCode,
  Download,
  Building,
  CheckCircle2,
  Calendar,
  ArrowLeft,
  FileCheck,
  AlertCircle,
} from "lucide-react";
import { Button, Badge, Card, CardHeader, CardTitle, CardDescription, CardContent } from "@org/ui";
import Link from "next/link";

interface VerificationRecord {
  memberId: string;
  fullName: string;
  fullNameBn: string;
  tier: "ASSOCIATE" | "GENERAL" | "LIFE";
  status: "ACTIVE" | "SUSPENDED" | "EXPIRED";
  branchName: string;
  joinedDate: string;
  validThrough: string;
  securityHash: string;
  issuerOrg: string;
  issuerOrgBn: string;
}

const MOCK_REGISTRY: Record<string, VerificationRecord> = {
  "RSM-VOL-2018-001": {
    memberId: "RSM-VOL-2018-001",
    fullName: "Engr. Tanvir Ahmed",
    fullNameBn: "প্রকৌশলী তানভীর আহমেদ",
    tier: "LIFE",
    status: "ACTIVE",
    branchName: "National Executive Secretariat",
    joinedDate: "July 29, 2018",
    validThrough: "Founding Organizer (Honorary Fellow)",
    securityHash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    issuerOrg: "Road Safety Movement",
    issuerOrgBn: "নিরাপদ সড়ক আন্দোলন",
  },
  "RSM-DU-2024-082": {
    memberId: "RSM-DU-2024-082",
    fullName: "Nafisa Rahman",
    fullNameBn: "নাফিসা রহমান",
    tier: "GENERAL",
    status: "ACTIVE",
    branchName: "Dhaka University Central Chapter",
    joinedDate: "February 10, 2024",
    validThrough: "December 31, 2026",
    securityHash: "7d1a54127b222502f5b79b5fb0803061152a44f92b37e23c65dd0f329d1b41ca",
    issuerOrg: "Road Safety Movement",
    issuerOrgBn: "নিরাপদ সড়ক আন্দোলন",
  },
};

export default function MemberVerificationPage() {
  const params = useParams();
  const rawId = (params["id"] as string) || "BMA-LIFE-0001";
  const memberId = decodeURIComponent(rawId).toUpperCase();

  const [isScanning, setIsScanning] = useState(true);
  const [record, setRecord] = useState<VerificationRecord | null>(null);

  useEffect(() => {
    // Cinematic verification sequence
    const timer = setTimeout(() => {
      const match = MOCK_REGISTRY[memberId] || {
        memberId,
        fullName: "Dr. Mohammad Hasan",
        fullNameBn: "ডাঃ মোহাম্মদ হাসান",
        tier: "GENERAL",
        status: "ACTIVE",
        branchName: "Panchlaish Medical College Unit",
        joinedDate: "February 20, 2024",
        validThrough: "December 31, 2026",
        securityHash: "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
        issuerOrg: "Bangladesh Medical Association — Chattogram",
        issuerOrgBn: "বাংলাদেশ মেডিকেল এসোসিয়েশন — চট্টগ্রাম",
      };
      setRecord(match);
      setIsScanning(false);
    }, 900);

    return () => clearTimeout(timer);
  }, [memberId]);

  return (
    <div className="min-h-screen bg-background text-foreground p-6 sm:p-12 max-w-4xl mx-auto space-y-8">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-white mb-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Public Home
          </Link>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-emerald-400" />
            Public Trust & Credential Verification Desk
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Official cryptographic registry for Bangladesh Medical Association (Chattogram Branch).
          </p>
        </div>
        <Badge variant="success" className="px-3 py-1 text-xs">
          Registry Live
        </Badge>
      </div>

      {isScanning ? (
        /* Cinematic Laser Scan Animation */
        <Card className="p-12 text-center relative overflow-hidden flex flex-col items-center justify-center min-h-[380px]">
          <div className="w-20 h-20 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary mb-6 animate-pulse">
            <QrCode className="w-10 h-10" />
          </div>
          <div className="text-xl font-bold text-white tracking-tight">
            Scanning Cryptographic Hash & Ledger...
          </div>
          <p className="text-xs text-muted-foreground mt-1 font-mono">
            Verifying ID: {memberId}
          </p>

          {/* Animated Laser Bar */}
          <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-bounce opacity-80" />
        </Card>
      ) : record ? (
        /* Verification Verified Result Card */
        <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
          <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs uppercase font-bold text-emerald-400 tracking-wider">
                  Official Verification Status
                </div>
                <div className="text-xl font-extrabold text-white mt-0.5">
                  Verified Active Member in Good Standing
                </div>
              </div>
            </div>
            <Badge variant="warning" className="text-xs px-3 py-1 font-bold">
              {record.tier} Member
            </Badge>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Member Credential Dossier</CardTitle>
              <CardDescription>
                Details below are verified directly against the organization's central database.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-white/10 space-y-1">
                  <div className="text-xs text-muted-foreground">Member Full Name</div>
                  <div className="text-lg font-bold text-white">{record.fullName}</div>
                  <div className="text-xs text-muted-foreground font-bangla">{record.fullNameBn}</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-white/10 space-y-1">
                  <div className="text-xs text-muted-foreground">Membership Registration No.</div>
                  <div className="text-lg font-mono font-bold text-amber-400">{record.memberId}</div>
                  <div className="text-xs text-emerald-400 flex items-center gap-1 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Standing: {record.status}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-white/10 space-y-1">
                  <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-primary" /> Affiliated Branch Node
                  </div>
                  <div className="text-sm font-semibold text-white">{record.branchName}</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-white/10 space-y-1">
                  <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" /> Validity & Tenure
                  </div>
                  <div className="text-sm font-semibold text-slate-200">{record.validThrough}</div>
                </div>
              </div>

              {/* Security Hash Proof */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-white/10 space-y-1">
                <div className="text-[11px] uppercase font-bold text-muted-foreground flex items-center justify-between">
                  <span>Cryptographic Seal (SHA-256)</span>
                  <span className="text-emerald-400 font-mono">TAMPER-PROOF</span>
                </div>
                <div className="text-xs font-mono text-slate-400 break-all pt-1">
                  {record.securityHash}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between pt-4 border-t border-white/10 gap-3">
                <div className="text-xs text-muted-foreground">
                  Issued by: <strong className="text-white">{record.issuerOrg}</strong>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                    <FileCheck className="w-3.5 h-3.5" /> Download Letter of Good Standing
                  </Button>
                  <Button size="sm" className="gap-1.5 text-xs shadow-md">
                    <Download className="w-3.5 h-3.5" /> Save Vector Pass (PDF)
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card className="p-10 text-center">
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-white">Record Not Found</h3>
          <p className="text-xs text-muted-foreground mt-1">
            No member record matches identifier &apos;{memberId}&apos; in the registry.
          </p>
        </Card>
      )}
    </div>
  );
}
