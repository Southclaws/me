import { dailyTravelling } from "@/designs/travelling/daily";
import { VStack, styled } from "@/styled-system/jsx";
import Link from "next/link";
import type { PropsWithChildren } from "react";
import { Card } from "../components/Card/Card";

// The travelling picks change with the day, so the page is rebuilt daily.
export const revalidate = 86400;

const BioParagraph = styled("p", {
  base: {
    maxW: {
      base: "full",
      md: "breakpoint-md",
    },
  },
});

export default async function Home() {
  const travelling = dailyTravelling(5);

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
            barnaby keene •{" "}
            <a target="_blank" href="https://x.com/southclaws">
              @southclaws
            </a>
          </styled.p>
        </styled.hgroup>

        <BioParagraph>
          you can call me barney, I’m a multidisciplinary maker from england.
        </BioParagraph>

        <BioParagraph>
          with <Link href="/experienced">experience</Link> across a wide variety
          of creative tools and technical skills, I build and lead world-class
          teams for solving complex problems in a broad gamut of domains.
        </BioParagraph>

        <hr />

        <Section path="working">
          <Card
            title="Ferry"
            image="/building/ferry.png"
            url="https://www.deployferry.io/"
            verb="working-at"
            noun="ferry"
            layout="left"
            objectPosition="right"
            eager
          >
            <p>Ferry is the applied AI laboratory for industrial operations.</p>
            <p>I lead the engineering side of the business.</p>
          </Card>
        </Section>

        <Section path="building">
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
            title="Rad"
            image="/building/rad.png"
            url="https://radengine.dev"
            verb="building"
            noun="rad"
            layout="right"
          >
            <p>Relational, without the SQL.</p>
            <p>
              A database built for how applications actually use data, backed by
              object storage.
            </p>
          </Card>

          <Card
            title="Tools"
            image="/building/tools.png"
            verb="building"
            noun="tools"
            layout="left"
          >
            <p>
              Small things I built mostly because I wanted them to exist and
              nobody else had made one.
            </p>
            <p>None of them are a product.</p>
          </Card>
        </Section>

        <Section path="travelling">
          {travelling.map((t, i) => (
            <Card
              key={t.path}
              title={t.name}
              image={t.image}
              flag={t.flag}
              verb="back-from"
              noun={t.slug}
              layout={i % 2 === 0 ? "left" : "right"}
            />
          ))}
        </Section>

        <Section path="capturing">
          <Card
            title="Capturing"
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
        </Section>
      </header>

      <footer>
        <styled.p fontSize="xs" textWrap="balance">
          designed while sat in the barbican on saturday the twenty third of
          september two thousand twenty three. email me at hey.com, my username
          is barney.
        </styled.p>
      </footer>
    </styled.main>
  );
}

/** The "barney.is /something" motif the generated pages use, as a section
    heading that is also the way in to that part of the site. */
function Section({ path, children }: PropsWithChildren<{ path: string }>) {
  return (
    <styled.section>
      <styled.h2 lineHeight="none">
        <styled.span color="fg.muted">barney.is</styled.span>
        <Link href={`/${path}`}>/{path}</Link>
      </styled.h2>

      <VStack py="16" gap="4">
        {children}
      </VStack>
    </styled.section>
  );
}
