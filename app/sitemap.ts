import type { MetadataRoute } from "next";
import { industries } from "@/content/industries";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { legalLastUpdated } from "@/content/site";
import { getAllPosts } from "@/lib/blog";
import { absoluteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages: [string, number, MetadataRoute.Sitemap[number]["changeFrequency"]][] = [
    ["/", 1, "weekly"],
    ["/services", 0.9, "monthly"],
    ["/industries", 0.8, "monthly"],
    ["/pricing", 0.9, "monthly"],
    ["/work", 0.7, "weekly"],
    ["/process", 0.6, "monthly"],
    ["/about", 0.6, "monthly"],
    ["/blog", 0.7, "weekly"],
    ["/contact", 0.8, "yearly"],
    ["/careers", 0.3, "monthly"],
  ];
  const legal = ["/privacy-policy", "/terms", "/refund-policy"];

  return [
    ...staticPages.map(([path, priority, changeFrequency]) => ({ url: absoluteUrl(path), lastModified: now, changeFrequency, priority })),
    ...services.map((s) => ({ url: absoluteUrl(`/services/${s.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.9 })),
    ...industries.map((i) => ({ url: absoluteUrl(`/industries/${i.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...projects.map((p) => ({ url: absoluteUrl(`/work/${p.slug}`), lastModified: now, changeFrequency: "yearly" as const, priority: 0.6 })),
    ...getAllPosts().map((p) => ({
      url: absoluteUrl(`/blog/${p.slug}`),
      lastModified: new Date(p.updated ?? p.date),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    ...legal.map((path) => ({ url: absoluteUrl(path), lastModified: new Date(legalLastUpdated), changeFrequency: "yearly" as const, priority: 0.2 })),
  ];
}
