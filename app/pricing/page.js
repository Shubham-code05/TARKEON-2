import Faq from "@/components/Faq";
import Estimator from "@/components/Estimator";
import { PageHero, PricingGrid, Eyebrow, CtaBand } from "@/components/Sections";

export const metadata = {
  title: "Pricing — Websites from ₹9,999 | Tarkeon",
  description: "Clear starting prices for websites, AI chatbots, web apps and monthly care plans. Fixed quote in writing, 50% to start.",
};

const terms = [
  { title: "Fixed quote", text: "After a free call you get one price in writing. No hidden charges later." },
  { title: "50% to start", text: "Pay half to begin. Pay the rest only after you review and approve the work." },
  { title: "Free demo first", text: "You see a first look of your homepage before you commit to the full project." },
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Clear starting prices. Final quote in writing."
        text="Prices depend on how much you need. These are honest starting points; your fixed quote comes after a free call."
      />
      <section className="container section section-tight">
        <PricingGrid />
        <p className="small muted">Domain and paid hosting, if needed, are billed at actual cost. GST extra if applicable.</p>
      </section>

      <section id="estimator" className="container section section-tight">
        <div className="section-head">
          <Eyebrow>Cost calculator</Eyebrow>
          <h2>See your price in 30 seconds.</h2>
          <p className="muted">Choose what you need. The estimate updates as you go, and you can send it to us on WhatsApp for a fixed quote.</p>
        </div>
        <Estimator />
      </section>

      <section className="band-white">
        <div className="container section">
          <div className="section-head">
            <Eyebrow>How payment works</Eyebrow>
            <h2>Safe for you, simple for us.</h2>
          </div>
          <div className="grid grid-3">
            {terms.map((t) => (
              <div key={t.title} className="value">
                <h3>{t.title}</h3>
                <p>{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container container-narrow section">
        <div className="section-head">
          <Eyebrow>Questions</Eyebrow>
          <h2>Frequently asked</h2>
        </div>
        <Faq />
      </section>
      <CtaBand title="Get your fixed quote." text="Share what you need. We reply within one working day with a clear price and timeline." />
    </>
  );
}
