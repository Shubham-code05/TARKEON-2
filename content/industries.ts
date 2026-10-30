import type { Industry } from "./types";

// Har industry ka page /industries/[slug] isi data se banta hai.

export const industries: Industry[] = [
  {
    slug: "coaching",
    name: "Coaching institutes",
    icon: "graduation",
    summary: "Admissions enquiries, batch details, fee reminders and parent updates, without the phone chaos.",
    seoTitle: "Websites and Software for Coaching Institutes",
    seoDescription:
      "Websites, admission landing pages, fee management and AI chatbots for coaching institutes and tuition centres in Lucknow and across India.",
    headline: "More admissions, fewer phone calls about the same batch timings.",
    intro:
      "Parents and students compare three or four institutes before they visit. A clear website with courses, faculty, results you can prove and fees makes you the easy choice, and the right tools take admin off your desk.",
    problems: [
      {
        title: "Enquiries peak, then disappear",
        text: "Admission season brings hundreds of calls. Without a system, many never get a follow-up.",
        solution: "A focused admissions page and an enquiry sheet that reminds your team to call every lead back the same day.",
      },
      {
        title: "Parents ask the same questions",
        text: "Batch timings, fees, test schedules and holidays are asked every day on calls and WhatsApp.",
        solution:
          "An AI assistant answers batch, fee and timing questions in Hindi or English, day and night, and passes real enquiries to you.",
      },
      {
        title: "Fee collection is manual",
        text: "Tracking dues in registers and sending reminders one by one wastes hours every month.",
        solution: "Fee dues tracked in one place, with polite WhatsApp reminders sent automatically and online payment links.",
      },
      {
        title: "Losing students to online listings",
        text: "Students searching on Google find aggregator sites and competitors before they find you.",
      },
    ],
    solutions: [
      {
        title: "Admissions website",
        text: "Courses, batches, faculty, fees and a one-tap enquiry or demo-class booking.",
        service: "websites",
      },
      {
        title: "Admission season landing page",
        text: "A focused page for your ads with tracking, so you know which campaign brings students.",
        service: "landing-pages",
      },
      {
        title: "AI assistant for parents",
        text: "Answers questions about batches, fees and timings in Hindi or English, day and night.",
        service: "ai-chatbots",
      },
      {
        title: "Fee and attendance system",
        text: "Track fees, send automatic reminders and share attendance with parents.",
        service: "web-apps",
      },
    ],
    faqs: [
      {
        q: "Can we show our toppers and results?",
        a: "Yes, and you should. We only publish results you can back up, with the student’s permission, because parents trust real results with names and years.",
      },
      {
        q: "Can parents pay fees online?",
        a: "Yes. We can add Razorpay or UPI payments with automatic receipts, and reminders for pending fees.",
      },
      {
        q: "We already have a Facebook page. Do we still need a website?",
        a: "A Facebook page helps, but you don’t control it and it rarely shows up when parents search on Google. A website is your own place to show courses, fees and results.",
      },
    ],
    home: {
      key: "coaching",
      label: "Coaching",
      headline: "More admissions, fewer calls about batch timings.",
      highlight: ["admissions,"],
      subheadline:
        "A clear website, an AI assistant that answers parents in Hindi or English, and fee reminders that send themselves. Built for coaching institutes, priced for them too.",
      chatGreeting: "Namaste! I’m a demo assistant for a sample coaching institute. Ask me what parents usually ask.",
      chat: [
        {
          id: "timing",
          q: "Class 11 PCM batch ka time kya hai?",
          a: "Morning batch 7–9 am and evening batch 5–7 pm, Monday to Saturday. Want me to book a free demo class?",
        },
        {
          id: "fees",
          q: "What are the fees?",
          a: "For this sample institute, Class 11 PCM is ₹4,500 a month, with a 10% discount if you pay for the full year. I can send the fee sheet on WhatsApp.",
        },
        {
          id: "weekend",
          q: "Is there a weekend batch?",
          a: "Yes, Saturday and Sunday 10 am – 1 pm. It has 6 seats left this month.",
        },
        {
          id: "demo",
          q: "Can my child attend a demo class?",
          a: "Of course. Share the student’s name and class, and the counsellor will confirm a slot within the day.",
        },
        {
          id: "rank",
          q: "Can you guarantee a top rank?",
          a: "No honest institute can guarantee a rank. I can share last year’s verified results and connect you with a teacher.",
        },
      ],
      package: {
        label: "website + AI assistant for parents",
        type: "website",
        addons: ["chatbot"],
      },
    },
    services: ["websites", "landing-pages", "ai-chatbots", "web-apps", "automation", "seo-basics"],
    posts: ["why-coaching-institutes-need-a-website-2026", "what-an-ai-chatbot-can-and-cant-do"],
  },
  {
    slug: "clinics",
    name: "Clinics and doctors",
    icon: "stethoscope",
    summary: "Online appointments, reminders and a trustworthy web presence for clinics, dentists and diagnostic centres.",
    seoTitle: "Websites and Appointment Booking for Clinics",
    seoDescription:
      "Clinic websites, online appointment booking, WhatsApp reminders and Google Business Profile setup for doctors, dentists and clinics in India.",
    headline: "Let patients book in seconds, and come on time.",
    intro:
      "Patients want to check timings, doctor details and directions, then book without waiting on hold. We help clinics look trustworthy online and run appointments smoothly, while keeping patient data private.",
    problems: [
      {
        title: "Phone lines are always busy",
        text: "Your front desk spends the day answering calls about timings and availability.",
        solution: "Patients pick a free slot online in seconds. Your front desk sees the whole day on one screen.",
      },
      {
        title: "No-shows waste slots",
        text: "Without reminders, patients forget appointments and slots go empty.",
        solution: "Automatic WhatsApp reminders the day before and two hours before every appointment.",
      },
      {
        title: "Patients can’t find accurate information",
        text: "Old listings show wrong timings or numbers, and patients go elsewhere.",
        solution:
          "A correct Google listing and a clinic website with timings, doctors and directions that are always up to date.",
      },
    ],
    solutions: [
      {
        title: "Clinic website",
        text: "Doctor profiles, treatments, timings, location and a clear booking button.",
        service: "websites",
      },
      {
        title: "Appointment booking system",
        text: "Patients pick a slot online; your staff see the day’s schedule on one screen.",
        service: "web-apps",
      },
      {
        title: "Automatic reminders",
        text: "WhatsApp or SMS reminders before each appointment to cut no-shows.",
        service: "automation",
      },
      {
        title: "Google Maps listing",
        text: "An accurate Google Business Profile so nearby patients find the right timings.",
        service: "seo-basics",
      },
    ],
    faqs: [
      {
        q: "Is patient data kept private?",
        a: "Yes. We collect only what the booking needs, store it securely, limit who can see it and follow the Digital Personal Data Protection Act, 2023. We don’t put medical records on a public website.",
      },
      {
        q: "Can the chatbot give medical advice?",
        a: "No, and it shouldn’t. A clinic assistant answers practical questions about timings, fees and services, and tells patients to consult the doctor for anything medical.",
      },
      {
        q: "Can patients pay online when booking?",
        a: "Yes, if you want. Many clinics prefer to take a small booking fee online and the rest at the visit.",
      },
    ],
    home: {
      key: "clinic",
      label: "Clinic",
      headline: "Let patients book in seconds, and show up on time.",
      highlight: ["book", "in", "seconds,"],
      subheadline:
        "A trustworthy clinic website, online appointments and WhatsApp reminders that cut no-shows, with patient data kept private.",
      chatGreeting: "Hello! I’m a demo assistant for a sample clinic. Try a question a patient would ask.",
      chat: [
        {
          id: "timing",
          q: "What are the OPD timings?",
          a: "Monday to Saturday, 10 am – 2 pm and 5 – 8 pm. Sunday mornings by appointment only.",
        },
        {
          id: "book",
          q: "Can I book for tomorrow evening?",
          a: "Yes, 6:15 pm and 6:45 pm are free tomorrow. Which one should I hold for you?",
        },
        {
          id: "fee",
          q: "Consultation fee kitni hai?",
          a: "For this sample clinic, first consultation is ₹600 and follow-ups within 7 days are free.",
        },
        {
          id: "walkin",
          q: "Do you accept walk-ins?",
          a: "Yes, but booked patients are seen first. Booking online usually saves you the wait.",
        },
        {
          id: "advice",
          q: "I have chest pain. Which medicine should I take?",
          a: "I can’t give medical advice. If this is an emergency, call 112 or go to the nearest emergency room now. I can also connect you to the clinic.",
        },
      ],
      package: {
        label: "website + online booking",
        type: "website",
        addons: ["booking"],
      },
    },
    services: ["websites", "web-apps", "automation", "seo-basics", "ai-chatbots"],
    posts: ["what-an-ai-chatbot-can-and-cant-do", "website-cost-in-india"],
  },
  {
    slug: "restaurants",
    name: "Restaurants and cafés",
    icon: "utensils",
    summary: "Menus that load fast, direct orders and table bookings, and a Google listing that brings people in.",
    seoTitle: "Websites and WhatsApp Ordering for Restaurants",
    seoDescription:
      "Restaurant and café websites with fast digital menus, table booking, direct WhatsApp ordering and Google Maps setup for restaurants in India.",
    headline: "Fill more tables and take orders without the commission.",
    intro:
      "Hungry customers decide in seconds. A fast menu, real photos, clear timings and a direct way to order or book bring them to you, and direct orders mean you keep more of every bill.",
    problems: [
      {
        title: "High commission on every order",
        text: "Delivery apps are useful, but their commission eats into your margin on repeat customers.",
        solution: "Direct ordering on WhatsApp and your own website, so regulars order from you and you keep the full bill.",
      },
      {
        title: "Menu is a blurry PDF",
        text: "Customers zoom into photos of a printed menu on their phone, then give up.",
        solution: "A fast digital menu with photos and prices that you can update from your phone in a minute.",
      },
      {
        title: "Table bookings by phone only",
        text: "Calls during rush hour get missed, and so do the bookings.",
        solution: "Online table booking and a WhatsApp assistant that confirms tables even during the dinner rush.",
      },
    ],
    solutions: [
      {
        title: "Restaurant website and digital menu",
        text: "A fast, mobile menu with photos and prices that you can update yourself.",
        service: "websites",
      },
      {
        title: "WhatsApp ordering assistant",
        text: "Customers ask questions and place orders on WhatsApp; you get a clean order summary.",
        service: "ai-chatbots",
      },
      {
        title: "Google Maps presence",
        text: "Accurate hours, menu link, photos and replies to reviews on your Google listing.",
        service: "seo-basics",
      },
    ],
    faqs: [
      {
        q: "Will this replace Swiggy and Zomato?",
        a: "Not completely, and it doesn’t need to. The goal is to move your regular customers to direct orders, where you keep the full margin, while the apps keep bringing new ones.",
      },
      {
        q: "Can I change menu prices myself?",
        a: "Yes. We set up the menu so you can update items, prices and availability from your phone.",
      },
      {
        q: "Can we add a QR code menu for tables?",
        a: "Yes. The same digital menu works from a QR code on each table.",
      },
    ],
    home: {
      key: "restaurant",
      label: "Restaurant",
      headline: "Fill more tables and take orders without the commission.",
      highlight: ["more", "tables"],
      subheadline:
        "A fast menu customers can actually read, table bookings and WhatsApp orders that go straight to you, and a Google listing that brings people in.",
      chatGreeting: "Hi! I’m a demo assistant for a sample restaurant. Ask me something a hungry customer would.",
      chat: [
        {
          id: "open",
          q: "Are you open right now?",
          a: "Yes! Kitchen is open till 11 pm today. Last orders for delivery at 10:30 pm.",
        },
        {
          id: "table",
          q: "Table for 6 tonight at 8?",
          a: "I can hold a table for 6 at 8 pm. Can I have a name and phone number for the booking?",
        },
        {
          id: "deliver",
          q: "Do you deliver to Gomti Nagar?",
          a: "Yes, within 6 km. Order here on WhatsApp and you pay no app charges.",
        },
        {
          id: "jain",
          q: "Jain food milega?",
          a: "Haan, Jain versions are available for most dishes. Just mention it with your order.",
        },
        {
          id: "menu",
          q: "Can I see the menu?",
          a: "Here’s the menu link with photos and prices. Today’s special is the dal makhani thali.",
        },
      ],
      package: {
        label: "website, digital menu + Google listing",
        type: "website",
        addons: ["seo"],
      },
    },
    services: ["websites", "ai-chatbots", "seo-basics", "landing-pages", "automation"],
    posts: ["what-an-ai-chatbot-can-and-cant-do"],
  },
  {
    slug: "real-estate",
    name: "Real estate",
    icon: "building",
    summary: "Property listings, project landing pages and fast lead follow-up for brokers and developers.",
    seoTitle: "Real Estate Websites and Lead Management",
    seoDescription:
      "Property listing websites, project landing pages, lead capture and instant WhatsApp follow-up for real estate brokers and developers in Lucknow and India.",
    headline: "Reply to property leads in minutes, not days.",
    intro:
      "In real estate, the first agent to reply usually gets the site visit. We build listing websites and project pages that capture serious buyers, and automations that put every lead in front of you straight away.",
    problems: [
      {
        title: "Leads from many portals",
        text: "Enquiries arrive from property portals, ads, calls and walk-ins, and nobody tracks them in one place.",
        solution: "Every enquiry from portals, ads and your website lands in one sheet or CRM, tagged by source.",
      },
      {
        title: "Slow follow-up",
        text: "A lead that waits a day for a callback has usually spoken to three other brokers.",
        solution:
          "Instant WhatsApp alert to the right salesperson the moment a lead comes in, plus an automatic first reply to the buyer.",
      },
      {
        title: "Listings look unprofessional",
        text: "Forwarded photos and long WhatsApp messages don’t build trust with buyers.",
        solution: "A clean listing website and project pages with photos, floor plans, price and RERA details.",
      },
    ],
    solutions: [
      {
        title: "Listing website",
        text: "Searchable properties with photos, location, price and a site-visit request button.",
        service: "websites",
      },
      {
        title: "Project landing pages",
        text: "A dedicated page for each project with floor plans, pricing and lead forms for your ads.",
        service: "landing-pages",
      },
      {
        title: "Instant lead alerts and follow-up",
        text: "Every new lead lands in one sheet or CRM and pings your team on WhatsApp immediately.",
        service: "automation",
      },
      {
        title: "Lead management app",
        text: "Track every buyer from first call to site visit to booking.",
        service: "web-apps",
      },
    ],
    faqs: [
      {
        q: "Can I add and edit properties myself?",
        a: "Yes. You get a simple admin panel to add properties, photos and prices and to mark them as sold.",
      },
      {
        q: "Can you connect leads from property portals?",
        a: "Where the portal allows it (email alerts or an export), we can bring those leads into the same sheet or CRM as your website leads.",
      },
      {
        q: "Do you mention RERA details?",
        a: "Yes. We add RERA registration numbers where they apply, as required for project advertising.",
      },
    ],
    home: {
      key: "real-estate",
      label: "Real estate",
      headline: "Reply to property leads in minutes, not days.",
      highlight: ["in", "minutes,"],
      subheadline:
        "Project landing pages that bring serious buyers, and instant lead alerts so your team is the first to call back.",
      chatGreeting: "Hello! I’m a demo assistant for a sample property project. Ask what buyers usually ask.",
      chat: [
        {
          id: "budget",
          q: "2BHK under ₹60 lakh?",
          a: "Yes, 2BHK units in this sample project start at ₹54 lakh. Shall I send the floor plan on WhatsApp?",
        },
        {
          id: "rera",
          q: "Is the project RERA registered?",
          a: "Yes. The RERA registration number is shown on the project page, and you can verify it on the UP RERA website.",
        },
        {
          id: "visit",
          q: "Can I visit this Sunday?",
          a: "Sunday 11 am and 4 pm site visits are open. Which time suits you?",
        },
        {
          id: "loan",
          q: "Do you help with home loans?",
          a: "Our team can connect you with partner banks. The final loan decision is always the bank’s.",
        },
        {
          id: "possession",
          q: "When is possession?",
          a: "The developer’s committed date is on the RERA page. I’ll ask the sales team to share the latest construction update.",
        },
      ],
      package: {
        label: "project landing page + instant lead alerts",
        type: "landing",
        addons: ["automation"],
      },
    },
    services: ["websites", "landing-pages", "automation", "web-apps", "ai-chatbots", "seo-basics"],
    posts: ["website-cost-in-india"],
  },
  {
    slug: "local-shops",
    name: "Local shops and services",
    icon: "store",
    summary: "Salons, gyms, boutiques, repair shops and more: get found nearby and take orders on WhatsApp.",
    seoTitle: "Websites and Google Listings for Local Businesses",
    seoDescription:
      "Affordable websites, WhatsApp catalogues, Google Business Profile setup and simple automation for local shops, salons, gyms and service businesses in India.",
    headline: "Get found by people nearby who are ready to buy.",
    intro:
      "Most local customers search on Google Maps, check photos and reviews, then message on WhatsApp. We make sure you show up properly at every step, without expensive tools you don’t need.",
    problems: [
      {
        title: "Invisible on Google Maps",
        text: "Your shop is around the corner but doesn’t show up when people search nearby.",
        solution: "A complete Google Business Profile with photos, hours and services, so you show up in “near me” searches.",
      },
      {
        title: "Catalogue lives in your phone gallery",
        text: "Sending photos one by one to every customer takes time and looks messy.",
        solution: "A simple online catalogue with prices and a WhatsApp order button, shared with one link.",
      },
      {
        title: "No repeat customer list",
        text: "You don’t have an easy way to tell regular customers about offers or new stock.",
        solution: "A customer list built with consent, so you can send offers and new stock updates the proper way.",
      },
    ],
    solutions: [
      {
        title: "Google Business Profile",
        text: "Complete listing with photos, services, hours and a plan to collect real reviews.",
        service: "seo-basics",
      },
      {
        title: "Simple website or catalogue",
        text: "Products or services with prices and a WhatsApp order button.",
        service: "websites",
      },
      {
        title: "Customer list and offers",
        text: "Collect customer numbers with consent and send offers through the proper WhatsApp channels.",
        service: "automation",
      },
    ],
    faqs: [
      {
        q: "I’m a small shop. Is a website worth it?",
        a: "Start with what pays off fastest: usually a complete Google Business Profile. A small website or catalogue is a good next step once people are finding you.",
      },
      {
        q: "Can customers order online?",
        a: "Yes. The simplest way is a catalogue with a WhatsApp order button. If you need cart and payments, we can build that too.",
      },
    ],
    home: {
      key: "shop",
      label: "Shop / Service",
      headline: "Get found by people nearby who are ready to buy.",
      highlight: ["nearby"],
      subheadline:
        "A complete Google listing, a simple website or catalogue with a WhatsApp order button, and an easy way to bring customers back.",
      chatGreeting: "Hi! I’m a demo assistant for a sample local shop. Ask me something a customer would.",
      chat: [
        {
          id: "sunday",
          q: "Is the shop open on Sunday?",
          a: "Yes, Sunday 11 am – 6 pm. Weekdays we’re open 10 am – 9 pm.",
        },
        {
          id: "stock",
          q: "Do you have this kurta in size M?",
          a: "Size M is in stock in blue and maroon. Should I keep one aside for you till evening?",
        },
        {
          id: "delivery",
          q: "Home delivery milegi?",
          a: "Haan, free delivery within 3 km on orders above ₹999.",
        },
        {
          id: "upi",
          q: "Can I pay by UPI?",
          a: "Yes, UPI, cards and cash are all fine.",
        },
        {
          id: "where",
          q: "Where exactly are you?",
          a: "Here’s the Google Maps pin. We’re next to the main market gate, with parking in front.",
        },
      ],
      package: {
        label: "website + Google listing setup",
        type: "website",
        addons: ["seo"],
      },
    },
    services: ["seo-basics", "websites", "automation", "web-apps"],
    posts: ["website-cost-in-india", "what-an-ai-chatbot-can-and-cant-do"],
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
