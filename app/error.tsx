"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section>
      <Container className="flex flex-col items-center gap-6 py-24 text-center md:py-32">
        <p className="font-display text-6xl font-bold text-brand">Oops.</p>
        <h1 className="text-h2">Something went wrong on our side.</h1>
        <p className="max-w-lg text-lead text-muted">
          Please try again. If it keeps happening, message us on WhatsApp and we’ll sort it out.
        </p>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button onClick={reset}>Try again</Button>
          <Button href="/" variant="secondary">
            Go to homepage
          </Button>
        </div>
        {error.digest && <p className="text-xs text-muted">Error reference: {error.digest}</p>}
      </Container>
    </section>
  );
}
