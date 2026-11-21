import { Sentence } from "../sentence";
import type { DesignProps, FactResolution } from "../types";
import styles from "./tools.module.css";

// Hand-picked rather than pulled from the graph: these are small enough that a
// fact each would drown out the things that matter. Add one by adding a line.
const tools = [
  {
    name: "fault",
    url: "https://github.com/Southclaws/fault",
    blurb: "Go errors but structured and composable, without giving up on the stdlib's interfaces.",
  },
  {
    name: "schemancer",
    url: "https://github.com/Southclaws/schemancer",
    blurb: "Transmutes JSON Schemas into classes, structs or types for whichever language you are stuck in.",
  },
  {
    name: "opcuacli",
    url: "https://github.com/Southclaws/opcuacli",
    blurb: "A command line tool for humans and agents to explore OPC UA servers: find tags, watch them, inspect datatypes.",
  },
  {
    name: "oauthcli",
    url: "https://github.com/Southclaws/oauthcli",
    blurb: "For checking, testing and verifying what an OAuth 2.1 authorisation server actually supports.",
  },
  {
    name: "roboticon",
    url: "https://southclaws.github.io/roboticon/",
    blurb: "Cute lil avatars for clankers.",
  },
  {
    name: "sleep on my flight",
    url: "https://www.sleeponmyflight.com/",
    blurb:
      "Uses actual sleep research to work out whether you should sleep on a long flight, going off the departure and arrival times, the time difference, and how much daylight you gain or lose. I built it just before a three month trip that turned out to be twelve countries of two hour hops, so I never once used it.",
  },
];

export function Tools({ res }: DesignProps<FactResolution>) {
  return (
    <main className={styles.page}>
      <a href="/" className={styles.home}>
        barney.is
      </a>

      <h1 className={styles.headline}>
        <Sentence text={res.truth} />
      </h1>

      {res.fact.note && <p className={styles.note}>{res.fact.note}</p>}

      <ul className={styles.list}>
        {tools.map((t) => (
          <li key={t.name} className={styles.item}>
            <a href={t.url} className={styles.name}>
              {t.name}
            </a>
            {t.blurb && <p className={styles.blurb}>{t.blurb}</p>}
          </li>
        ))}
      </ul>
    </main>
  );
}
