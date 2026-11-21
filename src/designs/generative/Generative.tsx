import { entity, entitySentence, relatedTo, type Item } from "@/graph/compile.ts";
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
        : entitySentence(res.entityId, res.frame);
  const items: Item[] = res.kind === "fact" ? relatedTo(res.fact) : res.items;
  const external = res.kind === "fact" ? entity(res.fact.object)?.url : res.kind === "entity" ? entity(res.entityId)?.url : undefined;
  const note = res.kind === "fact" ? res.fact.note : undefined;

  // Words for the compositions that set type word-by-word.
  const clean = headline.replace(/~~.+?~~\s*/g, "").replace(/…$/, "").trim();
  const words = clean.split(" ");

  // The "corner" composition sets the thing being talked about at giant size.
  // That's the entity's whole name, not the last word: "London Gophers", not
  // "Gophers". Falls back to the last word when the name isn't on the end.
  const subject = res.kind === "fact" ? entity(res.fact.object)?.name : res.kind === "entity" ? entity(res.entityId)?.name : undefined;
  const big = subject && clean.endsWith(subject) ? subject : words.at(-1)!;
  const lead = clean.slice(0, clean.length - big.length).trim();

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
            <span className={styles.lead}>{lead}</span>
            <span className={styles.object}>{big}</span>
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

      {note && <p className={styles.note}>{note}</p>}

      <div className={styles.aside}>
        {/* On a fact page, a couple of quiet links so the rest of the site gets
            stumbled on rather than browsed. A collection page is a hub, though,
            so it lists what it holds. */}
        <div className={styles.strays}>
          {(res.kind === "fact" ? items.slice(0, 2) : items).map((i) => (
            <Link key={i.fact.id} href={`/${i.path}`} className={styles.stray}>
              {i.sentence.replace(/^barney (is |was |will be )?/, "")}
            </Link>
          ))}
        </div>

        {external && (
          <a href={external} className={styles.external}>
            {new URL(external).hostname.replace(/^www\./, "")} ↗
          </a>
        )}
      </div>
    </main>
  );
}
