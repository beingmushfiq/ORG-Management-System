"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function TopNavLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // When path or search params change, simulate brief elegant progress bar completion
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 450);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  if (!loading) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[99999] h-[2.5px] bg-transparent pointer-events-none overflow-hidden">
      <div className="h-full bg-gradient-to-r from-amber-500 via-yellow-300 to-sky-400 animate-indeterminate-bar shadow-[0_0_10px_rgba(234,179,8,0.7)]" />
    </div>
  );
}
