"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Plays the <Reveal> entrance animation for elements that scroll into view.
 * Elements already on screen when the page loads are left alone (no flash), and nothing is ever
 * hidden before the animation is triggered, so content can't get stuck invisible.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const seen = new WeakSet<Element>();
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const el = entry.target as HTMLElement;
        if (!seen.has(el)) {
          // First report for this element: if it's already visible, it stays as it is
          seen.add(el);
          if (entry.isIntersecting) io.unobserve(el);
          continue;
        }
        if (entry.isIntersecting) {
          // Animate only while it is still entering at the bottom edge. If it is already well on screen
          // (fast scroll, anchor jump, slow device), leave it be rather than blink it out and back in.
          if (el.getBoundingClientRect().top > window.innerHeight * 0.8) el.dataset.reveal = "play";
          io.unobserve(el);
        }
      }
    });

    document.querySelectorAll<HTMLElement>('[data-reveal=""]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
