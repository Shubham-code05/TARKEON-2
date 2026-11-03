import images from "./project-images.json";
import type { Project, ProjectMockup } from "./types";

// Asli projects yahan daalo. Jab tak ye array khaali hai, /work pe "coming soon" dikhega
// aur baaki pages pe "related projects" section chhupa rahega.
//
// Screenshots: project ka liveUrl daalo aur `npm run capture` chalao. Script desktop aur mobile
// screenshot public/images/work/ mein save karti hai, aur mockup har jagah apne aap dikhne lagta hai.
// "problem", "built", "stack", "year" aur "results" sirf tab bharo jab asli jaankari ho.
// Khaali rahe toh woh section nahi dikhega.
//
// Example (copy karke bharo):
// {
//   slug: "sharma-classes",
//   name: "Admissions website for Sharma Classes",
//   client: "Sharma Classes",
//   industry: "coaching",
//   services: ["websites", "ai-chatbots"],
//   year: 2026,
//   summary: "Ek line mein kya banaya.",
//   problem: "Client ko kya dikkat thi.",
//   built: "Humne kya banaya, 2-3 line.",
//   features: ["Online enquiry form", "Batch timings page", "Hindi chatbot"],
//   stack: ["Next.js", "Tailwind CSS", "Vercel"],
//   liveUrl: "https://sharmaclasses.in",
//   results: [{ label: "Enquiries in first month", value: "48" }],
// },

const credit = "Built by our founder while at HiBrands";
const founderCredit = "Built by Tarkeon's founder";

/**
 * Project categories that are not one of the industries in content/industries.ts (those have their
 * own pages). Used as extra filters on /work and as the "Industry" label on case studies.
 */
export const workCategories: { id: string; label: string; name: string }[] = [
  { id: "services", label: "Services", name: "Services" },
  { id: "organisation", label: "Organisations", name: "Organisation" },
];

const list: Project[] = [
  {
    slug: "miracle-home",
    name: "Miracle Homes Phase II",
    client: "Maxmiracle Buildcare LLP",
    industry: "real-estate",
    tag: "Real estate · Residential project, Lucknow",
    services: ["websites"],
    summary:
      "Lead-generation website for a RERA-approved 3 BHK gated housing project near Ayodhya Road, Lucknow, by Maxmiracle Buildcare LLP.",
    features: [
      "Overview, amenities, gallery and location pages",
      "Callback and brochure-download forms",
      "WhatsApp, call and Google Maps directions",
    ],
    stack: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://www.maxmiraclebuildcare.com/",
    credit,
    featured: true,
  },
  {
    slug: "inonego",
    name: "INONEGO",
    client: "INONEGO",
    industry: "services",
    tag: "Marketing · YouTube promotion agency, India",
    services: ["landing-pages"],
    summary:
      "Landing page for an independent YouTube promotion agency that runs official Google Ads campaigns for creators, brands and businesses.",
    features: [
      "Tiered pricing for view-based and subscriber-based plans",
      "Quote, free consultation and contact forms with service selection",
      "Online payment links, WhatsApp and call buttons",
      "Six-step 'How it works', FAQ and a clear no-fake-views disclaimer",
    ],
    // Checked from the live site: Tailwind and Alpine.js CDN scripts, PayU payment links,
    // a Google Apps Script form endpoint, a GTM container and Vercel response headers
    stack: ["HTML", "Tailwind CSS", "Alpine.js", "PayU", "Google Apps Script", "Google Tag Manager", "Vercel"],
    liveUrl: "https://inonego-landing-page.vercel.app/",
    credit: founderCredit,
  },
  {
    slug: "paramount-psychiatry",
    name: "Paramount Psychiatry",
    client: "Paramount Psychiatry",
    industry: "clinics",
    tag: "Healthcare · Psychiatry practice, New Jersey (USA)",
    services: ["websites"],
    summary:
      "Website for a psychiatric practice in Manalapan, NJ, led by Dr. Pooja Tandon, MD, presenting compassionate, evidence-based psychiatric care.",
    features: [
      "Professional website for a US medical practice",
      "Clear presentation of the doctor and services",
      "Mobile-friendly, fast-loading pages",
    ],
    stack: ["React", "Vite", "Tailwind CSS"],
    liveUrl: "https://paramountpsychiatrynj.com/",
    credit,
  },
  {
    slug: "dumuzi",
    name: "Dumuzi",
    client: "Dumuzi",
    industry: "local-shops",
    tag: "Food · Handcrafted confectionery brand",
    services: ["websites"],
    summary:
      "Brand website for an artisanal confectionery label selling dark truffles, signature collections and customisable premium gift boxes.",
    features: ["Premium brand website", "Product and collection showcase", "Gift box presentation"],
    stack: ["React", "Vite", "Tailwind CSS"],
    liveUrl: "https://www.dumuzi.in/",
    credit,
  },
  {
    slug: "abs-news",
    name: "ABS News",
    client: "ABS News",
    industry: "media",
    tag: "Media · Hindi news portal, Uttar Pradesh",
    services: ["websites"],
    summary: "Hindi news portal covering Lucknow, Kanpur, Varanasi, Gorakhpur, Bihar, national and international news.",
    features: [
      "Category-wise news sections and search",
      "Breaking news and trending sections",
      "Banner ads and sponsored content slots",
    ],
    stack: ["WordPress", "Elementor", "Bootstrap"],
    liveUrl: "https://absnews.in/",
    credit,
  },
  {
    slug: "rhrp",
    name: "Rashtriya Hindu Raksha Parishad (RHRP)",
    client: "Rashtriya Hindu Raksha Parishad",
    industry: "organisation",
    tag: "Organisation · Registered non-profit, Lucknow",
    services: ["websites", "web-apps"],
    summary:
      "Bilingual website for a registered organisation based in Lucknow, with online membership, digital ID cards, news, events and donations.",
    features: [
      "Hindi and English toggle",
      "Online membership with a QR-code digital ID card sent on WhatsApp or email",
      "Donation page, news, circulars, gallery and leadership directory",
      "Privacy, terms and refund policy pages",
    ],
    // Checked from the live site: Next.js (X-Powered-By header, app router chunks), Tailwind CSS v3
    // banner in the stylesheet, images served from Cloudinary, Vercel response headers
    stack: ["Next.js", "React", "Tailwind CSS", "Cloudinary", "Vercel"],
    liveUrl: "https://rhrp.in/",
    credit: founderCredit,
  },
];

function mockupFor(slug: string): ProjectMockup | undefined {
  const size = (images as Record<string, Record<"desktop" | "mobile", { width: number; height: number }>>)[slug];
  if (!size) return undefined;
  return {
    desktop: { src: `/images/work/${slug}-desktop.webp`, ...size.desktop },
    mobile: { src: `/images/work/${slug}-mobile.webp`, ...size.mobile },
  };
}

export const projects: Project[] = list.map((p) => ({ ...p, mockup: mockupFor(p.slug) }));

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function projectsForService(service: string): Project[] {
  return projects.filter((p) => p.services.includes(service));
}

export function projectsForIndustry(industry: string): Project[] {
  return projects.filter((p) => p.industry === industry);
}
