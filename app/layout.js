import { Inter, Space_Grotesk } from "next/font/google";
import { site } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Icon from "@/components/Icon";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const grotesk = Space_Grotesk({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-display", display: "swap" });

const description =
  "Tarkeon builds fast websites, custom web apps and AI chatbots for coaching institutes, clinics, restaurants and local businesses in Lucknow and across India.";

export const metadata = {
  metadataBase: new URL(site.url),
  title: "Tarkeon — Websites, AI Chatbots and Automation | Lucknow",
  description,
  keywords: ["website design Lucknow", "web developer Lucknow", "AI chatbot for business", "WhatsApp chatbot", "business automation India"],
  openGraph: {
    title: "Tarkeon — Web, AI and Automation",
    description,
    url: site.url,
    siteName: "Tarkeon",
    locale: "en_IN",
    type: "website",
  },
  alternates: { canonical: "/" },
};

export const viewport = {
  themeColor: "#0B0D12",
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    url: site.url,
    email: site.email,
    description,
    address: { "@type": "PostalAddress", addressLocality: "Lucknow", addressRegion: "Uttar Pradesh", addressCountry: "IN" },
  };

  return (
    <html lang="en" className={`${inter.variable} ${grotesk.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <a
          href={`https://wa.me/${site.whatsapp}`}
          className="wa-float"
          target="_blank"
          rel="noreferrer"
          aria-label="Chat with Tarkeon on WhatsApp"
        >
          <Icon name="whatsapp" size={26} strokeWidth={1.8} />
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
