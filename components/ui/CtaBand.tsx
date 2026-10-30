import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/motion/Reveal";
import { whatsappLink } from "@/lib/utils";

type CtaBandProps = {
  title?: ReactNode;
  description?: ReactNode;
  /** Pre-filled WhatsApp message, so we know which page the visitor came from. */
  whatsappMessage?: string;
};

/** End-of-page call to action. */
export function CtaBand({
  title = "Tell us what you need. Get a free demo.",
  description = "Share a few details and we will reply within one working day with honest advice, a clear plan and a fixed quote in writing.",
  whatsappMessage = "Hi Tarkeon, I'd like a free consultation.",
}: CtaBandProps) {
  return (
    <section aria-labelledby="cta-title" className="py-section">
      <Container>
        <Reveal className="relative isolate overflow-hidden rounded-2xl border border-line bg-surface px-6 shadow-card py-14 text-center md:px-16 md:py-20">
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
          <div
            aria-hidden="true"
            className="absolute -top-32 left-1/2 -z-10 h-72 w-[42rem] max-w-[120%] -translate-x-1/2 rounded-full glow-blob opacity-60"
          />
          <h2 id="cta-title" className="mx-auto max-w-3xl text-h2">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lead text-muted">{description}</p>
          <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Button href="/contact" size="lg">
              Book a free consultation
              <Icon name="arrow" size={18} className="transition-transform group-hover/btn:translate-x-0.5" />
            </Button>
            <Button href={whatsappLink(whatsappMessage)} variant="secondary" size="lg">
              <Icon name="whatsapp" size={18} />
              Chat on WhatsApp
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
