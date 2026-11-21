import CityOfLondon from "@/app/(bare)/capturing/city-of-london/page";
import Iceland from "@/app/(bare)/capturing/iceland/page";
import type { ReactNode } from "react";
import { Building } from "./building/Building";
import { Ferry } from "./ferry/Ferry";
import { Generative } from "./generative/Generative";
import { Storyden } from "./storyden/Storyden";
import type { CollectionResolution, FactResolution, Resolved } from "./types";

// Hand-built designs, keyed by graph node rather than by URL. Every phrasing
// that reaches a node renders its design, so /building/storyden,
// /still/building/storyden and (one day) /no-longer/building/storyden all show
// the same page. Anything not listed falls back to a generated layout.
//
// Keys: `fact:<fact id>`, `collection:<path>`, `entity:<entity id>`.

type Design = (res: Resolved) => ReactNode;

const designs: Record<string, Design> = {
  "collection:building": (res) => <Building res={res as CollectionResolution} />,
  "fact:storyden": (res) => <Storyden res={res as FactResolution} />,
  "fact:ferry": (res) => <Ferry res={res as FactResolution} />,
  // The photobooks already have their own pages at /capturing/…; other
  // phrasings of the same facts reuse them.
  "fact:capture-iceland": () => <Iceland />,
  "fact:capture-city": () => <CityOfLondon />,
};

export function keyOf(res: Resolved): string {
  if (res.kind === "fact") return `fact:${res.fact.id}`;
  if (res.kind === "entity") return `entity:${res.entityId}`;
  return `collection:${res.path}`;
}

export function render(res: Resolved): ReactNode {
  const design = designs[keyOf(res)];
  return design ? design(res) : <Generative res={res} />;
}

export const hasDesign = (res: Resolved) => keyOf(res) in designs;
