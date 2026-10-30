"use client";

import { startTransition, useActionState, useEffect, useRef, type FormEvent } from "react";
import { submitLead, type LeadState } from "@/app/actions";

/**
 * Wires a form to the submitLead server action.
 * Submitting through onSubmit (instead of only the action prop) stops React
 * from clearing the fields when the server returns validation errors.
 */
export function useLeadForm() {
  const [state, formAction, pending] = useActionState<LeadState, FormData>(submitLead, { status: "idle" });
  const lastValues = useRef<FormData | null>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    lastValues.current = data;
    startTransition(() => formAction(data));
  }

  // Move focus to the result so keyboard and screen-reader users hear it
  useEffect(() => {
    if (state.status !== "idle") statusRef.current?.focus();
  }, [state]);

  return { state, formAction, pending, onSubmit, lastValues, statusRef };
}
