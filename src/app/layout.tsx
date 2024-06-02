import type { Metadata } from "next";
import { albertus, explorer, futura, inter, orbiter } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Barney",
    default: "Barney",
  },
  description: "Multidisciplinary maker, designer and leader.",
  metadataBase: new URL("https://barney.is"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${orbiter.variable} ${explorer.variable} ${inter.variable} ${albertus.variable} ${futura.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
