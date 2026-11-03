import type { CSSProperties, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds before the animation starts, for staggering siblings. */
  delay?: number;
  as?: "div" | "li" | "article";
};

/**
 * Fades and lifts content in when it scrolls into view. The content is never hidden by default:
 * <RevealObserver /> only adds `data-reveal="play"` (which runs a short CSS animation) once the element
 * actually enters the viewport. Without JS, under reduced motion, in a full-page screenshot or if
 * anything fails, the content simply shows, with no animation.
 */
export function Reveal({ children, className, delay = 0, as: Tag = "div" }: RevealProps) {
  const style = delay > 0 ? ({ "--reveal-delay": `${delay}s` } as CSSProperties) : undefined;
  return (
    <Tag className={className} style={style} data-reveal="">
      {children}
    </Tag>
  );
}
