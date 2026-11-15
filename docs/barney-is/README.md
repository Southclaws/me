# barney.is sentence graph

Prep work for turning every URL on barney.is into a sentence, with past and
future tenses. **This is a working prototype, not wired into the site yet.**
It lives here so it doesn't collide with the dependency and refactor work in
flight. Once that lands, it moves into `src/` (see [Integration](#integration-plan)).

```sh
node docs/barney-is/try.mts                               # tour of sample URLs
node docs/barney-is/try.mts no-longer/working-at/metomic  # resolve a path
node docs/barney-is/try.mts building/storyden --at=2019-03  # time travel
node docs/barney-is/try.mts --report                      # canonical URLs, collisions, TODOs
node docs/barney-is/try.mts --all                         # every URL the graph can say
```

Node 22 runs the `.mts` files directly. They're `.mts` on purpose: the root
tsconfig only includes `*.ts/tsx/jsx`, so this can't break `next build` before
it's ported.

## The idea in one paragraph

A URL is a **claim** that starts with "barney is". The site looks the claim
up in a graph of facts, checks it against a reference time (now, or `?at=`),
and renders the truth. A claim that's still true is shown as-is. An outdated one
is struck through and corrected. Many phrasings reach the same fact, and each
fact's canonical URL moves through tenses on its own as time passes:

```
/going-to/build/x   →   /building/x   →   /no-longer/building/x
     (before)            (during)               (after)
```

## Model: three layers

| layer | file | holds | knows about language? |
|---|---|---|---|
| **facts** | `graph.mts` | entities, roles, and facts (event nodes) with dates | no |
| **lexicon** | `language.mts` | per-predicate verb forms, prepositions, canonical-frame overrides | yes |
| **frames** | `language.mts` | sentence templates that work for any predicate | yes |

**Facts are event nodes, not triples.** `barney → work → odin` can't hold
*when*, and tense depends entirely on when. So each fact is one node:

```ts
{ id: "odin", predicate: "work", object: "odin", role: "founding-engineer",
  with: ["paddy-ryan", "mary-lin"], start: "2021-11" }
```

That's what gives multiple pathways. The same node is reachable by predicate
(`/working-at/odin`), role (`/a/founding-engineer-at/odin`), collaborator
(`/with/paddy-ryan`) or object (`/looking-back-on/odin`). It also maps
directly onto schema.org (`Role` with `startDate`/`endDate`), so every page
can emit real JSON-LD, with an optional `/graph.jsonld` export, without
running a triplestore.

**Scaling:** adding one fact gives it every applicable phrasing. Adding one
frame adds that phrasing to every fact. Today: **25 facts → 722 sentences +
208 collection pages, 0 collisions.**

## Tense

This uses Reichenbach's three times:

- **event time**: the fact's `start`/`end` (partial dates: `2021`, `2021-09`, `2023-09-23`)
- **reference time**: now, or `?at=2019-06`
- **speech time**: now, which picks the copula: *is* / *was* / *will be*

A fact's **state** relative to reference time is `before | during | after | someday`.
Each frame declares the states in which it's true.

| state | default canonical | other frames |
|---|---|---|
| during | `building/x` | `still/building/x`, `a/founding-engineer-at/x`, `a/gym-rat`, `from/england`, `based-in/london`, `in/iceland` |
| before | `going-to/build/x` | `about-to/…` (≤30 days), `planning-to/…`, `yet-to/…`, `bound-for/x`, `to/build/x` *(headline)*, `will-be/building/x` *(strike)* |
| someday | `yet-to/visit/x` | `going-to/…`, `planning-to/…`, `dreaming-of/visiting/x` |
| after | `no-longer/building/x` | `was/building/x` *(strike)*, `the-one-who/built/x`, `someone-who-once/built/x`, `believed-to-have/built/x` *(headline; also rumoured/said/understood)*, `a/former/cto-at/x`, `back-from/x` (≤60 days) |

Predicates can override the canonical frame per state. For example, finished
jobs canonicalise to `a/former/…-at/x`, finished trips to `back-from/x`,
studies to `a/graduate-of/x`, and founding/designing to `the-one-who/…`.

### Edge cases already handled

- **Strike frames** (`was`, `will-be`) correct the domain itself:
  `barney ~~is~~ was working at Metomic`.
- **Persistent roles**: a graduate never becomes "a former graduate".
- **Recency**: `back-from/iceland` is true but stale, so it gets a gloss:
  *"barney is back from Iceland (well… since september 2021)"*.
- **Timeless predicates**: `capturing/iceland` is a photo collection, not a
  live claim. It stays canonical forever and gets a date gloss instead of a
  correction, so the existing `/capturing/iceland` URL keeps working.
- **Time travel before a fact started** doesn't invent plans:
  `building/storyden?at=2019-03` → *"barney wasn't building Storyden yet (that started in 2021)"*.
- **a/an** is picked from the following segment, with per-entity/role overrides.
- **Ambiguity**: if two facts share a phrasing (e.g. two Iceland trips), the
  one that's true at the reference time wins, then the most recent.

## Resolution rules

1. **Enumerate, don't parse.** At build time, expand facts × frames × literal
   alternatives × aliases into one `Map<path, Entry[]>`. Resolving is one lookup.
   The same keys feed `generateStaticParams` and the 404 "did you mean".
2. **Render, don't redirect.** Keep the visitor's sentence in the address bar,
   because the URL is the joke. Set `<link rel="canonical">` to the fact's
   canonical path *at the present time* (never at `?at=`).
3. **A false claim is a correction, not a 404.**
4. **Every proper prefix is a collection.** `/building`, `/no-longer`,
   `/a/former`, `/a/former/software-engineer-at` each list the facts the frame
   is currently true for, phrased with that frame.
5. **Hubs** are hand-picked collections across predicates, phrased canonically
   and sorted newest first: `/reminiscing`, `/looking-back`, `/up-to`,
   `/doing`, `/plotting`.
6. **Entity frames** (`looking-back-on/x`, `remembering/x`,
   `still-thinking-about/x`, `nostalgic-for/x`) resolve to the entity and all
   of its facts, not a single fact.
7. **Unknown paths** → playful 404 with the 3 nearest real paths (edit distance).

## Integration plan

Once the dependency/refactor work has landed:

1. Move `docs/barney-is/*.mts` → `src/graph/*.ts`. Drop the `.mts` import
   extensions, and swap the `try.mts` CLI for a small test file.
2. Replace `src/app/(default)/[verb]/` and `[verb]/[noun]/` with a single
   `[...sentence]` catch-all. `resolve()` picks the view: fact page, entity
   page, collection or 404. Existing URLs (`/building`, `/building/storyden`,
   `/capturing/iceland`) all still resolve.
3. A fact's `body` points at existing MDX (`pages/building/storyden.md`), so
   the current content loader keeps working for page bodies.
4. `generateStaticParams` ← `allPaths()`. ~900 static pages is fine. If it
   grows, pre-render only canonical paths and let the rest render on demand
   (ISR).
5. OG image (satori is already there) renders the sentence, including the
   strike-through correction. Headline-style frames get a newspaper treatment.
6. Emit schema.org JSON-LD per page, plus `/graph.jsonld`.
7. `?at=` handling, and `.txt`/`.json` variants for `curl barney.is/…`.

## Decisions for barney

- **Finished projects:** `no-longer/building/pico` reads as "abandoned".
  Suggest adding an `outcome` field (`shipped | abandoned | sold | handed-over`)
  that picks the after-state frame: `the-one-who/built/x` for shipped,
  `no-longer/building/x` for abandoned.
- **Hubs vs prefixes:** `/no-longer` (strict, frame-phrased) and
  `/reminiscing` (canonical phrasing, timeline) both exist. Keep both?
- **Alias segment literals:** `in/london` currently means *based in* (live),
  while `in/iceland` means *visiting*. Fine while they don't collide, and the
  report flags any collision.
- **Data format:** facts are TypeScript (type-checked entity/role references,
  no YAML dependency). If you'd rather write MDX frontmatter per fact, the
  compiler only needs a loader in front of it.

## Facts to confirm

`node docs/barney-is/try.mts --report` prints these. Current list:

- **odin**: the CV says "Present" but the home page talks about Odin in the past tense. End date?
- **london-gophers**: start date? Still organising?
- **pico / wisplight / scavenge-and-survive**: dates? Finished or abandoned?
- **vapourlish**: exact dates? Name the designer friend for `with`?
- **live-london**: since when?
- **trip-italy**: which month?
- **open-mp**: what's your relationship to it? (Storyden was born there.)

Sources: `/cv`, the home page, `pages/building/*.md`, and photo EXIF (Iceland
2021-09; City of London 2022-11 → 2024-06; Luxembourg 2020-01).

## Backlog: frames and features not built yet

- Opinions: `not/using-…` (needs a negated-fact type)
- Live verbs from APIs: `listening`, `reading`, `watching`, `running`, `committing`
- `at/<event>` for conference pages; `into/<topic>` for interests
- Easter eggs as hard-coded entries: `is/is/is…`, `cool` → "debatable",
  `a/robot`, `not/barney`, `lying`
- Fridge-magnet sentence builder (react-three/rapier) that navigates to valid paths
