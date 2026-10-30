import { calculatorAddons, calculatorTypes, carePlanMonthly, domainHostingYearly, gstRate } from "@/content/pricing";

export type EstimateInput = {
  type: string;
  pages: number;
  addons: string[];
  carePlan: boolean;
  /** Add the first-year domain and hosting estimate. */
  hosting?: boolean;
};

export type Estimate = {
  typeLabel: string;
  lines: { label: string; amount: number }[];
  /** Development cost. */
  oneTime: number;
  /** Care plan per month. */
  monthly: number;
  /** First-year domain and hosting, billed at actual cost. */
  hostingDomain: number;
  /** Twelve months of the care plan. */
  maintenanceYear: number;
  /** On Tarkeon's own charges; domain and hosting are passed on at cost. */
  gst: number;
  /** First-year estimate including everything above. */
  total: number;
};

/**
 * Pure price calculation shared by the calculator UI and the server action,
 * so the emailed estimate always matches what the visitor saw.
 */
export function calculateEstimate(input: EstimateInput): Estimate | null {
  const type = calculatorTypes.find((t) => t.id === input.type);
  if (!type) return null;

  const lines: Estimate["lines"] = [{ label: type.label, amount: type.base }];

  if (type.includedPages && type.perExtraPage) {
    const pages = Math.max(type.includedPages, Math.min(50, Math.round(input.pages) || type.includedPages));
    const extra = pages - type.includedPages;
    if (extra > 0) lines.push({ label: `${extra} extra page${extra > 1 ? "s" : ""}`, amount: extra * type.perExtraPage });
  }

  for (const id of new Set(input.addons)) {
    if (type.excludes?.includes(id)) continue;
    const addon = calculatorAddons.find((a) => a.id === id);
    if (addon) lines.push({ label: addon.label, amount: addon.price });
  }

  const oneTime = lines.reduce((sum, l) => sum + l.amount, 0);
  const monthly = input.carePlan ? carePlanMonthly : 0;
  const hostingDomain = input.hosting ? domainHostingYearly : 0;
  const maintenanceYear = monthly * 12;
  const gst = Math.round((oneTime + maintenanceYear) * gstRate);

  return {
    typeLabel: type.label,
    lines,
    oneTime,
    monthly,
    hostingDomain,
    maintenanceYear,
    gst,
    total: oneTime + hostingDomain + maintenanceYear + gst,
  };
}
