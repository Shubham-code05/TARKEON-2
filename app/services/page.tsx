import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { IndustryCard, ServiceCard } from "@/components/sections/Cards";
import { FaqSection } from "@/components/sections/FaqSection";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { Section, SectionHeader } from "@/components/ui/Section";
import { faqs } from "@/content/faqs";
import { industries } from "@/content/industries";
import { steps } from "@/content/process";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Services: Websites, Web Apps, AI Chatbots and Automation",
  description:
    "Business websites, custom web apps, AI chatbots, automation, landing pages and local SEO for small businesses in Lucknow and across India. Clear starting prices.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "Services", href: "/services" }]}
        eyebrow="Services"
        title="Everything you need to win customers online, from one studio."
        description="Start with the one thing that will pay off fastest. Every service comes with a free consultation, a fixed quote in writing and support after launch."
        actions={
          <>
            <Button href="/contact" size="lg">
              Get a free consultation
            </Button>
            <Button href="/pricing" variant="secondary" size="lg">
              See pricing
            </Button>
          </>
        }
      />

      <Section aria-label="All services">
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal as="li" key={s.slug} delay={(i % 3) * 0.06}>
              <ServiceCard service={s} headingLevel={2} />
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section aria-labelledby="industries-title">
        <SectionHeader
          eyebrow="Industries"
          id="industries-title"
          title="Built for how your business actually works."
          description="We know the daily problems of coaching institutes, clinics, restaurants, property businesses and local shops."
          action={
            <Button href="/industries" variant="secondary" size="sm">
              All industries
            </Button>
          }
        />
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind, i) => (
            <Reveal as="li" key={ind.slug} delay={(i % 3) * 0.06}>
              <IndustryCard industry={ind} />
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section aria-labelledby="process-title">
        <SectionHeader
          eyebrow="How we work"
          id="process-title"
          title="Simple process. No surprises."
          action={
            <Button href="/process" variant="secondary" size="sm">
              Full process
            </Button>
          }
        />
        <ProcessTimeline steps={steps.slice(0, 4)} compact />
      </Section>

      <FaqSection faqs={faqs} />
      <CtaBand />
    </>
  );
}
