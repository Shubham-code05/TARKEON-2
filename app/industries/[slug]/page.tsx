import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/motion/Reveal";
import { ServiceCard } from "@/components/sections/Cards";
import { FaqSection } from "@/components/sections/FaqSection";
import { PageHero } from "@/components/sections/PageHero";
import { RelatedPosts, RelatedProjects } from "@/components/sections/Related";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CtaBand } from "@/components/ui/CtaBand";
import { Section, SectionHeader } from "@/components/ui/Section";
import { getIndustry, industries } from "@/content/industries";
import { industryPhotos } from "@/content/industry-photos";
import { projectsForIndustry } from "@/content/projects";
import { getService } from "@/content/services";
import { getPostsBySlugs } from "@/lib/blog";
import { pageMetadata } from "@/lib/metadata";
import { whatsappLink } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};
  return pageMetadata({ title: industry.seoTitle, description: industry.seoDescription, path: `/industries/${slug}` });
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  const relatedServices = industry.services.flatMap((s) => getService(s) ?? []);
  const projects = projectsForIndustry(industry.slug);
  const posts = getPostsBySlugs(industry.posts);

  const [, photo] = industryPhotos(industry.slug);

  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Industries", href: "/industries" },
          { name: industry.name, href: `/industries/${industry.slug}` },
        ]}
        eyebrow={`For ${industry.name.toLowerCase()}`}
        title={industry.headline}
        description={industry.intro}
        aside={
          <div className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-line bg-surface-2 shadow-card">
            <Image src={photo.src} alt={photo.alt} fill priority sizes="(min-width: 1024px) 34rem, 100vw" className="object-cover" />
          </div>
        }
        actions={
          <>
            <Button href="/contact" size="lg">
              Get a free consultation <Icon name="arrow" size={18} />
            </Button>
            <Button
              href={whatsappLink(`Hi Tarkeon, I run a business in ${industry.name.toLowerCase()} and want to know more.`)}
              variant="secondary"
              size="lg"
            >
              <Icon name="whatsapp" size={18} /> Ask on WhatsApp
            </Button>
          </>
        }
      />

      <Section aria-labelledby="problems-title">
        <SectionHeader eyebrow="Common problems" id="problems-title" title="What usually gets in the way" />
        <ul className="grid gap-5 md:grid-cols-2">
          {industry.problems.map((p, i) => (
            <Reveal as="li" key={p.title} delay={(i % 2) * 0.06}>
              <Card className="h-full">
                <span className="flex size-9 items-center justify-center rounded-full border border-danger/30 bg-danger/10 text-danger">
                  <Icon name="x" size={16} strokeWidth={2.2} />
                </span>
                <h3 className="text-h3">{p.title}</h3>
                <p className="text-[0.9375rem] text-muted">{p.text}</p>
              </Card>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section aria-labelledby="solutions-title">
        <SectionHeader
          eyebrow="Solutions"
          id="solutions-title"
          title="What we build for you"
          description="Start with one. Each piece works on its own and connects to the others when you are ready."
        />
        <ul className="grid gap-5 md:grid-cols-2">
          {industry.solutions.map((s, i) => {
            const service = getService(s.service);
            return (
              <Reveal as="li" key={s.title} delay={(i % 2) * 0.06}>
                <Card className="h-full">
                  <span className="flex size-9 items-center justify-center rounded-full bg-success/15 text-success">
                    <Icon name="check" size={16} strokeWidth={2.4} />
                  </span>
                  <h3 className="text-h3">{s.title}</h3>
                  <p className="text-[0.9375rem] text-muted">{s.text}</p>
                  {service && (
                    <Link
                      href={`/services/${service.slug}`}
                      className="mt-auto inline-flex min-h-11 items-center gap-2 self-start text-sm font-medium text-accent hover:text-accent-hover"
                    >
                      About {service.shortTitle.toLowerCase()} <Icon name="arrow" size={16} />
                    </Link>
                  )}
                </Card>
              </Reveal>
            );
          })}
        </ul>
      </Section>

      <RelatedProjects projects={projects} title={`Projects for ${industry.name.toLowerCase()}`} />

      <Section aria-labelledby="services-title">
        <SectionHeader eyebrow="Services" id="services-title" title="Relevant services" />
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {relatedServices.map((s, i) => (
            <Reveal as="li" key={s.slug} delay={(i % 3) * 0.06}>
              <ServiceCard service={s} />
            </Reveal>
          ))}
        </ul>
      </Section>

      <FaqSection faqs={industry.faqs} title={`Questions from ${industry.name.toLowerCase()}`} />
      <RelatedPosts posts={posts} />
      <CtaBand
        title="Tell us how your business runs today."
        whatsappMessage={`Hi Tarkeon, I'd like a free consultation for my business (${industry.name.toLowerCase()}).`}
      />
    </>
  );
}
