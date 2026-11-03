import type { Metadata } from "next";
import Link from "next/link";
import { TarkDivider } from "@/components/brand/TarkDivider";
import { TarkNetwork } from "@/components/brand/TarkNetwork";
import { BeforeAfter } from "@/components/home/BeforeAfter";
import { CompactCalculator } from "@/components/home/CompactCalculator";
import { Hero } from "@/components/home/Hero";
import { HomeFaq } from "@/components/home/HomeFaq";
import { IndustryExplorer } from "@/components/home/IndustryExplorer";
import { IndustryProvider, type HomeIndustry } from "@/components/home/IndustryContext";
import { ProcessScroll } from "@/components/home/ProcessScroll";
import { ProjectsForYou } from "@/components/home/ProjectsForYou";
import { ServicesBento } from "@/components/home/ServicesBento";
import { SoundFamiliar } from "@/components/home/SoundFamiliar";
import { WebsiteCheck } from "@/components/home/WebsiteCheck";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { Marquee } from "@/components/motion/Marquee";
import { Testimonials } from "@/components/sections/Testimonials";
import { ComparisonTable } from "@/components/sections/Trust";
import { buttonClasses } from "@/components/ui/Button";
import { Section, SectionHeader } from "@/components/ui/Section";
import { faqs } from "@/content/faqs";
import { industries } from "@/content/industries";
import { industryPhotos } from "@/content/industry-photos";
import { calculatorAddons, calculatorTypes } from "@/content/pricing";
import { steps } from "@/content/process";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { testimonials } from "@/content/testimonials";
import { calculateEstimate } from "@/lib/estimate";
import { faqSchema, localBusinessSchema } from "@/lib/schema";
import { whatsappLink } from "@/lib/utils";

const homeTitle = "Tarkeon | Websites, AI Chatbots & Digital Marketing in Lucknow";
const homeDescription =
  "Websites, AI chatbots and marketing that turn visitors into enquiries, for growing businesses across India. Fixed price, free homepage demo.";

export const metadata: Metadata = {
  title: { absolute: homeTitle },
  description: homeDescription,
  alternates: { canonical: "/" },
  openGraph: {
    title: homeTitle,
    description: homeDescription,
    url: "/",
    siteName: site.name,
    locale: "en_IN",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: homeTitle, description: homeDescription },
};

// Only the data the interactive parts need is sent to the browser
const homeIndustries: HomeIndustry[] = industries.map((ind) => {
  const pkg = ind.home.package;
  const estimate = calculateEstimate({ type: pkg.type, pages: pkg.pages ?? 0, addons: pkg.addons, carePlan: false });
  const params = new URLSearchParams({ type: pkg.type });
  if (pkg.addons.length) params.set("addons", pkg.addons.join(","));
  return {
    slug: ind.slug,
    key: ind.home.key,
    label: ind.home.label,
    name: ind.name,
    icon: ind.icon,
    headline: ind.home.headline,
    highlight: ind.home.highlight,
    subheadline: ind.home.subheadline,
    chatGreeting: ind.home.chatGreeting,
    chat: ind.home.chat,
    packageLabel: pkg.label,
    packagePrice: estimate?.oneTime ?? 0,
    packageHref: `/pricing?${params.toString()}#calculator`,
    packagePreset: { type: pkg.type, pages: pkg.pages, addons: pkg.addons },
    problems: ind.problems.filter((p) => p.solution).map((p) => ({ title: p.title, text: p.text, solution: p.solution! })),
    solutions: ind.solutions.map((s) => ({ title: s.title, text: s.text })),
    faqs: ind.faqs,
    photo: industryPhotos(ind.slug)[0],
  };
});

const beforeAfter = projects.find((p) => p.beforeAfter);

const marqueeItems = [
  ...services.map((s) => s.title),
  "English • Hindi • Hinglish",
  "Free demo in 48 hours",
  "Fixed quote in writing",
];

// The six services shown on the homepage; every service keeps its own page
const homeServiceSlugs = ["websites", "ecommerce", "web-apps", "seo-basics", "automation", "ai-chatbots"];

function SectionAction({ children }: { children: React.ReactNode }) {
  return <div className="mt-10 flex md:mt-12">{children}</div>;
}

export default function Home() {
  return (
    <IndustryProvider industries={homeIndustries}>
      <Hero motto={site.motto} city={site.address.city} project={projects.find((p) => p.featured)} />

      <Marquee
        label="What we do"
        className="border-t border-line bg-bg py-5"
        items={marqueeItems.map((t) => (
          <span key={t} className="flex items-center gap-3 px-3 font-display text-lg text-fg-2">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-brand" />
            {t}
          </span>
        ))}
      />

      <IndustryExplorer whatsappNumber={site.whatsapp} />

      <Section aria-labelledby="familiar-title">
        <SectionHeader
          eyebrow="Sound familiar?"
          id="familiar-title"
          title="The problems we hear most, and how we fix them."
          description="These change with the business type you pick above."
        />
        <SoundFamiliar />
      </Section>

      <TarkDivider />

      <Section id="website-check" aria-labelledby="check-title">
        <WebsiteCheck
          whatsappNumber={site.whatsapp}
          header={
            <SectionHeader
              eyebrow="Free website check"
              id="check-title"
              title="Is your website losing customers?"
              description="Get Google’s speed and SEO scores for your site in about 20 seconds."
              className="mb-0! md:mb-0!"
            />
          }
        />
      </Section>

      <Section aria-labelledby="services-title">
        <SectionHeader
          eyebrow="Services"
          id="services-title"
          title="Everything you need to win customers online."
          description="Website design and web development in Lucknow, AI chatbots for business and SEO. Start with the one thing that pays off fastest, then add more as you grow."
        />
        <ServicesBento services={homeServiceSlugs.flatMap((slug) => services.find((s) => s.slug === slug) ?? [])} />
        <SectionAction>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link href="/services" className={buttonClasses("secondary", "lg")}>
              Compare all services <Icon name="arrow" size={18} />
            </Link>
            <Link href="/services/landing-pages" className="inline-flex min-h-11 items-center text-[0.9375rem] font-medium text-accent hover:text-accent-hover">
              Need one page for an ad or launch? See landing pages
            </Link>
          </div>
        </SectionAction>
      </Section>

      {projects.length > 0 && (
        <Section aria-labelledby="work-title">
          <SectionHeader eyebrow="Portfolio" id="work-title" title="Live websites you can open and check" />
          <ProjectsForYou projects={projects} />
          <SectionAction>
            <Link href="/work" className={buttonClasses("secondary", "lg")}>
              See all projects <Icon name="arrow" size={18} />
            </Link>
          </SectionAction>
        </Section>
      )}

      {beforeAfter?.beforeAfter && (
        <Section aria-labelledby="before-after-title">
          <SectionHeader eyebrow="Before and after" id="before-after-title" title={`${beforeAfter.client}: old site vs new`} />
          <BeforeAfter
            name={`${beforeAfter.client} website`}
            before={beforeAfter.beforeAfter.before}
            after={beforeAfter.beforeAfter.after}
            width={beforeAfter.beforeAfter.width}
            height={beforeAfter.beforeAfter.height}
          />
          <SectionAction>
            <Link href={`/work/${beforeAfter.slug}`} className={buttonClasses("secondary", "lg")}>
              Read how we did it <Icon name="arrow" size={18} />
            </Link>
          </SectionAction>
        </Section>
      )}

      <Section id="estimate" aria-labelledby="estimate-title">
        <SectionHeader
          eyebrow="Cost calculator"
          id="estimate-title"
          title="What would it cost you?"
          description="We’ve picked the typical package for your kind of business. Change anything to see the price move."
        />
        <CompactCalculator types={calculatorTypes} addons={calculatorAddons} />
      </Section>

      <Section aria-labelledby="compare-title">
        <SectionHeader
          eyebrow="Why Tarkeon"
          id="compare-title"
          title="A clear way to compare your options."
          description="A fair, general comparison. Every freelancer and agency is different, so ask anyone you talk to these same questions."
        />
        <ComparisonTable />
        <SectionAction>
          <Link href="/contact" className={buttonClasses("primary", "lg")}>
            Get my free demo <Icon name="arrow" size={18} />
          </Link>
        </SectionAction>
      </Section>

      <TarkDivider />

      <Section aria-labelledby="process-title">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div className="flex flex-col gap-8 lg:sticky lg:top-[120px] lg:self-start">
            <SectionHeader
              eyebrow="How we work"
              id="process-title"
              title="From first call to launch, step by step."
              description="Fixed price and timeline in writing, a free homepage demo before you commit, and weekly updates while we build."
              className="mb-0! md:mb-0!"
            />
            <div className="flex flex-col items-start gap-3">
              <Link href="/contact" className={buttonClasses("primary", "lg")}>
                Get a free homepage demo <Icon name="arrow" size={18} />
              </Link>
              <Link
                href="/process"
                className="inline-flex min-h-11 items-center gap-1.5 text-[0.9375rem] font-medium text-accent hover:text-accent-hover"
              >
                See the full process <Icon name="arrow" size={16} />
              </Link>
            </div>
          </div>
          <ProcessScroll steps={steps} />
        </div>
      </Section>

      <Testimonials items={testimonials} />

      <Section aria-labelledby="faq-title">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div className="flex flex-col gap-8 lg:sticky lg:top-[120px] lg:self-start">
            <SectionHeader
              eyebrow="Questions"
              id="faq-title"
              title="Answers before you ask."
              description="Can’t find what you need? Message us and we’ll reply within one working day."
              className="mb-0! md:mb-0!"
            />
            <a
              href={whatsappLink("Hi Tarkeon, I have a question that isn't in your FAQ.")}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses("secondary", "lg", "self-start")}
            >
              <Icon name="whatsapp" size={18} /> Ask us on WhatsApp
            </a>
          </div>
          <HomeFaq general={faqs.slice(0, 9)} />
        </div>
      </Section>

      <section aria-labelledby="final-cta" className="py-section">
        <div className="container-site">
          <div className="relative isolate overflow-hidden rounded-2xl bg-brand px-6 py-16 text-center md:px-16 md:py-24">
            <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-40">
              <TarkNetwork variant="lite" tone="inverse" />
            </div>
            <h2 id="final-cta" className="mx-auto max-w-3xl text-h1 text-white">
              Let’s Build Something Great Together.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg font-medium text-white/80">
              Free homepage demo in {site.demoPromise}. No commitment.
            </p>
            <p className="mx-auto mt-3 max-w-2xl text-lead text-white/90">
              Tell us about your business idea and let our team help you bring it to life.
            </p>
            <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <a
                href={whatsappLink("Hi Tarkeon, I'd like the free homepage demo.")}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses("light", "lg")}
              >
                <Icon name="whatsapp" size={20} /> Get a Free Homepage Demo
              </a>
              <Link
                href="/contact"
                className="inline-flex min-h-14 items-center justify-center rounded-md border border-white/70 px-7 font-semibold text-white transition-colors hover:bg-white/10"
              >
                Contact Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      <JsonLd data={[localBusinessSchema(), faqSchema(faqs.slice(0, 9))]} />
    </IndustryProvider>
  );
}
