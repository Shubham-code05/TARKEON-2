import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/sections/LegalPage";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "What personal data Tarkeon collects, why, who we share it with and how to access or delete it under India’s Digital Personal Data Protection Act, 2023.",
  path: "/privacy-policy",
});

export default function PrivacyPage() {
  const email = (
    <a href={`mailto:${site.email}`}>{site.email}</a>
  );
  return (
    <LegalPage
      title="Privacy Policy"
      path="/privacy-policy"
      intro={
        <p>
          This policy explains, in plain language, what personal data {site.name} collects through this website, why we
          collect it and how you can control it. We follow India’s Digital Personal Data Protection Act, 2023 (the “DPDP
          Act”) and the rules made under it.
        </p>
      }
    >
      <h2>1. Who we are</h2>
      <p>
        {site.name} is a web, AI and automation studio based in {site.address.city}, {site.address.region}, India. For your
        personal data collected on this website, we are the “Data Fiduciary” under the DPDP Act. You can reach us at {email}.
      </p>

      <h2>2. What data we collect</h2>
      <p>We only collect what we need. Depending on how you use the site, this can include:</p>
      <ul>
        <li>
          <strong>Contact form and cost calculator:</strong> your name, WhatsApp or phone number, email (optional), business
          name, what you need, rough budget, your message, the options you picked in the calculator and the page you sent it
          from.
        </li>
        <li>
          <strong>Careers form:</strong> your name, email, phone (optional), the role you are interested in, your skills,
          portfolio link and message.
        </li>
        <li>
          <strong>Conversations:</strong> messages you send us on WhatsApp or email.
        </li>
        <li>
          <strong>Technical data:</strong> your IP address (used briefly to block spam and repeated submissions), and
          anonymous usage and performance data such as pages visited, device type and page load speed.
        </li>
      </ul>
      <p>We do not ask for sensitive data such as bank details, Aadhaar numbers or health records through this website.</p>

      <h2>3. Why we use it</h2>
      <ul>
        <li>To reply to your enquiry, prepare a quote and talk to you about your project.</li>
        <li>To send you a confirmation email when you submit a form.</li>
        <li>To deliver services you hire us for, and to raise invoices and keep records the law requires.</li>
        <li>To consider your application if you write to us about freelance or internship work.</li>
        <li>To keep the website secure, prevent spam and understand which pages are useful so we can improve them.</li>
      </ul>
      <p>
        We process your data on the basis of your consent, which you give when you tick the consent box and submit a form,
        or for the specific purpose you voluntarily shared it for. We never sell your data and we do not use it for
        unrelated marketing.
      </p>

      <h2>4. Cookies and analytics</h2>
      <p>
        We use Vercel Analytics and Speed Insights to see anonymous, aggregated visit and performance data. These do not use
        cookies to track you across sites. If we turn on Google Analytics, it only loads after you click “Accept” on the
        cookie banner. If you decline, Google Analytics is not loaded. You can change your choice at any time by clearing
        this site’s data in your browser.
      </p>

      <h2>5. Who we share it with</h2>
      <p>We share data only with service providers that help us run the website and reply to you, and only as needed:</p>
      <ul>
        <li>
          <strong>Vercel</strong> (website hosting and anonymous analytics)
        </li>
        <li>
          <strong>Resend</strong> (sending form notifications and confirmation emails)
        </li>
        <li>
          <strong>Google</strong> (email, Google Sheets where enquiries are stored, and Google Analytics if you accept it)
        </li>
        <li>
          <strong>Meta / WhatsApp</strong> (if you message us on WhatsApp)
        </li>
      </ul>
      <p>
        Some of these providers may store data on servers outside India. We only use reputable providers and transfer data in
        line with the DPDP Act and any restrictions notified by the Government of India. We may also disclose data if the law
        requires it.
      </p>

      <h2>6. How long we keep it</h2>
      <ul>
        <li>Enquiries that do not become projects: deleted within 12 months of our last conversation.</li>
        <li>Careers applications: deleted within 12 months unless you ask us to keep them longer.</li>
        <li>Client and billing records: kept for as long as tax and accounting laws require.</li>
        <li>Anonymous analytics: kept in aggregated form that does not identify you.</li>
      </ul>

      <h2>7. Your rights</h2>
      <p>Under the DPDP Act, you have the right to:</p>
      <ul>
        <li>Get a summary of the personal data we hold about you and how we use it.</li>
        <li>Ask us to correct, complete or update your data.</li>
        <li>Ask us to erase your data, unless we must keep it by law.</li>
        <li>Withdraw your consent at any time. This does not affect anything we did before you withdrew it.</li>
        <li>Nominate another person to exercise these rights for you in case of death or incapacity.</li>
        <li>Have your complaints addressed through our grievance process.</li>
      </ul>

      <h2>8. How to get your data deleted</h2>
      <ol>
        <li>
          Email {email} with the subject “Delete my data”, or send the same message to us on WhatsApp at{" "}
          {site.whatsappDisplay}.
        </li>
        <li>Write from the email or phone number you used with us, or tell us which one it was, so we can find your records.</li>
        <li>We may ask a simple question to confirm it is really you.</li>
        <li>
          We will delete your data from our inbox, sheets and tools, confirm when it is done, and tell you if anything must be
          kept by law. We aim to complete requests within 7 working days.
        </li>
      </ol>

      <h2>9. Grievances</h2>
      <p>
        If you have a concern about how we handle your data, write to our grievance contact at {email}. We will acknowledge
        your complaint and try to resolve it promptly. If you are not satisfied with our response, you can approach the Data
        Protection Board of India.
      </p>

      <h2>10. Children</h2>
      <p>
        This website is meant for business owners and adults. We do not knowingly collect personal data from anyone under 18.
        If you believe a child has sent us their data, contact us and we will delete it.
      </p>

      <h2>11. Security</h2>
      <p>
        We use secure (HTTPS) connections, limit who can access enquiries, and choose providers with strong security
        practices. No system is perfectly secure, but if a personal data breach affects you, we will inform you and the
        authorities as the law requires.
      </p>

      <h2>12. Changes to this policy</h2>
      <p>
        If we change this policy, we will update the date at the top of this page. For important changes, we will make it
        clear on the website. See also our <Link href="/terms">terms</Link> and{" "}
        <Link href="/refund-policy">refund policy</Link>.
      </p>
    </LegalPage>
  );
}
