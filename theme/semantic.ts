import { defineSemanticTokens } from "@pandacss/dev";
import { fontSizes, fonts } from "./fonts";

export const semanticTokens = defineSemanticTokens({
  fonts,
  fontSizes,
  spacing: {
    sm: {
      DEFAULT: { value: "{spacing.2}" },
      fluid: { value: "clamp(var(--spacing-2), 2vw, var(--spacing-48))" },
    },
    md: {
      DEFAULT: { value: "{spacing.4}" },
      fluid: { value: "clamp(var(--spacing-4), 4vw, var(--spacing-96))" },
    },
    headerGroup: { value: "clamp(0px, calc(1rem - 2vw), 0.5rem)" },
  },
  lineHeights: {
    headingFluid: {
      sm: { value: "calc(clamp(60px, 8vw, 80px))" },
      lg: { value: "calc(130px - clamp(0px, 6vw, 70px))" },
    },
    headerGroup: { value: "0.6" },
  },
  colors: {
    offwhite: {
      value: "{colors.offwhite.800}",
    },
    offblack: {
      value: "{colors.offblack.600}",
    },
    accent: {
      value: {
        base: "{colors.accent.500}",
        _osDark: "{colors.accent.800}",
      },
    },
    fg: {
      DEFAULT: {
        value: {
          base: "{colors.offblack}",
          _osDark: "{colors.offwhite}",
        },
      },
      muted: {
        value: {
          base: "{colors.offwhite.50}",
          _osDark: "{colors.offwhite.50}",
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
          base: "{colors.offwhite.700}",
          _osDark: "{colors.offblack.500}",
        },
      },
      opaque: {
        value: {
          base: "{colors.offwhite.700}",
          _osDark: "{colors.offblack.500}",
        },
      },
    },
    link: {
      DEFAULT: {
        value: {
          base: "{colors.accent.500}",
          _osDark: "{colors.accent.600}",
        },
      },
      hover: {
        value: {
          base: "{colors.accent.600}",
          _osDark: "{colors.accent.500}",
        },
      },
    },
  },
  borders: {
    dotted: {
      value: {
        width: "1",
        color: "{colors.fg.muted}",
        style: "dashed",
      },
    },
  },
});
