// barney.is sentence graph: facts.
//
// Deliberately light on work: past jobs, education and old projects live on
// the CV (/experienced), not here. Anything marked `todo` needs confirming.

import type { Entity, Fact, Role } from "./types.ts";

export const entities = {
  // ── things barney makes or works on ───────────────────────────────────
  storyden: {
    name: "Storyden",
    kind: "project",
    url: "https://www.storyden.org/",
    // Has a written history of its own at /looking-back-on/storyden.
    story: true,
  },
  ferry: {
    name: "Ferry",
    kind: "organisation",
    url: "https://www.deployferry.io/",
    aliases: ["deployferry"],
  },
  "barney-is": {
    name: "barney.is",
    kind: "website",
    aliases: ["this-site", "this-website"],
  },
  rad: {
    name: "Rad",
    kind: "project",
    url: "https://radengine.dev",
    aliases: ["radengine", "rad-engine"],
  },
  // One page for the small stuff, rather than a fact each: see src/designs/tools.
  tools: {
    name: "tools",
    kind: "project",
    aliases: ["small-things", "bits-and-bobs"],
  },
  "london-gophers": {
    name: "London Gophers",
    kind: "organisation",
    url: "https://gophers.london/",
    aliases: ["golang-london", "go-london-user-group"],
  },

  // ── things barney used to make ────────────────────────────────────────
  pico: {
    name: "Pico",
    kind: "project",
    url: "https://github.com/Southclaws/pico",
    // The repo was renamed from wadsworth; machinehead was its predecessor.
    // pico.sh belongs to someone else now, so don't link it.
    aliases: ["wadsworth", "machinehead"],
  },
  lokalyze: { name: "Lokalyze", kind: "organisation" },

  // ── the SA:MP years ───────────────────────────────────────────────────
  sampctl: {
    name: "sampctl",
    kind: "project",
    url: "https://github.com/Southclaws/sampctl",
  },
  "scavenge-survive": {
    name: "Scavenge Survive",
    kind: "project",
    url: "https://github.com/Southclaws/ScavengeSurvive",
    aliases: ["scavengesurvive", "ss"],
  },
  sif: {
    name: "SIF",
    kind: "project",
    url: "https://github.com/Southclaws/SIF",
    article: "an",
  },
  hellfire: {
    name: "Hellfire",
    kind: "project",
    url: "https://github.com/Southclaws/samp-Hellfire",
    aliases: ["samp-hellfire"],
  },
  novaura: { name: "Novaura", kind: "organisation" },

  // ── things barney was into ────────────────────────────────────────────
  "video-editing": { name: "video editing", kind: "topic" },
  vfx: { name: "VFX", kind: "topic", aliases: ["visual-effects"] },

  // ── places ────────────────────────────────────────────────────────────
  london: { name: "London", kind: "place" },
  "city-of-london": {
    name: "the City of London",
    kind: "place",
    aliases: ["the-city"],
  },
  england: { name: "England", kind: "place", article: "an" },
  iceland: { name: "Iceland", kind: "place", article: "an" },
  italy: { name: "Italy", kind: "place", article: "an" },
  luxembourg: { name: "Luxembourg", kind: "place" },
  "every-country": {
    name: "every country on earth",
    kind: "topic",
    aliases: ["every-country-on-earth"],
  },

  // ── countries visited ─────────────────────────────────────────────────
  // Undated on purpose: `end: "unknown"` means "definitely been, don't ask
  // when", which reads as past tense without inventing a date. Iceland,
  // Italy and Luxembourg are above, with real dates and photos.
  armenia: { name: "Armenia", kind: "place", article: "an" },
  austria: { name: "Austria", kind: "place", article: "an" },
  belgium: { name: "Belgium", kind: "place" },
  cambodia: { name: "Cambodia", kind: "place" },
  canada: { name: "Canada", kind: "place" },
  croatia: { name: "Croatia", kind: "place" },
  cyprus: { name: "Cyprus", kind: "place" },
  czechia: { name: "Czechia", kind: "place", aliases: ["czech-republic"] },
  france: { name: "France", kind: "place" },
  georgia: { name: "Georgia", kind: "place" },
  germany: { name: "Germany", kind: "place" },
  greece: { name: "Greece", kind: "place" },
  india: { name: "India", kind: "place", article: "an" },
  kazakhstan: { name: "Kazakhstan", kind: "place" },
  kyrgyzstan: { name: "Kyrgyzstan", kind: "place" },
  monaco: { name: "Monaco", kind: "place" },
  nepal: { name: "Nepal", kind: "place" },
  netherlands: {
    name: "the Netherlands",
    kind: "place",
    aliases: ["the-netherlands", "holland"],
  },
  norway: { name: "Norway", kind: "place" },
  poland: { name: "Poland", kind: "place" },
  portugal: { name: "Portugal", kind: "place" },
  slovakia: { name: "Slovakia", kind: "place" },
  spain: { name: "Spain", kind: "place" },
  switzerland: { name: "Switzerland", kind: "place" },
  thailand: { name: "Thailand", kind: "place" },
  turkey: { name: "Turkey", kind: "place" },
  usa: {
    name: "the United States",
    kind: "place",
    aliases: ["united-states", "america", "the-usa", "the-states"],
  },
  uzbekistan: { name: "Uzbekistan", kind: "place" },
  vietnam: { name: "Vietnam", kind: "place", aliases: ["viet-nam"] },

  // ── identities (things barney *is*) ───────────────────────────────────
  "multidisciplinary-maker": {
    name: "multidisciplinary maker",
    kind: "identity",
    aliases: ["maker"],
  },
  "gym-rat": { name: "gym rat", kind: "identity" },
  "fitness-nerd": { name: "fitness nerd", kind: "identity" },
} satisfies Record<string, Entity>;

export type EntityId = keyof typeof entities;

export const roles = {
  "head-of-engineering": { prep: "at" },
  "co-organiser": { prep: "of", label: "co-organiser" },
  // You never stop having founded something, so these never become "former".
  "co-founder": { prep: "of", label: "co-founder", persists: true },
  founder: { prep: "of", persists: true },
} satisfies Record<string, Role>;

export type RoleId = keyof typeof roles;

type TypedFact = Fact & { object: EntityId; role?: RoleId; with?: EntityId[] };

export const facts: TypedFact[] = [
  // ── building ──────────────────────────────────────────────────────────
  {
    id: "storyden",
    predicate: "build",
    object: "storyden",
    start: "2021-11",
    source: "github repo created 2021-11-15",
  },
  // Ferry is both the job and a thing barney builds, so it gets a fact each.
  // Only the "work" one carries the role, or both would claim
  // /a/head-of-engineering-at/ferry.
  {
    id: "ferry-build",
    predicate: "build",
    object: "ferry",
    start: "2024-11",
    source: "cv",
  },
  {
    id: "ferry",
    predicate: "work",
    object: "ferry",
    role: "head-of-engineering",
    start: "2024-11",
    note: "The applied AI laboratory for industrial operations. I lead the engineering side of the business.",
    source: "cv",
  },
  {
    id: "barney-is",
    predicate: "build",
    object: "barney-is",
    start: "2023-09-23",
    source: "home page footer (designed in the barbican)",
  },
  {
    id: "rad",
    predicate: "build",
    object: "rad",
    start: "2022-09",
    source: "github repo created 2022-09; radengine.dev",
  },
  {
    id: "tools",
    predicate: "build",
    object: "tools",
    start: "2022-06",
    note: "Small things, mostly built because I wanted them to exist and nobody else had made one. None of them are a product.",
    source: "a hand-picked set, see the design",
  },

  // ── built, then stopped ───────────────────────────────────────────────
  // GitOps for one server, back when that meant a VPS and a cron. Started as
  // machinehead (2018-08), became wadsworth, then pico.
  {
    id: "pico",
    predicate: "build",
    object: "pico",
    start: "2018-11",
    end: "2021-04",
    outcome: "abandoned",
    note: "GitOps for people with exactly one server, back when the choice was a Kubernetes cluster or nothing at all. It polled a git repo, ran docker-compose and pulled secrets out of Vault. Then Vercel and Fly turned up and did the whole thing properly.",
    source: "github repo: created 2018-11-14, last pushed 2021-04-24",
  },
  {
    id: "lokalyze",
    predicate: "found",
    object: "lokalyze",
    role: "co-founder",
    start: "2020",
    end: "unknown",
    outcome: "abandoned",
    note: "A startup I co-founded in 2020, which died. The site is gone and the only thing still standing is the Chrome Web Store listing.",
    source:
      "barney: co-founded 2020, died. the site is gone; only the chrome web store listing is left",
  },

  // A video and branding studio for small businesses, killed by covid. Not
  // written up at length on purpose: what it really marks is the stretch when
  // barney was deep in video and VFX, which is the next two facts.
  {
    id: "novaura",
    predicate: "found",
    object: "novaura",
    role: "founder",
    start: "2020",
    end: "2022",
    outcome: "abandoned",
    note: "A small studio doing product video, branding and websites, started shortly before covid took the legs out from under small businesses. Clients went from an esports team to a chocolate-based healing practitioner, which tells you roughly everything.",
    source:
      "cv + barney: product video, branding and websites; clients included an esports team",
  },

  // ── was into ──────────────────────────────────────────────────────────
  {
    id: "into-video",
    predicate: "be-into",
    object: "video-editing",
    start: "2020",
    end: "2022",
    note: "The Novaura stretch, when I spent more time in a timeline than in a terminal.",
    source: "the novaura era",
    todo: "are these the right years?",
  },
  {
    id: "into-vfx",
    predicate: "be-into",
    object: "vfx",
    start: "2020",
    end: "2022",
    note: "Same era as the video editing, and part of the same job.",
    source: "the novaura era",
    todo: "are these the right years?",
  },

  // ── the SA:MP years ───────────────────────────────────────────────────
  // Dates run from the repo's creation to barney's own last commit, not the
  // last push: these all outlived him. sampctl and Scavenge Survive are still
  // maintained by other people, which is what "handed-over" means here.
  {
    id: "sampctl",
    predicate: "build",
    object: "sampctl",
    start: "2017-07",
    end: "2022-12",
    outcome: "handed-over",
    note: "A package manager, build tool and runtime for a game that had none of those things. Other people run it now, which is about the best thing that can happen to a tool you have stopped maintaining.",
    source:
      "github: created 2017-07, barney's last commit 2022-12; ADRFranklin and others maintain it now",
  },
  {
    id: "scavenge-survive",
    predicate: "build",
    object: "scavenge-survive",
    start: "2013-02",
    end: "2021-07",
    outcome: "handed-over",
    note: "A survival gamemode about scavenging for tools and weapons and mostly dying anyway. It outlived my involvement by years and other people still keep it running.",
    source:
      "github: created 2013-02, barney's last commit 2021-07; VIRUXE and others kept it going",
  },
  {
    id: "sif",
    predicate: "build",
    object: "sif",
    start: "2013-01",
    end: "2021-12",
    outcome: "abandoned",
    note: "A pile of include scripts so nobody else had to write an inventory system from scratch. Doors, buttons, containers, that sort of thing.",
    source:
      "github: created 2013-01, barney's last commit 2021-12 (merging someone else's patch)",
    todo: "abandoned, or handed over? nobody else has pushed since either",
  },
  {
    id: "hellfire",
    predicate: "build",
    object: "hellfire",
    start: "2012-12",
    end: "2017-12",
    outcome: "abandoned",
    note: "My long running San Andreas Multiplayer project, which ran for about five years. The last commit I made to it says I was going to update this project but screw that, so that is where we left it.",
    source:
      'github: archived 2018. last commit by barney, 2017-12: "I was going to update this project but screw that"',
  },

  // ── community ─────────────────────────────────────────────────────────
  // The group itself is ~10 years old and still going; a friend revived it
  // after covid. This fact is barney's stint as an organiser, not the group.
  {
    id: "london-gophers",
    predicate: "organise",
    object: "london-gophers",
    role: "co-organiser",
    start: "2022",
    end: "2023",
    outcome: "handed-over",
    note: "The official Go user group for London, which is about ten years old now. A friend revived it after covid and I helped organise for a year or so. It got me into more of the city's tech offices than my actual job ever did.",
    source:
      "barney: organised for about a year, ran events at Monzo, Cloudflare and others",
    todo: "2022 or 2023 — which year did you start?",
  },

  // ── places ────────────────────────────────────────────────────────────
  {
    id: "from-england",
    predicate: "come-from",
    object: "england",
    source: "home page",
  },
  {
    id: "live-london",
    predicate: "live",
    object: "london",
    source: "cv / home page",
    todo: "since when?",
  },
  {
    id: "trip-iceland",
    predicate: "visit",
    object: "iceland",
    start: "2021-09",
    end: "2021-09",
    source: "photo EXIF",
  },
  {
    id: "trip-italy",
    predicate: "visit",
    object: "italy",
    start: "2021",
    end: "2021",
    source: "cv photo alt text",
    todo: "month?",
  },
  {
    id: "trip-luxembourg",
    predicate: "visit",
    object: "luxembourg",
    start: "2020-01",
    end: "2020-01",
    source: "photo EXIF/filename",
  },
  {
    id: "every-country",
    predicate: "visit",
    object: "every-country",
    someday: true,
    note: "A life goal with plenty of time to complete. The ones I have actually made it to are scattered around this site.",
    source: "cv: life goal",
  },

  // ── countries visited (see the note above) ────────────────────────────
  {
    id: "trip-armenia",
    predicate: "visit",
    object: "armenia",
    end: "unknown",
    source: "country list",
  },
  {
    id: "trip-austria",
    predicate: "visit",
    object: "austria",
    end: "unknown",
    source: "country list",
  },
  {
    id: "trip-belgium",
    predicate: "visit",
    object: "belgium",
    end: "unknown",
    source: "country list",
  },
  {
    id: "trip-cambodia",
    predicate: "visit",
    object: "cambodia",
    end: "unknown",
    source: "country list",
  },
  {
    id: "trip-canada",
    predicate: "visit",
    object: "canada",
    end: "unknown",
    source: "country list",
  },
  {
    id: "trip-croatia",
    predicate: "visit",
    object: "croatia",
    end: "unknown",
    source: "country list",
  },
  {
    id: "trip-cyprus",
    predicate: "visit",
    object: "cyprus",
    end: "unknown",
    source: "country list",
  },
  {
    id: "trip-czechia",
    predicate: "visit",
    object: "czechia",
    end: "unknown",
    source: "country list",
  },
  {
    id: "trip-france",
    predicate: "visit",
    object: "france",
    end: "unknown",
    source: "country list",
  },
  {
    id: "trip-georgia",
    predicate: "visit",
    object: "georgia",
    end: "unknown",
    source: "country list",
  },
  {
    id: "trip-germany",
    predicate: "visit",
    object: "germany",
    end: "unknown",
    source: "country list",
  },
  {
    id: "trip-greece",
    predicate: "visit",
    object: "greece",
    end: "unknown",
    source: "country list",
  },
  {
    id: "trip-india",
    predicate: "visit",
    object: "india",
    end: "unknown",
    source: "country list",
  },
  {
    id: "trip-kazakhstan",
    predicate: "visit",
    object: "kazakhstan",
    end: "unknown",
    source: "country list",
  },
  {
    id: "trip-kyrgyzstan",
    predicate: "visit",
    object: "kyrgyzstan",
    end: "unknown",
    source: "country list",
  },
  {
    id: "trip-monaco",
    predicate: "visit",
    object: "monaco",
    end: "unknown",
    source: "country list",
  },
  {
    id: "trip-nepal",
    predicate: "visit",
    object: "nepal",
    end: "unknown",
    source: "country list",
  },
  {
    id: "trip-netherlands",
    predicate: "visit",
    object: "netherlands",
    end: "unknown",
    source: "country list",
  },
  {
    id: "trip-norway",
    predicate: "visit",
    object: "norway",
    end: "unknown",
    source: "country list",
  },
  {
    id: "trip-poland",
    predicate: "visit",
    object: "poland",
    end: "unknown",
    source: "country list",
  },
  {
    id: "trip-portugal",
    predicate: "visit",
    object: "portugal",
    end: "unknown",
    source: "country list",
  },
  {
    id: "trip-slovakia",
    predicate: "visit",
    object: "slovakia",
    end: "unknown",
    source: "country list",
  },
  {
    id: "trip-spain",
    predicate: "visit",
    object: "spain",
    end: "unknown",
    source: "country list",
  },
  {
    id: "trip-switzerland",
    predicate: "visit",
    object: "switzerland",
    end: "unknown",
    source: "country list",
  },
  {
    id: "trip-thailand",
    predicate: "visit",
    object: "thailand",
    end: "unknown",
    source: "country list",
  },
  {
    id: "trip-turkey",
    predicate: "visit",
    object: "turkey",
    end: "unknown",
    source: "country list",
  },
  {
    id: "trip-usa",
    predicate: "visit",
    object: "usa",
    end: "unknown",
    source: "country list",
  },
  {
    id: "trip-uzbekistan",
    predicate: "visit",
    object: "uzbekistan",
    end: "unknown",
    source: "country list",
  },
  {
    id: "trip-vietnam",
    predicate: "visit",
    object: "vietnam",
    end: "unknown",
    source: "country list",
  },

  // ── photography ───────────────────────────────────────────────────────
  {
    id: "capture-iceland",
    predicate: "capture",
    object: "iceland",
    start: "2021-09",
    end: "2021-09",
    source: "photo EXIF",
  },
  {
    id: "capture-city",
    predicate: "capture",
    object: "city-of-london",
    start: "2022-11",
    source: "photo EXIF (2022-11 → 2024-06)",
  },

  // ── identity ──────────────────────────────────────────────────────────
  {
    id: "maker",
    predicate: "be",
    object: "multidisciplinary-maker",
    source: "home page",
  },
  { id: "gym-rat", predicate: "be", object: "gym-rat", source: "cv" },
  { id: "fitness-nerd", predicate: "be", object: "fitness-nerd", source: "cv" },
];
