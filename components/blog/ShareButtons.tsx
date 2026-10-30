"use client";

import { useState } from "react";
import { Icon, type IconName } from "@/components/Icon";

const btn =
  "inline-flex size-11 items-center justify-center rounded-full border border-line-strong bg-surface text-fg-2 transition-colors hover:border-accent/50 hover:text-fg";

/** Share links work without JS; only "copy link" needs it. */
export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const text = encodeURIComponent(title);
  const u = encodeURIComponent(url);
  const links: { label: string; icon: IconName; href: string }[] = [
    { label: "Share on WhatsApp", icon: "whatsapp", href: `https://wa.me/?text=${text}%20${u}` },
    { label: "Share on LinkedIn", icon: "linkedin", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
    { label: "Share on X", icon: "x-logo", href: `https://x.com/intent/post?text=${text}&url=${u}` },
  ];

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-sm text-muted">Share</span>
      {links.map((l) => (
        <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" aria-label={l.label} className={btn}>
          <Icon name={l.icon} size={18} />
        </a>
      ))}
      <button type="button" onClick={copy} aria-label="Copy link to this article" className={btn}>
        <Icon name={copied ? "check" : "link"} size={18} />
      </button>
      <span role="status" className="text-sm text-success-ink">
        {copied ? "Link copied" : ""}
      </span>
    </div>
  );
}
