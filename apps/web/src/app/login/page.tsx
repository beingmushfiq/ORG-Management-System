"use client";

import React, { useState } from "react";
import {
  Phone,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  Building,
  CheckCircle2,
  ArrowLeft,
  KeyRound,
  RotateCw,
} from "lucide-react";
import { Button } from "@org/ui";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MemberLoginPage() {
  const router = useRouter();
  const [loginMethod, setLoginMethod] = useState<"PHONE_OTP" | "EMAIL_PASSWORD">("PHONE_OTP");

  // Phone OTP State
  const [phoneNumber, setPhoneNumber] = useState("01712345678");
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Email Password State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return;
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
      setOtpCode("482910"); // Pre-fill mock for effortless demonstration
    }, 800);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setLoginSuccess(true);
      setTimeout(() => {
        router.push("/portal/members");
      }, 1000);
    }, 800);
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setLoginSuccess(true);
      setTimeout(() => {
        router.push("/portal/members");
      }, 1000);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-amber-500/20 selection:text-amber-300">
      {/* Top Bar */}
      <header className="px-6 py-4 border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-xl flex items-center justify-between">
        <Link
          href="/"
          className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-mono tracking-wider uppercase"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Official Portfolio
        </Link>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-mono text-slate-300">Official Institutional Access</span>
        </div>
      </header>

      {/* Main Login Card */}
      <main className="max-w-md w-full mx-auto px-6 py-12 flex-1 flex flex-col justify-center">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-2xl backdrop-blur-2xl space-y-6">
          {/* Header & Crest */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
              <Building className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-display font-bold text-white tracking-tight">
              Member & Council Sign In
            </h1>
            <p className="text-xs text-slate-400 font-bangla">
              বাংলাদেশ মেডিকেল এসোসিয়েশন — চট্টগ্রাম পোর্টাল
            </p>
          </div>

          {/* Login Method Toggle */}
          <div className="grid grid-cols-2 p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium">
            <button
              type="button"
              onClick={() => {
                setLoginMethod("PHONE_OTP");
                setOtpSent(false);
              }}
              className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                loginMethod === "PHONE_OTP"
                  ? "bg-amber-500 text-slate-950 font-bold shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Phone className="w-3.5 h-3.5" /> Mobile OTP
            </button>
            <button
              type="button"
              onClick={() => setLoginMethod("EMAIL_PASSWORD")}
              className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                loginMethod === "EMAIL_PASSWORD"
                  ? "bg-amber-500 text-slate-950 font-bold shadow-md"
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
                      className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-sm text-white focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 font-bangla">
                    আপনার নিবন্ধিত মোবাইল নাম্বারে একটি ৬-সংখ্যার ওটিপি কোড পাঠানো হবে।
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold"
                >
                  {loading ? "Sending SMS Code..." : "Send Verification Code"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 font-mono flex items-center justify-between">
                  <span>Code sent to: {phoneNumber}</span>
                  <button
                    type="button"
                    onClick={() => setOtpSent(false)}
                    className="text-white hover:underline text-[11px]"
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
                    placeholder="482910"
                    className="w-full text-center tracking-widest text-xl py-3 rounded-xl border border-slate-800 bg-slate-950 text-amber-400 font-mono focus:outline-none focus:border-amber-500"
                  />
                  <div className="flex justify-between items-center text-[11px] text-slate-500 pt-1 font-mono">
                    <span>Valid for 3:00 minutes</span>
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="text-amber-400 hover:underline flex items-center gap-1"
                    >
                      <RotateCw className="w-3 h-3" /> Resend Code
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
                >
                  {loading ? "Verifying..." : "Verify & Sign In"}
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
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-sm text-white focus:outline-none focus:border-amber-500"
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
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold"
              >
                {loading ? "Signing in..." : "Sign In with Password"}
                <KeyRound className="w-4 h-4 ml-2" />
              </Button>
            </form>
          )}

          {loginSuccess && (
            <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              Authenticated successfully. Opening your portal dashboard...
            </div>
          )}

          {/* New Member Prompt */}
          <div className="pt-4 border-t border-slate-800/80 text-center text-xs text-slate-400">
            <span>Not a member yet? </span>
            <Link href="/apply" className="text-amber-400 hover:underline font-semibold">
              Apply for Membership
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-slate-500 font-mono">
        Secured with Multi-Layer Tenant Isolation · Bangladesh Medical Association
      </footer>
    </div>
  );
}
