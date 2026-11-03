"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, type KeyboardEvent } from "react";
import { ChatDemo } from "@/components/ChatDemo";
import { Icon } from "@/components/Icon";
import { HeadlineReveal } from "@/components/motion/HeadlineReveal";
import { Eyebrow } from "@/components/ui/Section";
import { cn, formatINR } from "@/lib/utils";
import { useIndustry } from "./IndustryContext";

/** Pick a business type: the copy, photo, package and chatbot demo below all follow the choice. */
export function IndustryExplorer({ whatsappNumber }: { whatsappNumber: string }) {
  const { industries, active, select, changed } = useIndustry();
  const pillRefs = useRef<Array<HTMLButtonElement | null>>([]);

  // Radio-group keyboard pattern: arrows move and select
  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const i = industries.findIndex((x) => x.key === active.key);
    let next = i;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % industries.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + industries.length) % industries.length;
    else return;
    e.preventDefault();
    select(industries[next]!.key);
    pillRefs.current[next]?.focus();
  }

  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hi Tarkeon, I run a ${active.label.toLowerCase()} business. I tried the chatbot demo and want to talk to someone.`,
  )}`;

  const audience = active.name.toLowerCase();

  return (
    <section aria-labelledby="industry-question" className="py-section">
      <div className="container-site flex flex-col gap-16 lg:gap-24">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="flex flex-col gap-6">
            <Eyebrow>Made for your business</Eyebrow>
            <h2 id="industry-question" className="text-h2">
              What kind of business do you run?
            </h2>
            <div role="radiogroup" aria-labelledby="industry-question" onKeyDown={onKeyDown} className="flex flex-wrap gap-2">
              {industries.map((ind, i) => {
                const on = ind.key === active.key;
                return (
                  <button
                    key={ind.key}
                    ref={(el) => {
                      pillRefs.current[i] = el;
                    }}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    tabIndex={on ? 0 : -1}
                    onClick={() => select(ind.key)}
                    className={cn(
                      "inline-flex min-h-11 items-center gap-2 rounded-full border pr-3.5 pl-2 text-sm font-semibold transition-all duration-200 sm:min-h-12 sm:pr-4 sm:text-[0.9375rem]",
                      on
                        ? "border-accent bg-accent-soft text-accent shadow-[0_8px_20px_-10px_rgb(47_75_255/0.45)]"
                        : "border-line-strong bg-surface text-fg-2 hover:border-accent/50 hover:text-fg",
                    )}
                  >
                    <Image src={ind.photo.src} alt="" width={28} height={28} sizes="28px" className="size-7 rounded-full object-cover" />
                    {ind.label}
                  </button>
                );
              })}
            </div>

            {/* min-heights keep the layout steady when the copy changes */}
            <div aria-live="polite" className="flex flex-col gap-4">
              <HeadlineReveal key={active.key} as="h3" text={active.headline} highlight={active.highlight} className="min-h-[2.2em] text-h2" />
              <p key={`${active.key}-sub`} className={cn("max-w-xl text-lead text-muted md:min-h-[4.8em]", changed && "animate-fade-in")}>
                {active.subheadline}
              </p>
            </div>

            <Link
              href={active.packageHref}
              className="group inline-flex min-h-11 flex-wrap items-center gap-x-2 self-start rounded-md text-[0.9375rem] text-fg-2 hover:text-fg"
            >
              <Icon name="rupee" size={16} className="text-accent" />
              Typical package for a {active.label.toLowerCase()}:{" "}
              <span className="font-semibold text-fg">
                {active.packageLabel}, from {formatINR(active.packagePrice)}
              </span>
              <Icon name="arrow" size={16} className="text-accent transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="flex flex-col gap-5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-surface-2 shadow-card lg:aspect-[5/4]">
              <Image
                key={active.slug}
                src={active.photo.src}
                alt={active.photo.alt}
                fill
                sizes="(min-width: 1216px) 36rem, (min-width: 1024px) 46vw, 92vw"
                className={cn("object-cover", changed && "animate-fade-in")}
              />
              <span className="absolute bottom-3 left-3 rounded-full bg-surface/90 px-3 py-1 text-xs font-medium text-fg backdrop-blur">
                For {audience}
              </span>
            </div>
            <div className="rounded-2xl border border-line bg-surface p-5 shadow-card md:p-6">
              <p className="font-display text-lg font-semibold text-fg">What we’d build for {audience}</p>
              <ul key={active.key} className={cn("mt-4 grid gap-4 sm:grid-cols-2", changed && "animate-fade-in")}>
                {active.solutions.map((s) => (
                  <li key={s.title} className="flex gap-3">
                    <Icon name="check" size={18} strokeWidth={2.2} className="mt-0.5 shrink-0 text-success" />
                    <span className="flex flex-col gap-0.5">
                      <span className="text-[0.9375rem] font-medium text-fg">{s.title}</span>
                      <span className="text-sm text-muted">{s.text}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
          <div className="flex flex-col gap-4">
            <h3 className="text-h3">Try the assistant we’d build for {audience}</h3>
            <p className="max-w-xl text-lead text-muted">
              Tap a question to see how it replies. This one is a sample; yours is set up with your own details.
            </p>
            <ul className="flex flex-col gap-3 text-[0.9375rem] text-fg-2">
              {[
                "Answers in Hindi or English, day and night",
                "Trained on your own prices, timings and policies",
                "Hands real enquiries to you on WhatsApp",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2.5">
                  <Icon name="check" size={18} strokeWidth={2.2} className="shrink-0 text-success" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <ChatDemo
              key={active.key}
              qa={active.chat}
              greeting={active.chatGreeting}
              title={`Demo: ${active.label} assistant`}
              whatsappHref={whatsappHref}
            />
            <p className="text-center text-xs text-muted">
              A sample of the assistant we build, trained on your own prices, timings and policies.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
