import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@org/ui", "@org/database", "three"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
