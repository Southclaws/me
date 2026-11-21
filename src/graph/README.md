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
- **Designs are keyed by graph node, not URL.** Every phrasing that reaches a
  node renders its design, so the URL can move through tenses
  (`/building/x` → `/no-longer/building/x`) and the page stays the same.
- **No design? Generated layout.** `src/designs/generative/` seeds a
  composition (billboard, corner, column or tiles), a palette (rampensau) and a
  typeface from the node's key, so every page still looks different.
- **Wrong claims are corrected, not 404'd.** `/no-longer/building/ferry`
  renders "~~barney is no longer building Ferry~~ → barney is building Ferry".
- **Unknown sentences** get a real 404 (`src/app/not-found.tsx`) that says
  "barney isn't skydiving." and suggests the nearest real sentences via
  `/api/suggest`.
- **Canonical:** the visitor's phrasing stays in the address bar, and
  `rel=canonical` points at the fact's canonical phrasing *right now*. The
  sitemap lists only canonical paths and hubs.
- **Share cards** come from `/api/og?path=…`. Next doesn't allow
  `opengraph-image` files inside a catch-all.
- **Pre-rendering:** each fact's canonical path and every collection are built
  statically. Aliases render on first visit and are cached. `revalidate = 86400`
  so tenses update daily without a deploy.

## Model: three layers

| layer | file | holds |
|---|---|---|
| **facts** | `graph.ts` | entities, roles, and facts (event nodes) with dates. No language. |
| **lexicon** | `language.ts` | per-predicate verb forms, prepositions, canonical-frame overrides |
| **frames** | `language.ts` | sentence templates that work for any predicate |
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
| before | `going-to/build/x` | `about-to/…` (≤30 days), `planning-to/…`, `yet-to/…`, `bound-for/x`, `to/build/x` *(headline)*, `will-be/building/x` *(strike)* |
| someday | `yet-to/visit/x` | `going-to/…`, `planning-to/…`, `dreaming-of/visiting/x` |
| after | `no-longer/building/x` | `was/building/x` *(strike)*, `the-one-who/built/x`, `someone-who-once/built/x`, `believed-to-have/built/x` *(headline)*, `a/former/<role>-at/x`, `back-from/x` (≤60 days) |

Handled edge cases:
- **Strike frames** correct the domain itself ("barney ~~is~~ was …").
- **Persistent roles** never get "a former …".
- **Recency glosses**: "back from Iceland (well… since september 2021)".
- **Timeless predicates**: `capturing/x` stays true forever, with a date gloss.
- **Time travel before a fact started**: "barney wasn't building Storyden yet".
- **a/an** is picked from the following word.
- **Ambiguous phrasings** prefer the fact that's true now, then the most recent.

Collections: every proper prefix of a sentence is a collection (`/building`,
`/no-longer`, `/a/former`). Hand-picked hubs cut across predicates:
`/reminiscing`, `/looking-back`, `/up-to`, `/doing`, `/plotting`.

## Adding things

- **A fact:** add it to `graph.ts`. Every applicable phrasing appears automatically.
- **A phrasing:** add a frame to `language.ts`, and it applies to every fact.
- **A bespoke page:** build a component in `src/designs/<name>/` and register
  it in `src/designs/registry.tsx` under `fact:<id>`, `collection:<path>` or
  `entity:<id>`.

## Backlog

- `?at=` time travel on the site. The resolver supports it, but static pages
  can't read search params. One option is a proxy rewrite to a dynamic route.
- An `outcome` field (`shipped | abandoned | handed-over`) to choose
  after-state frames.
- Opinions (`not/…`), live verbs from APIs (`listening`, `reading`, `running`),
  `into/<topic>`, `at/<event>`.
- Easter eggs: `is/is/is…`, `cool` → "debatable", `a/robot`, `not/barney`.
- Fridge-magnet sentence builder (react-three/rapier).
- JSON-LD (schema.org `Role`) per page, plus `/graph.jsonld`.
