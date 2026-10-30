import type { Service } from "./types";

// Har service ka detail page /services/[slug] isi data se banta hai.
// Nayi service jodni ho toh is array mein ek object aur jodo (slug unique rakho).
// TODO: startingPrice confirm karo, khaaskar ecommerce, landing-pages, ai-chatbots, automation aur seo-basics ke.

export const services: Service[] = [
  {
    slug: "websites",
    title: "Website development",
    shortTitle: "Websites",
    icon: "monitor",
    summary: "Fast, mobile-first websites that look professional, rank on Google and turn visitors into enquiries.",
    benefits: ["Mobile-first design in your brand colours","WhatsApp button, click-to-call and contact form","Domain, code and accounts in your name"],
    seoTitle: "Business Website Design in Lucknow",
    seoDescription:
      "Fast, mobile-first business websites from ₹9,999. WhatsApp button, contact form, Google-ready SEO and a free demo before you pay in full.",
    headline: "A website that brings in enquiries, not just compliments.",
    intro:
      "Most customers look you up on their phone before they call. We build fast, clear websites that answer their questions, show why they should pick you and make it one tap to contact you.",
    problems: [
      {
        title: "Customers can’t find you",
        text: "Without a website, Google shows your competitors first, or an old listing with the wrong phone number.",
      },
      {
        title: "Your old site is slow or broken on mobile",
        text: "Most visitors are on phones. If the page takes five seconds to load or the text is tiny, they leave.",
      },
      {
        title: "Visitors don’t know what to do next",
        text: "A site without clear prices, proof or a WhatsApp button gets views but not calls.",
      },
    ],
    deliverables: [
      "Up to 5 pages: home, services, about, gallery or work, contact",
      "Mobile-first design in your brand colours",
      "WhatsApp button, click-to-call and a contact form that emails you",
      "On-page SEO: titles, descriptions, sitemap and Google Search Console setup",
      "Google Maps and Google Business Profile linked",
      "Fast hosting setup and SSL (the padlock)",
      "A short video showing how to update text and photos",
      "Domain, code and accounts in your name",
    ],
    process: [
      { title: "Free call", text: "We learn about your business, customers and competitors.", duration: "30 min" },
      { title: "Free homepage demo", text: "You see a first look of your homepage before you commit.", duration: "48 hours" },
      { title: "Build", text: "We design and build every page. You review on a private link.", duration: "1 week" },
      { title: "Launch", text: "We connect your domain, test on real phones and go live.", duration: "1–2 days" },
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel hosting", "Google Search Console"],
    startingPrice: 9999,
    priceNote: "For up to 5 pages. Extra pages, a Hindi version or content writing are quoted separately.",
    timeline: "1–2 weeks",
    faqs: [
      {
        q: "Do I need to write all the content myself?",
        a: "No. Send us what you have (old brochures, your WhatsApp catalogue, a voice note explaining your services) and we turn it into clear website copy. Full copywriting from scratch is a small add-on.",
      },
      {
        q: "Can I update the website myself later?",
        a: "Yes. For simple changes we set up an easy editor or show you how to update text and photos. Bigger changes can go through our care plan.",
      },
      {
        q: "Will my website show up on Google?",
        a: "We set up everything Google needs to find and understand your site: page titles, descriptions, a sitemap and Search Console. Ranking higher takes time and good content, and we will tell you honestly what to expect.",
      },
      {
        q: "Who owns the domain and website?",
        a: "You do. The domain is registered in your name and you get full access to the code and hosting account.",
      },
    ],
    industries: ["coaching", "clinics", "restaurants", "real-estate", "local-shops"],
    posts: ["website-cost-in-india", "why-coaching-institutes-need-a-website-2026"],
  },
  {
    slug: "ecommerce",
    title: "E-commerce development",
    shortTitle: "E-commerce",
    icon: "store",
    summary: "An online store with your products, a simple checkout and UPI or card payments, built to work well on phones.",
    benefits: ["Product catalogue, cart and checkout", "Razorpay or UPI payments with receipts", "Order alerts on email or WhatsApp"],
    seoTitle: "E-commerce Website Development in Lucknow",
    seoDescription:
      "Online stores for Indian businesses from ₹14,999: product catalogue, cart, UPI and card payments and order alerts. Free demo before you pay in full.",
    headline: "An online store your customers can actually buy from.",
    intro:
      "Selling over WhatsApp works until orders pile up. We build simple, fast online stores with a clear catalogue, an easy checkout and payments your customers already trust.",
    problems: [
      {
        title: "Orders get lost in chats",
        text: "When every order is a WhatsApp message, details get missed and customers have to wait for a reply.",
      },
      {
        title: "Marketplace fees cut your margin",
        text: "Selling only through marketplaces means paying commission on every sale and having no direct link to your customers.",
      },
      {
        title: "Checkout is hard on a phone",
        text: "If paying takes too many steps on mobile, people give up before they finish the order.",
      },
    ],
    deliverables: [
      "Product catalogue with categories, photos and prices",
      "Cart and mobile-friendly checkout",
      "Razorpay or UPI payments with receipts",
      "Order alerts on email or WhatsApp",
      "A simple way to add and update products",
      "On-page SEO for your store and product pages",
      "Domain, code and accounts in your name",
    ],
    process: [
      { title: "Free call", text: "We go through your products, delivery area and how you take orders today.", duration: "30 min" },
      { title: "Free homepage demo", text: "You see a first look of your store before you commit.", duration: "48 hours" },
      { title: "Build", text: "We add your products, set up payments and share a private preview link.", duration: "2–3 weeks" },
      { title: "Launch", text: "We test real orders and payments, connect your domain and go live.", duration: "1–2 days" },
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Razorpay", "Vercel hosting"],
    startingPrice: 14999,
    priceNote: "For a small catalogue with online payments. Payment gateway fees are charged by the provider.",
    timeline: "2–4 weeks",
    faqs: [
      {
        q: "Which payment methods can my store accept?",
        a: "Through Razorpay your customers can pay by UPI, cards and net banking. The gateway charges its own fee on each payment.",
      },
      {
        q: "Can I add products myself?",
        a: "Yes. We set up a simple way to add products, change prices and mark items as out of stock, and show you how to use it.",
      },
      {
        q: "Can I still take orders on WhatsApp?",
        a: "Yes. Many small stores keep a WhatsApp button alongside online checkout, so customers can choose what suits them.",
      },
    ],
    industries: ["local-shops", "restaurants"],
    posts: ["website-cost-in-india"],
  },
  {
    slug: "web-apps",
    title: "Custom web applications",
    shortTitle: "Web apps",
    icon: "code",
    summary: "Booking, fees, orders or inventory, managed in one simple system built around how you already work.",
    benefits: ["Login, dashboard and database","Built around how your team already works","Weekly progress demos while we build"],
    seoTitle: "Custom Web App Development for Small Businesses",
    seoDescription:
      "Custom web apps from ₹39,999: bookings, fee management, orders, dashboards and admin panels for Indian small businesses. Weekly demos, fixed quote.",
    headline: "Stop running your business on paper registers and spreadsheets.",
    intro:
      "When bookings, fees or orders live in notebooks, Excel files and WhatsApp chats, things get missed. We build a simple web app that keeps everything in one place, works on any phone and fits the way your team already works.",
    problems: [
      {
        title: "Data is scattered",
        text: "Student fees in one register, enquiries in WhatsApp, payments in a bank app. Nobody has the full picture.",
      },
      {
        title: "Off-the-shelf software doesn’t fit",
        text: "Generic tools force you to change how you work, charge per user and are full of features you never use.",
      },
      {
        title: "Too much manual work",
        text: "Your staff spend hours copying data, making reports and sending reminders that a system could handle.",
      },
    ],
    deliverables: [
      "Login for you, your staff and (if needed) your customers",
      "Dashboard with the numbers you check every day",
      "Modules you need: bookings, fees, orders, stock, attendance or leads",
      "Admin panel to manage users, prices and settings",
      "Online payments through Razorpay or UPI, if needed",
      "Daily backups and secure hosting",
      "Training session for your team and a written guide",
      "30 days of bug fixes after launch",
    ],
    process: [
      { title: "Discovery", text: "We map your current process and agree what the first version must do.", duration: "2–4 days" },
      { title: "Clickable prototype", text: "You try the main screens before any code is written.", duration: "1 week" },
      { title: "Build in weekly steps", text: "A working demo every week, so you see progress and can change course early.", duration: "3–6 weeks" },
      { title: "Launch and train", text: "We move your data across, train your team and stay close for the first month.", duration: "1 week" },
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Razorpay", "Vercel / AWS"],
    startingPrice: 39999,
    priceNote: "For a focused first version with one or two core modules. Larger systems are quoted after discovery.",
    timeline: "4–8 weeks",
    faqs: [
      {
        q: "Will it work on mobile?",
        a: "Yes. Every app we build works in the phone browser. If you need it, we can make it installable on the home screen like a regular app.",
      },
      {
        q: "Can you move my existing Excel data into the new system?",
        a: "Yes. We clean and import your existing data so you don’t start from zero.",
      },
      {
        q: "What if I want more features later?",
        a: "We build the first version small on purpose, so you can start using it quickly. New features can be added later as separate, fixed-price phases.",
      },
      {
        q: "Is my business data safe?",
        a: "Data is stored on secure cloud servers with daily backups. Staff only see what their role allows, and you own all the data.",
      },
    ],
    industries: ["coaching", "clinics", "real-estate", "local-shops"],
    posts: ["website-cost-in-india"],
  },
  {
    slug: "ai-chatbots",
    title: "AI integration & chatbots",
    shortTitle: "AI chatbots",
    icon: "chat",
    summary: "An assistant trained on your business that answers questions and takes enquiries 24×7 on website and WhatsApp.",
    benefits: ["Trained on your prices, timings and policies","Replies in English, Hindi and Hinglish","Leads sent to your email or sheet"],
    seoTitle: "AI Chatbot for Website and WhatsApp",
    seoDescription:
      "AI chatbots for small businesses that answer customer questions in English, Hindi and Hinglish, capture leads and book appointments on your website or WhatsApp.",
    headline: "Answer every customer, even at 11 pm.",
    intro:
      "Customers ask the same questions again and again: fees, timings, location, availability. An AI assistant trained on your own information answers them instantly, collects the customer’s details and hands real conversations to you.",
    problems: [
      {
        title: "Missed enquiries after hours",
        text: "People message at night and on Sundays. By the time you reply, they have called someone else.",
      },
      {
        title: "The same questions all day",
        text: "You or your staff spend hours typing the same answers about fees, timings and directions.",
      },
      {
        title: "Leads get lost in chats",
        text: "Names and numbers are buried in WhatsApp threads, with no follow-up list.",
      },
    ],
    deliverables: [
      "Assistant trained on your services, prices, FAQs and policies",
      "Replies in English, Hindi and Hinglish",
      "Website chat widget, WhatsApp, or both",
      "Collects name, number and requirement, then sends the lead to you",
      "Clear hand-off to a human for anything it can’t answer",
      "Guardrails so it does not make up prices or promises",
      "Monthly report of common questions",
      "Easy way to update its knowledge when your prices change",
    ],
    process: [
      { title: "Collect your knowledge", text: "We gather your FAQs, price lists and policies, and write the rules it must follow.", duration: "2–3 days" },
      { title: "Train and test", text: "We set up the assistant and test it with real questions your customers ask.", duration: "1 week" },
      { title: "Your review", text: "You and your staff try to break it. We fix every wrong or unclear answer.", duration: "2–3 days" },
      { title: "Go live", text: "We add it to your website or WhatsApp number and watch the first conversations closely.", duration: "1–2 days" },
    ],
    stack: ["Claude / OpenAI models", "Retrieval on your own documents", "WhatsApp Business Platform", "Next.js", "Google Sheets or CRM"],
    startingPrice: 14999,
    priceNote:
      "For a website chatbot if you already have a site. Website + AI chatbot together starts at ₹24,999. WhatsApp messaging charges from Meta are billed at actual cost.",
    timeline: "2–3 weeks",
    faqs: [
      {
        q: "Will the chatbot give wrong answers?",
        a: "Any AI can make mistakes, so we limit it to your own information, tell it to say “I’ll connect you to the team” when unsure and test it thoroughly before launch. It should never invent prices or make promises.",
      },
      {
        q: "Can it work on my existing WhatsApp number?",
        a: "It can work on a WhatsApp Business Platform number. Your current number can usually be moved, but it then stops working in the normal WhatsApp app. We explain the options before you decide.",
      },
      {
        q: "Are there monthly running costs?",
        a: "Yes, small ones: AI usage and, for WhatsApp, Meta’s per-conversation charges. For most small businesses this is a few hundred to a couple of thousand rupees a month. We estimate it for you before starting.",
      },
      {
        q: "Can it book appointments?",
        a: "Yes. It can collect the preferred date and time and add the booking to a sheet or calendar, or connect to a booking system we build for you.",
      },
    ],
    industries: ["coaching", "clinics", "restaurants", "real-estate"],
    posts: ["what-an-ai-chatbot-can-and-cant-do"],
  },
  {
    slug: "automation",
    title: "Business automation",
    shortTitle: "Automation",
    icon: "bolt",
    summary: "Leads, follow-ups, reminders and reports that run on their own, so your team saves hours every week.",
    benefits: ["Leads sent to a sheet with instant alerts","Reminders and follow-ups that run themselves","Fewer manual, repetitive tasks every week"],
    seoTitle: "Business Process Automation for Small Businesses",
    seoDescription:
      "Automate lead capture, WhatsApp and email follow-ups, payment reminders and daily reports. Simple automations for Indian small businesses, from ₹7,999.",
    headline: "Let the repetitive work run itself.",
    intro:
      "Copying leads into a sheet, sending fee reminders, making the daily sales report: these jobs are important but boring, and they get skipped on busy days. We connect the tools you already use so these tasks happen automatically.",
    problems: [
      {
        title: "Leads slip through",
        text: "Enquiries come from your website, Instagram, Google and calls, and nobody follows up on all of them.",
      },
      {
        title: "Reminders depend on memory",
        text: "Fee dues, appointment reminders and renewals go out late, or not at all.",
      },
      {
        title: "Reports eat your evenings",
        text: "You spend time every day copying numbers between apps instead of running the business.",
      },
    ],
    deliverables: [
      "One clear automation map of how your data should flow",
      "Lead capture from website forms into Google Sheets or a CRM",
      "Instant alerts to you on WhatsApp or email for new leads",
      "Automatic follow-up and payment reminder messages",
      "Daily or weekly summary reports",
      "Error alerts if something stops working",
      "A plain-language guide to every automation",
    ],
    process: [
      { title: "Audit", text: "We look at where time is going and pick the two or three tasks worth automating first.", duration: "1–2 days" },
      { title: "Build", text: "We connect your tools and set up each automation with test data.", duration: "3–7 days" },
      { title: "Test together", text: "We run real cases with you and fix any gaps.", duration: "2–3 days" },
      { title: "Hand-over", text: "You get a guide and we keep an eye on it for the first weeks.", duration: "Ongoing" },
    ],
    stack: ["Google Workspace", "Apps Script", "n8n / Make", "WhatsApp Business Platform", "Razorpay webhooks", "Email (Resend)"],
    startingPrice: 7999,
    priceNote: "For one or two connected automations. Paid tool subscriptions, if any, are billed at actual cost.",
    timeline: "1–2 weeks",
    faqs: [
      {
        q: "Do I need to buy new software?",
        a: "Usually not. We start with the tools you already use, like Google Sheets, Gmail and WhatsApp. If a paid tool is truly needed, we tell you the cost upfront.",
      },
      {
        q: "What happens if an automation breaks?",
        a: "We set up error alerts, so you and we know straight away. Our care plan covers fixing and adjusting automations over time.",
      },
      {
        q: "Can you automate WhatsApp messages?",
        a: "Yes, through the official WhatsApp Business Platform, which is the safe way to send messages at scale without getting your number banned.",
      },
    ],
    industries: ["coaching", "clinics", "real-estate", "local-shops", "restaurants"],
    posts: ["what-an-ai-chatbot-can-and-cant-do"],
  },
  {
    slug: "landing-pages",
    title: "Landing pages",
    shortTitle: "Landing pages",
    icon: "layout",
    summary: "One focused page for an ad, an admission season or a launch, built to get as many enquiries as possible.",
    benefits: ["One page with one clear goal","Built for ads, launches and admission seasons","Fast on mobile data"],
    seoTitle: "Landing Page Design for Ads and Campaigns",
    seoDescription:
      "High-converting landing pages for Google and Meta ads, admission campaigns and launches. Fast, mobile-first, with lead forms and tracking. From ₹5,999.",
    headline: "One page, one goal: more enquiries from your ads.",
    intro:
      "Sending ad traffic to your homepage wastes money. A landing page talks about one offer, answers objections and makes it very easy to call, WhatsApp or fill a form, so more of the people you pay for actually contact you.",
    problems: [
      {
        title: "Ads get clicks but no calls",
        text: "Visitors land on a busy homepage, can’t find the offer and leave.",
      },
      {
        title: "No idea what is working",
        text: "Without tracking, you can’t tell which ad or campaign brought the enquiry.",
      },
      {
        title: "Slow pages kill results",
        text: "Every extra second of loading time on mobile loses visitors you already paid for.",
      },
    ],
    deliverables: [
      "One long-form page focused on a single offer",
      "Clear headline, benefits, proof section and FAQs",
      "Lead form, WhatsApp and click-to-call buttons",
      "Google Analytics and Meta Pixel / Google Ads conversion tracking",
      "Leads sent to email and Google Sheets",
      "Very fast loading on mobile",
      "One round of copy and design changes after launch data comes in",
    ],
    process: [
      { title: "Offer and audience", text: "We agree on who the page is for and the one action they should take.", duration: "1 day" },
      { title: "Copy and design", text: "We write the page and design it mobile-first.", duration: "2–4 days" },
      { title: "Tracking and launch", text: "We connect forms and tracking, then test every button.", duration: "1 day" },
    ],
    stack: ["Next.js", "Tailwind CSS", "Google Analytics 4", "Meta Pixel", "Google Sheets"],
    startingPrice: 5999,
    priceNote: "For one page. Extra variations for A/B testing are quoted separately.",
    timeline: "4–7 days",
    faqs: [
      {
        q: "Do you also run the ads?",
        a: "We focus on the page and the tracking. We can work alongside your ad manager, or suggest one, so the page and the ads work together.",
      },
      {
        q: "Can I use the page for more than one campaign?",
        a: "Yes, as long as the offer is the same. For a different offer, a separate page usually works much better.",
      },
    ],
    industries: ["coaching", "real-estate", "clinics", "restaurants"],
    posts: ["website-cost-in-india"],
  },
  {
    slug: "seo-basics",
    title: "SEO & digital marketing",
    shortTitle: "SEO",
    icon: "search",
    summary: "Google Business Profile setup and on-page SEO so nearby customers find you on Google Search and Maps.",
    benefits: ["Google Business Profile setup","On-page titles, descriptions and sitemap","Honest advice on what to expect"],
    seoTitle: "Local SEO and Google Business Profile Setup",
    seoDescription:
      "Get found on Google Maps and Search. Google Business Profile setup and optimisation plus on-page SEO for your website, from ₹4,999. Honest, no fake promises.",
    headline: "Show up when people nearby search for what you do.",
    intro:
      "When someone searches “coaching near me” or “dentist in Gomti Nagar”, Google shows the map listings first. A complete, accurate Google Business Profile and a well-structured website are the basics that give you a fair chance to appear.",
    problems: [
      {
        title: "Your listing is missing or incomplete",
        text: "Wrong hours, an old number, no photos and no categories make Google and customers trust you less.",
      },
      {
        title: "Your website isn’t understood by Google",
        text: "Missing titles, slow pages and no local information make it hard to rank for your area.",
      },
      {
        title: "Reviews go unanswered",
        text: "Customers read reviews and your replies. Silence looks like nobody is home.",
      },
    ],
    deliverables: [
      "Google Business Profile created or claimed and verified (verification steps depend on Google)",
      "Correct categories, services, hours, area, photos and description",
      "On-page SEO for up to 5 pages: titles, descriptions, headings, internal links",
      "LocalBusiness schema markup and sitemap",
      "Google Search Console and Analytics setup",
      "A simple system to ask happy customers for reviews",
      "A one-page checklist to keep your profile active",
    ],
    process: [
      { title: "Audit", text: "We check your current listing, website and how competitors appear.", duration: "1–2 days" },
      { title: "Fix and set up", text: "We complete your profile and fix on-page SEO issues.", duration: "3–5 days" },
      { title: "Hand-over", text: "You get a checklist and a short call on keeping it up to date.", duration: "1 day" },
    ],
    stack: ["Google Business Profile", "Google Search Console", "Google Analytics 4", "Schema.org markup"],
    startingPrice: 4999,
    priceNote: "One-time setup. We don’t sell fake reviews, fake listings or guaranteed rankings.",
    timeline: "1 week",
    faqs: [
      {
        q: "Can you guarantee I will rank #1 on Google?",
        a: "No, and be careful of anyone who does. Google decides rankings. We set up the basics correctly, which gives you a fair chance, and we explain what affects ranking in your area.",
      },
      {
        q: "Do I need a website for Google Business Profile?",
        a: "No, but having one helps. A website gives Google and customers more information and a place to send people from your listing.",
      },
      {
        q: "Can you get us more reviews?",
        a: "We set up an easy way to ask real customers for reviews, like a short link and QR code. We never write or buy fake reviews, which breaks Google’s rules.",
      },
    ],
    industries: ["clinics", "restaurants", "local-shops", "coaching", "real-estate"],
    posts: ["why-coaching-institutes-need-a-website-2026"],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
