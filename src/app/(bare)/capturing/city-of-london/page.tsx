import { css } from "@/styled-system/css";
import { Box, Center, Grid } from "@/styled-system/jsx";
import { createReadStream } from "fs";
import Image from "next/image";
import path from "path";
import probe from "probe-image-size";
import "./page.css";

const paths = [
  "/photography/city-of-london/DSC03773.jpg",
  "/photography/city-of-london/DSC03604.jpg",
  "/photography/city-of-london/DSC03774.jpg",
  "/photography/city-of-london/DSC03671.jpg",
  "/photography/city-of-london/DSC03672.jpg",
  "/photography/city-of-london/DSC03775.jpg",
  "/photography/city-of-london/DSC03777.jpg",
  "/photography/city-of-london/DSC03779.jpg",
  "/photography/city-of-london/DSC03780.jpg",
  "/photography/city-of-london/DSC03781.jpg",
  "/photography/city-of-london/DSC03784.jpg",
  "/photography/city-of-london/DSC03785.jpg",
  "/photography/city-of-london/DSC03793.jpg",
  "/photography/city-of-london/DSC03819.jpg",
];

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

export default async function Page() {
  const images = await Promise.all(
    paths.map(async (p) => {
      const filepath = path.join(process.cwd(), "public", p);
      const of = createReadStream(filepath);
      const metadata = await probe(of);
      return { ...metadata, path: p };
    })
  );

  return (
    <Box minH="dvh">
      {images.map((i) => (
        <Grid key={i.path} gridTemplateRows="1" gridTemplateColumns="1">
          <Box position="relative" gridRow="1/1" gridColumn="1/1">
            <Image className={backdrop} src={i.path} fill alt="" />
          </Box>

          <Center className={page} gridRow="1/1" gridColumn="1/1">
            <Image
              className={image}
              src={i.path}
              width={i.width}
              height={i.height}
              alt=""
            />
          </Center>
        </Grid>
      ))}
    </Box>
  );
}
