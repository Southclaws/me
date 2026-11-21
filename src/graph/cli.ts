// Try the resolver from the command line.
//
//   node src/graph/cli.ts                          # demo: a tour of URLs
//   node src/graph/cli.ts no-longer/building/odin  # resolve specific paths
//   node src/graph/cli.ts building/storyden --at=2019-06
//   node src/graph/cli.ts --report                 # stats, canonical URLs, TODOs
//   node src/graph/cli.ts --all                    # every generated URL

import { allPaths, report, resolve, type Resolution } from "./compile.ts";

const args = process.argv.slice(2);
const atArg = args.find((a) => a.startsWith("--at="));
const at = atArg ? new Date(atArg.slice(5)) : undefined;
const paths = args.filter((a) => !a.startsWith("--"));

function show(r: Resolution) {
  const head = `barney.is/${r.path}${at ? `?at=${atArg!.slice(5)}` : ""}`;
  switch (r.kind) {
    case "fact":
      console.log(`${r.ok ? "✓" : "✗"} ${head}`);
      if (r.ok) console.log(`    ${r.truth}${r.gloss ? ` ${r.gloss}` : ""}${r.frame.style === "headline" ? "   [headline style]" : ""}`);
      else console.log(`    ~~${r.claim}~~\n    → ${r.truth}${r.gloss ? ` ${r.gloss}` : ""}`);
      if (r.canonical !== r.path) console.log(`    canonical: /${r.canonical}`);
      break;
    case "entity":
      console.log(`◎ ${head}   (entity: ${r.entityId})`);
      r.items.forEach((i) => console.log(`    · ${i.sentence}   /${i.path}`));
      break;
    case "collection":
      console.log(`☰ ${head}   ${r.label}`);
      r.items.forEach((i) => console.log(`    · ${i.sentence}   /${i.path}`));
      if (!r.items.length) console.log("    (nothing right now)");
      break;
    case "not-found":
      console.log(`? ${head}   not a thing (yet). did you mean: ${r.suggestions.map((s) => "/" + s).join(", ")}`);
  }
  console.log();
}

const tour = [
  "building",
  "building/storyden",
  "still/building/storyden",
  "a/head-of-engineering-at/ferry",
  "no-longer/building/ferry",
  "back-from/iceland",
  "capturing/iceland",
  "yet-to/visit/every-country",
  "from/england",
  "a/gym-rat",
  "building/barney-is",
  "reminiscing",
  "up-to",
  "skydiving",
];

if (args.includes("--report")) {
  console.dir(report(at), { depth: 4 });
} else if (args.includes("--all")) {
  allPaths().sort().forEach((p) => console.log("/" + p));
} else {
  (paths.length ? paths : tour).forEach((p) => show(resolve(p, { at })));
}
