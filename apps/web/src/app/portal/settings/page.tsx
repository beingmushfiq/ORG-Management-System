"use client";

import React, { useState } from "react";
import {
  Lock,
  Shield,
  Smartphone,
  CheckCircle2,
} from "lucide-react";
import { Badge, Button, Card, CardContent, CardHeader, CardTitle, PageHeader } from "@org/ui";

export default function MemberSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [emailDigest, setEmailDigest] = useState(true);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSaveSecurity = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Account & Security Settings"
        titleBn="অ্যাকাউন্ট, নিরাপত্তা ও বিজ্ঞপ্তি সেটিংস"
        description="Configure cryptographic credentials, two-factor authentication via SMS OTP, and institutional notification dispatch."
        badge={
          <Badge variant="outline" className="text-xs font-mono text-emerald-600 border-emerald-500/30 bg-emerald-500/10">
            Account Preferences
          </Badge>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Security & Password */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-primary" />
              <CardTitle className="text-base font-bold">Password & Authentication</CardTitle>
            </div>
            <p className="text-xs text-muted-foreground font-bangla">
              নিরাপদ পাসওয়ার্ড ও অ্যাকাউন্ট সিকিউরিটি
            </p>
          </CardHeader>

          <CardContent className="pt-0">
            <form onSubmit={handleSaveSecurity} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-muted-foreground">
                  Current Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background text-xs text-foreground focus:outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-muted-foreground">
                  New Strong Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="Minimum 8 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background text-xs text-foreground focus:outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-muted-foreground">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="Repeat new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background text-xs text-foreground focus:outline-none focus:border-primary"
                />
              </div>

              {saved && (
                <div className="p-2 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-600 flex items-center gap-1.5 font-mono">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Password successfully updated.</span>
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                size="sm"
                className="w-full bg-[#164e32] hover:bg-[#113d27] text-white"
              >
                Update Password
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Notifications & 2FA */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Smartphone className="h-4 w-4 text-emerald-600" />
                <CardTitle className="text-base font-bold">Two-Factor Authentication (2FA)</CardTitle>
              </div>
              <p className="text-xs text-muted-foreground font-bangla">
                মোবাইল এসএমএস ওটিপি যাচাইকরণ
              </p>
            </CardHeader>

            <CardContent className="pt-0 space-y-3">
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs space-y-1">
                <div className="font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                  <Shield className="h-4 w-4 text-emerald-600" />
                  <span>SMS OTP Challenge Active</span>
                </div>
                <p className="text-[11px] text-emerald-700 dark:text-emerald-400">
                  Every sign-in can optionally challenge your registered mobile number (+880 1819 778899).
                </p>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div className="space-y-0.5">
                  <p className="text-xs font-semibold text-foreground">Emergency SMS Broadcasts</p>
                  <p className="text-[11px] text-muted-foreground">
                    Receive urgent road safety alerts & blood donation calls
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={smsAlerts}
                  onChange={(e) => setSmsAlerts(e.target.checked)}
                  className="h-4 w-4 rounded border-border text-emerald-600 focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div className="space-y-0.5">
                  <p className="text-xs font-semibold text-foreground">Weekly Digest & Gazettes</p>
                  <p className="text-[11px] text-muted-foreground">
                    Receive email summaries of council meetings & events
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={emailDigest}
                  onChange={(e) => setEmailDigest(e.target.checked)}
                  className="h-4 w-4 rounded border-border text-emerald-600 focus:ring-emerald-500"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
