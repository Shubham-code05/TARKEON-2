"use client";

// Email copy karne ka chhota button, "Copied!" tooltip 2 second dikhta hai.
// (Kuch logon ke paas mail app set nahi hota, unke liye.)
import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import { CONTACT_EMAIL } from "@/lib/site";

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  // Purane browser ya http ke liye fallback
  const el = document.createElement("textarea");
  el.value = text;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
}

// Email text; chhoti screen pe "@" ke baad line tootti hai, beech mein se nahi
export function EmailText() {
  const [user, domain] = CONTACT_EMAIL.split("@");
  return (
    <span className="email-text">
      {user}@<wbr />
      {domain}
    </span>
  );
}

export default function CopyEmail({ light }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function handleCopy() {
    try {
      await copyText(CONTACT_EMAIL);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <span className="copy-wrap">
      <button type="button" className={`copy-btn ${light ? "copy-btn-light" : ""}`} onClick={handleCopy} aria-label="Copy email address">
        <Icon name={copied ? "check" : "copy"} size={16} strokeWidth={2} />
      </button>
      <span className={`copy-tip ${copied ? "is-visible" : ""}`} role="status" aria-live="polite">
        {copied ? "Copied!" : ""}
      </span>
    </span>
  );
}
