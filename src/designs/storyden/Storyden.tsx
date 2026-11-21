import Link from "next/link";
import { Sentence } from "../sentence";
import type { DesignProps, FactResolution } from "../types";
import styles from "./storyden.module.css";

// What Storyden is, in the present tense, written to stay true without edits.
// No version, no status, no roadmap, no counts. The story of how it got here
// is a separate page: /looking-back-on/storyden.

const halves = [
  {
    name: "Discussions",
    body: "A forum, in the ordinary sense. Chronological, conversational, threaded, with the moderation tools you would expect to find.",
  },
  {
    name: "The Library",
    body: "A tree of pages. Each one carries rich text, typed properties, files and images, and links to its parents and children. Pages can be drafted before they are published, submitted for review, and gathered into tables by their properties. Threads cite pages, pages link back to threads.",
  },
];

const values = [
  {
    name: "Simplicity",
    body: "Sane defaults and no dependencies to speak of. A real deployment runs on SQLite and the filesystem; Postgres, object storage, mail and OAuth are there if you want them and ignorable if you do not.",
  },
  {
    name: "Privacy",
    body: "No data leaves your installation. There is no cookie banner because there is nothing to warn you about, and signing in with an email address is a choice rather than a toll.",
  },
  {
    name: "Ownership",
    body: "It runs anywhere containers do, which means your own hardware if that is what you want. Your community, your box, your name on the door.",
  },
];

export function Storyden({ res }: DesignProps<FactResolution>) {
  return (
    <main className={styles.page}>
      <nav className={styles.nav}>
        <Link href="/">barney.is</Link>
      </nav>

      <header className={styles.hero}>
        {!res.ok && (
          <p className={styles.claim}>
            <Sentence text={`~~${res.claim}~~`} />
          </p>
        )}
        <h1 className={styles.title}>
          <Sentence text={res.truth} />
        </h1>
        <p className={styles.intro}>
          A home for a community and the things it knows. Part forum, part wiki, open source, and
          yours to run.
        </p>
      </header>

      <div className={styles.halves}>
        {halves.map((h) => (
          <section key={h.name} className={styles.half}>
            <h2 className={styles.halfName}>{h.name}</h2>
            <p className={styles.halfBody}>{h.body}</p>
          </section>
        ))}
      </div>

      <p className={styles.aside}>
        Somewhere between a chat server where everything scrolls away and a wiki nobody wants to
        edit. Conversation is where things are worked out; the library is where what was worked
        out gets to stay.
      </p>

      <div className={styles.values}>
        {values.map((v) => (
          <section key={v.name} className={styles.value}>
            <h2 className={styles.valueName}>{v.name}</h2>
            <p className={styles.valueBody}>{v.body}</p>
          </section>
        ))}
      </div>

      <section className={styles.not}>
        <h2 className={styles.notTitle}>What it is not.</h2>
        <p className={styles.notBody}>
          Not a help desk, not a customer support platform, not a headless CMS. It is built for
          people who are in a thing together, not for teams filing tickets. AI assistance is
          there if it is configured, and it is never a condition of joining in.
        </p>
      </section>

      {/* Linked as the sentence, not the path: "barney.is" followed by a path
          reads as the URL you are already on. */}
      <footer className={styles.footer}>
        <Link href="/looking-back-on/storyden">barney is looking back on Storyden →</Link>
        <a href="https://www.storyden.org/">storyden.org ↗</a>
      </footer>
    </main>
  );
}
