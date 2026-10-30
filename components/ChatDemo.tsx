"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/utils";

type QA = { id: string; q: string; a: string };
type Message = { from: "bot" | "user"; text: string };

type ChatDemoProps = {
  qa: QA[];
  whatsappHref: string;
  /** First message from the assistant. */
  greeting?: string;
  /** Name shown in the chat header. */
  title?: string;
  className?: string;
};

export function ChatDemo({
  qa,
  whatsappHref,
  greeting: greetingText = "Namaste! I’m a demo of the assistant Tarkeon builds. Tap a question below.",
  title = "Tarkeon assistant",
  className,
}: ChatDemoProps) {
  const greeting: Message = { from: "bot", text: greetingText };
  const [messages, setMessages] = useState<Message[]>([greeting]);
  const [asked, setAsked] = useState<string[]>([]);
  const [typing, setTyping] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Keep the newest message in view without scrolling the page
  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  function ask(item: QA) {
    if (typing) return;
    setAsked((a) => [...a, item.id]);
    setMessages((m) => [...m, { from: "user", text: item.q }]);
    setTyping(true);
    const delay = Math.min(1600, 500 + item.a.length * 9);
    timer.current = setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { from: "bot", text: item.a }]);
    }, delay);
  }

  function reset() {
    if (timer.current) clearTimeout(timer.current);
    setTyping(false);
    setAsked([]);
    setMessages([greeting]);
  }

  const remaining = qa.filter((x) => !asked.includes(x.id));

  return (
    <div className={cn("glass relative flex flex-col overflow-hidden rounded-2xl shadow-glow", className)}>
      <div className="flex items-center justify-between gap-3 border-b border-line bg-surface-2 px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-full bg-brand text-white">
            <Icon name="sparkles" size={18} />
          </span>
          <div>
            <p className="font-display text-[0.9375rem] font-semibold text-fg">{title}</p>
            <p className="flex items-center gap-1.5 text-xs text-muted">
              <span className="size-1.5 rounded-full bg-success" aria-hidden="true" />
              Demo · replies instantly
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={reset}
          className="inline-flex min-h-9 items-center gap-1.5 rounded-md px-2.5 text-xs text-muted transition-colors hover:bg-surface-2 hover:text-fg"
        >
          <Icon name="refresh" size={14} /> Restart
        </button>
      </div>

      <div
        ref={bodyRef}
        role="log"
        aria-live="polite"
        aria-label="Chat messages"
        className="flex h-[18rem] flex-col gap-3 overflow-y-auto px-5 py-5 md:h-[20rem]"
      >
        {messages.map((m, i) => (
          <p
            key={i}
            className={cn(
              "max-w-[85%] animate-word px-4 py-3 text-sm leading-relaxed [animation-duration:0.35s]",
              m.from === "bot"
                ? "self-start rounded-2xl rounded-bl-md bg-surface-3/90 text-fg"
                : "self-end rounded-2xl rounded-br-md bg-accent text-white",
            )}
          >
            <span className="sr-only">{m.from === "bot" ? "Assistant: " : "You: "}</span>
            {m.text}
          </p>
        ))}
        {typing && (
          <p className="flex self-start rounded-2xl rounded-bl-md bg-surface-3 px-4 py-3.5" aria-label="Assistant is typing">
            {[0, 1, 2].map((d) => (
              <span
                key={d}
                aria-hidden="true"
                className="mx-0.5 size-2 animate-bounce rounded-full bg-muted motion-reduce:animate-none"
                style={{ animationDelay: `${d * 140}ms` }}
              />
            ))}
          </p>
        )}
      </div>

      <div className="border-t border-line px-5 pt-4 pb-5">
        <p id="chat-suggestions" className="sr-only">
          Suggested questions
        </p>
        <div className="flex flex-wrap gap-2" role="group" aria-labelledby="chat-suggestions">
          {remaining.map((x) => (
            <button
              key={x.id}
              type="button"
              disabled={typing}
              onClick={() => ask(x)}
              className="min-h-11 rounded-full border border-line-strong bg-surface-2/80 px-3.5 text-left text-[0.8125rem] font-medium text-fg-2 transition-colors hover:border-accent/40 hover:text-fg disabled:opacity-50"
            >
              {x.q}
            </button>
          ))}
          {remaining.length === 0 && !typing && (
            <p className="text-sm text-fg-2">That’s the demo. Want one trained on your business?</p>
          )}
        </div>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex min-h-11 items-center justify-center gap-2 rounded-md border border-whatsapp/50 bg-whatsapp/10 text-sm font-semibold text-whatsapp transition-colors hover:bg-whatsapp/20"
        >
          <Icon name="whatsapp" size={18} /> Talk to a human on WhatsApp
        </a>
      </div>
    </div>
  );
}
