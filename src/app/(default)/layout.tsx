import { Box } from "@/styled-system/jsx";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Box p="sm.fluid" height="full" pb="md.fluid">
      {children}
    </Box>
  );
}
