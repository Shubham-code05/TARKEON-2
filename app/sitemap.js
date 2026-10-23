import { site } from "@/lib/site";

const pages = ["", "/services", "/industries", "/work", "/pricing", "/about", "/contact"];

export default function sitemap() {
  return pages.map((p) => ({
    url: `${site.url}${p}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: p === "" ? 1 : 0.8,
  }));
}
