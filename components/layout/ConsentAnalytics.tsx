"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";

const STORAGE_KEY = "tk-analytics-consent";
type Consent = "granted" | "denied" | null;

function readConsent(): Consent {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

/**
 * Google Analytics 4, loaded only after the visitor accepts.
 * Rendered only when NEXT_PUBLIC_GA_ID is set, so without it there is no banner and no GA code.
 */
export function ConsentAnalytics({ gaId }: { gaId: string }) {
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setConsent(readConsent());
    setReady(true);
  }, []);

  function choose(value: "granted" | "denied") {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // Storage blocked: the choice still applies for this visit
    }
    setConsent(value);
  }

  return (
    <>
      {consent === "granted" && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}',{anonymize_ip:true});`}
          </Script>
        </>
      )}
      {ready && consent === null && (
        <div
          role="region"
          aria-label="Cookie consent"
          className="fixed inset-x-3 bottom-24 z-50 mx-auto max-w-xl rounded-xl border border-line-strong bg-surface/95 p-5 shadow-glow backdrop-blur-xl sm:bottom-6 sm:left-6 sm:right-auto"
        >
          <p className="text-sm text-fg-2">
            We’d like to use Google Analytics cookies to understand which pages are useful. No ads, no selling data.{" "}
            <Link href="/privacy-policy" className="text-accent underline underline-offset-2 hover:text-accent-hover">
              Privacy policy
            </Link>
          </p>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={() => choose("granted")}
              className="min-h-11 flex-1 rounded-md bg-accent px-4 text-sm font-semibold text-white hover:bg-accent-hover"
            >
              Accept
            </button>
            <button
              type="button"
              onClick={() => choose("denied")}
              className="min-h-11 flex-1 rounded-md border border-line-strong px-4 text-sm font-semibold text-fg hover:bg-surface-2"
            >
              Decline
            </button>
          </div>
        </div>
      )}
    </>
  );
}
