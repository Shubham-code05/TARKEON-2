import Link from "next/link";
import Logo from "./Logo";
import Icon from "./Icon";
import CopyEmail, { EmailText } from "./CopyEmail";
import { nav, services, site, CONTACT_MAILTO } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo />
          <p>Websites, AI chatbots and automation for growing businesses. Tark se tech tak.</p>
          <p>{site.city}</p>
        </div>
        <div>
          <h2 className="footer-title">Company</h2>
          <ul>
            {nav.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="footer-title">Services</h2>
          <ul>
            {services.map((s) => (
              <li key={s.id}>
                <Link href={`/services#${s.id}`}>{s.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-contact">
          <h2 className="footer-title">Contact</h2>
          <ul>
            <li>
              <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer">
                WhatsApp: {site.whatsappDisplay}
              </a>
            </li>
            <li className="email-row">
              <a href={CONTACT_MAILTO} className="email-link" aria-label="Send email to Tarkeon Technologies">
                <Icon name="mail" size={18} strokeWidth={1.8} />
                <EmailText />
              </a>
              <CopyEmail />
            </li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} Tarkeon. All rights reserved.</p>
      </div>
    </footer>
  );
}
