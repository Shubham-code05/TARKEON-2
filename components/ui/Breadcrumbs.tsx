import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";

export type Crumb = { name: string; href: string };

/** Visible breadcrumb trail plus BreadcrumbList JSON-LD. "Home" is added automatically. */
export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  const trail: Crumb[] = [{ name: "Home", href: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb" className={cn("text-sm text-muted", className)}>
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {trail.map((crumb, i) => {
            const last = i === trail.length - 1;
            return (
              <li key={crumb.href} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className="text-fg-2">
                    {crumb.name}
                  </span>
                ) : (
                  <>
                    <Link href={crumb.href} className="rounded-sm transition-colors hover:text-fg">
                      {crumb.name}
                    </Link>
                    <span aria-hidden="true" className="text-line-strong">
                      /
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  );
}
