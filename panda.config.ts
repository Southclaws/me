import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  preflight: true,
  include: ["./src/**/*.{js,jsx,ts,tsx}"],
  exclude: [],
  jsxFramework: "react",
  strictTokens: true,
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
            DEFAULT: { value: "2.488rem" },
            min: { value: "3.488rem" },
            max: { value: "4.209rem" },
          },
          heading3: {
            DEFAULT: { value: "2.074rem" },
            min: { value: "3.074rem" },
            max: { value: "3.157rem" },
          },
          heading4: {
            DEFAULT: { value: "1.728rem" },
            min: { value: "2.728rem" },
            max: { value: "2.369rem" },
          },
          heading5: {
            DEFAULT: { value: "1.44rem" },
            min: { value: "1.44rem" },
            max: { value: "1.777rem" },
          },
          heading6: {
            DEFAULT: { value: "1.2rem" },
            min: { value: "1.2rem" },
            max: { value: "1.333rem" },
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
          md: {
            DEFAULT: { value: "{spacing.4}" },
            fluid: { value: "clamp(var(--spacing-4), 4vw, var(--spacing-96))" },
          },
        },
        lineHeights: {
          headingFluid: { value: "calc(130px - clamp(0px, 6vw, 70px))" },
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
          },
          link: {
            value: {
              base: "{colors.accent.500}",
              _osDark: "{colors.accent.800}",
            },
          },
          outline: {
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
            muted: { value: "hsla(40, 100%, 99%, 0.66)" },
            subtle: { value: "hsla(40, 100%, 99%, 0.1)" },
          },
          offblack: {
            DEFAULT: { value: "hsla(222, 18%, 25%, 1)" },
            muted: { value: "hsla(222, 18%, 25%, 0.66)" },
            subtle: { value: "hsla(222, 18%, 25%, 0.1)" },
          },
          accent: {
            "50": {
              value: "hsl(28deg 50% 95%)",
              description: "Silver Bird",
            },
            "100": {
              value: "hsl(64deg 31% 12%)",
              description: "Burrito",
            },
            "200": {
              value: "hsl(60deg 32% 15%)",
              description: "Crepe",
            },
            "300": {
              value: "hsl(56deg 32% 20%)",
              description: "Packing Paper",
            },
            "400": {
              value: "hsl(52deg 33% 28%)",
              description: "Salted Capers",
            },
            "500": {
              value: "hsl(48deg 35% 36%)",
              description: "Garden Weed",
            },
            "600": {
              value: "hsl(44deg 37% 46%)",
              description: "Reptile Revenge",
            },
            "700": {
              value: "hsl(40deg 40% 57%)",
              description: "Jungle King",
            },
            "800": {
              value: "hsl(36deg 43% 69%)",
              description: "Graphite",
            },
            "900": {
              value: "hsl(32deg 46% 82%)",
              description: "Underworld",
            },
          },
        },
      },
    },
  },
  outdir: "src/styled-system",
});
