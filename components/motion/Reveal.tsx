"use client";

import { m, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds before the animation starts, for staggering siblings. */
  delay?: number;
  as?: "div" | "li" | "article";
};

/** Fades and lifts content in once when it scrolls into view. Use below the fold only. */
export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const reduce = useReducedMotion();
  const Component = as === "li" ? m.li : as === "article" ? m.article : m.div;
  return (
    <Component
      className={className}
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}
