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
});
