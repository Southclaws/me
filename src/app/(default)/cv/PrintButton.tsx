"use client";

import { styled } from "@/styled-system/jsx";

export function PrintButton() {
  return (
    <styled.button
      type="button"
      onClick={() => window.print()}
      color="link"
      cursor="pointer"
      _hover={{ color: "link.hover", textDecoration: "underline" }}
    >
      Print this page
    </styled.button>
  );
}
