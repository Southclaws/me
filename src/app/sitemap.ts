import { sitemapPaths } from "@/graph/compile.ts";
import type { MetadataRoute } from "next";

const base = "https://barney.is";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = [
    "/",
    "/experienced",
    "/capturing",
    "/capturing/city-of-london",
    "/capturing/iceland",
    // One canonical phrasing per graph fact, plus the hubs. Aliases point
    // their rel=canonical here, so they stay out.
    ...sitemapPaths().map((p) => `/${p}`),
  ];

  return [...new Set(pages)].map((path) => ({ url: new URL(path, base).href }));
}
