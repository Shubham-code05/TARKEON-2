"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/Icon";
import { buttonClasses } from "@/components/ui/Button";

const SESSION_KEY = "tk-exit-shown";

/**
 * Desktop only, once per session: when the cursor leaves through the top of the window,
 * offer the free website check. Small, non-blocking, easy to close.
 */
export function ExitIntent() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (pathname === "/contact") return;
    if (!window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches) return;
    try {
      if (window.sessionStorage.getItem(SESSION_KEY)) return;
    } catch {
      return;
    }
    const armedAt = Date.now();
    function onLeave(e: MouseEvent) {
      if (e.relatedTarget || e.clientY > 0 || Date.now() - armedAt < 8000) return;
      try {
        window.sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        // ignore
      }
      setOpen(true);
      document.removeEventListener("mouseout", onLeave);
    }
    document.addEventListener("mouseout", onLeave);
    return () => document.removeEventListener("mouseout", onLeave);
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
