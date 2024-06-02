"use client";

import { css } from "@/styled-system/css";
import { Grid, Square } from "@/styled-system/jsx";
import Image from "next/image";
import { MouseEvent, useState } from "react";

type Props = {
  photos: {
    src: string;
    width: number;
    height: number;
    alt: string;
  }[];
};

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

export function PhotoStack({ photos }: Props) {
  const [order, setOrder] = useState(photos.map((_, i) => i));
  const [maxAngle, setMaxAngle] = useState(10);

  const angle = deriveAngle(maxAngle);

  function cycle() {
    setOrder((prev) => {
      const next = [...prev.slice(1), prev[0]];

      return next;
    });
  }

  function expand() {
    setMaxAngle(45);
  }

  function collapse() {
    setMaxAngle(20);
  }

  return (
    <Grid onMouseEnter={expand} onMouseLeave={collapse}>
      {photos.map((p, i) => {
        const rotate = angle(i);
        const zIndex = 100 - order[i];

        return (
          <Square
            key={p.src}
            style={{
              transform: `rotate(${rotate}deg)`,
              zIndex: zIndex,
            }}
            gridRow="1/1"
            gridColumn="1/1"
            className={square}
            onClick={cycle}
          >
            <Image
              className={square}
              src={p.src}
              width={p.width}
              height={p.height}
              alt={p.alt}
            />
          </Square>
        );
      })}
    </Grid>
  );
}

const deriveAngle =
  (maxAngle: number) =>
  (index: number): number => {
    const seed = (index / Math.PI) * 666;

    const scaledMax = maxAngle * Math.min(index, 1);
    const clamped = seed % scaledMax;

    const offset = scaledMax / 2;
    const result = offset - clamped;

    if (isNaN(result)) {
      return 0;
    }

    return result;
  };
