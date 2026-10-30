import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { ProjectCard } from "@/components/sections/Cards";
import { FilterGrid } from "@/components/sections/FilterGrid";
import { PageHero } from "@/components/sections/PageHero";
import { Testimonials } from "@/components/sections/Testimonials";
import { Guarantees } from "@/components/sections/Trust";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { Section, SectionHeader } from "@/components/ui/Section";
import { industries } from "@/content/industries";
import { projects } from "@/content/projects";
import { testimonials } from "@/content/testimonials";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Our Work: Case Studies",
  description:
    "Websites, web apps, AI chatbots and automations built by Tarkeon. Each case study shows the problem, what we built, the tech stack and a live link.",
  path: "/work",
});

export default function WorkPage() {
  const hasProjects = projects.length > 0;
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "Work", href: "/work" }]}
        eyebrow="Our work"
        title="Real projects, explained plainly."
        description="Every project shows who it was for, what was built and a live link you can open on your own phone."
      />

      {hasProjects ? (
        <Section aria-labelledby="projects-title">
          <h2 id="projects-title" className="sr-only">
            All projects
          </h2>
          <FilterGrid
            columns={2}
            label="Filter projects by industry"
            filters={industries.map((i) => ({ id: i.slug, label: i.name }))}
            items={projects.map((p, i) => ({ id: p.slug, tags: [p.industry], node: <ProjectCard project={p} priority={i === 0} /> }))}
          />
        </Section>
      ) : (
        <Section aria-labelledby="soon-title">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 rounded-2xl border border-dashed border-line-strong px-6 py-14 text-center md:px-12">
            <span className="flex size-14 items-center justify-center rounded-full bg-brand text-white">
              <Icon name="briefcase" size={26} />
            </span>
            <h2 id="soon-title" className="text-h2">
              Case studies are on their way.
            </h2>
            <p className="text-lead text-muted">
              We only publish projects that are live, with the client’s permission. Until then, the best proof is a free demo
              built for your own business, before you pay in full.
            </p>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button href="/contact">Ask for a free demo</Button>
              <Button href="/" variant="secondary">
                Try the chatbot demo
              </Button>
            </div>
          </div>
        </Section>
      )}

      <Testimonials items={testimonials} />

      <Section aria-labelledby="promise-title">
        <SectionHeader eyebrow="Our promise" id="promise-title" title="See it before you pay in full." />
        <Guarantees />
      </Section>
      <CtaBand />
    </>
  );
}
