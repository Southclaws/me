import { Box } from "@/styled-system/jsx";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const orbiter = localFont({
  src: "./TASAOrbiterVF.woff2",
  preload: true,
  variable: "--font-orbiter",
});

const explorer = localFont({
  src: "./TASAExplorerVF.woff2",
  variable: "--font-explorer",
});

const inter = Inter({
  subsets: ["latin"],
  preload: true,
  variable: "--font-inter",
});

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
      className={`${orbiter.variable} ${explorer.variable} ${inter.variable}`}
    >
      <body>
        <Box p="sm.fluid" height="full">
          {children}
        </Box>
      </body>
    </html>
  );
}
