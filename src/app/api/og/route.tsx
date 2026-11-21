import { orbiterBold, orbiterMedium } from "@/app/fonts/og";
import { plain } from "@/designs/sentence";
import { resolve } from "@/graph/compile.ts";
import { ImageResponse } from "next/og";

const size = { width: 1600, height: 900 };

// The share card is the sentence itself, correction included. It lives here
// rather than as an opengraph-image file because Next doesn't allow those
// inside a catch-all segment. Pages point at it via generateMetadata.
export async function GET(request: Request) {
  const path = (new URL(request.url).searchParams.get("path") ?? "").slice(0, 300);
  const res = resolve(path);

  const claim = res.kind === "fact" && !res.ok ? plain(res.claim) : undefined;
  const text =
    res.kind === "fact" ? plain(res.truth) : res.kind === "collection" ? res.label : res.kind === "entity" ? res.path.replaceAll("/", " ") : "barney isn't that. yet.";

  return new ImageResponse(
    (
      <div
        style={{
          background: "#1f1d1a",
          color: "#f4efe6",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "90px",
          fontFamily: "TASA Orbiter",
        }}
      >
        <div style={{ display: "flex", fontSize: 44, fontWeight: 800 }}>barney.is</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {claim && (
            <div style={{ display: "flex", fontSize: 56, opacity: 0.55, textDecoration: "line-through", marginBottom: 24 }}>
              {claim}
            </div>
          )}
          <div style={{ display: "flex", fontSize: text.length > 40 ? 96 : 128, fontWeight: 800, lineHeight: 1, letterSpacing: "-0.03em" }}>
            {text}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", fontSize: 40 }}>@southclaws</div>
      </div>
    ),
    {
      ...size,
      headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400" },
      fonts: [
        { name: "TASA Orbiter", data: await orbiterBold(), style: "normal", weight: 800 },
        { name: "TASA Orbiter", data: await orbiterMedium(), style: "normal", weight: 400 },
      ],
    },
  );
}
