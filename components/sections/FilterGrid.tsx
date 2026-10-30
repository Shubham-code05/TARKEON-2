"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type FilterGridProps = {
  label: string;
  filters: { id: string; label: string }[];
  items: { id: string; tags: string[]; node: ReactNode }[];
  className?: string;
  columns?: 2 | 3;
};

/** Filter chips over a server-rendered card grid. Only filters that have items are shown. */
export function FilterGrid({ label, filters, items, className, columns = 3 }: FilterGridProps) {
  const [active, setActive] = useState("all");
  const usable = filters.filter((f) => items.some((i) => i.tags.includes(f.id)));
  const visible = active === "all" ? items : items.filter((i) => i.tags.includes(active));

  return (
    <div className={className}>
      {usable.length > 1 && (
        <div role="group" aria-label={label} className="mb-8 flex flex-wrap gap-2">
          {[{ id: "all", label: "All" }, ...usable].map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={active === f.id}
              onClick={() => setActive(f.id)}
              className={cn(
                "min-h-11 rounded-full border px-4 text-sm font-medium transition-colors",
                active === f.id
                  ? "border-accent bg-accent-soft text-accent"
                  : "border-line-strong bg-surface text-fg-2 hover:border-accent/50 hover:text-fg",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}
      <p className="sr-only" aria-live="polite">
        Showing {visible.length} of {items.length}
      </p>
      <ul className={cn("grid gap-5 md:grid-cols-2", columns === 3 && "lg:grid-cols-3")}>
        {visible.map((i) => (
          <li key={i.id}>{i.node}</li>
        ))}
      </ul>
    </div>
  );
}
