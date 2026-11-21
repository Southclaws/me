import type { Resolution } from "@/graph/compile.ts";

export type Resolved = Exclude<Resolution, { kind: "not-found" }>;
export type FactResolution = Extract<Resolution, { kind: "fact" }>;
export type CollectionResolution = Extract<Resolution, { kind: "collection" }>;
export type EntityResolution = Extract<Resolution, { kind: "entity" }>;

export type DesignProps<R extends Resolved = Resolved> = { res: R };
