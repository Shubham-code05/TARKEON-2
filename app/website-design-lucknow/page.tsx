import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/motion/Reveal";
import { ProjectCard, ServiceCard } from "@/components/sections/Cards";
import { FaqSection } from "@/components/sections/FaqSection";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { Checklist } from "@/components/sections/Trust";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CtaBand } from "@/components/ui/CtaBand";
import { Section, SectionHeader } from "@/components/ui/Section";
import { industries } from "@/content/industries";
import { plans } from "@/content/pricing";
import { steps } from "@/content/process";
import { getProject } from "@/content/projects";
import { getService } from "@/content/services";
import { site } from "@/content/site";
import type { Faq } from "@/content/types";
import { pageMetadata } from "@/lib/metadata";
import { localBusinessSchema } from "@/lib/schema";
import { absoluteUrl, formatINR, whatsappLink } from "@/lib/utils";

const path = "/website-design-lucknow";

export const metadata: Metadata = pageMetadata({
  title: "Website Design Company in Lucknow, Fixed Prices",
  description:
    "Website design and web development in Lucknow for small and growing businesses: fast sites, online stores and AI chatbots from ₹9,999, with a free demo.",
  path,
});

const serviceSlugs = ["websites", "ecommerce", "ai-chatbots", "seo-basics", "landing-pages", "web-apps"];

// Lucknow projects only: both are live sites for organisations based in the city
const localProjectSlugs = ["miracle-home", "rhrp"];

const reasons = [
  {
    title: "Meet in person if you want to",
    text: "We are based in Lucknow, so a first meeting at your office, clinic or shop can be arranged by appointment. Most of the work after that happens on WhatsApp and short calls.",
  },
  {
    title: "Built for how Lucknow customers search",
    text: "People here look you up on Google Maps, read a few reviews, then message on WhatsApp. Your website, Google Business Profile and WhatsApp button are set up to work together.",
  },
  {
    title: "English, Hindi or both",
    text: "Many local customers are more comfortable reading in Hindi. We can build the site in English, in Hindi, or in both languages with a simple switch.",
  },
];

const included = [
  "A fast, mobile-first design made for your business, not a reused template",
  "One-tap WhatsApp and call buttons, plus a contact form that sends leads to you",
  "Basic on-page SEO: page titles, descriptions, headings and a sitemap for Google",
  "Google Business Profile setup or clean-up, if you choose the SEO add-on",
  "Domain and hosting in your own name, so you are never locked in",
  "Training on making small updates yourself, and 30 days of free bug fixes after launch",
];

const faqs: Faq[] = [
  {
    q: "How much does website design cost in Lucknow?",
    a: `A starter business website with us begins at ${formatINR(9999)}, an online store at ${formatINR(14999)} and a website with an AI chatbot at ${formatINR(24999)}. Domain and hosting are extra and billed at actual cost. After a free call you get a fixed price in writing, so the number does not change halfway.`,
  },
  {
    q: "Do you only work with businesses in Lucknow?",
    a: "No. We are based in Lucknow and are happy to meet local clients in person, but we work with businesses across India over WhatsApp, calls and video meetings.",
  },
  {
    q: "How long does a website take?",
    a: `A simple business website usually takes 1–2 weeks once we have your content. You see a free homepage demo within ${site.demoPromise} of our first call, before you commit to anything.`,
  },
  {
    q: "Can you also help us show up on Google Maps?",
    a: "Yes. We set up or improve your Google Business Profile and do on-page SEO on your website. We do not promise a fixed ranking, because nobody honestly can, but we make sure the basics Google looks for are done properly.",
  },
  {
    q: "Will we own the website?",
    a: "Yes. The domain, hosting account, code and content are in your name. If you ever want to move to someone else, you can take everything with you.",
  },
];

function webPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Website design and web development in Lucknow",
    serviceType: "Website design",
    url: absoluteUrl(path),
    description:
      "Website design, web development, online stores, AI chatbots and local SEO for small and growing businesses in Lucknow.",
    provider: { "@id": `${site.url}/#localbusiness` },
    areaServed: { "@type": "City", name: "Lucknow" },
    offers: { "@type": "Offer", priceCurrency: "INR", price: 9999 },
  };
}

export default function WebsiteDesignLucknowPage() {
  const services = serviceSlugs.flatMap((s) => getService(s) ?? []);
  const localProjects = localProjectSlugs.flatMap((s) => getProject(s) ?? []);
  const websitePlans = plans.filter((p) => p.name !== "Care plan");
  const carePlan = plans.find((p) => p.name === "Care plan");

  return (
    <>
      <PageHero
        title="Website design in Lucknow for businesses that want more enquiries."
        description={
          <p>
            Tarkeon is a small web studio in Lucknow. We design and build fast websites, online stores, web apps and AI
            chatbots for coaching institutes, clinics, restaurants, real estate firms and local shops, at a fixed price
            agreed in writing before we start.
          </p>
        }
        actions={
          <>
            <Button href="/contact?intent=demo" size="lg">
              Get a free homepage demo <Icon name="arrow" size={18} />
            </Button>
            <Button href={whatsappLink("Hi Tarkeon, I'm in Lucknow and need a website.")} variant="secondary" size="lg">
              <Icon name="whatsapp" size={18} /> Ask on WhatsApp
            </Button>
          </>
        }
      />

      <Section aria-labelledby="local-title">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <SectionHeader
            eyebrow="Why a local studio"
            id="local-title"
            title="Web development in Lucknow, explained in plain language."
            className="lg:mb-0"
          />
          <div className="flex flex-col gap-5 text-lead text-fg-2">
            <p>
              Most small businesses in Lucknow already get customers through word of mouth, Justdial listings and
              WhatsApp. A good website does not replace any of that. It gives the people who hear about you a clear place
              to check your services, prices, timings and location, and one tap to contact you.
            </p>
            <p>
              The trouble is that many local websites are slow on mobile data, hard to update, or stop working when the
              person who made them moves on. We build sites that load quickly on a normal phone, are easy for your team to
              update, and stay in your name.
            </p>
          </div>
        </div>
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {reasons.map((r, i) => (
            <Reveal as="li" key={r.title} delay={i * 0.06}>
              <Card className="h-full">
                <h3 className="text-h3">{r.title}</h3>
                <p className="text-[0.9375rem] text-muted">{r.text}</p>
              </Card>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section aria-labelledby="services-title">
        <SectionHeader
          eyebrow="Services"
          id="services-title"
          title="What we build for Lucknow businesses"
          description="Start with the one thing that brings in customers fastest. For most businesses that is a clear website with WhatsApp and a proper Google listing."
        />
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal as="li" key={s.slug} delay={i * 0.05}>
              <ServiceCard service={s} />
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section aria-labelledby="included-title">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <SectionHeader
            eyebrow="What you get"
            id="included-title"
            title="What a business website from us includes"
            description="Everything here is written into your quote, so you know what you are paying for."
            className="lg:mb-0"
          />
          <Reveal>
            <Checklist items={included} />
          </Reveal>
        </div>
      </Section>

      <Section aria-labelledby="pricing-title">
        <SectionHeader
          eyebrow="Pricing"
          id="pricing-title"
          title="Website design cost in Lucknow: starting prices"
          description="Prices are before GST. Domain and hosting are billed at actual cost. You pay 50% to start and the rest only after you approve the work."
        />
        <ul className="grid gap-5 md:grid-cols-3">
          {websitePlans.map((p, i) => (
            <Reveal as="li" key={p.name} delay={i * 0.06}>
              <Card className="h-full">
                <h3 className="text-h3">{p.name}</h3>
                <p className="text-[0.9375rem] text-muted">{p.description}</p>
                <p className="font-display text-3xl font-bold tracking-tight text-fg">
                  <span className="text-base font-medium text-muted">from </span>
                  {formatINR(p.price)}
                </p>
              </Card>
            </Reveal>
          ))}
        </ul>
        {carePlan && (
          <p className="mt-6 text-muted">
            After launch, an optional care plan from {formatINR(carePlan.price)}/month covers small updates, backups and
            security. See the full breakdown on our{" "}
            <Link href="/pricing" className="font-medium text-accent hover:text-accent-hover">
              website pricing page
            </Link>{" "}
            or try the cost calculator.
          </p>
        )}
      </Section>

      <Section aria-labelledby="process-title">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <SectionHeader
            eyebrow="Process"
            id="process-title"
            title="How a website project works, step by step"
            description={`You see a free homepage demo within ${site.demoPromise}, get a fixed quote in writing, and get a preview link every week while we build.`}
            className="lg:mb-0"
          />
          <ProcessTimeline steps={steps} />
        </div>
      </Section>

      {localProjects.length > 0 && (
        <Section aria-labelledby="projects-title">
          <SectionHeader
            eyebrow="Our work"
            id="projects-title"
            title="Websites we have built for Lucknow organisations"
            description="Both are live. Open them on your phone and judge the speed and layout for yourself."
          />
          <ul className="grid gap-5 md:grid-cols-2">
            {localProjects.map((p, i) => (
              <Reveal as="li" key={p.slug} delay={i * 0.06}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </ul>
          <p className="mt-6">
            <Link href="/work" className="inline-flex min-h-11 items-center gap-1.5 font-medium text-accent hover:text-accent-hover">
              See our full portfolio <Icon name="arrow" size={16} />
            </Link>
          </p>
        </Section>
      )}

      <Section aria-labelledby="industries-title">
        <SectionHeader
          eyebrow="Who we work with"
          id="industries-title"
          title="Websites for your kind of business"
          description="Each industry page shows the problems we usually see and what we build to fix them."
        />
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind) => (
            <li key={ind.slug}>
              <Link
                href={`/industries/${ind.slug}`}
                className="group flex min-h-16 items-center justify-between gap-4 rounded-lg border border-line bg-surface p-4 font-medium text-fg transition-colors hover:border-accent/40"
              >
                Websites for {ind.name.toLowerCase()}
                <Icon name="arrow" size={18} className="text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-fg" />
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <FaqSection faqs={faqs} eyebrow="Questions" title="Website design in Lucknow: common questions" />

      <CtaBand
        title="Need a website for your Lucknow business?"
        description={`Tell us what you do and who your customers are. We will reply within ${site.replyTime} with honest advice and a free homepage demo.`}
        whatsappMessage="Hi Tarkeon, I'm in Lucknow and need a website."
      />

      <JsonLd data={webPageSchema()} />
      <JsonLd data={localBusinessSchema()} />
    </>
  );
}
