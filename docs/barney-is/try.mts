// Try the resolver from the command line.
//
//   node docs/barney-is/try.mts                          # demo: a tour of URLs
//   node docs/barney-is/try.mts no-longer/building/odin  # resolve specific paths
//   node docs/barney-is/try.mts building/storyden --at=2019-06
//   node docs/barney-is/try.mts --report                 # stats, canonical URLs, TODOs
//   node docs/barney-is/try.mts --all                    # every generated URL

import { allPaths, report, resolve, type Resolution } from "./compile.mts";

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
      r.sentences.forEach((s) => console.log(`    · ${s}`));
      break;
    case "collection":
      console.log(`☰ ${head}   ${r.label}`);
      r.sentences.forEach((s) => console.log(`    · ${s}`));
      if (!r.sentences.length) console.log("    (nothing right now)");
      break;
    case "not-found":
      console.log(`? ${head}   not a thing (yet). did you mean: ${r.suggestions.map((s) => "/" + s).join(", ")}`);
  }
  console.log();
}

const tour = [
  "building/storyden",
  "still/building/storyden",
  "a/founding-engineer-at/odin",
  "a/former/software-engineer-at/utility-warehouse",
  "no-longer/working-at/metomic",
  "was/working-at/metomic",
  "working-at/metomic",
  "believed-to-have/founded/novaura",
  "the-one-who/designed/vapourlish",
  "a/graduate-of/nottingham-trent",
  "back-from/iceland",
  "in/iceland",
  "capturing/iceland",
  "capturing/city-of-london",
  "yet-to/visit/every-country",
  "dreaming-of/visiting/every-country",
  "from/england",
  "based-in/london",
  "a/gym-rat",
  "building/barney-is",
  "looking-back-on/odin",
  "with/paddy-ryan",
  "no-longer",
  "a/former",
  "skydiving",
];

if (args.includes("--report")) {
  console.dir(report(at), { depth: 4 });
} else if (args.includes("--all")) {
  allPaths().sort().forEach((p) => console.log("/" + p));
} else {
  (paths.length ? paths : tour).forEach((p) => show(resolve(p, { at })));
}
