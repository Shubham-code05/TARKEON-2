import type { IconName } from "@/components/Icon";

export type Faq = { q: string; a: string };

export type Step = { title: string; text: string; duration?: string };

export type Service = {
  slug: string;
  title: string;
  /** Short name for menus and chips. */
  shortTitle: string;
  icon: IconName;
  /** One line for cards and menus. */
  summary: string;
  /** Three short outcomes for the service cards. */
  benefits: string[];
  /** SEO title and description for the detail page. */
  seoTitle: string;
  seoDescription: string;
  headline: string;
  intro: string;
  problems: { title: string; text: string }[];
  deliverables: string[];
  process: Step[];
  stack: string[];
  /** Starting price in rupees. */
  startingPrice: number;
  priceSuffix?: string;
  priceNote: string;
  timeline: string;
  faqs: Faq[];
  /** Industry slugs this service is most useful for. */
  industries: string[];
  /** Blog post slugs worth reading next. */
  posts: string[];
};

export type Industry = {
  slug: string;
  name: string;
  icon: IconName;
  summary: string;
  seoTitle: string;
  seoDescription: string;
  headline: string;
  intro: string;
  /** "solution" is shown when the visitor reveals the card in "Sound familiar?" on the homepage. */
  problems: { title: string; text: string; solution?: string }[];
  solutions: { title: string; text: string; service: string }[];
  faqs: Faq[];
  /** Homepage personalisation */
  home: {
    /** Value in the URL, e.g. ?for=clinic */
    key: string;
    /** Short label on the hero pill */
    label: string;
    headline: string;
    /** Words in the headline painted with the brand gradient */
    highlight: string[];
    subheadline: string;
    /** Questions and answers for the chatbot demo */
    chat: { id: string; q: string; a: string }[];
    /** Opening line of the chatbot demo */
    chatGreeting: string;
    /** Typical package, priced with the cost calculator */
    package: { label: string; type: string; pages?: number; addons: string[] };
  };
  /** Service slugs that fit this industry. */
  services: string[];
  posts: string[];
};

export type ProjectShot = { src: string; width: number; height: number };
export type ProjectMockup = { desktop: ProjectShot; mobile: ProjectShot };

export type Project = {
  slug: string;
  name: string;
  client: string;
  /** Industry slug, used for filtering. */
  industry: string;
  /** Shown on cards, e.g. "Food · Handcrafted confectionery brand". */
  tag?: string;
  /** Service slugs. */
  services: string[];
  year?: number;
  summary: string;
  problem?: string;
  built?: string;
  features: string[];
  stack?: string[];
  /** Added from content/project-images.json, which `npm run capture` writes. */
  mockup?: ProjectMockup;
  screenshots?: { src: string; alt: string; width: number; height: number; caption?: string }[];
  liveUrl?: string;
  /** Only fill this with a real, measured result. Leave it out otherwise and the section stays hidden. */
  results?: { label: string; value: string }[];
  /** Shown on project cards, e.g. "Design by Studio X" or "Built with the client's in-house team". */
  credit?: string;
  /** Show this project large on the homepage. */
  featured?: boolean;
  /** Old vs new screenshots for the homepage slider. Same pixel size for both. */
  beforeAfter?: {
    before: { src: string; alt: string };
    after: { src: string; alt: string };
    width: number;
    height: number;
  };
};

export type Testimonial = {
  quote: string;
  name: string;
  role?: string;
  business: string;
  /** Project slug, if the review is about a case study on this site. */
  project?: string;
};

export type Plan = {
  name: string;
  price: number;
  suffix?: string;
  description: string;
  features: string[];
  popular?: boolean;
  service: string;
};
