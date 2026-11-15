import { listContent } from "@/content/content";
import type { MetadataRoute } from "next";

const base = "https://barney.is";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await listContent();

  const pages = [
    "/",
    "/cv",
    "/capturing",
    "/capturing/city-of-london",
    "/capturing/iceland",
    ...content.map(({ verb, noun }) =>
      noun === "index" ? `/${verb}` : `/${verb}/${noun}`
    ),
  ];

  return pages.map((path) => ({ url: new URL(path, base).href }));
}
