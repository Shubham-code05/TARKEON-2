import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Section";
import { legalLastUpdated } from "@/content/site";
import { formatDate } from "@/lib/utils";

/** Shared layout for privacy, terms and refund pages. */
export function LegalPage({ title, path, intro, children }: { title: string; path: string; intro: ReactNode; children: ReactNode }) {
  return (
    <Container className="max-w-3xl pt-8 pb-section md:pt-10">
      <Breadcrumbs items={[{ name: title, href: path }]} className="mb-10" />
      <p className="text-sm text-muted">
        Last updated: <time dateTime={legalLastUpdated}>{formatDate(legalLastUpdated)}</time>
      </p>
      <h1 className="mt-3 text-h1">{title}</h1>
      <div className="mt-6 text-lead text-muted">{intro}</div>
      <div className="prose-tk mt-10 border-t border-line pt-4">{children}</div>
    </Container>
  );
}
