import { JsonLd } from "@/components/JsonLd";
import { Accordion } from "@/components/ui/Accordion";
import { Section, SectionHeader } from "@/components/ui/Section";
import type { Faq } from "@/content/types";
import { faqSchema } from "@/lib/schema";

type FaqSectionProps = {
  faqs: Faq[];
  title?: string;
  eyebrow?: string;
};

/** FAQ block with FAQPage JSON-LD. Renders nothing when there are no questions. */
export function FaqSection({ faqs, title = "Frequently asked questions", eyebrow = "FAQ" }: FaqSectionProps) {
  if (faqs.length === 0) return null;
  return (
    <Section aria-labelledby="faq-title">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          id="faq-title"
          description="Can’t find your answer? Ask us on WhatsApp, we reply within one working day."
          className="lg:sticky lg:top-28 lg:mb-0 lg:self-start"
        />
        <Accordion items={faqs.map((f) => ({ question: f.q, answer: <p>{f.a}</p> }))} openFirst />
      </div>
      <JsonLd data={faqSchema(faqs)} />
    </Section>
  );
}
