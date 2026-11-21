import Image from "next/image";
import Link from "next/link";
import { Sentence } from "../sentence";
import type { DesignProps, FactResolution } from "../types";
import styles from "./ferry.module.css";

// An industrial "manifest": a hazard-striped split screen with the facts laid
// out like a shipping label.

const MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
const spoken = (d?: string) => {
  if (!d) return undefined;
  const [y, m] = d.split("-");
  return m ? `${MONTHS[+m - 1]} ${y}` : y;
};

export function Ferry({ res }: DesignProps<FactResolution>) {
  const since = spoken(res.fact.start);
  const until = res.fact.end && res.fact.end !== "unknown" ? spoken(res.fact.end) : undefined;

  return (
    <main className={styles.page}>
      <div className={styles.picture}>
        <Image
          src="/building/ferry.png"
          alt=""
          fill
          sizes="(min-width: 900px) 50vw, 100vw"
          className={styles.image}
          loading="eager"
          fetchPriority="high"
        />
      </div>

      <div className={styles.content}>
        <nav className={styles.nav}>
          <Link href="/">barney.is</Link>
          <Link href="/building">/building</Link>
        </nav>

        <div className={styles.stripe} aria-hidden />

        {!res.ok && (
          <p className={styles.claim}>
            <Sentence text={`~~${res.claim}~~`} />
          </p>
        )}
        <h1 className={styles.title}>
          <Sentence text={res.truth} />
        </h1>

        <p className={styles.lede}>Ferry is the applied AI laboratory for industrial operations.</p>

        <dl className={styles.manifest}>
          <div>
            <dt>role</dt>
            <dd>head of engineering &amp; forward deployed engineer</dd>
          </div>
          {since && (
            <div>
              <dt>{until ? "from" : "since"}</dt>
              <dd>{since}</dd>
            </div>
          )}
          {until && (
            <div>
              <dt>until</dt>
              <dd>{until}</dd>
            </div>
          )}
          <div>
            <dt>port</dt>
            <dd>
              <a href="https://www.deployferry.io/">deployferry.io ↗</a>
            </dd>
          </div>
        </dl>
      </div>
    </main>
  );
}
