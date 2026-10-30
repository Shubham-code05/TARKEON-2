import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Infinite horizontal scroll, pure CSS. The list is rendered twice for a seamless loop;
 * the copy is hidden from screen readers. Pauses on hover; stops under reduced motion.
 */
export function Marquee({ items, className, label }: { items: ReactNode[]; className?: string; label: string }) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className,
      )}
    >
      <div className="flex w-max animate-marquee gap-3 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        <ul aria-label={label} className="flex shrink-0 gap-3">
          {items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        <ul aria-hidden="true" className="flex shrink-0 gap-3">
          {items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
