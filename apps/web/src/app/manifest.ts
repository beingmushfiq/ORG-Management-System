import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "National Agricultural Olympiad (জাতীয় কৃষি অলিম্পিয়াড)",
    short_name: "AgriOlympiad",
    description:
      "Empowering youth to shape a sustainable future for Bangladesh agriculture. 25,000+ participants across 64 districts. Trade License: 03247/2023-2025.",
    start_url: "/portal",
    id: "/portal",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#0d3b25",
    theme_color: "#0f5132",
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
        name: "Member Portal Dashboard",
        short_name: "Dashboard",
        description: "View registration standing, examination schedule, and credentials",
        url: "/portal",
        icons: [{ src: "/icons/icon-192x192.png", sizes: "192x192" }],
      },
      {
        name: "Olympiad E-Admit Cards",
        short_name: "Admit Cards",
        description: "Download verified E-Admit Cards and Certificates",
        url: "/portal/certificates",
        icons: [{ src: "/icons/icon-192x192.png", sizes: "192x192" }],
      },
      {
        name: "Agri-Skill Courses (BDT)",
        short_name: "Courses",
        description: "Explore smart agriculture and hydroponics courses",
        url: "/courses",
        icons: [{ src: "/icons/icon-192x192.png", sizes: "192x192" }],
      },
    ],
  };
}
