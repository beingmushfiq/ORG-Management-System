"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Radio,
  Send,
  CheckCircle2,
  AlertCircle,
  FileText,
  Plus,
  RefreshCw,
  Pin,
} from "lucide-react";
import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  PageHeader,
  EmptyState,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@org/ui";
import { apiClient } from "@/lib/api-client";

export default function CommunicationsPage() {
  const [notices, setNotices] = useState<any[]>([]);
  const [branches, setBranches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Broadcast Form State
  const [targetBranchPath, setTargetBranchPath] = useState("1");
  const [messageBn, setMessageBn] = useState(
    "জরুরী বিজ্ঞপ্তি: বাংলাদেশ মেডিকেল এসোসিয়েশন এর বিশেষ কার্যনির্বাহী অধিবেশন আহ্বান করা হয়েছে।"
  );
  const [messageEn, setMessageEn] = useState("");
  const [broadcastLoading, setBroadcastLoading] = useState(false);

  // New Notice Modal State
  const [noticeModalOpen, setNoticeModalOpen] = useState(false);
  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeTitleBn, setNoticeTitleBn] = useState("");
  const [noticeContentHtml, setNoticeContentHtml] = useState("");
  const [noticeContentHtmlBn, setNoticeContentHtmlBn] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [isPinned, setIsPinned] = useState(false);
  const [noticeLoading, setNoticeLoading] = useState(false);

  const [feedback, setFeedback] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [noticesRes, branchesRes] = await Promise.allSettled([
        apiClient.communications.listNotices(),
        apiClient.hierarchy.list(),
      ]);

      if (noticesRes.status === "fulfilled") setNotices(noticesRes.value || []);
      if (branchesRes.status === "fulfilled") setBranches(branchesRes.value || []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // UCS-2 / GSM-7 SMS Segment Counter
  const isUnicode = /[\u0980-\u09FF]/.test(messageBn);
  const charLength = messageBn.length;
  const segments = isUnicode
    ? charLength <= 70
      ? 1
      : Math.ceil(charLength / 67)
    : charLength <= 160
    ? 1
    : Math.ceil(charLength / 153);

  const handleBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    setBroadcastLoading(true);
    setFeedback(null);

    try {
      const res = await apiClient.communications.broadcast({
        messageBn,
        messageEn: messageEn || undefined,
        targetBranchPath,
      });

      setFeedback({
        type: "success",
        msg: `Broadcast dispatched! Total sent: ${res.totalSent} messages via ${res.provider}.`,
      });
    } catch (err: any) {
      setFeedback({
        type: "error",
        msg: err.message || "Failed to dispatch broadcast.",
      });
    } finally {
      setBroadcastLoading(false);
    }
  };

  const handleCreateNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    setNoticeLoading(true);
    setFeedback(null);

    try {
      await apiClient.communications.createNotice({
        title: noticeTitle.trim(),
        titleBn: noticeTitleBn.trim() || undefined,
        contentHtml: noticeContentHtml.trim(),
        contentHtmlBn: noticeContentHtmlBn.trim() || undefined,
        isPublic,
        isPinned,
      });

      setFeedback({ type: "success", msg: "Official notice published successfully." });
      setNoticeModalOpen(false);
      setNoticeTitle("");
      setNoticeTitleBn("");
      setNoticeContentHtml("");
      setNoticeContentHtmlBn("");
      await loadData();
    } catch (err: any) {
      setFeedback({ type: "error", msg: err.message || "Failed to publish notice." });
    } finally {
      setNoticeLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Communications & Directives Desk"
        titleBn="যোগাযোগ ও আনুষ্ঠানিক বিজ্ঞপ্তি"
        description="Statutory notice publication, official circulars register, and prioritized multi-vendor SMS emergency broadcasting."
        badge={
          <Badge variant="outline" className="font-mono">
            Directives Channel
          </Badge>
        }
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={loadData}
              leftIcon={<RefreshCw className="h-3.5 w-3.5" />}
            >
              Refresh
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setNoticeModalOpen(true)}
              leftIcon={<Plus className="h-3.5 w-3.5" />}
            >
              Publish Notice
            </Button>
          </div>
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

      {/* Two Column Layout: SMS Dispatch & Published Notices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Module 1: Priority SMS Broadcast */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Radio className="h-4 w-4 text-primary" />
              Priority SMS Broadcast Dispatcher
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5 font-bangla">
              শাখা ও হাসপাতাল ইউনিটে জরুরি এসএমএস বার্তা প্রেরণ
            </p>
          </CardHeader>
          <CardContent className="pt-0">
            <form onSubmit={handleBroadcast} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-foreground">
                  Target Branch Subtree
                </label>
                <select
                  value={targetBranchPath}
                  onChange={(e) => setTargetBranchPath(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground font-mono"
                >
                  <option value="1">Entire Organization (HQ & All Branches)</option>
                  {branches.map((b) => (
                    <option key={b.id} value={b.materializedPath}>
                      {b.name} (Path: {b.materializedPath})
                    </option>
                  ))}
                </select>
                <p className="text-[10px] text-muted-foreground">
                  Broadcast automatically filters to all recipients whose branch path begins with this prefix.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="font-semibold text-foreground">
                    Message Body (বাংলা / English)
                  </label>
                  <span className="font-mono text-[10px] text-muted-foreground">
                    {charLength} chars · {segments} SMS ({isUnicode ? "Unicode UCS-2" : "GSM-7"})
                  </span>
                </div>
                <textarea
                  rows={4}
                  required
                  value={messageBn}
                  onChange={(e) => setMessageBn(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-input bg-background font-bangla"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">
                  English Reference (Optional)
                </label>
                <input
                  type="text"
                  value={messageEn}
                  onChange={(e) => setMessageEn(e.target.value)}
                  placeholder="Official executive notice reference..."
                  className="w-full px-3 py-2 rounded-md border border-input bg-background"
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  loading={broadcastLoading}
                  leftIcon={<Send className="h-3.5 w-3.5" />}
                  className="w-full"
                >
                  Dispatch Priority Broadcast
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Module 2: Published Notices Register */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                Statutory Circulars & Notices
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5 font-bangla">
                প্রকাশিত সরকারি ও প্রাতিষ্ঠানিক প্রজ্ঞাপন
              </p>
            </div>
            <Badge variant="outline">{notices.length} Published</Badge>
          </CardHeader>
          <CardContent className="pt-0">
            {loading ? (
              <div className="p-8 text-center text-xs text-muted-foreground animate-pulse">
                Querying official circulars...
              </div>
            ) : notices.length === 0 ? (
              <EmptyState
                title="No Notices Published"
                titleBn="কোনো প্রজ্ঞাপন প্রকাশিত হয়নি"
                description="Publish an official directive or notice using the button above."
              />
            ) : (
              <div className="divide-y divide-border max-h-[500px] overflow-y-auto">
                {notices.map((n) => (
                  <div key={n.id} className="py-3 space-y-1 text-xs">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold text-foreground text-sm flex items-center gap-1.5">
                        {n.isPinned && <Pin className="h-3.5 w-3.5 text-amber-500 shrink-0" />}
                        {n.title}
                      </p>
                      <Badge variant={n.isPublic ? "success" : "outline"} size="sm">
                        {n.isPublic ? "Public" : "Members Only"}
                      </Badge>
                    </div>

                    {n.titleBn && (
                      <p className="text-xs text-muted-foreground font-bangla">
                        {n.titleBn}
                      </p>
                    )}

                    <p className="text-muted-foreground text-xs line-clamp-2 pt-0.5">
                      {n.contentHtml}
                    </p>

                    <p className="text-[10px] text-muted-foreground font-mono pt-1">
                      Published: {new Date(n.publishedAt || n.createdAt).toLocaleDateString("en-BD", { dateStyle: "medium" })}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Modal: Publish Notice */}
      {noticeModalOpen && (
        <Dialog open={noticeModalOpen} onOpenChange={setNoticeModalOpen}>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Publish Official Notice / Circular</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleCreateNotice} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Notice Title (English)</label>
                <input
                  type="text"
                  required
                  value={noticeTitle}
                  onChange={(e) => setNoticeTitle(e.target.value)}
                  placeholder="e.g. Schedule for Annual General Meeting 2026"
                  className="w-full px-3 py-2 rounded-md border border-input bg-background"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">বিজ্ঞপ্তির শিরোনাম (বাংলা)</label>
                <input
                  type="text"
                  value={noticeTitleBn}
                  onChange={(e) => setNoticeTitleBn(e.target.value)}
                  placeholder="e.g. বার্ষিক সাধারণ সভা ২০২৬ এর বিজ্ঞপ্তি"
                  className="w-full px-3 py-2 rounded-md border border-input bg-background font-bangla"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Notice Content (English)</label>
                <textarea
                  rows={4}
                  required
                  value={noticeContentHtml}
                  onChange={(e) => setNoticeContentHtml(e.target.value)}
                  placeholder="Full text of notice..."
                  className="w-full px-3 py-2 rounded-md border border-input bg-background"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">বিজ্ঞপ্তির বিবরণ (বাংলা)</label>
                <textarea
                  rows={4}
                  value={noticeContentHtmlBn}
                  onChange={(e) => setNoticeContentHtmlBn(e.target.value)}
                  placeholder="বিজ্ঞপ্তির বিস্তারিত বিবরণ..."
                  className="w-full px-3 py-2 rounded-md border border-input bg-background font-bangla"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isPublicCheck"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                    className="h-4 w-4 rounded border-border"
                  />
                  <label htmlFor="isPublicCheck" className="text-foreground">
                    Public Notice Board
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isPinnedCheck"
                    checked={isPinned}
                    onChange={(e) => setIsPinned(e.target.checked)}
                    className="h-4 w-4 rounded border-border"
                  />
                  <label htmlFor="isPinnedCheck" className="text-foreground">
                    Pin to Top
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setNoticeModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm" loading={noticeLoading}>
                  Publish Directive
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
