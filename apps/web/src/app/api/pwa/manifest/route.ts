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
      ? `নিরাপদ সড়ক আন্দোলন — ${branch} অপারেটিং সিস্টেম`
      : `Road Safety Movement (${branch}) — Institutional Operating System`,
    short_name: isBn ? "নিরাপদ সড়ক" : "RSM App",
    description: isBn
      ? "সবার জন্য নিরাপদ ও মানবিক সড়ক পরিবহন ব্যবস্থা গড়ে তোলার জাতীয় আন্দোলন।"
      : "Transforming road transport into a safe, sustainable, and humane system for all.",
    start_url: "/portal",
    id: "/portal",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: isDark ? "#061a10" : "#0d3b25",
    theme_color: isDark ? "#0d3b25" : "#164e32",
    categories: ["social-advocacy", "governance", "productivity", "education"],
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
        description: isBn ? "সদস্যপদ স্থিতি ও কার্যক্রম" : "View membership standing and tasks",
        url: "/portal",
        icons: [{ src: "/icons/icon-192x192.png", sizes: "192x192" }],
      },
      {
        name: isBn ? "মাঠপর্যায়ের দায়িত্ব ও রিপোর্ট" : "Field Tasks & Hazard Reports",
        short_name: isBn ? "মাঠ দায়িত্ব" : "Field Tasks",
        description: isBn ? "সড়ক নিরাপত্তা নিরীক্ষা" : "Submit road safety field audit reports",
        url: "/portal/tasks",
        icons: [{ src: "/icons/icon-192x192.png", sizes: "192x192" }],
      },
      {
        name: isBn ? "চাঁদা পরিশোধ ও মানি রিসিপ্ট" : "Contribution History & Receipts",
        short_name: isBn ? "রিসিপ্ট" : "Receipts",
        description: isBn ? "ডিজিটাল মানি রিসিপ্ট" : "Download cryptographic money receipts",
        url: "/portal",
        icons: [{ src: "/icons/icon-192x192.png", sizes: "192x192" }],
      },
    ],
  };

  return NextResponse.json(manifest, {
    headers: {
      "Content-Type": "application/manifest+json",
      "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400",
    },
  });
}
