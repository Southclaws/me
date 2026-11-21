import type { Metadata, Viewport } from "next";
import { inter, orbiter } from "./fonts";
import { albertus, futura } from "./fonts/capturing";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Barney",
    default: "Barney",
  },
  description: "Multidisciplinary maker, designer and leader.",
  metadataBase: new URL("https://barney.is"),
};

export const viewport: Viewport = {
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${orbiter.variable} ${inter.variable} ${futura.variable} ${albertus.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
