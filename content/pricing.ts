import type { Faq, Plan } from "./types";

// Prices badalni ho toh yahan. Cost calculator bhi isi file se chalta hai.

export const plans: Plan[] = [
  {
    name: "Starter website",
    price: 9999,
    description: "For businesses that need a professional, fast website.",
    features: ["Up to 5 pages", "Mobile-friendly and fast", "WhatsApp button and contact form", "Basic on-page SEO", "Ready in 1–2 weeks"],
    service: "websites",
  },
  {
    name: "Website + AI chatbot",
    price: 24999,
    description: "A website plus an assistant that answers customers 24×7.",
    features: [
      "Everything in Starter",
      "AI assistant trained on your business",
      "English, Hindi and Hinglish replies",
      "Leads sent to your email or sheet",
      "1 month of support included",
    ],
    popular: true,
    service: "ai-chatbots",
  },
  {
    name: "Custom web app",
    price: 39999,
    description: "A system for bookings, fees, orders or leads.",
    features: ["Login, dashboard and database", "Bookings, fees or orders module", "Admin panel for your team", "Weekly progress demos", "30 days of bug fixes"],
    service: "web-apps",
  },
  {
    name: "Care plan",
    price: 1499,
    suffix: "/month",
    description: "Optional. Keeps your site updated, backed up and secure.",
    features: ["Small updates and changes", "Backups and security updates", "Hosting and domain management", "Priority WhatsApp support"],
    service: "websites",
  },
];

// ---------- Cost calculator ----------
// TODO: ye saare numbers apne hisaab se confirm karo.

export type CalculatorType = {
  id: string;
  label: string;
  description: string;
  base: number;
  /** Pages included in the base price (only for page-based types). */
  includedPages?: number;
  perExtraPage?: number;
  /** Add-on ids that don't make sense for this type. */
  excludes?: string[];
  /** The service this belongs to; a service with several types shows a second choice. */
  service: string;
};

export const calculatorTypes: CalculatorType[] = [
  {
    id: "landing",
    label: "Landing page",
    description: "One focused page for ads or a launch",
    base: 5999,
    includedPages: 1,
    perExtraPage: 2500,
    service: "Website",
  },
  {
    id: "website",
    label: "Business website",
    description: "A complete site for your business",
    base: 9999,
    includedPages: 5,
    perExtraPage: 1500,
    service: "Website",
  },
  {
    id: "ecommerce",
    label: "E-commerce store",
    description: "Products, cart and online payments",
    base: 14999,
    excludes: ["payments"],
    service: "Website",
  },
  {
    id: "webapp",
    label: "Custom web app",
    description: "Bookings, fees, orders or a dashboard",
    base: 39999,
    service: "Web app",
  },
  {
    id: "chatbot",
    label: "AI chatbot only",
    description: "For a website you already have",
    base: 14999,
    excludes: ["chatbot"],
    service: "AI chatbot",
  },
  {
    id: "automation",
    label: "Automation only",
    description: "Leads, reminders and reports",
    base: 7999,
    excludes: ["automation"],
    service: "Automation",
  },
];

export type CalculatorAddon = { id: string; label: string; price: number; hint: string };

export const calculatorAddons: CalculatorAddon[] = [
  { id: "chatbot", label: "AI chatbot", price: 15000, hint: "Answers customers 24×7 in English and Hindi" },
  { id: "booking", label: "Online booking", price: 8000, hint: "Appointments, demo classes or tables" },
  { id: "payments", label: "Online payments", price: 5000, hint: "Razorpay or UPI with receipts" },
  { id: "hindi", label: "Hindi version", price: 4000, hint: "Full site in Hindi as well as English" },
  { id: "content", label: "Content writing", price: 3000, hint: "We write the text for every page" },
  { id: "seo", label: "Google Business Profile + SEO setup", price: 4999, hint: "Get found on Google Maps" },
  { id: "automation", label: "Lead automation", price: 6000, hint: "Leads to a sheet plus instant alerts" },
];

export const carePlanMonthly = 1499;

// TODO: ye dono confirm karo. Domain aur hosting asli kharch par bill hote hain, ye sirf andaza hai.
export const domainHostingYearly = 3000;
export const gstRate = 0.18;

// ---------- Payment terms ----------
export const paymentTerms = [
  {
    title: "Free call and demo",
    text: "The first consultation and a first-look demo of your homepage are free. No commitment.",
  },
  {
    title: "50% to start",
    text: "Once you approve the written quote and scope, you pay 50% and we start building.",
  },
  {
    title: "50% after approval",
    text: "You pay the remaining 50% only after you review and approve the finished work, before it goes live.",
  },
  {
    title: "Running costs at actual price",
    text: "Domain, paid hosting, WhatsApp messaging and AI usage are billed at what the provider charges, with no markup.",
  },
];

export const pricingFaqs: Faq[] = [
  {
    q: "Are these prices final?",
    a: "They are starting prices. After a free call we send a fixed quote in writing based on exactly what you need. The price on the quote is the price you pay unless you ask for more work.",
  },
  {
    q: "Is GST included?",
    a: "Prices shown are before GST. If GST applies, it is shown separately on the quote and invoice.",
  },
  {
    q: "What payment methods do you accept?",
    a: "UPI, bank transfer (NEFT/IMPS) and cards through a payment link.",
  },
  {
    q: "What if I want changes after approval?",
    a: "Small fixes after launch are free for 30 days. New features or major changes are quoted separately before we start them.",
  },
  {
    q: "Do I have to take the care plan?",
    a: "No. The care plan is optional. You own the website and can manage it yourself or with anyone else.",
  },
  {
    q: "Are there any hidden costs?",
    a: "No. The only extra costs are third-party ones such as your domain, paid hosting if needed, and WhatsApp or AI usage. We list them in the quote before you pay anything.",
  },
];
