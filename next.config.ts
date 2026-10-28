import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pv0smzkc-8000.inc1.devtunnels.ms",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "*.devtunnels.ms",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "tgg4qp85-8000.inc1.devtunnels.ms",
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
