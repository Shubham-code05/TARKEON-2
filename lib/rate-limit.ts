import "server-only";
import { headers } from "next/headers";

/**
 * Small in-memory rate limiter: `max` hits per `windowMs` per key.
 * Per server instance only, which is enough to stop casual abuse.
 */
export function createRateLimiter(max: number, windowMs: number) {
  const hits = new Map<string, number[]>();
  return function isLimited(key: string): boolean {
    const now = Date.now();
    const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
    recent.push(now);
    hits.set(key, recent);
    if (hits.size > 5000) {
      // Keep memory bounded on long-running servers
      for (const [k, times] of hits) if (times.every((t) => now - t >= windowMs)) hits.delete(k);
    }
    return recent.length > max;
  };
}

/** Best-effort visitor IP from proxy headers (Vercel sets x-forwarded-for). */
export async function clientIp(): Promise<string> {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
}
