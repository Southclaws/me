import { Card } from "@/app/components/Card/Card";
import type { DesignProps, CollectionResolution } from "../types";
import { dailyTravelling } from "./daily";
import styles from "./travelling.module.css";

// A custom page rather than the generated collection layout, so there's room
// to grow: a map, a counter, stamps, whatever comes next.
export function Travelling(_: DesignProps<CollectionResolution>) {
  const picks = dailyTravelling(5);

  return (
    <main className={styles.page}>
      <a href="/" className={styles.home}>
        barney.is
      </a>

      <header className={styles.intro}>
        <h1 className={styles.headline}>barney is travelling…</h1>
        <p className={styles.blurb}>
          Not all at once, and not right now. Here are a few of the places. Come back another
          day and it will be a different few.
        </p>
      </header>

      <div className={styles.cards}>
        {picks.map((p, i) => (
          <Card
            key={p.path}
            title={p.name}
            image={p.image}
            flag={p.flag}
            verb="back-from"
            noun={p.slug}
            layout={i % 2 === 0 ? "left" : "right"}
          />
        ))}
      </div>
    </main>
  );
}
