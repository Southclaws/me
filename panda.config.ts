import { defineConfig } from "@pandacss/dev";

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

export default defineConfig({
  preflight: true,
  include: ["./src/**/*.{js,jsx,ts,tsx}"],
  exclude: [],
  jsxFramework: "react",
  strictTokens: true,
  strictPropertyValues: true,
  validation: "error",
  theme: {
    extend: {
      semanticTokens: {
        fonts: {
          heading: { value: "{fonts.orbiter}" },
          body: { value: "{fonts.inter}" },
        },
        fontSizes: {
          heading1: {
            DEFAULT: { value: "2.986rem" },
            min: { value: "3.986rem" },
            max: { value: "5.61rem" },
          },
          heading2: {
            DEFAULT: { value: "1.802rem" },
            min: { value: "1.802rem" },
            max: { value: "3.052rem" },
          },
          heading3: {
            DEFAULT: { value: "1.602rem" },
            min: { value: "1.602rem" },
            max: { value: "2.441rem" },
          },
          heading4: {
            DEFAULT: { value: "1.424rem" },
            min: { value: "1.424rem" },
            max: { value: "1.953rem" },
          },
          heading5: {
            DEFAULT: { value: "1.266rem" },
            min: { value: "1.266rem" },
            max: { value: "1.563rem" },
          },
          heading6: {
            DEFAULT: { value: "1.125rem" },
            min: { value: "1.125rem" },
            max: { value: "1.25rem" },
          },
          body: {
            DEFAULT: { value: "1rem" },
            min: { value: "1rem" },
            max: { value: "1.1rem" },
          },
          small: {
            DEFAULT: { value: "0.9rem" },
            min: { value: "0.9rem" },
            max: { value: "0.95rem" },
          },
        },
        spacing: {
          sm: {
            DEFAULT: { value: "{spacing.2}" },
            fluid: { value: "clamp(var(--spacing-2), 2vw, var(--spacing-48))" },
          },
          md: {
            DEFAULT: { value: "{spacing.4}" },
            fluid: { value: "clamp(var(--spacing-4), 4vw, var(--spacing-96))" },
          },
        },
        lineHeights: {
          headingFluid: {
            sm: { value: "calc(clamp(60px, 8vw, 80px))" },
            lg: { value: "calc(130px - clamp(0px, 6vw, 70px))" },
          },
        },
        colors: {
          fg: {
            DEFAULT: {
              value: {
                base: "{colors.offblack}",
                _osDark: "{colors.offwhite}",
              },
            },
            muted: {
              value: {
                base: "{colors.offblack.muted}",
                _osDark: "{colors.offwhite.muted}",
              },
            },
            subtle: {
              value: {
                base: "{colors.offblack.subtle}",
                _osDark: "{colors.offwhite.subtle}",
              },
            },
          },
          bg: {
            DEFAULT: {
              value: {
                base: "{colors.offwhite}",
                _osDark: "{colors.offblack}",
              },
            },
            muted: {
              value: {
                base: "{colors.offwhite.muted}",
                _osDark: "{colors.offblack.muted}",
              },
            },
            opaque: {
              value: {
                base: "{colors.offwhite.darker}",
                _osDark: "{colors.offblack.lighter}",
              },
            },
          },
          link: {
            DEFAULT: {
              value: {
                base: "{colors.accent.400}",
                _osDark: "{colors.accent.600}",
              },
            },
            hover: {
              value: {
                base: "{colors.accent.500}",
                _osDark: "{colors.accent.500}",
              },
            },
          },
          dottedOutline: {
            value: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23333' stroke-width='1' stroke-dasharray='1%2c 8' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
          },
        },
        borders: {
          dotted: {
            value: {
              width: "1",
              color: "{colors.fg.subtle}",
              style: "dashed",
            },
          },
        },
      },
      tokens: {
        fonts: {
          orbiter: { value: "var(--font-orbiter)" },
          explorer: { value: "var(--font-explorer)" },
          inter: { value: "var(--font-inter)" },
        },
        colors: {
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
        },
      },
    },
  },
  outdir: "src/styled-system",
});
