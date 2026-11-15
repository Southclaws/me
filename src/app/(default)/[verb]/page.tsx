import {
  ContentPageProps,
  getContent,
  listContent,
} from "@/content/content";
import { Metadata } from "next";

export const dynamicParams = false;

export async function generateStaticParams() {
  const pages = await listContent();
  return pages
    .filter((p) => p.noun === "index")
    .map(({ verb }) => ({ verb }));
}

export async function generateMetadata(
  props: ContentPageProps
): Promise<Metadata> {
  const { metadata } = await getContent(await props.params);
  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export default async function Page(props: ContentPageProps) {
  const { content } = await getContent(await props.params);

  return <>{content}</>;
}
