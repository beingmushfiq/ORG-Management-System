import React, { useState } from "react";
import {
  Clock,
  MapPin,
  Users,
  ShieldCheck,
} from "lucide-react";
import { Badge, Button, Card, CardContent, PageHeader } from "@org/ui";

interface MeetingItem {
  id: string;
  meetingNumber: string;
  title: string;
  titleBn: string;
  date: string;
  time: string;
  venue: string;
  type: string;
  status: "SCHEDULED" | "CONCLUDED" | "MINUTES_RATIFIED";
  quorumTarget: number;
  quorumPresent: number;
  agendaItems: string[];
}

const MEETINGS: MeetingItem[] = [
  {
    id: "mtg-2026-09",
    meetingNumber: "RSM-SEC-2026-09",
    title: "14th National Executive Council Quarterly Review & Budget Ratification",
    titleBn: "১৪তম জাতীয় কার্যনির্বাহী ত্রৈমাসিক পর্যালোচনা ও বাজেট অনুমোদন সভা",
    date: "28 September 2026",
    time: "06:30 PM - 09:00 PM",
    venue: "Council Chamber, Farmgate Secretariat & Hybrid Zoom Room",
    type: "National Council",
    status: "SCHEDULED",
    quorumTarget: 21,
    quorumPresent: 18,
    agendaItems: [
      "Review of 420 Blackspot Elimination Fund Allocations",
      "Dhaka-Mymensingh Branch Restructuring and New Unit Charters",
      "Ratification of 2026 Youth Brigade Training Protocols",
      "Review of Q3 Audited Financial Statement & Paisa Ledger",
    ],
  },
  {
    id: "mtg-2026-08",
    meetingNumber: "RSM-SEC-2026-08",
    title: "Special General Assembly on Road Transport Act Implementation Audit",
    titleBn: "সড়ক পরিবহন আইন বাস্তবায়ন নিরীক্ষা বিষয়ক বিশেষ সাধারণ অধিবেশন",
    date: "14 August 2026",
    time: "04:00 PM - 08:00 PM",
    venue: "National Press Club Auditorium, Dhaka",
    type: "General Assembly",
    status: "MINUTES_RATIFIED",
    quorumTarget: 50,
    quorumPresent: 74,
    agendaItems: [
      "Presentation of 64-District Crash Telemetry Audit",
      "Adoption of Resolution No. RSM-RES-2026-042 (Pedestrian Charter)",
      "Approval of 12 New Campus Chapter Conveners",
    ],
  },
];

export default function MemberMeetingsPage() {
  const [selectedMeeting, setSelectedMeeting] = useState<MeetingItem | null>(null);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Statutory Meetings & Council Chambers"
        titleBn="সংবিধিবদ্ধ সভা, সাধারণ অধিবেশন ও রেজোলিউশন"
        description="Formal governance sessions, constitutional agendas, quorum calculations, and numbered statutory resolutions."
        badge={
          <Badge variant="outline" className="text-xs font-mono text-emerald-600 border-emerald-500/30 bg-emerald-500/10">
            Governance Docket
          </Badge>
        }
      />

      {/* Meeting Cards List */}
      <div className="space-y-4">
        {MEETINGS.map((meeting) => (
          <Card key={meeting.id} className="hover:border-emerald-500/40 transition-colors">
            <CardContent className="p-5 sm:p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-foreground bg-muted px-2 py-0.5 rounded">
                    {meeting.meetingNumber}
                  </span>
                  <span className="text-[10px] font-mono uppercase text-muted-foreground">
                    {meeting.type}
                  </span>
                </div>

                <Badge
                  variant={meeting.status === "SCHEDULED" ? "warning" : "success"}
                  className="text-xs font-mono w-fit"
                >
                  {meeting.status}
                </Badge>
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-bold text-foreground">{meeting.title}</h3>
                <p className="text-xs text-muted-foreground font-bangla">{meeting.titleBn}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-muted-foreground pt-1">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary shrink-0" />
                  <span>
                    {meeting.date} ({meeting.time})
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{meeting.venue}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary shrink-0" />
                  <span>
                    Quorum: {meeting.quorumPresent}/{meeting.quorumTarget} Confirmed
                  </span>
                </div>
              </div>

              {/* Agenda Highlights */}
              <div className="pt-2 border-t border-border space-y-1.5">
                <p className="text-xs font-mono font-bold text-foreground uppercase">
                  Key Agenda Items:
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-1.5 text-xs text-muted-foreground">
                  {meeting.agendaItems.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-primary font-bold">›</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedMeeting(meeting)}
                  className="text-xs"
                >
                  Inspect Full Minutes & Resolution Docket
                </Button>

                {meeting.status === "SCHEDULED" && (
                  <Button
                    variant="primary"
                    size="sm"
                    className="bg-[#164e32] hover:bg-[#113d27] text-white text-xs"
                  >
                    Confirm Attendance
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Minutes Modal */}
      {selectedMeeting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-xl rounded-2xl border border-border bg-card p-6 shadow-2xl space-y-4 text-card-foreground">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div>
                <h3 className="text-base font-bold text-foreground">
                  Meeting Docket: {selectedMeeting.meetingNumber}
                </h3>
                <p className="text-xs text-muted-foreground">{selectedMeeting.title}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedMeeting(null)}
              >
                Close
              </Button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-muted/60 border border-border space-y-1">
                <div className="font-semibold text-foreground flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  <span>Statutory Quorum Standard Satisfied</span>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Constitutionally ratified with {selectedMeeting.quorumPresent} active office-bearers present out of required {selectedMeeting.quorumTarget}.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-foreground uppercase font-mono text-[11px]">
                  Adopted Numbered Resolutions:
                </h4>
                <div className="p-3 rounded-lg border border-border bg-background space-y-1.5">
                  <p className="font-mono font-bold text-foreground">
                    Resolution No. RSM-RES-2026-042
                  </p>
                  <p className="text-muted-foreground leading-relaxed font-bangla text-[11px]">
                    "সর্বসম্মতিক্রমে সিদ্ধান্ত গৃহীত হইল যে, ঢাকা-চট্টগ্রাম মহাসড়কের সকল অবৈধ পার্কিং ও বিপজ্জনক ব্ল্যাকস্পট নিরসনে সড়ক ও জনপথ অধিদপ্তর বরাবর আনুষ্ঠানিক প্রতিবেদন দাখিল করা হইবে।"
                  </p>
                  <div className="text-[10px] font-mono text-emerald-600">
                    Ratified by President & General Secretary
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedMeeting(null)}
              >
                Dismiss
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
