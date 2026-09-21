"use client";

import React, { useState } from "react";
import {
  GraduationCap,
  Award,
  CheckCircle2,
  Clock,
  ArrowLeft,
  ExternalLink,
  BookOpen,
} from "lucide-react";
import { Button, Badge, Card, CardHeader, CardTitle, CardDescription, CardContent } from "@org/ui";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";

interface CourseLesson {
  id: string;
  title: string;
  durationMinutes: number;
  completed: boolean;
}

const INITIAL_LESSONS: CourseLesson[] = [
  { id: "les-1", title: "Road Transport Act 2018 & Legal Rights of Pedestrians", durationMinutes: 25, completed: true },
  { id: "les-2", title: "Emergency Crash Response, Golden Hour First Aid & Evacuation", durationMinutes: 30, completed: true },
  { id: "les-3", title: "Digital Evidence Capture, Dashcam Forensics & Blackspot Mapping", durationMinutes: 20, completed: false },
];

export default function LmsPortalPage() {
  const [lessons, setLessons] = useState<CourseLesson[]>(INITIAL_LESSONS);
  const [certificateClaimed, setCertificateClaimed] = useState(false);

  const completedCount = lessons.filter((l) => l.completed).length;
  const progressPercent = Math.round((completedCount / lessons.length) * 100);
  const isEligibleForCert = progressPercent === 100;

  const toggleLesson = (id: string) => {
    setLessons((prev) =>
      prev.map((l) => (l.id === id ? { ...l, completed: !l.completed } : l))
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-amber-500/20 selection:text-amber-500">
      {/* Header */}
      <header className="border-b border-border bg-background/70 backdrop-blur-xl px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Link
            href="/portal"
            className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 text-xs font-mono tracking-wider uppercase"
          >
            <ArrowLeft className="w-4 h-4" /> Portal
          </Link>
          <span className="text-border font-mono">|</span>
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-amber-500" />
            <span className="text-sm font-semibold tracking-wide uppercase text-foreground">
              Road Safety Academy & Volunteer Training Protocol
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle variant="pill" />
          <Badge variant="outline" className="border-amber-500/40 text-amber-600 dark:text-amber-400 bg-amber-500/10 font-mono text-xs">
            10 CPD Credits Track
          </Badge>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-5xl w-full mx-auto px-6 py-8 space-y-8">
        {/* Course Hero Banner */}
        <div className="rounded-3xl border border-border bg-card p-8 backdrop-blur-xl shadow-xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-amber-500/40 text-amber-600 dark:text-amber-300 bg-amber-500/10 text-xs">
                  Certified Training Program
                </Badge>
                <span className="text-xs font-mono text-muted-foreground">Course #RSM-ACAD-2026-08</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground">
                Defensive Driving, Road Transport Act 2018 & Crash Response
              </h1>
              <p className="text-sm text-muted-foreground font-bangla">
                ডিফেন্সিভ ড্রাইভিং, সড়ক পরিবহন আইন ২০১৮ ও জরুরি উদ্ধার ব্যবস্থাপনা
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-muted/50 border border-border shrink-0 text-right font-mono">
              <p className="text-[11px] uppercase text-muted-foreground">Credits Awarded</p>
              <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">10 CPD Points</p>
              <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">RSM Recognized</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-8 space-y-2">
            <div className="flex justify-between text-xs font-mono text-muted-foreground">
              <span>Course Progress: {completedCount} of {lessons.length} Modules Completed</span>
              <span className="text-amber-600 dark:text-amber-400 font-bold">{progressPercent}%</span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-amber-500 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Lessons List */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-500" />
            Curriculum & Learning Modules
          </h2>

          <div className="space-y-3">
            {lessons.map((lesson, idx) => (
              <div
                key={lesson.id}
                className="p-4 rounded-xl border border-border bg-card flex items-center justify-between hover:border-amber-500/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleLesson(lesson.id)}
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors border ${
                      lesson.completed
                        ? "bg-emerald-500 border-emerald-400 text-slate-950"
                        : "border-border bg-background text-muted-foreground hover:border-amber-400"
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {idx + 1}. {lesson.title}
                    </p>
                    <p className="text-xs text-muted-foreground font-mono flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" /> {lesson.durationMinutes} Minutes Lecture & Assessment
                    </p>
                  </div>
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  className="border-border text-xs text-foreground hover:bg-muted"
                  onClick={() => toggleLesson(lesson.id)}
                >
                  {lesson.completed ? "Review Lesson" : "Start Lesson"}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Certificate Claim Section */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              Cryptographic Road Safety Accreditation Certificate
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Complete all course modules to unlock your digitally signed institutional certificate.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {certificateClaimed ? (
              <div className="p-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-xs font-mono space-y-2">
                <div className="flex items-center gap-2 font-bold">
                  <CheckCircle2 className="w-4 h-4" /> Certificate Issued: CERT-2026-042
                </div>
                <p className="text-muted-foreground">
                  Your credential is sealed on the permanent ledger with SHA-256 seal 3cb3...fc6.
                </p>
                <div className="pt-2">
                  <Link
                    href="/verify/cert/CERT-2026-042"
                    className="text-amber-600 dark:text-amber-400 hover:underline inline-flex items-center gap-1 font-semibold"
                  >
                    View & Download Verified Certificate <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <p className="text-xs text-muted-foreground font-mono">
                  {isEligibleForCert
                    ? "✓ All lessons finished. You are eligible to claim this credential."
                    : "Complete all 3 lessons to generate your certificate."}
                </p>
                <Button
                  disabled={!isEligibleForCert}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold"
                  onClick={() => setCertificateClaimed(true)}
                >
                  <Award className="w-4 h-4 mr-2" />
                  Claim Accreditation Certificate
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
