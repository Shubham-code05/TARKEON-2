import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/motion/Reveal";
import { comparison, guarantees } from "@/content/process";
import { cn } from "@/lib/utils";

/** The three promises: free demo, 50% after approval, fixed quote. */
export function Guarantees({ className }: { className?: string }) {
  return (
    <ul className={cn("grid gap-5 md:grid-cols-3", className)}>
      {guarantees.map((g, i) => (
        <Reveal as="li" key={g.title} delay={i * 0.07}>
          <div className="relative flex h-full flex-col gap-4 overflow-hidden rounded-xl border border-line bg-surface p-7 shadow-card">
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-brand opacity-70" />
            <span className="flex size-12 items-center justify-center rounded-full bg-brand text-white">
              <Icon name={g.icon} size={22} />
            </span>
            <h3 className="text-h3">{g.title}</h3>
            <p className="text-[0.9375rem] text-muted">{g.text}</p>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}

const cell = {
  yes: { icon: "check" as const, text: "Yes", className: "text-success-ink" },
  no: { icon: "x" as const, text: "No", className: "text-muted" },
  varies: { icon: "minus" as const, text: "Varies", className: "text-fg-2" },
  rarely: { icon: "minus" as const, text: "Rarely", className: "text-fg-2" },
};

/** "Why Tarkeon" comparison: a table from tablet up, one stacked card per row on phones. */
export function ComparisonTable() {
  return (
    <Reveal className="relative overflow-hidden rounded-xl border border-line bg-surface shadow-card">
      <ul className="divide-y divide-line md:hidden">
        {comparison.rows.map((row) => (
          <li key={row.label} className="flex flex-col gap-3 p-5">
            <p className="font-medium text-fg">{row.label}</p>
            <dl className="grid grid-cols-3 gap-2 text-center text-xs">
              {row.values.map((v, i) => {
                const c = cell[v];
                return (
                  <div key={i} className={cn("flex flex-col gap-1 rounded-md p-2", i === 0 ? "bg-accent-soft" : "bg-surface-2")}>
                    <dt className="font-semibold text-fg-2">{comparison.columns[i]}</dt>
                    <dd className={cn("inline-flex items-center justify-center gap-1 font-medium", c.className)}>
                      <Icon name={c.icon} size={14} strokeWidth={2.2} />
                      {c.text}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </li>
        ))}
      </ul>
      <div className="relative hidden overflow-x-auto md:block">
        <table className="w-full border-collapse text-left text-[0.9375rem]">
          <caption className="sr-only">How Tarkeon compares with a typical freelancer and a large agency</caption>
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="w-[44%] px-5 py-4 font-medium text-muted">
                What you get
              </th>
              {comparison.columns.map((c, i) => (
                <th
                  scope="col"
                  key={c}
                  className={cn("px-4 py-4 text-center font-display font-semibold", i === 0 ? "bg-accent-soft text-accent" : "text-fg-2")}
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparison.rows.map((row) => (
              <tr key={row.label} className="border-b border-line last:border-0">
                <th scope="row" className="px-5 py-4 font-normal text-fg-2">
                  {row.label}
                </th>
                {row.values.map((v, i) => {
                  const c = cell[v];
                  return (
                    <td key={i} className={cn("px-4 py-4 text-center", i === 0 && "bg-accent-soft")}>
                      <span className={cn("inline-flex items-center gap-1.5 text-sm font-medium", c.className)}>
                        <Icon name={c.icon} size={16} strokeWidth={2.2} />
                        {c.text}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Reveal>
  );
}

/** Checklist with green ticks. */
export function Checklist({ items, columns = 1 }: { items: string[]; columns?: 1 | 2 }) {
  return (
    <ul className={cn("grid gap-x-8 gap-y-4", columns === 2 && "md:grid-cols-2")}>
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-fg-2">
          <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-success/15 text-success">
            <Icon name="check" size={14} strokeWidth={2.5} />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}
