# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Potential advisory/collaboration clients.** Founders or companies evaluating whether to bring Barney in for product/technical strategy advice. The CV and the "building" page carry the most weight for this audience.
- **Peers, friends, and online acquaintances.** People who know him from GitHub, Twitter/X, his blog, or the London Gophers meetup, checking in on what he's up to.
- **People following a specific project.** Visitors arriving for Storyden, Ferry, or the photography specifically, not for Barney as a person.

All three audiences matter; the site is not tuned to prioritize one over the others.

## Product Purpose

A credible, accurate, and currently up-to-date professional presence. If someone looks Barney up, the site should answer "what does this person actually do" correctly, without embarrassing him and without pushing for any particular action. It is explicitly not conversion-optimized: there is no hard call-to-action, and a prior request removed a "book a call" line from the home page bio for exactly this reason (he doesn't have time to take calls).

## Operating Context

- The home page is the entry point for most visitors: a short bio, then "what barney.is doing" (current projects as cards linking out to their own sites).
- `/building` expands on current and past projects with fuller descriptions, split into "Current projects" and "Past projects" sections.
- `/capturing` is a standalone photography showcase (e.g. Iceland, City of London galleries), visually separate from the rest of the site (bare layout, no shared header/footer).
- `/cv` is a full, printable curriculum vitae (has its own print button) used for both advisory-conversation and recruiter audiences.
- `/typography` is an internal type-scale test page, not meant for general visitors.
- Project cards on the home page and `/building` page link out to the actual live product (e.g. storyden.org, deployferry.io) rather than hosting the pitch itself.

## Capabilities and Constraints

- Next.js (App Router) + Panda CSS site, MDX-driven content for the `/building` pages, static/SSG where possible.
- Project card images are hosted locally in `public/building/` rather than hotlinked — a prior external image (storyden.org's old og:image) 404'd, and another (a Behance/CloudFront asset) failed to load on networks using NAT64, so hotlinking third-party CDNs was dropped project-wide for card art.
- CV content must stay factually current (dates, titles) even when kept intentionally vague on specifics.

## Brand Commitments

- Goes by "barney" (full name Barnaby Keene), handle `@southclaws`.
- Home page voice is deliberately lowercase, informal, and dry/understated ("you can call me barney, I'm a multidisciplinary maker from england") rather than a polished corporate personal-brand tone. This lowercase, conversational register is an intentional stylistic choice, not an oversight.
- Self-description: "multidisciplinary maker, designer and leader" (site metadata), and on the CV: "a passionate and enthusiastic lover of all things electronic, mechanical and visual... a multidisciplinary leader with a truly full-stack experience."

## Evidence on Hand

- Real, current CV employment history (Ferry, Odin, Metomic, Novaura, Ytterate, Utility Warehouse, Spotlight Data, early freelance/sysadmin work), each with real dates, locations, and skills.
- Real project descriptions with live links: Storyden (storyden.org), Ferry (deployferry.io), and past projects Odin (joinodin.com), etc.
- Real photography (Iceland and City of London galleries, plus individual shots used as card art).
- No testimonials, case studies, press mentions, or third-party endorsements exist on the site; none should be fabricated.

## Product Principles

- Accuracy and currency over polish or persuasion — the site should never say something false or stale about what Barney is doing now.
- No hard calls-to-action; the site presents, it doesn't sell.
- One understated, lowercase, personal voice throughout, not a corporate pitch register.
- Serve all four audiences (clients, recruiters, peers, project-followers) from the same content rather than segmenting or specializing the experience per audience.
- Prefer self-hosting real assets (images, content) over depending on third-party sites staying up or stable.
