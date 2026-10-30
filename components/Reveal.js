"use client";

// Scroll karke dikhne par halka fade-up. JS na chale ya reduced motion ho toh
// content seedha dikhta hai; jo pehle se screen pe hai wo bhi bina animation ke.
import { useEffect, useRef, useState } from "react";

export default function Reveal({ as: Tag = "div", className = "", children, ...rest }) {
  const ref = useRef(null);
  const [state, setState] = useState("static");

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    setState("hidden");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("shown");
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const cls = state === "static" ? "" : state === "hidden" ? "reveal" : "reveal is-shown";
  return (
    <Tag ref={ref} className={`${className} ${cls}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}
