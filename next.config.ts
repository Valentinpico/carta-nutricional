import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // next.config.js

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
