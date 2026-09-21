"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Crown,
  CheckCircle2,
  Plus,
  AlertCircle,
  Scale,
} from "lucide-react";
import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  PageHeader,
  EmptyState,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@org/ui";
import { apiClient } from "@/lib/api-client";

export default function GovernanceCommandChamberPage() {
  const [meetings, setMeetings] = useState<any[]>([]);
  const [resolutions, setResolutions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal States
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [minutesModalOpen, setMinutesModalOpen] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<any | null>(null);

  // New Meeting Form
  const [newTitle, setNewTitle] = useState("");
  const [newTitleBn, setNewTitleBn] = useState("");
  const [newCategory, setNewCategory] = useState("EXECUTIVE_COMMITTEE");
  const [newScheduledAt, setNewScheduledAt] = useState("");
  const [newVenue, setNewVenue] = useState("");
  const [newAgenda, setNewAgenda] = useState("");

  // Minutes & Resolution Form
  const [quorumCount, setQuorumCount] = useState("18");
  const [totalEligible, setTotalEligible] = useState("25");
  const [minutesText, setMinutesText] = useState("");
  const [minutesTextBn, setMinutesTextBn] = useState("");
  const [resTitle, setResTitle] = useState("");
  const [resDecision, setResDecision] = useState("");
  const [resDecisionBn, setResDecisionBn] = useState("");
  const [isUnanimous, setIsUnanimous] = useState(true);

  const [actionLoading, setActionLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const loadGovernanceData = useCallback(async () => {
    setLoading(true);
    try {
      const [mList, rList] = await Promise.allSettled([
        apiClient.governance.listMeetings(),
        apiClient.governance.listResolutions(),
      ]);

      if (mList.status === "fulfilled") setMeetings(mList.value || []);
      if (rList.status === "fulfilled") setResolutions(rList.value || []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadGovernanceData();
  }, [loadGovernanceData]);

  const handleCreateMeeting = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    setFeedback(null);
    try {
      const agendaArray = newAgenda
        .split("\n")
        .map((a) => a.trim())
        .filter(Boolean)
        .map((title, idx) => ({ order: idx + 1, title }));

      await apiClient.governance.createMeeting({
        title: newTitle,
        titleBn: newTitleBn || undefined,
        category: newCategory,
        scheduledAt: newScheduledAt || new Date().toISOString(),
        venue: newVenue,
        agendaJson: agendaArray,
      });

      setFeedback({ type: "success", msg: "Meeting convened and agenda registered." });
      setCreateModalOpen(false);
      setNewTitle("");
      setNewTitleBn("");
      setNewVenue("");
      setNewAgenda("");
      await loadGovernanceData();
    } catch (err: any) {
      setFeedback({ type: "error", msg: err.message || "Failed to create meeting." });
    } finally {
      setActionLoading(false);
    }
  };

  const handleScheduleMeeting = async (meetingId: string) => {
    setActionLoading(true);
    try {
      await apiClient.governance.schedule(meetingId);
      setFeedback({ type: "success", msg: "Meeting notice finalized and session scheduled." });
      await loadGovernanceData();
    } catch (err: any) {
      setFeedback({ type: "error", msg: err.message || "Failed to schedule meeting." });
    } finally {
      setActionLoading(false);
    }
  };

  const handleRecordMinutes = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMeeting) return;
    setActionLoading(true);
    setFeedback(null);

    try {
      const userRes = await apiClient.auth.getMe();
      const currentUserId = userRes?.user?.id || "clerk-id";

      await apiClient.governance.recordMinutes(selectedMeeting.id, {
        presidedById: currentUserId,
        recordedById: currentUserId,
        quorumCount: parseInt(quorumCount, 10),
        totalEligibleCount: parseInt(totalEligible, 10),
        minutesHtml: minutesText,
        minutesHtmlBn: minutesTextBn || undefined,
        resolutions: resTitle
          ? [
              {
                agendaTitle: resTitle,
                decisionText: resDecision,
                decisionTextBn: resDecisionBn || undefined,
                isUnanimous,
              },
            ]
          : [],
      });

      setFeedback({ type: "success", msg: "Minutes drafted and numbered resolutions adopted!" });
      setMinutesModalOpen(false);
      setSelectedMeeting(null);
      await loadGovernanceData();
    } catch (err: any) {
      setFeedback({ type: "error", msg: err.message || "Failed to record minutes." });
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "MINUTES_APPROVED":
        return <Badge variant="success">Minutes Approved</Badge>;
      case "MINUTES_DRAFT":
        return <Badge variant="warning">Minutes Drafted</Badge>;
      case "SCHEDULED":
        return <Badge variant="default">Scheduled</Badge>;
      case "IN_SESSION":
        return <Badge variant="gold">In Session</Badge>;
      case "DRAFT":
        return <Badge variant="outline">Draft</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Executive Governance & Council Chamber"
        titleBn="কার্যনির্বাহী পরিষদ ও সভা কার্যবিবরণী"
        description="Formal council session management, statutory quorum verification, minutes drafting, and permanent numbered resolutions register."
        badge={
          <Badge variant="gold" size="sm">
            Statutory Authority
          </Badge>
        }
        actions={
          <Button
            variant="primary"
            size="sm"
            onClick={() => setCreateModalOpen(true)}
            leftIcon={<Plus className="h-3.5 w-3.5" />}
          >
            Convene Session
          </Button>
        }
      />

      {feedback && (
        <div
          className={`p-3 rounded-md text-xs flex items-center gap-2 ${
            feedback.type === "success"
              ? "bg-emerald-950/40 border border-emerald-800 text-emerald-300"
              : "bg-red-950/40 border border-red-800 text-red-300"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
          ) : (
            <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
          )}
          <span>{feedback.msg}</span>
        </div>
      )}

      {/* Council Sessions Register */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle className="text-base">Council Sessions & General Meetings</CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5 font-bangla">
              নির্ধারিত সভার আলোচ্যসূচি, কোরাম স্থিতি এবং কার্যবিবরণী
            </p>
          </div>
          <Badge variant="outline">{meetings.length} Recorded</Badge>
        </CardHeader>
        <CardContent className="pt-0">
          {loading ? (
            <div className="p-8 text-center text-xs text-muted-foreground animate-pulse">
              Loading governance meetings...
            </div>
          ) : meetings.length === 0 ? (
            <EmptyState
              icon={<Crown className="h-8 w-8 text-muted-foreground" />}
              title="No Council Sessions"
              titleBn="কোনো সভা পাওয়া যায়নি"
              description="Convene an executive council session or general meeting above."
            />
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Session Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Scheduled Date</TableHead>
                    <TableHead>Venue</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {meetings.map((m) => (
                    <TableRow key={m.id}>
                      <TableCell>
                        <div>
                          <p className="font-semibold text-foreground text-sm">{m.title}</p>
                          {m.titleBn && (
                            <p className="text-xs text-muted-foreground font-bangla">
                              {m.titleBn}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" size="sm">
                          {m.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="font-mono text-xs">
                          {new Date(m.scheduledAt).toLocaleString("en-BD", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-xs text-muted-foreground">{m.venue}</span>
                      </TableCell>
                      <TableCell>{getStatusBadge(m.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {m.status === "DRAFT" && (
                            <Button
                              variant="outline"
                              size="sm"
                              disabled={actionLoading}
                              onClick={() => handleScheduleMeeting(m.id)}
                            >
                              Finalize Notice
                            </Button>
                          )}

                          {(m.status === "SCHEDULED" || m.status === "DRAFT") && (
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => {
                                setSelectedMeeting(m);
                                setMinutesModalOpen(true);
                              }}
                            >
                              Record Minutes
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Permanent Numbered Resolutions Register */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle className="text-base flex items-center gap-2">
              <Scale className="h-4 w-4 text-amber-500" />
              Official Numbered Resolutions Register
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5 font-bangla">
              কার্যনির্বাহী পরিষদ কর্তৃক গৃহীত স্থায়ী প্রস্তাবনা ও সিদ্ধান্তমালা
            </p>
          </div>
          <Badge variant="outline">{resolutions.length} Adopted</Badge>
        </CardHeader>
        <CardContent className="pt-0">
          {resolutions.length === 0 ? (
            <EmptyState
              title="No Resolutions Adopted"
              titleBn="কোনো প্রস্তাবনা এখনো গৃহীত হয়নি"
              description="Resolutions recorded in meeting minutes will be sequentially indexed here."
            />
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Resolution Number</TableHead>
                    <TableHead>Agenda Subject</TableHead>
                    <TableHead>Decision / Directive</TableHead>
                    <TableHead>Consensus</TableHead>
                    <TableHead>Adopted Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {resolutions.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell>
                        <span className="font-mono font-bold text-amber-500 text-xs">
                          {r.resolutionNumber}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium text-foreground text-xs">
                          {r.agendaTitle}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-md text-xs text-muted-foreground space-y-0.5">
                          <p className="text-foreground">{r.decisionText}</p>
                          {r.decisionTextBn && (
                            <p className="font-bangla text-[11px] text-muted-foreground">
                              {r.decisionTextBn}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {r.isUnanimous ? (
                          <Badge variant="success" size="sm">
                            Unanimous
                          </Badge>
                        ) : (
                          <Badge variant="outline" size="sm">
                            Majority
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <span className="font-mono text-xs text-muted-foreground">
                          {new Date(r.createdAt).toLocaleDateString()}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal: Convene New Council Meeting */}
      {createModalOpen && (
        <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Convene Council Meeting</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleCreateMeeting} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Meeting Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. 14th Executive Council Session"
                  className="w-full px-3 py-2 rounded-md border border-input bg-background"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Title in Bengali (বাংলা)</label>
                <input
                  type="text"
                  value={newTitleBn}
                  onChange={(e) => setNewTitleBn(e.target.value)}
                  placeholder="e.g. ১৪তম কার্যনির্বাহী পরিষদ সভা"
                  className="w-full px-3 py-2 rounded-md border border-input bg-background font-bangla"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-md border border-input bg-background"
                  >
                    <option value="EXECUTIVE_COMMITTEE">Executive Committee</option>
                    <option value="REGULAR_AGM">Annual General Meeting (AGM)</option>
                    <option value="SPECIAL_EGM">Extraordinary General Meeting (EGM)</option>
                    <option value="BRANCH_COUNCIL">Branch Council</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Scheduled Date & Time</label>
                  <input
                    type="datetime-local"
                    required
                    value={newScheduledAt}
                    onChange={(e) => setNewScheduledAt(e.target.value)}
                    className="w-full px-3 py-2 rounded-md border border-input bg-background font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Venue / Council Hall</label>
                <input
                  type="text"
                  required
                  value={newVenue}
                  onChange={(e) => setNewVenue(e.target.value)}
                  placeholder="BMA Bhaban Auditorium, Chattogram"
                  className="w-full px-3 py-2 rounded-md border border-input bg-background"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">
                  Agenda Items (one per line)
                </label>
                <textarea
                  rows={3}
                  value={newAgenda}
                  onChange={(e) => setNewAgenda(e.target.value)}
                  placeholder="1. Confirmation of previous minutes&#10;2. Treasury report 2026&#10;3. Annual conference dates"
                  className="w-full px-3 py-2 rounded-md border border-input bg-background"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setCreateModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm" loading={actionLoading}>
                  Create Session Draft
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* Modal: Record Minutes & Numbered Resolutions */}
      {minutesModalOpen && selectedMeeting && (
        <Dialog open={minutesModalOpen} onOpenChange={setMinutesModalOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Record Minutes & Resolutions</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleRecordMinutes} className="space-y-4 text-xs">
              <div className="p-3 rounded-md bg-muted/40 border border-border">
                <p className="font-semibold text-foreground text-sm">{selectedMeeting.title}</p>
                <p className="text-muted-foreground font-mono text-[11px]">
                  Venue: {selectedMeeting.venue}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Quorum Present Count</label>
                  <input
                    type="number"
                    required
                    value={quorumCount}
                    onChange={(e) => setQuorumCount(e.target.value)}
                    className="w-full px-3 py-2 rounded-md border border-input bg-background font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Total Eligible Roll</label>
                  <input
                    type="number"
                    required
                    value={totalEligible}
                    onChange={(e) => setTotalEligible(e.target.value)}
                    className="w-full px-3 py-2 rounded-md border border-input bg-background font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Session Minutes (English)</label>
                <textarea
                  rows={3}
                  required
                  value={minutesText}
                  onChange={(e) => setMinutesText(e.target.value)}
                  placeholder="Proceedings and deliberation notes..."
                  className="w-full px-3 py-2 rounded-md border border-input bg-background"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">কার্যবিবরণী (বাংলা)</label>
                <textarea
                  rows={3}
                  value={minutesTextBn}
                  onChange={(e) => setMinutesTextBn(e.target.value)}
                  placeholder="সভার বিস্তারিত কার্যবিবরণী..."
                  className="w-full px-3 py-2 rounded-md border border-input bg-background font-bangla"
                />
              </div>

              {/* Resolution Block */}
              <div className="p-4 rounded-lg border border-amber-500/30 bg-amber-500/5 space-y-3">
                <p className="font-bold text-amber-400 uppercase tracking-wider text-[11px] font-mono">
                  Numbered Statutory Resolution
                </p>

                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Agenda Subject</label>
                  <input
                    type="text"
                    required
                    value={resTitle}
                    onChange={(e) => setResTitle(e.target.value)}
                    placeholder="e.g. Budget Approval for CTG Medical Relief Unit"
                    className="w-full px-3 py-2 rounded-md border border-input bg-background"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Adopted Decision Text</label>
                  <textarea
                    rows={2}
                    required
                    value={resDecision}
                    onChange={(e) => setResDecision(e.target.value)}
                    placeholder="Resolved that the Executive Council hereby approves..."
                    className="w-full px-3 py-2 rounded-md border border-input bg-background"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-foreground">গৃহীত সিদ্ধান্ত (বাংলায়)</label>
                  <textarea
                    rows={2}
                    value={resDecisionBn}
                    onChange={(e) => setResDecisionBn(e.target.value)}
                    placeholder="কার্যনির্বাহী পরিষদ সর্বসম্মতিক্রমে অনুমোদন করিল যে..."
                    className="w-full px-3 py-2 rounded-md border border-input bg-background font-bangla"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="unanimousCheck"
                    checked={isUnanimous}
                    onChange={(e) => setIsUnanimous(e.target.checked)}
                    className="h-4 w-4 rounded border-border"
                  />
                  <label htmlFor="unanimousCheck" className="text-foreground font-medium">
                    Passed Unanimously by Council
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setMinutesModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm" loading={actionLoading}>
                  Save Minutes & Adopt Resolution
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
