"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import type { LeadState } from "@/app/actions";
import { Icon } from "@/components/Icon";
import { Button } from "@/components/ui/Button";
import { ChoiceChips, ConsentField, InputField, SelectField, SpamGuard, TextareaField } from "./fields";
import { FormError, FormSuccess } from "./FormStatus";
import { useLeadForm } from "./useLeadForm";

type ContactFormProps = {
  needs: string[];
  budgets: string[];
  whatsappNumber: string;
  defaultNeed?: string;
};

export function ContactForm({ needs, budgets, whatsappNumber, defaultNeed }: ContactFormProps) {
  const pathname = usePathname();
  const [formKey, setFormKey] = useState(0);
  const [dismissed, setDismissed] = useState<LeadState | null>(null);
  const { state, formAction, pending, onSubmit, lastValues, statusRef } = useLeadForm();
  const errors = state.fieldErrors ?? {};

  if (state.status === "success" && state !== dismissed) {
    const v = lastValues.current;
    const need = v?.get("need");
    const business = v?.get("business");
    const message = [
      `Hi Tarkeon, I'm ${v?.get("name") ?? ""}.`,
      business ? `Business: ${business}.` : "",
      need ? `I'm interested in: ${need}.` : "",
      "I just sent the contact form on your website.",
    ]
      .filter(Boolean)
      .join(" ");
    return (
      <FormSuccess
        state={state}
        statusRef={statusRef}
        whatsappHref={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`}
        onReset={() => {
          setDismissed(state);
          setFormKey((k) => k + 1);
        }}
      />
    );
  }

  return (
    <form key={formKey} action={formAction} onSubmit={onSubmit} noValidate className="relative flex flex-col gap-6">
      <input type="hidden" name="kind" value="contact" />
      <input type="hidden" name="source" value={pathname} />
      <SpamGuard />
      <div className="grid gap-6 sm:grid-cols-2">
        <InputField id="c-name" name="name" label="Your name" autoComplete="name" required error={errors.name} />
        <InputField
          id="c-phone"
          name="phone"
          label="WhatsApp number"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          placeholder="98765 43210"
          error={errors.phone}
        />
        <InputField
          id="c-email"
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          optional
          hint="Add it to get a confirmation email."
          error={errors.email}
        />
        <InputField id="c-business" name="business" label="Business name" autoComplete="organization" optional error={errors.business} />
      </div>
      <ChoiceChips name="need" legend="What do you need?" options={needs} defaultValue={defaultNeed} error={errors.need} />
      <SelectField id="c-budget" name="budget" label="Rough budget" options={budgets} optional error={errors.budget} />
      <TextareaField
        id="c-message"
        name="message"
        label="Anything else we should know?"
        optional
        placeholder="e.g. We run a coaching centre with 200 students and want online admissions before April."
        error={errors.message}
      />
      <ConsentField error={errors.consent} />
      <FormError state={state} statusRef={statusRef} />
      <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto sm:self-start">
        {pending ? "Sending…" : "Send enquiry"}
        {!pending && <Icon name="arrow" size={18} />}
      </Button>
    </form>
  );
}
