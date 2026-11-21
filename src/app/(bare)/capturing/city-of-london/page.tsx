import { Bricklay } from "@/components/photos/Bricklay";
import { Photograph } from "@/components/photos/Photograph";
import { getImages } from "@/components/photos/loader";
import { styled } from "@/styled-system/jsx";
import { Metadata } from "next";

const paths = [
  "/photography/city-of-london/carters-halt.jpg",
  "/photography/city-of-london/concrete-shapes.jpg",
  "/photography/city-of-london/30.jpg",
  "/photography/city-of-london/evening-angle.jpg",
  "/photography/city-of-london/tunnel.jpg",
  "/photography/city-of-london/money.jpg",
  "/photography/city-of-london/spring.jpg",
  "/photography/city-of-london/boxes.jpg",
  "/photography/city-of-london/paul.jpg",
  "/photography/city-of-london/found.jpg",
  "/photography/city-of-london/glow.jpg",
  "/photography/city-of-london/late-night-at-the-office.jpg",
];

export const metadata: Metadata = {
  title: "City of London",
  description: "A photobook of City of London by Barney.",
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
