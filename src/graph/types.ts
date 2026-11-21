// barney.is sentence graph: core types.
//
// Three layers, kept deliberately separate:
//   1. facts     (graph.mts)    what is true, and when. No language.
//   2. lexicon   (language.mts) how each predicate is said (verb forms, prepositions).
//   3. frames    (language.mts) sentence templates that work for any predicate.
//
// A URL is a sentence that starts with "barney is". It's a *claim*: the
// resolver looks it up, checks it against the graph at a reference time and
// renders the truth, correcting the claim where it is out of date.

/** "2021", "2021-09" or "2021-09-23". Start dates snap to the beginning of the period, end dates to the end. */
export type PartialDate = string;

export type EntityKind =
  | "person"
  | "organisation"
  | "project"
  | "place"
  | "identity" // things barney *is*: gym-rat, maker
  | "topic"
  | "website";

export interface Entity {
  name: string;
  kind: EntityKind;
  /** Extra URL slugs that resolve to this entity, e.g. "joinodin". The key is always the canonical slug. */
  aliases?: string[];
  url?: string;
  /** Override the a/an heuristic for this entity's slug. */
  article?: "a" | "an";
  /**
   * Give this entity a page of its own at /looking-back-on/<slug>, for the
   * longer story behind it. Entities with several facts get one anyway.
   */
  story?: true;
  /** Something barney needs to confirm or fill in. */
  todo?: string;
}

export interface Role {
  /** Preposition that follows the role noun: "founding-engineer-at", "co-organiser-of". */
  prep: "at" | "of" | "for";
  /**
   * How the role reads in a sentence, when un-hyphenating the slug would be
   * wrong: "co-founder" is one hyphenated word, not "co founder", while
   * "head-of-engineering" is three words and needs no label.
   */
  label?: string;
  /** Roles you never stop holding ("graduate of"). These never get "a former …". */
  persists?: boolean;
  article?: "a" | "an";
}

/**
 * A fact is an event node: barney --predicate--> object, qualified by time,
 * role and collaborators. Facts are n-ary on purpose because plain triples
 * can't hold "when", and the whole tense system depends on "when".
 */
export interface Fact {
  id: string;
  predicate: string;
  object: string;
  role?: string;
  with?: string[];
  start?: PartialDate;
  /** A date, or "unknown" for "this definitely ended but I don't know when". */
  end?: PartialDate | "unknown";
  /** An aspiration with no dates at all: "yet to visit every country". */
  someday?: true;
  /** How it ended. Only meaningful once the fact is over; picks its past phrasings. */
  outcome?: Outcome;
  /** MDX content for this fact's page, relative to the content directory. */
  body?: string;
  /**
   * A short paragraph for the page, in barney's voice. One to three sentences;
   * the bigger pages get written properly by hand instead.
   */
  note?: string;
  /** Where this fact was taken from, so it can be checked. */
  source?: string;
  todo?: string;
}

/** Where a fact sits relative to the reference time. */
export type State = "before" | "during" | "after" | "someday";

/**
 * How a finished thing ended. The past tense of "barney is" has a lot of
 * range, and which phrasing is honest depends on this rather than on the
 * predicate: you're proud of what you shipped, done with what you dropped,
 * and still recovering from what you survived.
 */
export type Outcome = "shipped" | "handed-over" | "abandoned" | "survived";

export interface Predicate {
  base: string; // build
  ing: string; // building
  past: string; // built
  pp: string; // built (past participle)
  /** Preposition that attaches to the verb before the object: "working-at/odin". */
  prep?: string;
  /**
   * The progressive reads as habitual, so it's true in any state.
   * "barney is capturing iceland" is a photo collection, not a live claim.
   * Out-of-date claims get a gloss ("in september 2021") instead of a correction.
   */
  timeless?: boolean;
  /**
   * Dated facts with this predicate are never announced in advance: no
   * future-tense URL exists for them while they're still to come. Undated
   * aspirations ("someday") are unaffected, so "yet to visit every country"
   * still works. Set on "visit" because a trip is a live location feed.
   */
  unannounced?: true;
  /** Restrict which generic frames apply to this predicate. */
  frames?: { only?: string[]; deny?: string[] };
  /** Override the default canonical frame per state. */
  canonical?: Partial<Record<State, string>>;
}

/**
 * Frame tokens. Each token becomes one URL segment.
 * - string        a literal segment ("no-longer")
 * - string[]      alternative literals; the first is canonical and the rest are aliases
 * - Slot          filled from the fact
 */
export type Slot =
  | "BASE" // verb base form (+ prep): "work-at"
  | "ING" // progressive (+ prep): "working-at"
  | "PAST" // simple past (+ prep): "worked-at"
  | "PP" // past participle (+ prep): "worked-at"
  | "OBJ" // object slug: "odin"
  | "ROLE" // role + its prep: "founding-engineer-at"
  | "ART"; // a/an, chosen from the *next* segment

export type Token = string | string[] | { slot: Slot };

export interface Frame {
  id: string;
  tokens: Token[];
  /** States in which this frame is a true statement. */
  when: State[];
  /** "fact" (default) resolves to one event. "entity" resolves to the object, covering all of its facts. */
  target?: "fact" | "entity";
  /** Only for these predicates (predicate-specific frames like "back-from/iceland"). */
  predicates?: string[];
  /** Only for facts that ended this way. "done-with" is only true of something abandoned. */
  outcome?: Outcome[];
  role?: "required" | "transient" | "persistent";
  /** Visual treatment. "strike" frames correct the domain itself: "barney ~~is~~ was …". */
  style?: "plain" | "headline" | "strike";
  /** Replacement copula for strike frames ("was", "will be"). */
  copula?: string;
  /** Recency limit in days. "back-from" stops being news after a while; past the limit, the page adds a gloss. */
  within?: number;
  note?: string;
}
