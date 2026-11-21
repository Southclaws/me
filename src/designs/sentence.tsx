import { Fragment } from "react";

// The resolver marks corrections with ~~struck~~ text: "barney ~~is~~ was …".
// Render that as <s>, so every design gets the same semantics but its own look.
export function Sentence({ text, className }: { text: string; className?: string }) {
  const parts = text.split(/~~(.+?)~~/g);
  return (
    <span className={className}>
      {parts.map((part, i) =>
        i % 2 === 1 ? <s key={i}>{part}</s> : <Fragment key={i}>{part}</Fragment>,
      )}
    </span>
  );
}

/** Plain text for titles and alt text: drop the struck words. */
export const plain = (text: string) => text.replace(/~~.+?~~\s*/g, "");
