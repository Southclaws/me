import { entity } from "@/graph/compile.ts";
import Link from "next/link";
import { Sentence } from "../sentence";
import type { CollectionResolution, DesignProps } from "../types";
import styles from "./working.module.css";

// /working holds one job at a time, so the generated collection layout left it
// looking like an empty list. This leads with the job itself and treats
// anything else as a footnote.

const MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

function since(start?: string) {
  if (!start) return undefined;
  const [y, m] = start.split("-");
  return m ? `since ${MONTHS[Number(m) - 1]} ${y}` : `since ${y}`;
}

export function Working({ res }: DesignProps<CollectionResolution>) {
  const [current, ...rest] = res.items;

  if (!current) {
    return (
      <main className={styles.page}>
        <Link href="/" className={styles.home}>
          barney.is
        </Link>
        <h1 className={styles.headline}>barney isn&apos;t working.</h1>
        <p className={styles.note}>Not right now, anyway.</p>
      </main>
    );
  }

  const place = entity(current.fact.object);

  return (
    <main className={styles.page}>
      <Link href="/" className={styles.home}>
        barney.is
      </Link>

      <header className={styles.lead}>
        <h1 className={styles.headline}>
          <Sentence text={current.sentence} />
        </h1>
        {since(current.fact.start) && <p className={styles.since}>{since(current.fact.start)}</p>}
      </header>

      {current.fact.note && <p className={styles.note}>{current.fact.note}</p>}

      <div className={styles.links}>
        <Link href={`/${current.path}`} className={styles.more}>
          more about {place?.name ?? current.fact.object} →
        </Link>
        {place?.url && (
          <a href={place.url} className={styles.external}>
            {new URL(place.url).hostname.replace(/^www\./, "")} ↗
          </a>
        )}
      </div>

      {rest.length > 0 && (
        <section className={styles.also}>
          {rest.map((i) => (
            <Link key={i.fact.id} href={`/${i.path}`} className={styles.alsoLink}>
              {i.sentence.replace(/^barney (is |was )?/, "")}
            </Link>
          ))}
        </section>
      )}
    </main>
  );
}
