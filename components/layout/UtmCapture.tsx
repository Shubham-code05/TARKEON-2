"use client";

import { useEffect } from "react";
import { captureUtm } from "@/lib/lead-meta";

/** Remembers utm_* tags from the landing page for the lead forms. Renders nothing. */
export function UtmCapture() {
  useEffect(() => captureUtm(), []);
  return null;
}
