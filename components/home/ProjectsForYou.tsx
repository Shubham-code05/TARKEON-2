"use client";

import Link from "next/link";
import { Icon } from "@/components/Icon";
import { ProjectCard, ProjectFeatures, ProjectStack } from "@/components/sections/Cards";
import { Badge } from "@/components/ui/Badge";
import { Button, buttonClasses } from "@/components/ui/Button";
import { DeviceMockup } from "@/components/ui/DeviceMockup";
import type { Project } from "@/content/types";
import { useIndustry } from "./IndustryContext";

/** Work section: the chosen industry's projects first, then the rest. */
export function ProjectsForYou({ projects }: { projects: Project[] }) {
  const { active } = useIndustry();
  const mine = projects.filter((p) => p.industry === active.slug);
  const ordered = [...mine, ...projects.filter((p) => p.industry !== active.slug)];
  const featured = ordered.find((p) => p.featured) ?? ordered[0];
  const rest = ordered.filter((p) => p !== featured).slice(0, 3);
  if (!featured) return null;

  return (
    <div className="flex flex-col gap-6">
      {mine.length === 0 && (
        <p className="text-sm text-muted">
          No {active.label.toLowerCase()} projects to show yet, so here is our other recent work.
        </p>
      )}
      <article className="spotlight group grid overflow-hidden rounded-2xl border border-line bg-surface shadow-card transition hover:border-accent/40 lg:grid-cols-[1.4fr_1fr]">
        <div className="flex items-center border-b border-line bg-surface-2 p-5 md:p-8 lg:border-r lg:border-b-0">
          {featured.mockup ? (
            <DeviceMockup {...featured.mockup} alt={`Homepage of the ${featured.name} website`} sizes="(min-width: 1024px) 40vw, 90vw" className="w-full" />
          ) : (
            <div className="flex aspect-[16/10] w-full items-center justify-center text-muted">
              <Icon name="monitor" size={48} />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-4 p-6 md:p-8">
          {featured.tag && <Badge tone="accent" className="self-start">{featured.tag}</Badge>}
          <h3 className="text-h3">{featured.name}</h3>
          <p className="text-[0.9375rem] text-muted">{featured.summary}</p>
          <ProjectStack stack={featured.stack} />
          <ProjectFeatures features={featured.features} />
          {featured.credit && <p className="text-xs text-muted">{featured.credit}</p>}
          <div className="mt-auto flex flex-wrap gap-2 pt-2">
            <Link href={`/work/${featured.slug}`} className={buttonClasses("primary", "sm")}>
              View Case Study
            </Link>
            {featured.liveUrl && (
              <Button href={featured.liveUrl} variant="secondary" size="sm">
                Live project <Icon name="external" size={14} />
              </Button>
            )}
          </div>
        </div>
      </article>

      {rest.length > 0 && (
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <li key={p.slug}>
              <ProjectCard project={p} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
