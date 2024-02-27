import { PropsWithChildren } from "react";
import { styled } from "@/styled-system/jsx";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <styled.main
      display="flex"
      flexDir="column"
      justifyContent="space-between"
      gap="4"
      height="full"
      maxW="breakpoint-md"
      marginX="auto"
      px="md.fluid"
      pb="8"
    >
      {children}

      <footer>.</footer>
    </styled.main>
  );
}
