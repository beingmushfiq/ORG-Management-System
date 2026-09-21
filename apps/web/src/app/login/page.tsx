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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      await apiClient.auth.verifyOtp(phoneNumber.trim(), otpCode.trim());
      setSuccessMessage("Authentication verified. Redirecting to workspace...");
      setTimeout(() => {
        router.push("/portal");
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
      await apiClient.auth.login(email.trim(), password);
      setSuccessMessage("Credentials confirmed. Redirecting to workspace...");
      setTimeout(() => {
        router.push("/portal");
      }, 400);
    } catch (err: any) {
      setErrorMessage(err.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-primary/30">
      {/* Top Bar */}
      <header className="px-6 py-4 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between">
        <Link
          href="/"
          className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-mono tracking-wider uppercase"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Official Portal
        </Link>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-mono text-slate-300">Institutional Security</span>
        </div>
      </header>

      {/* Main Login Card */}
      <main className="max-w-md w-full mx-auto px-6 py-12 flex-1 flex flex-col justify-center">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl space-y-6">
          {/* Header & Crest */}
          <div className="text-center space-y-2">
            <OrgLogo variant="mark" size="lg" className="mx-auto justify-center" />
            <h1 className="text-xl font-bold text-white tracking-tight">
              Member & Council Sign In
            </h1>
            <p className="text-xs text-slate-400 font-bangla">
              বাংলাদেশ মেডিকেল এসোসিয়েশন — প্রাতিষ্ঠানিক একাউন্ট
            </p>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3 rounded-lg bg-red-950/50 border border-red-800/80 text-red-200 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Success Banner */}
          {successMessage && (
            <div className="p-3 rounded-lg bg-emerald-950/50 border border-emerald-800/80 text-emerald-200 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Login Method Toggle */}
          <div className="grid grid-cols-2 p-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-medium">
            <button
              type="button"
              onClick={() => {
                setLoginMethod("PHONE_OTP");
                setOtpSent(false);
                setErrorMessage(null);
              }}
              className={`py-2 rounded transition-colors flex items-center justify-center gap-1.5 ${
                loginMethod === "PHONE_OTP"
                  ? "bg-primary text-white font-semibold shadow-sm"
                  : "text-slate-400 hover:text-white"
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
              className={`py-2 rounded transition-colors flex items-center justify-center gap-1.5 ${
                loginMethod === "EMAIL_PASSWORD"
                  ? "bg-primary text-white font-semibold shadow-sm"
                  : "text-slate-400 hover:text-white"
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
                  <label className="text-xs font-mono uppercase text-slate-400">
                    Registered Mobile Number
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-xs text-slate-500 font-mono">
                      +88
                    </span>
                    <input
                      type="tel"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="017XXXXXXXX"
                      className="w-full pl-12 pr-4 py-2 rounded-lg border border-slate-800 bg-slate-950 text-sm text-white focus:outline-none focus:border-primary font-mono"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 font-bangla">
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
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono flex items-center justify-between">
                  <span>Code sent to: {phoneNumber}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setOtpSent(false);
                      setOtpCode("");
                    }}
                    className="text-primary hover:underline text-[11px]"
                  >
                    Change
                  </button>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-slate-400">
                    6-Digit Verification Code
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="Enter 6-digit code"
                    className="w-full text-center tracking-widest text-xl py-2.5 rounded-lg border border-slate-800 bg-slate-950 text-white font-mono focus:outline-none focus:border-primary"
                  />
                  <div className="flex justify-between items-center text-[11px] text-slate-500 pt-1 font-mono">
                    <span>Valid for 5 minutes</span>
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="text-primary hover:underline flex items-center gap-1"
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
                <label className="text-xs font-mono uppercase text-slate-400">Official Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="doctor@bma-ctg.org"
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-800 bg-slate-950 text-sm text-white focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-slate-400">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-800 bg-slate-950 text-sm text-white focus:outline-none focus:border-primary"
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

          {/* New Member Prompt */}
          <div className="pt-4 border-t border-slate-800 text-center text-xs text-slate-400">
            <span>Not a member yet? </span>
            <Link href="/apply" className="text-primary hover:underline font-medium">
              Apply for Membership
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-slate-500 font-mono">
        Secured with Strict Tenant Isolation & Encrypted Session Cookies · BMA
      </footer>
    </div>
  );
}
