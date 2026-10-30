"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon } from "@/components/Icon";
import { buttonClasses } from "@/components/ui/Button";
import type { CalculatorAddon, CalculatorType } from "@/content/pricing";
import { calculateEstimate } from "@/lib/estimate";
import { cn, formatINR } from "@/lib/utils";
import { useIndustry } from "./IndustryContext";
import { useCountUp } from "./useCountUp";

type Props = { types: CalculatorType[]; addons: CalculatorAddon[] };

/** Quick estimate on the homepage. Starts from the chosen industry's typical package. */
export function CompactCalculator({ types, addons }: Props) {
  const { active } = useIndustry();
  const [typeId, setTypeId] = useState(active.packagePreset.type);
  const [selected, setSelected] = useState<string[]>(active.packagePreset.addons);

  useEffect(() => {
    setTypeId(active.packagePreset.type);
    setSelected(active.packagePreset.addons);
  }, [active]);

  const type = types.find((t) => t.id === typeId) ?? types[0]!;
  const available = addons.filter((a) => !type.excludes?.includes(a.id));
  const estimate = calculateEstimate({ type: type.id, pages: type.includedPages ?? 0, addons: selected, carePlan: false });
  const total = useCountUp(estimate?.oneTime ?? 0);

  const params = new URLSearchParams({ type: type.id });
  const chosen = selected.filter((id) => available.some((a) => a.id === id));
  if (chosen.length) params.set("addons", chosen.join(","));

  return (
    <div className="spotlight grid overflow-hidden rounded-2xl border border-line-strong bg-surface shadow-card lg:grid-cols-[1.4fr_1fr]">
      <div className="flex flex-col gap-7 p-5 md:p-8">
        <fieldset>
          <legend className="mb-3 text-sm font-medium text-fg">What do you need?</legend>
          <div className="flex flex-wrap gap-2">
            {types.map((t) => (
              <label key={t.id} className="cursor-pointer">
                <input
                  type="radio"
                  name="compact-type"
                  value={t.id}
                  checked={t.id === type.id}
                  onChange={() => {
                    setTypeId(t.id);
                    setSelected((s) => s.filter((id) => !t.excludes?.includes(id)));
                  }}
                  className="peer sr-only"
                />
                <span className="inline-flex min-h-11 items-center rounded-full border border-line-strong bg-surface-2 px-4 text-sm text-fg-2 transition-colors peer-checked:border-accent peer-checked:bg-accent-soft peer-checked:text-accent peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent hover:border-accent/50">
                  {t.label}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="mb-3 text-sm font-medium text-fg">Add what helps</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {available.slice(0, 6).map((a) => {
              const on = selected.includes(a.id);
              return (
                <label
                  key={a.id}
                  className={cn(
                    "flex min-h-12 cursor-pointer items-center gap-3 rounded-lg border px-3.5 py-2 text-sm transition-colors",
                    on ? "border-accent bg-accent-soft text-fg" : "border-line-strong bg-surface-2 text-fg-2 hover:border-accent/50",
                  )}
                >
                  <input
                    type="checkbox"
                    checked={on}
                    onChange={() => setSelected((s) => (on ? s.filter((x) => x !== a.id) : [...s, a.id]))}
                    className="size-5 shrink-0 accent-accent"
                  />
                  <span className="flex-1">{a.label}</span>
                  <span className="text-xs text-muted">+{formatINR(a.price)}</span>
                </label>
              );
            })}
          </div>
        </fieldset>
      </div>
      <div className="relative flex flex-col justify-between gap-6 border-t border-line bg-accent-soft p-5 md:p-8 lg:border-t-0 lg:border-l">
        <div className="flex flex-col gap-2">
          <p className="text-sm text-fg-2">Rough starting budget</p>
          <p className="font-display text-5xl font-bold tracking-tight text-fg tabular-nums" aria-live="polite">
            {formatINR(total)}
          </p>
          <p className="text-xs leading-relaxed text-muted">
            Before GST. Domain and running costs at actual price. You get a fixed quote in writing after a free call.
          </p>
        </div>
        <Link href={`/pricing?${params.toString()}#calculator`} className={buttonClasses("primary", "lg", "w-full")}>
          Open full calculator <Icon name="arrow" size={18} />
        </Link>
      </div>
    </div>
  );
}
