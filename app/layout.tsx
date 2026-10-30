import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/JsonLd";
import { SpotlightEffect } from "@/components/brand/SpotlightEffect";
import { ConsentAnalytics } from "@/components/layout/ConsentAnalytics";
import { ExitIntent } from "@/components/layout/ExitIntent";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { site } from "@/content/site";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import "./globals.css";

// "optional": no late font swap, so no layout shift and no delayed LCP repaint
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "optional" });
const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-grotesk",
  // Brand display font: always shown (swap). It is small and preloaded; headline boxes reserve
  // their height so the swap doesn't move the page.
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Tarkeon | Websites, AI Chatbots and Automation in Lucknow",
    template: "%s | Tarkeon",
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    title: "Tarkeon | Websites, AI Chatbots and Automation",
    description: site.description,
    url: "/",
    siteName: site.name,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tarkeon | Websites, AI Chatbots and Automation",
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  colorScheme: "light",
};

const gaId = process.env.NEXT_PUBLIC_GA_ID;
// Vercel Analytics scripts only exist on Vercel deployments
const onVercel = Boolean(process.env.VERCEL);

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${grotesk.variable}`}>
      <body className="flex min-h-dvh flex-col pb-[4.5rem] md:pb-0">
        <a
          href="#main"
          className="fixed top-3 left-3 z-[100] -translate-y-24 rounded-md bg-accent px-4 py-2.5 font-semibold text-white focus:translate-y-0"
        >
          Skip to content
        </a>
        <MotionProvider>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <WhatsAppFloat />
          <MobileActionBar />
          <ExitIntent />
        </MotionProvider>
        <SpotlightEffect />
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        {onVercel && (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        )}
        {gaId && <ConsentAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}
