"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import type { IconName } from "@/components/Icon";
import type { IndustryPhoto } from "@/content/industry-photos";
import type { Faq } from "@/content/types";

/** The slice of industry data the homepage needs on the client. */
export type HomeIndustry = {
  slug: string;
  key: string;
  label: string;
  name: string;
  icon: IconName;
  headline: string;
  highlight: string[];
  subheadline: string;
  chatGreeting: string;
  chat: { id: string; q: string; a: string }[];
  packageLabel: string;
  packagePrice: number;
  packageHref: string;
  packagePreset: { type: string; pages?: number; addons: string[] };
  problems: { title: string; text: string; solution: string }[];
  faqs: Faq[];
  photo: IndustryPhoto;
};

type Ctx = {
  industries: HomeIndustry[];
  active: HomeIndustry;
  select: (key: string) => void;
  /** True once the visitor has picked an industry themselves (used to animate changes, never the first paint). */
  changed: boolean;
};

const IndustryCtx = createContext<Ctx | null>(null);
const STORAGE_KEY = "tk-industry";

export function IndustryProvider({ industries, children }: { industries: HomeIndustry[]; children: ReactNode }) {
  const [activeKey, setActiveKey] = useState(industries[0]!.key);
  const [changed, setChanged] = useState(false);

  // Restore the visitor's choice: the URL wins, then what they picked last time
  useEffect(() => {
    let key: string | null = new URLSearchParams(window.location.search).get("for");
    if (!key) {
      try {
        key = window.localStorage.getItem(STORAGE_KEY);
      } catch {
        key = null;
      }
    }
    if (key && industries.some((i) => i.key === key)) setActiveKey(key);
  }, [industries]);

  const select = useCallback((key: string) => {
    setActiveKey(key);
    setChanged(true);
    try {
      window.localStorage.setItem(STORAGE_KEY, key);
    } catch {
      // Storage can be blocked; the choice still works for this visit
    }
    const url = new URL(window.location.href);
    url.searchParams.set("for", key);
    window.history.replaceState(window.history.state, "", url);
  }, []);

  const active = industries.find((i) => i.key === activeKey) ?? industries[0]!;
  return <IndustryCtx.Provider value={{ industries, active, select, changed }}>{children}</IndustryCtx.Provider>;
}

export function useIndustry(): Ctx {
  const ctx = useContext(IndustryCtx);
  if (!ctx) throw new Error("useIndustry must be used inside <IndustryProvider>");
  return ctx;
}
