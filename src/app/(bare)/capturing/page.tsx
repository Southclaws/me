import { PhotoStack } from "@/app/components/PhotoStack/PhotoStack";
import { css } from "@/styled-system/css";
import { Box, Center, Grid, Square, VStack, styled } from "@/styled-system/jsx";
import Image from "next/image";
import Link from "next/link";

const square = css({
  w: "full",
  position: "relative",
  maxH: {
    base: "sm",
    sm: "lg",
  },
  maxW: {
    base: "sm",
    sm: "lg",
  },
  overflow: "hidden",
  borderRadius: {
    base: "xl",
    lg: "2xl",
  },
  boxShadow: "2xl",
  objectFit: "cover",
});

const page = css({
  height: "lvh",
  padding: "md.fluid",
  scrollSnapAlign: "start",
  scrollSnapStop: "always",
});

export default async function Page() {
  return (
    <Box>
      <Center className={page} bgColor="custom.aswad-black">
        <PhotoStack
          photos={[
            {
              src: "/photography/2019-09-21 spherical.jpg",
              width: 1694,
              height: 1368,
              alt: "Taking a photo of myself in a spherical mirror at the Tom Dixon store in Kings Cross Coal Drops Yard.",
            },
            {
              src: "/photography/DSC00771.jpg",
              width: 2832,
              height: 2832,
              alt: "A lens one of the first founders I worked with gave me as a gift!",
            },
            {
              src: "/photography/2020-01-31 sony-luxembourg.jpg",
              width: 3456,
              height: 4608,
              alt: "The Sony overlooking Luxembourg.",
            },
            {
              src: "/photography/2019-10-02 sony-mountain.jpg",
              width: 3456,
              height: 3456,
              alt: "The Sony in Zakopane.",
            },
            {
              src: "/photography/2020-05-17 sony-forest.jpg",
              width: 3456,
              height: 4608,
              alt: "The Sony on a forest floor.",
            },
            {
              src: "/photography/film at kc.jpg",
              width: 3024,
              height: 4032,
              alt: "Praktika BX20 at Kings Cross.",
            },
            {
              src: "/photography/film in snow.jpg",
              width: 3024,
              height: 4032,
              alt: "Praktika BX20 chilling.",
            },
            {
              src: "/photography/IMG_1409.HEIC.jpg",
              width: 3024,
              height: 4032,
              alt: "Sony by the sea.",
            },
            {
              src: "/photography/IMG_2965.HEIC.jpg",
              width: 3024,
              height: 4032,
              alt: "Praktika BX20 somewhere on a rooftop (I forgot where).",
            },
          ]}
        />
      </Center>

      <Center className={page} bgColor="custom.100mph">
        <VStack>
          <Square className={square}>
            <Image
              src="/photography/city-of-london/DSC03819.jpg"
              width="1694"
              height="1368"
              alt="If you see this sign roaming the back streets of St. Paul's, drop by for a cuppa."
            />
          </Square>
          <Link href="/capturing/city-of-london">
            <styled.h2 fontFamily="albertus" color="offwhite">
              City of London
            </styled.h2>
          </Link>
        </VStack>
      </Center>

      {/* <Center
        h="lvh"
        bgColor="offwhite.700"
        scrollSnapAlign="start"
        scrollSnapStop="always"
      >
        <VStack>
          <Square className={square}>
            <Image
              src="/photography/city-of-london/DSC03819.jpg"
              width="1694"
              height="1368"
              alt="Taking a photo of myself in a spherical mirror at the Tom Dixon store in Kings Cross Coal Drops Yard."
              
            />
          </Square>
          <styled.h2 fontFamily="futura" color="offblack.600">
            Iceland
          </styled.h2>
        </VStack>
      </Center> */}
    </Box>
  );
}
