import { orbiterBold, orbiterMedium } from "@/app/fonts/og";
import { ContentPageProps } from "@/content/content";
import { token } from "@/styled-system/tokens";
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Barney";
export const size = {
  width: 1600,
  height: 900,
};
export const contentType = "image/png";

export default async function Image(props: ContentPageProps) {
  // const { metadata } = await getContent(props.params);

  return new ImageResponse(
    (
      <div
        style={{
          background: token("colors.offblack"),
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "80px",
          alignItems: "flex-start",
          justifyContent: "space-between",
          color: token("colors.offwhite"),
          fontFamily: "TASA Orbiter",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h1 style={{ fontSize: "120", fontWeight: 800 }}>barney</h1>
          <p style={{ fontSize: "80", fontWeight: 400 }}>
            is {props.params.verb}: {props.params.noun}
          </p>
        </div>

        <div
          style={{ display: "flex", width: "100%", justifyContent: "flex-end" }}
        >
          <p style={{ fontSize: "60", fontWeight: 400 }}>@southclaws</p>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "TASA Orbiter",
          data: await orbiterBold(),
          style: "normal",
          weight: 800,
        },
        {
          name: "TASA Orbiter",
          data: await orbiterMedium(),
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
