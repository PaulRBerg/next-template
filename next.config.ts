import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  compress: true,
  // ISR cache duration (stale-while-revalidate)
  expireTime: 3600, // 1 hour
  // Image optimization
  images: {
    formats: ["image/webp"],
    minimumCacheTTL: 14400, // 4 hours
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
  poweredByHeader: false,
  reactCompiler: true,
  reactStrictMode: true,
};

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

export default withNextIntl(nextConfig);
