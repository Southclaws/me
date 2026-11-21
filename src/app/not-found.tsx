import type { Metadata } from "next";
import Link from "next/link";
import { Missing } from "./not-found-client";
import styles from "./not-found.module.css";

export const metadata: Metadata = { title: { absolute: "barney isn't that" } };

export default function NotFound() {
  return (
    <main className={styles.page}>
      <Link href="/" className={styles.home}>
        barney.is
      </Link>
      <Missing />
    </main>
  );
}
