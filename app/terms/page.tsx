import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/sections/LegalPage";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service",
  description: "The terms for using the Tarkeon website and for projects we build: quotes, payments, ownership, support and liability.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      path="/terms"
      intro={
        <p>
          These terms cover your use of this website and the general terms for projects with {site.name}. Your written quote
          or agreement for a project can add to or change these terms; where they differ, the written quote wins.
        </p>
      }
    >
      <h2>1. Using this website</h2>
      <p>
        You may browse this website and share links to it. Please don’t copy our content or design for commercial use,
        attempt to break or overload the site, or submit false or harmful information through our forms. Prices and
        information on this website are a general guide and may change.
      </p>

      <h2>2. Quotes and scope</h2>
      <ul>
        <li>Every project starts with a written quote that lists the scope, timeline and price.</li>
        <li>Prices on the website are starting prices. Your written quote is the final price for the agreed scope.</li>
        <li>Work outside the agreed scope is quoted separately, and we only start it after you approve.</li>
        <li>Quotes are valid for 30 days unless stated otherwise.</li>
      </ul>

      <h2>3. Payments</h2>
      <ul>
        <li>Unless your quote says otherwise, you pay 50% to start and the remaining 50% after you approve the finished work, before it goes live.</li>
        <li>Prices are exclusive of GST. If GST applies, it is added to the invoice.</li>
        <li>
          Third-party costs such as domains, hosting, paid tools, WhatsApp messaging and AI usage are billed at actual cost
          or paid by you directly.
        </li>
        <li>Monthly care plans are billed in advance and can be cancelled with notice before the next billing date.</li>
      </ul>

      <h2>4. Your responsibilities</h2>
      <ul>
        <li>Provide content, logos, photos and access details on time, and make sure you have the right to use them.</li>
        <li>Give feedback within the agreed time. Delays in feedback can move the delivery date.</li>
        <li>Check that the content we publish for you (prices, claims, results, licences such as RERA) is accurate and lawful.</li>
      </ul>

      <h2>5. Timelines and revisions</h2>
      <p>
        We share a timeline in the quote and keep you updated every week. Two rounds of changes are included at each review
        stage unless the quote says otherwise. Timelines depend on receiving content and feedback on time.
      </p>

      <h2>6. Ownership</h2>
      <ul>
        <li>Once the project is fully paid, you own the final website or app, its design and its content.</li>
        <li>Domains and accounts are set up in your name wherever possible.</li>
        <li>
          Open-source libraries and third-party tools remain under their own licences. We may reuse our general know-how and
          non-confidential code patterns in other work.
        </li>
        <li>Unless you ask us not to, we may mention the project in our portfolio once it is public.</li>
      </ul>

      <h2>7. Support and warranty</h2>
      <p>
        We fix bugs in the work we delivered free of charge for 30 days after launch. A bug means something that does not
        work as agreed in the quote. New features, content changes and issues caused by third-party services or changes made
        by others are not covered, but we are happy to quote for them or cover them under a care plan.
      </p>

      <h2>8. AI features</h2>
      <p>
        AI chatbots and assistants can make mistakes. We limit them to your information, add safeguards and test them, but we
        cannot guarantee every answer is correct. You are responsible for reviewing the information the assistant uses and
        for decisions made based on its answers.
      </p>

      <h2>9. Confidentiality</h2>
      <p>
        We keep your business information confidential and use it only for your project. We handle personal data as described
        in our <Link href="/privacy-policy">privacy policy</Link>.
      </p>

      <h2>10. Liability</h2>
      <p>
        We do our best work, but we are not liable for indirect losses such as lost profits or business interruption. Our
        total liability for any project is limited to the amount you paid us for that project. Nothing in these terms limits
        liability that cannot be limited under Indian law.
      </p>

      <h2>11. Ending a project</h2>
      <p>
        Either side can end a project with written notice. You pay for work completed up to that point, and we hand over that
        work. Refunds follow our <Link href="/refund-policy">refund policy</Link>.
      </p>

      <h2>12. Governing law</h2>
      <p>
        These terms are governed by the laws of India. Any dispute will first be discussed in good faith. If it can’t be
        resolved, the courts in {site.address.city}, {site.address.region} will have jurisdiction.
      </p>

      <h2>13. Contact</h2>
      <p>
        Questions about these terms? Email <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalPage>
  );
}
