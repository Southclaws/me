"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./not-found.module.css";

export function Missing() {
  // The path is used to find suggestions, but never echoed back: rendering
  // arbitrary URL input as "barney isn't <anything>" put words in his mouth.
  const pathname = usePathname() ?? "/";
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/suggest?q=${encodeURIComponent(pathname)}`, { signal: controller.signal })
      .then((r) => r.json())
      .then((d: { suggestions: string[] }) => setSuggestions(d.suggestions))
      .catch(() => {});
    return () => controller.abort();
  }, [pathname]);

  return (
    <>
      <h1 className={styles.title}>barney isn&apos;t that.</h1>
      <p className={styles.sub}>not yet, anyway.</p>
      {suggestions.length > 0 && (
        <p className={styles.suggest}>
          maybe you meant{" "}
          {suggestions.map((s, i) => (
            <span key={s}>
              {i > 0 && (i === suggestions.length - 1 ? " or " : ", ")}
              <Link href={`/${s}`}>barney is {s.replaceAll("/", " ").replaceAll("-", " ")}</Link>
            </span>
          ))}
          ?
        </p>
      )}
    </>
  );
}
