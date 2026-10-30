"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type TarkNetworkProps = {
  className?: string;
  /** "full" for the hero, "lite" for small boxes such as loading states. */
  variant?: "full" | "lite";
  /** "ink" for white backgrounds, "inverse" for the brand gradient. */
  tone?: "ink" | "inverse";
};

type Node = { x: number; y: number; vx: number; vy: number; r: number; hub: boolean };

// Faint on white so the animation never competes with the text above it
const tones = {
  ink: { rgb: "47,75,255", link: 0.15, hubLink: 0.2, node: 0.18, hub: 0.2, floor: 0.45 },
  inverse: { rgb: "255,255,255", link: 0.32, hubLink: 0.55, node: 0.85, hub: 0.9, floor: 0 },
};

/**
 * The Tark network: nodes drifting and joining with lines, "business meets technology".
 * Canvas, no libraries. Pauses when off-screen or the tab is hidden, uses fewer nodes and a
 * lower frame rate on small screens, starts after the browser is idle, and draws a single
 * still frame for visitors who prefer reduced motion.
 */
export function TarkNetwork({ className, variant = "full", tone = "ink" }: TarkNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const ink = tones[tone];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.innerWidth < 768;
    const lite = variant === "lite" || small;
    const dpr = Math.min(window.devicePixelRatio || 1, small ? 1 : 1.5);
    const frameGap = lite ? 1000 / 30 : 0; // ~30 fps on small screens and in lite mode

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let linkDist = 0;
    let raf = 0;
    let last = 0;
    let visible = false;
    let started = false;

    function seed() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const area = width * height;
      const count = Math.round(Math.min(lite ? 26 : 64, Math.max(10, area / (lite ? 16000 : 15000))));
      linkDist = lite ? 110 : 150;
      const speed = reduce ? 0 : 0.18;
      nodes = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        r: i % 9 === 0 ? 2.6 : 1.4,
        hub: i % 9 === 0,
      }));
    }

    function color(alpha: number) {
      return `rgba(${ink.rgb},${alpha})`;
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]!;
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]!;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > linkDist * linkDist) continue;
          const fade = ink.floor + (1 - ink.floor) * (1 - Math.sqrt(d2) / linkDist);
          const alpha = fade * (a.hub || b.hub ? ink.hubLink : ink.link);
          ctx!.strokeStyle = color(alpha);
          ctx!.lineWidth = a.hub || b.hub ? 1 : 0.7;
          ctx!.beginPath();
          ctx!.moveTo(a.x, a.y);
          ctx!.lineTo(b.x, b.y);
          ctx!.stroke();
        }
      }
      for (const n of nodes) {
        ctx!.fillStyle = color(n.hub ? ink.hub : ink.node);
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    function step(now: number) {
      raf = requestAnimationFrame(step);
      if (frameGap && now - last < frameGap) return;
      last = now;
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      }
      draw();
    }

    function play() {
      if (reduce || raf || !visible || document.hidden) return;
      raf = requestAnimationFrame(step);
    }
    function pause() {
      cancelAnimationFrame(raf);
      raf = 0;
    }

    function start() {
      started = true;
      seed();
      draw();
      play();
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      if (visible && started) play();
      else pause();
    });
    io.observe(canvas);

    const ro = new ResizeObserver(() => {
      if (!started) return;
      seed();
      draw();
    });
    ro.observe(canvas);

    const onVisibility = () => (document.hidden ? pause() : play());
    document.addEventListener("visibilitychange", onVisibility);

    // Wait until the browser is idle so the animation never competes with the first paint
    const idle =
      "requestIdleCallback" in window
        ? window.requestIdleCallback(start, { timeout: 1500 })
        : (setTimeout(start, 300) as unknown as number);

    return () => {
      pause();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      if ("cancelIdleCallback" in window) window.cancelIdleCallback(idle);
      else clearTimeout(idle);
    };
  }, [variant, tone]);

  return <canvas ref={canvasRef} aria-hidden="true" className={cn("pointer-events-none block h-full w-full", className)} />;
}
