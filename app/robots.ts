import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  // Keep preview deployments out of search results; only production is indexed
  const isProduction = !process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production";
  return {
    // /api holds the website-check endpoint: nothing there for search engines
    rules: isProduction ? { userAgent: "*", allow: "/", disallow: "/api/" } : { userAgent: "*", disallow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
