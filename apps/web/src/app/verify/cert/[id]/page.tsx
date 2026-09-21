"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  ShieldCheck,
  Award,
  Download,
  Building,
  CheckCircle2,
  Calendar,
  ArrowLeft,
  FileCheck,
  AlertCircle,
  Hash,
  ExternalLink,
  Printer,
} from "lucide-react";
import { Button, Badge, Card, CardHeader, CardTitle, CardContent } from "@org/ui";
import Link from "next/link";

interface CertificateRecord {
  certId: string;
  title: string;
  titleBn: string;
  category: "LIFE_MEMBERSHIP" | "TRAINING_ACCREDITATION" | "ELECTION_GAZETTE" | "EXCELLENCE_AWARD";
  recipientName: string;
  recipientNameBn: string;
  membershipId: string;
  issueDate: string;
  validThrough: string;
  signatories: Array<{
    name: string;
    designation: string;
    designationBn: string;
  }>;
  securityHash: string;
  issuerOrg: string;
  issuerOrgBn: string;
  isRevoked: boolean;
}

const MOCK_CERT_REGISTRY: Record<string, CertificateRecord> = {
  "CERT-2026-001": {
    certId: "CERT-2026-001",
    title: "Fellow of Permanent Activist Council Conferral",
    titleBn: "স্থায়ী সংগঠক পরিষদ সনদপত্র",
    category: "LIFE_MEMBERSHIP",
    recipientName: "Engr. Tanvir Ahmed",
    recipientNameBn: "প্রকৌশলী তানভীর আহমেদ",
    membershipId: "RSM-VOL-2018-001",
    issueDate: "February 20, 2026",
    validThrough: "Perpetual / Lifetime Standing",
    signatories: [
      { name: "Advocate Shafiul Alam", designation: "Chief Coordinator", designationBn: "প্রধান সমন্বয়ক" },
      { name: "Nusrat Jahan", designation: "General Secretary", designationBn: "সাধারণ সম্পাদক" },
    ],
    securityHash: "9f83c6b749d62d26f63beec29124be70df0498b8c9b91eb9725f57a94ee2e185",
    issuerOrg: "Road Safety Movement (নিরাপদ সড়ক আন্দোলন)",
    issuerOrgBn: "নিরাপদ সড়ক আন্দোলন — জাতীয় সচিবালয়",
    isRevoked: false,
  },
  "CERT-2026-042": {
    certId: "CERT-2026-042",
    title: "Road Safety & First-Response Emergency Accreditation",
    titleBn: "সড়ক নিরাপত্তা ও জরুরি উদ্ধার ব্যবস্থাপনা স্বীকৃতি",
    category: "TRAINING_ACCREDITATION",
    recipientName: "Nusrat Jahan",
    recipientNameBn: "নুসরাত জাহান",
    membershipId: "RSM-ACT-2019-042",
    issueDate: "June 12, 2025",
    validThrough: "June 11, 2028",
    signatories: [
      { name: "Engr. Tanvir Ahmed", designation: "Academic Convener", designationBn: "একাডেমিক আহ্বায়ক" },
      { name: "Advocate Shafiul Alam", designation: "Secretary General", designationBn: "মহাসচিব" },
    ],
    securityHash: "3cb3416e788e04b4d7f57cb8f076b3f71c4c81a5336bf729524024316d3f2fc6",
    issuerOrg: "Road Safety Movement (নিরাপদ সড়ক আন্দোলন)",
    issuerOrgBn: "নিরাপদ সড়ক আন্দোলন — জাতীয় সচিবালয়",
    isRevoked: false,
  },
};

export default function CertificateVerificationPage() {
  const params = useParams();
  const rawId = (params["id"] as string) || "CERT-2026-001";
  const certId = decodeURIComponent(rawId).toUpperCase();

  const [isScanning, setIsScanning] = useState(true);
  const [record, setRecord] = useState<CertificateRecord | null>(null);

  useEffect(() => {
    setIsScanning(true);
    const timer = setTimeout(() => {
      const match = MOCK_CERT_REGISTRY[certId] ?? {
        certId,
        title: "Official Institutional Credential",
        titleBn: "প্রাতিষ্ঠানিক অফিসিয়াল সনদপত্র",
        category: "LIFE_MEMBERSHIP" as const,
        recipientName: "Verified Activist",
        recipientNameBn: "যাচাইকৃত সক্রিয় সংগঠক",
        membershipId: "RSM-VOL-AUTO",
        issueDate: "January 1, 2026",
        validThrough: "December 31, 2028",
        signatories: [
          { name: "Chief Coordinator", designation: "Central Executive", designationBn: "কেন্দ্রীয় নির্বাহী" },
        ],
        securityHash: "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
        issuerOrg: "Road Safety Movement (নিরাপদ সড়ক আন্দোলন)",
        issuerOrgBn: "নিরাপদ সড়ক আন্দোলন — জাতীয় সচিবালয়",
        isRevoked: false,
      };
      setRecord(match);
      setIsScanning(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, [certId]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-amber-500/20 selection:text-amber-300">
      {/* Laser scan line effect during loading */}
      {isScanning && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          <div className="w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_20px_#f59e0b] animate-scan" />
        </div>
      )}

      {/* Top Banner */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-xl px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-mono tracking-wider uppercase"
          >
            <ArrowLeft className="w-4 h-4" /> Portfolio
          </Link>
          <span className="text-slate-700 font-mono">|</span>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <span className="text-sm font-semibold tracking-wide uppercase text-slate-300">
              Cryptographic Registry Verification
            </span>
          </div>
        </div>
        <Badge variant="outline" className="border-amber-500/40 text-amber-400 bg-amber-500/10 font-mono text-xs">
          SHA-256 Ledger
        </Badge>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl w-full mx-auto px-6 py-12 flex-1 flex flex-col items-center justify-center">
        {isScanning ? (
          <div className="text-center py-20">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full border-2 border-amber-500/20 animate-ping" />
              <div className="w-20 h-20 rounded-full border-2 border-amber-400 border-t-transparent animate-spin flex items-center justify-center">
                <FileCheck className="w-8 h-8 text-amber-400" />
              </div>
            </div>
            <h2 className="text-xl font-display font-medium text-slate-200">
              Validating Certificate Seal...
            </h2>
            <p className="text-sm text-slate-400 mt-2 font-mono">
              Querying tenant ledger for #{certId}
            </p>
          </div>
        ) : record ? (
          <div className="w-full space-y-6">
            {/* Verification Status Banner */}
            <div className="relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-emerald-900/20 to-slate-900/80 p-6 backdrop-blur-2xl shadow-2xl">
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold">
                        AUTHENTIC CREDENTIAL
                      </span>
                      <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 bg-emerald-500/10 text-[11px]">
                        Cryptographically Sealed
                      </Badge>
                    </div>
                    <h1 className="text-2xl font-display font-bold text-white mt-1">
                      {record.title}
                    </h1>
                    <p className="text-sm text-slate-400 font-bangla">{record.titleBn}</p>
                  </div>
                </div>

                <div className="flex gap-2 w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 sm:flex-none border-slate-700 text-slate-300 hover:text-white"
                    onClick={() => window.print()}
                  >
                    <Printer className="w-4 h-4 mr-2" /> Print
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 sm:flex-none bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold"
                  >
                    <Download className="w-4 h-4 mr-2" /> Download PDF
                  </Button>
                </div>
              </div>
            </div>

            {/* Certificate Dossier Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left 2 Cols: Recipient & Credential Details */}
              <div className="md:col-span-2 space-y-6">
                <Card className="border-slate-800 bg-slate-900/60 backdrop-blur-xl">
                  <CardHeader className="pb-4 border-b border-slate-800/80">
                    <CardTitle className="text-sm uppercase tracking-wider text-slate-400 font-mono flex items-center gap-2">
                      <Award className="w-4 h-4 text-amber-400" /> Recipient Dossier
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-6">
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-widest font-mono">Conferred Upon</p>
                      <p className="text-2xl font-bold text-white mt-1">{record.recipientName}</p>
                      <p className="text-base text-slate-400 font-bangla">{record.recipientNameBn}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800/60">
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-widest font-mono">Membership ID</p>
                        <p className="text-sm font-mono font-medium text-slate-200 mt-1">
                          <Link href={`/verify/member/${record.membershipId}`} className="text-blue-400 hover:underline inline-flex items-center gap-1">
                            {record.membershipId} <ExternalLink className="w-3 h-3" />
                          </Link>
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-widest font-mono">Certificate Serial</p>
                        <p className="text-sm font-mono font-medium text-amber-300 mt-1">{record.certId}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-widest font-mono">Conferral Date</p>
                        <p className="text-sm text-slate-300 mt-1 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" /> {record.issueDate}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-widest font-mono">Validity</p>
                        <p className="text-sm text-slate-300 mt-1">{record.validThrough}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Signatories */}
                <Card className="border-slate-800 bg-slate-900/60 backdrop-blur-xl">
                  <CardHeader className="pb-3 border-b border-slate-800/80">
                    <CardTitle className="text-sm uppercase tracking-wider text-slate-400 font-mono">
                      Authorized Executive Signatories
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {record.signatories.map((sig, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/40">
                          <p className="text-sm font-medium text-white">{sig.name}</p>
                          <p className="text-xs text-amber-400/80 font-mono mt-0.5">
                            {sig.designation} ({sig.designationBn})
                          </p>
                          <span className="inline-block mt-2 text-[10px] uppercase font-mono tracking-wider text-emerald-400">
                            Digital Signature Verified
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Col: Seal, Org & Cryptography */}
              <div className="space-y-6">
                {/* Issuing Authority */}
                <Card className="border-slate-800 bg-slate-900/60 backdrop-blur-xl">
                  <CardHeader className="pb-3 border-b border-slate-800/80">
                    <CardTitle className="text-xs uppercase tracking-wider text-slate-400 font-mono flex items-center gap-1.5">
                      <Building className="w-4 h-4 text-blue-400" /> Issuing Authority
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-3">
                    <div>
                      <p className="text-sm font-medium text-white">{record.issuerOrg}</p>
                      <p className="text-xs text-slate-400 font-bangla mt-0.5">{record.issuerOrgBn}</p>
                    </div>
                    <div className="pt-3 border-t border-slate-800">
                      <span className="text-[11px] text-slate-500 font-mono block">Registered Institutional Body</span>
                      <span className="text-xs text-slate-400">Govt. Registration Act XXI of 1860</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Cryptographic Seal */}
                <Card className="border-slate-800 bg-slate-900/60 backdrop-blur-xl">
                  <CardHeader className="pb-3 border-b border-slate-800/80">
                    <CardTitle className="text-xs uppercase tracking-wider text-slate-400 font-mono flex items-center gap-1.5">
                      <Hash className="w-4 h-4 text-emerald-400" /> Tamper-Proof Seal
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-3">
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                      <p className="text-[10px] uppercase text-slate-500 font-mono tracking-wider mb-1">
                        SHA-256 Digest
                      </p>
                      <p className="text-[11px] font-mono text-slate-300 break-all leading-relaxed select-all">
                        {record.securityHash}
                      </p>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-normal">
                      This certificate hash is sealed in the immutable organization ledger. Any alteration of recipient, date, or credentials invalidates this seal.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <AlertCircle className="w-16 h-16 text-rose-500 mx-auto mb-4" />
            <h2 className="text-2xl font-display font-bold text-white">Certificate Not Found</h2>
            <p className="text-slate-400 mt-2">
              No official certificate matching record ID #{certId} could be found.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 px-6 text-center text-xs text-muted-foreground font-mono">
        Official Verification Engine · Secured with SHA-256 Ledger · Road Safety Movement
      </footer>
    </div>
  );
}
