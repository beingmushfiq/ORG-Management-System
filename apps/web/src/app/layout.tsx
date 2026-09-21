import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  themeColor: "#020617",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "Bangladesh Medical Association (BMA) — Institutional Operating System",
    template: "%s | Bangladesh Medical Association",
  },
  description:
    "Apex statutory representative body for medical practitioners in Bangladesh. Digital membership registry, peer-reviewed medical journal, 64-district branch atlas, CPD accreditation, and fast-track member concierge desk.",
  keywords: [
    "Bangladesh Medical Association",
    "BMA",
    "BMDC",
    "Doctor Registry",
    "Medical Journal",
    "Physician Welfare",
    "Societies Registration Act 1860",
    "Continuing Medical Education",
    "Certificate of Good Standing",
  ],
  authors: [
    { name: "DevCenterPoint", url: "https://devcenterpoint.com" },
    { name: "Central Secretariat, Bangladesh Medical Association" },
  ],
  creator: "DevCenterPoint (https://devcenterpoint.com)",
  publisher: "Bangladesh Medical Association & DevCenterPoint",
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
  openGraph: {
    title: "Bangladesh Medical Association (BMA) — Institutional Operating System",
    description:
      "Apex statutory representative body for medical practitioners in Bangladesh. Governance, registry, and physician welfare across 64 districts.",
    url: "https://bma.org.bd",
    siteName: "Bangladesh Medical Association",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bangladesh Medical Association (BMA)",
    description:
      "Apex statutory representative body for medical practitioners in Bangladesh.",
  },
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
