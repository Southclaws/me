// barney.is sentence graph: compiler and resolver.
//
// Instead of parsing URLs at request time, enumerate every sentence the graph
// can say up front (facts × frames × aliases) into one map. Then:
//   - resolving a URL is a single map lookup
//   - the same keys feed generateStaticParams, so every sentence is pre-rendered
//   - unknown URLs get "did you mean…" suggestions from the same keys

import type { Entity, Fact, Frame, PartialDate, Slot, State, Token } from "./types.ts";
import { entities, facts, roles } from "./graph.ts";
import { defaultCanonical, frames, predicates } from "./language.ts";

type EntityRecord = Entity;
export const entity = (id: string) => (entities as Record<string, EntityRecord>)[id];
const role = (id: string) => (roles as Record<string, { prep: string; persists?: boolean; article?: "a" | "an" }>)[id];

// ── time ──────────────────────────────────────────────────────────────────

function startOf(d: PartialDate): Date {
  const [y, m = "1", day = "1"] = d.split("-");
  return new Date(Date.UTC(+y, +m - 1, +day));
}

function endOf(d: PartialDate): Date {
  const [y, m, day] = d.split("-");
  if (day) return new Date(Date.UTC(+y, +m - 1, +day + 1) - 1);
  if (m) return new Date(Date.UTC(+y, +m, 1) - 1);
  return new Date(Date.UTC(+y + 1, 0, 1) - 1);
}

const DAY = 86_400_000;

export function stateOf(fact: Fact, ref: Date): State {
  if (fact.someday) return "someday";
  if (fact.start && ref < startOf(fact.start)) return "before";
  if (fact.end === "unknown") return "after";
  if (fact.end && ref > endOf(fact.end)) return "after";
  return "during";
}

/** For "within" frames: is the event recent (or imminent) enough to be news? */
function isRecent(fact: Fact, frame: Frame, ref: Date): boolean {
  if (!frame.within) return true;
  const limit = frame.within * DAY;
  if (frame.when.includes("after") && fact.end && fact.end !== "unknown") {
    return ref.getTime() - endOf(fact.end).getTime() <= limit;
  }
  if (frame.when.includes("before") && fact.start) {
    return startOf(fact.start).getTime() - ref.getTime() <= limit;
  }
  return false;
}

const MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
function spoken(d: PartialDate): string {
  const [y, m] = d.split("-");
  return m ? `${MONTHS[+m - 1]} ${y}` : y;
}

// ── frame applicability ───────────────────────────────────────────────────

function applies(frame: Frame, fact: Fact): boolean {
  const p = predicates[fact.predicate];
  if (!p) throw new Error(`fact ${fact.id}: unknown predicate ${fact.predicate}`);
  if (frame.predicates && !frame.predicates.includes(fact.predicate)) return false;
  if (p.frames?.only && !p.frames.only.includes(frame.id)) return false;
  if (p.frames?.deny?.includes(frame.id)) return false;

  const r = fact.role ? role(fact.role) : undefined;
  if (frame.role === "required" && !r) return false;
  if (frame.role === "transient" && (!r || r.persists)) return false;
  if (frame.role === "persistent" && !r?.persists) return false;
  // "a founding engineer at odin" is the role frame; "a graduate of…" belongs to persistent-role.
  if (frame.id === "role" && r?.persists) return false;
  return true;
}

// ── surface forms ─────────────────────────────────────────────────────────

const VERB_SLOTS: Record<string, "base" | "ing" | "past" | "pp"> = { BASE: "base", ING: "ing", PAST: "past", PP: "pp" };

function article(word: string, override?: "a" | "an"): string {
  if (override) return override;
  return /^[aeiou]/i.test(word) ? "an" : "a";
}

/**
 * Expand a frame for a fact into every URL path it can produce
 * (literal alternatives × object aliases). The first path is the canonical one.
 */
function expand(frame: Frame, fact: Fact): string[][] {
  const p = predicates[fact.predicate];
  const obj = entity(fact.object);
  const objSlugs = [fact.object, ...(obj.aliases ?? [])];

  // Build segments right to left so ART can see the following segment.
  let paths: string[][] = [[]];
  const tokens = [...frame.tokens].reverse();
  for (const t of tokens) {
    const options = tokenOptions(t, fact, p, objSlugs);
    const next: string[][] = [];
    for (const path of paths) {
      const opts = options === "ART" ? [articleFor(path[0], fact)] : options;
      for (const o of opts) next.push([o, ...path]);
    }
    paths = next;
  }
  return paths;
}

function articleFor(nextSegment: string, fact: Fact): string {
  // ART precedes either a role, a literal like "former", or the object.
  if (fact.role && nextSegment.startsWith(fact.role)) return article(nextSegment, role(fact.role).article);
  if (objectSlugs(fact).includes(nextSegment)) return article(nextSegment, entity(fact.object).article);
  return article(nextSegment);
}

function objectSlugs(fact: Fact) {
  return [fact.object, ...(entity(fact.object).aliases ?? [])];
}

function tokenOptions(t: Token, fact: Fact, p: (typeof predicates)[string], objSlugs: string[]): string[] | "ART" {
  if (typeof t === "string") return [t];
  if (Array.isArray(t)) return t;
  const slot: Slot = t.slot;
  if (slot === "ART") return "ART";
  if (slot === "OBJ") return objSlugs;
  if (slot === "ROLE") return [`${fact.role}-${role(fact.role!).prep}`];
  const form = p[VERB_SLOTS[slot]];
  return [p.prep ? `${form}-${p.prep}` : form];
}

// ── the index ─────────────────────────────────────────────────────────────

export type Entry =
  | { kind: "fact"; factId: string; frameId: string }
  | { kind: "entity"; entityId: string; frameId: string };

export type Collection = { label: string; frameId?: string; states?: State[]; factIds: Set<string> };

export function compile() {
  const index = new Map<string, Entry[]>();
  const collections = new Map<string, Collection>();
  const canonicalByFactFrame = new Map<string, string>();
  const phrasings = new Map<string, { path: string; frameId: string }[]>();

  const add = (path: string, e: Entry) => {
    const list = index.get(path) ?? [];
    const dupe = list.some((x) => JSON.stringify(x) === JSON.stringify(e));
    if (!dupe) list.push(e);
    index.set(path, list);
  };
  const collect = (path: string, factId: string, frameId?: string) => {
    const label = path.startsWith("with/") ? `with ${entity(path.slice(5))?.name ?? path.slice(5)}` : path.replaceAll("/", " ").replaceAll("-", " ");
    const c = collections.get(path) ?? { label, frameId, factIds: new Set() };
    c.factIds.add(factId);
    collections.set(path, c);
  };

  for (const fact of facts) {
    for (const frame of frames) {
      if (!applies(frame, fact)) continue;
      const paths = expand(frame, fact);
      paths.forEach((segments, i) => {
        const path = segments.join("/");
        if (frame.target === "entity") add(path, { kind: "entity", entityId: fact.object, frameId: frame.id });
        else {
          add(path, { kind: "fact", factId: fact.id, frameId: frame.id });
          phrasings.set(fact.id, [...(phrasings.get(fact.id) ?? []), { path, frameId: frame.id }]);
        }
        if (i === 0) canonicalByFactFrame.set(`${fact.id}:${frame.id}`, path);
        // Every proper prefix is a collection: /building, /no-longer, /a/former …
        for (let n = 1; n < segments.length; n++) collect(segments.slice(0, n).join("/"), fact.id, frame.id);
      });
    }
    // Collaborator edges: /with/paddy-ryan
    for (const person of fact.with ?? []) {
      for (const slug of [person, ...(entity(person).aliases ?? [])]) {
        const c = collections.get(`with/${slug}`) ?? { label: `with ${entity(person).name}`, factIds: new Set<string>() };
        c.factIds.add(fact.id);
        collections.set(`with/${slug}`, c);
      }
    }
  }

  // Hand-picked hubs that cut across predicates and are phrased canonically.
  const hubs: Record<string, { label: string; states: State[] }> = {
    reminiscing: { label: "reminiscing about", states: ["after"] },
    "looking-back": { label: "looking back on", states: ["after"] },
    "up-to": { label: "up to", states: ["during"] },
    doing: { label: "doing", states: ["during"] },
    plotting: { label: "plotting", states: ["before", "someday"] },
  };
  for (const [path, hub] of Object.entries(hubs)) {
    collections.set(path, { label: hub.label, states: hub.states, factIds: new Set(facts.map((f) => f.id)) });
  }

  // Exact sentences win over collections that share a path.
  for (const path of index.keys()) collections.delete(path);

  return { index, collections, canonicalByFactFrame, phrasings };
}

// ── resolution and rendering ──────────────────────────────────────────────

const compiled = compile();

export function canonicalFrameId(fact: Fact, state: State): string {
  const p = predicates[fact.predicate];
  const preferred = p.canonical?.[state] ?? defaultCanonical[state];
  const frame = frames.find((f) => f.id === preferred);
  if (frame && applies(frame, fact) && (frame.when.includes(state) || p.timeless)) return frame.id;
  return frames.find((f) => applies(f, fact) && f.when.includes(state) && f.target !== "entity")?.id ?? "progressive";
}

export function canonicalPath(fact: Fact, ref = new Date()): string {
  return compiled.canonicalByFactFrame.get(`${fact.id}:${canonicalFrameId(fact, stateOf(fact, ref))}`)!;
}

/** Turn a frame into an English sentence for a fact. */
export function sentence(fact: Fact, frame: Frame, copula = "is"): string {
  const p = predicates[fact.predicate];
  const words: string[] = [];
  let cop = copula;
  for (const t of frame.tokens) {
    if (typeof t === "string" || Array.isArray(t)) {
      const lit = Array.isArray(t) ? t[0] : t;
      if (frame.style === "strike" && frame.copula && lit === frame.copula.replace(" ", "-")) {
        cop = copula === "is" ? `~~is~~ ${frame.copula}` : frame.copula;
        continue;
      }
      words.push(lit.replaceAll("-", " "));
    } else if (t.slot === "OBJ") words.push(entity(fact.object).name);
    else if (t.slot === "ROLE") words.push(`${fact.role} ${role(fact.role!).prep}`.replaceAll("-", " "));
    else if (t.slot === "ART") words.push("§ART§");
    else {
      const form = p[VERB_SLOTS[t.slot]];
      words.push(p.prep ? `${form} ${p.prep}` : form);
    }
  }
  // Resolve articles against the word that follows.
  for (let i = 0; i < words.length; i++) {
    if (words[i] === "§ART§") {
      const nextWord = words[i + 1] ?? "";
      const override = fact.role && nextWord.startsWith(fact.role.replaceAll("-", " ")) ? role(fact.role).article : undefined;
      words[i] = article(nextWord, override);
    }
  }
  return `barney ${cop} ${words.join(" ")}`;
}

function copulaFor(ref: Date, now: Date) {
  const sameDay = Math.abs(ref.getTime() - now.getTime()) < DAY;
  if (sameDay) return "is";
  return ref < now ? "was" : "will be";
}

/** Sort key: the most recent known date of a fact ("unknown" sorts last). */
const when = (f: Fact) => (f.end && f.end !== "unknown" ? f.end : f.start ?? "");

/** A fact as it appears in a list: its sentence at the reference time and where it lives. */
export type Item = { fact: Fact; sentence: string; path: string; state: State };

export type Resolution =
  | {
      kind: "fact";
      path: string;
      fact: Fact;
      frame: Frame;
      state: State;
      ok: boolean;
      claim: string;
      truth: string;
      gloss?: string;
      canonical: string;
    }
  | { kind: "entity"; path: string; entityId: string; frame: Frame; items: Item[] }
  | { kind: "collection"; path: string; label: string; items: Item[] }
  | { kind: "not-found"; path: string; suggestions: string[] };

export function resolve(rawPath: string, opts: { at?: Date; now?: Date } = {}): Resolution {
  const now = opts.now ?? new Date();
  const ref = opts.at ?? now;
  const cop = copulaFor(ref, now);
  const path = rawPath.toLowerCase().replace(/^\/+|\/+$/g, "");

  const entries = compiled.index.get(path);
  if (entries?.length) {
    // Several facts can share a phrasing (two trips to iceland).
    // Prefer one that is true right now, then the most recent.
    const ranked = entries
      .map((e) => ({ e, fact: e.kind === "fact" ? facts.find((f) => f.id === e.factId)! : undefined }))
      .sort((a, b) => {
        const fa = a.fact, fb = b.fact;
        if (!fa || !fb) return 0;
        const fr = frames.find((f) => f.id === (a.e as any).frameId)!;
        const ta = fr.when.includes(stateOf(fa, ref)) ? 1 : 0;
        const tb = fr.when.includes(stateOf(fb, ref)) ? 1 : 0;
        return tb - ta || (fb.start ?? "").localeCompare(fa.start ?? "");
      });
    const top = ranked[0].e;
    const frame = frames.find((f) => f.id === top.frameId)!;

    if (top.kind === "entity") {
      const related = facts.filter((f) => f.object === top.entityId || f.with?.includes(top.entityId as never));
      return { kind: "entity", path, entityId: top.entityId, frame, items: related.map((f) => item(f, ref, cop, now)) };
    }

    const fact = ranked[0].fact!;
    const state = stateOf(fact, ref);
    const p = predicates[fact.predicate];
    const ok = frame.when.includes(state) || !!p.timeless;
    const canonicalFrame = frames.find((f) => f.id === canonicalFrameId(fact, state))!;
    let gloss: string | undefined;

    // Time travel to before a fact started: don't invent a plan nobody had yet.
    // "barney wasn't building storyden yet (that started in 2021)".
    if (state === "before" && ref < now && !ok) {
      const progressive = frames.find((f) => f.id === "progressive")!;
      const base = sentence(fact, applies(progressive, fact) ? progressive : canonicalFrame, "wasn't");
      return {
        kind: "fact", path, fact, frame, state, ok,
        claim: sentence(fact, frame, cop),
        truth: `${base} yet`,
        gloss: fact.start ? `(that started in ${spoken(fact.start)})` : undefined,
        canonical: canonicalPath(fact, now),
      };
    }
    if (ok && (!isRecent(fact, frame, ref) || (p.timeless && state === "after"))) {
      const d = state === "before" ? fact.start : fact.end;
      const when = d && d !== "unknown" ? spoken(d) : undefined;
      if (p.timeless) gloss = when ? `(in ${when})` : "(a while ago)";
      else if (state === "before") gloss = when ? `(in ${when})` : "(at some point)";
      else gloss = when ? `(well… since ${when})` : "(well… a while ago)";
    }
    return {
      kind: "fact",
      path,
      fact,
      frame,
      state,
      ok,
      claim: sentence(fact, frame, cop),
      truth: ok ? sentence(fact, frame, cop) : sentence(fact, canonicalFrame, cop),
      gloss,
      canonical: canonicalPath(fact, now),
    };
  }

  const c = compiled.collections.get(path);
  if (c) {
    const members = facts.filter((f) => c.factIds.has(f.id));
    const frame = c.frameId ? frames.find((f) => f.id === c.frameId) : undefined;
    // A collection under a frame only lists facts the frame is true for at the reference time,
    // and phrases them with that frame: /a/former lists "a former …", not each fact's canonical.
    const live = members
      .filter((f) => (frame ? frame.when.includes(stateOf(f, ref)) : true))
      .filter((f) => (c.states ? c.states.includes(stateOf(f, ref)) : true))
      // newest first, so hubs like /reminiscing read as a timeline
      .sort((a, b) => when(b).localeCompare(when(a)));
    const phrase = (f: Fact) =>
      frame && applies(frame, f) ? frame : frames.find((x) => x.id === canonicalFrameId(f, stateOf(f, ref)))!;
    return {
      kind: "collection",
      path,
      label: `barney ${cop} ${c.label}…`,
      items: live.map((f) => ({ ...item(f, ref, cop, now), sentence: sentence(f, phrase(f), cop) })),
    };
  }

  return { kind: "not-found", path, suggestions: suggest(path) };
}

function item(f: Fact, ref: Date, cop: string, now: Date): Item {
  const state = stateOf(f, ref);
  return {
    fact: f,
    state,
    sentence: sentence(f, frames.find((x) => x.id === canonicalFrameId(f, state))!, cop),
    path: canonicalPath(f, now),
  };
}

/** Every phrasing of a fact that is true at the reference time. */
export function phrasingsOf(factId: string, ref = new Date()): string[] {
  const fact = facts.find((f) => f.id === factId);
  if (!fact) return [];
  const state = stateOf(fact, ref);
  const timeless = predicates[fact.predicate].timeless;
  return (compiled.phrasings.get(factId) ?? [])
    .filter(({ frameId }) => timeless || frames.find((f) => f.id === frameId)!.when.includes(state))
    .map(({ path }) => path);
}

/** Other facts about the same object, e.g. visiting iceland and capturing iceland. */
export function relatedTo(fact: Fact, ref = new Date()): Item[] {
  return facts.filter((f) => f.id !== fact.id && f.object === fact.object).map((f) => item(f, ref, "is", ref));
}

/** What to pre-render: each fact's canonical path now, plus every collection. Aliases render on demand. */
export function prerenderPaths(now = new Date()): string[] {
  return [...new Set([...facts.map((f) => canonicalPath(f, now)), ...compiled.collections.keys()])];
}

/** Canonical paths only, for the sitemap. */
export function sitemapPaths(now = new Date()): string[] {
  const hubs = ["reminiscing", "up-to", "plotting", "building"];
  return [...new Set([...facts.map((f) => canonicalPath(f, now)), ...hubs])];
}

// ── 404 suggestions ───────────────────────────────────────────────────────

function distance(a: string, b: string): number {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return dp[a.length][b.length];
}

export function suggest(path: string, n = 3): string[] {
  // Compare against the things worth suggesting (canonical sentences, hubs and
  // one-word collections like /building), scored by edit distance relative to
  // length, so short paths like /in don't win every time.
  const candidates = new Set([...sitemapPaths(), ...[...compiled.collections.keys()].filter((k) => !k.includes("/") && k.length > 3)]);
  return [...candidates]
    .map((k) => [k, distance(path, k) / Math.max(path.length, k.length)] as const)
    .sort((a, b) => a[1] - b[1])
    .slice(0, n)
    .map(([k]) => k);
}

// ── stats / lint ──────────────────────────────────────────────────────────

export function report(ref = new Date()) {
  const { index, collections } = compiled;
  const collisions = [...index.entries()].filter(([, es]) => es.length > 1);
  return {
    sentences: index.size,
    collections: collections.size,
    collisions: collisions.map(([path, es]) => ({ path, entries: es })),
    canonical: facts.map((f) => ({ fact: f.id, state: stateOf(f, ref), path: canonicalPath(f, ref) })),
    todos: facts.filter((f) => f.todo).map((f) => `${f.id}: ${f.todo}`).concat(
      Object.entries(entities as Record<string, EntityRecord>).filter(([, e]) => e.todo).map(([id, e]) => `${id}: ${e.todo}`),
    ),
  };
}

export const allPaths = () => [...compiled.index.keys(), ...compiled.collections.keys()];
