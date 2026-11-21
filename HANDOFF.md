# Handoff: barney.is sentence site

Notes for a new Claude Code session picking this up locally. The work was
done in a cloud session on branch `claude/ecstatic-curie-ffezp3`. Delete this
file once it's no longer useful.

## Start here

```sh
git fetch origin && git checkout claude/ecstatic-curie-ffezp3
pnpm install
pnpm dev                      # or: pnpm build && pnpm start
node src/graph/cli.ts         # tour of the sentence graph in the terminal
```

Then read, in this order:
1. `src/graph/README.md`: how the graph, routing and designs fit together.
2. `src/graph/QUESTIONS.md`: what's still waiting on barney.
3. `PRODUCT.md`: audience, voice and principles. Accuracy is the top rule.
4. `AGENTS.md`: this is Next 16. Check `node_modules/next/dist/docs/` before
   writing Next code.

## The idea

The domain is `.is`, so every URL reads as a sentence: `barney.is/building/storyden`.
A graph of dated facts decides what each sentence means, in which tense, and
corrects stale claims ("~~barney is no longer building Ferry~~ → barney is
building Ferry"). Many phrasings reach one fact. Each fact, collection or
entity can have its own hand-built design; otherwise it gets a generated
layout. barney explicitly wants **every page to have a unique design, with no
shared templates**.

## Decisions barney made

- **CV moved to `/experienced`** ("barney is experienced"); `/cv` 308-redirects.
  barney will reword the CV to be more minimal himself, so leave its copy alone.
- **Less focus on work.** Old projects, past jobs and education were removed
  from the graph and from `/building`. They exist only on the CV. Don't add
  them back.
- **No MDX.** `content/` and the `[verb]/[noun]` routes were deleted, along
  with the `next-mdx-remote` dependency.
- **Designs are keyed to graph nodes** (`src/designs/registry.tsx`), not to
  route folders, so URLs can move through tenses without losing their design.
- **Generative fallback** for nodes without a bespoke design.
- **First-pass bespoke designs by Claude** for `/building` (editorial
  index), Storyden (chaptered timeline with filmstrips) and Ferry (industrial
  "manifest"). barney will restyle from here.

## What's done

- Graph, lexicon, frames and compiler: `src/graph/`
- Catch-all route: `src/app/[...sentence]/page.tsx`. Metadata, canonical,
  daily revalidation, static params.
- Designs: `src/designs/` (building, storyden, ferry, generative, registry,
  sentence helper)
- 404: `src/app/not-found.tsx` + `/api/suggest`
- Share cards: `/api/og?path=…`
- Sitemap from the graph; `/cv` redirect in `next.config.ts`
- `pnpm build` passes: 153 static pages, with no horizontal scroll at 390px or 1440px.

## Gotchas

- **Panda is strict** (`strictTokens`, `strictPropertyValues`). The designs
  use CSS modules instead, with runtime colours passed in as CSS variables.
  Theme variables are available as `var(--colors-fg)`, `var(--colors-bg)`,
  `var(--colors-link)` and `var(--colors-fg-muted)`. Fonts:
  `var(--font-orbiter)`, `--font-inter`, `--font-albertus`, `--font-futura`.
- **No `opengraph-image` inside a catch-all.** Next errors on it, which is why
  share cards come from a route handler.
- **Static route folders beat the catch-all.** `/capturing/iceland` is a real
  page; other phrasings of that fact reuse it through the registry.
- `src/graph/*.ts` import each other **with `.ts` extensions**, so Node can run
  `cli.ts` directly. Keep that, and keep `allowImportingTsExtensions` in
  tsconfig.
- `package.json` says Node 26.x. The cloud session built fine on Node 22.

## Good next steps

1. Get answers to `src/graph/QUESTIONS.md`. Future-tense facts are the biggest gap.
2. More bespoke designs, starting with the busiest generated pages: `/reminiscing`,
   `/up-to`, `/building/barney-is`, `/a/gym-rat`.
3. Consider driving the home page's "what barney.is doing" section from the
   graph (`up-to` hub), so it can't go stale.
4. Backlog ideas are in the README: `?at=` time travel, the `outcome` field,
   live verbs, easter eggs, fridge-magnet sentence builder, JSON-LD.
