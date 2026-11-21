import { render } from "@/designs/registry";
import { plain } from "@/designs/sentence";
import type { Resolved } from "@/designs/types";
import { entity, prerenderPaths, resolve } from "@/graph/compile.ts";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

// Every URL is a sentence that starts with "barney is". The graph decides
// what it means, and the design registry decides what it looks like.

type Props = { params: Promise<{ sentence: string[] }> };

// Paths owned by real route folders. Static routes win anyway; this just keeps
// them out of the pre-render list.
const STATIC = new Set(["capturing", "capturing/iceland", "capturing/city-of-london", "experienced", "typography"]);

export async function generateStaticParams() {
  return prerenderPaths()
    .filter((p) => !STATIC.has(p))
    .map((p) => ({ sentence: p.split("/") }));
}

// Aliases render on first visit and are cached. Revalidating daily lets
// tenses move on their own: "building" becomes "no longer building" the day a
// fact ends, without a deploy.
export const revalidate = 86400;

async function resolved(props: Props): Promise<Resolved> {
  const { sentence } = await props.params;
  const res = resolve(sentence.map(decodeURIComponent).join("/"));
  if (res.kind === "not-found") notFound();
  return res;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const res = await resolved(props);

  const title = res.kind === "fact" ? plain(res.truth) : res.kind === "collection" ? res.label : res.path.replaceAll("/", " ");
  const description =
    res.kind === "fact"
      ? [res.gloss, entity(res.fact.object)?.url].filter(Boolean).join(" ") || undefined
      : res.items.map((i) => plain(i.sentence)).join(". ");

  return {
    title: { absolute: title },
    description,
    // Keep the visitor's phrasing in the address bar, but point search engines
    // at the one canonical phrasing for right now.
    alternates: { canonical: `/${res.kind === "fact" ? res.canonical : res.path}` },
    openGraph: { images: [{ url: `/api/og?path=${encodeURIComponent(res.path)}`, width: 1600, height: 900, alt: title }] },
  };
}

export default async function Page(props: Props) {
  return render(await resolved(props));
}
