import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { Icon, type IconName } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Section";
import { budgets, needs } from "@/content/faqs";
import { FounderAvatar } from "@/components/sections/FounderAvatar";
import { founder, site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { localBusinessSchema } from "@/lib/schema";
import { whatsappLink } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Contact: Book a Free Consultation",
  description: `Tell us about your business and get honest advice, a free demo and a fixed quote. WhatsApp ${site.whatsappDisplay} or email ${site.email}. Based in Lucknow.`,
  path: "/contact",
});

function ContactRow({ icon, title, children }: { icon: IconName; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-md border border-line-strong bg-surface-2 text-accent">
        <Icon name={icon} size={20} />
      </span>
      <div className="flex min-w-0 flex-col gap-1">
        <h2 className="font-sans text-sm font-semibold text-fg">{title}</h2>
        <div className="text-[0.9375rem] text-fg-2">{children}</div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  const linkClass = "break-words text-fg-2 underline-offset-4 hover:text-fg hover:underline";
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "Contact", href: "/contact" }]}
        eyebrow="Contact"
        title="Book your free consultation."
        description="Tell us a little about your business. We reply within one working day with honest advice, even if it’s “you don’t need us yet”."
      />
      <section aria-label="Contact form and details" className="py-section">
        <Container className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <div className="rounded-2xl border border-line bg-surface p-5 shadow-card sm:p-8 md:p-10">
            <ContactForm needs={needs} budgets={budgets} whatsappNumber={site.whatsapp} defaultNeed="Website" />
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4 rounded-xl border border-line bg-surface p-5 shadow-card">
              <FounderAvatar size={64} />
              <p className="flex flex-col gap-0.5">
                <span className="font-display font-semibold text-fg">{founder.role}</span>
                <span className="text-sm text-fg-2">You talk directly to the person who builds your product.</span>
              </p>
            </div>
            <a
              href={whatsappLink("Hi Tarkeon, I'd like a free consultation.")}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-xl border border-whatsapp/50 bg-whatsapp/10 p-5 transition-colors hover:bg-whatsapp/20"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-whatsapp text-white">
                <Icon name="whatsapp" size={24} />
              </span>
              <span className="flex flex-col">
                <span className="font-display text-lg font-semibold text-fg">Prefer WhatsApp?</span>
                <span className="text-sm text-fg-2">Message us at {site.whatsappDisplay}</span>
              </span>
              <Icon name="arrow-up-right" size={20} className="ml-auto text-fg-2 group-hover:text-fg" />
            </a>
            <ContactRow icon="mail" title="Email">
              <a href={`mailto:${site.email}`} className={linkClass}>
                {site.email}
              </a>
            </ContactRow>
            {site.phone && (
              <ContactRow icon="chat" title="Phone">
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className={linkClass}>
                  {site.phone}
                </a>
              </ContactRow>
            )}
            <ContactRow icon="clock" title="Office hours">
              <ul className="flex flex-col gap-1">
                {site.hours.map((h) => (
                  <li key={h.days}>
                    <span className="text-fg">{h.days}:</span> {h.time}
                  </li>
                ))}
              </ul>
              <p className="mt-1 text-sm text-muted">We reply to every message within {site.replyTime}.</p>
            </ContactRow>
            <ContactRow icon="map-pin" title="Location">
              <p>
                {site.address.street ? `${site.address.street}, ` : ""}
                {site.address.city}, {site.address.region}, {site.address.countryName}
              </p>
              <a href={site.mapUrl} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex min-h-10 items-center gap-1.5 font-medium text-accent hover:text-accent-hover">
                Open in Google Maps <Icon name="external" size={14} />
              </a>
              <p className="text-sm text-muted">In-person meetings in Lucknow by appointment. We work with clients across India online.</p>
            </ContactRow>
          </div>
        </Container>
      </section>
      <JsonLd data={localBusinessSchema()} />
    </>
  );
}
