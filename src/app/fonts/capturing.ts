import localFont from "next/font/local";

// Display faces only used by the /capturing photo pages. Their CSS variables
// are set on <html> (the theme tokens reference them from :root), but they are
// not preloaded, so browsers only download them on pages that render them.

export const albertus = localFont({
  src: [
    { path: "./static/web/AlbertusMedium.woff2", weight: "500" },
    { path: "./static/web/AlbertusExtraBold.woff2", weight: "800" },
  ],
  preload: false,
  variable: "--font-albertus",
});

export const futura = localFont({
  src: [{ path: "./static/futura.woff2", weight: "500" }],
  preload: false,
  variable: "--font-futura",
});
