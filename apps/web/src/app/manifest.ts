import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Road Safety Movement (নিরাপদ সড়ক আন্দোলন) — Institutional Operating System",
    short_name: "RSM App",
    description:
      "Transforming road transport into a safe, sustainable, and humane system for all. Volunteer brigades, black spot audits, membership registry, and digital money receipts.",
    start_url: "/portal",
    id: "/portal",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#0d3b25",
    theme_color: "#164e32",
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
        name: "Member Portal Dashboard",
        short_name: "Dashboard",
        description: "View membership standing, tasks, and credentials",
        url: "/portal",
        icons: [{ src: "/icons/icon-192x192.png", sizes: "192x192" }],
      },
      {
        name: "Field Missions & Tasks",
        short_name: "Field Tasks",
        description: "Report road hazards, audits, and earn activity points",
        url: "/portal/tasks",
        icons: [{ src: "/icons/icon-192x192.png", sizes: "192x192" }],
      },
      {
        name: "Contribution History & Receipts",
        short_name: "Receipts",
        description: "Monthly dues ledger and cryptographic money receipts",
        url: "/portal",
        icons: [{ src: "/icons/icon-192x192.png", sizes: "192x192" }],
      },
      {
        name: "Academy & Safety Training",
        short_name: "Academy",
        description: "LMS certifications and defensive driving modules",
        url: "/portal/certificates",
        icons: [{ src: "/icons/icon-192x192.png", sizes: "192x192" }],
      },
    ],
  };
}
