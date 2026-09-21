"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Info,
  X,
  Sparkles,
} from "lucide-react";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  titleBn?: string | undefined;
  description?: string | undefined;
  descriptionBn?: string | undefined;
  duration?: number | undefined;
}

interface ToastContextType {
  toasts: ToastItem[];
  showToast: (toast: Omit<ToastItem, "id">) => string;
  dismissToast: (id: string) => void;
  success: (title: string, description?: string, options?: Partial<ToastItem>) => string;
  error: (title: string, description?: string, options?: Partial<ToastItem>) => string;
  warning: (title: string, description?: string, options?: Partial<ToastItem>) => string;
  info: (title: string, description?: string, options?: Partial<ToastItem>) => string;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (item: Omit<ToastItem, "id">) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      const duration = item.duration ?? 4500;

      setToasts((prev) => [...prev, { ...item, id }]);

      if (duration > 0 && typeof window !== "undefined") {
        window.setTimeout(() => {
          dismissToast(id);
        }, duration);
      }

      return id;
    },
    [dismissToast]
  );

  const success = useCallback(
    (title: string, description?: string, options?: Partial<ToastItem>) =>
      showToast({
        type: "success",
        title,
        ...(description !== undefined ? { description } : {}),
        ...options,
      }),
    [showToast]
  );

  const error = useCallback(
    (title: string, description?: string, options?: Partial<ToastItem>) =>
      showToast({
        type: "error",
        title,
        ...(description !== undefined ? { description } : {}),
        ...options,
      }),
    [showToast]
  );

  const warning = useCallback(
    (title: string, description?: string, options?: Partial<ToastItem>) =>
      showToast({
        type: "warning",
        title,
        ...(description !== undefined ? { description } : {}),
        ...options,
      }),
    [showToast]
  );

  const info = useCallback(
    (title: string, description?: string, options?: Partial<ToastItem>) =>
      showToast({
        type: "info",
        title,
        ...(description !== undefined ? { description } : {}),
        ...options,
      }),
    [showToast]
  );

  return (
    <ToastContext.Provider
      value={{ toasts, showToast, dismissToast, success, error, warning, info }}
    >
      {children}
      <Toaster />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export function Toaster() {
  const context = useContext(ToastContext);
  if (!context) return null;

  const { toasts, dismissToast } = context;

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-label="Notifications"
      className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none p-4"
    >
      {toasts.map((toast) => {
        const icons = {
          success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />,
          error: <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />,
          warning: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />,
          info: <Info className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />,
        };

        const borderColors = {
          success: "border-emerald-500/30 hover:border-emerald-500/50 shadow-emerald-500/10",
          error: "border-red-500/30 hover:border-red-500/50 shadow-red-500/10",
          warning: "border-amber-500/30 hover:border-amber-500/50 shadow-amber-500/10",
          info: "border-sky-500/30 hover:border-sky-500/50 shadow-sky-500/10",
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto rounded-2xl bg-slate-950/95 border ${borderColors[toast.type]} p-4 shadow-2xl backdrop-blur-2xl transition-all duration-300 transform translate-y-0 opacity-100 flex items-start gap-3 text-white`}
          >
            {icons[toast.type]}

            <div className="flex-1 min-w-0 pr-1">
              <div className="flex items-center gap-1.5 font-bold text-sm leading-tight text-slate-100">
                <span>{toast.title}</span>
                {toast.type === "success" && (
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                )}
              </div>
              {toast.titleBn && (
                <div className="text-[11px] text-slate-400 font-bangla mt-0.5">
                  {toast.titleBn}
                </div>
              )}
              {toast.description && (
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {toast.description}
                </p>
              )}
              {toast.descriptionBn && (
                <p className="text-[11px] text-slate-400 font-bangla mt-0.5">
                  {toast.descriptionBn}
                </p>
              )}
            </div>

            <button
              onClick={() => dismissToast(toast.id)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors shrink-0"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
