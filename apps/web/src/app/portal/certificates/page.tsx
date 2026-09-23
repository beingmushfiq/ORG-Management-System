"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Printer,
  QrCode,
  ExternalLink,
} from "lucide-react";
import { Badge, Button, Card, CardContent, CardHeader, CardTitle, PageHeader } from "@org/ui";
import { OrgLogo } from "@/components/brand/org-logo";

interface CertificateItem {
  id: string;
  certNumber: string;
  title: string;
  titleBn: string;
  issueDate: string;
  type: "MEMBERSHIP" | "TRAINING" | "COMMENDATION";
  securityHash: string;
}

const CERTS: CertificateItem[] = [
  {
    id: "cert-mem-18-23",
    certNumber: "RSM-MBR-2018-0023",
    title: "Certificate of Active Membership & Good Standing",
    titleBn: "সক্রিয় সদস্যপদ ও নিষ্ঠা প্রত্যয়নপত্র",
    issueDate: "20 June 2018",
    type: "MEMBERSHIP",
    securityHash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  },
  {
    id: "cert-def-2026",
    certNumber: "RSM-ACAD-2026-0814",
    title: "Defensive Driving & Emergency Golden Hour First Aid",
    titleBn: "ডিফেন্সিভ ড্রাইভিং ও গোল্ডেন আওয়ার জরুরি চিকিৎসা প্রশিক্ষণ",
    issueDate: "12 August 2026",
    type: "TRAINING",
    securityHash: "8f2d1e0b5c3a4f6d8e9a2b1c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e",
  },
  {
    id: "cert-blackspot-2025",
    certNumber: "RSM-AUD-2025-0419",
    title: "Highway Blackspot Forensic Surveyor & Auditor Seal",
    titleBn: "মহাসড়ক ব্ল্যাকস্পট অডিট ও জিও-ম্যাপিং বিশেষজ্ঞ সনদ",
    issueDate: "14 November 2025",
    type: "COMMENDATION",
    securityHash: "2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b",
  },
];

export default function CertificatesPage() {
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Certificates & Credentials Vault"
        titleBn="সনদপত্র, প্রশিক্ষণ প্রত্যয়ন ও ডিজিটাল আইডি"
        description="Tamper-proof verifiable credentials issued by the National Executive Secretariat with SHA-256 cryptographic seal."
        badge={
          <Badge variant="outline" className="text-xs font-mono text-emerald-600 border-emerald-500/30 bg-emerald-500/10">
            Cryptographic Vault
          </Badge>
        }
      />

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {CERTS.map((cert) => (
          <Card key={cert.id} className="flex flex-col justify-between hover:border-emerald-500/40 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground uppercase font-semibold">
                  {cert.type}
                </span>
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
                  <ShieldCheck className="h-3.5 w-3.5" /> Verified
                </span>
              </div>
              <CardTitle className="text-base font-bold text-foreground pt-1 leading-snug">
                {cert.title}
              </CardTitle>
              <p className="text-xs text-muted-foreground font-bangla">{cert.titleBn}</p>
            </CardHeader>

            <CardContent className="space-y-4 pt-0">
              <div className="p-3 rounded-xl bg-muted/50 border border-border text-xs space-y-1 font-mono">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cert ID:</span>
                  <span className="font-bold text-foreground">{cert.certNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Issued:</span>
                  <span className="text-foreground">{cert.issueDate}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1 border-t border-border">
                <Button
                  variant="primary"
                  size="sm"
                  className="flex-1 bg-[#164e32] hover:bg-[#113d27] text-white text-xs"
                  onClick={() => setSelectedCert(cert)}
                >
                  View Certificate
                </Button>

                <Link href={`/verify/cert/${cert.id}`} target="_blank">
                  <Button variant="outline" size="sm" className="text-xs" title="Public Verification Link">
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Official Certificate Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl rounded-2xl border-2 border-emerald-600/40 bg-card p-6 sm:p-8 shadow-2xl space-y-6 text-card-foreground">
            {/* Letterhead */}
            <div className="flex items-start justify-between border-b border-border pb-4">
              <OrgLogo size="md" />
              <div className="text-right">
                <p className="text-[10px] font-mono text-muted-foreground">Official Credential No.</p>
                <p className="text-xs font-mono font-bold text-foreground">
                  {selectedCert.certNumber}
                </p>
                <p className="text-[10px] text-emerald-600 font-semibold">Status: Active & Valid</p>
              </div>
            </div>

            {/* Certificate Body */}
            <div className="text-center space-y-3 py-4">
              <Badge variant="outline" className="text-xs font-mono uppercase text-emerald-700 dark:text-emerald-400 border-emerald-500/30">
                Official Certification of Achievement
              </Badge>
              <h2 className="text-2xl font-serif font-bold text-foreground">
                {selectedCert.title}
              </h2>
              <p className="text-sm text-muted-foreground font-bangla">{selectedCert.titleBn}</p>
              <div className="pt-2 text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
                This is to officially certify that <strong className="text-foreground">Tanvir Rahman</strong> (Member ID: 18-23) has fulfilled all statutory training, ethical commitment, and volunteer operational standards of the Road Safety Movement.
              </div>
            </div>

            {/* Cryptographic Seal & Signatures */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border items-center">
              <div className="flex items-center gap-3 text-[10px] font-mono text-muted-foreground">
                <QrCode className="h-12 w-12 text-muted-foreground shrink-0" />
                <div className="overflow-hidden">
                  <span className="block font-bold text-foreground">Cryptographic SHA-256:</span>
                  <span className="truncate block opacity-80">{selectedCert.securityHash}</span>
                </div>
              </div>

              <div className="text-right space-y-0.5">
                <p className="text-xs font-serif font-bold text-foreground">President & General Secretary</p>
                <p className="text-[10px] text-muted-foreground font-bangla">জাতীয় কার্যনির্বাহী পরিষদ, নিরাপদ সড়ক আন্দোলন</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2">
              <Button variant="outline" size="sm" onClick={handlePrint} leftIcon={<Printer className="h-3.5 w-3.5" />}>
                Print Letterhead
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="bg-[#164e32] hover:bg-[#113d27] text-white"
                onClick={() => setSelectedCert(null)}
              >
                Close Viewer
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
