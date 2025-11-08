import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http", // Allow HTTP protocol for localhost
        hostname: "localhost",
        port: "5000", // Specify the port your local server is running on
      },
    ],
  },

  webpack: (config, { isServer }) => {
    // 👇 Add alias for @ to always point to /src
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": path.resolve(__dirname, "src"),
    };

    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

    // Handle Recharts compatibility issues
    config.module.rules.push({
      test: /\.m?js$/,
      resolve: {
        fullySpecified: false,
      },
    });

    return config;
  },

  transpilePackages: ["recharts"],

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // 👇 Fix for multi-folder setups (important for VPS)
  outputFileTracingRoot: path.join(__dirname, "../../"),
};

export default nextConfig;
