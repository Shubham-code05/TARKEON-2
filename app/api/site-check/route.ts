import { NextResponse } from "next/server";
import { z } from "zod";
import { clientIp, createRateLimiter } from "@/lib/rate-limit";
import { normaliseUrl, summarise, type PsiResponse, type SiteCheckResult } from "@/lib/site-check";

// PageSpeed tests take 15–40 seconds
export const maxDuration = 60;
export const dynamic = "force-dynamic";

const PSI_ENDPOINT = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";
const isLimited = createRateLimiter(4, 10 * 60 * 1000); // 4 checks per 10 minutes per IP
const cache = new Map<string, { at: number; result: SiteCheckResult }>();
const CACHE_MS = 30 * 60 * 1000;

const body = z.object({ url: z.string().max(300) });

function fail(status: number, message: string) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(request: Request) {
  const parsed = body.safeParse(await request.json().catch(() => null));
  const url = parsed.success ? normaliseUrl(parsed.data.url) : null;
  if (!url) return fail(400, "That doesn’t look like a website address. Try something like yourbusiness.com");

  const cached = cache.get(url);
  if (cached && Date.now() - cached.at < CACHE_MS) return NextResponse.json(cached.result);

  if (isLimited(await clientIp())) {
    return fail(429, "You’ve run a few checks already. Please try again in about 10 minutes, or message us on WhatsApp.");
  }

  const params = new URLSearchParams({ url, strategy: "mobile" });
  for (const c of ["performance", "seo", "accessibility", "best-practices"]) params.append("category", c);
  if (process.env.PAGESPEED_API_KEY) params.set("key", process.env.PAGESPEED_API_KEY);

  let data: PsiResponse;
  try {
    const res = await fetch(`${PSI_ENDPOINT}?${params}`, { signal: AbortSignal.timeout(55_000), cache: "no-store" });
    data = (await res.json()) as PsiResponse;
    if (!res.ok || data.error || !data.lighthouseResult) {
      const msg = data.error?.message ?? "";
      console.error("[site-check] PageSpeed error", res.status, msg.slice(0, 300));
      if (res.status === 429) {
        return /per day/i.test(msg)
          ? fail(503, "The free check has reached today’s limit. Please try again tomorrow, or send us your link on WhatsApp.")
          : fail(503, "Google’s test is busy right now. Please try again in a minute.");
      }
      if (/FAILED_DOCUMENT_REQUEST|ERRORED_DOCUMENT_REQUEST|DNS|NO_FCP|unreachable|Unable to process/i.test(msg)) {
        return fail(422, "We couldn’t open that website. Check the address is right and the site is online.");
      }
      return fail(502, "The test didn’t finish. Please try again in a minute.");
    }
  } catch (err) {
    console.error("[site-check] request failed", err);
    const timedOut = err instanceof Error && (err.name === "TimeoutError" || err.name === "AbortError");
    return fail(504, timedOut ? "The website took too long to respond to the test." : "The test didn’t finish. Please try again.");
  }

  const result = summarise(data, url);
  cache.set(url, { at: Date.now(), result });
  if (cache.size > 500) cache.delete(cache.keys().next().value!);
  return NextResponse.json(result);
}
