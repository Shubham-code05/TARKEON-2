"use client";

import Image from "next/image";
import { useState } from "react";

type BeforeAfterProps = {
  name: string;
  before: { src: string; alt: string };
  after: { src: string; alt: string };
  width: number;
  height: number;
};

/** Old vs new comparison. A native range input drives it, so it works with keyboard and touch. */
export function BeforeAfter({ name, before, after, width, height }: BeforeAfterProps) {
  const [pos, setPos] = useState(50);
  return (
    <div className="flex flex-col gap-4">
      <div className="relative overflow-hidden rounded-2xl border border-line-strong bg-surface shadow-card" style={{ aspectRatio: `${width} / ${height}` }}>
        <Image src={after.src} alt={after.alt} fill sizes="(min-width: 1216px) 1168px, 100vw" className="object-cover object-top" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Image src={before.src} alt={before.alt} fill sizes="(min-width: 1216px) 1168px, 100vw" className="object-cover object-top" />
        </div>
        <span aria-hidden="true" className="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.6)]" style={{ left: `${pos}%` }}>
          <span className="absolute top-1/2 left-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-lg">
            ⇆
          </span>
        </span>
        <span className="absolute top-3 left-3 rounded-full bg-bg/80 px-3 py-1 text-xs font-medium text-fg">Before</span>
        <span className="absolute top-3 right-3 rounded-full bg-brand px-3 py-1 text-xs font-medium text-white">After</span>
      </div>
      <label className="flex flex-col gap-2 text-sm text-muted">
        <span>Drag to compare the old and new {name}</span>
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          className="h-2 w-full cursor-pointer accent-accent"
        />
      </label>
    </div>
  );
}
