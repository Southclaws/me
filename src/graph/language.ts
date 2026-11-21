// barney.is sentence graph: lexicon and frames.
//
// Adding a predicate gives its facts every applicable frame. Adding a frame
// adds that phrasing to every fact. That's how this scales.

import type { Frame, Predicate } from "./types.ts";

const ING = { slot: "ING" } as const;
const BASE = { slot: "BASE" } as const;
const PAST = { slot: "PAST" } as const;
const PP = { slot: "PP" } as const;
const OBJ = { slot: "OBJ" } as const;
const ROLE = { slot: "ROLE" } as const;
const ART = { slot: "ART" } as const;

// ── lexicon ───────────────────────────────────────────────────────────────

/** Frames that need a real action verb. "be" and "come-from" have their own frames instead. */
const STATIVE_ONLY = { only: ["identity"] };

export const predicates: Record<string, Predicate> = {
  build: { base: "build", ing: "building", past: "built", pp: "built" },
  design: { base: "design", ing: "designing", past: "designed", pp: "designed", canonical: { after: "the-one-who" } },
  work: { base: "work", ing: "working", past: "worked", pp: "worked", prep: "at", canonical: { after: "former-role" } },
  found: { base: "found", ing: "founding", past: "founded", pp: "founded", canonical: { after: "the-one-who" } },
  study: { base: "study", ing: "studying", past: "studied", pp: "studied", prep: "at", canonical: { after: "persistent-role" } },
  organise: { base: "organise", ing: "organising", past: "organised", pp: "organised" },
  visit: {
    base: "visit", ing: "visiting", past: "visited", pp: "visited",
    canonical: { during: "in", before: "bound-for", after: "back-from" },
  },
  live: {
    base: "live", ing: "living", past: "lived", pp: "lived", prep: "in",
    canonical: { during: "based-in" },
  },
  capture: { base: "capture", ing: "capturing", past: "captured", pp: "captured", timeless: true, canonical: { after: "progressive" } },
  "come-from": { base: "come", ing: "coming", past: "came", pp: "come", prep: "from", frames: { only: ["from"] }, canonical: { during: "from" } },
  be: { base: "be", ing: "being", past: "was", pp: "been", frames: STATIVE_ONLY, canonical: { during: "identity" } },
};

/** Default canonical frame per state, unless a predicate overrides it. */
export const defaultCanonical = {
  during: "progressive",
  before: "going-to",
  someday: "yet-to",
  after: "no-longer",
} as const;

// ── frames ────────────────────────────────────────────────────────────────

export const frames: Frame[] = [
  // present
  { id: "progressive", tokens: [ING, OBJ], when: ["during"], note: "the default: barney.is/building/storyden" },
  { id: "still", tokens: ["still", ING, OBJ], when: ["during"], note: "best for long-running things" },
  { id: "role", tokens: [ART, ROLE, OBJ], when: ["during"], role: "required", note: "barney.is/a/founding-engineer-at/odin" },
  { id: "identity", tokens: [ART, OBJ], when: ["during"], predicates: ["be"], note: "barney.is/a/gym-rat" },
  { id: "from", tokens: ["from", OBJ], when: ["during"], predicates: ["come-from"] },
  { id: "based-in", tokens: [["based-in", "in"], OBJ], when: ["during"], predicates: ["live"] },
  { id: "in", tokens: ["in", OBJ], when: ["during"], predicates: ["visit"] },

  // future
  { id: "going-to", tokens: ["going-to", BASE, OBJ], when: ["before", "someday"] },
  { id: "about-to", tokens: ["about-to", BASE, OBJ], when: ["before"], within: 30 },
  { id: "planning-to", tokens: ["planning-to", BASE, OBJ], when: ["before", "someday"] },
  { id: "yet-to", tokens: ["yet-to", BASE, OBJ], when: ["before", "someday"] },
  { id: "dreaming-of", tokens: ["dreaming-of", ING, OBJ], when: ["someday"] },
  { id: "bound-for", tokens: ["bound-for", OBJ], when: ["before"], predicates: ["visit"] },
  { id: "headline-to", tokens: ["to", BASE, OBJ], when: ["before"], style: "headline", note: "British headlinese: 'barney is to visit japan'" },
  { id: "will-be", tokens: ["will-be", ING, OBJ], when: ["before"], style: "strike", copula: "will be" },

  // past
  { id: "no-longer", tokens: ["no-longer", ING, OBJ], when: ["after"] },
  { id: "was", tokens: ["was", ING, OBJ], when: ["after"], style: "strike", copula: "was" },
  { id: "the-one-who", tokens: [["the-one-who", "the-guy-who"], PAST, OBJ], when: ["after"] },
  { id: "someone-who-once", tokens: ["someone-who-once", PAST, OBJ], when: ["after"] },
  {
    id: "headline-past",
    tokens: [["believed-to-have", "rumoured-to-have", "said-to-have", "understood-to-have"], PP, OBJ],
    when: ["after"],
    style: "headline",
  },
  { id: "former-role", tokens: [ART, "former", ROLE, OBJ], when: ["after"], role: "transient" },
  { id: "persistent-role", tokens: [ART, ROLE, OBJ], when: ["during", "after"], role: "persistent", note: "a graduate of… never becomes 'a former graduate'" },
  { id: "back-from", tokens: ["back-from", OBJ], when: ["after"], predicates: ["visit"], within: 60 },

  // reminiscing: these target the entity, covering all of its facts
  { id: "looking-back-on", tokens: ["looking-back-on", OBJ], when: ["after"], target: "entity" },
  { id: "remembering", tokens: ["remembering", OBJ], when: ["after"], target: "entity" },
  { id: "still-thinking-about", tokens: ["still-thinking-about", OBJ], when: ["after"], target: "entity" },
  { id: "nostalgic-for", tokens: ["nostalgic-for", OBJ], when: ["after"], target: "entity" },
];
