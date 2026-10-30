"use client";

import { Icon } from "@/components/Icon";
import { Button } from "@/components/ui/Button";
import { ChoiceChips, ConsentField, InputField, SpamGuard, TextareaField } from "./fields";
import { FormError, FormSuccess } from "./FormStatus";
import { useLeadForm } from "./useLeadForm";

export function CareersForm({ whatsappNumber }: { whatsappNumber: string }) {
  const { state, formAction, pending, onSubmit, lastValues, statusRef } = useLeadForm();
  const errors = state.fieldErrors ?? {};

  if (state.status === "success") {
    const v = lastValues.current;
    const message = `Hi Tarkeon, I'm ${v?.get("name") ?? ""}. I just applied as a ${v?.get("role") ?? "freelancer"} on your careers page.`;
    return (
      <FormSuccess
        state={state}
        statusRef={statusRef}
        whatsappHref={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`}
        text="We have your details and will get back to you within 1 working day. A confirmation email is on its way."
      />
    );
  }

  return (
    <form action={formAction} onSubmit={onSubmit} noValidate className="relative flex flex-col gap-6">
      <input type="hidden" name="kind" value="careers" />
      <SpamGuard />
      <div className="grid gap-6 sm:grid-cols-2">
        <InputField id="j-name" name="name" label="Your name" autoComplete="name" required error={errors.name} />
        <InputField id="j-email" name="email" label="Email" type="email" autoComplete="email" required error={errors.email} />
        <InputField id="j-phone" name="phone" label="Phone" type="tel" autoComplete="tel" optional error={errors.phone} />
        <InputField
          id="j-portfolio"
          name="portfolio"
          label="Portfolio, GitHub or LinkedIn"
          type="url"
          placeholder="https://"
          optional
          error={errors.portfolio}
        />
      </div>
      <ChoiceChips name="role" legend="I’m interested in" options={["Freelancer", "Intern"]} error={errors.role} />
      <InputField
        id="j-skills"
        name="skills"
        label="Main skills"
        placeholder="e.g. Next.js, UI design, copywriting, n8n"
        required
        error={errors.skills}
      />
      <TextareaField id="j-message" name="message" label="Tell us a little about yourself" optional error={errors.message} />
      <ConsentField error={errors.consent} />
      <FormError state={state} statusRef={statusRef} />
      <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto sm:self-start">
        {pending ? "Sending…" : "Send application"}
        {!pending && <Icon name="arrow" size={18} />}
      </Button>
    </form>
  );
}
