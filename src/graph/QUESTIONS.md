# Open questions for barney

Things the graph needs that couldn't be found in the repo or on public
GitHub. Answer in chat or edit `graph.ts` directly. The repo is public, so
skip anything you'd rather not publish.

## Answered

- **Odin ended Sep 2024. Ferry since Nov 2024** (from the updated CV). Ferry
  is in the graph; Odin isn't, because the graph is now light on work.
- **Old projects, past jobs and education are out of the graph.** They stay
  on the CV (`/experienced`) only.
- **CV URL:** `/experienced`. `/cv` redirects there.
- **Location precision: city.** `based-in/london`, `in/<city>`.
- **Trips publish only once home.** Enforced in code: `visit` is an
  `unannounced` predicate, so a dated future trip has no page at all until it
  starts. Don't add a trip to the graph before you're back.
- **Tabloid frames are fine everywhere** (`believed-to-have/…`).

## Still open

### Old projects ★★ (now the biggest gap)

The past-tense vocabulary is built and gated by `outcome`, but almost nothing
in the graph has ended: `/reminiscing` is three trips and a photo set, and
`/proud-of`, `/done-with`, `/still-recovering-from`, `/a/veteran-of`,
`/nostalgic-for`, `/still-thinking-about` and `/believed-to-have/…` have
nothing to attach to.

The "less work" decision took out past *jobs* — but old *projects* are the
opposite of CV material; they're the nostalgia.

0. Which old projects go back in, and for each: rough start/end, and did it
   **ship**, get **handed over**, get **abandoned**, or did you just
   **survive** it? That last one is for `/still-recovering-from/…`.

### Future tense ★ (still open)

The graph has exactly one future fact ("yet to visit every country"), so
`/plotting`, `/going-to` and `/about-to` are nearly empty.

1. Give 3–6 things you're **going to** do: trips, launches, things to learn.
   Dates if you have them, or "someday".
2. **Every country:** how many have you visited, and which? That would give
   a live "N of 195" counter and a `/back-from/…` page per trip.

### Dates

6. **London Gophers:** since when, and are you still organising it?
7. **London:** since when?
8. **Italy trip:** which month in 2021?
9. **Storyden:** dated from the repo's creation (2021-11). Is that right?

### Maybe later

10. *(now question 0 above — the past tense needs them.)*
11. Live accounts you're happy to show: Last.fm/Spotify, Letterboxd,
    Goodreads, Strava?
12. Hot takes for `not/…`, interests for `into/…`.
13. More photo sets for `capturing/<place>`?
