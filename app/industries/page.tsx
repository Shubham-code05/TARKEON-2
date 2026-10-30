import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { IndustryCard } from "@/components/sections/Cards";
import { PageHero } from "@/components/sections/PageHero";
import { Guarantees } from "@/components/sections/Trust";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { Section, SectionHeader } from "@/components/ui/Section";
import { industries } from "@/content/industries";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Industries We Serve: Coaching, Clinics, Restaurants and More",
  description:
    "Websites, AI chatbots and automation designed for coaching institutes, clinics, restaurants, real estate businesses and local shops in India.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "Industries", href: "/industries" }]}
        eyebrow="Industries"
        title="Solutions shaped around your kind of business."
        description="A clinic and a coaching centre have very different problems. We start from yours, then pick the right mix of website, automation and AI."
        actions={
          <Button href="/contact" size="lg">
            Talk about your business
          </Button>
        }
      />
      <Section aria-label="All industries">
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind, i) => (
            <Reveal as="li" key={ind.slug} delay={(i % 3) * 0.06}>
              <IndustryCard industry={ind} headingLevel={2} />
            </Reveal>
          ))}
          <Reveal as="li" delay={0.12}>
            <div className="flex h-full flex-col justify-between gap-6 rounded-xl border border-dashed border-line-strong p-7">
              <div className="flex flex-col gap-3">
                <h2 className="text-h3">Don’t see your industry?</h2>
                <p className="text-[0.9375rem] text-muted">
                  We also work with gyms, salons, schools, CA firms, manufacturers and more. If customers find you online, we can
                  help.
                </p>
              </div>
              <Button href="/contact" variant="secondary" className="self-start">
                Tell us about it
              </Button>
            </div>
          </Reveal>
        </ul>
      </Section>
      <Section aria-labelledby="promise-title">
        <SectionHeader eyebrow="Our promise" id="promise-title" title="Whatever your industry, you get the same three guarantees." />
        <Guarantees />
      </Section>
      <CtaBand />
    </>
  );
}
