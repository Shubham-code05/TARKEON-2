import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("container-site", className)}>{children}</div>;
}

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  /** Removes top padding, for sections that follow a tight hero. */
  flushTop?: boolean;
  "aria-labelledby"?: string;
};

export function Section({ children, className, id, flushTop, ...rest }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={rest["aria-labelledby"]}
      className={cn("py-section", flushTop && "pt-0", className)}
    >
      <Container>{children}</Container>
    </section>
  );
}

type SectionHeaderProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  /** Heading level. Page heroes use h1, everything else h2. */
  as?: "h1" | "h2";
  id?: string;
  className?: string;
  action?: ReactNode;
};

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 text-[0.8125rem] font-semibold tracking-[0.14em] text-accent uppercase",
        className,
      )}
    >
      <span aria-hidden="true" className="h-px w-6 bg-brand" />
      {children}
    </p>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  as: Heading = "h2",
  id,
  className,
  action,
}: SectionHeaderProps) {
  const centered = align === "center";
  return (
    <Reveal
      className={cn(
        "mb-10 flex flex-col gap-4 md:mb-14",
        centered && "mx-auto max-w-3xl items-center text-center",
        !centered && Boolean(action) && "md:flex-row md:items-end md:justify-between md:gap-10",
        className,
      )}
    >
      <div className={cn("flex max-w-3xl flex-col gap-4", centered && "items-center")}>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <Heading id={id} className={Heading === "h1" ? "text-h1" : "text-h2"}>
          {title}
        </Heading>
        {description && <div className="max-w-2xl text-lead text-muted">{description}</div>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </Reveal>
  );
}
