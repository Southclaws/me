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
          technical strategy, my <Link href="/cv">curriculum vitae</Link> is
          available or you can{" "}
          <a href="https://cal.com/southclaws" target="_blank">
            book a call
          </a>{" "}
          and we can have a chat!
        </BioParagraph>

        <hr />

        <h2>what barney.is doing...</h2>

        <VStack py="16" gap="4">
          <Card
            title="Storyden"
            image="https://www.storyden.org/opengraph-1280-640.png"
            url="https://www.storyden.org/"
            verb="building"
            noun="storyden"
            layout="left"
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
            title="Odin"
            image="https://assets-global.website-files.com/6537e71aeecfbb6ef3c98e9e/654ce4cac9c7a74b4908c53a_mobile_home_image-min.webp"
            // image="https://assets-global.website-files.com/6537e71aeecfbb6ef3c98e9e/65f961bd9849ea095bed75a6_Hero%20Image.png"
            url="https://www.joinodin.com/"
            verb="building"
            layout="right"
            objectPosition="top"
          >
            <p>
              Odin is a platform for building a better future by making capital
              easier to deploy.
            </p>
            <p>
              I was incredibly fortunate enough to join Paddy Ryan and Mary Lin
              in taking their MVP to a fully-fledged product.
            </p>
            <p>
              We built an incredible team and a smooth product used by some of
              the biggest angel investors and venture funds in the UK and
              Europe.
            </p>
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
        <styled.p fontSize="xs">
          designed while sat in the barbican on saturday the twenty third of
          september two thousand twenty three. email me at hey.com, my username
          is barney.
        </styled.p>
      </footer>
    </styled.main>
  );
}
