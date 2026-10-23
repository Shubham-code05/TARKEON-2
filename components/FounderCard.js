// About page ka founder card. Saari jaankari lib/site.js ke `founder` mein hai.
import Icon from "./Icon";
import Reveal from "./Reveal";
import Terminal from "./Terminal";
import { founder, site, CONTACT_MAILTO } from "@/lib/site";

export default function FounderCard() {
  const links = [
    { href: CONTACT_MAILTO, icon: "mail", label: "Send email to Tarkeon Technologies" },
    { href: `https://wa.me/${site.whatsapp}`, icon: "whatsapp", label: "Chat with Tarkeon Technologies on WhatsApp", external: true },
  ];

  return (
    <Reveal as="article" className="card founder-card" aria-labelledby="founder-heading">
      <div className="founder-id">
        <div className="founder-mark" role="img" aria-label="Tarkeon Technologies">
          <span className="founder-orbit" aria-hidden="true" />
          <span className="founder-monogram" aria-hidden="true">
            T
          </span>
        </div>
        <p className="pill founder-status">
          <span className="dot dot-green" aria-hidden="true" />
          Available for new projects
        </p>
        <div className="founder-who">
          <h2 id="founder-heading">{founder.heading}</h2>
          <p className="founder-title">{founder.title}</p>
        </div>
        <Terminal lines={founder.terminal} />
        <ul className="founder-links">
          {links.map((l) => (
            <li key={l.icon}>
              <a href={l.href} aria-label={l.label} {...(l.external ? { target: "_blank", rel: "noreferrer" } : {})}>
                <Icon name={l.icon} size={18} strokeWidth={1.8} />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="founder-story">
        <p className="eyebrow">Why Tarkeon</p>
        {founder.story.map((t) => (
          <p key={t.slice(0, 20)} className="founder-text">
            {t}
          </p>
        ))}

        <h3>What you can expect</h3>
        <ul className="ticks">
          {founder.expect.map((x) => (
            <li key={x}>
              <Icon name="check" size={18} strokeWidth={2.2} className="check" />
              {x}
            </li>
          ))}
        </ul>

        <h3>Built with</h3>
        <ul className="founder-stack">
          {founder.stack.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>

        <figure className="founder-quote">
          <blockquote>“{founder.quote}”</blockquote>
          <figcaption>— {founder.quoteBy}</figcaption>
        </figure>

        <a href={`https://wa.me/${site.whatsapp}`} className="btn btn-accent founder-cta" target="_blank" rel="noreferrer">
          Talk to me directly <Icon name="arrow" size={18} strokeWidth={2} />
        </a>
      </div>
    </Reveal>
  );
}
