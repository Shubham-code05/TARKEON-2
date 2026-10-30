"use client";

import Link from "next/link";
import { useEffect, useState, type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const control =
  "w-full rounded-md border border-line-strong bg-surface px-4 py-3 text-base text-fg placeholder:text-muted " +
  "transition-colors hover:border-accent/50 focus:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 " +
  "aria-[invalid=true]:border-danger/70";

type FieldShellProps = { id: string; label: string; error?: string; hint?: string; optional?: boolean; children: ReactNode };

function FieldShell({ id, label, error, hint, optional, children }: FieldShellProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-fg">
        {label}
        {optional && <span className="ml-1.5 font-normal text-muted">(optional)</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-xs text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

type InputFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "id"> & {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
};

export function InputField({ id, label, error, hint, optional, className, ...rest }: InputFieldProps) {
  return (
    <FieldShell id={id} label={label} error={error} hint={hint} optional={optional}>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={cn(control, "min-h-12", className)}
        {...rest}
      />
    </FieldShell>
  );
}

type TextareaFieldProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id"> & {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
};

export function TextareaField({ id, label, error, hint, optional, className, ...rest }: TextareaFieldProps) {
  return (
    <FieldShell id={id} label={label} error={error} hint={hint} optional={optional}>
      <textarea
        id={id}
        rows={4}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={cn(control, "resize-y", className)}
        {...rest}
      />
    </FieldShell>
  );
}

type SelectFieldProps = {
  id: string;
  name: string;
  label: string;
  options: string[];
  optional?: boolean;
  error?: string;
  placeholder?: string;
};

export function SelectField({ id, name, label, options, optional, error, placeholder = "Choose one" }: SelectFieldProps) {
  return (
    <FieldShell id={id} label={label} error={error} optional={optional}>
      <div className="relative">
        <select
          id={id}
          name={name}
          defaultValue=""
          aria-invalid={error ? true : undefined}
          className={cn(control, "min-h-12 appearance-none pr-10")}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-muted"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </FieldShell>
  );
}

type ChoiceChipsProps = {
  name: string;
  legend: string;
  options: string[];
  type?: "radio" | "checkbox";
  defaultValue?: string;
  error?: string;
};

/** Radio or checkbox group styled as chips. Real inputs, so it works with the keyboard and without JS. */
export function ChoiceChips({ name, legend, options, type = "radio", defaultValue, error }: ChoiceChipsProps) {
  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="mb-3 text-sm font-medium text-fg">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o} className="cursor-pointer">
            <input type={type} name={name} value={o} defaultChecked={o === defaultValue} className="peer sr-only" />
            <span className="inline-flex min-h-11 items-center rounded-full border border-line-strong bg-surface-2 px-4 text-sm text-fg-2 transition-colors peer-checked:border-accent peer-checked:bg-accent-soft peer-checked:text-accent peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent hover:border-accent/50">
              {o}
            </span>
          </label>
        ))}
      </div>
      {error && <p className="text-sm text-danger">{error}</p>}
    </fieldset>
  );
}

export function ConsentField({ error }: { error?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="flex cursor-pointer items-start gap-3 text-sm text-fg-2">
        <input
          type="checkbox"
          name="consent"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "consent-error" : undefined}
          className="mt-0.5 size-5 shrink-0 cursor-pointer rounded accent-accent"
        />
        <span>
          I agree that Tarkeon can contact me about this enquiry and store my details as described in the{" "}
          <Link href="/privacy-policy" className="text-accent underline underline-offset-2 hover:text-accent-hover">
            privacy policy
          </Link>
          .
        </span>
      </label>
      {error && (
        <p id="consent-error" className="text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

/** Hidden spam traps: a honeypot field and the time the form was opened. */
export function SpamGuard() {
  const [startedAt, setStartedAt] = useState("");
  useEffect(() => setStartedAt(String(Date.now())), []);
  return (
    <>
      <input type="hidden" name="started_at" value={startedAt} />
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="company_website">Leave this empty</label>
        <input id="company_website" type="text" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>
    </>
  );
}
