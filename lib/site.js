// Tarkeon ki saari basic details yahan hain.
// Number, email ya prices badalne ho toh sirf ye file edit karo.

// Business email: sirf yahan badlo, poori website mein update ho jayega.
export const CONTACT_EMAIL = "tarkeontechnologies@gmail.com";
export const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}?subject=Project%20Enquiry%20from%20Website`;

export const site = {
  name: "Tarkeon",
  tagline: "Web, AI and Automation",
  city: "Lucknow, India",
  url: "https://tarkeon.com", // apna asli domain daalo (.com ya .in)
  email: CONTACT_EMAIL,
  // WhatsApp number: country code ke saath, bina + aur space ke. Jaise: 919876543210
  whatsapp: "918808804843",
  whatsappDisplay: "+91 88088 04843",
};

export const nav = [
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/work", label: "Our work" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
];

export const services = [
  {
    id: "websites",
    icon: "monitor",
    title: "Business websites",
    text: "Look professional and get found on Google. Mobile-friendly, fast, with a WhatsApp button on every page.",
    long: "Most customers check you online before they call. A clear, fast website makes that first impression work for you, and turns visitors into enquiries.",
    includes: ["Up to 5–8 pages written around your business", "Works perfectly on mobile", "WhatsApp button and enquiry form", "Google-ready: titles, descriptions, Google Business Profile link", "Fast hosting and free HTTPS"],
    idealFor: "Coaching institutes, clinics, shops, consultants",
    from: "₹9,999",
  },
  {
    id: "web-apps",
    icon: "code",
    title: "Custom web apps",
    text: "Stop managing bookings, fees or orders on paper. Get a system built around how you already work.",
    long: "Registers, Excel sheets and WhatsApp groups break as you grow. We build simple tools your team actually uses — online, on any device.",
    includes: ["Login for owner, staff and customers", "Bookings, admissions, fees or orders", "Dashboard with the numbers that matter", "Admin panel to manage everything", "Weekly demos while we build"],
    idealFor: "Institutes, clinics, small teams with daily records",
    from: "₹39,999",
  },
  {
    id: "ai-chatbots",
    icon: "chat",
    title: "AI chatbots",
    text: "Never miss a customer at night. Your assistant answers questions and takes bookings on website and WhatsApp.",
    long: "Customers ask the same questions every day: timings, fees, location, availability. An AI assistant answers instantly, in English or Hindi, and passes serious leads to you.",
    includes: ["Trained on your own business information", "Website chat and WhatsApp", "English, Hindi and Hinglish replies", "Hands over to you when a human is needed", "Monthly report of what customers asked"],
    idealFor: "Any business that gets repeated customer questions",
    from: "₹24,999 with website",
  },
  {
    id: "automation",
    icon: "gear",
    title: "Business automation",
    text: "Save hours every week. Leads go to a sheet, follow-ups and payment reminders go out on their own.",
    long: "Copying leads, sending reminders and chasing payments eats hours. We connect your tools so the routine work happens on its own.",
    includes: ["Website leads straight to Google Sheets", "Automatic follow-up and payment reminders", "Instant alerts on WhatsApp or email", "Invoices and receipts sent automatically", "Built on tools you can keep using"],
    idealFor: "Owners spending hours on repetitive admin",
    from: "Quoted per workflow",
  },
];

export const industries = [
  {
    id: "coaching",
    name: "Coaching institutes",
    pitch: "Get more admissions and spend less time answering the same questions on the phone.",
    problems: [
      "Parents call again and again to ask about fees, batches and timings",
      "Admission forms and fee records live in registers and Excel",
      "Toppers and results are not shown anywhere online",
    ],
    solutions: [
      "Website with courses, batches, results and faculty",
      "Online admission form that goes straight to your sheet",
      "AI assistant that answers fee and batch questions 24×7",
      "Fee reminders sent automatically on WhatsApp",
    ],
    from: "₹24,999 (website + AI assistant)",
  },
  {
    id: "clinics",
    name: "Clinics and doctors",
    pitch: "Let patients book appointments online and stop losing calls when the reception is busy.",
    problems: [
      "Reception phone is always busy during OPD hours",
      "Patients don’t know timings, fees or which doctor sits when",
      "No-shows because nobody reminded the patient",
    ],
    solutions: [
      "Clean, trustworthy website with doctors and timings",
      "Online appointment booking with time slots",
      "Automatic WhatsApp reminders before the visit",
      "AI assistant for common questions in Hindi and English",
    ],
    from: "₹16,999 (website + booking)",
  },
  {
    id: "restaurants",
    name: "Restaurants and cafes",
    pitch: "Show your menu beautifully, take table bookings and orders without paying high commissions.",
    problems: [
      "Menu is a blurry photo on Google",
      "Table bookings come by phone and get missed",
      "Delivery apps take a big cut of every order",
    ],
    solutions: [
      "Website with a fast, mobile-friendly menu",
      "Table booking and direct WhatsApp ordering",
      "QR code menu for your tables",
      "Google Business Profile set up and linked",
    ],
    from: "₹16,999 (website + booking)",
  },
  {
    id: "shops",
    name: "Local shops and services",
    pitch: "Be found when people near you search on Google, and turn them into WhatsApp enquiries.",
    problems: [
      "Customers can’t find you on Google",
      "No place to show your products, work or prices",
      "Enquiries get lost across calls and messages",
    ],
    solutions: [
      "Simple website with products or services and photos",
      "WhatsApp button and enquiry form on every page",
      "Google Business Profile and local search basics",
      "All enquiries collected in one sheet automatically",
    ],
    from: "₹9,999 (starter website)",
  },
];

export const comparison = {
  columns: ["Tarkeon", "Typical agency", "Cheap freelancer"],
  rows: [
    { label: "Price shown before you call", values: ["Yes, with a calculator", "Rarely", "Varies"] },
    { label: "Fixed quote in writing", values: ["Always", "Usually", "Often not"] },
    { label: "You talk to the person who builds it", values: ["Yes", "No, an account manager", "Yes"] },
    { label: "AI chatbot and automation", values: ["Built in-house", "Extra cost, outsourced", "Rarely"] },
    { label: "Free demo before full payment", values: ["Yes", "No", "No"] },
    { label: "Support after launch", values: ["Monthly care plan", "Expensive retainer", "Often disappears"] },
  ],
};

export const values = [
  { title: "Logic before code", text: "We first understand how your business works, then build. That is what “Tark” in Tarkeon means." },
  { title: "Honest advice", text: "If you don’t need something, we tell you. A smaller, working solution beats a big, unused one." },
  { title: "Deadlines kept", text: "Scope, price and dates are agreed in writing. If anything changes, you hear it from us first." },
  { title: "Support after launch", text: "We don’t disappear after delivery. Call or message us when you need help." },
];

// Asli projects. Naya project jodna ho toh yahan add karo.
// image: public/ folder mein screenshot daalo, jaise "/work/coaching.png" (file na ho toh placeholder dikhega)
export const projects = [
  {
    tag: "Healthcare · Psychiatry practice, New Jersey (USA)",
    name: "Paramount Psychiatry",
    summary: "Website for a psychiatric practice in Manalapan, NJ, led by Dr. Pooja Tandon, MD, presenting compassionate, evidence-based psychiatric care.",
    built: ["Professional website for a US medical practice", "Clear presentation of the doctor and services", "Mobile-friendly, fast-loading pages"],
    link: "https://paramountpsychiatrynj.com/",
    image: "/work/paramount.png",
    tint: "#E9ECF5",
    credit: "Built by our founder while at HiBrands",
  },
  {
    tag: "Food · Handcrafted confectionery brand",
    name: "Dumuzi",
    summary: "Brand website for an artisanal confectionery label selling dark truffles, signature collections and customisable premium gift boxes.",
    built: ["Premium brand website", "Product and collection showcase", "Gift box presentation"],
    link: "https://www.dumuzi.in/",
    image: "/work/dumuzi.png",
    tint: "#F4EEE8",
    credit: "Built by our founder while at HiBrands",
  },
  {
    tag: "Real estate · Residential project, Lucknow",
    name: "Miracle Home Phase II",
    summary: "Lead-generation website for a RERA-approved 3 BHK gated housing project near Ayodhya Road, Lucknow, by Maxmiracle Buildcare LLP.",
    built: ["Overview, amenities, gallery and location pages", "Callback and brochure-download forms", "WhatsApp, call and Google Maps directions"],
    link: "https://www.maxmiraclebuildcare.com/",
    image: "/work/maxmiracle.png",
    tint: "#EEF2EC",
    credit: "Built by our founder while at HiBrands",
  },
  {
    tag: "Media · Hindi news portal, Uttar Pradesh",
    name: "ABS News",
    summary: "Hindi news portal covering Lucknow, Kanpur, Varanasi, Gorakhpur, Bihar, national and international news.",
    built: ["Category-wise news sections and search", "Breaking news and trending sections", "Banner ads and sponsored content slots"],
    link: "https://absnews.in/",
    image: "/work/absnews.png",
    tint: "#F2ECF5",
    credit: "Built by our founder while at HiBrands",
  },
];

// About page wala founder card (founder ka naam site pe kahin nahi dikhana hai).
export const founder = {
  heading: "The builder behind Tarkeon",
  title: "Founder & Lead Developer",
  // Terminal mein ek-ek line type hoti hai. type: "cmd" ($), "out" (>), "status" (> neela)
  terminal: [
    { type: "cmd", text: "whoami" },
    { type: "out", text: "engineer who ships, not just pitches" },
    { type: "cmd", text: "location" },
    { type: "out", text: "Lucknow, India — working with clients everywhere" },
    { type: "cmd", text: "stack" },
    { type: "out", text: "React · Node.js · Python · AI" },
    { type: "cmd", text: "status" },
    { type: "status", text: "building something for a client right now" },
  ],
  story: [
    "I’m a Computer Science engineer and full stack developer. Over the last two years I’ve built websites, web apps and AI chatbots for brands, foundations and universities.",
    "I started Tarkeon because small businesses deserve the same quality of software big companies get, without agency layers, hidden costs or vague timelines. When you work with Tarkeon, you talk directly to the person who builds your product.",
  ],
  expect: [
    "Direct WhatsApp access to me, not an account manager",
    "Fixed quote and written timeline before we start",
    "Weekly progress updates with a live preview link",
    "Support after launch",
  ],
  stack: ["React", "Node.js", "MongoDB", "PostgreSQL", "Python", "AI/LLMs"],
  quote: "If I wouldn’t put my name on it, I won’t ship it.",
  quoteBy: "Founder, Tarkeon",
};

// Pehle asli client ka review milne par yahan daalo, tab tak null rakho
// (null rehne par testimonial section dikhega hi nahi).
export const testimonial = null;
// Example:
// export const testimonial = {
//   quote: "Client ke apne shabdon mein asli result.",
//   name: "Client ka naam",
//   business: "Business ka naam, Lucknow",
// };

export const plans = [
  {
    name: "Starter website",
    price: "₹9,999",
    suffix: "",
    features: ["Up to 5 pages", "Mobile-friendly, fast", "WhatsApp and contact form", "Ready in 1–2 weeks"],
  },
  {
    name: "Website + AI chatbot",
    price: "₹24,999",
    suffix: "",
    popular: true,
    features: ["Everything in Starter", "AI assistant trained on your business", "English and Hindi replies", "1 month of support included"],
  },
  {
    name: "Custom web app",
    price: "₹39,999",
    suffix: "",
    features: ["Login, dashboard, database", "Bookings, fees or orders", "Admin panel for your team", "Weekly progress demos"],
  },
  {
    name: "Care plan",
    price: "₹1,499",
    suffix: "/month",
    muted: true,
    features: ["Updates and small changes", "Backups and security", "Hosting management", "Priority WhatsApp support"],
  },
];

export const steps = [
  { title: "Free call", text: "We understand your business and what you need. No jargon." },
  { title: "Free demo", text: "See a first look of your homepage before you commit." },
  { title: "Build and review", text: "Fixed scope and deadline in writing. You see progress every week." },
  { title: "Launch and support", text: "We go live, train your team and stay on call after launch." },
];

export const faqs = [
  {
    q: "How much does a website cost?",
    a: "A starter website begins at ₹9,999 and a website with an AI chatbot at ₹24,999. After a free call we send a fixed price in writing, so there are no surprises.",
  },
  {
    q: "How do payments work?",
    a: "You pay 50% to start and the remaining 50% only after you review and approve the finished work.",
  },
  {
    q: "How long does it take?",
    a: "A starter website usually takes 1–2 weeks. Custom apps and chatbots take longer; we share a clear timeline before we start.",
  },
  {
    q: "Can the chatbot talk in Hindi?",
    a: "Yes. Our AI chatbots can reply in English, Hindi or Hinglish, on your website or on WhatsApp.",
  },
  {
    q: "What happens after the website goes live?",
    a: "Our care plan covers updates, backups and small changes, so your site stays fast and secure. It is optional.",
  },
];

// Hero wale demo chatbot ke sawaal-jawab
export const chatQA = [
  { id: "build", q: "What do you build?", a: "Websites, booking and fee systems, and AI assistants like me — for your website or WhatsApp." },
  { id: "price", q: "How much does it cost?", a: "A starter website begins at ₹9,999. You get a fixed price in writing after a free call." },
  { id: "hindi", q: "Hindi mein baat karoge?", a: "Haan bilkul! Main English, Hindi aur Hinglish teeno samajhta hoon." },
  { id: "time", q: "How fast can you deliver?", a: "Most websites are ready in 1–2 weeks. You see a free demo before you pay in full." },
];

export const needs = ["Website", "Website + AI chatbot", "Web app", "Automation", "Not sure yet"];
