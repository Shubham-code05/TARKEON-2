import { site } from "@/content/site";

/** Join class names, skipping falsy values. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

/** 9999 -> "₹9,999" */
export function formatINR(amount: number): string {
  return inr.format(amount);
}

/** wa.me link with an optional pre-filled message. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Absolute URL for a site path, e.g. "/services" -> "https://www.tarkeon.in/services". */
export function absoluteUrl(path = "/"): string {
  return new URL(path, site.url).toString();
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
}
