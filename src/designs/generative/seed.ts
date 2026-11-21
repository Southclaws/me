import { colorUtils, generateColorRamp } from "rampensau";

// Deterministic per-node look: the same node always gets the same page, and
// different nodes almost always get different ones.

function fnv1a(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

export const compositions = ["billboard", "corner", "column", "tiles"] as const;
export type Composition = (typeof compositions)[number];

// Albertus and Futura are barney's to place deliberately (the photobooks and
// whatever he decides next), so neither is in the generated pool. Variety here
// comes from the composition, the palette and the tilt instead.
const typefaces = ["var(--font-orbiter)", "var(--font-inter)"];

export type Look = {
  composition: Composition;
  vars: Record<string, string>;
};

export function lookFor(key: string): Look {
  const seed = fnv1a(key);
  const hue = seed % 360;
  const dark = ((seed >>> 9) & 1) === 1;
  const accentHue = (hue + 120 + ((seed >>> 11) % 120)) % 360;

  // Background and text are fixed-lightness pairs, so contrast holds for any hue.
  const bg = dark ? `hsl(${hue} 28% 9%)` : `hsl(${hue} 40% 94%)`;
  const fg = dark ? `hsl(${hue} 20% 92%)` : `hsl(${hue} 30% 11%)`;
  const muted = dark ? `hsl(${hue} 12% 68%)` : `hsl(${hue} 14% 34%)`;
  const accent = dark ? `hsl(${accentHue} 70% 66%)` : `hsl(${accentHue} 65% 32%)`;

  // A gentle ramp for decorative tiles and rules, kept close to the background
  // lightness so body text on top of it stays readable.
  const ramp = generateColorRamp({
    total: 6,
    hStart: hue,
    hCycles: 0.35,
    sRange: [0.25, 0.6],
    lRange: dark ? [0.13, 0.26] : [0.86, 0.93],
  }).map((c) => colorUtils.colorToCSS(c, "hsl"));

  const vars: Record<string, string> = {
    "--g-bg": bg,
    "--g-fg": fg,
    "--g-muted": muted,
    "--g-accent": accent,
    "--g-face": typefaces[(seed >>> 3) % typefaces.length],
    "--g-tilt": `${((seed >>> 5) % 7) - 3}deg`,
    "color-scheme": dark ? "dark" : "light",
  };
  ramp.forEach((c, i) => (vars[`--g-ramp-${i}`] = c));

  return { composition: compositions[(seed >>> 1) % compositions.length], vars };
}
