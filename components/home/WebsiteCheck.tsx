"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { TarkNetwork } from "@/components/brand/TarkNetwork";
import { Icon } from "@/components/Icon";
import { Button, buttonClasses } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useCountUp } from "./useCountUp";

type Result = {
  url: string;
  scores: { performance: number; seo: number; accessibility: number; bestPractices: number };
  issues: { id: string; title: string; detail: string; category: string }[];
};

type State =
  | { status: "idle" }
  | { status: "loading"; url: string }
  | { status: "done"; result: Result }
  | { status: "error"; message: string };

const loadingSteps = [
  "Opening your site on a mid-range phone…",
  "Measuring how fast it shows up…",
  "Checking what Google sees…",
  "Checking it’s easy to read and tap…",
  "Writing up the results…",
];

/** `still` shows the final number straight away (used by the sample report, so it is right before hydration too). */
function ScoreRing({ label, score, still = false }: { label: string; score: number; still?: boolean }) {
  const value = useCountUp(score, 1100, still ? score : 0);
  const r = 34;
  const circumference = 2 * Math.PI * r;
  const tone = score >= 90 ? "var(--color-success-ink)" : score >= 50 ? "var(--color-warning)" : "var(--color-danger)";
  const verdict = score >= 90 ? "Good" : score >= 50 ? "Needs work" : "Poor";
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <div className="relative size-24">
        <svg viewBox="0 0 80 80" className="size-24 -rotate-90" aria-hidden="true">
          <circle cx="40" cy="40" r={r} fill="none" stroke="var(--color-line)" strokeWidth="6" />
          <circle
            cx="40"
            cy="40"
            r={r}
            fill="none"
            stroke={tone}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - value / 100)}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-display text-2xl font-bold text-fg tabular-nums">
          {value}
        </span>
      </div>
      <p className="text-sm font-medium text-fg">{label}</p>
      <p className="text-xs" style={{ color: tone }}>
        {verdict}
      </p>
      <span className="sr-only">
        {label}: {score} out of 100, {verdict}
      </span>
    </div>
  );
}

const sampleScores = [
  { label: "Speed", score: 41 },
  { label: "SEO", score: 76 },
  { label: "Accessibility", score: 88 },
  { label: "Best practices", score: 93 },
];

const sampleIssues = [
  { title: "Main content takes over 4 seconds to appear on mobile", category: "Speed" },
  { title: "Images are much larger than they need to be", category: "Speed" },
  { title: "Page has no meta description for Google", category: "SEO" },
];

function IssueRow({ n, title, category, detail }: { n: number; title: string; category: string; detail?: string }) {
  return (
    <li className="flex gap-4 rounded-lg border border-line bg-surface-2/60 p-4">
      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-danger/15 text-sm font-semibold text-danger">{n}</span>
      <div className="flex flex-col gap-1">
        <p className="font-medium text-fg">
          {title} <span className="ml-1 text-xs font-normal text-muted">· {category}</span>
        </p>
        {detail && <p className="text-sm text-muted">{detail}</p>}
      </div>
    </li>
  );
}

/** What the report looks like, shown until the visitor runs their own check. Clearly labelled as an example. */
function SampleReport() {
  return (
    <div className="flex flex-col gap-7 p-5 md:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <p className="text-sm text-muted">Example report for</p>
          <p className="font-display text-lg font-semibold text-fg">example.com</p>
        </div>
        <span className="rounded-full border border-line-strong bg-surface-2 px-3 py-1 text-xs font-semibold tracking-[0.08em] text-fg-2 uppercase">
          Sample report
        </span>
      </div>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
        {sampleScores.map((s) => (
          <ScoreRing key={s.label} label={s.label} score={s.score} still />
        ))}
      </div>
      <div className="flex flex-col gap-3">
        <p className="font-display text-lg font-semibold text-fg">Biggest problems found</p>
        <ol className="flex flex-col gap-3">
          {sampleIssues.map((issue, i) => (
            <IssueRow key={issue.title} n={i + 1} title={issue.title} category={issue.category} />
          ))}
        </ol>
      </div>
      <p className="text-xs text-muted">Example scores only. Your own results from Google PageSpeed Insights appear here after the check.</p>
    </div>
  );
}

/** Left: the section heading and the form. Right: a sample report, replaced by the live result. */
export function WebsiteCheck({ whatsappNumber, header }: { whatsappNumber: string; header?: ReactNode }) {
  const [state, setState] = useState<State>({ status: "idle" });
  const [url, setUrl] = useState("");
  const [step, setStep] = useState(0);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.status !== "loading") return;
    setStep(0);
    const t = setInterval(() => setStep((s) => Math.min(s + 1, loadingSteps.length - 1)), 6000);
    return () => clearInterval(t);
  }, [state.status]);

  useEffect(() => {
    if (state.status === "done" || state.status === "error") resultRef.current?.focus();
  }, [state.status]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const value = url.trim();
    if (!value) {
      setState({ status: "error", message: "Type your website address first, like yourbusiness.com" });
      return;
    }
    setState({ status: "loading", url: value });
    try {
      const res = await fetch("/api/site-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: value }),
      });
      const data = await res.json();
      if (!res.ok) setState({ status: "error", message: data.error ?? "Something went wrong. Please try again." });
      else setState({ status: "done", result: data as Result });
    } catch {
      setState({ status: "error", message: "We couldn’t reach the test. Check your connection and try again." });
    }
  }

  const loading = state.status === "loading";

  return (
    <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
      <div className="flex flex-col gap-8">
        {header}
        <div className="spotlight overflow-hidden rounded-2xl border border-line-strong bg-surface shadow-card">
          <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3 border-b border-line p-5 sm:flex-row sm:items-end md:p-7">
            <div className="flex flex-1 flex-col gap-2">
              <label htmlFor="site-url" className="text-sm font-medium text-fg">
                Your website address
              </label>
              <input
                id="site-url"
                name="url"
                type="text"
                inputMode="url"
                autoComplete="url"
                autoCapitalize="none"
                spellCheck={false}
                placeholder="yourbusiness.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={loading}
                className="min-h-13 w-full rounded-md border border-line-strong bg-surface px-4 text-base text-fg placeholder:text-muted focus:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 disabled:opacity-60"
              />
            </div>
            <Button type="submit" size="lg" disabled={loading} className="sm:min-w-52">
              {loading ? "Checking…" : "Check my website"}
              {!loading && <Icon name="search" size={18} />}
            </Button>
          </form>
          <div className="flex flex-col gap-4 p-5 text-fg-2 md:p-7">
            <p className="font-medium text-fg">What you’ll get, free:</p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {[
                "Speed, SEO, accessibility and best-practice scores",
                "The 3–5 biggest problems, in plain English",
                "Results from Google’s own PageSpeed test, on mobile",
                "No sign-up. We don’t save or share your result",
              ].map((t) => (
                <li key={t} className="flex gap-2.5 text-sm">
                  <Icon name="check" size={18} strokeWidth={2.2} className="shrink-0 text-success" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div aria-live="polite" className="overflow-hidden rounded-2xl border border-line-strong bg-surface shadow-card">
        {state.status === "idle" && <SampleReport />}

        {loading && (
          <div className="relative flex min-h-[26rem] flex-col items-center justify-center gap-4 overflow-hidden p-6 text-center">
            <div aria-hidden="true" className="absolute inset-0 opacity-80">
              <TarkNetwork variant="lite" />
            </div>
            <div className="relative flex flex-col items-center gap-2 rounded-xl bg-bg/70 px-5 py-4 backdrop-blur">
              <p className="font-display text-lg font-semibold text-fg">Testing {state.url}</p>
              <p className="text-sm text-fg-2">{loadingSteps[step]}</p>
              <p className="text-xs text-muted">This usually takes 20–40 seconds.</p>
            </div>
          </div>
        )}

        {state.status === "error" && (
          <div ref={resultRef} tabIndex={-1} role="alert" className="flex flex-col items-start gap-4 p-5 focus:outline-none md:p-7">
            <p className="flex items-start gap-3 text-danger">
              <Icon name="x" size={20} className="mt-0.5 shrink-0" />
              {state.message}
            </p>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi Tarkeon, can you check my website for me?")}`}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses("secondary", "md")}
            >
              <Icon name="whatsapp" size={18} /> Ask us to check it instead
            </a>
          </div>
        )}

        {state.status === "done" && (
          <div ref={resultRef} tabIndex={-1} className="flex flex-col gap-8 p-5 focus:outline-none md:p-7">
            <div className="flex flex-col gap-1">
              <p className="text-sm text-muted">Results for</p>
              <p className="font-display text-lg font-semibold break-all text-fg">{state.result.url}</p>
            </div>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              <ScoreRing label="Speed" score={state.result.scores.performance} />
              <ScoreRing label="SEO" score={state.result.scores.seo} />
              <ScoreRing label="Accessibility" score={state.result.scores.accessibility} />
              <ScoreRing label="Best practices" score={state.result.scores.bestPractices} />
            </div>
            {state.result.issues.length > 0 ? (
              <div className="flex flex-col gap-3">
                <h3 className="font-display text-lg font-semibold text-fg">Biggest problems we found</h3>
                <ol className="flex flex-col gap-3">
                  {state.result.issues.map((issue, i) => (
                    <IssueRow key={issue.id} n={i + 1} title={issue.title} category={issue.category} detail={issue.detail} />
                  ))}
                </ol>
              </div>
            ) : (
              <p className="text-fg-2">No big problems found. Nice work! The next step is usually more enquiries, not fixes.</p>
            )}
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                  `Hi Tarkeon, I checked ${state.result.url} on your website. Speed ${state.result.scores.performance}, SEO ${state.result.scores.seo}, Accessibility ${state.result.scores.accessibility}, Best practices ${state.result.scores.bestPractices}. Top issues: ${state.result.issues
                    .slice(0, 3)
                    .map((x) => x.title)
                    .join("; ")}. Can you help fix these?`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses("whatsapp", "lg")}
              >
                <Icon name="whatsapp" size={18} /> Get these fixed: send report on WhatsApp
              </a>
              <button
                type="button"
                onClick={() => {
                  setState({ status: "idle" });
                  setUrl("");
                }}
                className={cn(buttonClasses("ghost", "lg"))}
              >
                Check another site
              </button>
            </div>
            <p className="text-xs text-muted">Scores come from Google PageSpeed Insights (mobile test) and can vary a little between runs.</p>
          </div>
        )}
      </div>
    </div>
  );
}
