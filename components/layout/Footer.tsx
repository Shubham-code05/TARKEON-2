import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Logo } from "@/components/Logo";
import { industries } from "@/content/industries";
import { services } from "@/content/services";
import { legalNav, site } from "@/content/site";
import { whatsappLink } from "@/lib/utils";

const company = [
  { label: "About Tarkeon", href: "/about" },
  { label: "Portfolio", href: "/work" },
  { label: "Process", href: "/process" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="font-sans text-sm font-semibold text-fg">{title}</h2>
      <ul className="mt-4 flex flex-col gap-1">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="inline-flex min-h-9 items-center text-sm text-muted transition-colors hover:text-fg">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-bg-alt">
      <div className="container-site grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="flex max-w-sm flex-col gap-5">
          <Link href="/" className="self-start rounded-md" aria-label="Tarkeon home">
            <Logo size={30} id="footer" />
          </Link>
          <p className="text-sm leading-relaxed text-muted">
            {site.tagline} studio in {site.address.city}. Websites, web apps, AI chatbots and automation for growing
            businesses across India.
          </p>
          <ul className="flex flex-col gap-1 text-sm">
            <li>
              <a href={`mailto:${site.email}`} className="inline-flex min-h-9 items-center gap-2.5 text-fg-2 hover:text-fg">
                <Icon name="mail" size={16} className="text-muted" /> {site.email}
              </a>
            </li>
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-9 items-center gap-2.5 text-fg-2 hover:text-fg"
              >
                <Icon name="whatsapp" size={16} className="text-muted" /> {site.whatsappDisplay}
              </a>
            </li>
            <li className="inline-flex min-h-9 items-center gap-2.5 text-fg-2">
              <Icon name="map-pin" size={16} className="text-muted" /> {site.address.city}, {site.address.region}
            </li>
          </ul>
          {site.socials.length > 0 && (
            <ul className="flex gap-4 text-sm">
              {site.socials.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-fg">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <FooterColumn title="Services" links={services.map((s) => ({ label: s.title, href: `/services/${s.slug}` }))} />
        <FooterColumn title="Industries" links={industries.map((i) => ({ label: i.name, href: `/industries/${i.slug}` }))} />
        <FooterColumn title="Company" links={company} />
      </div>
      <div className="border-t border-line">
        <div className="container-site flex flex-col gap-4 py-6 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-1">
            {legalNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-flex min-h-9 items-center hover:text-fg">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
