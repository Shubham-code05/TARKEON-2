import { cn } from "@/lib/utils";

type HeadlineRevealProps = {
  text: string;
  /** Words (exact match) to paint with the brand gradient. */
  highlight?: string[];
  /** Paint every word from this position onwards, for phrases that repeat a word. */
  highlightFrom?: number;
  className?: string;
  as?: "h1" | "h2" | "h3";
  id?: string;
};

/**
 * Word-by-word headline reveal done in CSS, so it plays before hydration
 * and never delays Largest Contentful Paint. Screen readers get the plain sentence.
 */
export function HeadlineReveal({ text, highlight = [], highlightFrom = Infinity, className, as: Tag = "h1", id }: HeadlineRevealProps) {
  const words = text.split(" ");
  return (
    <Tag id={id} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <span key={i}>
            <span
              className={cn("inline-block animate-word motion-reduce:animate-none", (highlight.includes(word) || i >= highlightFrom) && "text-brand")}
              style={{ animationDelay: `${i * 55}ms` }}
            >
              {word}
            </span>
            {i < words.length - 1 && " "}
          </span>
        ))}
      </span>
    </Tag>
  );
}
