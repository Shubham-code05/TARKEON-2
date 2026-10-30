import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { Container, Eyebrow } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  breadcrumbs: Crumb[];
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  /** Extra content under the text (badges, meta). */
  children?: ReactNode;
  /** Optional right-hand column on large screens. */
  aside?: ReactNode;
  className?: string;
};

/**
 * Top of every inner page: breadcrumbs, eyebrow, h1, description and actions.
 * No scroll animation here, so the heading paints immediately (good for LCP).
 */
export function PageHero({ breadcrumbs, eyebrow, title, description, actions, children, aside, className }: PageHeroProps) {
  return (
    <section className={cn("relative isolate overflow-hidden", className)}>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_65%)]" />
      <div aria-hidden="true" className="absolute -top-48 right-[-15%] -z-10 h-[28rem] w-[28rem] rounded-full glow-blob opacity-50" />
      <Container className={cn("pt-8 pb-14 md:pt-10 md:pb-20", Boolean(aside) && "grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]")}>
        <div className="flex flex-col gap-6">
          <Breadcrumbs items={breadcrumbs} className="mb-4 md:mb-8" />
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1 className="max-w-4xl text-h1">{title}</h1>
          {description && <div className="max-w-2xl text-lead text-muted">{description}</div>}
          {children}
          {actions && <div className="mt-2 flex flex-col gap-3 sm:flex-row">{actions}</div>}
        </div>
        {aside && <div className="lg:pt-16">{aside}</div>}
      </Container>
    </section>
  );
}
