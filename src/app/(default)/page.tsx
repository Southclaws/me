import { VStack, styled } from "@/styled-system/jsx";
import Link from "next/link";
import { Card } from "../components/Card/Card";

const BioParagraph = styled("p", {
  base: {
    maxW: {
      base: "full",
      md: "breakpoint-md",
    },
  },
});

export default async function Home() {
  return (
    <styled.main
      display="flex"
      flexDir="column"
      justifyContent="space-between"
      gap="4"
      height="full"
      maxW="breakpoint-md"
      marginX="auto"
    >
      <header>
        <styled.hgroup mb={{ base: "8", md: "4" }}>
          <styled.h1 lineHeight="headingFluid.lg">barney</styled.h1>
          <styled.p ml="0.5" color="fg.muted">
            barnaby keene • @southclaws
          </styled.p>
        </styled.hgroup>

        <BioParagraph>
          you can call me barney, I’m a multidisciplinary maker from england.
        </BioParagraph>

        <BioParagraph>
          with experience across a wide variety of creative tools and technical
          skills, I build and lead world-class teams for solving complex
          problems.
        </BioParagraph>

        <BioParagraph>
          I love helping advise early stage companies in their product and
          technical strategy, my <Link href="/experienced">curriculum vitae</Link> is
          available if you want to know more.
        </BioParagraph>

        <hr />

        <h2>what barney.is doing...</h2>

        <VStack py="16" gap="4">
          <Card
            title="Storyden"
            image="/building/storyden.png"
            url="https://www.storyden.org/"
            verb="building"
            noun="storyden"
            layout="left"
            eager
          >
            <p>
              A social knowledgebase platform for collecting, curating and
              sharing content.
            </p>

            <p>
              Storyden is inspired by bulletin boards of the retro web but under
              a fresh coat of paint.
            </p>

            <p>
              Powered by artificial intelligence, a community can aggregate,
              organise and discuss their niche on the platform or without
              leaving their favourite apps such as WhatsApp, Discord, Slack and
              more.
            </p>
          </Card>

          <Card
            title="Ferry"
            image="/building/ferry.png"
            url="https://www.deployferry.io/"
            verb="building"
            layout="right"
            objectPosition="right"
            eager
          >
            <p>Ferry is the applied AI laboratory for industrial operations.</p>
            <p>It&apos;s where I currently work.</p>
          </Card>

          <Card
            title="Snapping"
            image="/photography/2019-09-21 spherical.jpg"
            verb="capturing"
            layout="left"
          >
            <p>Every now and then I take a photo.</p>
            <p>Here are some of the better ones.</p>
            <p>
              I don&apos;t really use Insta/500px/etc. as I find part of the fun
              is arranging digital photo books with some colour, design and
              typography!
            </p>
          </Card>
        </VStack>
      </header>

      <footer>
        <styled.p fontSize="xs" textWrap="pretty">
          designed while sat in the barbican on saturday the twenty third of
          september two thousand twenty three. email me at hey.com, my username
          is barney.
        </styled.p>
      </footer>
    </styled.main>
  );
}
