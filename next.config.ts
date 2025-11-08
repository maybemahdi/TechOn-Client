// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
      },
    ],
  },
  experimental: {
    reactCompiler: true,
  },

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.watchOptions = {
        ignored: [
          "**/node_modules/**",
          "**/.git/**",
          "**/.next/**",
          "**/coverage/**",
          "**/dist/**",
          "**/build/**",
        ],
      };
    }
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
