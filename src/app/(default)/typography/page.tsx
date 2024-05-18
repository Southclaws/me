import { styled, Box, HStack } from "@/styled-system/jsx";
import Link from "next/link";

export default async function Page() {
  return (
    <Box margin="auto" maxW="prose">
      <HStack gap="0" py="4">
        <Box width="8" height="8" bgColor="accent.50" />
        <Box width="8" height="8" bgColor="accent.100" />
        <Box width="8" height="8" bgColor="accent.200" />
        <Box width="8" height="8" bgColor="accent.300" />
        <Box width="8" height="8" bgColor="accent.400" />
        <Box width="8" height="8" bgColor="accent.500" />
        <Box width="8" height="8" bgColor="accent.600" />
        <Box width="8" height="8" bgColor="accent.700" />
        <Box width="8" height="8" bgColor="accent.800" />
        <Box width="8" height="8" bgColor="accent.900" />
      </HStack>

      <styled.h1 mr={{ base: "0", md: "-8" }}>heading level one</styled.h1>
      <h2>heading level two</h2>
      <h3>heading level three</h3>
      <h4>heading level four</h4>
      <h5>heading level five</h5>
      <h6>heading level six</h6>
      <p>
        the quick brown fox jumps over the lackadaisical zebra, yes this is not
        an full pangram, but it&apos;s unique and that&apos;s what matters.
      </p>

      <hr />

      <p>
        I&apos;m a bit of a typography <strong>nerd</strong>, I <em>love</em>{" "}
        typefaces and experimenting with letterforms. This is my secret
        playground for testing out the type scales for this website. The
        typeface in use is TASA Orbiter for the headings which was designed by{" "}
        <a href="https://azwz.work/">Weizhong Zhang</a> with{" "}
        <a href="https://localremote.co/">Local Remote</a> for the Taiwan Space
        Agency .
      </p>

      <blockquote>
        Reading is a magical technology, the closest humans have come so far to
        inventing telepathy,
      </blockquote>

      <p>
        ask me about the importance of <code>&amp;nbsp;</code> and{" "}
        <code>&lt;wbr/&gt;</code> and I&apos;d happily discuss the art of
        digital typesetting for hours over a beer!
      </p>

      <p>
        my go-to inspiration for type is newspapers and magazines, you may be
        able to tell from the colour scheme of this site (that is, if
        you&apos;re reading in the daytime...)
      </p>

      <p>at night it&apos;s more of a low-key restaurant menu vibe tbh.</p>

      <p>
        anyway, rambling, how did you even end up here?{" "}
        <Link href="/">go back to the home page already!</Link>
      </p>
    </Box>
  );
}
