import { Card, CardText } from "@/app/components/Card/Card";
import { readFile } from "fs/promises";
import { compileMDX } from "next-mdx-remote/rsc";
import path from "path";
import { cwd } from "process";
import { z } from "zod";

export type PageParameters = {
  verb: string;
  noun?: string;
};

export type ContentPageProps = {
  params: PageParameters;
  searchParams: Record<string, string | string[]>;
};

export const FrontmatterSchema = z.object({
  title: z.string(),
  description: z.string(),
});
export type Frontmatter = z.infer<typeof FrontmatterSchema>;

export async function getContent(params: PageParameters) {
  const source = await readFile(
    path.join(cwd(), "pages", params.verb, params.noun ?? "index") + ".md",
    "utf-8"
  );

  const { content, frontmatter } = await compileMDX({
    source,
    options: {
      parseFrontmatter: true,
    },
    components: {
      Card: Card,
      CardText: CardText,
    },
  });

  const metadata = FrontmatterSchema.parse(frontmatter);

  return { content, metadata };
}
