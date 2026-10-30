import Image from "next/image";
import Link from "next/link";
import { ServiceVisual } from "@/components/brand/ServiceVisual";
import { Icon } from "@/components/Icon";
import { Badge } from "@/components/ui/Badge";
import { Button, buttonClasses } from "@/components/ui/Button";
import { Card, IconTile } from "@/components/ui/Card";
import { DeviceMockup } from "@/components/ui/DeviceMockup";
import { industryPhotos } from "@/content/industry-photos";
import type { Industry, Project, Service } from "@/content/types";
import type { PostMeta } from "@/lib/blog";
import { formatDate, formatINR } from "@/lib/utils";

export function ServiceCard({ service, headingLevel = 3 }: { service: Service; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <Card href={`/services/${service.slug}`} label={`${service.title}: see details`} className="h-full">
      <div aria-hidden="true" className="flex items-center h-44 overflow-hidden [&_*]:motion-reduce:animate-none [&>*]:max-h-full [&>*]:min-h-0!">
        <ServiceVisual slug={service.slug} />
      </div>
      <H className="text-h3">{service.title}</H>
      <p className="text-[0.9375rem] text-muted">{service.summary}</p>
      <p className="mt-auto flex items-center justify-between pt-2 text-sm">
        <span className="text-muted">
          from <span className="font-semibold text-fg">{formatINR(service.startingPrice)}</span>
          {service.priceSuffix}
        </span>
        <Icon name="arrow-up-right" size={18} className="text-muted transition-colors group-hover:text-fg" />
      </p>
    </Card>
  );
}

export function IndustryCard({ industry, headingLevel = 3 }: { industry: Industry; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  const [photo] = industryPhotos(industry.slug);
  return (
    <Card href={`/industries/${industry.slug}`} label={`${industry.name}: see how we help`} className="h-full">
      <div className="relative -mx-6 -mt-6 aspect-[16/7] overflow-hidden rounded-t-xl border-b border-line bg-surface-2 md:-mx-7 md:-mt-7">
        <Image
          src={photo.src}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <IconTile className="-mt-11 relative">
        <Icon name={industry.icon} size={22} />
      </IconTile>
      <H className="text-h3">{industry.name}</H>
      <p className="text-[0.9375rem] text-muted">{industry.summary}</p>
      <p className="mt-auto flex items-center gap-2 pt-2 text-sm font-medium text-accent">
        See solutions <Icon name="arrow" size={16} className="transition-transform group-hover:translate-x-0.5" />
      </p>
    </Card>
  );
}

/** Technologies used on a project. */
export function ProjectStack({ stack }: { stack?: string[] }) {
  if (!stack?.length) return null;
  return (
    <ul aria-label="Technologies used" className="flex flex-wrap gap-1.5">
      {stack.map((t) => (
        <li key={t}>
          <Badge className="px-2.5 py-0.5">{t}</Badge>
        </li>
      ))}
    </ul>
  );
}

/** Up to three key features of a project. */
export function ProjectFeatures({ features }: { features: string[] }) {
  return (
    <ul aria-label="Key features" className="flex flex-col gap-1.5 text-sm text-fg-2">
      {features.slice(0, 3).map((f) => (
        <li key={f} className="flex gap-2">
          <Icon name="check" size={16} strokeWidth={2.4} className="mt-0.5 shrink-0 text-success" />
          {f}
        </li>
      ))}
    </ul>
  );
}

export function ProjectCard({ project, priority }: { project: Project; priority?: boolean }) {
  const caseStudy = `/work/${project.slug}`;
  return (
    <Card interactive flush className="h-full overflow-hidden">
      <Link href={caseStudy} aria-label={`${project.name}: view case study`} className="block border-b border-line bg-surface-2 p-5">
        {project.mockup ? (
          <DeviceMockup
            {...project.mockup}
            alt={`Homepage of the ${project.name} website`}
            priority={priority}
            sizes="(min-width: 1216px) 32rem, (min-width: 768px) 42vw, 85vw"
          />
        ) : (
          <div className="flex aspect-[16/10] items-center justify-center text-muted">
            <Icon name="monitor" size={40} />
          </div>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-6">
        {project.tag && <p className="text-xs font-medium text-muted">{project.tag}</p>}
        <h3 className="text-h3">{project.name}</h3>
        <p className="text-[0.9375rem] text-muted">{project.summary}</p>
        <ProjectStack stack={project.stack} />
        <ProjectFeatures features={project.features} />
        {project.credit && <p className="text-xs text-muted">{project.credit}</p>}
        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          <Link href={caseStudy} className={buttonClasses("primary", "sm")}>
            View Case Study
          </Link>
          {project.liveUrl && (
            <Button href={project.liveUrl} variant="secondary" size="sm">
              Live project <Icon name="external" size={14} />
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}

export function PostCard({ post, headingLevel = 3 }: { post: PostMeta; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <Card href={`/blog/${post.slug}`} label={`Read: ${post.title}`} className="h-full">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted">
        <Badge tone="accent">{post.category}</Badge>
        <span>{post.readingMinutes} min read</span>
      </div>
      <H className="text-h3">{post.title}</H>
      <p className="text-[0.9375rem] text-muted">{post.description}</p>
      <p className="mt-auto flex items-center justify-between pt-2 text-sm text-muted">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <Icon name="arrow-up-right" size={18} className="transition-colors group-hover:text-fg" />
      </p>
    </Card>
  );
}
