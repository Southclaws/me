import { Bricklay } from "@/components/photos/Bricklay";
import { Photograph } from "@/components/photos/Photograph";
import { getImages } from "@/components/photos/loader";
import { styled } from "@/styled-system/jsx";
import { Metadata } from "next";

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

export const metadata: Metadata = {
  title: "Iceland",
  description: "A photobook of Iceland by Barney.",
};

export default async function Page() {
  const images = await getImages(paths);

  return (
    <styled.main minH="dvh">
      {images.map((i, index) => (
        <Photograph key={i.path} photo={i} eager={index === 0} />
      ))}

      <Bricklay images={images} />
    </styled.main>
  );
}
