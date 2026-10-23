# Tarkeon Website

Tarkeon ki official website: Next.js 15 (App Router), plain CSS, koi extra library nahi.

## 1. Apne computer pe chalao

Node.js 18.18 ya usse naya chahiye.

```bash
npm install
npm run dev
```

Browser mein http://localhost:3000 kholo.

## 2. Pehle ye details badlo

Sab kuch ek hi file mein hai: `lib/site.js`

- `whatsapp`: apna number, country code ke saath, bina + ke (jaise `919876543210`)
- `whatsappDisplay`: number jaisa dikhana hai
- `email` aur `url` (tarkeon.com ya tarkeon.in)
- `projects`: jab demo projects ban jayein, naam, problem/solution/result aur live link daalo.
  Screenshot `public/work/` folder mein rakho aur `image: "/work/naam.png"` likho.
- `testimonial`: pehle asli client ka review milne par bharo (tab tak `null` rehne do, section chhupa rahega)
- `plans`: prices badalni ho toh yahan

Rang badalna ho toh `app/globals.css` mein sabse upar `--accent` badlo.

## 3. Live karo (Vercel, free)

1. Code GitHub pe ek naye repo mein push karo
2. vercel.com pe GitHub se login karo → **Add New → Project** → apna repo chuno → **Deploy**
3. Project → **Settings → Domains** → `tarkeon.com` (ya .in) add karo
4. Vercel jo DNS records bataye (A record / CNAME), woh apne domain registrar ki DNS settings mein daalo
5. 10 minute se kuch ghante mein site tumhare domain pe live ho jayegi, HTTPS free milega

## Contact form kaise kaam karta hai

Form bhejne par visitor ka WhatsApp khulta hai, tumhare number pe pehle se likha message ke saath
(naam, number, kya chahiye). Isliye koi server ya database nahi chahiye.
Baad mein chaho toh isko email ya Google Sheet se bhi jod sakte hain.

## Files

Website mein 6 pages hain:

| Page | File |
| --- | --- |
| Home | `app/page.js` |
| Services | `app/services/page.js` |
| Our work | `app/work/page.js` |
| Pricing (FAQ ke saath) | `app/pricing/page.js` |
| About | `app/about/page.js` (apna naam, photo aur 2 lines bharo) |
| Contact | `app/contact/page.js` |

- `app/layout.js` — header, footer, WhatsApp button, fonts, SEO
- `app/globals.css` — saara design
- `components/` — header, footer, chatbot demo, FAQ, contact form, common sections
- `lib/site.js` — saara text aur details

About page ki photo: `public/founder.jpg` mein rakho aur `app/about/page.js` mein `[Photo]` wale div ko
`<img src="/founder.jpg" alt="Your name" className="founder-photo" />` se badal do.
