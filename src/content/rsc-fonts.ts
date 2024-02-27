export async function getFonts() {
  const orbiterBold = await fetch(
    new URL("../app/TASAOrbiterDisplay-Bold.otf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  const orbiterMedium = await fetch(
    new URL("../app/TASAOrbiterDisplay-Medium.otf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  return { orbiterBold, orbiterMedium };
}
