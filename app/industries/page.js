import Link from "next/link";
import Icon from "@/components/Icon";
import { PageHero, CtaBand } from "@/components/Sections";
import { industries } from "@/lib/site";

export const metadata = {
  title: "Industries — Coaching, Clinics, Restaurants, Shops | Tarkeon",
  description: "Websites, booking systems and AI chatbots built for coaching institutes, clinics, restaurants and local shops.",
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Built for how your business actually runs."
        text="A coaching institute and a restaurant need very different things. Pick your business to see what we build for it."
      >
        <nav className="jump" aria-label="Jump to an industry">
          {industries.map((x) => (
            <a key={x.id} href={`#${x.id}`} className="chip">
              {x.name}
            </a>
          ))}
        </nav>
      </PageHero>

      <div className="container section industry-list">
        {industries.map((x) => (
          <section key={x.id} id={x.id} className="industry">
            <div className="industry-head">
              <h2>{x.name}</h2>
              <p className="lead-sm">{x.pitch}</p>
            </div>
            <div className="industry-cols">
              <div className="card card-soft">
                <h3>Sound familiar?</h3>
                <ul className="pains">
                  {x.problems.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
              <div className="card">
                <h3>What we build for you</h3>
                <ul className="ticks">
                  {x.solutions.map((s) => (
                    <li key={s}>
                      <Icon name="check" size={18} strokeWidth={2.2} className="check" />
                      {s}
                    </li>
                  ))}
                </ul>
                <p className="industry-from">
                  Typical package: <strong>{x.from}</strong>
                </p>
                <Link href="/pricing#estimator" className="text-link">
                  Calculate your exact estimate →
                </Link>
              </div>
            </div>
          </section>
        ))}
      </div>

      <CtaBand title="Don’t see your business here?" text="We work with any business that wants more customers and less manual work. Tell us about yours." />
    </>
  );
}
