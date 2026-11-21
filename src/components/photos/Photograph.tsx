import { Photograph as PhotoType } from "@/components/photos/loader";
import { css } from "@/styled-system/css";
import { Box, Center, Grid } from "@/styled-system/jsx";
import Image, { getImageProps } from "next/image";

const image = css({
  height: "auto",
  width: "auto",
  maxHeight: "lvh",
  zIndex: 1,
});

const backdrop = css({
  blur: "xl",
  opacity: 0.1,
  filter: "auto",
  zIndex: 0,
  gridRow: "1/1",
  gridColumn: "1/1",
});

const page = css({
  height: "lvh",
  scrollSnapAlign: "start",
  scrollSnapStop: "always",
});

type Props = {
  photo: PhotoType;
  // The first photo fills the initial viewport and is the LCP element.
  eager?: boolean;
};

export function Photograph({ photo, eager }: Props) {
  // Photos are constrained to the viewport height (and to the viewport width
  // by the preflight's max-width: 100%), so this is their rendered width.
  const aspect = photo.width / photo.height;

  // The ambient backdrop is decorative and heavily blurred, so a 64px wide
  // rendition stretched over the section is indistinguishable from the full
  // image. It is a CSS background so it stays out of the accessibility tree.
  const {
    props: { src: backdropSrc },
  } = getImageProps({
    src: photo.path,
    width: 64,
    height: Math.round(64 / aspect),
    alt: "",
  });

  return (
    <Grid gridTemplateRows="repeat(1, minmax(0, 1fr))" columns={1}>
      <Box position="relative" gridRow="1/1" gridColumn="1/1">
        <div
          className={backdrop}
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${JSON.stringify(backdropSrc)})`,
            backgroundSize: "100% 100%",
          }}
        />
      </Box>

      <Center className={page} gridRow="1/1" gridColumn="1/1">
        <Image
          className={image}
          src={photo.path}
          width={photo.width}
          height={photo.height}
          sizes={`min(100vw, ${Math.ceil(aspect * 100)}vh)`}
          {...(eager
            ? { loading: "eager" as const, fetchPriority: "high" as const }
            : {})}
          alt=""
        />
      </Center>
    </Grid>
  );
}
