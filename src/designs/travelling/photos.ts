import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

// Photos are found on disk rather than listed in code, so adding one is just
// dropping a file into public/travelling named after the country's slug.
// Server-side only: this is read while rendering, never shipped to the browser.

const DIR = join(process.cwd(), "public", "travelling");
const EXTS = [".jpg", ".jpeg", ".png", ".webp", ".avif"];

function read(): Record<string, string> {
  if (!existsSync(DIR)) return {};
  const found: Record<string, string> = {};
  for (const file of readdirSync(DIR)) {
    const dot = file.lastIndexOf(".");
    if (dot < 1) continue;
    const ext = file.slice(dot).toLowerCase();
    if (!EXTS.includes(ext)) continue;
    found[file.slice(0, dot).toLowerCase()] = `/travelling/${file}`;
  }
  return found;
}

// Cached for the life of the process in production, where a new photo arrives
// with a deploy anyway. In development it is read every time, so dropping a
// file in shows up on the next refresh instead of needing a restart.
let cache: Record<string, string> | undefined;

export function photoFor(slug: string): string | undefined {
  if (process.env.NODE_ENV !== "production") return read()[slug];
  cache ??= read();
  return cache[slug];
}
