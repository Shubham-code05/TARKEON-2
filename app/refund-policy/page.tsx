import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/sections/LegalPage";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Refund Policy",
  description: "When and how Tarkeon refunds payments: advances, cancelled projects, care plans and third-party costs.",
  path: "/refund-policy",
});

export default function RefundPage() {
  return (
    <LegalPage
      title="Refund Policy"
      path="/refund-policy"
      intro={
        <p>
          We keep payments low-risk on purpose: you see a free demo before committing, pay 50% to start and pay the rest only
          after you approve the finished work. This page explains what happens if things don’t go to plan.
        </p>
      }
    >
      <h2>1. Before work starts</h2>
      <p>
        If you cancel after paying the advance but before we start work on your project, we refund the full advance, minus
        any payment gateway charges and third-party costs already paid on your behalf (such as a domain).
      </p>

      <h2>2. After work has started</h2>
      <p>
        If you cancel after work has started, we refund the part of the advance that covers work not yet done, based on the
        stages in your quote. We hand over everything completed up to that point.
      </p>

      <h2>3. If we can’t deliver</h2>
      <p>
        If we are unable to deliver what was agreed in the written quote, and we can’t fix it within a reasonable time after
        you tell us, we refund the amount for the undelivered part.
      </p>

      <h2>4. After approval</h2>
      <p>
        The final 50% is paid only after you review and approve the work, so payments for approved and delivered work are not
        refundable. Bugs found after launch are fixed free for 30 days, as described in our{" "}
        <Link href="/terms">terms</Link>.
      </p>

      <h2>5. Care plans</h2>
      <p>
        Care plans are monthly and can be cancelled at any time before the next billing date. We don’t refund the current
        month once it has started.
      </p>

      <h2>6. Third-party costs</h2>
      <p>
        Domains, hosting, paid tools, WhatsApp messaging and AI usage are paid to other companies. These are not refundable by
        us, though we will help you cancel or transfer them.
      </p>

      <h2>7. How to request a refund</h2>
      <ol>
        <li>
          Email <a href={`mailto:${site.email}`}>{site.email}</a> with the subject “Refund request” and your project name.
        </li>
        <li>We will reply within 2 working days to confirm the amount based on this policy and your quote.</li>
        <li>Approved refunds are sent to the original payment method or bank account within 7–10 working days.</li>
      </ol>
    </LegalPage>
  );
}
