"use client";

import { m, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { useRef, useState } from "react";
import type { Step } from "@/content/types";
import { cn } from "@/lib/utils";

/** Vertical process timeline whose line fills as the visitor scrolls. */
export function ProcessScroll({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 60%"] });
  const [reached, setReached] = useState(reduce ? steps.length : 0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!reduce) setReached(Math.min(steps.length, Math.floor(v * steps.length + 0.35)));
  });

  const fill = reduce ? 1 : scrollYProgress;

  return (
    <div ref={ref} className="relative pl-12">
      <span aria-hidden="true" className="absolute top-2 bottom-2 left-[0.9375rem] w-px bg-line-strong" />
      <m.span aria-hidden="true" style={{ scaleY: fill }} className="absolute top-2 bottom-2 left-[0.9375rem] w-px origin-top bg-brand" />
      <ol className="flex flex-col gap-8">
        {steps.map((s, i) => {
          const on = i < reached;
          return (
            <li key={s.title} className="relative flex flex-col gap-1.5">
              <span
                aria-hidden="true"
                className={cn(
                  "absolute top-0 -left-12 flex size-8 items-center justify-center rounded-full border text-sm font-semibold transition-all duration-500",
                  on
                    ? "border-transparent bg-brand text-white shadow-[0_0_12px_rgb(47_75_255/0.35)]"
                    : "border-line-strong bg-surface text-muted",
                )}
              >
                {i + 1}
              </span>
              <div className="flex flex-wrap items-baseline gap-x-3">
                <h3 className={cn("text-h3 transition-colors duration-500", on ? "text-fg" : "text-fg-2")}>{s.title}</h3>
                <span className="text-sm text-accent">{s.duration}</span>
              </div>
              <p className="max-w-2xl text-[0.9375rem] text-muted">{s.text}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
