import type { Metadata } from "next";
import { CareersForm } from "@/components/forms/CareersForm";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { Checklist } from "@/components/sections/Trust";
import { Container } from "@/components/ui/Section";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Careers: Freelancers and Interns",
  description:
    "No open full-time roles right now, but Tarkeon is happy to talk to freelancers and interns in web development, design, content and automation.",
  path: "/careers",
});

const lookingFor = [
  "Web developers (React, Next.js, TypeScript)",
  "UI and visual designers",
  "Content writers who write simple, clear English or Hindi",
  "Automation builders (Google Apps Script, n8n, Make)",
  "Students who want real projects for their portfolio",
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "Careers", href: "/careers" }]}
        eyebrow="Careers"
        title="No open roles right now, but let’s talk."
        description="We don’t have a full-time opening at the moment. We are always happy to hear from freelancers and interns who care about doing clean, honest work."
      />
      <section aria-label="Apply" className="py-section">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <Reveal className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h2 className="text-h2">Who we’d like to hear from</h2>
              <p className="text-muted">
                Most of our work is for small businesses: coaching institutes, clinics, restaurants and local shops. If you
                enjoy making technology simple for real people, you’ll fit right in.
              </p>
            </div>
            <Checklist items={lookingFor} />
            <p className="text-sm text-muted">
              Freelance work is paid per project. Internships come with real client work and mentoring; we discuss terms openly
              before you start. Remote is fine; Lucknow is a bonus. Questions? Email{" "}
              <a href={`mailto:${site.email}`} className="text-accent underline underline-offset-2 hover:text-accent-hover">
                {site.email}
              </a>
              .
            </p>
          </Reveal>
          <div className="rounded-2xl border border-line bg-surface p-5 shadow-card sm:p-8 md:p-10">
            <h2 className="mb-6 font-display text-2xl font-semibold">Introduce yourself</h2>
            <CareersForm whatsappNumber={site.whatsapp} />
          </div>
        </Container>
      </section>
    </>
  );
}
