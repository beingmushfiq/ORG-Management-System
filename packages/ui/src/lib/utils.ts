import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPaisaToBDT(amountPaisa: bigint | number, locale: "en" | "bn" = "en"): string {
  const bdt = Number(amountPaisa) / 100;
  if (locale === "bn") {
    // Bengali numeral formatting: e.g. ৳১,২৫০.০০
    return `৳${bdt.toLocaleString("bn-BD", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  return `৳${bdt.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
