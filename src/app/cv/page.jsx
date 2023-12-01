import Github from "@/icons/Github";
import Mail from "@/icons/Mail";
import Web from "@/icons/Web";
import { HStack, styled } from "@/styled-system/jsx";
import Image from "next/image";

import "./global.css";

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
      <em>{skills && `Skills: ${skills}`}</em>
    </styled.dt>
    <dd>{children}</dd>
  </styled.dl>
);

const Experience = () => (
  <section>
    <h2>Experience</h2>

    <ExperienceItem
      title="Senior Engineer -> Senior Product Engineer"
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
          Over the course of the last year, I worked closely with the founders
          to build out a world class team which will take the company from one
          to infinity.
        </li>
        <li>
          Transitioned to a product focused role where I sit between
          engineering, design and the future moonshots on the community & social
          side of the business.
        </li>
      </ul>
    </ExperienceItem>

    <ExperienceItem
      title="Senior Software Engineer"
      company="Metomic"
      location="London/Remote"
      dates="Apr 2021 - Nov 2021"
      skills="TypeScript, React.js, AWS, Terraform, GitHub CI/CD"
    >
      <ul>
        <li>
          As one of the first members of the engineering team, I helped put in
          place practices for code quality, documentation and continuous
          integration.
        </li>
      </ul>
    </ExperienceItem>

    <ExperienceItem
      title="Software Engineer"
      company="Ytterate"
      location="Remote"
      dates="Nov 2019 - Aug 2020"
      skills="TypeScript, React.js, Redux, Traefik, Docker"
    >
      <ul>
        <li>
          I joined to help speed up development of a client&apos;s React project
          that was very visualisation-heavy using AirBnB&apos;s visx library.
        </li>
        <li>
          This evolved to platform infra (Docker, Traefik) to support future
          clients.
        </li>
      </ul>
    </ExperienceItem>

    <ExperienceItem
      title="Go Engineer"
      company="Utility Warehouse"
      location="London"
      dates="Jun 2018 - Nov 2019"
      skills="Golang, CockroachDB, Kubernetes, Graylog, Kafka, NATS, Docker"
    >
      <ul>
        <li>
          I helped migrate legacy services to a new CQRS event sourcing system
          using microservices and CockroachDB running on Kubernetes.
        </li>
        <li>
          Later, I moved to support a new team building an internal call centre
          tool.
        </li>
      </ul>
    </ExperienceItem>

    <ExperienceItem
      title="Software Engineer (Uni Placement)"
      company="Spotlight Data"
      location="Nottingham"
      dates="2016-2017"
      skills="Golang, Docker, Kubernetes, Python, spaCy, Pachyderm"
    >
      <ul>
        <li>
          University placement as Python programmer to build data extraction
          tools
        </li>
        <li>
          Moved to building critical infrastructure and learnt Golang to build a
          large data analysis pipeline to concurrently analyse millions of
          documents.
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
      Outside of engineering work I&apos;ve worked as a freelance brand designer
      for indie businesses and startups, as well as videographer for live
      events. My free time is usually filled with photography, videography,
      travelling and music.
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

const Link = ({ icon, text }) => (
  <HStack>
    <span>{icon}</span>
    <span>{text}</span>
  </HStack>
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
          <div>
            <styled.h1 lineHeight="none">Barnaby Keene</styled.h1>
            <div>
              <Link icon={<Web height="1em" />} text="www.southcla.ws" />
              <Link
                icon={<Github height="1em" />}
                text="github.com/southclaws"
              />
              <Link icon={<Mail height="1em" />} text="hello@southcla.ws" />
            </div>
          </div>

          <Image src="/me.jpeg" width={100} height={100} />
        </HStack>

        <styled.hr my="8" color="fg.subtle" />

        <p>
          As a passionate and enthusiastic lover of all things electronic,
          mechanical and hackable; I have always shown deep interest in the way
          things work. I’m a software developer focusing on cloud tech,
          developer tools and the web.
        </p>

        <Experience />
        <Personal />
        <Education />
      </article>
    </styled.main>
  );
}
