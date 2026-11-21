import { css, cx } from "@/styled-system/css";
import { Box, HStack, VStack, styled } from "@/styled-system/jsx";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, PropsWithChildren } from "react";
import { lookFor } from "@/designs/generative/seed";
import styles from "./card.module.css";

type Props = {
  title: string;
  /** Optional: without one the card gets a colour block seeded from its name,
      the same palette the generated pages use. Drop a photo in to replace it. */
  image?: string;
  /** ISO 3166-1 alpha-2, for a flag on the colour block. A stand-in until
      there is a real photo of the place. */
  flag?: string;
  url?: string;

  // For pages
  verb?: string;
  noun?: string;

  layout: "left" | "right";
  objectPosition?: "center" | "top" | "bottom" | "left" | "right";

  // The first card's image can be the LCP element on small screens.
  eager?: boolean;
};

const cover = css({
  objectFit: "cover",
  borderRadius: "3xl",
});

const Badge = styled("span", {
  base: {
    bgColor: "bg",
    _hover: {
      bgColor: "bg.opaque",
    },
    borderRadius: "md",
    py: "1",
    px: "2",
    lineHeight: "relaxed",
  },
});

export function Card({
  title,
  image,
  flag,
  url,
  verb,
  noun,
  layout,
  objectPosition = "center",
  eager,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div data-layout={layout} className={styles["grid"]}>
      <div className={cx(styles["image-" + layout], styles["image"])}>
        {/* Decorative: the card's heading and copy describe the project. */}
        {image ? (
          <Image
            className={cover}
            style={{ objectPosition }}
            src={image}
            alt=""
            fill
            sizes="(min-width: 768px) 460px, 60vw"
            {...(eager
              ? { loading: "eager" as const, fetchPriority: "high" as const }
              : {})}
          />
        ) : (
          <div className={cx(cover, styles["placeholder"])} style={placeholderStyle(noun ?? title)}>
            {flag && (
              /* Real flag artwork rather than an emoji, which renders
                 differently on every platform. Plain img: these are SVGs. */
              // eslint-disable-next-line @next/next/no-img-element
              <img className={styles["flag"]} src={`/flags/${flag}.svg`} alt="" aria-hidden />
            )}
          </div>
        )}
      </div>

      <div className={cx(styles["content-" + layout], styles["content"])}>
        <CardText
          title={title}
          image={image}
          url={url}
          verb={verb}
          noun={noun}
          layout={layout}
        >
          {children}
        </CardText>
      </div>
    </div>
  );
}

export function CardText({
  title,
  url,
  verb,
  noun,
  children,
}: PropsWithChildren<Props>) {
  const localURL = noun ? `/${verb}/${noun}` : undefined;

  return (
    <Box
      bgColor="bg.opaque/80"
      borderRadius="xl"
      backdropBlur="md"
      backdropFilter="auto"
      p="2"
      boxShadow="sm"
    >
      <VStack alignItems="start" gap="0">
        <HStack>
          {verb && (
            <Badge>
              <Link href={verb} title="See what else I'm building...">
                {verb}
              </Link>
            </Badge>
          )}

          {localURL && (
            <Badge>
              <Link href={localURL} title="See what else I'm building...">
                read more...
              </Link>
            </Badge>
          )}
        </HStack>

        {url ? (
          <Link href={url}>
            <styled.h2 lineHeight="none">{title}</styled.h2>
          </Link>
        ) : (
          <styled.h2 lineHeight="none">{title}</styled.h2>
        )}
      </VStack>

      {children}
    </Box>
  );
}

/** A stand-in for a card with no photo yet, coloured from its own name so two
    cards never look the same. */
function placeholderStyle(key: string) {
  const { vars } = lookFor(`card:${key}`);
  return {
    background: `linear-gradient(140deg, ${vars["--g-ramp-1"]}, ${vars["--g-accent"]})`,
    // Reuse the generated pages' per-node tilt so no two sit at the same angle.
    "--tilt": vars["--g-tilt"],
  } as CSSProperties;
}
