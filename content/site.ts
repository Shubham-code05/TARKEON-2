// Tarkeon ki basic details. Number, email, hours ya founder badalne ho toh sirf ye file edit karo.

export const site = {
  name: "Tarkeon",
  tagline: "Web, AI and Automation",
  // Brand line. "Tark" (तर्क) = logic: think it through, then build it.
  motto: "Tark se tech tak",
  // Free homepage demo promise, used in CTAs and the process
  demoPromise: "48 hours",
  description:
    "Tarkeon is a web, AI and automation studio in Lucknow building fast websites, web apps, online stores and AI chatbots for businesses across India.",
  // tarkeon.in redirects to www, so www is the canonical address
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.tarkeon.in").replace(/\/$/, ""),
  email: "tarkeontechnologies@gmail.com",
  // WhatsApp number: country code ke saath, bina + aur space ke. Jaise: 919876543210
  whatsapp: "918808804843",
  whatsappDisplay: "+91 88088 04843",
  // Phone number dikhana ho toh "+91 98765 43210" jaisa likho, warna null
  phone: "+91 88088 04843" as string | null,
  address: {
    // Office ka pura pata ho toh street bharo, warna null (sirf shehar dikhega)
    street: null as string | null,
    city: "Lucknow",
    region: "Uttar Pradesh",
    postalCode: null as string | null,
    country: "IN",
    countryName: "India",
  },
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Lucknow%2C+Uttar+Pradesh",
  // TODO: apne asli office hours confirm karo
  hours: [
    { days: "Monday to Saturday", time: "10:00 am – 7:00 pm IST" },
    { days: "Sunday", time: "Closed (WhatsApp messages answered on Monday)" },
  ],
  replyTime: "1 working day",
  // Social profiles: { label: "LinkedIn", href: "https://..." }. Khaali rahe toh footer mein nahi dikhega.
  socials: [] as { label: string; href: string }[],
  // Founding year pata ho toh number daalo (jaise 2025), warna null
  foundedYear: null as number | null,
};

// Founder card /about pe. Naam jaan-boojhkar nahi hai: founder ka naam site pe kahin nahi dikhana.
// Photo: public/images/about/founder.jpg daalo, /about aur /contact pe apne aap dikhegi.
export type Founder = {
  heading: string;
  role: string;
  bio: string[];
  expect: string[];
  quote: string;
};
export const founder: Founder = {
  heading: "The builder behind Tarkeon",
  role: "Founder & Lead Developer",
  bio: [
    "I’m a Computer Science engineer and full stack developer. Over the last two years I’ve built websites, web apps and AI chatbots for brands, foundations and universities.",
    "I started Tarkeon because small businesses deserve the same quality of software big companies get, without agency layers, hidden costs or vague timelines. When you work with Tarkeon, you talk directly to the person who builds your product.",
  ],
  expect: [
    "Direct WhatsApp access to me, not an account manager",
    "Fixed quote and written timeline before we start",
    "Weekly progress updates with a live preview link",
    "Support after launch",
  ],
  quote: "If I wouldn’t put my name on it, I won’t ship it.",
};

export const about = {
  // TODO: naam ka matlab apne shabdon mein confirm karo
  nameMeaning: {
    title: "What “Tarkeon” means",
    text: "Tarkeon joins two ideas. “Tark” (तर्क) is the Hindi and Sanskrit word for logic and reasoning: thinking a problem through before building anything. “Eon” means a long age. Together they stand for what we want to make: software built on clear thinking, that keeps working for years.",
  },
  story: [
    "Most small businesses in India still run on phone calls, paper registers and WhatsApp forwards. Owners lose enquiries at night, chase fee payments by hand and spend evenings answering the same five questions.",
    "Big agencies are too expensive for them, and many cheap websites stop working the day the freelancer moves on. We started Tarkeon in Lucknow to sit in between: a small studio that builds proper websites, web apps, AI assistants and automations at prices a coaching centre, clinic or local shop can afford.",
    "We work in plain language, put a fixed quote in writing, show you a free demo before you commit and stay on call after launch. That is the whole idea.",
  ],
  values: [
    {
      title: "Clear thinking first",
      text: "We understand how your business runs before we suggest anything. Sometimes the honest answer is that you don’t need us yet.",
    },
    {
      title: "Plain language",
      text: "No jargon in calls, quotes or invoices. You always know what you are paying for and why.",
    },
    {
      title: "Fixed price, in writing",
      text: "Scope, timeline and price are agreed in writing before work starts. No surprise bills at the end.",
    },
    {
      title: "You own everything",
      text: "Your domain, code, content and accounts are in your name. You are never locked in to us.",
    },
    {
      title: "Built to last",
      text: "Fast, secure, well-documented work that keeps running long after launch day.",
    },
    {
      title: "Small and responsive",
      text: "You talk to the people who build your project, and you get a reply within one working day.",
    },
  ],
};

// Header aur footer ke links
export const mainNav = [
  { label: "Services", href: "/services", menu: "services" as const },
  { label: "Industries", href: "/industries", menu: "industries" as const },
  { label: "Portfolio", href: "/work" },
  { label: "Pricing", href: "/pricing" },
  { label: "Process", href: "/process" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
];

export const legalNav = [
  { label: "Privacy policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Refund policy", href: "/refund-policy" },
];

// Legal pages pe "Last updated" date. Policy badlo toh ye date bhi badlo.
export const legalLastUpdated = "2026-10-30";
