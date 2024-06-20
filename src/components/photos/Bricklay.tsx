"use client";

import { css } from "@/styled-system/css";
import { HStack } from "@/styled-system/jsx";
import { JsxStyleProps } from "@/styled-system/types";
import Image from "next/image";
import { Photograph } from "./loader";

type Props = {
  images: Photograph[];
};

export function Bricklay({ images, ...props }: Props & JsxStyleProps) {
  return (
    <HStack
      height="lvh"
      flexWrap="wrap"
      scrollSnapAlign="start"
      scrollSnapStop="always"
    >
      {images.map((i) => (
        <Image
          key={i.path}
          className={css({ height: "48", width: "auto" })}
          src={i.path}
          width={i.width}
          height={i.height}
          alt=""
        />
      ))}
    </HStack>
  );
}
