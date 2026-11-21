// barney.is sentence graph: facts.
//
// Deliberately light on work: past jobs, education and old projects live on
// the CV (/experienced), not here. Anything marked `todo` needs confirming.

import type { Entity, Fact, Role } from "./types.ts";

export const entities = {
  // ── things barney makes or works on ───────────────────────────────────
  storyden: { name: "Storyden", kind: "project", url: "https://www.storyden.org/" },
  ferry: { name: "Ferry", kind: "organisation", url: "https://www.deployferry.io/", aliases: ["deployferry"] },
  "barney-is": { name: "barney.is", kind: "website", aliases: ["this-site", "this-website"] },
  "london-gophers": { name: "London Gophers", kind: "organisation", aliases: ["golang-london"] },

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
  "head-of-engineering": { prep: "at" },
  "co-organiser": { prep: "of" },
} satisfies Record<string, Role>;

export type RoleId = keyof typeof roles;

type TypedFact = Fact & { object: EntityId; role?: RoleId; with?: EntityId[] };

export const facts: TypedFact[] = [
  // ── building ──────────────────────────────────────────────────────────
  { id: "storyden", predicate: "build", object: "storyden", start: "2021-11", source: "github repo created 2021-11-15" },
  { id: "ferry", predicate: "build", object: "ferry", role: "head-of-engineering", start: "2024-11", source: "cv" },
  { id: "barney-is", predicate: "build", object: "barney-is", start: "2023-09-23", source: "home page footer (designed in the barbican)" },

  // ── community ─────────────────────────────────────────────────────────
  { id: "london-gophers", predicate: "organise", object: "london-gophers", role: "co-organiser", source: "cv", todo: "start date? still organising?" },

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
