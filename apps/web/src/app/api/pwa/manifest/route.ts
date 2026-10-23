import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const lang = searchParams.get("lang") || "en";
  const theme = searchParams.get("theme") || "light";
  const branch = searchParams.get("branch") || "National Secretariat";

  const isBn = lang === "bn";
  const isDark = theme === "dark";

  const manifest = {
    name: isBn
      ? `জাতীয় কৃষি অলিম্পিয়াড — ${branch} প্ল্যাটফর্ম`
      : `National Agricultural Olympiad (${branch}) — Institutional Platform`,
    short_name: isBn ? "কৃষি অলিম্পিয়াড" : "AgriOlympiad",
    description: isBn
      ? "টেকসই কৃষির রূপান্তরে তরুণ প্রজন্মের নেতৃত্ব ও উদ্ভাবন। ৬৪ জেলার ২৫,০০০+ শিক্ষার্থী।"
      : "Empowering youth to shape a sustainable future for Bangladesh agriculture. Trade License: 03247/2023-2025.",
    start_url: "/portal",
    id: "/portal",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: isDark ? "#061a10" : "#0d3b25",
    theme_color: isDark ? "#0d3b25" : "#0f5132",
    categories: ["education", "agriculture", "governance", "productivity"],
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: isBn ? "সদস্য পোর্টাল ড্যাশবোর্ড" : "Member Portal Dashboard",
        short_name: isBn ? "ড্যাশবোর্ড" : "Dashboard",
        description: isBn
          ? "সদস্যপদ স্থিতি, কাজ ও সার্টিফিকেট দেখুন"
          : "View registration standing, examination schedule, and credentials",
        url: "/portal",
        icons: [{ src: "/icons/icon-192x192.png", sizes: "192x192" }],
      },
      {
        name: isBn ? "ডিজিটাল প্রবেশপত্র" : "Olympiad E-Admit Cards",
        short_name: isBn ? "প্রবেশপত্র" : "Admit Cards",
        description: isBn ? "প্রবেশপত্র ও সার্টিফিকেট ডাউনলোড করুন" : "Download verified E-Admit Cards and Certificates",
        url: "/portal/certificates",
        icons: [{ src: "/icons/icon-192x192.png", sizes: "192x192" }],
      },
      {
        name: isBn ? "এগ্রো-স্কিল কোর্সসমূহ (বিডিটি)" : "Agri-Skill Courses (BDT)",
        short_name: isBn ? "কোর্স" : "Courses",
        description: isBn ? "স্মার্ট কৃষি ও হাইড্রোপনিক্স কোর্স দেখুন" : "Explore smart agriculture and hydroponics courses",
        url: "/courses",
        icons: [{ src: "/icons/icon-192x192.png", sizes: "192x192" }],
      },
    ],
  };

  return NextResponse.json(manifest, {
    headers: {
      "Content-Type": "application/manifest+json; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
