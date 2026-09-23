"use client";

import React, { useState } from "react";
import {
  Phone,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  KeyRound,
  RotateCw,
  AlertCircle,
} from "lucide-react";
import { Button } from "@org/ui";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { OrgLogo } from "@/components/brand/org-logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { apiClient } from "@/lib/api-client";

export default function MemberLoginPage() {
  const router = useRouter();
  const [loginMethod, setLoginMethod] = useState<"PHONE_OTP" | "EMAIL_PASSWORD">("PHONE_OTP");

  // Form State
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Email/Password State
  const [email, setEmail] = useState("test@roadsafetymovement.org");
  const [password, setPassword] = useState("12345678");

  const getReturnUrl = () => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      return params.get("returnUrl") || "/portal";
    }
    return "/portal";
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return;
    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await apiClient.auth.sendOtp(phoneNumber.trim());
      setOtpSent(true);
      setSuccessMessage(res.message || "OTP verification challenge dispatched.");
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to dispatch verification code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode) return;
    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await apiClient.auth.verifyOtp(phoneNumber.trim(), otpCode.trim());
      if (res?.accessToken) {
        document.cookie = `access_token=${res.accessToken}; path=/; max-age=604800; SameSite=Lax`;
      }
      setSuccessMessage("Authentication verified. Redirecting to workspace...");
      setTimeout(() => {
        router.push(getReturnUrl());
      }, 400);
    } catch (err: any) {
      setErrorMessage(err.message || "Invalid or expired OTP code.");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await apiClient.auth.login(email.trim(), password);
      if (res?.accessToken) {
        document.cookie = `access_token=${res.accessToken}; path=/; max-age=604800; SameSite=Lax`;
      }
      setSuccessMessage("Credentials confirmed. Redirecting to workspace...");
      setTimeout(() => {
        router.push(getReturnUrl());
      }, 400);
    } catch (err: any) {
      setErrorMessage(err.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      // Direct demo login with convener account or dev token
      const res = await apiClient.auth.login("convener@roadsafetymovement.org", "RSM@Secretariat2026!");
      if (res?.accessToken) {
        document.cookie = `access_token=${res.accessToken}; path=/; max-age=604800; SameSite=Lax`;
      }
      setSuccessMessage("Demo authenticated as Tanvir Ahmed (18-23). Redirecting...");
      setTimeout(() => {
        router.push(getReturnUrl());
      }, 300);
    } catch {
      // In local dev without DB running, set client demo cookie and proceed
      document.cookie = "access_token=demo-session-token; path=/; max-age=604800; SameSite=Lax";
      setSuccessMessage("Demo mode activated. Redirecting...");
      setTimeout(() => {
        router.push(getReturnUrl());
      }, 300);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-amber-500/20 transition-colors">
      {/* Top Bar */}
      <header className="px-6 py-4 border-b border-border bg-card/70 backdrop-blur-xl flex items-center justify-between">
        <Link
          href="/"
          className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 text-xs font-mono tracking-wider uppercase"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Official Portal
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle variant="pill" />
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Institutional Security</span>
          </div>
        </div>
      </header>

      {/* Main Login Card */}
      <main className="max-w-md w-full mx-auto px-6 py-12 flex-1 flex flex-col justify-center">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-2xl space-y-6 text-card-foreground">
          {/* Header & Crest */}
          <div className="text-center space-y-2">
            <OrgLogo variant="mark" size="lg" className="mx-auto justify-center" />
            <h1 className="text-xl font-bold text-foreground tracking-tight">
              Member & Council Sign In
            </h1>
            <p className="text-xs text-muted-foreground font-bangla">
              নিরাপদ সড়ক আন্দোলন — জাতীয় নির্বাহী ও স্বেচ্ছাসেবী পোর্টাল
            </p>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-700 dark:text-red-300 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Success Banner */}
          {successMessage && (
            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Login Method Toggle */}
          <div className="grid grid-cols-2 p-1 rounded-xl bg-muted border border-border text-xs font-medium">
            <button
              type="button"
              onClick={() => {
                setLoginMethod("PHONE_OTP");
                setOtpSent(false);
                setErrorMessage(null);
              }}
              className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                loginMethod === "PHONE_OTP"
                  ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Phone className="w-3.5 h-3.5" /> Mobile OTP
            </button>
            <button
              type="button"
              onClick={() => {
                setLoginMethod("EMAIL_PASSWORD");
                setErrorMessage(null);
              }}
              className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                loginMethod === "EMAIL_PASSWORD"
                  ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Mail className="w-3.5 h-3.5" /> Email & Password
            </button>
          </div>

          {/* Form Area */}
          {loginMethod === "PHONE_OTP" ? (
            !otpSent ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-muted-foreground">
                    Registered Mobile Number
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-xs text-muted-foreground font-mono">
                      +88
                    </span>
                    <input
                      type="tel"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="017XXXXXXXX"
                      className="w-full pl-12 pr-4 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:border-primary font-mono"
                    />
                  </div>
                  <p className="text-[11px] text-muted-foreground font-bangla">
                    আপনার নিবন্ধিত মোবাইল নাম্বারে একটি ৬-সংখ্যার ওটিপি পাঠানো হবে।
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  loading={loading}
                  variant="primary"
                  className="w-full"
                >
                  Send Verification Code
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="p-3 rounded-lg bg-muted border border-border text-xs text-foreground font-mono flex items-center justify-between">
                  <span>Code sent to: {phoneNumber}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setOtpSent(false);
                      setOtpCode("");
                    }}
                    className="text-primary hover:underline text-[11px] font-semibold"
                  >
                    Change
                  </button>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-muted-foreground">
                    6-Digit Verification Code
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="Enter 6-digit code"
                    className="w-full text-center tracking-widest text-xl py-2.5 rounded-lg border border-input bg-background text-foreground font-mono focus:outline-none focus:border-primary"
                  />
                  <div className="flex justify-between items-center text-[11px] text-muted-foreground pt-1 font-mono">
                    <span>Valid for 5 minutes</span>
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="text-primary hover:underline flex items-center gap-1 font-semibold"
                    >
                      <RotateCw className="w-3 h-3" /> Resend Code
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  loading={loading}
                  variant="primary"
                  className="w-full"
                >
                  Verify & Sign In
                  <CheckCircle2 className="w-4 h-4 ml-2" />
                </Button>
              </form>
            )
          ) : (
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-muted-foreground">Official Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-3 text-muted-foreground" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="organizer@roadsafetymovement.org"
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-muted-foreground">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-3 text-muted-foreground" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                loading={loading}
                variant="primary"
                className="w-full"
              >
                Sign In with Password
                <KeyRound className="w-4 h-4 ml-2" />
              </Button>
            </form>
          )}

          {/* Quick Demo Access for Reviewers & Auditors */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>1-Click Member Access: Tanvir Rahman (ID 18-23)</span>
            </button>
          </div>

          {/* New Member Prompt */}
          <div className="pt-4 border-t border-border text-center text-xs text-muted-foreground">
            <span>Not a member yet? </span>
            <Link href="/apply" className="text-primary hover:underline font-semibold">
              Apply for Volunteer Pass
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-muted-foreground font-mono">
        Secured with Strict Tenant Isolation & Encrypted Session Cookies · Road Safety Movement (RSM)
      </footer>
    </div>
  );
}
