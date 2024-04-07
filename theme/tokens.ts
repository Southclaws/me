import { defineTokens } from "@pandacss/dev";

// NOTE: types do not work for this package, despite being written in TS...
const { generateColorRamp, colorToCSS } = require("rampensau");

const accentColourRamp: [number, number, number][] = generateColorRamp({
  total: 10,

  hStart: 225,
  hStartCenter: 0.1,
  hCycles: 0.09,

  sRange: [0.23, 0.8],
  lRange: [0.02, 0.98],

  hEasing: (x: number) => x,
  sEasing: (x: number) =>
    x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2,
  lEasing: (x: number) => -(Math.cos(Math.PI * x) - 1) / 2,
});

const accent = Object.fromEntries(
  accentColourRamp.map((color, idx) => {
    const index = idx === 0 ? "50" : idx * 100;
    return [
      `${index}`,
      {
        value: colorToCSS(color, "hsl"),
      },
    ];
  })
);

const colours = {
  offwhite: {
    DEFAULT: { value: "hsla(40, 100%, 99%, 1)" },
    darker: { value: "hsla(40, 12%, 88%, 1)" },
    muted: { value: "hsla(40, 100%, 99%, 0.66)" },
    subtle: { value: "hsla(40, 100%, 99%, 0.1)" },
  },
  offblack: {
    DEFAULT: { value: "hsla(222, 18%, 25%, 1)" },
    lighter: { value: "hsla(222, 18%, 32%, 1)" },
    muted: { value: "hsla(222, 18%, 25%, 0.66)" },
    subtle: { value: "hsla(222, 18%, 25%, 0.1)" },
  },
  accent,
};

export const tokens = defineTokens({
  fonts: {
    orbiter: { value: "var(--font-orbiter)" },
    explorer: { value: "var(--font-explorer)" },
    inter: { value: "var(--font-inter)" },
  },
  colors: colours,
});
