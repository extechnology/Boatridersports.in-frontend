import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "server.boatridersports.in",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "server.boatridersports.in",
        pathname: "/media/**",
      },
    ],
  },
};

export default nextConfig;