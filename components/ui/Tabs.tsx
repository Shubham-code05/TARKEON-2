"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type TabItem = { id: string; label: string; content: ReactNode };

/** WAI-ARIA tabs: arrow keys, Home and End move between tabs. */
export function Tabs({ items, className, label }: { items: TabItem[]; className?: string; label: string }) {
  const [active, setActive] = useState(0);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const baseId = useId();

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const last = items.length - 1;
    let next = active;
    if (e.key === "ArrowRight") next = active === last ? 0 : active + 1;
    else if (e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    else return;
    e.preventDefault();
    setActive(next);
    refs.current[next]?.focus();
  }

  if (items.length === 0) return null;

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label={label}
        onKeyDown={onKeyDown}
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0"
      >
        {items.map((item, i) => {
          const selected = i === active;
          return (
            <button
              key={item.id}
              ref={(el) => {
                refs.current[i] = el;
              }}
              id={`${baseId}-tab-${item.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${item.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className={cn(
                "min-h-11 shrink-0 rounded-full border px-4 text-sm font-medium transition-colors",
                selected
                  ? "border-accent bg-accent-soft text-accent"
                  : "border-line-strong bg-surface text-fg-2 hover:border-accent/50 hover:text-fg",
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {items.map((item, i) => (
        <div
          key={item.id}
          id={`${baseId}-panel-${item.id}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${item.id}`}
          hidden={i !== active}
          tabIndex={0}
          className="mt-6 focus-visible:outline-offset-4"
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}
