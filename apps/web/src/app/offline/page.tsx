"use client";

import React, { useState } from "react";
import Link from "next/link";
import { WifiOff, RefreshCw, PhoneCall, Shield, Home } from "lucide-react";
import { Button, Card, CardContent } from "@org/ui";
import { OrgLogo } from "@/components/brand/org-logo";

export default function OfflinePage() {
  const [retrying, setRetrying] = useState(false);

  const handleRetry = () => {
    setRetrying(true);
    setTimeout(() => {
      window.location.reload();
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#071d12] text-foreground flex flex-col justify-between p-4 sm:p-8">
      {/* Top Banner */}
      <header className="flex items-center justify-between border-b border-emerald-500/20 pb-4">
        <Link href="/portal" className="flex items-center gap-3">
          <OrgLogo size="sm" />
          <div>
            <h1 className="text-sm font-bold text-white tracking-wide">ROAD SAFETY MOVEMENT</h1>
            <p className="text-[10px] text-emerald-400 font-bangla">নিরাপদ সড়ক আন্দোলন</p>
          </div>
        </Link>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono">
          <WifiOff className="h-3.5 w-3.5" />
          <span>Offline Mode</span>
        </div>
      </header>

      {/* Main Content Card */}
      <main className="max-w-md mx-auto my-12 w-full">
        <Card className="border-emerald-500/30 bg-[#0d3b25]/90 backdrop-blur-xl shadow-2xl text-white">
          <CardContent className="p-8 text-center space-y-6">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <WifiOff className="h-8 w-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold tracking-tight text-white">
                No Internet Connection
              </h2>
              <p className="text-sm text-emerald-200/90 font-bangla">
                আপনি বর্তমানে অফলাইনে আছেন। ইন্টারনেট সংযোগ স্বাভাবিক হলে স্বয়ংক্রিয়ভাবে লাইভ ডাটা লোড হবে।
              </p>
            </div>

            {/* Offline Capability Info */}
            <div className="p-4 rounded-xl bg-black/30 border border-emerald-500/20 text-left space-y-2 text-xs">
              <div className="flex items-center gap-2 font-semibold text-emerald-300">
                <Shield className="h-4 w-4 text-emerald-400" />
                <span>Offline PWA Persistence Active</span>
              </div>
              <p className="text-white/70 leading-relaxed">
                Previously viewed member credentials, QR receipts, and course outlines remain saved in local storage on this device.
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-2">
              <Button
                variant="primary"
                size="md"
                onClick={handleRetry}
                disabled={retrying}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2.5"
                leftIcon={<RefreshCw className={`h-4 w-4 ${retrying ? "animate-spin" : ""}`} />}
              >
                {retrying ? "Checking Connection..." : "Retry Connection"}
              </Button>

              <Link href="/portal" className="block">
                <Button
                  variant="outline"
                  size="md"
                  className="w-full border-emerald-500/40 text-emerald-200 hover:bg-emerald-500/10 py-2.5"
                  leftIcon={<Home className="h-4 w-4" />}
                >
                  Go to Cached Portal
                </Button>
              </Link>
            </div>

            {/* Emergency Hotline */}
            <div className="pt-4 border-t border-emerald-500/20 flex items-center justify-center gap-2 text-xs text-emerald-300 font-mono">
              <PhoneCall className="h-3.5 w-3.5 text-amber-400" />
              <span>National Safety Hotline: 01521 336 207</span>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-emerald-400/60 font-mono">
        Road Safety Movement PWA Engine • Service Worker Dynamic Offline Cache
      </footer>
    </div>
  );
}
