"use client";

import { useEffect } from "react";

/**
 * One delegated pointer listener for the whole site: any element with the
 * "spotlight" class gets --x / --y set so its glow follows the cursor.
 * Only on devices with a precise pointer, and never under reduced motion.
 */
export function SpotlightEffect() {
  useEffect(() => {
    const ok = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches;
    if (!ok) return;
    let frame = 0;
    function onMove(e: PointerEvent) {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const card = (e.target as Element | null)?.closest?.<HTMLElement>(".spotlight");
        if (!card) return;
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--x", `${e.clientX - rect.left}px`);
        card.style.setProperty("--y", `${e.clientY - rect.top}px`);
      });
    }
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);
  return null;
}
