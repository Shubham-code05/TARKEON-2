# Tarkeon Website

Tarkeon (web, AI and automation studio, Lucknow) ki official website.
Next.js 15 (App Router) + TypeScript (strict) + Tailwind CSS v4 + framer-motion. Blog MDX files se chalta hai.

## 1. Apne computer pe chalao

Node.js 18.18 ya naya chahiye.

```bash
npm install
cp .env.example .env.local   # Windows: copy .env.example .env.local
npm run dev                   # http://localhost:3000
```

Useful commands:

| Command | Kya karta hai |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build (deploy se pehle zaroor chalao) |
| `npm start` | Build kiya hua production server |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |
| `npm run qa` | Har page ke 390px aur 1440px screenshots `qa/` mein + overflow aur broken links check (pehle `npm run build && npm start` chalao) |

## 2. Environment variables

Sab `.env.example` mein likhe hain. Local ke liye `.env.local` mein, Vercel pe **Project → Settings → Environment Variables** mein daalo.

| Variable | Zaroori? | Kaam |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Haan | Asli domain, jaise `https://www.tarkeon.in`. Canonical URLs, sitemap aur OG images isi se bante hain. |
| `RESEND_API_KEY` | Haan (leads ke liye) | [resend.com](https://resend.com) ki API key. Lead aapko email hoti hai, aur client ko "Thanks, we'll reply within 1 working day" jaata hai. |
| `LEAD_TO_EMAIL` | Nahi | Leads kis email pe aayein. Default: `content/site.ts` wala email. |
| `LEAD_FROM_EMAIL` | Haan (Resend ke saath) | Bhejne wala address, jaise `Tarkeon <hello@tarkeon.in>`. Domain Resend mein verify hona chahiye (Resend → Domains → Add domain, phir DNS records daalo). |
| `GOOGLE_SHEET_WEBHOOK_URL` | Nahi | Har lead Google Sheet mein bhi jaaye. Setup: `docs/google-sheet-webhook.gs` ke upar likha hai. |
| `PAGESPEED_API_KEY` | Haan (website check ke liye) | Homepage ka "Free website check" isi se Google PageSpeed test chalata hai. Free key lene ka tareeka neeche hai. |
| `NEXT_PUBLIC_GA_ID` | Nahi | GA4 ID (`G-XXXXXXX`). Set karne par cookie banner dikhega aur GA sirf "Accept" ke baad load hoga. |

### PageSpeed API key (free) kaise lein

1. [console.cloud.google.com](https://console.cloud.google.com) pe Google account se login karo.
2. Upar project dropdown → **New Project** → naam (jaise `tarkeon-website`) → **Create**.
3. Search bar mein **PageSpeed Insights API** likho → kholo → **Enable**.
4. Left menu: **APIs & Services → Credentials → Create credentials → API key**. Key copy karo.
5. Key pe click karke **API restrictions → Restrict key → PageSpeed Insights API** chuno → **Save**. (Key sirf isi kaam aayegi.)
6. `.env.local` aur Vercel mein `PAGESPEED_API_KEY=<key>` daalo aur redeploy karo.

Ye API free hai (billing account ki zaroorat nahi). Free quota roz ke hazaaron checks ke liye kaafi hai. Bina key ke Google ka shared quota aksar khatam rehta hai, aur tab visitor ko "today's limit" wala message dikhega. Site pe har IP se 10 minute mein 4 checks ki limit hai, aur ek hi URL ka result 30 minute tak memory cache se aata hai.

**Production mein dhyaan do:** agar `RESEND_API_KEY` aur `GOOGLE_SHEET_WEBHOOK_URL` dono khaali hain, toh form visitor ko error dikhayega aur WhatsApp pe bhejega, taaki lead chupchaap gum na ho. Development mein lead terminal mein print hoti hai.

## 3. Saara content kahan hai

Pages kabhi text hardcode nahi karte. Sab `content/` folder se aata hai:

| File | Kya hai |
| --- | --- |
| `content/site.ts` | Naam, email, **WhatsApp number**, address, office hours, socials, founder, about page ki kahani, menu |
| `content/services.ts` | 6 services aur unke detail pages ka poora content (problems, deliverables, process, stack, price, FAQs) |
| `content/industries.ts` | 5 industries aur unke pages. `home` block: homepage hero ka pill label, URL key (`?for=clinic`), headline, chatbot demo ke sawaal-jawab aur typical package. Problems ke `solution` "Sound familiar?" cards mein dikhte hain. |
| `content/projects.ts` | Case studies (abhi khaali) |
| `content/testimonials.ts` | Client reviews (abhi khaali; khaali rahe toh section chhupa rehta hai) |
| `content/pricing.ts` | Plans, **cost calculator ke prices**, payment terms, pricing FAQs |
| `content/process.ts` | Process steps, client ko kya dena hai, guarantees, "Why Tarkeon" comparison |
| `content/faqs.ts` | Homepage FAQs, chatbot demo ke sawaal-jawab, form options |
| `content/blog/*.mdx` | Blog posts |

### Naya project (case study) kaise jodein

1. Screenshots `public/work/<project-slug>/` mein rakho (PNG/JPG, 1440×900 best hai).
2. `content/projects.ts` mein example copy karke ek object bharo.
3. `results` sirf asli, naape hue numbers ke saath bharo; warna hata do, section apne aap chhup jaayega.
   Optional: `featured: true` (homepage pe bada dikhega), `credit` (card pe credit line), aur `beforeAfter`
   (purani aur nayi site ke same size screenshots; homepage pe before/after slider tabhi dikhega).
4. Bas. `/work`, `/work/<slug>`, homepage "Recent work", related service/industry pages aur sitemap apne aap update ho jaate hain.

### Naya blog post kaise likhein

`content/blog/` mein nayi file banao, jaise `google-business-profile-guide.mdx`. File ka naam hi URL hoga (`/blog/google-business-profile-guide`).

```mdx
---
title: "Post ka title"
description: "Google aur social share ke liye 1–2 line"
date: "2026-11-15"
category: "Industry guides"      # same category wale posts saath dikhte hain
author: "Tarkeon team"
services: ["websites"]           # sidebar mein related services (services.ts ke slugs)
industries: ["clinics"]          # sidebar mein related industries
# updated: "2026-12-01"          # baad mein badlo toh
# draft: true                    # production mein chhupa rahega
---

Intro paragraph...

## Pehla heading (table of contents mein aata hai)

Text, **bold**, [internal link](/services/websites), lists aur tables sab chalte hain.
```

Reading time, table of contents, OG image, Article schema aur sitemap apne aap ban jaate hain. MDX mein `<` aur `{` seedhe mat likho (unhe words mein likho).

### Nayi service ya industry kaise jodein

`content/services.ts` (ya `industries.ts`) mein ek object jodo. Slug unique rakho, `icon` ke liye `components/Icon.tsx` ke naam mein se chuno. Detail page, mega-menu, footer, OG image, sitemap aur internal links apne aap ban jaate hain.

### Founder card, photo aur testimonials

- Founder: `content/site.ts` mein `founder` ka example uncomment karke bharo. Photo `public/team/founder.jpg` (square).
- Testimonials: `content/testimonials.ts` mein sirf asli reviews, client ki permission ke saath.

## 4. Vercel pe deploy

1. Code GitHub pe ek naye repo mein push karo.
2. [vercel.com](https://vercel.com) → **Add New → Project** → repo chuno. Framework apne aap "Next.js" detect hoga.
3. **Environment Variables** mein upar wale variables daalo, phir **Deploy**.
4. **Settings → Domains** mein `tarkeon.in` jodo aur Vercel jo DNS records bataye, woh registrar pe daalo.
5. **Analytics** aur **Speed Insights** tab mein dono enable karo (code pehle se laga hai, sirf Vercel pe chalta hai).
6. Live hone ke baad [Google Search Console](https://search.google.com/search-console) mein domain verify karo aur `https://www.tarkeon.in/sitemap.xml` submit karo.
7. [PageSpeed Insights](https://pagespeed.web.dev) pe home, ek service page aur ek blog page check karo.

Preview deployments pe `robots.txt` indexing block karta hai; sirf production Google mein jaata hai.

## 5. Images

Saari images `public/images/` mein hain. Stock photos ke sources `public/images/CREDITS.md` mein.

- **Project screenshots:** `content/projects.ts` mein project ka `liveUrl` daalo aur `npm run capture` chalao (ya `npm run capture -- <slug>` ek project ke liye). Desktop aur mobile screenshots `public/images/work/` mein save hote hain, 250 KB se chhote, aur `DeviceMockup` har jagah apne aap dikhane lagta hai.
- **Founder photo:** apni photo `public/images/about/founder.jpg` pe rakho (square, kam se kam 400x400). Rebuild ke baad /about aur /contact pe "T" wale circle ki jagah apne aap dikhegi.
- **Industry photos:** `content/industry-photos.ts` mein list hain. Inhe kabhi team, office ya client ki tarah mat dikhana.

## 6. Folder structure

```
app/                 Pages (har folder = ek URL), actions.ts (form backend), sitemap, robots, OG images
components/ui/       Design system: Button, Card, Section, Badge, BrowserFrame, Accordion, Tabs, Breadcrumbs, CtaBand
components/sections/ Page sections: PageHero, cards, FAQ, timeline, comparison, testimonials
components/forms/    Contact, cost calculator, careers forms
components/layout/   Header (mega-menu), footer, WhatsApp button, mobile action bar, exit-intent card, cookie consent
components/home/     Homepage: personalised hero, website check, bento, calculator, timeline, FAQ
components/brand/    Tark network animation (canvas), section divider, cursor spotlight
components/motion/   Reveal (scroll fade-up), marquee, headline reveal
content/             Saara business data aur blog
lib/                 Helpers: SEO metadata, JSON-LD schema, blog loader, leads (email/sheet), estimate, site check, rate limit
docs/                Google Sheet webhook (Apps Script)
scripts/             QA screenshot script
```

Design tokens (colours, type scale, radius, shadows) `app/globals.css` ke `@theme` block mein hain.
