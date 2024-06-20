import { createReadStream } from "fs";
import path from "path";
import probe, { ProbeResult } from "probe-image-size";

export type Photograph = ProbeResult & {
  path: string;
};

export async function getImages(paths: string[]): Promise<Photograph[]> {
  return await Promise.all(
    paths.map(async (p) => {
      const filepath = path.join(process.cwd(), "public", p);
      const of = createReadStream(filepath);
      const metadata = await probe(of);
      return { ...metadata, path: p };
    })
  );
}
