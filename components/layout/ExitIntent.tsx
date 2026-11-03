"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/Icon";
import { buttonClasses } from "@/components/ui/Button";

const SESSION_KEY = "tk-exit-shown";
const MIN_TIME_MS = 15_000;

// Fallback for when sessionStorage is blocked (private mode, strict cookie settings):
// still show at most once per page load.
let shownWithoutStorage = false;

function alreadyShown(): boolean {
  try {
    return window.sessionStorage.getItem(SESSION_KEY) === "1" || shownWithoutStorage;
  } catch {
    return shownWithoutStorage;
  }
}

function markShown() {
  shownWithoutStorage = true;
  try {
    window.sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    // storage blocked: the in-memory flag above covers this page load
  }
}

/**
 * Desktop only (1024px+, mouse), once per session. Shows only after 15 seconds on the page,
 * and only when the cursor then leaves through the top of the window (towards tabs or the address bar).
 * Never on page load, never on touch devices or /contact. Closes with Esc or the close button.
 * Scrolling no longer counts as engagement: pages opened at an anchor (/#website-check) or
 * short pages reached the scroll threshold instantly, so the popup felt like it opened on load.
 */
export function ExitIntent() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (pathname === "/contact") return;
    if (!window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches) return;
    if (alreadyShown()) return;

    let engaged = false;
    const timer = window.setTimeout(() => {
      engaged = true;
    }, MIN_TIME_MS);

    function onLeave(e: MouseEvent) {
      // Only a real exit: the cursor left the document (no element it moved to) through the top edge
      if (!engaged || e.relatedTarget !== null || e.clientY > 0) return;
      if (!window.matchMedia("(min-width: 1024px)").matches || alreadyShown()) return;
      markShown();
      setOpen(true);
      cleanup();
    }

    function cleanup() {
      window.clearTimeout(timer);
      document.removeEventListener("mouseout", onLeave);
    }

    document.addEventListener("mouseout", onLeave);
    return cleanup;
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-labelledby="exit-title"
      className="fixed right-6 bottom-28 z-50 w-[22rem] animate-fade-in rounded-xl border border-line-strong bg-surface/95 p-5 shadow-glow backdrop-blur-xl"
    >
      <button
        ref={closeRef}
        type="button"
        onClick={() => setOpen(false)}
        aria-label="Close"
        className="absolute top-2 right-2 flex size-11 items-center justify-center rounded-md text-muted hover:bg-surface-2 hover:text-fg"
      >
        <Icon name="x" size={18} />
      </button>
      <p id="exit-title" className="pr-10 font-display text-lg font-semibold text-fg">
        Before you go: check your website free
      </p>
      <p className="mt-2 text-sm text-fg-2">Google’s speed and SEO scores for your site, plus the biggest problems in plain English. Takes about 20 seconds.</p>
      <Link href="/#website-check" onClick={() => setOpen(false)} className={buttonClasses("primary", "md", "mt-4 w-full")}>
        Check my website <Icon name="arrow" size={16} />
      </Link>
    </div>
  );
}
