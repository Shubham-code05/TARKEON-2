import { Reveal } from "@/components/motion/Reveal";
import type { Step } from "@/content/types";
import { cn } from "@/lib/utils";

/** Vertical numbered timeline. "compact" shows a 4-column row on desktop. */
export function ProcessTimeline({ steps, compact = false }: { steps: Step[]; compact?: boolean }) {
  if (compact) {
    return (
      <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <Reveal as="li" key={s.title} delay={i * 0.07} className="relative flex flex-col gap-3 border-t border-line-strong pt-6">
            <span aria-hidden="true" className="absolute -top-px left-0 h-px w-16 bg-brand" />
            <span className="font-display text-sm font-semibold text-accent">
              {String(i + 1).padStart(2, "0")}
              {s.duration && <span className="ml-2 font-sans font-normal text-muted">· {s.duration}</span>}
            </span>
            <h3 className="text-h3">{s.title}</h3>
            <p className="text-[0.9375rem] text-muted">{s.text}</p>
          </Reveal>
        ))}
      </ol>
    );
  }
  return (
    <ol className="relative flex flex-col">
      {steps.map((s, i) => (
        <Reveal as="li" key={s.title} className="relative grid grid-cols-[3rem_1fr] gap-5 pb-10 last:pb-0 md:grid-cols-[4rem_1fr] md:gap-8">
          {i < steps.length - 1 && (
            <span aria-hidden="true" className="absolute top-12 bottom-0 left-6 w-px bg-gradient-to-b from-line-strong to-line md:left-8" />
          )}
          <span
            className={cn(
              "relative z-10 flex size-12 items-center justify-center rounded-full border font-display font-semibold md:size-16 md:text-lg",
              i === 0 ? "border-transparent bg-brand text-white" : "border-line-strong bg-surface text-fg",
            )}
          >
            {i + 1}
          </span>
          <div className="flex flex-col gap-2 pt-2 md:pt-4">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="text-h3">{s.title}</h3>
              {s.duration && <span className="text-sm text-muted">{s.duration}</span>}
            </div>
            <p className="max-w-2xl text-muted">{s.text}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
