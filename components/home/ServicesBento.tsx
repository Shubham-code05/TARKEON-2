import Link from "next/link";
import { ServiceVisual } from "@/components/brand/ServiceVisual";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/motion/Reveal";
import type { Service } from "@/content/types";
import { formatINR } from "@/lib/utils";

export function ServicesBento({ services }: { services: Service[] }) {
  return (
    <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {services.map((s, i) => (
        <Reveal as="li" key={s.slug} delay={(i % 3) * 0.06} className="flex">
          <div className="spotlight group relative flex w-full flex-col gap-5 overflow-hidden rounded-xl border border-line bg-surface p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-glow motion-reduce:hover:translate-y-0 md:p-7">
            <div aria-hidden="true" className="flex h-44 items-center overflow-hidden [&_*]:motion-reduce:animate-none [&>*]:max-h-full [&>*]:min-h-0!">
              <ServiceVisual slug={s.slug} />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="flex items-center gap-2 text-h3">
                <Icon name={s.icon} size={20} className="shrink-0 text-accent" />
                {s.title}
              </h3>
              <p className="text-[0.9375rem] text-muted">{s.summary}</p>
            </div>
            <ul className="flex flex-1 flex-col gap-2 text-sm text-fg-2">
              {s.benefits.map((b) => (
                <li key={b} className="flex gap-2">
                  <Icon name="check" size={16} strokeWidth={2.4} className="mt-0.5 shrink-0 text-success" />
                  {b}
                </li>
              ))}
            </ul>
            <p className="flex items-center justify-between border-t border-line pt-4 text-sm">
              <span className="text-muted">
                from <span className="font-semibold text-fg">{formatINR(s.startingPrice)}</span>
              </span>
              <span className="flex items-center gap-1 font-medium text-accent">
                Learn more <Icon name="arrow" size={16} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </p>
            <Link href={`/services/${s.slug}`} className="absolute inset-0 rounded-xl" aria-label={`Learn more about ${s.title}`} />
          </div>
        </Reveal>
      ))}
    </ul>
  );
}
