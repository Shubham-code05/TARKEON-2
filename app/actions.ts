"use server";

import type { ZodError } from "zod";
import { calculateEstimate } from "@/lib/estimate";
import { clientIp } from "@/lib/rate-limit";
import {
  calculatorSchema,
  careersSchema,
  contactSchema,
  deliverLead,
  isRateLimited,
  type Lead,
} from "@/lib/leads";

export type LeadState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string>;
  /** First name, for the success message. */
  name?: string;
};

const MIN_FILL_MS = 2500;

function fieldErrors(error: ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}

function str(form: FormData, key: string): string | undefined {
  const v = form.get(key);
  return typeof v === "string" ? v : undefined;
}

/** One server action for all forms: contact, cost calculator and careers. */
export async function submitLead(_prev: LeadState, form: FormData): Promise<LeadState> {
  // Honeypot: real people never see or fill this field
  if (str(form, "company_website")) return { status: "success", name: "there" };

  // Bots submit instantly; people take a few seconds
  const startedAt = Number(str(form, "started_at"));
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_MS) {
    return { status: "error", message: "That was quick! Please check your details and try again." };
  }

  if (isRateLimited(await clientIp())) {
    return {
      status: "error",
      message: "Too many messages in a short time. Please wait a few minutes, or message us on WhatsApp.",
    };
  }

  const kind = str(form, "kind");
  let lead: Lead;

  if (kind === "calculator") {
    const parsed = calculatorSchema.safeParse({
      kind,
      name: str(form, "name"),
      phone: str(form, "phone"),
      email: str(form, "email"),
      type: str(form, "type"),
      pages: str(form, "pages"),
      addons: form.getAll("addons").filter((v): v is string => typeof v === "string"),
      carePlan: str(form, "carePlan") === "on",
      hosting: str(form, "hosting") === "on",
      message: str(form, "message"),
      consent: str(form, "consent"),
    });
    if (!parsed.success) return { status: "error", message: "Please fix the highlighted fields.", fieldErrors: fieldErrors(parsed.error) };
    const estimate = calculateEstimate(parsed.data);
    if (!estimate) return { status: "error", message: "Please choose a project type." };
    lead = { ...parsed.data, estimate };
  } else if (kind === "careers") {
    const parsed = careersSchema.safeParse({
      kind,
      name: str(form, "name"),
      email: str(form, "email"),
      phone: str(form, "phone") ?? "",
      role: str(form, "role"),
      skills: str(form, "skills"),
      portfolio: str(form, "portfolio"),
      message: str(form, "message"),
      consent: str(form, "consent"),
    });
    if (!parsed.success) return { status: "error", message: "Please fix the highlighted fields.", fieldErrors: fieldErrors(parsed.error) };
    lead = parsed.data;
  } else {
    const parsed = contactSchema.safeParse({
      kind: "contact",
      name: str(form, "name"),
      phone: str(form, "phone"),
      email: str(form, "email"),
      business: str(form, "business"),
      need: str(form, "need"),
      budget: str(form, "budget"),
      message: str(form, "message"),
      source: str(form, "source"),
      consent: str(form, "consent"),
    });
    if (!parsed.success) return { status: "error", message: "Please fix the highlighted fields.", fieldErrors: fieldErrors(parsed.error) };
    lead = parsed.data;
  }

  const delivered = await deliverLead(lead);
  if (!delivered) {
    return {
      status: "error",
      message: "Sorry, we couldn’t send your message right now. Please message us on WhatsApp instead.",
    };
  }
  return { status: "success", name: lead.name.split(" ")[0] };
}
