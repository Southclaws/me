import { entity } from "@/graph/compile.ts";
import Image from "next/image";
import Link from "next/link";
import type { CollectionResolution, DesignProps } from "../types";
import styles from "./building.module.css";

// An index, not a grid of cards: one huge row per thing, numbered, with the
// picture tucked to the side. The list itself comes from the graph, so when
// something stops being built it drops off here on its own.

const extras: Record<string, { image?: string; blurb: string }> = {
  storyden: {
    image: "/building/storyden.png",
    blurb:
      "A social knowledgebase platform for collecting, curating and sharing content. Inspired by bulletin boards of the retro web but under a fresh coat of paint.",
  },
  ferry: {
    image: "/building/ferry.png",
    blurb: "The applied AI laboratory for industrial operations. It's where I currently work.",
  },
  "barney-is": {
    blurb: "This website. Every URL is a sentence, and every sentence is checked against what's actually true.",
  },
};

const year = (d?: string) => d?.split("-")[0];

export function Building({ res }: DesignProps<CollectionResolution>) {
  const rows = [...res.items].sort((a, b) => (a.fact.start ?? "").localeCompare(b.fact.start ?? ""));

  return (
    <main className={styles.page}>
      <nav className={styles.nav}>
        <Link href="/">barney.is</Link>
      </nav>

      <h1 className={styles.title}>
        barney is <em>building</em>
      </h1>
      <p className={styles.sub}>
        always making things: open source, micro-startups, or pet projects to keep the skills sharp.
      </p>

      <ol className={styles.rows}>
        {rows.map((item, i) => {
          const e = entity(item.fact.object);
          const extra = extras[item.fact.object];
          return (
            <li key={item.fact.id} className={styles.row}>
              <span className={styles.index} aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className={styles.body}>
                <h2 className={styles.name}>
                  <Link href={`/${item.path}`}>{e.name}</Link>
                </h2>
                {extra && <p className={styles.blurb}>{extra.blurb}</p>}
                <p className={styles.meta}>
                  {year(item.fact.start) && <span>since {year(item.fact.start)}</span>}
                  {e.url && <a href={e.url}>{new URL(e.url).hostname.replace(/^www\./, "")} ↗</a>}
                </p>
              </div>
              {extra?.image && (
                <div className={styles.thumb}>
                  <Image src={extra.image} alt="" fill sizes="(min-width: 768px) 280px, 100vw" className={styles.img} />
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </main>
  );
}
