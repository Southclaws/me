// barney.is sentence graph: facts.
//
// Drafted from the current site: home page, /cv, pages/building/*.md and
// photo EXIF dates. Anything marked `todo` needs barney to confirm it.

import type { Entity, Fact, Role } from "./types.mts";

export const entities = {
  // ── people ────────────────────────────────────────────────────────────
  "paddy-ryan": { name: "Paddy Ryan", kind: "person" },
  "mary-lin": { name: "Mary Lin", kind: "person" },

  // ── organisations ─────────────────────────────────────────────────────
  odin: { name: "Odin", kind: "organisation", url: "https://www.joinodin.com/", aliases: ["joinodin"] },
  metomic: { name: "Metomic", kind: "organisation" },
  novaura: { name: "Novaura", kind: "organisation" },
  ytterate: { name: "Ytterate", kind: "organisation" },
  "utility-warehouse": { name: "Utility Warehouse", kind: "organisation", aliases: ["uw"] },
  "spotlight-data": { name: "Spotlight Data", kind: "organisation" },
  "nottingham-trent": { name: "Nottingham Trent University", kind: "organisation", aliases: ["ntu"] },
  "london-gophers": { name: "London Gophers", kind: "organisation", aliases: ["golang-london"] },
  "open-mp": { name: "open.mp", kind: "project", url: "https://open.mp", aliases: ["openmp"], todo: "what's your relationship to open.mp? (Storyden was born there)" },

  // ── projects ──────────────────────────────────────────────────────────
  storyden: { name: "Storyden", kind: "project", url: "https://www.storyden.org/" },
  pico: { name: "Pico", kind: "project" },
  wisplight: { name: "Wisplight", kind: "project" },
  "scavenge-and-survive": { name: "Scavenge & Survive", kind: "project", url: "https://scavengesurvive.com", aliases: ["scavenge-survive", "ss"] },
  vapourlish: { name: "Vapourlish", kind: "project" },
  "barney-is": { name: "barney.is", kind: "website", aliases: ["this-site", "this-website"] },

  // ── places ────────────────────────────────────────────────────────────
  london: { name: "London", kind: "place" },
  "city-of-london": { name: "the City of London", kind: "place", aliases: ["the-city"] },
  england: { name: "England", kind: "place", article: "an" },
  iceland: { name: "Iceland", kind: "place", article: "an" },
  italy: { name: "Italy", kind: "place", article: "an" },
  luxembourg: { name: "Luxembourg", kind: "place" },
  "every-country": { name: "every country on earth", kind: "topic", aliases: ["every-country-on-earth"] },

  // ── identities (things barney *is*) ───────────────────────────────────
  "multidisciplinary-maker": { name: "multidisciplinary maker", kind: "identity", aliases: ["maker"] },
  "gym-rat": { name: "gym rat", kind: "identity" },
  "fitness-nerd": { name: "fitness nerd", kind: "identity" },
} satisfies Record<string, Entity>;

export type EntityId = keyof typeof entities;

export const roles = {
  "founding-engineer": { prep: "at" },
  "senior-software-engineer": { prep: "at" },
  "software-engineer": { prep: "at" },
  founder: { prep: "of" },
  "co-organiser": { prep: "of" },
  graduate: { prep: "of", persists: true },
} satisfies Record<string, Role>;

export type RoleId = keyof typeof roles;

type TypedFact = Fact & { object: EntityId; role?: RoleId; with?: EntityId[] };

export const facts: TypedFact[] = [
  // ── work ──────────────────────────────────────────────────────────────
  {
    id: "odin",
    predicate: "work",
    object: "odin",
    role: "founding-engineer",
    with: ["paddy-ryan", "mary-lin"],
    start: "2021-11",
    source: "cv",
    todo: "CV says 'Present' but the home page talks about Odin in the past tense. End date?",
  },
  { id: "metomic", predicate: "work", object: "metomic", role: "senior-software-engineer", start: "2021-04", end: "2021-11", source: "cv" },
  { id: "ytterate", predicate: "work", object: "ytterate", role: "software-engineer", start: "2019", end: "2020", source: "cv" },
  { id: "utility-warehouse", predicate: "work", object: "utility-warehouse", role: "software-engineer", start: "2018", end: "2019", source: "cv" },
  { id: "spotlight-data", predicate: "work", object: "spotlight-data", role: "software-engineer", start: "2016", end: "2017", source: "cv" },
  { id: "novaura", predicate: "found", object: "novaura", role: "founder", start: "2020", end: "2022", source: "cv" },
  { id: "ntu", predicate: "study", object: "nottingham-trent", role: "graduate", start: "2014", end: "2018", source: "cv" },
  { id: "london-gophers", predicate: "organise", object: "london-gophers", role: "co-organiser", source: "cv", todo: "start date? still organising?" },

  // ── building ──────────────────────────────────────────────────────────
  { id: "storyden", predicate: "build", object: "storyden", start: "2021", body: "building/storyden.md", source: "pages/building/storyden.md" },
  { id: "barney-is", predicate: "build", object: "barney-is", start: "2023-09-23", source: "home page footer (designed in the barbican)" },
  { id: "pico", predicate: "build", object: "pico", end: "unknown", source: "cv", todo: "dates? is it finished?" },
  { id: "wisplight", predicate: "build", object: "wisplight", end: "unknown", source: "cv", todo: "dates? is it finished?" },
  { id: "scavenge-and-survive", predicate: "build", object: "scavenge-and-survive", end: "unknown", source: "pages/building/index.md", todo: "dates?" },
  { id: "vapourlish", predicate: "design", object: "vapourlish", start: "2020", end: "2022", source: "pages/building/index.md", todo: "exact dates; name the designer friend so they can go in `with`?" },

  // ── places ────────────────────────────────────────────────────────────
  { id: "from-england", predicate: "come-from", object: "england", source: "home page" },
  { id: "live-london", predicate: "live", object: "london", source: "cv / home page", todo: "since when?" },
  { id: "trip-iceland", predicate: "visit", object: "iceland", start: "2021-09", end: "2021-09", source: "photo EXIF" },
  { id: "trip-italy", predicate: "visit", object: "italy", start: "2021", end: "2021", source: "cv photo alt text", todo: "month?" },
  { id: "trip-luxembourg", predicate: "visit", object: "luxembourg", start: "2020-01", end: "2020-01", source: "photo EXIF/filename" },
  { id: "every-country", predicate: "visit", object: "every-country", someday: true, source: "cv: life goal" },

  // ── photography ───────────────────────────────────────────────────────
  { id: "capture-iceland", predicate: "capture", object: "iceland", start: "2021-09", end: "2021-09", source: "photo EXIF" },
  { id: "capture-city", predicate: "capture", object: "city-of-london", start: "2022-11", source: "photo EXIF (2022-11 → 2024-06)" },

  // ── identity ──────────────────────────────────────────────────────────
  { id: "maker", predicate: "be", object: "multidisciplinary-maker", source: "home page" },
  { id: "gym-rat", predicate: "be", object: "gym-rat", source: "cv" },
  { id: "fitness-nerd", predicate: "be", object: "fitness-nerd", source: "cv" },
];
