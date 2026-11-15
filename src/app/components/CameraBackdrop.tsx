"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// three.js, Rapier (WASM) and the 7MB camera model are only fetched once the
// visitor interacts with the page, so they never compete with the initial
// render or block the main thread during load. Visitors who prefer reduced
// motion keep the static backdrop: the scene is a swinging physics toy.
const Camera3D = dynamic(
  () => import("./Camera3D").then((m) => m.Camera3D),
  { ssr: false }
);

const triggers = [
  "pointerdown",
  "pointermove",
  "keydown",
  "touchstart",
  "wheel",
  "scroll",
] as const;

export function CameraBackdrop() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const controller = new AbortController();
    const activate = () => {
      controller.abort();
      setActive(true);
    };

    for (const event of triggers) {
      addEventListener(event, activate, {
        once: true,
        passive: true,
        signal: controller.signal,
      });
    }

    return () => controller.abort();
  }, []);

  return active ? <Camera3D /> : null;
}
