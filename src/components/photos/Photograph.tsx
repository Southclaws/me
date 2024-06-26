import { Photograph as PhotoType } from "@/components/photos/loader";
import { css } from "@/styled-system/css";
import { Box, Center, Grid } from "@/styled-system/jsx";
import Image from "next/image";

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
};

export function Photograph({ photo }: Props) {
  return (
    <Grid gridTemplateRows="1" gridTemplateColumns="1">
      <Box position="relative" gridRow="1/1" gridColumn="1/1">
        <Image className={backdrop} src={photo.path} fill alt="" />
      </Box>

      <Center className={page} gridRow="1/1" gridColumn="1/1">
        <Image
          className={image}
          src={photo.path}
          width={photo.width}
          height={photo.height}
          alt=""
        />
      </Center>
    </Grid>
  );
}
