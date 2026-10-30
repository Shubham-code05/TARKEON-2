import type { Metadata } from "next";
import Link from "next/link";
import { CostCalculator } from "@/components/forms/CostCalculator";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/motion/Reveal";
import { FaqSection } from "@/components/sections/FaqSection";
import { PageHero } from "@/components/sections/PageHero";
import { ComparisonTable } from "@/components/sections/Trust";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { Section, SectionHeader } from "@/components/ui/Section";
import { calculatorAddons, calculatorTypes, carePlanMonthly, paymentTerms, plans, pricingFaqs } from "@/content/pricing";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { cn, formatINR } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Pricing: Website, AI Chatbot and Web App Costs",
  description:
    "Clear starting prices: websites from ₹9,999, website + AI chatbot from ₹24,999, custom web apps from ₹39,999. Try the cost calculator. 50% after approval.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "Pricing", href: "/pricing" }]}
        eyebrow="Pricing"
        title="Clear starting prices. Final quote in writing."
        description="Every project gets a fixed price after a free call. Pay 50% to start and the rest only after you approve the work."
        actions={
          <>
            <Button href="#calculator" size="lg">
              Estimate your cost
            </Button>
            <Button href="/contact" variant="secondary" size="lg">
              Get a free consultation
            </Button>
          </>
        }
      />

      <Section aria-label="Plans">
        <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {plans.map((p, i) => (
            <Reveal as="li" key={p.name} delay={i * 0.06} className="flex">
              <div
                className={cn(
                  "relative flex w-full flex-col gap-5 rounded-xl border bg-surface p-7 shadow-card",
                  p.popular ? "border-accent shadow-glow" : "border-line",
                )}
              >
                {p.popular && (
                  <Badge tone="accent" className="absolute -top-3 left-7">
                    Most popular
                  </Badge>
                )}
                <div className="flex flex-col gap-2">
                  <h2 className="text-h3">{p.name}</h2>
                  <p className="text-sm text-muted">{p.description}</p>
                </div>
                <p className="text-sm text-muted">
                  from{" "}
                  <span className="font-display text-4xl font-bold tracking-tight text-fg">{formatINR(p.price)}</span>
                  {p.suffix}
                </p>
                <ul className="flex flex-1 flex-col gap-3 border-t border-line pt-5 text-[0.9375rem] text-fg-2">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2.5">
                      <Icon name="check" size={18} strokeWidth={2.2} className="mt-0.5 shrink-0 text-success" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/services/${p.service}`}
                  className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-accent hover:text-accent-hover"
                >
                  What’s included <Icon name="arrow" size={16} />
                </Link>
              </div>
            </Reveal>
          ))}
        </ul>
        <p className="mt-6 text-sm text-muted">
          Prices are before GST. Domain and paid hosting, if needed, are billed at actual cost. Landing pages from{" "}
          {formatINR(calculatorTypes.find((t) => t.id === "landing")?.base ?? 0)}, automation from{" "}
          {formatINR(calculatorTypes.find((t) => t.id === "automation")?.base ?? 0)}.
        </p>
      </Section>

      <Section id="calculator" aria-labelledby="calculator-title">
        <SectionHeader
          eyebrow="Cost calculator"
          id="calculator-title"
          title="Estimate your project in a minute."
          description="Pick what you need to see a rough starting budget. Send it to us and we will reply with a fixed quote."
        />
        <CostCalculator
          types={calculatorTypes}
          addons={calculatorAddons}
          carePlanMonthly={carePlanMonthly}
          whatsappNumber={site.whatsapp}
        />
      </Section>

      <Section aria-labelledby="terms-title">
        <SectionHeader eyebrow="Payment terms" id="terms-title" title="How payment works" />
        <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {paymentTerms.map((t, i) => (
            <Reveal as="li" key={t.title} delay={i * 0.06} className="flex flex-col gap-3 border-t border-line-strong pt-6">
              <span className="font-display text-sm font-semibold text-accent">Step {i + 1}</span>
              <h3 className="text-h3">{t.title}</h3>
              <p className="text-[0.9375rem] text-muted">{t.text}</p>
            </Reveal>
          ))}
        </ol>
        <p className="mt-8 text-sm text-muted">
          Read the full <Link href="/refund-policy" className="text-accent underline underline-offset-2 hover:text-accent-hover">refund policy</Link>{" "}
          and <Link href="/terms" className="text-accent underline underline-offset-2 hover:text-accent-hover">terms</Link>.
        </p>
      </Section>

      <Section aria-labelledby="compare-title">
        <SectionHeader eyebrow="Why Tarkeon" id="compare-title" title="How we compare" description="A fair, general comparison. Every freelancer and agency is different." />
        <ComparisonTable />
      </Section>

      <FaqSection faqs={pricingFaqs} title="Pricing questions" />
      <CtaBand />
    </>
  );
}
