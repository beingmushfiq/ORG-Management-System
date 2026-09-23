import type { Metadata, Viewport } from "next";
import React, { Suspense } from "react";
import { Plus_Jakarta_Sans, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ToastProvider } from "@org/ui";
import { TopNavLoader } from "@/components/ui/top-nav-loader";
import { AccessibilityDock } from "@/components/ui/accessibility-dock";
import { PwaProvider } from "@/components/pwa/pwa-provider";

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

export const viewport: Viewport = {
  themeColor: "#164e32",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "Road Safety Movement (নিরাপদ সড়ক আন্দোলন) — Institutional Operating System",
    template: "%s | Road Safety Movement",
  },
  description:
    "Bangladesh's largest volunteer organization for road safety, established through the historic 2018 student-led Road Safety Movement. 9,010+ volunteers, 82 committees across 64 districts, crash registry, blackspot audits, and victim support fund.",
  keywords: [
    "Road Safety Movement",
    "নিরাপদ সড়ক আন্দোলন",
    "Safe Road Movement 2018",
    "Road Transport Act 2018",
    "Road Crash Prevention",
    "Black Spot Elimination",
    "Victim Support Fund",
    "Student Volunteer Brigade",
    "Highway Safety Bangladesh",
  ],
  authors: [
    { name: "Road Safety Movement National Secretariat", url: "https://www.roadsafetymovement.org" },
    { name: "DevCenterPoint", url: "https://devcenterpoint.com" },
  ],
  creator: "Road Safety Movement & DevCenterPoint",
  publisher: "Road Safety Movement",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "RSM App",
  },
  openGraph: {
    title: "Road Safety Movement (নিরাপদ সড়ক আন্দোলন) — Institutional Operating System",
    description:
      "Transforming road transport into a safe, sustainable, and humane system for all. 9,010+ volunteers across 82 committees.",
    url: "https://www.roadsafetymovement.org",
    siteName: "Road Safety Movement",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Road Safety Movement (নিরাপদ সড়ক আন্দোলন)",
    description:
      "Transforming road transport into a safe, sustainable, and humane system for all.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${hindSiliguri.variable}`} suppressHydrationWarning>
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

              {/* Road Safety Rapid Action & Accessibility Dock */}
              <AccessibilityDock />
            </ToastProvider>
          </PwaProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
