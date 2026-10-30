import "server-only";
import { z } from "zod";
import { createRateLimiter } from "@/lib/rate-limit";
import { site } from "@/content/site";
import { formatINR } from "@/lib/utils";
import type { Estimate } from "@/lib/estimate";

// ---------- Validation ----------

const phone = z
  .string()
  .trim()
  .refine((v) => {
    const digits = v.replace(/[\s()+-]/g, "");
    return /^\d{10,13}$/.test(digits);
  }, "Please enter a valid phone number, e.g. 98765 43210.");

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Please keep this under ${max} characters.`)
    .optional()
    .transform((v) => (v ? v : undefined));

const name = z.string().trim().min(2, "Please enter your name.").max(80, "Please use a shorter name.");
const optionalEmail = z
  .string()
  .trim()
  .max(120)
  .optional()
  .transform((v) => (v ? v : undefined))
  .pipe(z.string().email("Please enter a valid email address.").optional());

const consent = z.literal("on", { errorMap: () => ({ message: "Please agree so we can contact you." }) });

export const contactSchema = z.object({
  kind: z.literal("contact"),
  name,
  phone,
  email: optionalEmail,
  business: optionalText(120),
  need: optionalText(60),
  budget: optionalText(40),
  message: optionalText(2000),
  source: optionalText(200),
  consent,
});

export const calculatorSchema = z.object({
  kind: z.literal("calculator"),
  name,
  phone,
  email: optionalEmail,
  type: z.string().trim().max(40),
  pages: z.coerce.number().int().min(0).max(50).default(0),
  addons: z.array(z.string().max(40)).max(20).default([]),
  carePlan: z.boolean().default(false),
  hosting: z.boolean().default(false),
  message: optionalText(1000),
  consent,
});

export const careersSchema = z.object({
  kind: z.literal("careers"),
  name,
  email: z.string().trim().email("Please enter a valid email address.").max(120),
  phone: phone.optional().or(z.literal("").transform(() => undefined)),
  role: z.enum(["Freelancer", "Intern"], { errorMap: () => ({ message: "Please choose freelancer or intern." }) }),
  skills: z.string().trim().min(2, "Tell us your main skills.").max(300),
  portfolio: z
    .string()
    .trim()
    .max(300)
    .optional()
    .transform((v) => (v ? v : undefined))
    .pipe(z.string().url("Please enter a full link starting with https://").optional()),
  message: optionalText(2000),
  consent,
});

export type ContactLead = z.infer<typeof contactSchema>;
export type CalculatorLead = z.infer<typeof calculatorSchema> & { estimate: Estimate };
export type CareersLead = z.infer<typeof careersSchema>;
export type Lead = ContactLead | CalculatorLead | CareersLead;

// ---------- Spam protection ----------

/** 5 submissions per 10 minutes per IP. */
export const isRateLimited = createRateLimiter(5, 10 * 60 * 1000);

// ---------- Delivery ----------

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

const subjects: Record<Lead["kind"], string> = {
  contact: "New enquiry",
  calculator: "New cost calculator estimate",
  careers: "New careers application",
};

/** Human-readable rows for emails and the Google Sheet. */
export function leadRows(lead: Lead): [string, string][] {
  const rows: [string, string | undefined][] = [
    ["Type", subjects[lead.kind]],
    ["Name", lead.name],
    ["Phone", lead.phone],
    ["Email", lead.email],
  ];
  if (lead.kind === "contact") {
    rows.push(["Business", lead.business], ["Needs", lead.need], ["Budget", lead.budget], ["Message", lead.message], ["Page", lead.source]);
  } else if (lead.kind === "calculator") {
    const e = lead.estimate;
    rows.push(
      ["Project", e.typeLabel],
      ["Breakdown", e.lines.map((l) => `${l.label}: ${formatINR(l.amount)}`).join("\n")],
      ["Estimated one-time", formatINR(e.oneTime)],
      ["Care plan", e.monthly ? `${formatINR(e.monthly)}/month` : "No"],
      ["Domain and hosting estimate", e.hostingDomain ? `${formatINR(e.hostingDomain)} first year` : "No"],
      ["GST estimate", formatINR(e.gst)],
      ["First-year estimate", formatINR(e.total)],
      ["Message", lead.message],
    );
  } else {
    rows.push(["Role", lead.role], ["Skills", lead.skills], ["Portfolio", lead.portfolio], ["Message", lead.message]);
  }
  return rows.filter((r): r is [string, string] => Boolean(r[1]));
}

async function sendEmail(payload: { to: string[]; subject: string; html: string; text: string; replyTo?: string }) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.LEAD_FROM_EMAIL || "Tarkeon <onboarding@resend.dev>",
      to: payload.to,
      subject: payload.subject,
      html: payload.html,
      text: payload.text,
      ...(payload.replyTo ? { reply_to: payload.replyTo } : {}),
    }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Resend responded ${res.status}: ${await res.text()}`);
}

function ownerEmail(lead: Lead) {
  const rows = leadRows(lead);
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;color:#111">
      <h2 style="margin:0 0 16px">${escapeHtml(subjects[lead.kind])} from ${escapeHtml(lead.name)}</h2>
      <table cellpadding="8" style="border-collapse:collapse;width:100%">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="border-bottom:1px solid #eee;font-weight:bold;vertical-align:top;width:140px">${escapeHtml(k)}</td><td style="border-bottom:1px solid #eee;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`,
          )
          .join("")}
      </table>
    </div>`;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  return { html, text };
}

function clientEmail(lead: Lead) {
  const first = lead.name.split(" ")[0] ?? lead.name;
  const isCareers = lead.kind === "careers";
  const body = isCareers
    ? "Thanks for your interest in working with Tarkeon. We have received your details and will reply within 1 working day if there is a fit, or to let you know either way."
    : "Thanks for reaching out to Tarkeon. We have received your details and will reply within 1 working day.";
  const estimate =
    lead.kind === "calculator"
      ? `<p>Your rough first-year estimate: <strong>${escapeHtml(formatINR(lead.estimate.total))}</strong>. This is not a confirmed quotation. We will confirm a fixed quote in writing after a short call.</p>`
      : "";
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:560px;color:#111;line-height:1.6">
      <p>Hi ${escapeHtml(first)},</p>
      <p>${body}</p>
      ${estimate}
      <p>If it's urgent, message us on WhatsApp: <a href="https://wa.me/${site.whatsapp}">${escapeHtml(site.whatsappDisplay)}</a>.</p>
      <p>Thanks,<br/>Team Tarkeon<br/><a href="${site.url}">${site.url.replace(/^https?:\/\//, "")}</a></p>
    </div>`;
  const text = `Hi ${first},\n\n${body}\n\nWhatsApp: ${site.whatsappDisplay}\n\nTeam Tarkeon\n${site.url}`;
  return { html, text };
}

async function postToSheet(lead: Lead) {
  const res = await fetch(process.env.GOOGLE_SHEET_WEBHOOK_URL!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      receivedAt: new Date().toISOString(),
      kind: lead.kind,
      name: lead.name,
      phone: lead.phone ?? "",
      email: lead.email ?? "",
      details: leadRows(lead)
        .slice(4)
        .map(([k, v]) => `${k}: ${v}`)
        .join("\n"),
    }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Sheet webhook responded ${res.status}`);
}

/**
 * Sends the lead to every configured channel. Returns true if at least one
 * channel that reaches the owner (email or sheet) succeeded.
 */
export async function deliverLead(lead: Lead): Promise<boolean> {
  const hasEmail = Boolean(process.env.RESEND_API_KEY);
  const hasSheet = Boolean(process.env.GOOGLE_SHEET_WEBHOOK_URL);

  if (!hasEmail && !hasSheet) {
    if (process.env.NODE_ENV === "production") {
      console.error("[lead] No delivery channel configured. Set RESEND_API_KEY and/or GOOGLE_SHEET_WEBHOOK_URL.");
      return false;
    }
    console.info("[lead] Dev mode, not sent anywhere:\n" + leadRows(lead).map(([k, v]) => `  ${k}: ${v}`).join("\n"));
    return true;
  }

  const ownerJobs: Promise<unknown>[] = [];
  if (hasEmail) {
    const { html, text } = ownerEmail(lead);
    ownerJobs.push(
      sendEmail({
        to: [process.env.LEAD_TO_EMAIL || site.email],
        subject: `${subjects[lead.kind]}: ${lead.name}`,
        html,
        text,
        replyTo: lead.email,
      }),
    );
  }
  if (hasSheet) ownerJobs.push(postToSheet(lead));

  const results = await Promise.allSettled(ownerJobs);
  results.forEach((r) => r.status === "rejected" && console.error("[lead] Delivery failed:", r.reason));
  const delivered = results.some((r) => r.status === "fulfilled");

  // Confirmation to the visitor: only after we know the lead reached us
  if (delivered && hasEmail && lead.email) {
    const { html, text } = clientEmail(lead);
    await sendEmail({
      to: [lead.email],
      subject: lead.kind === "careers" ? "Thanks for applying to Tarkeon" : "Thanks, we'll reply within 1 working day",
      html,
      text,
      replyTo: process.env.LEAD_TO_EMAIL || site.email,
    }).catch((err) => console.error("[lead] Confirmation email failed:", err));
  }

  return delivered;
}
