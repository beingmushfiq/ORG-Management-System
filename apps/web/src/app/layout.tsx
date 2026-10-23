import type { Metadata, Viewport } from "next";
import React, { Suspense } from "react";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ToastProvider } from "@org/ui";
import { TopNavLoader } from "@/components/ui/top-nav-loader";
import { AccessibilityDock } from "@/components/ui/accessibility-dock";
import { PwaProvider } from "@/components/pwa/pwa-provider";

export const viewport: Viewport = {
  themeColor: "#0f5132",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "National Agricultural Olympiad (জাতীয় কৃষি অলিম্পিয়াড) — Official Platform",
    template: "%s | National Agricultural Olympiad",
  },
  description:
    "Empowering youth to shape a sustainable future for Bangladesh agriculture. Join the National Agricultural Olympiad 2025 Season 2 & 3 across all 64 districts. Trade License: 03247/2023-2025.",
  keywords: [
    "National Agricultural Olympiad",
    "জাতীয় কৃষি অলিম্পিয়াড",
    "Bangladesh Agricultural Olympiad",
    "Smart Agriculture",
    "Youth Leadership",
    "Climate Resilient Farming",
    "Agricultural Olympiad 2025",
    "BAU Mymensingh",
  ],
  authors: [
    { name: "National Agricultural Olympiad Secretariat", url: "https://agriculturalolympiad.com" },
    { name: "DevCenterPoint", url: "https://devcenterpoint.com" },
  ],
  creator: "National Agricultural Olympiad",
  publisher: "National Agricultural Olympiad",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
  },
  openGraph: {
    title: "National Agricultural Olympiad (জাতীয় কৃষি অলিম্পিয়াড)",
    description:
      "Empowering youth to shape a sustainable future for Bangladesh agriculture. All 64 districts participating.",
    url: "https://agriculturalolympiad.com",
    siteName: "National Agricultural Olympiad",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "National Agricultural Olympiad (জাতীয় কৃষি অলিম্পিয়াড)",
    description:
      "Empowering youth to shape a sustainable future for Bangladesh agriculture.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased min-h-screen relative selection:bg-amber-500/30 selection:text-foreground">
        <ThemeProvider defaultTheme="light" storageKey="rsm-ui-theme">
          <PwaProvider>
            <ToastProvider>
              {/* Razor-thin Top Bar Navigation Loader */}
              <Suspense fallback={null}>
                <TopNavLoader />
              </Suspense>

              {/* Momentum Inertia Smooth Scroll */}
              <SmoothScrollProvider>{children}</SmoothScrollProvider>

              {/* National Agricultural Olympiad Support & Accessibility Dock */}
              <AccessibilityDock />
            </ToastProvider>
          </PwaProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
