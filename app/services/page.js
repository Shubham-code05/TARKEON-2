import Link from "next/link";
import Icon from "@/components/Icon";
import { PageHero, Process, CtaBand } from "@/components/Sections";
import { services } from "@/lib/site";

export const metadata = {
  title: "Services — Websites, Web Apps, AI Chatbots, Automation | Tarkeon",
  description: "Business websites, custom web apps, AI chatbots for website and WhatsApp, and business automation for growing businesses in India.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Four ways we help your business grow."
        text="Start with one, add more as you grow. Every service comes with a fixed quote, a written timeline and support after launch."
      >
        <nav className="jump" aria-label="Jump to a service">
          {services.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="chip">
              {s.title}
            </a>
          ))}
        </nav>
      </PageHero>

      <div className="container section service-list">
        {services.map((s, i) => (
          <section key={s.id} id={s.id} className="service-row">
            <div className="service-intro">
              <p className="step-num-dark">{String(i + 1).padStart(2, "0")}</p>
              <span className="service-icon">
                <Icon name={s.icon} size={32} strokeWidth={1.6} />
              </span>
              <h2>{s.title}</h2>
              <p className="lead-sm">{s.long}</p>
              <dl className="service-meta">
                <div>
                  <dt>Ideal for</dt>
                  <dd>{s.idealFor}</dd>
                </div>
                <div>
                  <dt>Starting at</dt>
                  <dd>{s.from}</dd>
                </div>
              </dl>
              <Link href="/contact" className="btn btn-accent btn-sm">
                Ask about {s.title}
              </Link>
            </div>
            <div className="card service-includes">
              <h3>What’s included</h3>
              <ul className="ticks">
                {s.includes.map((x) => (
                  <li key={x}>
                    <Icon name="check" size={18} strokeWidth={2.2} className="check" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>

      <Process />
      <CtaBand title="Not sure which one you need?" text="Tell us your problem in plain words. We’ll suggest the simplest thing that solves it." email />
    </>
  );
}
