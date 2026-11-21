import { CameraBackdrop } from "@/app/components/CameraBackdrop";
import { PhotoStack } from "@/app/components/PhotoStack/PhotoStack";
import { css } from "@/styled-system/css";
import { Box, Center, Square, VStack, styled } from "@/styled-system/jsx";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Capturing",
  description:
    "A small collection of the good(ish) photos and the photobooks they ended up in.",
};

const photobookSizes = "(min-width: 640px) 512px, 384px";

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
  objectFit: "cover",
});

const page = css({
  height: "lvh",
  padding: "md.fluid",
  scrollSnapAlign: "start",
  scrollSnapStop: "always",
});

const backdrop = css({
  position: "fixed",
  width: "full",
  height: "lvh",
  padding: "md.fluid",
  bgColor: "black",
  zIndex: "-1",
});

export default function Page() {
  return (
    <styled.main maxW="screen" data-stage="dark">
      <Center className={backdrop}>
        <CameraBackdrop />
      </Center>

      <Center
        className={page}
        bgColor="black/40"
        backdropBlur="md"
        backdropFilter="auto"
      >
        <VStack w="full">
          <styled.h1 fontFamily="futura" color="offwhite">
            Capturing
          </styled.h1>
          <styled.h2 fontFamily="futura" color="offwhite" fontSize="lg">
            a small collection of the good(ish) ones.
          </styled.h2>
        </VStack>
      </Center>

      <Center className={page}>
        <VStack w="full" h="full" pt="24" justifyContent="space-between">
          <styled.h1 fontFamily="futura" color="offwhite">
            My weapon of choice
          </styled.h1>
          <Box
            color="offwhite"
            fontSize="lg"
            textAlign="right"
            textWrap="balance"
          >
            <styled.p fontFamily="futura">
              a (fairly scratched) Sony α7S II from 2015
            </styled.p>
            <styled.p fontFamily="futura">
              (with lenses: 50mm and 16-35mm)
            </styled.p>
          </Box>
        </VStack>
      </Center>

      <Center className={page} bgColor="white/0" overflowX="hidden">
        <VStack gap="4" color="offwhite">
          <styled.h1 letterSpacing="tight">
            <styled.span display="inline-block" transform="rotate(7.2deg)">
              the
            </styled.span>{" "}
            <styled.span display="inline-block" transform="rotate(-1.2deg)">
              gear
            </styled.span>
          </styled.h1>
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
          <h2>and its travels</h2>
        </VStack>
      </Center>

      <Center className={page} bgColor="offwhite">
        <VStack
          alignItems="start"
          gap="12"
          p="8"
          textWrap="balance"
          maxW="prose"
          color="offblack"
        >
          <h1>photobooks</h1>
          <p>
            below are a small collection of photobooks, each one captures a
            place or a time meaningful to me.
          </p>
          <p>
            if you have any questions about any of the images, please reach out!
          </p>
        </VStack>
      </Center>

      <Center className={page} bgColor="custom.100mph">
        <VStack>
          <Link href="/capturing/city-of-london">
            <Square className={square}>
              <Image
                sizes={photobookSizes}
                src="/photography/city-of-london/carters-halt.jpg"
                width="1694"
                height="1368"
                alt="If you see this sign roaming the back streets of St. Paul's, drop by for a cuppa."
              />
            </Square>
            <styled.h2 fontFamily="albertus" color="offwhite">
              City of London
            </styled.h2>
          </Link>
        </VStack>
      </Center>

      <Center className={page} bgColor="offwhite">
        <VStack>
          <Link href="/capturing/iceland">
            <Square className={square}>
              <Image
                sizes={photobookSizes}
                src="/photography/iceland/far-from-home.jpg"
                width="1694"
                height="1368"
                alt="A sunset in Iceland."
              />
            </Square>
            <styled.h2 fontFamily="futura" color="offblack">
              Iceland
            </styled.h2>
          </Link>
        </VStack>
      </Center>
    </styled.main>
  );
}
