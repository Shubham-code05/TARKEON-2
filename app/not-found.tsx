import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <Container className="flex flex-col items-center gap-6 py-24 text-center md:py-32">
        <p className="font-display text-[7rem] leading-none font-bold text-brand md:text-[10rem]">404</p>
        <h1 className="text-h2">This page doesn’t exist.</h1>
        <p className="max-w-lg text-lead text-muted">
          The link may be old or mistyped. Here are some places to start instead.
        </p>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button href="/">Go to homepage</Button>
          <Button href="/contact" variant="secondary">
            Contact us
          </Button>
        </div>
        <ul className="mt-6 flex flex-wrap justify-center gap-2">
          {services.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/services/${s.slug}`}
                className="inline-flex min-h-10 items-center gap-2 rounded-full border border-line-strong px-4 text-sm text-fg-2 hover:border-accent/50 hover:text-fg"
              >
                <Icon name={s.icon} size={14} /> {s.shortTitle}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
