"use client";

import React, { useState, useEffect } from "react";
import { Shield, ChevronDown, Check } from "lucide-react";
import { apiClient } from "@/lib/api-client";

export interface PositionItem {
  id: string;
  title: string;
  titleBn?: string;
  branchName: string;
  isCentral: boolean;
}

export function RoleSelector() {
  const [positions, setPositions] = useState<PositionItem[]>([]);
  const [activePosition, setActivePosition] = useState<PositionItem | null>(null);
  const [userName, setUserName] = useState<string>("Member");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    apiClient.auth
      .getMe()
      .then((res) => {
        if (!isMounted) return;
        if (res?.user) {
          setUserName(res.user.fullName);
        }
        if (res?.positions && res.positions.length > 0) {
          const mapped: PositionItem[] = res.positions.map((p: any) => ({
            id: p.id,
            title: p.position?.name || "Member",
            titleBn: p.position?.nameBn || "সদস্য",
            branchName: p.branchNode?.name || "Central Secretariat",
            isCentral: p.position?.isCentralRole || false,
          }));
          setPositions(mapped);

          if (res.activePosition) {
            const current = mapped.find((m) => m.id === res.activePosition.id);
            setActivePosition(current || mapped[0] || null);
          } else {
            setActivePosition(mapped[0] || null);
          }
        } else {
          // Default Member position if no specific office held
          const defaultPos: PositionItem = {
            id: "general-member",
            title: "General Member",
            titleBn: "সাধারণ সদস্য",
            branchName: "Member Registry",
            isCentral: false,
          };
          setPositions([defaultPos]);
          setActivePosition(defaultPos);
        }
      })
      .catch(() => {
        // Fallback placeholder for guest or dev mode
        const defaultPos: PositionItem = {
          id: "member-pos",
          title: "Institutional Member",
          titleBn: "প্রাতিষ্ঠানিক সদস্য",
          branchName: "Central Council",
          isCentral: true,
        };
        setActivePosition(defaultPos);
        setPositions([defaultPos]);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSwitch = async (posId: string) => {
    if (posId === activePosition?.id) {
      setIsOpen(false);
      return;
    }

    setLoading(true);
    try {
      await apiClient.auth.switchPosition(posId);
      window.location.reload();
    } catch {
      setIsOpen(false);
    } finally {
      setLoading(false);
    }
  };

  if (!activePosition) {
    return null;
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={loading}
        className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg border border-border bg-muted/60 hover:bg-muted text-xs text-foreground transition-colors font-mono"
      >
        <Shield className="w-3.5 h-3.5 text-primary" />
        <div className="text-left">
          <div className="font-semibold text-foreground leading-none flex items-center gap-1">
            {activePosition.title}
            {activePosition.titleBn && (
              <span className="text-[10px] text-muted-foreground font-bangla">
                ({activePosition.titleBn})
              </span>
            )}
          </div>
          <div className="text-[10px] text-muted-foreground leading-none mt-0.5">
            {activePosition.branchName}
          </div>
        </div>
        <ChevronDown className="w-3 h-3 text-muted-foreground ml-1" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-72 rounded-lg border border-border bg-card p-1.5 shadow-xl z-50">
            <div className="px-2.5 py-1.5 border-b border-border mb-1">
              <p className="text-[11px] font-semibold text-foreground truncate">
                {userName}
              </p>
              <p className="text-[10px] text-muted-foreground font-mono">
                Assigned Executive Positions
              </p>
            </div>

            <div className="space-y-1">
              {positions.map((pos) => {
                const isSelected = pos.id === activePosition.id;
                return (
                  <button
                    key={pos.id}
                    onClick={() => handleSwitch(pos.id)}
                    className={`w-full text-left p-2 rounded-md transition-colors flex items-center justify-between text-xs ${
                      isSelected
                        ? "bg-primary text-primary-foreground font-medium"
                        : "hover:bg-muted text-foreground"
                    }`}
                  >
                    <div>
                      <div className="font-semibold leading-tight">
                        {pos.title}
                      </div>
                      <div
                        className={`text-[10px] ${
                          isSelected
                            ? "text-primary-foreground/80"
                            : "text-muted-foreground"
                        }`}
                      >
                        {pos.branchName}
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export { RoleSelector as ActiveRoleSelector };
