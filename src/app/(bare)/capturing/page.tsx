"use client";

import { Box, Grid, VStack, styled } from "@/styled-system/jsx";
import React, { useRef } from "react";

export default function Page() {
  return (
    <>
      <Grid
        w="full"
        minH="dvh"
        maxH="dvh"
        height="dvh"
        gap="0"
        userSelect="none"
      >
        {[
          { bg: "accent.100" as const, fg: "accent.200" as const },
          { bg: "accent.200" as const, fg: "accent.300" as const },
          { bg: "accent.300" as const, fg: "accent.400" as const },
          { bg: "accent.400" as const, fg: "accent.500" as const },
          { bg: "accent.500" as const, fg: "accent.600" as const },
          { bg: "accent.600" as const, fg: "accent.700" as const },
          { bg: "accent.700" as const, fg: "accent.800" as const },
          { bg: "accent.800" as const, fg: "accent.900" as const },
          { bg: "accent.700" as const, fg: "accent.800" as const },
          { bg: "accent.600" as const, fg: "accent.700" as const },
          { bg: "accent.500" as const, fg: "accent.600" as const },
          { bg: "accent.400" as const, fg: "accent.500" as const },
          { bg: "accent.300" as const, fg: "accent.400" as const },
          { bg: "accent.200" as const, fg: "accent.300" as const },
          { bg: "accent.100" as const, fg: "accent.200" as const },
        ].map((d, i) => (
          <Row key={i} d={d} i={i} />
        ))}
      </Grid>

      <VStack
        position="absolute"
        top="0"
        right="0"
        h="dvh"
        justify="start"
        p="md.fluid"
      >
        <Box
          bgColor="accent.800/50"
          p="8"
          backdropBlur="md"
          backdropFilter="auto"
          color="accent.100/80"
          borderRadius="2xl"
          // blur="xl"
          // filter="auto"
          maxW={{
            base: "4/2",
            md: "3/2",
            lg: "1/2",
          }}
        >
          <h1>capturing images</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A, mollitia
            tempora velit esse ad id dolore natus totam sed commodi aspernatur
            in, magnam ab deleniti? Cum excepturi repellendus facere quibusdam!
          </p>
          <styled.img
            src="https://source.unsplash.com/random/400x320"
            borderRadius="lg"
          />
        </Box>
      </VStack>
    </>
  );
}

function Row({ d, i }: any) {
  const mp = useMousePosition();

  const ref = useRef<HTMLDivElement>(null);

  const y = Math.abs(
    (ref.current?.getClientRects()[0]?.top +
      ref.current?.clientHeight / 2 -
      mp.y) /
      window.innerHeight
  );

  const fontWeight = 900 - 900 * y;

  return (
    <Box
      ref={ref}
      w="full"
      bgColor={d.bg}
      overflow="hidden"
      style={
        {
          "--w": fontWeight,
        } as any
      }
    >
      <styled.h1
        fontFamily="explorer"
        fontSize="6xl"
        lineHeight="tight"
        fontWeight="var(--w)"
        color={d.fg}
      >
        capturing
      </styled.h1>
    </Box>
  );
}

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = React.useState({
    x: null,
    y: null,
  });
  React.useEffect(() => {
    const updateMousePosition = (ev) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);
  return mousePosition;
};
