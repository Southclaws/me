import Image from "next/image";
import type { ReactNode } from "react";
import Link from "next/link";
import { entitySentence } from "@/graph/compile.ts";
import type { DesignProps, EntityResolution } from "../types";
import styles from "./story.module.css";

// The story of Storyden, as barney wrote it: big sticky years on the left,
// the chapters on the right, each one's screenshots in a filmstrip you can
// swipe through. Reached from /looking-back-on/storyden and the other
// reminiscing phrasings. What Storyden *is* lives at /building/storyden.

type Shot = { src: string; width: number; height: number };

const chapters: { year: string; title: string; body: ReactNode; shots: Shot[] }[] = [
  {
    year: "2021",
    title: "birth",
    body: (
      <>
        <p>
          Storyden started life as a forum built in to the <a href="https://open.mp">open.mp</a> website.
        </p>
        <p>We were tired of dealing with ancient, awkward and slow forum software like myBB, IPB, Discourse, etc...</p>
        <p>
          So I started to build one from scratch, it didn&apos;t seem that hard since we already had a login system and
          a users table etc. what else was there? posts? categories? a few APIs?
        </p>
      </>
    ),
    shots: [
      { src: "/2024-02-18-15-22-11.png", width: 2876, height: 1386 },
      { src: "/2024-02-18-15-28-00.png", width: 1066, height: 424 },
      { src: "/2024-02-18-15-28-41.png", width: 1964, height: 1582 },
      { src: "/2024-02-18-15-29-38.png", width: 1678, height: 796 },
      { src: "/2024-02-18-15-30-24.png", width: 2604, height: 1072 },
    ],
  },
  {
    year: "2022",
    title: "refinement",
    body: (
      <>
        <p>Suddenly I realised there was a bit of a gap in the market for something fresh and modern.</p>
        <p>
          So perhaps it would be fun project to refine my full stack skills since I&apos;d recently joined Odin as the
          first senior engineering hire to build out their technical infrastructure and team while we migrated off an
          MVP system to a future-proof setup.
        </p>
        <p>
          This meant thinking about the design, spending a lot of time in Figma and also discussing the direction of
          the product with friends and members of my Discord communities.
        </p>
        <p>Lots of experimentation happened, it was a fun process!</p>
      </>
    ),
    shots: [
      { src: "/2024-02-18-15-38-45.png", width: 1750, height: 1216 },
      { src: "/2024-02-18-15-39-45.png", width: 2706, height: 848 },
      { src: "/2024-02-18-15-40-40.png", width: 2394, height: 1448 },
      { src: "/2024-02-18-15-43-17.png", width: 794, height: 984 },
    ],
  },
  {
    year: "2023+",
    title: "focus",
    body: (
      <>
        <p>
          This is when I started to realise there could be something really valuable in this exploration. Not just a
          forum but something larger.
        </p>
        <p>
          I wrote about this more{" "}
          <a href="https://www.storyden.org/blog/building-running-administrating-modern-forum-software">here</a>.
        </p>
        <p>
          And the rest is history, the project became a product. Branding was refreshed, a strategy started to emerge
          and I decided to double down on building something ambitious.
        </p>
      </>
    ),
    shots: [],
  },
];

export function Story({ res }: DesignProps<EntityResolution>) {

  return (
    <main className={styles.page}>
      <nav className={styles.nav}>
        <Link href="/">barney.is</Link>
      </nav>

      <header className={styles.hero}>
        <h1 className={styles.title}>
          {entitySentence(res.entityId, res.frame)}
        </h1>
        <p className={styles.intro}>
          How it started, and how it got here. What it actually is these days is{" "}
          <Link href="/building/storyden">over here</Link>.
        </p>
      </header>

      {chapters.map((c, ci) => (
        <section key={c.year} className={styles.chapter} aria-labelledby={`chapter-${c.year}`}>
          <div className={styles.year} aria-hidden>
            {c.year}
          </div>
          <div className={styles.story}>
            <h2 id={`chapter-${c.year}`} className={styles.chapterTitle}>
              {c.title}, {c.year}
            </h2>
            {c.body}
          </div>
          {c.shots.length > 0 && (
            <div className={styles.strip} tabIndex={0} aria-label={`screenshots from ${c.year}`}>
              {c.shots.map((s, si) => (
                <Image
                  key={s.src}
                  className={styles.shot}
                  src={s.src}
                  alt={`Storyden in ${c.year}, screenshot ${si + 1}`}
                  width={s.width}
                  height={s.height}
                  sizes="(min-width: 768px) 60vw, 85vw"
                  {...(ci === 0 && si === 0 ? { loading: "eager" as const, fetchPriority: "high" as const } : {})}
                />
              ))}
            </div>
          )}
        </section>
      ))}

      <footer className={styles.footer}>
        <Link href="/building/storyden">barney is building Storyden →</Link>
        <a href="https://www.storyden.org/">storyden.org ↗</a>
      </footer>
    </main>
  );
}
