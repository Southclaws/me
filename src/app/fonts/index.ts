import localFont from "next/font/local";

// The stylesheet is inlined into the document, so @font-face rules are
// discovered immediately and the browser only fetches the faces a page
// renders. Only the body face is preloaded (it sets most of the text, and a
// late swap would shift the layout); heading faces would otherwise compete
// with the LCP image for bandwidth.

// Headings. The variable font covers the heavy weights (800/900) and the
// Display cuts are what browsers pick for the exact 500/700 matches.
export const orbiter = localFont({
  src: [
    { path: "./static/TASAOrbiterVF.woff2", weight: "100 900" },
    { path: "./static/web/TASAOrbiterDisplay-Medium.woff2", weight: "500" },
    { path: "./static/web/TASAOrbiterDisplay-Bold.woff2", weight: "700" },
  ],
  preload: false,
  variable: "--font-orbiter",
});

// Body copy is set in Inter Display Italic. The face is deliberately
// registered as the *normal* style: that is how the site has always rendered
// (the previous 38-file declaration resolved to this face), but now a single
// file is shipped, subset to Latin/Latin Extended (~43KB instead of ~4MB of
// preloaded fonts). Only the regular weight is included: bold Inter appears
// in a single <strong> on /typography, which the browser emboldens itself,
// and every extra face would be preloaded on every page.
//
// For upright Inter instead, swap this for InterDisplay-Regular.
export const inter = localFont({
  src: [{ path: "./static/web/InterDisplay-Italic.woff2", weight: "400" }],
  preload: true,
  variable: "--font-inter",
});
