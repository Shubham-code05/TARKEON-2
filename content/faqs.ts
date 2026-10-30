import type { Faq } from "./types";

// Homepage ke general FAQs
export const faqs: Faq[] = [
  {
    q: "How much does website development cost?",
    a: "A starter website begins at ₹9,999, an online store at ₹14,999 and a website with an AI chatbot at ₹24,999. After a free call we send a fixed price in writing, so there are no surprises.",
  },
  {
    q: "How long does development take?",
    a: "A starter website usually takes 1–2 weeks. Online stores, custom apps and chatbots take longer; we share a clear timeline before we start.",
  },
  {
    q: "Do you provide domain and hosting?",
    a: "Yes. We set up both in your name. Domain and any paid hosting are billed at what the provider charges, with no markup.",
  },
  {
    q: "Will my website be mobile responsive?",
    a: "Yes. Every site is designed for phones first and tested on real devices before launch.",
  },
  {
    q: "Can I update my website myself?",
    a: "Yes. For simple changes we set up an easy editor or show you how to update text and photos. Bigger changes can go through our care plan.",
  },
  {
    q: "Do you provide SEO services?",
    a: "Yes. We set up page titles, descriptions, a sitemap, Search Console and your Google Business Profile. Ranking higher takes time and good content, so we won’t promise a position on Google.",
  },
  {
    q: "Do you provide maintenance?",
    a: "Yes. Our optional care plan costs ₹1,499 a month and covers small updates, backups, security updates and priority WhatsApp support.",
  },
  {
    q: "What happens after launch?",
    a: "Bug fixes are free for 30 days. You get admin logins, a short how-to video and full ownership. After that you can manage the site yourself or use our care plan.",
  },
  {
    q: "How can I get started?",
    a: "Message us on WhatsApp or fill in the contact form. We start with a free call, then send a written quote and a free first look of your homepage.",
  },
  {
    q: "How do payments work?",
    a: "You pay 50% to start and the remaining 50% only after you review and approve the finished work.",
  },
  {
    q: "Can the chatbot talk in Hindi?",
    a: "Yes. Our AI chatbots can reply in English, Hindi or Hinglish, on your website or on WhatsApp.",
  },
  {
    q: "What do I get in the free demo?",
    a: "Within 48 hours of our call, you see a first look of your homepage (or the main screen of your app) with your business name and real content. It’s free, and you decide afterwards whether to go ahead.",
  },
  {
    q: "Is the free website check really free?",
    a: "Yes. It runs Google’s own PageSpeed test on your site and explains the results in plain English. No sign-up, and we don’t save or share your result. If you want help fixing what it finds, you can send the report to us on WhatsApp.",
  },
  {
    q: "Do you only work with businesses in Lucknow?",
    a: "We are based in Lucknow and happy to meet in person here, but we work with businesses anywhere in India over calls and WhatsApp.",
  },
];

// Chat demo ke sawaal-jawab (homepage hero)
export const chatQA = [
  {
    id: "build",
    q: "What do you build?",
    a: "Websites, booking and fee systems, automations and AI assistants like me, for your website or WhatsApp.",
  },
  {
    id: "price",
    q: "How much does it cost?",
    a: "A starter website begins at ₹9,999. You get a fixed price in writing after a free call.",
  },
  { id: "hindi", q: "Hindi mein baat karoge?", a: "Haan bilkul! Main English, Hindi aur Hinglish teeno samajhta hoon." },
  {
    id: "time",
    q: "How fast can you deliver?",
    a: "Most websites are ready in 1–2 weeks. You see a free demo before you pay in full.",
  },
  {
    id: "unsure",
    q: "Can you give medical advice?",
    a: "No. A good assistant knows its limits. For anything outside your business information, I pass the chat to a human on your team.",
  },
];

// Contact form ke "What do you need?" options
export const needs = ["Website", "E-commerce store", "Website + AI chatbot", "Web app", "Automation", "Landing page", "Google / SEO setup", "Not sure yet"];

export const budgets = ["Under ₹10,000", "₹10,000 – ₹25,000", "₹25,000 – ₹50,000", "₹50,000+", "Not sure yet"];
