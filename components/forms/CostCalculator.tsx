"use client";

import { useEffect, useMemo, useState } from "react";
import { Icon } from "@/components/Icon";
import { Button } from "@/components/ui/Button";
import { domainHostingYearly, gstRate, type CalculatorAddon, type CalculatorType } from "@/content/pricing";
import { calculateEstimate } from "@/lib/estimate";
import { cn, formatINR } from "@/lib/utils";
import { ConsentField, InputField, SpamGuard } from "./fields";
import { FormError, FormSuccess } from "./FormStatus";
import { useLeadForm } from "./useLeadForm";

type CostCalculatorProps = {
  types: CalculatorType[];
  addons: CalculatorAddon[];
  carePlanMonthly: number;
  whatsappNumber: string;
};

export function CostCalculator({ types, addons, carePlanMonthly, whatsappNumber }: CostCalculatorProps) {
  const [typeId, setTypeId] = useState(types[1]?.id ?? types[0]!.id);
  const [pages, setPages] = useState(5);
  const [selected, setSelected] = useState<string[]>([]);
  const [carePlan, setCarePlan] = useState(false);
  const [hosting, setHosting] = useState(true);
  const { state, formAction, pending, onSubmit, statusRef } = useLeadForm();
  const errors = state.fieldErrors ?? {};

  // Preset from the URL, e.g. /pricing?type=website&addons=chatbot,seo (links from the homepage)
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const preset = types.find((t) => t.id === q.get("type"));
    if (!preset) return;
    setTypeId(preset.id);
    const pagesParam = Number(q.get("pages"));
    if (preset.includedPages) setPages(Number.isFinite(pagesParam) && pagesParam > 0 ? pagesParam : preset.includedPages);
    const wanted = (q.get("addons") ?? "").split(",");
    setSelected(addons.filter((a) => wanted.includes(a.id) && !preset.excludes?.includes(a.id)).map((a) => a.id));
  }, [types, addons]);

  const type = types.find((t) => t.id === typeId)!;
  const available = addons.filter((a) => !type.excludes?.includes(a.id));
  const estimate = useMemo(
    () => calculateEstimate({ type: typeId, pages, addons: selected, carePlan, hosting }),
    [typeId, pages, selected, carePlan, hosting],
  );

  function chooseType(t: CalculatorType) {
    setTypeId(t.id);
    if (t.includedPages) setPages((p) => Math.max(p, t.includedPages!));
    setSelected((s) => s.filter((id) => !t.excludes?.includes(id)));
  }

  const groups = [...new Set(types.map((t) => t.service))];
  const groupTypes = types.filter((t) => t.service === type.service);
  let step = 2;

  function chooseGroup(service: string) {
    const options = types.filter((t) => t.service === service);
    chooseType(options.find((t) => t.id === "website") ?? options[0]!);
  }

  function toggleAddon(id: string) {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  }

  const summaryText = estimate
    ? `Hi Tarkeon, I used your cost calculator: ${estimate.lines.map((l) => l.label).join(", ")}. First-year estimate ${formatINR(estimate.total)}. Can I get a custom quote?`
    : "Hi Tarkeon, I used your cost calculator.";

  return (
    <form action={formAction} onSubmit={onSubmit} noValidate className="relative grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-10">
      <input type="hidden" name="kind" value="calculator" />
      <SpamGuard />

      <div className="flex flex-col gap-10">
        <fieldset>
          <legend className="mb-4 font-display text-xl font-semibold text-fg">1. Choose a service</legend>
          <div className="flex flex-wrap gap-2">
            {groups.map((g) => (
              <label key={g} className="cursor-pointer">
                <input type="radio" name="service" checked={type.service === g} onChange={() => chooseGroup(g)} className="peer sr-only" />
                <span className="inline-flex min-h-11 items-center rounded-full border border-line-strong bg-surface px-4 text-sm font-medium text-fg-2 transition-colors peer-checked:border-accent peer-checked:bg-accent-soft peer-checked:text-accent peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent hover:border-accent/50">
                  {g}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {groupTypes.length > 1 ? (
          <fieldset>
            <legend className="mb-4 font-display text-xl font-semibold text-fg">{step++}. Website type</legend>
            <div className="grid gap-3 sm:grid-cols-3">
              {groupTypes.map((t) => (
                <label key={t.id} className="cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    value={t.id}
                    checked={typeId === t.id}
                    onChange={() => chooseType(t)}
                    className="peer sr-only"
                  />
                  <span className="flex h-full flex-col gap-1 rounded-lg border border-line-strong bg-surface p-4 transition-colors peer-checked:border-accent peer-checked:bg-accent-soft peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent hover:border-accent/50">
                    <span className="font-semibold text-fg">{t.label}</span>
                    <span className="text-sm text-muted">{t.description}</span>
                    <span className="mt-auto pt-1 text-sm text-muted">from {formatINR(t.base)}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        ) : (
          <input type="hidden" name="type" value={typeId} />
        )}

        {type.includedPages && type.perExtraPage ? (
          <div className="flex flex-col gap-3">
            <label htmlFor="calc-pages" className="font-display text-xl font-semibold text-fg">
              {step++}. How many pages?
            </label>
            <div className="flex items-center gap-5">
              <input
                id="calc-pages"
                type="range"
                name="pages"
                min={type.includedPages}
                max={20}
                value={Math.max(pages, type.includedPages)}
                onChange={(e) => setPages(Number(e.target.value))}
                aria-describedby="calc-pages-hint"
                className="h-2 flex-1 cursor-pointer accent-accent"
              />
              <output htmlFor="calc-pages" className="w-12 text-right font-display text-2xl font-semibold text-fg">
                {Math.max(pages, type.includedPages)}
              </output>
            </div>
            <p id="calc-pages-hint" className="text-sm text-muted">
              {type.includedPages} {type.includedPages === 1 ? "page" : "pages"} included. Extra pages {formatINR(type.perExtraPage)} each.
            </p>
          </div>
        ) : (
          <input type="hidden" name="pages" value="0" />
        )}

        <fieldset>
          <legend className="mb-4 font-display text-xl font-semibold text-fg">
            {step++}. Additional features
          </legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {available.map((a) => (
              <label key={a.id} className="cursor-pointer">
                <input
                  type="checkbox"
                  name="addons"
                  value={a.id}
                  checked={selected.includes(a.id)}
                  onChange={() => toggleAddon(a.id)}
                  className="peer sr-only"
                />
                <span className="flex h-full items-start gap-3 rounded-lg border border-line-strong bg-surface-2 p-4 transition-colors peer-checked:border-accent peer-checked:bg-accent-soft peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent hover:border-accent/50 peer-checked:[&>.box]:border-transparent peer-checked:[&>.box]:bg-accent peer-checked:[&>.box]:text-white">
                  <span className="box mt-0.5 flex size-5 shrink-0 items-center justify-center rounded border border-line-strong text-transparent">
                    <Icon name="check" size={14} strokeWidth={3} />
                  </span>
                  <span className="flex flex-col gap-0.5">
                    <span className="font-medium text-fg">
                      {a.label} <span className="font-normal text-muted">+{formatINR(a.price)}</span>
                    </span>
                    <span className="text-sm text-muted">{a.hint}</span>
                  </span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-4 font-display text-xl font-semibold text-fg">{step++}. Hosting and maintenance</legend>
          <div className="flex flex-col gap-3">
            <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-line-strong bg-surface p-4 text-fg-2 hover:border-accent/50">
              <input
                type="checkbox"
                name="hosting"
                checked={hosting}
                onChange={(e) => setHosting(e.target.checked)}
                className="mt-0.5 size-5 shrink-0 accent-accent"
              />
              <span>
                Domain and hosting for the first year <span className="text-muted">(about {formatINR(domainHostingYearly)}, billed at actual cost)</span>
              </span>
            </label>
            <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-line-strong bg-surface p-4 text-fg-2 hover:border-accent/50">
              <input
                type="checkbox"
                name="carePlan"
                checked={carePlan}
                onChange={(e) => setCarePlan(e.target.checked)}
                className="mt-0.5 size-5 shrink-0 accent-accent"
              />
              <span>
                Maintenance care plan <span className="text-muted">({formatINR(carePlanMonthly)}/month, optional)</span>
              </span>
            </label>
          </div>
        </fieldset>
      </div>

      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="flex flex-col gap-6 rounded-xl border border-line-strong bg-surface p-6 shadow-glow">
          <div aria-live="polite" className="flex flex-col gap-4">
            <p className="self-start rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
              Estimate only, not a confirmed quotation
            </p>
            {estimate && (
              <>
                <div>
                  <p className="text-sm font-medium text-muted">Final estimated quotation (first year)</p>
                  <p className="font-display text-4xl font-bold tracking-tight text-fg tabular-nums md:text-5xl">{formatINR(estimate.total)}</p>
                </div>
                <dl className="flex flex-col gap-2 border-t border-line pt-4 text-sm">
                  {[
                    ...estimate.lines,
                    { label: "Domain and hosting (about)", amount: estimate.hostingDomain },
                    { label: `Maintenance (${formatINR(estimate.monthly)} × 12)`, amount: estimate.maintenanceYear },
                    { label: `GST at ${gstRate * 100}%, if applicable`, amount: estimate.gst },
                  ]
                    .filter((l) => l.amount > 0)
                    .map((l) => (
                      <div key={l.label} className="flex justify-between gap-4">
                        <dt className="text-fg-2">{l.label}</dt>
                        <dd className="text-fg tabular-nums">{formatINR(l.amount)}</dd>
                      </div>
                    ))}
                </dl>
              </>
            )}
            <p className="text-xs leading-relaxed text-muted">
              GST is worked out on our charges only. Domain, hosting and messaging are third-party costs billed at actual price. You
              get a fixed, confirmed quote in writing after a free call.
            </p>
          </div>

          {state.status === "success" ? (
            <FormSuccess
              state={state}
              statusRef={statusRef}
              whatsappHref={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(summaryText)}`}
              text="We have your estimate and will reply within 1 working day with questions or a fixed quote."
            />
          ) : (
            <div className="flex flex-col gap-4 border-t border-line pt-6">
              <p className="font-display text-lg font-semibold text-fg">Get a confirmed quote in writing</p>
              <InputField id="calc-name" name="name" label="Your name" autoComplete="name" required error={errors.name} />
              <InputField
                id="calc-phone"
                name="phone"
                label="WhatsApp number"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                required
                error={errors.phone}
              />
              <InputField id="calc-email" name="email" label="Email" type="email" autoComplete="email" optional error={errors.email} />
              <ConsentField error={errors.consent} />
              <FormError state={state} statusRef={statusRef} />
              <Button type="submit" disabled={pending} className={cn("w-full")}>
                {pending ? "Sending…" : "Get My Custom Quote"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
