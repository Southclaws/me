import { Card, CardText } from "@/app/components/Card/Card";
import { MarkdownImage } from "@/components/MarkdownImage";
import { readdir, readFile } from "fs/promises";
import { compileMDX } from "next-mdx-remote/rsc";
import path from "path";
import { cwd } from "process";
import { z } from "zod";

export type PageParameters = {
  verb: string;
  noun?: string;
};

export type ContentPageProps = {
  params: Promise<PageParameters>;
};

const root = path.join(cwd(), "content");

// Every markdown file under content/ becomes a statically generated route:
// content/<verb>/index.md -> /<verb> and content/<verb>/<noun>.md -> /<verb>/<noun>
export async function listContent(): Promise<Required<PageParameters>[]> {
  const verbs = await readdir(root, { withFileTypes: true });

  const pages = await Promise.all(
    verbs
      .filter((d) => d.isDirectory())
      .map(async (d) => {
        const files = await readdir(path.join(root, d.name));
        return files
          .filter((f) => f.endsWith(".md"))
          .map((f) => ({ verb: d.name, noun: f.replace(/\.md$/, "") }));
      })
  );

  return pages.flat();
}

export const FrontmatterSchema = z.object({
  title: z.string(),
  description: z.string(),
});
export type Frontmatter = z.infer<typeof FrontmatterSchema>;

export async function getContent(params: PageParameters) {
  const source = await readFile(
    path.join(root, params.verb, params.noun ?? "index") + ".md",
    "utf-8"
  );

  let images = 0;
  let cards = 0;

  const { content, frontmatter } = await compileMDX({
    source,
    options: {
      parseFrontmatter: true,
    },
    components: {
      Card: (props) => <Card {...props} eager={cards++ === 0} />,
      CardText: CardText,
      img: (props) => <MarkdownImage {...props} eager={images++ === 0} />,
    },
  });

  const metadata = FrontmatterSchema.parse(frontmatter);

  return { content, metadata };
}
