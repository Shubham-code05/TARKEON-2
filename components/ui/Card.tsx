import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardProps = {
  children: ReactNode;
  className?: string;
  /** Makes the whole card a link with a hover lift and glow. */
  href?: string;
  /** Hover lift and glow without a link. */
  interactive?: boolean;
  as?: "div" | "article" | "li";
  /** Accessible name for a linked card when its text is not enough. */
  label?: string;
  /** No padding, for cards whose content runs edge to edge. */
  flush?: boolean;
};

const surface =
  "relative flex flex-col gap-4 rounded-xl border border-line bg-surface shadow-card " +
  "transition duration-300 ease-out-soft";

const hover =
  "hover:-translate-y-1 hover:border-accent/40 hover:shadow-glow motion-reduce:hover:translate-y-0 " +
  "focus-within:border-accent/40";

export function Card({ children, className, href, interactive, as: Tag = "div", label, flush }: CardProps) {
  const padding = !flush && "p-6 md:p-7";
  if (href) {
    return (
      <Tag className={cn(surface, padding, hover, "group", className)}>
        {children}
        {/* Stretched link: the whole card is clickable, text stays selectable for screen readers */}
        <Link href={href} aria-label={label} className="absolute inset-0 rounded-xl focus-visible:outline-offset-2">
          <span className="sr-only">{label ?? "Read more"}</span>
        </Link>
      </Tag>
    );
  }
  return <Tag className={cn(surface, padding, interactive && hover, interactive && "group", className)}>{children}</Tag>;
}

export function IconTile({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex size-11 shrink-0 items-center justify-center rounded-md border border-line-strong bg-surface-2 text-accent",
        "transition-colors duration-300 group-hover:border-accent/40 group-hover:text-accent-hover",
        className,
      )}
    >
      {children}
    </span>
  );
}
