import { entity, phrasingsOf, relatedTo, type Item } from "@/graph/compile.ts";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Sentence } from "../sentence";
import type { DesignProps } from "../types";
import { lookFor } from "./seed";
import styles from "./generative.module.css";

// The fallback design for any graph node without a hand-built page. The node's
// key seeds the composition, palette and typeface.
export function Generative({ res }: DesignProps) {
  const key =
    res.kind === "fact" ? `fact:${res.fact.id}` : res.kind === "entity" ? `entity:${res.entityId}` : `collection:${res.path}`;
  const look = lookFor(key);

  const headline =
    res.kind === "fact"
      ? res.truth
      : res.kind === "collection"
        ? res.label
        : `barney is ${String(res.frame.tokens[0]).replaceAll("-", " ")} ${entity(res.entityId)?.name ?? res.entityId}`;
  const items: Item[] = res.kind === "fact" ? relatedTo(res.fact) : res.items;
  const alsoSaid =
    res.kind === "fact" ? phrasingsOf(res.fact.id).filter((p) => p !== res.path && p !== res.canonical).slice(0, 6) : [];
  const external = res.kind === "fact" ? entity(res.fact.object)?.url : res.kind === "entity" ? entity(res.entityId)?.url : undefined;

  // Words for the compositions that set type word-by-word.
  const words = headline.replace(/~~.+?~~\s*/g, "").replace(/…$/, "").split(" ");

  return (
    <main className={styles.page} data-composition={look.composition} style={look.vars as CSSProperties}>
      <Link href="/" className={styles.home}>
        barney.is
      </Link>

      <h1 className={styles.headline}>
        {look.composition === "tiles" ? (
          words.map((w, i) => (
            <span key={i} className={styles.tile} style={{ background: `var(--g-ramp-${i % 6})` }}>
              {w}
            </span>
          ))
        ) : look.composition === "corner" ? (
          <>
            <span className={styles.lead}>{words.slice(0, -1).join(" ")}</span>
            <span className={styles.object}>{words.at(-1)}</span>
          </>
        ) : (
          <Sentence text={headline} />
        )}
      </h1>

      {res.kind === "fact" && (!res.ok || res.gloss) && (
        <p className={styles.correction}>
          {!res.ok && (
            <>
              you asked whether <Sentence text={`~~${res.claim}~~`} />. not quite.{" "}
            </>
          )}
          {res.gloss}
        </p>
      )}

      <div className={styles.aside}>
        {items.length > 0 && (
          <section>
            {res.kind === "fact" && <h2 className={styles.label}>also</h2>}
            <ul className={styles.list}>
              {items.map((i) => (
                <li key={i.fact.id}>
                  <Link href={`/${i.path}`}>
                    {/* Lists continue the headline's "barney is…", so drop the repeat. */}
                    {i.sentence.replace(/^barney (is |was |will be )?/, "")}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {alsoSaid.length > 0 && (
          <section>
            <h2 className={styles.label}>or, if you like</h2>
            <ul className={styles.list}>
              {alsoSaid.map((p) => (
                <li key={p}>
                  <Link href={`/${p}`}>/{p}</Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {external && (
          <p>
            <a href={external} className={styles.external}>
              {new URL(external).hostname.replace(/^www\./, "")} ↗
            </a>
          </p>
        )}
      </div>
    </main>
  );
}
