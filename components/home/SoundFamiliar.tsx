"use client";

import Link from "next/link";
import { Icon } from "@/components/Icon";
import { buttonClasses } from "@/components/ui/Button";
import { useIndustry } from "./IndustryContext";

/** Three problems for the chosen industry, each paired with Tarkeon's fix. */
export function SoundFamiliar() {
  const { active } = useIndustry();
  const problems = active.problems.slice(0, 3);

  return (
    <div className="flex flex-col gap-10">
      <ul key={active.key} className="grid gap-5 md:grid-cols-3">
        {problems.map((p, i) => (
          <li
            key={p.title}
            className="spotlight flex animate-fade-in flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-card"
            style={{ animationDelay: `${i * 70}ms` }}
          >
            <div className="flex flex-1 flex-col gap-3 p-6 md:p-7">
              <span className="flex size-10 items-center justify-center rounded-full border border-danger/30 bg-danger/10 text-danger">
                <Icon name="x" size={18} strokeWidth={2.2} />
              </span>
              <h3 className="text-h3">{p.title}</h3>
              <p className="text-[0.9375rem] text-muted">{p.text}</p>
            </div>
            <div className="flex flex-col gap-2 border-t border-accent/20 bg-accent-soft p-6 md:p-7">
              <p className="flex items-center gap-2 text-sm font-semibold text-accent">
                <Icon name="sparkles" size={16} /> How Tarkeon fixes it
              </p>
              <p className="text-[0.9375rem] leading-relaxed text-fg">{p.solution}</p>
            </div>
          </li>
        ))}
      </ul>
      <Link href={`/industries/${active.slug}`} className={buttonClasses("primary", "lg", "self-start")}>
        See every fix for {active.label.toLowerCase()} businesses <Icon name="arrow" size={18} />
      </Link>
    </div>
  );
}
