"use client";

import { Accordion } from "@/components/ui/Accordion";
import type { Faq } from "@/content/types";
import { useIndustry } from "./IndustryContext";

/** The main questions, then up to three for the chosen industry. */
export function HomeFaq({ general }: { general: Faq[] }) {
  const { active } = useIndustry();
  const items = [...general, ...active.faqs.slice(0, 3)];
  return (
    <div className="flex flex-col gap-4">
      <Accordion key={active.key} items={items.map((f) => ({ question: f.q, answer: <p>{f.a}</p> }))} openFirst />
      <p className="text-sm text-muted">
        The last questions are for <span className="font-medium text-fg">{active.label.toLowerCase()}</span> businesses.
      </p>
    </div>
  );
}
