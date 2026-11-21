# Country photos

Barney adds these himself. Don't place a photo here on his behalf: only he
knows where a given photo was actually taken, and a wrong one is a false
claim about where he has been.

Drop a photo in here named after the country's slug and it replaces that
country's flag placeholder automatically. No code change needed.

    public/travelling/greece.jpg
    public/travelling/the-netherlands.jpg   ✗  use the slug, not the name
    public/travelling/netherlands.jpg       ✓

Slugs are the ones in the URL: /back-from/<slug>. `node src/graph/cli.ts
travelling` lists them all. jpg, jpeg, png, webp and avif all work.

Crop to 1:1. The cards are square and use object-fit: cover, so anything else
loses its edges.

Countries with no photo here fall back to a flag from ../flags, on a colour
block seeded from the country's name.
