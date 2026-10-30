import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BrowserFrameProps = {
  /** Shown in the fake address bar, e.g. "example.com". */
  url?: string;
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  className?: string;
  /** Custom content instead of an image. */
  children?: ReactNode;
};

/** A browser window chrome around a screenshot or any content. */
export function BrowserFrame({
  url,
  src,
  alt = "",
  width = 1440,
  height = 900,
  priority,
  sizes = "(min-width: 1024px) 60vw, 100vw",
  className,
  children,
}: BrowserFrameProps) {
  return (
    <figure className={cn("overflow-hidden rounded-xl border border-line-strong bg-surface shadow-card", className)}>
      <div className="flex items-center gap-3 border-b border-line bg-surface-2 px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-[#ff5f57]/80" />
          <span className="size-2.5 rounded-full bg-[#febc2e]/80" />
          <span className="size-2.5 rounded-full bg-[#28c840]/80" />
        </div>
        {url && (
          <div className="min-w-0 flex-1 truncate rounded-md bg-surface px-3 py-1 text-center text-xs text-muted">{url}</div>
        )}
      </div>
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          sizes={sizes}
          className="h-auto w-full"
        />
      ) : (
        children
      )}
    </figure>
  );
}
