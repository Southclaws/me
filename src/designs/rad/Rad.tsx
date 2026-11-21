import { Sentence } from "../sentence";
import type { DesignProps, FactResolution } from "../types";
import styles from "./rad.module.css";

// Deliberately timeless: what Rad is and how it is built, in the present
// tense. No status, no version, no roadmap, nothing that needs maintaining
// when the project moves on.

const choices = [
  {
    instead: "instead of SQL",
    title: "A relational IR",
    body: "The interface is an intermediate representation rather than a string of SQL. It is meant to be written by machines, so generated clients compile a transaction into a structured program and hand that over. SQL dialects and ORMs are frontends that target it, the way languages target LLVM.",
  },
  {
    instead: "instead of disks",
    title: "Object storage",
    body: "There is no on-disk format. Durability is a bucket, which means the query engine runs on stateless compute with nothing persistent underneath it. That trades raw speed for not having to think about infrastructure.",
  },
  {
    instead: "instead of drift",
    title: "The schema is in charge",
    body: "One schema file is the source of truth for tables, relations and indexes. Migrations are a diff against it, computed by the database itself, and generated clients are pinned to the schema they were built from so they refuse to run against a server that has moved on.",
  },
];

export function Rad({ res }: DesignProps<FactResolution>) {
  return (
    <main className={styles.page}>
      <a href="/" className={styles.home}>
        barney.is
      </a>

      <header className={styles.intro}>
        <h1 className={styles.headline}>
          <Sentence text={res.truth} />
        </h1>
        <p className={styles.tagline}>The relational database, redesigned.</p>
        <p className={styles.blurb}>
          Rad keeps the relational model, which is the good bit, and questions the assumption
          that the way you talk to it has to be SQL.
        </p>
      </header>

      <div className={styles.choices}>
        {choices.map((c) => (
          <section key={c.title} className={styles.choice}>
            <p className={styles.instead}>{c.instead}</p>
            <h2 className={styles.choiceTitle}>{c.title}</h2>
            <p className={styles.choiceBody}>{c.body}</p>
          </section>
        ))}
      </div>

      <section className={styles.scope}>
        <h2 className={styles.scopeTitle}>It does relational, and not much else.</h2>
        <p className={styles.scopeBody}>
          Joins, CTEs, parents and children that come back nested rather than flattened and
          rebuilt by hand. No graph traversal, no vectors, no pubsub. The server, the CLI, the
          devtools and the code generation are one binary.
        </p>
      </section>

      <a href="https://radengine.dev" className={styles.external}>
        radengine.dev ↗
      </a>
    </main>
  );
}
