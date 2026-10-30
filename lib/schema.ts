import { site } from "@/content/site";
import type { Faq, Service } from "@/content/types";
import { absoluteUrl } from "@/lib/utils";

// schema.org JSON-LD builders. Each page renders the ones that apply through <JsonLd />.

const orgId = `${site.url}/#organization`;
const businessId = `${site.url}/#localbusiness`;

function postalAddress() {
  const a = site.address;
  return {
    "@type": "PostalAddress",
    ...(a.street ? { streetAddress: a.street } : {}),
    addressLocality: a.city,
    addressRegion: a.region,
    ...(a.postalCode ? { postalCode: a.postalCode } : {}),
    addressCountry: a.country,
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": orgId,
    name: site.name,
    url: site.url,
    logo: absoluteUrl("/logo.png"),
    email: site.email,
    description: site.description,
    address: postalAddress(),
    ...(site.foundedYear ? { foundingDate: String(site.foundedYear) } : {}),
    ...(site.socials.length ? { sameAs: site.socials.map((s) => s.href) } : {}),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: site.email,
      ...(site.phone ? { telephone: site.phone } : {}),
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": businessId,
    name: site.name,
    url: site.url,
    image: absoluteUrl("/opengraph-image"),
    email: site.email,
    ...(site.phone ? { telephone: site.phone } : {}),
    description: site.description,
    address: postalAddress(),
    areaServed: [
      { "@type": "City", name: "Lucknow" },
      { "@type": "Country", name: "India" },
    ],
    priceRange: "₹₹",
    parentOrganization: { "@id": orgId },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: site.url,
    inLanguage: "en-IN",
    publisher: { "@id": orgId },
  };
}

export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.title,
    description: service.seoDescription,
    url: absoluteUrl(`/services/${service.slug}`),
    provider: { "@id": businessId },
    areaServed: { "@type": "Country", name: "India" },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: service.startingPrice,
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "INR",
        minPrice: service.startingPrice,
      },
    },
  };
}

export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function articleSchema(post: {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  author: string;
}) {
  const url = absoluteUrl(`/blog/${post.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    mainEntityOfPage: url,
    url,
    image: absoluteUrl(`/blog/${post.slug}/opengraph-image`),
    inLanguage: "en-IN",
    author: { "@type": "Organization", name: post.author, url: site.url },
    publisher: { "@id": orgId },
  };
}
