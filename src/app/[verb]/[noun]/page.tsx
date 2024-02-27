import { ContentPageProps, getContent } from "@/content/content";
import { Metadata } from "next";

export async function generateMetadata(
  props: ContentPageProps
): Promise<Metadata> {
  const { metadata } = await getContent(props.params);
  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export default async function Page(props: ContentPageProps) {
  const { content } = await getContent(props.params);

  return <>{content}</>;
}
