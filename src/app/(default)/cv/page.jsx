import Github from "@/icons/Github";
import Mail from "@/icons/Mail";
import Web from "@/icons/Web";
import { HStack, VStack, styled } from "@/styled-system/jsx";
import Image from "next/image";

import "./global.css";

export const metadata = {
  title: "My curriculum vitae",
  description:
    "As a passionate and enthusiastic lover of all things electronic, mechanical and visual; I have always shown deep interest how we experience technology. I'm a multidisciplinary leader with a truly full-stack experience all the way from the cloud configuration to the customer experience, with everything in between.",
};

const ExperienceItem = ({
  title,
  company,
  location = undefined,
  dates,
  skills = undefined,
  children = undefined,
}) => (
  <styled.dl my="2" pageBreakInside="avoid">
    <styled.dt fontWeight="bold">
      {title} at {company} ({location ? `${location}, ${dates}` : dates})
    </styled.dt>
    <styled.dt fontStyle="italic">
      <em>{skills && `${skills}`}</em>
    </styled.dt>
    <dd>{children}</dd>
  </styled.dl>
);

const Experience = () => (
  <section>
    <h2>Experience</h2>

    <ExperienceItem
      title="Founding Engineer"
      company="Odin"
      location="London"
      dates="Nov 2021 - Present"
      skills="Full stack development, critical infrastructure, devops processes, hiring, leadership, user research and product work"
    >
      <ul>
        <li>
          As the first senior engineering hire, I built out the platform from
          scratch, ready to scale for the next decade. This involved Golang and
          Next.js for the application itself, as well as Terraform, Fly.io,
          Vercel, AWS, Cloudflare, Google Cloud and many more tools to get us
          from zero to one with a high quality tested codebase.
        </li>
        <li>
          Over the course of the last two years, I worked closely with the
          founders to build out a world class team which will take the company
          from one to infinity.
        </li>
        <li>
          Transitioned to a product focused role where I sit between
          engineering, design and the future moonshots on the B2C community &
          social side of the business.
        </li>
      </ul>
    </ExperienceItem>

    <ExperienceItem
      title="Senior Software Engineer"
      company="Metomic"
      location="London"
      dates="Apr 2021 - Nov 2021"
      skills="TypeScript, React.js, AWS, Terraform, GitHub CI/CD"
    >
      <ul>
        <li>
          As one of the first members of the engineering team, I helped put in
          place practices for code quality, documentation and continuous
          integration.
        </li>
        <li>
          Introduced an integration testing framework and built out
          documentation and culture for a heavy focus on testing.
        </li>
        <li>
          Built out many of our core integrations with SaaS tools that customers
          requested.
        </li>
      </ul>
    </ExperienceItem>

    <ExperienceItem
      title="Founder"
      company="Novaura"
      location="London"
      dates="2020 - 2022"
      skills="Client management, cold outreach sales, brand design and strategy, web development"
    >
      <ul>
        <li>
          Alongside my full-time job, I started a small consultancy to explore
          my more creative desires with videography and graphic design.
        </li>
        <li>
          Worked with a small handful of clients from e-sports teams, to D2C
          vapes, to chocolate therapy to design their brand identity.
        </li>
        <li>
          Weathered the economic conditions of the pandemic until throwing in
          the towel. We live and learn!
        </li>
      </ul>
    </ExperienceItem>

    <ExperienceItem
      title="Software Engineer"
      company="Ytterate"
      location="Remote"
      dates="2019 - 2020"
      skills="TypeScript, React.js, Visx, Redux, Traefik, Docker"
    >
      <ul>
        <li>
          I joined to help speed up development of a finance client&apos;s React
          project that was very visualisation-heavy using AirBnB&apos;s visx
          library.
        </li>
        <li>
          Worked with large amounts of simulated financial data to visualise in
          a cohesive and familiar way for fund managers to interpret. This
          involved custom charts such as efficient frontiers and future
          projection spreads.
        </li>
        <li>
          This later evolved to platform infra (Docker, Traefik) to support
          future clients running high-demand web-based services.
        </li>
      </ul>
    </ExperienceItem>

    <ExperienceItem
      title="Software Engineer"
      company="Utility Warehouse"
      location="London"
      dates="2018 - 2019"
      skills="Golang, CockroachDB, Kubernetes, Graylog, NATS, Kafka, Docker"
    >
      <ul>
        <li>
          I helped migrate legacy services to a new CQRS event sourcing system
          using microservices and CockroachDB running on Kubernetes.
        </li>
        <li>
          Moved to help lead the development of new internal tooling for
          call-centre staff.
        </li>
        <li>
          Built up from scratch the API and backend services for this system
          while we grew the team to 4 engineers.
        </li>
      </ul>
    </ExperienceItem>

    <ExperienceItem
      title="Software Engineer"
      company="Spotlight Data"
      location="Nottingham"
      dates="2016 - 2017"
      skills="Golang, Docker, Kubernetes, Python, spaCy, Pachyderm"
    >
      <ul>
        <li>
          Joined as a Python programmer to build data extraction and text
          analysis tools for Ministry of Defence and research contracts.
        </li>
        <li>
          Moved to building critical infrastructure while refining my skills
          with Golang for building a large data analysis pipeline to
          concurrently analyse millions of documents.
        </li>
        <li>
          Worked closely with the Pachyderm team as an early customer, a product
          which was built on Kubernetes and message queues for scaling data
          analysis pipelines.
        </li>
      </ul>
    </ExperienceItem>

    <ExperienceItem
      title="System admin and web contractor"
      company="Various"
      location="Remote"
      dates="2013 - 2016"
      skills="Linux, PHP, MySQL, JavaScript, HTML, CSS"
    >
      <ul>
        <li>
          Worked with various clients to build and maintain websites running on
          Linux virtual and dedicated servers.
        </li>
        <li>
          Primarily in the gaming space, I cut my teeth on the basics of
          sysadmin work with Linux and Windows server systems.
        </li>
      </ul>
    </ExperienceItem>
  </section>
);

const Personal = () => (
  <section>
    <h2>Personal</h2>
    <p>
      A few side projects I&apos;ve worked on are: Storyden: a forum software
      for the modern age built with Go and React. Pico: a git-driven task runner
      used for managing containers using infrastructure-as-code. Wisplight: a
      privacy-friendly browser history personal search engine. I&apos;ve also
      co-founded (and failed) a couple of startups.
    </p>
    <p>
      Outside of engineering and design work I&apos;m an avid gym rat and
      fitness nerd. I also help organise the London Gophers meetup group, the
      largest Golang meetup in the UK. My spare time is filled with travelling
      and my life goal is to visit every country on earth.
    </p>
  </section>
);

const Education = () => (
  <section>
    <h2>Education</h2>
    <ExperienceItem
      title="Computer Science BSc"
      company="Nottingham Trent"
      dates="2014-2018"
    ></ExperienceItem>
  </section>
);

const Link = ({ icon, text, href }) => (
  <styled.a
    cursor="pointer"
    href={href}
    display="flex"
    alignItems="center"
    gap="1"
    _hover={{
      textDecoration: "underline",
    }}
  >
    <span>{icon}</span>
    <span>{text}</span>
  </styled.a>
);

export default function Page() {
  return (
    <styled.main className="cv" maxW="breakpoint-md" marginX="auto" py="4">
      <article>
        <styled.aside mb="4">
          <styled.span
            bg="offblack"
            color="offwhite"
            borderRadius="sm"
            py="0.5"
            px="1"
            lineHeight="snug"
          >
            Note:
          </styled.span>{" "}
          <a href="javascript:window.print()">Print this page</a> for a
          printer-friendly or PDF version of my curriculum vitae.
        </styled.aside>

        <HStack justify="space-between">
          <VStack alignItems="start" gap="1">
            <styled.h1 lineHeight="none">Barnaby Keene</styled.h1>
            <div>
              <Link icon={<Web height="1em" />} text="www.southcla.ws" />
              <Link
                icon={<Github height="1em" />}
                text="github.com/southclaws"
              />
              <Link icon={<Mail height="1em" />} text="barney@hey.com" />
            </div>
          </VStack>

          <Image
            src="/me.jpeg"
            alt="My lovely face in Italy, circa 2021."
            width={100}
            height={100}
          />
        </HStack>

        <styled.hr my="4" color="fg.subtle" />

        <p>
          As a passionate and enthusiastic lover of all things electronic,
          mechanical and visual; I have always shown deep interest how we
          experience technology. I&apos;m a multidisciplinary leader with a
          truly full-stack experience all the way from the cloud configuration
          to the customer experience, with everything in between.
        </p>

        <Experience />
        <Personal />
        <Education />
      </article>
    </styled.main>
  );
}
