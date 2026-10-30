import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { RelatedProjects } from "@/components/sections/Related";
import { Checklist } from "@/components/sections/Trust";
import { Badge } from "@/components/ui/Badge";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { DeviceMockup } from "@/components/ui/DeviceMockup";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { Container, Section, SectionHeader } from "@/components/ui/Section";
import { getIndustry } from "@/content/industries";
import { getProject, projects } from "@/content/projects";
import { getService } from "@/content/services";
import { testimonials } from "@/content/testimonials";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return pageMetadata({ title: `${project.name}: Case Study`, description: project.summary, path: `/work/${slug}` });
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const industry = getIndustry(project.industry);
  const usedServices = project.services.flatMap((s) => getService(s) ?? []);
  const review = testimonials.find((t) => t.project === project.slug);
  const more = projects.filter((p) => p.slug !== project.slug && (p.industry === project.industry || p.services.some((s) => project.services.includes(s))));
  const host = project.liveUrl?.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Work", href: "/work" },
          { name: project.name, href: `/work/${project.slug}` },
        ]}
        eyebrow="Case study"
        title={project.name}
        description={project.summary}
        actions={
          project.liveUrl ? (
            <Button href={project.liveUrl} size="lg">
              Visit live site <Icon name="external" size={18} />
            </Button>
          ) : undefined
        }
      >
        <dl className="grid max-w-3xl grid-cols-2 gap-x-8 gap-y-4 border-t border-line pt-6 text-sm md:grid-cols-4">
          <div>
            <dt className="text-muted">Client</dt>
            <dd className="mt-1 font-medium text-fg">{project.client}</dd>
          </div>
          {industry && (
            <div>
              <dt className="text-muted">Industry</dt>
              <dd className="mt-1">
                <Link href={`/industries/${industry.slug}`} className="font-medium text-accent hover:text-accent-hover">
                  {industry.name}
                </Link>
              </dd>
            </div>
          )}
          {project.year && (
            <div>
              <dt className="text-muted">Year</dt>
              <dd className="mt-1 font-medium text-fg">{project.year}</dd>
            </div>
          )}
          <div>
            <dt className="text-muted">Services</dt>
            <dd className="mt-1 flex flex-col gap-1">
              {usedServices.map((s) => (
                <Link key={s.slug} href={`/services/${s.slug}`} className="font-medium text-accent hover:text-accent-hover">
                  {s.shortTitle}
                </Link>
              ))}
            </dd>
          </div>
        </dl>
        {project.credit && <p className="text-sm text-muted">{project.credit}</p>}
      </PageHero>

      {project.mockup && (
        <Container className="py-12 md:py-16">
          <DeviceMockup
            {...project.mockup}
            alt={`Homepage of the ${project.name} website`}
            priority
            sizes="(min-width: 1216px) 1080px, 92vw"
            className="mx-auto max-w-5xl"
          />
          <p className="mt-4 hidden text-center text-sm text-muted md:block">Hover over the laptop to scroll through the page.</p>
        </Container>
      )}

      {(project.problem || project.built) && (
        <Section aria-label="About the project">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {project.problem && (
              <Reveal className="flex flex-col gap-4">
                <h2 className="text-h2">The problem</h2>
                <p className="text-lead text-muted">{project.problem}</p>
              </Reveal>
            )}
            {project.built && (
              <Reveal delay={0.06} className="flex flex-col gap-4">
                <h2 className="text-h2">What we built</h2>
                <p className="text-lead text-muted">{project.built}</p>
              </Reveal>
            )}
          </div>
        </Section>
      )}

      <Section aria-labelledby="features-title">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <div>
            <SectionHeader eyebrow="Key features" id="features-title" title="What was built" />
            <Checklist items={project.features} columns={2} />
          </div>
          {project.stack && (
            <Reveal className="flex flex-col gap-5 self-start rounded-xl border border-line bg-surface p-7">
              <h2 className="text-h3">Technologies used</h2>
              <ul className="flex flex-wrap gap-2">
                {project.stack.map((t) => (
                  <li key={t}>
                    <Badge className="px-3.5 py-1.5 text-sm">{t}</Badge>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>
      </Section>

      {project.screenshots && project.screenshots.length > 0 && (
        <Section aria-labelledby="screens-title">
          <SectionHeader eyebrow="Screens" id="screens-title" title="A closer look" />
          <ul className="grid gap-8 md:grid-cols-2">
            {project.screenshots.map((s) => (
              <Reveal as="li" key={s.src}>
                <BrowserFrame url={host}>
                  <Image src={s.src} alt={s.alt} width={s.width} height={s.height} sizes="(min-width: 768px) 50vw, 100vw" className="h-auto w-full" />
                </BrowserFrame>
                {s.caption && <p className="mt-3 text-sm text-muted">{s.caption}</p>}
              </Reveal>
            ))}
          </ul>
        </Section>
      )}

      {project.results && project.results.length > 0 && (
        <Section aria-labelledby="results-title">
          <SectionHeader eyebrow="Results" id="results-title" title="What changed" />
          <dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {project.results.map((r) => (
              <Reveal key={r.label} className="flex flex-col-reverse gap-2 rounded-xl border border-line bg-surface p-6">
                <dt className="text-sm text-muted">{r.label}</dt>
                <dd className="font-display text-4xl font-bold text-brand">{r.value}</dd>
              </Reveal>
            ))}
          </dl>
        </Section>
      )}

      {review && (
        <Section aria-label="Client review">
          <figure className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
            <Icon name="quote" size={36} className="text-accent" />
            <blockquote className="font-display text-2xl leading-snug text-fg md:text-3xl">“{review.quote}”</blockquote>
            <figcaption className="text-muted">
              <span className="font-semibold text-fg">{review.name}</span>
              {review.role ? `, ${review.role}` : ""} · {review.business}
            </figcaption>
          </figure>
        </Section>
      )}

      <RelatedProjects projects={more} title="More projects like this" />
      <CtaBand title="Want something like this for your business?" />
    </>
  );
}
