import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeProps = {
  children: ReactNode;
  tone?: "neutral" | "accent" | "success";
  className?: string;
};

const tones = {
  neutral: "border-line-strong bg-surface-2 text-fg-2",
  accent: "border-accent/20 bg-accent-soft text-accent",
  success: "border-success/30 bg-success/10 text-success-ink",
};

export function Badge({ children, tone = "neutral", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium leading-5",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
