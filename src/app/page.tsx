import { Box, HStack, styled } from "@/styled-system/jsx";

export default function Home() {
  return (
    <styled.main
      display="flex"
      flexDir="column"
      justifyContent="space-between"
      gap="4"
      height="full"
      maxW="breakpoint-md"
      marginX="auto"
      background="outline"
      p="md.fluid"
    >
      <header>
        <styled.hgroup mb={{ base: "8", md: "4" }}>
          <styled.h1 lineHeight="headingFluid">barney</styled.h1>
          <styled.p ml="0.5" color="fg.muted">
            barnaby keene • @southclaws
          </styled.p>
        </styled.hgroup>

        <p>
          you can call me barney, I’m a multidisciplinary maker from england.
        </p>

        <p>
          with experience across a wide variety of creative tools and technical
          skills, I solve design, storytelling and technical problems.
        </p>

        <nav>
          <ul>
            <li>
              <a href="https://blog.barney.is">
                tech, culture and design newsletter
              </a>
            </li>
            <li>
              <a href="https://southcla.ws">technical blog</a>
            </li>
          </ul>
        </nav>
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
