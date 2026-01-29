/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";
import path from "path";

/** @type {import("next").NextConfig} */
const config = {
  output: 'standalone',  // Must be enabled for Docker production deployment
  outputFileTracingRoot: path.join(process.cwd()),
  
  async rewrites() {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
    return [
      {
        source: "/api/:path*",
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
  webpack: (cfg) => {
    cfg.externals = cfg.externals || [];
    cfg.externals.push("pino-pretty", "lokijs", "encoding");
    
    cfg.resolve.fallback = {
      ...cfg.resolve.fallback,
      "@react-native-async-storage/async-storage": false,
    };
    
    return cfg;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    unoptimized: true,  // Disable image optimization to avoid cache permission issues
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default config;
