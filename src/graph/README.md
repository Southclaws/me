# barney.is sentence graph

Every URL on barney.is is a sentence that starts with "barney is". This folder
is the model behind that: what's true, how to say it, and in which tenses.

```sh
node src/graph/cli.ts                               # tour of sample URLs
node src/graph/cli.ts no-longer/building/ferry      # resolve a path
node src/graph/cli.ts building/storyden --at=2019-03  # time travel
node src/graph/cli.ts --report                      # canonical URLs, collisions, TODOs
node src/graph/cli.ts --all                         # every URL the graph can say
```

Node runs these `.ts` files directly (type stripping). That's why imports
carry `.ts` extensions, and why `tsconfig.json` sets `allowImportingTsExtensions`.

## How a request flows

```
/still/building/storyden
  → src/app/[...sentence]/page.tsx   resolve(path) against the graph
  → src/designs/registry.tsx         look up a design for the node ("fact:storyden")
  → src/designs/storyden/…           bespoke page, or the generative fallback
```

- **Static route folders win** over the catch-all: `/`, `/experienced` (the CV),
  `/capturing/*` and `/typography` are ordinary pages.
- **One route per fact.** A fact gets the canonical phrasing for the state it
  is in right now, and no other. The alternatives are not generated: a
  thousand URLs rendering one page is bad for search, and most of them were
  false anyway ("yet to build Storyden" while he is building it).
- **Designs are keyed by graph node, not URL**, so when a fact changes tense
  and its route moves (`/building/x` → `/no-longer/building/x`), the page
  comes with it.
- **No design? Generated layout.** `src/designs/generative/` seeds a
  composition (billboard, corner, column or tiles), a palette (rampensau) and a
  typeface from the node's key, so every page still looks different.
- **A route that has gone stale corrects itself.** The index is built with the
  current date, so between daily rebuilds a fact can move on while its old
  route is still live. That page strikes the claim and shows the truth rather
  than lying: "~~barney is building Ferry~~ → barney is no longer building
  Ferry".
- **Unknown sentences** get a real 404 (`src/app/not-found.tsx`) that says
  "barney isn't skydiving." and suggests the nearest real sentences via
  `/api/suggest`.
- **Canonical:** `rel=canonical` points at the fact's route for right now, and
  the sitemap lists those plus the hubs.
- **Share cards** come from `/api/og?path=…`. Next doesn't allow
  `opengraph-image` files inside a catch-all.
- **Pre-rendering:** every route is built statically, since there are now few
  enough to do that. `revalidate = 86400`, so a fact moves to its new route
  within a day of its tense changing, without a deploy.

## Model: three layers

| layer | file | holds |
|---|---|---|
| **facts** | `graph.ts` | entities, roles, and facts (event nodes) with dates. No language. |
| **lexicon** | `language.ts` | per-predicate verb forms, prepositions, canonical-frame overrides |
| **frames** | `language.ts` | the phrasings available to be a state's canonical |
| **compiler** | `compile.ts` | enumerates every sentence, resolves and corrects claims |

**Facts are event nodes, not triples**, because tense needs *when*:

```ts
{ id: "ferry", predicate: "build", object: "ferry", role: "head-of-engineering", start: "2024-11" }
```

The same node is reachable by predicate (`/building/ferry`), role
(`/a/head-of-engineering-at/ferry`) and, once it ends, by past frames
(`/a/former/head-of-engineering-at/ferry`, `/the-one-who/built/ferry`).

The graph is **deliberately light on work.** Past jobs, education and old
projects live on the CV (`/experienced`) only.

## Tense

A fact's state relative to the reference time is `before | during | after | someday`.
Each frame declares the states in which it's true.

| state | default canonical | other frames |
|---|---|---|
| during | `building/x` | `still/building/x`, `a/<role>-at/x`, `a/gym-rat`, `from/england`, `based-in/london`, `in/iceland` |
| before | `going-to/build/x` | `about-to/…` (≤30 days), `planning-to/…`, `yet-to/…`, `to/build/x` *(headline)* |
| someday | `yet-to/visit/x` | `going-to/…`, `planning-to/…`, `dreaming-of/visiting/x` |
| after | `no-longer/building/x` | `the-one-who/built/x`, `someone-who-once/built/x`, `believed-to-have/built/x` *(headline)*, `a/former/<role>-at/x`, `back-from/x` (≤60 days) |

## Outcome: which past tense

"is" has a lot of past tenses, and the honest one depends on how the thing
ended rather than on its verb. A fact may carry an `outcome`, which picks its
canonical past phrasing and unlocks the attitude frames:

| outcome | canonical past | also unlocks |
|---|---|---|
| `shipped` | `the-one-who/built/x` | `proud-of/x`, `a/veteran-of/x` |
| `handed-over` | `no-longer/building/x` | `proud-of/x`, `a/veteran-of/x` |
| `abandoned` | `done-with/x` *(alias `over/x`)* | — |
| `survived` | `still-recovering-from/x` | `a/veteran-of/x` |
| *(unset)* | the predicate's canonical | — |

The gating is strict on purpose: `proud-of/x` only exists for something that
shipped, so the site can't claim a feeling that isn't recorded. A path that's
blocked this way 404s and suggests the honest phrasing instead
(`/proud-of/thing` → "did you mean /done-with/thing?").

This is what makes `/reminiscing` read as a varied timeline rather than a
column of "no longer …".

No frame starts with "was" or "will be". The domain already supplies "is", so
`barney.is/was/building/x` would read "barney is was building x". Striking the
"is" through only hid that it was never a sentence. Every tense above reaches
the past or the future with words that follow "is" properly.

Handled edge cases:
- **Corrections** strike the visitor's claim, not the domain: asking for
  `/no-longer/building/ferry` shows that claim struck through, then the truth.
- **Persistent roles** never get "a former …".
- **Recency glosses**: "back from Iceland (well… since september 2021)".
- **Timeless predicates**: `capturing/x` stays true forever, with a date gloss.
- **Time travel before a fact started**: "barney wasn't building Storyden yet".
- **Unannounced predicates**: `visit` is marked `unannounced`, so a dated trip
  has no page at all until it starts — no URL, no sitemap entry, no 404
  suggestion, no entity page. Trips are published only once barney is home.
  `someday` facts are exempt, so `yet-to/visit/every-country` still works.
  `--report` lists anything currently withheld.
- **a/an** is picked from the following word.
- **Ambiguous phrasings** prefer the fact that's true now, then the most recent.

Collections: every proper prefix of a sentence is a collection (`/building`,
`/no-longer`, `/a/former`). Hand-picked hubs cut across predicates:
`/reminiscing`, `/looking-back`, `/up-to`, `/doing`, `/plotting`.

## Adding things

- **A fact:** add it to `graph.ts`. It gets one route, chosen for its state.
- **A phrasing:** add a frame to `language.ts`, then make it somebody's
  canonical in `defaultCanonical`, a predicate's `canonical`, or
  `canonicalByOutcome`. A frame that is nobody's canonical generates nothing.
- **A bespoke page:** build a component in `src/designs/<name>/` and register
  it in `src/designs/registry.tsx` under `fact:<id>`, `collection:<path>` or
  `entity:<id>`.

## Backlog

- `?at=` time travel on the site. The resolver supports it, but static pages
  can't read search params. One option is a proxy rewrite to a dynamic route.
- More outcomes, if the four aren't enough.
- Opinions (`not/…`), live verbs from APIs (`listening`, `reading`, `running`),
  `into/<topic>`, `at/<event>`.
- Easter eggs: `is/is/is…`, `cool` → "debatable", `a/robot`, `not/barney`.
- Fridge-magnet sentence builder (react-three/rapier).
- JSON-LD (schema.org `Role`) per page, plus `/graph.jsonld`.
