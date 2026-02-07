import type { NextConfig } from "next";

const isDevelopment = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  compiler: {
    removeConsole: !isDevelopment,
  },
  compress: true,
  experimental: {
    turbopackFileSystemCacheForBuild: true,
  },
  // ISR cache duration (stale-while-revalidate)
  expireTime: 3600, // 1 hour
  // Image optimization
  images: {
    formats: ["image/webp"],
    minimumCacheTTL: 14_400, // 4 hours
    remotePatterns: [
      // Whitelist external domains for Next.js Image optimization
      // Required for images from CDNs, CMSs, or third-party services
      // Use "**" prefix for all subdomains (e.g., "**.example.com")
      // {
      //   protocol: "https",
      //   hostname: "**.example.com",
      // },
    ],
  },
  logging: {
    fetches: {
      fullUrl: isDevelopment,
      hmrRefreshes: isDevelopment,
    },
  },
  poweredByHeader: false,
  reactCompiler: true,
  reactStrictMode: true,
  typedRoutes: true,
};

export default nextConfig;
