"use client";

import type { RefObject } from "react";
import { Icon } from "@/components/Icon";
import { buttonClasses } from "@/components/ui/Button";
import type { LeadState } from "@/app/actions";

type SuccessProps = {
  state: LeadState;
  whatsappHref: string;
  statusRef: RefObject<HTMLDivElement | null>;
  title?: string;
  text?: string;
  onReset?: () => void;
};

/** Shown in place of the form once it is sent. */
export function FormSuccess({ state, whatsappHref, statusRef, title, text, onReset }: SuccessProps) {
  return (
    <div
      ref={statusRef}
      tabIndex={-1}
      role="status"
      className="flex flex-col items-start gap-5 rounded-xl border border-success/30 bg-success/5 p-6 focus:outline-none md:p-8"
    >
      <span className="flex size-12 items-center justify-center rounded-full bg-success/15 text-success">
        <Icon name="check" size={24} strokeWidth={2.4} />
      </span>
      <div className="flex flex-col gap-2">
        <h2 className="font-display text-2xl font-semibold text-fg">{title ?? `Thanks${state.name ? `, ${state.name}` : ""}!`}</h2>
        <p className="text-fg-2">
          {text ?? "We have your details and will reply within 1 working day. If you added your email, a confirmation is on its way."}
        </p>
      </div>
      <div className="flex w-full flex-col gap-3 sm:flex-row">
        <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={buttonClasses("whatsapp", "md")}>
          <Icon name="whatsapp" size={18} /> Continue on WhatsApp
        </a>
        {onReset && (
          <button type="button" onClick={onReset} className={buttonClasses("ghost", "md")}>
            Send another message
          </button>
        )}
      </div>
    </div>
  );
}

export function FormError({ state, statusRef }: { state: LeadState; statusRef: RefObject<HTMLDivElement | null> }) {
  if (state.status !== "error" || !state.message) return null;
  return (
    <div
      ref={statusRef}
      tabIndex={-1}
      role="alert"
      className="flex gap-3 rounded-md border border-danger/40 bg-danger/10 p-4 text-sm text-danger focus:outline-none"
    >
      <Icon name="x" size={18} className="mt-0.5 shrink-0" />
      {state.message}
    </div>
  );
}
