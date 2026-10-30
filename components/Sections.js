// Ye sections alag alag pages pe dobara use hote hain.
import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import Icon from "./Icon";
import { services, projects, testimonial, plans, steps, comparison, CONTACT_MAILTO } from "@/lib/site";

export function Comparison() {
  return (
    <div className="compare-wrap">
      <table className="compare">
        <caption className="sr-only">Tarkeon compared with a typical agency and a cheap freelancer</caption>
        <thead>
          <tr>
            <td />
            {comparison.columns.map((c, i) => (
              <th key={c} scope="col" className={i === 0 ? "compare-us" : undefined}>
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {comparison.rows.map((r) => (
            <tr key={r.label}>
              <th scope="row">{r.label}</th>
              {r.values.map((v, i) => (
                <td key={i} className={i === 0 ? "compare-us" : undefined}>
                  {i === 0 && <Icon name="check" size={16} strokeWidth={2.4} className="check" />}
                  {v}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Eyebrow({ children, light }) {
  return <p className={`eyebrow ${light ? "eyebrow-light" : ""}`}>{children}</p>;
}

export function PageHero({ eyebrow, title, text, children }) {
  return (
    <section className="page-hero">
      <div className="container">
        <div className="page-hero-inner">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1>{title}</h1>
          {text && <p className="lead">{text}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}

export function ServicesGrid({ linked }) {
  return (
    <div className="grid grid-4">
      {services.map((s) => (
        <article key={s.id} className="card card-soft">
          <Icon name={s.icon} size={40} strokeWidth={1.6} />
          <h3>{s.title}</h3>
          <p>{s.text}</p>
          {linked && (
            <Link href={`/services#${s.id}`} className="text-link card-link">
              Learn more →
            </Link>
          )}
        </article>
      ))}
    </div>
  );
}

// Screenshot public/ folder mein sach mein hai ya nahi (build ke time check hota hai)
function hasImage(src) {
  return Boolean(src) && fs.existsSync(path.join(process.cwd(), "public", src));
}

export function WorkGrid({ limit }) {
  const list = limit ? projects.slice(0, limit) : projects;
  return (
    <div className="grid grid-3">
      {list.map((p, i) => (
        <article key={i} className="card project">
          <div className="project-img" style={{ background: p.tint }}>
            {hasImage(p.image) ? <img src={p.image} alt={`Homepage of ${p.name}`} /> : <span>[Project screenshot]</span>}
          </div>
          <div className="project-body">
            <p className="project-tag">{p.tag}</p>
            <h3>{p.name}</h3>
            <p className="project-summary">{p.summary}</p>
            <h4 className="project-built">What we built</h4>
            <ul className="ticks project-ticks">
              {p.built.map((x) => (
                <li key={x}>
                  <Icon name="check" size={18} strokeWidth={2.2} className="check" />
                  {x}
                </li>
              ))}
            </ul>
            <a href={p.link} className="text-link" target="_blank" rel="noreferrer">
              Visit live site →
            </a>
            {p.credit && <p className="project-credit">{p.credit}</p>}
          </div>
        </article>
      ))}
    </div>
  );
}

export function Testimonial() {
  if (!testimonial) return null;
  return (
    <figure className="card testimonial">
      <blockquote>“{testimonial.quote}”</blockquote>
      <figcaption>
        {testimonial.name}, {testimonial.business}
      </figcaption>
    </figure>
  );
}

export function PricingGrid() {
  return (
    <div className="grid grid-4">
      {plans.map((p) => (
        <article key={p.name} className={`card plan ${p.popular ? "plan-popular" : ""} ${p.muted ? "card-soft" : ""}`}>
          {p.popular && <p className="badge">Most popular</p>}
          <h3>{p.name}</h3>
          <p className="price">
            from <strong>{p.price}</strong>
            {p.suffix}
          </p>
          <ul>
            {p.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

export function Process() {
  return (
    <section className="band-dark">
      <div className="container section">
        <div className="section-head">
          <Eyebrow light>How we work</Eyebrow>
          <h2>Simple process. No surprises.</h2>
        </div>
        <ol className="grid grid-4 steps">
          {steps.map((s, i) => (
            <li key={s.title}>
              <p className="step-num">{String(i + 1).padStart(2, "0")}</p>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function CtaBand({ title = "Have a project in mind?", text = "Tell us about your business. The first call is free, and you get honest advice either way.", email }) {
  const consult = (
    <Link href="/contact" className="btn btn-white">
      Get a free consultation <Icon name="arrow" size={18} strokeWidth={2} />
    </Link>
  );
  return (
    <section className="container cta-wrap">
      <div className="cta">
        <div className="cta-text">
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        {email ? (
          <div className="btn-row">
            {consult}
            <a href={CONTACT_MAILTO} className="btn btn-outline-white" aria-label="Send email to Tarkeon Technologies">
              <Icon name="mail" size={18} strokeWidth={2} /> Email us
            </a>
          </div>
        ) : (
          consult
        )}
      </div>
    </section>
  );
}
