import { entity, resolve } from "@/graph/compile.ts";
import { flags } from "./flags";
import { photoFor } from "./photos";

/**
 * A handful of trips chosen by the day of the week, so a visitor sees a
 * different few depending on when they turn up rather than the whole list at
 * once. Shared by the front page and /travelling so both agree on the day.
 */
export function dailyTravelling(count: number) {
  const res = resolve("travelling");
  const order = res.kind === "collection" ? [...res.items] : [];

  // Deterministic shuffle: same day, same picks.
  let seed = (new Date().getUTCDay() + 1) * 2654435761;
  for (let i = order.length - 1; i > 0; i--) {
    seed = (seed * 16807) % 2147483647;
    const j = seed % (i + 1);
    [order[i], order[j]] = [order[j], order[i]];
  }

  return order.slice(0, count).map((item) => ({
    path: item.path,
    slug: item.fact.object,
    name: entity(item.fact.object)?.name ?? item.fact.object,
    // A real photo wins; the flag is what shows until there is one.
    image: photoFor(item.fact.object),
    flag: flags[item.fact.object],
  }));
}
