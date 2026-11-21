import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // The stylesheet is small; inlining it removes the render-blocking
    // request from the critical path.
    inlineCss: true,
  },
  // The CV moved to a sentence: "barney is experienced".
  async redirects() {
    return [{ source: "/cv", destination: "/experienced", permanent: true }];
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
