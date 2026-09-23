"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  Plus,
  Camera,
  MapPin,
} from "lucide-react";
import { Badge, Button, Card, CardContent, PageHeader } from "@org/ui";

interface TaskItem {
  id: string;
  title: string;
  titleBn: string;
  assignedBranch: string;
  points: number;
  status: "COMPLETED" | "IN_PROGRESS" | "PENDING_REVIEW";
  dueDate: string;
}

const INITIAL_TASKS: TaskItem[] = [
  {
    id: "task-1",
    title: "Farmgate Intersection Pedestrian Zebra Repaint & Barrier Audit",
    titleBn: "ফার্মগেট মোড় পথচারী ক্রসিং ও জেব্রা ক্রসিং দৃশ্যমানতা অডিট",
    assignedBranch: "Dhaka Central Chapter",
    points: 15,
    status: "IN_PROGRESS",
    dueDate: "30 Sep 2026",
  },
  {
    id: "task-2",
    title: "School Zone Speed Calming Signboard Inspection (10 Schools)",
    titleBn: "১০টি শিক্ষা প্রতিষ্ঠানের সম্মুখে গতিসীমা নির্দেশক সাইনবোর্ড সমীক্ষা",
    assignedBranch: "Gazipur Unit",
    points: 20,
    status: "PENDING_REVIEW",
    dueDate: "25 Sep 2026",
  },
  {
    id: "task-3",
    title: "Highway Crash Telemetry Digital Log Upload",
    titleBn: "মহাসড়ক দুর্ঘটনা সংক্রান্ত প্রাথমিক ডাটা আপলোড",
    assignedBranch: "Mymensingh Branch",
    points: 10,
    status: "COMPLETED",
    dueDate: "10 Sep 2026",
  },
];

export default function MemberTasksPage() {
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportTitle, setReportTitle] = useState("");
  const [reportLocation, setReportLocation] = useState("");
  const [reportDescription, setReportDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTasks((prev) => [
      {
        id: `task-${Date.now()}`,
        title: reportTitle,
        titleBn: reportTitle,
        assignedBranch: "Dhaka Central Chapter",
        points: 15,
        status: "PENDING_REVIEW",
        dueDate: "30 Oct 2026",
      },
      ...prev,
    ]);
    setTimeout(() => {
      setSubmitted(false);
      setReportModalOpen(false);
      setReportTitle("");
      setReportLocation("");
      setReportDescription("");
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Field Missions & Activity Reports"
        titleBn="মাঠপর্যায়ের দায়িত্ব, ব্ল্যাকস্পট রিপোর্ট ও কার্যক্রম"
        description="Execute assigned road safety volunteer tasks, document road hazards, and record activity points for tier progression."
        badge={
          <Badge variant="outline" className="text-xs font-mono text-emerald-600 border-emerald-500/30 bg-emerald-500/10">
            Field Operations
          </Badge>
        }
        actions={
          <Button
            variant="primary"
            size="sm"
            className="bg-[#164e32] hover:bg-[#113d27] text-white"
            onClick={() => setReportModalOpen(true)}
            leftIcon={<Plus className="h-3.5 w-3.5" />}
          >
            Submit Field Report
          </Button>
        }
      />

      {/* Tasks List */}
      <div className="space-y-4">
        {tasks.map((task) => (
          <Card key={task.id} className="hover:border-emerald-500/40 transition-colors">
            <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground uppercase font-semibold">
                    {task.assignedBranch}
                  </span>
                  <Badge
                    variant={
                      task.status === "COMPLETED"
                        ? "success"
                        : task.status === "IN_PROGRESS"
                        ? "warning"
                        : "outline"
                    }
                    className="text-[10px] font-mono"
                  >
                    {task.status}
                  </Badge>
                </div>
                <h3 className="font-bold text-base text-foreground">{task.title}</h3>
                <p className="text-xs text-muted-foreground font-bangla">{task.titleBn}</p>
                <div className="text-xs text-muted-foreground pt-1 flex items-center gap-4 font-mono">
                  <span>Due: {task.dueDate}</span>
                  <span className="text-emerald-600 font-bold">+{task.points} Activity Points</span>
                </div>
              </div>

              <div className="shrink-0">
                {task.status === "COMPLETED" ? (
                  <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Verified</span>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => setReportModalOpen(true)}
                  >
                    Upload Proof & Report
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Field Report Modal */}
      {reportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-2xl space-y-4 text-card-foreground">
            <h3 className="text-base font-bold text-foreground">
              Submit Field Inspection & Volunteer Report
            </h3>

            {submitted ? (
              <div className="py-6 text-center space-y-2">
                <CheckCircle2 className="h-10 w-10 text-emerald-500 mx-auto" />
                <h4 className="font-bold text-foreground">Report Dispatched!</h4>
                <p className="text-xs text-muted-foreground font-bangla">
                  আপনার মাঠপর্যায়ের কাজের বিবরণ শাখা কার্যালয় ও কেন্দ্রীয় সার্ভারে লিপিবদ্ধ করা হয়েছে।
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReport} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase text-muted-foreground">
                    Mission / Task Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Gazipur Highway Zebra Crossing Audit"
                    value={reportTitle}
                    onChange={(e) => setReportTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase text-muted-foreground">
                    Exact Location / Coordinates
                  </label>
                  <div className="relative">
                    <MapPin className="h-4 w-4 absolute left-3 top-2.5 text-muted-foreground" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Joydebpur Chowrasta, 23.9982° N, 90.3742° E"
                      value={reportLocation}
                      onChange={(e) => setReportLocation(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-lg border border-input bg-background text-xs text-foreground focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase text-muted-foreground">
                    Findings & Action Taken
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Document vehicle speeds, pedestrian counts, barrier gaps, or enforcement challenges..."
                    value={reportDescription}
                    onChange={(e) => setReportDescription(e.target.value)}
                    className="w-full p-3 rounded-lg border border-input bg-background text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="p-3 rounded-lg border border-dashed border-border bg-muted/40 text-center space-y-1">
                  <Camera className="h-6 w-6 text-muted-foreground mx-auto" />
                  <p className="text-xs font-medium text-foreground">Attach Field Photographs</p>
                  <p className="text-[11px] text-muted-foreground">JPG, PNG up to 10MB each</p>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setReportModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    className="bg-[#164e32] hover:bg-[#113d27] text-white"
                  >
                    Submit Report
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
