import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type AccordionItem = { question: string; answer: ReactNode };

type AccordionProps = {
  items: AccordionItem[];
  className?: string;
  /** Open the first item by default. */
  openFirst?: boolean;
};

/**
 * Native <details> accordion: keyboard and screen-reader friendly,
 * works without JavaScript, ships zero client JS.
 */
export function Accordion({ items, className, openFirst = false }: AccordionProps) {
  if (items.length === 0) return null;
  return (
    <div className={cn("divide-y divide-line border-y border-line", className)}>
      {items.map((item, i) => (
        <details key={item.question} className="group/acc" open={openFirst && i === 0}>
          <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-6 py-5 text-left font-display text-lg font-medium text-fg transition-colors hover:text-accent md:text-xl">
            <span>{item.question}</span>
            <span
              aria-hidden="true"
              className="relative flex size-8 shrink-0 items-center justify-center rounded-full border border-line-strong text-muted transition-transform duration-300 group-open/acc:rotate-45 group-open/acc:text-fg"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </span>
          </summary>
          <div className="max-w-3xl pb-6 pr-12 text-muted">{item.answer}</div>
        </details>
      ))}
    </div>
  );
}
