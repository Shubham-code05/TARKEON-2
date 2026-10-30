import { cn } from "@/lib/utils";

type LogoMarkProps = { size?: number; className?: string; id?: string };

/** The Tarkeon mark: a gradient tile with a "T" and a dot. */
export function LogoMark({ size = 32, className, id = "tk" }: LogoMarkProps) {
  const gradientId = `${id}-mark-gradient`;
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" focusable="false" className={className}>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#2F4BFF" />
          <stop offset="1" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="30" height="30" rx="8.5" fill={`url(#${gradientId})`} />
      <path d="M9 10.5h14M16 10.5v12" stroke="#FFFFFF" strokeWidth="2.75" strokeLinecap="round" />
      <circle cx="23" cy="22" r="2.6" fill="#FFFFFF" />
    </svg>
  );
}

type LogoProps = {
  size?: number;
  className?: string;
  /** Unique prefix for the SVG gradient id when several logos share a page. */
  id?: string;
};

export function Logo({ size = 32, className, id }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark size={size} id={id} />
      <span className="font-display text-[1.375rem] leading-none font-bold tracking-[-0.03em] text-fg">Tarkeon</span>
    </span>
  );
}
