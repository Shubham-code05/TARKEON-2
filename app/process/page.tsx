import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/motion/Reveal";
import { FaqSection } from "@/components/sections/FaqSection";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { Guarantees } from "@/components/sections/Trust";
import { Button } from "@/components/ui/Button";
import { Card, IconTile } from "@/components/ui/Card";
import { CtaBand } from "@/components/ui/CtaBand";
import { Section, SectionHeader } from "@/components/ui/Section";
import { clientProvides, steps, workingPrinciples } from "@/content/process";
import { pricingFaqs } from "@/content/pricing";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Our Process: How a Project Works, Step by Step",
  description:
    "From free consultation to launch and support: our step-by-step process, what we need from you, how we communicate, revisions, delivery and support.",
  path: "/process",
});

export default function ProcessPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "Process", href: "/process" }]}
        eyebrow="Process"
        title="How we work, from the first call to after launch."
        description="No jargon and no surprises. Here is exactly what happens at each stage, what we need from you and what you get at the end."
        actions={
          <Button href="/contact" size="lg">
            Start with a free call
          </Button>
        }
      />

      <Section aria-labelledby="timeline-title">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeader
              eyebrow="Step by step"
              id="timeline-title"
              title="Seven clear stages"
              description="Most websites go from first call to launch in 1–2 weeks. Web apps take 4–8 weeks. You see progress at every stage."
              className="lg:mb-0"
            />
          </div>
          <ProcessTimeline steps={steps} />
        </div>
      </Section>

      <Section aria-labelledby="provide-title">
        <SectionHeader
          eyebrow="Your part"
          id="provide-title"
          title="What we need from you"
          description="Projects move fastest when we have these early. Don’t worry if something is missing; we will help."
        />
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {clientProvides.map((c, i) => (
            <Reveal as="li" key={c.title} delay={(i % 3) * 0.06}>
              <Card className="h-full">
                <span className="flex size-9 items-center justify-center rounded-full bg-success/15 text-success">
                  <Icon name="check" size={16} strokeWidth={2.4} />
                </span>
                <h3 className="text-h3">{c.title}</h3>
                <p className="text-[0.9375rem] text-muted">{c.text}</p>
              </Card>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section aria-labelledby="principles-title">
        <SectionHeader eyebrow="Working together" id="principles-title" title="Communication, revisions, delivery and support" />
        <ul className="grid gap-5 md:grid-cols-2">
          {workingPrinciples.map((p, i) => (
            <Reveal as="li" key={p.title} delay={(i % 2) * 0.06}>
              <Card className="h-full">
                <IconTile>
                  <Icon name={p.icon} size={22} />
                </IconTile>
                <h3 className="text-h3">{p.title}</h3>
                <p className="text-[0.9375rem] text-muted">{p.text}</p>
              </Card>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section aria-labelledby="promise-title">
        <SectionHeader eyebrow="Our promise" id="promise-title" title="Built into every project" />
        <Guarantees />
      </Section>

      <FaqSection faqs={pricingFaqs.slice(0, 4)} />
      <CtaBand />
    </>
  );
}
