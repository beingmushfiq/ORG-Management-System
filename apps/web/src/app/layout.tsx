import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali"],
  variable: "--font-bangla",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Organization Operating System — Flagship Multi-Tenant Platform",
  description:
    "Enterprise Organization Management SaaS for Institutional Bodies, Professional Syndicates, and Alumni Foundations.",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${hindSiliguri.variable} dark`}>
      <body className="font-sans antialiased min-h-screen relative selection:bg-primary/30 selection:text-white">
        {/* Subtle Ambient Grain Texture */}
        <div className="fixed inset-0 pointer-events-none z-50 grain-overlay" />

        {/* Momentum Inertia Smooth Scroll */}
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
