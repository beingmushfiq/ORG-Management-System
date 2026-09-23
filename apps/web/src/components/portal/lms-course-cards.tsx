"use client";

import React from "react";
import Link from "next/link";
import { GraduationCap, ArrowRight } from "lucide-react";

export interface LmsCourse {
  id: string;
  title: string;
  description: string;
  progressPercent: number;
  category?: string;
  accentGradient: string;
  svgIcon: React.ReactNode;
}

const COURSES: LmsCourse[] = [
  {
    id: "leadership",
    title: "Road Safety Leadership",
    description: "Build leadership skills for safer roads and stronger communities.",
    progressPercent: 60,
    category: "Executive & Youth",
    accentGradient: "from-emerald-800 to-emerald-950",
    svgIcon: (
      <svg className="w-12 h-12 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    id: "defensive-driving",
    title: "Defensive Driving",
    description: "Safe driving techniques for everyday and professional drivers.",
    progressPercent: 40,
    category: "Technical Protocol",
    accentGradient: "from-blue-900 to-slate-900",
    svgIcon: (
      <svg className="w-12 h-12 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <circle cx="12" cy="12" r="9" strokeWidth={1.5} />
        <circle cx="12" cy="12" r="3" strokeWidth={1.5} />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v6m0 6v6M3 12h6m6 0h6" />
      </svg>
    ),
  },
  {
    id: "policy-law",
    title: "Road Safety Policy & Law",
    description: "Understand laws, policies and advocacy for safer road systems.",
    progressPercent: 20,
    category: "Statutory Law",
    accentGradient: "from-amber-900 to-slate-900",
    svgIcon: (
      <svg className="w-12 h-12 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
  },
];

export function LmsCourseCards() {
  return (
    <div className="w-full rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-4">
      {/* Panel Header */}
      <div className="flex items-center justify-between pb-2 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-foreground">
              Learning Management System
            </h2>
            <p className="text-[11px] text-muted-foreground font-bangla">
              সড়ক নিরাপত্তা ও প্রাতিষ্ঠানিক প্রশিক্ষণ মডিউল
            </p>
          </div>
        </div>

        <Link
          href="/portal/lms"
          className="text-xs text-primary font-medium hover:underline flex items-center gap-1"
        >
          View All Courses <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {COURSES.map((course) => (
          <div
            key={course.id}
            className="flex flex-col justify-between rounded-xl border border-border bg-background/50 hover:bg-background hover:border-emerald-500/40 transition-all shadow-sm overflow-hidden group"
          >
            {/* Visual Thumbnail */}
            <div
              className={`h-28 w-full bg-gradient-to-br ${course.accentGradient} relative flex items-center justify-center overflow-hidden p-4`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-black/30" />
              <div className="transform group-hover:scale-110 transition-transform duration-300">
                {course.svgIcon}
              </div>
              <span className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-mono bg-black/50 text-white/90 backdrop-blur-sm border border-white/10">
                {course.category}
              </span>
            </div>

            {/* Content Details */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-1">
                <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {course.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {course.description}
                </p>
              </div>

              {/* Progress Section */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground font-medium">Progress</span>
                  <span className="font-mono font-bold text-foreground">
                    {course.progressPercent}%
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-emerald-600 transition-all duration-500"
                    style={{ width: `${course.progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Action Button */}
              <Link href="/portal/lms" className="w-full pt-1">
                <button
                  type="button"
                  className="w-full py-2 px-3 rounded-lg bg-[#164e32] hover:bg-[#113d27] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm group-hover:shadow"
                >
                  <span>Continue Learning</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
