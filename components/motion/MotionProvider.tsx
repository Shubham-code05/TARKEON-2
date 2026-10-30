"use client";

import { LazyMotion, MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

const loadFeatures = () => import("./features").then((mod) => mod.default);

/**
 * Loads the small DOM animation feature set after the page has rendered
 * (not in the first JS bundle) and follows the visitor's "reduce motion" setting.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
