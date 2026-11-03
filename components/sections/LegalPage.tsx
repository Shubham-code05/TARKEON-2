import type { ReactNode } from "react";
import { Container } from "@/components/ui/Section";
import { legalLastUpdated, type LegalPath } from "@/content/site";
import { formatDate } from "@/lib/utils";

/** Shared layout for privacy, terms and refund pages. No breadcrumb: these are top-level pages. */
export function LegalPage({ title, path, intro, children }: { title: string; path: LegalPath; intro: ReactNode; children: ReactNode }) {
  const updated = legalLastUpdated[path];
  return (
    <Container className="max-w-3xl pt-12 pb-section md:pt-16">
      <p className="text-sm text-muted">
        Last updated: <time dateTime={updated}>{formatDate(updated)}</time>
      </p>
      <h1 className="mt-3 text-h1">{title}</h1>
      <div className="mt-6 text-lead text-muted">{intro}</div>
      <div className="prose-tk mt-10 border-t border-line pt-4">{children}</div>
    </Container>
  );
}
