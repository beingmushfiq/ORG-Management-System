import React, { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Clock,
  QrCode,
} from "lucide-react";
import { Badge, Button, Card, CardContent, CardHeader, CardTitle, PageHeader } from "@org/ui";

interface EventItem {
  id: string;
  title: string;
  titleBn?: string;
  venue: string;
  date: string;
  time: string;
  registered: boolean;
  type: string;
  status: "UPCOMING" | "PAST" | "LIVE";
}

const INITIAL_EVENTS: EventItem[] = [
  {
    id: "evt-1",
    title: "8th National Safe Road Youth Summit & Blackspot Audit 2026",
    titleBn: "৮ম জাতীয় নিরাপদ সড়ক যুব সম্মেলন ও ব্ল্যাকস্পট অডিট ২০২৬",
    venue: "Bangabandhu International Conference Center (BICC), Dhaka",
    date: "15 Oct 2026",
    time: "09:30 AM - 05:00 PM",
    registered: true,
    type: "National Assembly",
    status: "UPCOMING",
  },
  {
    id: "evt-2",
    title: "Highway Patrol & Golden Hour First Responder Simulation",
    titleBn: "হাইওয়ে পেট্রোল ও গোল্ডেন আওয়ার ফার্স্ট এইড উদ্ধার মহড়া",
    venue: "Dhaka-Mymensingh Highway Corridor (Gazipur Section)",
    date: "28 Oct 2026",
    time: "10:00 AM - 02:00 PM",
    registered: false,
    type: "Field Exercise",
    status: "UPCOMING",
  },
  {
    id: "evt-3",
    title: "Defensive Driving Instructor Certification Cohort 4",
    titleBn: "ডিফেন্সিভ ড্রাইভিং প্রশিক্ষক সনদ প্রদান কর্মশালা",
    venue: "National Secretariat Auditorium, Farmgate, Dhaka",
    date: "12 Sep 2026",
    time: "03:00 PM - 07:00 PM",
    registered: true,
    type: "CPD Training",
    status: "PAST",
  },
];

export default function MemberEventsPage() {
  const [events, setEvents] = useState<EventItem[]>(INITIAL_EVENTS);
  const [selectedPass, setSelectedPass] = useState<EventItem | null>(null);

  const toggleRsvp = (id: string) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, registered: !e.registered } : e))
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Events & Movement Programs"
        titleBn="ইভেন্ট, কর্মশালা ও কর্মসূচি"
        description="Participate in national road safety summits, blackspot audit field missions, and youth volunteer rallies."
        badge={
          <Badge variant="outline" className="text-xs font-mono text-emerald-600 border-emerald-500/30 bg-emerald-500/10">
            Participation Track
          </Badge>
        }
        actions={
          <Link href="/portal/events/checkin">
            <Button variant="outline" size="sm" leftIcon={<QrCode className="h-3.5 w-3.5" />}>
              Steward QR Scanner
            </Button>
          </Link>
        }
      />

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {events.map((event) => (
          <Card key={event.id} className="flex flex-col justify-between hover:border-emerald-500/40 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground uppercase font-semibold">
                  {event.type}
                </span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                    event.status === "UPCOMING"
                      ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {event.status}
                </span>
              </div>
              <CardTitle className="text-base font-bold text-foreground pt-1 leading-snug">
                {event.title}
              </CardTitle>
              {event.titleBn && (
                <p className="text-xs text-muted-foreground font-bangla">{event.titleBn}</p>
              )}
            </CardHeader>

            <CardContent className="space-y-4 pt-0">
              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span className="text-foreground font-medium">{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                  <span className="line-clamp-2 leading-relaxed">{event.venue}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-border flex items-center justify-between gap-2">
                {event.registered ? (
                  <div className="flex items-center gap-2 w-full">
                    <button
                      type="button"
                      onClick={() => setSelectedPass(event)}
                      className="flex-1 py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                    >
                      <QrCode className="h-3.5 w-3.5" />
                      <span>Digital Pass</span>
                    </button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleRsvp(event.id)}
                      className="text-xs"
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full bg-[#164e32] hover:bg-[#113d27] text-white"
                    onClick={() => toggleRsvp(event.id)}
                  >
                    Confirm RSVP & Gate Pass
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Digital Gate Pass Modal */}
      {selectedPass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-2xl text-center space-y-4 text-card-foreground">
            <div className="space-y-1">
              <Badge variant="outline" className="text-[10px] font-mono border-emerald-500 text-emerald-600">
                Official Gate Access Pass
              </Badge>
              <h3 className="font-bold text-sm text-foreground pt-1">{selectedPass.title}</h3>
              <p className="text-xs text-muted-foreground">{selectedPass.venue}</p>
            </div>

            <div className="p-4 rounded-xl bg-white text-slate-900 border border-slate-200 inline-block shadow-inner">
              <div className="w-40 h-40 bg-slate-900 mx-auto rounded-lg flex items-center justify-center p-3 text-white">
                <QrCode className="w-32 h-32 text-white" />
              </div>
              <p className="text-[11px] font-mono font-bold mt-2 text-slate-700">
                PASS: RSM-EVT-2026-0819
              </p>
            </div>

            <div className="text-xs space-y-1">
              <p className="font-semibold text-foreground">Attendee: Tanvir Rahman (ID: 18-23)</p>
              <p className="text-[11px] text-muted-foreground">Present at gate terminal for instant QR scan</p>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => setSelectedPass(null)}
            >
              Close Gate Pass
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
