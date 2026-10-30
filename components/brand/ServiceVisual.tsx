import type { ReactNode } from "react";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/utils";

// Small live visuals for each service. CSS and SVG only; they stop under reduced motion.

const panel = "rounded-lg border border-line-strong bg-surface-2";

function MiniBrowser() {
  return (
    <div className={cn("w-full overflow-hidden", panel)}>
      <div className="flex gap-1 border-b border-line px-3 py-2" aria-hidden="true">
        <span className="size-1.5 rounded-full bg-fg/20" />
        <span className="size-1.5 rounded-full bg-fg/20" />
        <span className="size-1.5 rounded-full bg-fg/20" />
      </div>
      <div className="grid grid-cols-[1.4fr_1fr] gap-3 p-4">
        <div className="flex flex-col gap-2">
          <span className="h-3 w-4/5 rounded bg-fg/80" />
          <span className="h-3 w-3/5 rounded bg-brand" />
          <span className="mt-1 h-1.5 w-full rounded bg-fg/15" />
          <span className="h-1.5 w-11/12 rounded bg-fg/15" />
          <span className="mt-2 inline-flex h-6 w-24 animate-[cta-pulse_2.4s_ease-in-out_infinite] items-center justify-center rounded-md bg-whatsapp text-[0.6rem] font-semibold text-white">
            WhatsApp us
          </span>
        </div>
        <div className="rounded-md bg-gradient-to-br from-accent/40 to-accent-2/30" />
      </div>
    </div>
  );
}

function MiniChat() {
  const lines: { me: boolean; w: string; animate?: boolean }[] = [
    { me: true, w: "w-3/5" },
    { me: false, w: "w-4/5" },
    { me: true, w: "w-2/5" },
    { me: false, w: "w-3/4" },
    { me: true, w: "w-1/2", animate: true },
    { me: false, w: "w-4/5", animate: true },
  ];
  return (
    <div className={cn("flex h-full min-h-56 w-full flex-col justify-end gap-2.5 overflow-hidden p-4", panel)}>
      <span className="mb-auto flex shrink-0 items-center gap-2 border-b border-line pb-3 text-[0.7rem] text-muted">
        <span className="size-1.5 rounded-full bg-success" /> Assistant · online 24×7
      </span>
      {lines.map((l, i) => (
        <span
          key={i}
          className={cn(
            "h-6 shrink-0 rounded-xl",
            l.w,
            l.me ? "self-end rounded-br-sm bg-accent" : "self-start rounded-bl-sm bg-surface-3",
            l.animate && "animate-[bubble_6s_ease-in-out_infinite] opacity-0",
          )}
          style={l.animate ? { animationDelay: `${(i - 4) * 1.2}s` } : undefined}
        />
      ))}
      <span className="mt-1 flex shrink-0 items-center gap-1 self-start rounded-xl bg-surface-3 px-3 py-2" aria-hidden="true">
        {[0, 1, 2].map((d) => (
          <span key={d} className="size-1.5 animate-bounce rounded-full bg-muted" style={{ animationDelay: `${d * 140}ms` }} />
        ))}
      </span>
    </div>
  );
}

function MiniDashboard() {
  const bars = [40, 65, 50, 80, 60, 92];
  return (
    <div className={cn("flex w-full flex-col gap-3 p-4", panel)}>
      <div className="flex items-baseline justify-between">
        <span className="text-[0.65rem] text-muted">Fees collected</span>
        <span className="font-display text-sm font-semibold text-success-ink">↑ this month</span>
      </div>
      <div className="flex h-20 items-end gap-2">
        {bars.map((h, i) => (
          <span
            key={i}
            className="flex-1 origin-bottom animate-[grow_3.6s_ease-in-out_infinite] rounded-t bg-gradient-to-t from-accent to-accent-2"
            style={{ height: `${h}%`, animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}

function MiniFlow() {
  const steps: { icon: "chat" | "file" | "whatsapp"; label: string }[] = [
    { icon: "chat", label: "New lead" },
    { icon: "file", label: "Sheet" },
    { icon: "whatsapp", label: "Alert" },
  ];
  return (
    <div className={cn("relative flex w-full items-center justify-between px-4 py-6", panel)}>
      <span aria-hidden="true" className="absolute inset-x-10 top-1/2 h-px -translate-y-3 bg-line-strong" />
      <span aria-hidden="true" className="absolute inset-x-10 top-1/2 -translate-y-[0.95rem]">
        <span className="block w-full animate-[flow_2.8s_ease-in-out_infinite]">
          <span className="block size-2 -translate-x-1 rounded-full bg-accent-2 shadow-[0_0_8px_rgb(124_58_237/0.6)]" />
        </span>
      </span>
      {steps.map((s) => (
        <span key={s.label} className="relative flex flex-col items-center gap-2">
          <span className="flex size-10 items-center justify-center rounded-full border border-line-strong bg-surface text-accent">
            <Icon name={s.icon} size={18} />
          </span>
          <span className="text-[0.65rem] text-muted">{s.label}</span>
        </span>
      ))}
    </div>
  );
}

function MiniLanding() {
  return (
    <div className={cn("relative flex w-full flex-col items-center gap-2 p-4", panel)}>
      <span className="h-3 w-3/4 rounded bg-fg/80" />
      <span className="h-1.5 w-2/3 rounded bg-fg/15" />
      <span className="mt-2 h-7 w-28 rounded-md bg-accent" />
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="absolute right-[30%] bottom-3 size-5 animate-[tap_2.4s_ease-in-out_infinite] fill-fg drop-shadow"
      >
        <path d="M5 3l14 8-6 2-2 6z" />
      </svg>
    </div>
  );
}

function MiniSearch() {
  return (
    <div className={cn("flex w-full flex-col gap-2 p-4", panel)}>
      <span className="flex items-center gap-2 rounded-full border border-line-strong bg-surface px-3 py-1.5 text-[0.7rem] text-fg-2">
        <Icon name="search" size={12} /> clinic near me
      </span>
      <span className="flex animate-[rise_4s_ease-in-out_infinite] items-center gap-2 rounded-md border border-accent/40 bg-accent-soft p-2">
        <Icon name="map-pin" size={14} className="text-accent" />
        <span className="flex flex-1 flex-col gap-1">
          <span className="h-1.5 w-2/3 rounded bg-fg/80" />
          <span className="h-1 w-1/2 rounded bg-fg/25" />
        </span>
      </span>
      {[0, 1].map((i) => (
        <span key={i} className="flex items-center gap-2 p-2 opacity-60">
          <Icon name="map-pin" size={14} className="text-muted" />
          <span className="h-1.5 w-1/2 rounded bg-fg/25" />
        </span>
      ))}
    </div>
  );
}

function MiniStore() {
  return (
    <div className={cn("flex w-full flex-col gap-3 p-4", panel)}>
      <div className="flex items-center justify-between">
        <span className="h-2 w-20 rounded bg-fg/80" />
        <span className="flex items-center gap-1 rounded-full bg-accent px-2 py-1 text-[0.6rem] font-semibold text-white">
          <Icon name="store" size={10} /> Cart 2
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {["from-accent/40 to-accent-2/30", "bg-surface-3", "from-accent-2/30 to-accent/20"].map((tile) => (
          <span key={tile} className="flex flex-col gap-1.5 rounded-md border border-line bg-surface p-1.5">
            <span className={cn("aspect-[4/3] rounded bg-gradient-to-br", tile)} />
            <span className="h-1 w-4/5 rounded bg-fg/25" />
            <span className="h-1.5 w-1/2 rounded bg-accent/70" />
          </span>
        ))}
      </div>
    </div>
  );
}

function MiniSocial() {
  const tiles = [
    "bg-gradient-to-br from-accent to-accent-2",
    "bg-accent-soft",
    "bg-surface-3",
    "bg-accent-soft",
    "bg-surface-3",
    "bg-gradient-to-br from-accent-2 to-accent",
  ];
  return (
    <div className={cn("flex w-full flex-col gap-3 p-4", panel)}>
      <div className="flex items-center gap-2">
        <span className="size-6 rounded-full bg-brand" />
        <span className="h-2 w-20 rounded bg-fg/80" />
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {tiles.map((tile, i) => (
          <span key={i} className={cn("aspect-square rounded-md", tile)} />
        ))}
      </div>
    </div>
  );
}

function MiniAds() {
  return (
    <div className={cn("grid w-full grid-cols-[1.2fr_1fr] gap-3 p-4", panel)}>
      <div className="flex flex-col gap-2 rounded-md border border-line bg-surface p-3">
        <span className="self-start rounded bg-accent-soft px-1.5 py-0.5 text-[0.6rem] font-semibold text-accent">Sponsored</span>
        <span className="h-2 w-4/5 rounded bg-fg/80" />
        <span className="h-1.5 w-full rounded bg-fg/15" />
        <span className="mt-1 h-5 w-16 rounded bg-accent" />
      </div>
      <svg viewBox="0 0 100 80" className="h-full w-full" fill="none">
        <path d="M2 70 L24 56 L46 60 L68 32 L98 12" stroke="var(--color-accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="98" cy="12" r="3.5" fill="var(--color-accent-2)" />
      </svg>
    </div>
  );
}

const visuals: Record<string, ReactNode> = {
  websites: <MiniBrowser />,
  ecommerce: <MiniStore />,
  "ai-chatbots": <MiniChat />,
  "web-apps": <MiniDashboard />,
  automation: <MiniFlow />,
  "landing-pages": <MiniLanding />,
  "seo-basics": <MiniSearch />,
  "social-media": <MiniSocial />,
  ads: <MiniAds />,
};

export function ServiceVisual({ slug }: { slug: string }) {
  return <>{visuals[slug]}</>;
}
