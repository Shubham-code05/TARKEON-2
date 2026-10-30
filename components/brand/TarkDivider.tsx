import { cn } from "@/lib/utils";

/**
 * Small, static form of the Tark network used between sections: a line of nodes
 * with a signal travelling along it. Pure SVG + CSS, no JavaScript.
 */
export function TarkDivider({ className }: { className?: string }) {
  // Corners of the path below, as [x%, y%]
  const nodes: [number, number][] = [
    [14, 50],
    [21, 20],
    [31, 50],
    [50, 80],
    [69, 50],
    [79, 20],
    [86, 50],
  ];
  return (
    <div aria-hidden="true" className={cn("container-site py-2", className)}>
      <svg viewBox="0 0 1000 40" preserveAspectRatio="none" className="h-8 w-full overflow-visible">
        <defs>
          <linearGradient id="tark-divider" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="var(--color-accent)" stopOpacity="0" />
            <stop offset="0.3" stopColor="var(--color-accent)" stopOpacity="0.45" />
            <stop offset="0.7" stopColor="var(--color-accent-2)" stopOpacity="0.45" />
            <stop offset="1" stopColor="var(--color-accent-2)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0 20 L140 20 L210 8 L310 20 L500 32 L690 20 L790 8 L860 20 L1000 20" fill="none" stroke="url(#tark-divider)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <path
          d="M0 20 L140 20 L210 8 L310 20 L500 32 L690 20 L790 8 L860 20 L1000 20"
          fill="none"
          stroke="var(--color-accent-2)"
          strokeWidth="1.5"
          strokeDasharray="40 960"
          vectorEffect="non-scaling-stroke"
          className="animate-signal motion-reduce:hidden"
        />
      </svg>
      <div className="relative -mt-8 h-8">
        {nodes.map(([left, top], i) => (
          <span
            key={left}
            className={cn(
              "absolute top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full",
              i === 3 ? "size-2.5 bg-accent shadow-[0_0_10px_rgb(47_75_255/0.45)]" : "bg-accent/50",
            )}
            style={{ left: `${left}%`, top: `${top}%` }}
          />
        ))}
      </div>
    </div>
  );
}
