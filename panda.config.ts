import { defineConfig } from "@pandacss/dev";
import { semanticTokens } from "./theme/semantic";
import { tokens } from "./theme/tokens";

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
      tokens,
      semanticTokens,
    },
  },
  outdir: "src/styled-system",
});
