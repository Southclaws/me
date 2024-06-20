import { Bricklay } from "@/components/photos/Bricklay";
import { Photograph } from "@/components/photos/Photograph";
import { getImages } from "@/components/photos/loader";
import { Box } from "@/styled-system/jsx";

const paths = [
  "/photography/iceland/telescope.jpg",
  "/photography/iceland/big-cliffs-tho.jpg",
  "/photography/iceland/infinity.jpg",
  "/photography/iceland/layers.jpg",
  "/photography/iceland/calm-storm.jpg",
  "/photography/iceland/climb.jpg",
  "/photography/iceland/forever.jpg",
  "/photography/iceland/draped.jpg",
  "/photography/iceland/frequencies.jpg",
  "/photography/iceland/gradient.jpg",
  "/photography/iceland/fire.jpg",
  "/photography/iceland/far-from-home.jpg",
];

export default async function Page() {
  const images = await getImages(paths);

  return (
    <Box minH="dvh">
      {images.map((i) => (
        <Photograph key={i.path} photo={i} />
      ))}

      <Bricklay images={images} />
    </Box>
  );
}
