import ContactForm from "@/components/ContactForm";
import Icon from "@/components/Icon";
import CopyEmail, { EmailText } from "@/components/CopyEmail";
import { site, CONTACT_MAILTO } from "@/lib/site";

export const metadata = {
  title: "Contact — Book a Free Consultation | Tarkeon",
  description: "Tell Tarkeon about your business on WhatsApp or email. We reply within one working day.",
};

export default function ContactPage() {
  return (
    <section className="container contact-page">
      <div className="contact">
        <div className="contact-text">
          <p className="eyebrow eyebrow-on-accent">Contact</p>
          <h1>Book your free consultation.</h1>
          <p>
            Tell us a little about your business. We reply within one working day with honest advice — even if it’s “you
            don’t need us yet”.
          </p>
          <a href={`https://wa.me/${site.whatsapp}`} className="contact-link" target="_blank" rel="noreferrer">
            <Icon name="whatsapp" size={20} strokeWidth={1.8} /> WhatsApp: {site.whatsappDisplay}
          </a>
          <div className="email-row">
            <a href={CONTACT_MAILTO} className="contact-link email-link" aria-label="Send email to Tarkeon Technologies">
              <Icon name="mail" size={20} strokeWidth={1.8} />
              <EmailText />
            </a>
            <CopyEmail light />
          </div>
          <ul className="contact-steps">
            <li>
              <strong>1.</strong> You send a message
            </li>
            <li>
              <strong>2.</strong> We call you within 1 working day
            </li>
            <li>
              <strong>3.</strong> You get a free demo and a fixed quote
            </li>
          </ul>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
