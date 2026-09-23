"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Download, Wifi, WifiOff, X, RefreshCw, CheckCircle2 } from "lucide-react";
import { Button } from "@org/ui";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

interface PwaContextType {
  isInstalled: boolean;
  canInstall: boolean;
  isOnline: boolean;
  promptInstall: () => Promise<void>;
}

const PwaContext = createContext<PwaContextType>({
  isInstalled: false,
  canInstall: false,
  isOnline: true,
  promptInstall: async () => {},
});

export const usePwa = () => useContext(PwaContext);

export function PwaProvider({ children }: { children: React.ReactNode }) {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [showBanner, setShowBanner] = useState(false);
  const [hasUpdate, setHasUpdate] = useState(false);
  const [networkToast, setNetworkToast] = useState<"offline" | "online" | null>(null);
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    // 1. Initial Online Status
    setIsOnline(navigator.onLine);

      // Check if running in standalone PWA mode
      const isStandalone =
        window.matchMedia("(display-mode: standalone)").matches ||
        ("standalone" in window.navigator && (window.navigator as unknown as { standalone: boolean }).standalone);
      setIsInstalled(!!isStandalone);

      // 2. Register Service Worker
      if ("serviceWorker" in navigator && process.env.NODE_ENV !== "test") {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            // Check for updates
            registration.addEventListener("updatefound", () => {
              const newWorker = registration.installing;
              if (newWorker) {
                newWorker.addEventListener("statechange", () => {
                  if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                    setWaitingWorker(newWorker);
                    setHasUpdate(true);
                  }
                });
              }
            });

            // If already waiting
            if (registration.waiting && navigator.serviceWorker.controller) {
              setWaitingWorker(registration.waiting);
              setHasUpdate(true);
            }
          })
          .catch((err) => {
            console.warn("[PWA] Service Worker registration failed:", err);
          });
      }

      // 3. Listen for BeforeInstallPrompt
      const handleBeforeInstall = (e: Event) => {
        e.preventDefault();
        setDeferredPrompt(e as BeforeInstallPromptEvent);
        // Only show install banner if not dismissed in this session
        const dismissed = sessionStorage.getItem("rsm_pwa_banner_dismissed");
        if (!dismissed) {
          setShowBanner(true);
        }
      };

      // 4. Listen for AppInstalled
      const handleAppInstalled = () => {
        setIsInstalled(true);
        setDeferredPrompt(null);
        setShowBanner(false);
      };

      // 5. Connectivity Listeners
      const handleOnline = () => {
        setIsOnline(true);
        setNetworkToast("online");
        setTimeout(() => setNetworkToast(null), 3500);
      };

      const handleOffline = () => {
        setIsOnline(false);
        setNetworkToast("offline");
      };

      window.addEventListener("beforeinstallprompt", handleBeforeInstall);
      window.addEventListener("appinstalled", handleAppInstalled);
      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);

      return () => {
        window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
        window.removeEventListener("appinstalled", handleAppInstalled);
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
      };
  }, []);

  const promptInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    if (choiceResult.outcome === "accepted") {
      setIsInstalled(true);
      setShowBanner(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismissBanner = () => {
    setShowBanner(false);
    sessionStorage.setItem("rsm_pwa_banner_dismissed", "true");
  };

  const handleApplyUpdate = () => {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: "SKIP_WAITING" });
    }
    window.location.reload();
  };

  return (
    <PwaContext.Provider
      value={{
        isInstalled,
        canInstall: !!deferredPrompt && !isInstalled,
        isOnline,
        promptInstall,
      }}
    >
      {children}

      {/* Floating Connectivity Toast */}
      {networkToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div
            className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full shadow-2xl text-xs font-semibold backdrop-blur-md border ${
              networkToast === "offline"
                ? "bg-amber-950/90 text-amber-200 border-amber-500/40"
                : "bg-emerald-950/90 text-emerald-200 border-emerald-500/40"
            }`}
          >
            {networkToast === "offline" ? (
              <>
                <WifiOff className="h-4 w-4 text-amber-400 animate-pulse" />
                <span>Offline Mode: Local records & receipts cached</span>
              </>
            ) : (
              <>
                <Wifi className="h-4 w-4 text-emerald-400" />
                <span>Internet Connection Restored — Live Sync Active</span>
              </>
            )}
          </div>
        </div>
      )}

      {/* Dynamic PWA Update Notice */}
      {hasUpdate && (
        <div className="fixed top-4 right-4 z-50 animate-in fade-in slide-in-from-top-3 max-w-sm w-full p-4 rounded-2xl bg-[#0d3b25] border border-emerald-500/40 text-white shadow-2xl space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-xs text-emerald-300">
              <RefreshCw className="h-4 w-4 text-emerald-400 animate-spin" />
              <span>System Update Available</span>
            </div>
            <button
              onClick={() => setHasUpdate(false)}
              className="text-white/60 hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          <p className="text-[11px] text-white/80">
            A new version of the Road Safety Movement Operating System has been downloaded.
          </p>
          <Button
            size="sm"
            variant="primary"
            onClick={handleApplyUpdate}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs py-1.5"
          >
            Reload to Update
          </Button>
        </div>
      )}

      {/* Dynamic Install Banner */}
      {showBanner && deferredPrompt && !isInstalled && (
        <aside
          aria-label="Install Road Safety Movement Application"
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-50 max-w-md w-full animate-in fade-in slide-in-from-bottom-5"
        >
          <div className="rounded-2xl border border-emerald-500/40 bg-[#0d3b25]/95 backdrop-blur-xl p-4 sm:p-5 text-white shadow-2xl space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600/30 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-lg shadow-inner">
                  🛡️
                </div>
                <div>
                  <h2 className="text-xs sm:text-sm font-bold tracking-tight text-white">
                    Install Road Safety App (PWA)
                  </h2>
                  <p className="text-[11px] text-emerald-300 font-bangla">
                    অফলাইন এক্সেস ও দ্রুততম অভিজ্ঞতার জন্য ইনস্টল করুন
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleDismissBanner}
                className="text-white/60 hover:text-white p-1 rounded-lg hover:bg-white/10"
                aria-label="Dismiss banner"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px] text-emerald-200/90 font-mono">
              <span className="flex items-center gap-1.5 bg-black/30 px-2 py-1 rounded">
                <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                Offline Receipts
              </span>
              <span className="flex items-center gap-1.5 bg-black/30 px-2 py-1 rounded">
                <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                Instant Push Alerts
              </span>
            </div>

            <div className="flex items-center justify-end gap-2 pt-1">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDismissBanner}
                className="border-emerald-500/30 text-emerald-200 hover:bg-emerald-500/10 text-xs px-3"
              >
                Not Now
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={promptInstall}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-4"
                leftIcon={<Download className="h-3.5 w-3.5" />}
              >
                Install App
              </Button>
            </div>
          </div>
        </aside>
      )}
    </PwaContext.Provider>
  );
}
