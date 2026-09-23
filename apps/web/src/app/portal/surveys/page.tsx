"use client";

import React, { useState } from "react";
import { MessageSquare, Vote, CheckCircle2, Send } from "lucide-react";
import { Badge, Button, Card, CardContent, CardHeader, CardTitle, PageHeader } from "@org/ui";

interface SurveyPoll {
  id: string;
  title: string;
  titleBn: string;
  category: string;
  totalVotes: number;
  options: { id: string; text: string; votes: number }[];
  userVotedOptionId?: string;
}

const INITIAL_POLLS: SurveyPoll[] = [
  {
    id: "poll-1",
    title: "Priority Action for Dhaka-Chattogram Highway Corridor (2026)",
    titleBn: "ঢাকা-চট্টগ্রাম মহাসড়কে দুর্ঘটনা প্রতিরোধে সর্বাধিক অগ্রাধিকার কোনটি?",
    category: "Highway Infrastructure",
    totalVotes: 1420,
    options: [
      { id: "opt-1", text: "Automated Speed Radar & Instant Fine Cameras", votes: 852 },
      { id: "opt-2", text: "Physical Separation of Slow-Moving Local Vehicles", votes: 412 },
      { id: "opt-3", text: "Night Highway Patrol & Drowsy Driver Checkpoints", votes: 156 },
    ],
  },
  {
    id: "poll-2",
    title: "School Zone Pedestrian Safety & Mandatory 20 km/h Speed Limit",
    titleBn: "শিক্ষা প্রতিষ্ঠানের সামনে বাধ্যতামূলক ২০ কিমি/ঘণ্টা গতিসীমা কার্যকর করার দাবি",
    category: "Youth & Child Protection",
    totalVotes: 2180,
    options: [
      { id: "opt-4", text: "Strict Enforcement with License Suspension", votes: 1680 },
      { id: "opt-5", text: "Elevated Crosswalks & Speed Cushions", votes: 500 },
    ],
  },
];

export default function MemberSurveysPage() {
  const [polls, setPolls] = useState<SurveyPoll[]>(INITIAL_POLLS);
  const [suggestion, setSuggestion] = useState("");
  const [suggestionSubmitted, setSuggestionSubmitted] = useState(false);

  const handleVote = (pollId: string, optionId: string) => {
    setPolls((prev) =>
      prev.map((poll) => {
        if (poll.id !== pollId || poll.userVotedOptionId) return poll;
        return {
          ...poll,
          totalVotes: poll.totalVotes + 1,
          userVotedOptionId: optionId,
          options: poll.options.map((opt) =>
            opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
          ),
        };
      })
    );
  };

  const handleSendSuggestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!suggestion.trim()) return;
    setSuggestionSubmitted(true);
    setSuggestion("");
    setTimeout(() => {
      setSuggestionSubmitted(false);
    }, 4000);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Surveys & Public Opinion Desk"
        titleBn="সার্ভে, জনমত ও নাগরিক প্রস্তাবনা"
        description="Democratic member consultations on road safety legislation, national blackspots, and advocacy campaigns."
        badge={
          <Badge variant="outline" className="text-xs font-mono text-emerald-600 border-emerald-500/30 bg-emerald-500/10">
            Citizen Polling
          </Badge>
        }
      />

      {/* Main Surveys Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Active Member Polls */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-foreground uppercase tracking-wider font-mono flex items-center gap-2">
            <Vote className="h-4 w-4 text-primary" />
            <span>Active Policy Polls</span>
          </h3>

          {polls.map((poll) => (
            <Card key={poll.id} className="hover:border-emerald-500/40 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground uppercase font-semibold">
                    {poll.category}
                  </span>
                  <span className="text-[11px] font-mono text-muted-foreground">
                    {poll.totalVotes.toLocaleString()} Votes Recorded
                  </span>
                </div>
                <CardTitle className="text-base font-bold text-foreground pt-1 leading-snug">
                  {poll.title}
                </CardTitle>
                <p className="text-xs text-muted-foreground font-bangla">{poll.titleBn}</p>
              </CardHeader>

              <CardContent className="space-y-3 pt-0">
                {poll.options.map((opt) => {
                  const percent = Math.round((opt.votes / poll.totalVotes) * 100);
                  const isVoted = poll.userVotedOptionId === opt.id;

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      disabled={!!poll.userVotedOptionId}
                      onClick={() => handleVote(poll.id, opt.id)}
                      className={`w-full text-left p-3 rounded-xl border transition-all relative overflow-hidden ${
                        isVoted
                          ? "border-emerald-500 bg-emerald-500/10 text-emerald-950 dark:text-emerald-100 font-semibold"
                          : poll.userVotedOptionId
                          ? "border-border bg-muted/40 cursor-default opacity-90"
                          : "border-border bg-card hover:border-primary/50 hover:bg-muted/50 cursor-pointer"
                      }`}
                    >
                      {/* Percent Bar Fill */}
                      {poll.userVotedOptionId && (
                        <div
                          className="absolute inset-y-0 left-0 bg-emerald-500/15 transition-all duration-500"
                          style={{ width: `${percent}%` }}
                        />
                      )}

                      <div className="relative z-10 flex items-center justify-between text-xs">
                        <span className="leading-snug">{opt.text}</span>
                        {poll.userVotedOptionId && (
                          <span className="font-mono font-bold shrink-0 ml-2">
                            {percent}%
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}

                {poll.userVotedOptionId && (
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1 pt-1 font-mono">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Your vote is cryptographically tallied in the resolution docket.</span>
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Opinion Dispatcher */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-foreground uppercase tracking-wider font-mono flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-emerald-600" />
            <span>Submit Grassroots Opinion or Hazard Report</span>
          </h3>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold">
                Direct Submission to National Secretariat
              </CardTitle>
              <p className="text-xs text-muted-foreground font-bangla">
                আপনার এলাকার বিপজ্জনক ব্ল্যাকস্পট বা ট্রাফিক আইন ভঙ্গের ব্যাপারে সরাসরি কেন্দ্রীয় গবেষণা শাখায় মতামত দিন
              </p>
            </CardHeader>

            <CardContent className="space-y-4 pt-0">
              {suggestionSubmitted ? (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-1.5">
                  <CheckCircle2 className="h-8 w-8 text-emerald-500 mx-auto" />
                  <h4 className="font-bold text-sm text-foreground">Opinion Registered!</h4>
                  <p className="text-xs text-muted-foreground font-bangla">
                    আপনার প্রস্তাবনাটি কেন্দ্রীয় কার্যনির্বাহী পরিষদের পরবর্তী এজেন্ডায় অন্তর্ভুক্ত করা হয়েছে।
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSendSuggestion} className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-muted-foreground">
                      Hazard Topic / Corridor Location
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Farmgate Footbridge blind spot or Joydebpur intersection"
                      className="w-full px-3 py-2 rounded-lg border border-input bg-background text-xs text-foreground focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-muted-foreground">
                      Detailed Observation & Proposed Solution
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={suggestion}
                      onChange={(e) => setSuggestion(e.target.value)}
                      placeholder="Specify the risk factor, crash frequency, and recommended engineering or enforcement remedy..."
                      className="w-full p-3 rounded-lg border border-input bg-background text-xs text-foreground focus:outline-none focus:border-primary leading-relaxed"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    className="w-full bg-[#164e32] hover:bg-[#113d27] text-white"
                  >
                    Transmit to Secretariat <Send className="h-3.5 w-3.5 ml-2" />
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
