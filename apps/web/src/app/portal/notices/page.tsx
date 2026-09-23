"use client";

import React, { useState } from "react";
import {
  Download,
  Calendar,
  Search,
} from "lucide-react";
import { Badge, Button, Card, CardContent, PageHeader } from "@org/ui";

interface NoticeItem {
  id: string;
  memoNumber: string;
  title: string;
  titleBn: string;
  date: string;
  category: string;
  isUrgent: boolean;
  content: string;
}

const NOTICES: NoticeItem[] = [
  {
    id: "not-2026-09",
    memoNumber: "RSM-CIR-2026-042",
    title: "Official Circular: 2026 Nationwide Blackspot Inspection Directive",
    titleBn: "সার্কুলার: দেশব্যাপী সড়ক ব্ল্যাকস্পট চিহ্নিতকরণ ও অডিট পরিচালনা সংক্রান্ত জরুরি নির্দেশনা",
    date: "18 September 2026",
    category: "Operational Directive",
    isUrgent: true,
    content: "All Divisional, District, and Upazila chapters are directed to conclude physical audits of highway hazardous curves and submit geo-tagged photographic evidence by October 15, 2026.",
  },
  {
    id: "not-2026-08",
    memoNumber: "RSM-CIR-2026-039",
    title: "Gazette Memo: Standard Operating Procedure for Road Crash First Responders",
    titleBn: "গেজেট সার্কুলার: সড়ক দুর্ঘটনায় প্রথম উদ্ধারকারী দলের আদর্শ পরিচালনা পদ্ধতি",
    date: "24 August 2026",
    category: "Statutory Protocol",
    isUrgent: false,
    content: "Published in accordance with Section 84 of the Road Transport Act 2018. Outlines golden hour medical intervention, vehicle evacuation, and police coordination protocols.",
  },
  {
    id: "not-2026-07",
    memoNumber: "RSM-CIR-2026-031",
    title: "Notice: Q3 Membership Dues Clearance & Tier Upgrade Review",
    titleBn: "বিজ্ঞপ্তি: ৩য় প্রান্তিকের মাসিক চাঁদা পরিশোধ ও সদস্যপদ পদোন্নতি আবেদন আহ্বান",
    date: "10 July 2026",
    category: "Treasury & Membership",
    isUrgent: false,
    content: "Associate Members completing 2 years of active service with zero unpaid dues are invited to submit their General Membership applications through the member portal.",
  },
];

export default function MemberNoticesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNotice, setSelectedNotice] = useState<NoticeItem | null>(null);

  const filteredNotices = NOTICES.filter(
    (n) =>
      n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.titleBn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.memoNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Official Notices & Gazette Vault"
        titleBn="সরকারি গেজেট, সার্কুলার ও অফিসিয়াল মেমো"
        description="Statutory circulars, movement directives, and emergency operational protocols issued by the National Secretariat."
        badge={
          <Badge variant="outline" className="text-xs font-mono text-emerald-600 border-emerald-500/30 bg-emerald-500/10">
            Gazette Vault
          </Badge>
        }
      />

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by memo number or keyword..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-4 py-2 rounded-xl border border-input bg-card text-xs text-foreground focus:outline-none focus:border-primary shadow-xs"
        />
      </div>

      {/* Notices List */}
      <div className="space-y-4">
        {filteredNotices.map((notice) => (
          <Card key={notice.id} className="hover:border-emerald-500/40 transition-colors">
            <CardContent className="p-5 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-foreground bg-muted px-2 py-0.5 rounded">
                    {notice.memoNumber}
                  </span>
                  <span className="text-[10px] font-mono uppercase text-muted-foreground">
                    {notice.category}
                  </span>
                  {notice.isUrgent && (
                    <Badge variant="destructive" className="text-[10px] font-mono">
                      URGENT
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{notice.date}</span>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-base text-foreground">{notice.title}</h3>
                <p className="text-xs text-muted-foreground font-bangla pt-0.5">{notice.titleBn}</p>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                {notice.content}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-border">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => setSelectedNotice(notice)}
                >
                  Read Full Gazette Directive
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-muted-foreground hover:text-foreground"
                  leftIcon={<Download className="h-3.5 w-3.5" />}
                >
                  Download PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Notice Viewer Modal */}
      {selectedNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-xl rounded-2xl border border-border bg-card p-6 sm:p-7 shadow-2xl space-y-4 text-card-foreground">
            <div className="border-b border-border pb-3 flex items-start justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-foreground bg-muted px-2 py-0.5 rounded">
                  {selectedNotice.memoNumber}
                </span>
                <h3 className="text-base font-bold text-foreground pt-1.5">
                  {selectedNotice.title}
                </h3>
                <p className="text-xs text-muted-foreground font-bangla">{selectedNotice.titleBn}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedNotice(null)}
              >
                Close
              </Button>
            </div>

            <div className="p-4 rounded-xl bg-background border border-border text-xs leading-relaxed space-y-3 font-sans">
              <p className="font-semibold text-foreground">Memo Directive Text:</p>
              <p className="text-muted-foreground leading-relaxed">{selectedNotice.content}</p>
              <p className="text-muted-foreground leading-relaxed font-bangla">
                উক্ত নির্দেশাবলী অনুসরণে ব্যর্থতার ক্ষেত্রে সংশ্লিষ্ট শাখা নেতৃত্বের ওপর সাংগঠনিক শৃঙ্খলাবিধি প্রযোজ্য হইবে।
              </p>
            </div>

            <div className="pt-2 flex justify-between items-center text-xs font-mono text-muted-foreground">
              <span>Dated: {selectedNotice.date}</span>
              <Button
                variant="primary"
                size="sm"
                className="bg-[#164e32] hover:bg-[#113d27] text-white"
                onClick={() => setSelectedNotice(null)}
              >
                Acknowledged
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
