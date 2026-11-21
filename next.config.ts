import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // The stylesheet is small; inlining it removes the render-blocking
    // request from the critical path.
    inlineCss: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Project artwork shown on the cards is hotlinked from these hosts.
    remotePatterns: [
      { protocol: "https", hostname: "www.storyden.org" },
      { protocol: "https", hostname: "assets-global.website-files.com" },
      { protocol: "https", hostname: "scavengesurvive.com" },
      { protocol: "https", hostname: "mir-s3-cdn-cf.behance.net" },
      { protocol: "https", hostname: "framerusercontent.com" },
    ],
  },
};

export default nextConfig;
