import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { LogoMark } from "@/components/Logo";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { Guarantees } from "@/components/sections/Trust";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { Section, SectionHeader } from "@/components/ui/Section";
import { FounderAvatar } from "@/components/sections/FounderAvatar";
import { Checklist } from "@/components/sections/Trust";
import { about, founder, site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { localBusinessSchema } from "@/lib/schema";

export const metadata: Metadata = pageMetadata({
  title: "About Tarkeon: A Web, AI and Automation Studio in Lucknow",
  description:
    "Why we started Tarkeon, what the name means and the values behind how we build websites, web apps and AI tools for small businesses in India.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "About", href: "/about" }]}
        eyebrow="About us"
        title="A small studio in Lucknow, building software that small businesses can afford."
        description={`${site.name} builds websites, web apps, AI assistants and automations for coaching institutes, clinics, restaurants and local businesses across India.`}
      />

      <Section aria-labelledby="story-title">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <SectionHeader eyebrow="Our story" id="story-title" title="Why we exist" className="lg:mb-0" />
          <Reveal className="flex flex-col gap-5 text-lead text-fg-2">
            {about.story.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </Reveal>
        </div>
      </Section>

      <Section aria-labelledby="name-title">
        <Reveal className="grid items-center gap-10 md:grid-cols-[auto_1fr] md:gap-14">
          <div className="flex size-36 items-center justify-center rounded-2xl border border-line-strong bg-surface md:size-44">
            <LogoMark size={96} id="about" />
          </div>
          <div className="flex flex-col gap-4">
            <h2 id="name-title" className="text-h2">
              {about.nameMeaning.title}
            </h2>
            <p className="max-w-3xl text-lead text-muted">{about.nameMeaning.text}</p>
          </div>
        </Reveal>
      </Section>

      <Section aria-labelledby="values-title">
        <SectionHeader eyebrow="Values" id="values-title" title="How we work with you" />
        <ul className="grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {about.values.map((v, i) => (
            <Reveal as="li" key={v.title} delay={(i % 3) * 0.06} className="flex flex-col gap-3 border-t border-line-strong pt-6">
              <span className="font-display text-sm font-semibold text-accent">0{i + 1}</span>
              <h3 className="text-h3">{v.title}</h3>
              <p className="text-[0.9375rem] text-muted">{v.text}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section aria-labelledby="founder-title">
        <SectionHeader eyebrow="The founder" id="founder-title" title={founder.heading} />
        <Reveal className="grid max-w-4xl items-start gap-8 rounded-xl border border-line bg-surface p-6 shadow-card md:grid-cols-[auto_1fr] md:gap-10 md:p-8">
          <FounderAvatar size={176} />
          <div className="flex flex-col gap-4">
            <p className="text-sm font-medium text-accent">{founder.role}</p>
            {founder.bio.map((p) => (
              <p key={p} className="text-muted">
                {p}
              </p>
            ))}
            <Checklist items={founder.expect} />
            <blockquote className="border-l-2 border-accent pl-4 font-display text-lg text-fg">“{founder.quote}”</blockquote>
          </div>
        </Reveal>
      </Section>

      <Section aria-labelledby="promise-title">
        <SectionHeader
          eyebrow="Our promise"
          id="promise-title"
          title="Three things we promise every client"
          action={
            <Button href="/process" variant="secondary" size="sm">
              See our process
            </Button>
          }
        />
        <Guarantees />
      </Section>

      <CtaBand title="Let’s see if we’re a good fit." />
      <JsonLd data={localBusinessSchema()} />
    </>
  );
}
