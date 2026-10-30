import type { Metadata } from "next";
import { site } from "@/content/site";

type PageMetaInput = {
  /** Page title without the brand; the root layout adds "| Tarkeon". */
  title: string;
  description: string;
  /** Site path, e.g. "/services/websites". Used for the canonical URL. */
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  /** Set true for pages that should stay out of search results. */
  noIndex?: boolean;
};

/**
 * Unique title, description, canonical, Open Graph and Twitter card for a page.
 * The OG image itself comes from the opengraph-image file in each route folder.
 */
export function pageMetadata({ title, description, path, type = "website", publishedTime, modifiedTime, noIndex }: PageMetaInput): Metadata {
  const fullTitle = `${title} | ${site.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: site.name,
      locale: "en_IN",
      type,
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}
