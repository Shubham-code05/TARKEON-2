import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/motion/Reveal";
import { Section, SectionHeader } from "@/components/ui/Section";
import type { Testimonial } from "@/content/types";

/** Client reviews. Renders nothing until there is at least one real testimonial. */
export function Testimonials({ items, title = "What clients say" }: { items: Testimonial[]; title?: string }) {
  if (items.length === 0) return null;
  return (
    <Section aria-labelledby="testimonials-title">
      <SectionHeader eyebrow="Testimonials" title={title} id="testimonials-title" />
      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((t, i) => (
          <Reveal as="li" key={`${t.name}-${i}`} delay={i * 0.06}>
            <figure className="flex h-full flex-col gap-6 rounded-xl border border-line bg-surface p-7 shadow-card">
              <Icon name="quote" size={28} className="text-accent" />
              <blockquote className="flex-1 font-display text-lg leading-relaxed text-fg">“{t.quote}”</blockquote>
              <figcaption className="text-sm">
                <span className="block font-semibold text-fg">{t.name}</span>
                <span className="text-muted">
                  {t.role ? `${t.role}, ` : ""}
                  {t.business}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
