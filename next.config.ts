import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // The stylesheet is small; inlining it removes the render-blocking
    // request from the critical path.
    inlineCss: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
