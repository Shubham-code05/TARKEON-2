import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ServiceVisual } from "@/components/brand/ServiceVisual";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/motion/Reveal";
import { ServiceCard } from "@/components/sections/Cards";
import { FaqSection } from "@/components/sections/FaqSection";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { RelatedPosts, RelatedProjects } from "@/components/sections/Related";
import { Checklist } from "@/components/sections/Trust";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CtaBand } from "@/components/ui/CtaBand";
import { Section, SectionHeader } from "@/components/ui/Section";
import { getIndustry } from "@/content/industries";
import { projectsForService } from "@/content/projects";
import { industryPhotos } from "@/content/industry-photos";
import { getService, services } from "@/content/services";
import { getPostsBySlugs } from "@/lib/blog";
import { pageMetadata } from "@/lib/metadata";
import { serviceSchema } from "@/lib/schema";
import { formatINR, whatsappLink } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({ title: service.seoTitle, description: service.seoDescription, path: `/services/${slug}` });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const relatedIndustries = service.industries.flatMap((s) => getIndustry(s) ?? []);
  const otherServices = services.filter((s) => s.slug !== service.slug).slice(0, 3);
  const projects = projectsForService(service.slug);
  const posts = getPostsBySlugs(service.posts);

  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Services", href: "/services" },
          { name: service.title, href: `/services/${service.slug}` },
        ]}
        eyebrow={service.title}
        title={service.headline}
        description={service.intro}
        aside={
          <div aria-hidden="true" className="rounded-2xl border border-line bg-surface p-5 shadow-card [&_*]:motion-reduce:animate-none">
            <ServiceVisual slug={service.slug} />
          </div>
        }
        actions={
          <>
            <Button href="/contact" size="lg">
              Get a free consultation <Icon name="arrow" size={18} />
            </Button>
            <Button
              href={whatsappLink(`Hi Tarkeon, I'm interested in ${service.title.toLowerCase()}.`)}
              variant="secondary"
              size="lg"
            >
              <Icon name="whatsapp" size={18} /> Ask on WhatsApp
            </Button>
          </>
        }
      >
        <div className="flex flex-wrap gap-2">
          <Badge tone="accent">
            <Icon name="rupee" size={14} /> From {formatINR(service.startingPrice)}
          </Badge>
          <Badge>
            <Icon name="clock" size={14} /> {service.timeline}
          </Badge>
          <Badge>
            <Icon name="eye" size={14} /> Free demo first
          </Badge>
        </div>
      </PageHero>

      <Section aria-labelledby="problem-title">
        <SectionHeader eyebrow="The problem" id="problem-title" title="Sound familiar?" />
        <ul className="grid gap-5 md:grid-cols-3">
          {service.problems.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 0.06}>
              <Card className="h-full">
                <span className="font-display text-sm font-semibold text-accent">0{i + 1}</span>
                <h3 className="text-h3">{p.title}</h3>
                <p className="text-[0.9375rem] text-muted">{p.text}</p>
              </Card>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section aria-labelledby="deliverables-title">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <SectionHeader
            eyebrow="What you get"
            id="deliverables-title"
            title={`Included in ${service.shortTitle.toLowerCase()}`}
            description="Everything below is agreed in your written quote, so you know exactly what you are paying for."
            className="lg:mb-0"
          />
          <Reveal>
            <Checklist items={service.deliverables} />
          </Reveal>
        </div>
      </Section>

      <Section aria-labelledby="process-title">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <SectionHeader
            eyebrow="Process"
            id="process-title"
            title="How it comes together"
            description={`Usual timeline: ${service.timeline}, depending on how quickly we receive content and feedback.`}
            className="lg:mb-0"
          />
          <ProcessTimeline steps={service.process} />
        </div>
      </Section>

      <Section aria-labelledby="pricing-title">
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal className="flex flex-col gap-5 rounded-xl border border-line-strong bg-surface p-7 shadow-glow md:p-9">
            <p className="text-sm font-medium text-muted" id="pricing-title">
              Starting price
            </p>
            <p className="font-display text-5xl font-bold tracking-tight text-fg">
              {formatINR(service.startingPrice)}
              {service.priceSuffix && <span className="text-xl font-medium text-muted">{service.priceSuffix}</span>}
            </p>
            <p className="text-muted">{service.priceNote}</p>
            <ul className="flex flex-col gap-2 text-sm text-fg-2">
              <li className="flex items-center gap-2">
                <Icon name="check" size={16} className="text-success" /> 50% to start, 50% after your approval
              </li>
              <li className="flex items-center gap-2">
                <Icon name="check" size={16} className="text-success" /> Fixed quote in writing, prices before GST
              </li>
            </ul>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <Button href="/pricing#calculator">Estimate your cost</Button>
              <Button href="/pricing" variant="secondary">
                All plans
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="flex flex-col gap-5 rounded-xl border border-line bg-surface p-7 md:p-9">
            <h2 className="text-h3">Tech we use</h2>
            <p className="text-muted">Proven, well-supported tools, so your project is fast, secure and easy for anyone to maintain later.</p>
            <ul className="flex flex-wrap gap-2">
              {service.stack.map((t) => (
                <li key={t}>
                  <Badge className="px-3.5 py-1.5 text-sm">{t}</Badge>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {relatedIndustries.length > 0 && (
        <Section aria-labelledby="industries-title">
          <SectionHeader eyebrow="Who it’s for" id="industries-title" title={`${service.shortTitle} for your industry`} />
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {relatedIndustries.map((ind) => (
              <li key={ind.slug}>
                <Link
                  href={`/industries/${ind.slug}`}
                  className="group flex min-h-16 items-center gap-4 rounded-lg border border-line bg-surface p-4 transition-colors hover:border-accent/40"
                >
                  <Image
                    src={industryPhotos(ind.slug)[0].src}
                    alt=""
                    width={72}
                    height={72}
                    sizes="72px"
                    className="size-[4.5rem] shrink-0 rounded-md object-cover"
                  />
                  <span className="flex-1 font-medium text-fg">{ind.name}</span>
                  <Icon name="arrow" size={18} className="text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-fg" />
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <RelatedProjects projects={projects} title={`${service.shortTitle} we have built`} />
      <FaqSection faqs={service.faqs} title={`${service.shortTitle}: common questions`} />
      <RelatedPosts posts={posts} />

      <Section aria-labelledby="more-services">
        <SectionHeader eyebrow="More services" id="more-services" title="Often combined with" />
        <ul className="grid gap-5 md:grid-cols-3">
          {otherServices.map((s) => (
            <li key={s.slug}>
              <ServiceCard service={s} />
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand
        title={`Let’s talk about your ${service.shortTitle.toLowerCase()}.`}
        whatsappMessage={`Hi Tarkeon, I'd like a free consultation for ${service.title.toLowerCase()}.`}
      />
      <JsonLd data={serviceSchema(service)} />
    </>
  );
}
