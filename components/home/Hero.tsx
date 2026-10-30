import Link from "next/link";
import { TarkNetwork } from "@/components/brand/TarkNetwork";
import { Icon } from "@/components/Icon";
import { HeadlineReveal } from "@/components/motion/HeadlineReveal";
import { buttonClasses } from "@/components/ui/Button";
import { DeviceMockup } from "@/components/ui/DeviceMockup";
import type { Project } from "@/content/types";

// Policies Tarkeon already commits to in writing, not statistics
const trust = ["Free homepage demo", "Fixed quote in writing", "Pay the final 50% after approval", "You own your domain and code"];

type HeroProps = { motto: string; city: string; project?: Project };

export function Hero({ motto, city, project }: HeroProps) {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_80%_70%_at_60%_30%,black,transparent)]">
        <TarkNetwork />
      </div>
      <div aria-hidden="true" className="absolute -top-40 right-[-10%] -z-20 h-[32rem] w-[32rem] rounded-full glow-blob opacity-50" />

      <div className="container-site grid items-center gap-12 pt-10 pb-16 md:pt-16 lg:grid-cols-[1.1fr_1fr] lg:gap-14 lg:pb-24">
        <div className="flex flex-col gap-6">
          <p className="inline-flex items-center gap-2 self-start rounded-full border border-line-strong bg-surface/80 px-3.5 py-1.5 text-[0.8125rem] font-medium text-fg-2 backdrop-blur">
            <span className="size-1.5 rounded-full bg-success" aria-hidden="true" />
            {motto}
            <span className="hidden sm:inline"> · Web, AI and automation studio, {city}</span>
            <span className="sm:hidden"> · {city}</span>
          </p>

          <HeadlineReveal
            id="hero-title"
            text="Build Your Digital Presence. Grow Your Business."
            highlightFrom={4}
            className="text-h1"
          />
          <p className="max-w-xl text-lead text-muted">
            We build powerful websites, custom web applications and intelligent digital solutions that help businesses grow.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className={buttonClasses("primary", "lg")}>
              Get a Free Homepage Demo <Icon name="arrow" size={18} />
            </Link>
            <Link href="/work" className={buttonClasses("secondary", "lg")}>
              Explore Our Projects
            </Link>
          </div>

          <ul className="grid gap-x-6 gap-y-2.5 border-t border-line pt-5 text-sm text-fg-2 sm:grid-cols-2">
            {trust.map((t) => (
              <li key={t} className="flex items-center gap-2">
                <Icon name="check" size={16} strokeWidth={2.4} className="shrink-0 text-success" />
                {t}
              </li>
            ))}
          </ul>

          <Link
            href="#website-check"
            className="group inline-flex min-h-11 items-center gap-2 self-start rounded-md text-[0.9375rem] font-medium text-accent hover:text-accent-hover"
          >
            Already have a website? Check it free
            <Icon name="arrow" size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {project?.mockup && (
          <div className="flex flex-col gap-4">
            <DeviceMockup
              {...project.mockup}
              alt={`Homepage of the ${project.name} website`}
              priority
              sizes="(min-width: 1216px) 34rem, (min-width: 1024px) 44vw, 92vw"
            />
            <p className="text-center text-xs text-muted">
              <Link href={`/work/${project.slug}`} className="font-medium text-fg-2 underline underline-offset-2 hover:text-accent">
                {project.name}
              </Link>
              {project.credit ? `. ${project.credit}.` : ""}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
