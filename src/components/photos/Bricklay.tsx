import { css } from "@/styled-system/css";
import { HStack } from "@/styled-system/jsx";
import { JsxStyleProps } from "@/styled-system/types";
import Image from "next/image";
import { Photograph } from "./loader";

type Props = {
  images: Photograph[];
};

// Thumbnails are rendered at a fixed height (size 48 = 12rem = 192px).
const height = 192;

export function Bricklay({ images }: Props & JsxStyleProps) {
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
          sizes={`${Math.ceil((height * i.width) / i.height)}px`}
          alt=""
        />
      ))}
    </HStack>
  );
}
