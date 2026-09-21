import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@org/ui", "@org/database"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:4000/api/:path*",
      },
    ];
  },
};

export default nextConfig;
