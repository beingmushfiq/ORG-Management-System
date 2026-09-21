"use client";

import React, { useState } from "react";
import {
  Shield,
  BookOpen,
  Heart,
  Globe,
  Award,
  Mail,
  Scale,
  Building,
} from "lucide-react";
import { Badge, Card, CardContent } from "@org/ui";

interface StandingCommittee {
  id: string;
  nameEn: string;
  nameBn: string;
  convener: string;
  convenerTitle: string;
  memberCount: number;
  mandate: string;
  mandateBn: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  contactEmail: string;
}

const COMMITTEES: StandingCommittee[] = [
  {
    id: "ethics",
    nameEn: "Ethics, Disciplinary & Professional Conduct",
    nameBn: "নীতিমালা, শৃঙ্খলা ও পেশাগত মান নিয়ন্ত্রণ পরিষদ",
    convener: "Prof. Dr. M. R. Chowdhury",
    convenerTitle: "Chair, Senior Fellow & Retired Dean",
    memberCount: 9,
    mandate: "Investigating medical disputes, ethical complaints, and enforcing BMDC professional codes of conduct.",
    mandateBn: "চিকিৎসক আচরণবিধি সুরক্ষা, নৈতিক মান নিয়ন্ত্রণ এবং পেশাগত বিরোধ নিষ্পত্তি সংক্রান্ত স্থায়ী সেল।",
    icon: Scale,
    accentColor: "from-blue-600 to-indigo-600",
    contactEmail: "ethics@bma-org.bd",
  },
  {
    id: "cpd",
    nameEn: "Continuous Professional Development (CPD) Board",
    nameBn: "উচ্চতর চিকিৎসা শিক্ষা ও সিপিডি স্বীকৃতি বোর্ড",
    convener: "Prof. Dr. Salma Sultana",
    convenerTitle: "Dean, Faculty of Medicine, BSMMU",
    memberCount: 12,
    mandate: "Accrediting symposia, clinical workshops, simulation courses, and issuing BMDC certified credit points.",
    mandateBn: "সম্মেলন, সিম্পোজিয়াম ও বিশেষ ক্লিনিক্যাল প্রশিক্ষণের মান নিশ্চিতকরণ ও সিপিডি পয়েন্ট অনুমোদন।",
    icon: Award,
    accentColor: "from-amber-600 to-yellow-600",
    contactEmail: "cpd@bma-org.bd",
  },
  {
    id: "journal",
    nameEn: "Medical Journal & Publications Directorate",
    nameBn: "বাংলাদেশ মেডিকেল জার্নাল ও প্রকাশনা পর্ষদ",
    convener: "Prof. Dr. A. K. Azad",
    convenerTitle: "Editor-in-Chief, Bangladesh Medical Journal",
    memberCount: 15,
    mandate: "Publishing the peer-reviewed quarterly indexed medical journal, research monographs, and clinical guidelines.",
    mandateBn: "আন্তর্জাতিক সূচকভুক্ত গবেষণাধর্মী জার্নাল ও ক্লিনিক্যাল প্রটোকল নিয়মিত প্রকাশনা।",
    icon: BookOpen,
    accentColor: "from-purple-600 to-pink-600",
    contactEmail: "journal@bma-org.bd",
  },
  {
    id: "relief",
    nameEn: "Disaster Relief & Humanitarian Emergency Taskforce",
    nameBn: "দুর্যোগ ব্যবস্থাপনা, বন্যা ত্রাণ ও ভ্রাম্যমাণ স্বাস্থ্যসেবা সেল",
    convener: "Dr. Shahina Sultana",
    convenerTitle: "Secretary of Social Welfare & Relief",
    memberCount: 24,
    mandate: "Rapid mobilization of mobile physician flotillas, water purification, and emergency anti-venoms during natural crises.",
    mandateBn: "আকস্মিক বন্যা, ঘূর্ণিঝড় ও জাতীয় দুর্যোগে বিনামূল্যে ওষুধ এবং ফিল্ড ক্লিনিক স্থাপন।",
    icon: Heart,
    accentColor: "from-rose-600 to-red-600",
    contactEmail: "relief@bma-org.bd",
  },
  {
    id: "welfare",
    nameEn: "Benevolent Trust & Member Family Pension Board",
    nameBn: "কল্যাণ ট্রাস্ট ও সদস্য পরিবার পুনর্বাসন বোর্ড",
    convener: "Dr. Ahmed Reza",
    convenerTitle: "Honorary Treasurer & Trustee",
    memberCount: 7,
    mandate: "Disbursing monthly family subsistence pensions and child educational scholarships for deceased members' dependents.",
    mandateBn: "অকালে প্রয়াত সহকর্মীদের পরিবার ও সন্তানদের নিয়মিত কল্যাণ অনুদান এবং শিক্ষা বৃত্তি।",
    icon: Shield,
    accentColor: "from-emerald-600 to-teal-600",
    contactEmail: "benevolent@bma-org.bd",
  },
  {
    id: "international",
    nameEn: "International Affairs & Foreign Fellowship Accreditation",
    nameBn: "আন্তর্জাতিক সম্পর্ক ও বৈদেশিক ফেলোশিপ সমন্বয় সেল",
    convener: "Prof. Dr. Zahid Hasan",
    convenerTitle: "Liaison Officer to Commonwealth Medical Association",
    memberCount: 8,
    mandate: "Coordinating with WHO, WMA, and foreign Royal Colleges for postgraduate surgical observer-ships and global representation.",
    mandateBn: "বিশ্ব স্বাস্থ্য সংস্থা, কমনওয়েলথ মেডিকেল এসোসিয়েশন ও বিদেশি রয়্যাল কলেজের সাথে যোগাযোগ রক্ষা।",
    icon: Globe,
    accentColor: "from-cyan-600 to-blue-600",
    contactEmail: "international@bma-org.bd",
  },
];

export function InteractiveOrganogram() {
  const [selectedCommittee, setSelectedCommittee] = useState<StandingCommittee>(COMMITTEES[0]!);

  return (
    <div className="w-full bg-slate-950/80 border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden relative">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-2">
            <Building className="w-3.5 h-3.5" />
            Institutional Governance Hierarchy
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-white tracking-tight">
            Central Executive Council & Key Standing Committees
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            Click on any standing council to examine terms of reference, appointed chairpersons, member quotas, and direct secretariat contacts.
          </p>
        </div>

        <div className="text-xs text-slate-400 font-mono">
          Charter: Constitution Articles 18–24
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Committees Selector */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {COMMITTEES.map((com) => {
            const Icon = com.icon;
            const isSelected = selectedCommittee.id === com.id;

            return (
              <button
                key={com.id}
                onClick={() => setSelectedCommittee(com)}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 flex items-start gap-3.5 ${
                  isSelected
                    ? "bg-slate-900 border-amber-400/80 shadow-lg shadow-amber-500/10 scale-[1.02]"
                    : "bg-slate-950/70 border-white/10 hover:border-white/20 hover:bg-slate-900/40"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${com.accentColor} flex items-center justify-center text-white shrink-0 shadow-md`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-white leading-snug truncate">
                    {com.nameEn}
                  </div>
                  <div className="text-[11px] text-slate-400 font-bangla mt-0.5 truncate">
                    {com.nameBn}
                  </div>
                  <div className="text-[10px] text-amber-400 font-medium mt-1">
                    {com.memberCount} Appointed Fellows
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Active Committee Dossier */}
        <div className="lg:col-span-5">
          <Card className="bg-slate-900/90 border border-amber-500/30 rounded-2xl shadow-xl overflow-hidden sticky top-24">
            <CardContent className="p-6 space-y-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <Badge className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold mb-1">
                    STATUTORY BOARD
                  </Badge>
                  <h4 className="text-xl font-bold font-serif text-white leading-snug">
                    {selectedCommittee.nameEn}
                  </h4>
                  <div className="text-xs text-slate-400 font-bangla mt-0.5">
                    {selectedCommittee.nameBn}
                  </div>
                </div>

                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center font-black text-slate-950 text-sm shadow-lg shrink-0">
                  {selectedCommittee.memberCount}
                </div>
              </div>

              {/* Convener / Chair Box */}
              <div className="bg-slate-950 p-4 rounded-xl border border-white/5 space-y-1">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                  Appointed Convener & Chair
                </div>
                <div className="text-sm font-bold text-white font-serif">
                  {selectedCommittee.convener}
                </div>
                <div className="text-xs text-amber-400">
                  {selectedCommittee.convenerTitle}
                </div>
              </div>

              {/* Mandate Description */}
              <div className="space-y-2 text-xs">
                <div className="text-slate-300 leading-relaxed">
                  {selectedCommittee.mandate}
                </div>
                <div className="text-slate-400 font-bangla leading-relaxed border-t border-white/5 pt-2">
                  {selectedCommittee.mandateBn}
                </div>
              </div>

              {/* Contact Email Desk */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-400">
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  <span className="font-mono text-slate-300">{selectedCommittee.contactEmail}</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Active
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
