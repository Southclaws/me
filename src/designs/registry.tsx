import CityOfLondon from "@/app/(bare)/capturing/city-of-london/page";
import Iceland from "@/app/(bare)/capturing/iceland/page";
import type { ReactNode } from "react";
import { Building } from "./building/Building";
import { Ferry } from "./ferry/Ferry";
import { Generative } from "./generative/Generative";
import { Rad } from "./rad/Rad";
import { Story } from "./storyden/Story";
import { Storyden } from "./storyden/Storyden";
import { Tools } from "./tools/Tools";
import { Travelling } from "./travelling/Travelling";
import { Working } from "./working/Working";
import type { CollectionResolution, EntityResolution, FactResolution, Resolved } from "./types";

// Hand-built designs, keyed by graph node rather than by URL. Every phrasing
// that reaches a node renders its design, so /building/storyden,
// /still/building/storyden and (one day) /no-longer/building/storyden all show
// the same page. Anything not listed falls back to a generated layout.
//
// Keys: `fact:<fact id>`, `collection:<path>`, `entity:<entity id>`.

type Design = (res: Resolved) => ReactNode;

const designs: Record<string, Design> = {
  "collection:building": (res) => <Building res={res as CollectionResolution} />,
  "collection:travelling": (res) => <Travelling res={res as CollectionResolution} />,
  "collection:working": (res) => <Working res={res as CollectionResolution} />,
  // What Storyden is, and separately the story of how it got there. The
  // reminiscing phrasings (/looking-back-on, /remembering, /nostalgic-for,
  // /still-thinking-about) all target the entity, so they land on the story.
  "fact:storyden": (res) => <Storyden res={res as FactResolution} />,
  "entity:storyden": (res) => <Story res={res as EntityResolution} />,
  // Ferry has two facts, the job and the thing being built; both show its page.
  "fact:ferry": (res) => <Ferry res={res as FactResolution} />,
  "fact:ferry-build": (res) => <Ferry res={res as FactResolution} />,
  "fact:tools": (res) => <Tools res={res as FactResolution} />,
  "fact:rad": (res) => <Rad res={res as FactResolution} />,
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
