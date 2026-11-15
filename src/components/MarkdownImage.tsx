import { css } from "@/styled-system/css";
import Image from "next/image";
import { createReadStream } from "node:fs";
import path from "node:path";
import probe from "probe-image-size";
import { ComponentProps } from "react";

const image = css({
  width: "full",
  height: "auto",
  borderRadius: "xl",
  my: "4",
});

type Props = ComponentProps<"img"> & {
  // The first image in a document may be the LCP element, so it is fetched
  // eagerly at high priority; the rest are lazy loaded.
  eager?: boolean;
};

// Markdown images point at files in /public. They are measured at render time
// so they can be served through next/image as responsive AVIF/WebP with
// explicit dimensions (no layout shift).
export async function MarkdownImage({ src, alt = "", eager }: Props) {
  if (typeof src !== "string" || !src.startsWith("/")) {
    return <img src={src as string} alt={alt} loading="lazy" />;
  }

  const { width, height } = await probe(
    createReadStream(path.join(process.cwd(), "public", src))
  );

  return (
    <Image
      className={image}
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes="(min-width: 768px) 736px, 100vw"
      {...(eager
        ? { loading: "eager", fetchPriority: "high" }
        : { loading: "lazy" })}
    />
  );
}
