import "server-only";

// Turns a Google PageSpeed Insights (Lighthouse) report into four scores and the
// biggest problems, written for a business owner rather than a developer.

export type SiteCheckIssue = { id: string; title: string; detail: string; category: string };
export type SiteCheckResult = {
  url: string;
  scores: { performance: number; seo: number; accessibility: number; bestPractices: number };
  issues: SiteCheckIssue[];
  checkedAt: string;
};

type Audit = {
  id: string;
  title: string;
  score: number | null;
  scoreDisplayMode?: string;
  displayValue?: string;
  numericValue?: number;
  details?: { overallSavingsMs?: number; type?: string };
};
type Category = { score: number | null; auditRefs: { id: string; weight: number }[] };
export type PsiResponse = {
  lighthouseResult?: {
    finalDisplayedUrl?: string;
    finalUrl?: string;
    categories: Record<string, Category>;
    audits: Record<string, Audit>;
  };
  error?: { code?: number; message?: string };
};

/** Plain-English explanations for the audits that matter most to a small business. */
const plain: Record<string, (a: Audit) => { title: string; detail: string }> = {
  "largest-contentful-paint": (a) => ({
    title: `Your main content takes ${a.displayValue ?? "too long"} to appear on a phone`,
    detail: "Many visitors give up if a page takes more than about 3 seconds. Faster pages keep more of the people you worked to bring in.",
  }),
  "first-contentful-paint": (a) => ({
    title: `The screen stays blank for ${a.displayValue ?? "a while"}`,
    detail: "Visitors see nothing at first and may think the site is broken.",
  }),
  "total-blocking-time": () => ({
    title: "The page freezes while it loads",
    detail: "Heavy scripts stop buttons and menus from responding for a moment, which feels broken on a phone.",
  }),
  "cumulative-layout-shift": () => ({
    title: "Things jump around while the page loads",
    detail: "Text and buttons move as the page loads, so visitors tap the wrong thing.",
  }),
  "speed-index": (a) => ({
    title: `The page fills in slowly (${a.displayValue ?? "slow"})`,
    detail: "Visitors watch the page appear bit by bit instead of all at once.",
  }),
  "render-blocking-resources": () => ({
    title: "Some files stop the page from showing",
    detail: "Style and script files load before anything appears. They can be loaded smarter.",
  }),
  "render-blocking-insight": () => ({
    title: "Some files stop the page from showing",
    detail: "Style and script files load before anything appears. They can be loaded smarter.",
  }),
  "uses-optimized-images": () => imageIssue,
  "modern-image-formats": () => imageIssue,
  "uses-responsive-images": () => imageIssue,
  "image-delivery-insight": () => imageIssue,
  "offscreen-images": () => ({
    title: "Images below the screen load too early",
    detail: "Photos the visitor hasn’t scrolled to yet slow down the first view.",
  }),
  "unused-javascript": () => ({
    title: "The site loads code it doesn’t use",
    detail: "Extra code makes phones download and process more than they need to.",
  }),
  "unused-css-rules": () => ({
    title: "The site loads styling it doesn’t use",
    detail: "Unused design files add weight to every page.",
  }),
  "server-response-time": () => serverIssue,
  "document-latency-insight": () => serverIssue,
  "uses-text-compression": () => ({
    title: "Files are sent without compression",
    detail: "Turning on compression on the server makes pages noticeably lighter.",
  }),
  "uses-long-cache-ttl": () => cacheIssue,
  "cache-insight": () => cacheIssue,
  "color-contrast": () => ({
    title: "Some text is hard to read",
    detail: "Low contrast between text and background makes it hard to read, especially outdoors on a phone.",
  }),
  "image-alt": () => ({
    title: "Images have no descriptions",
    detail: "Google and screen readers can’t understand images without alt text.",
  }),
  "meta-description": () => ({
    title: "No description for Google search results",
    detail: "Without one, Google picks random text from the page to show under your link.",
  }),
  "document-title": () => ({
    title: "The page has no title",
    detail: "The title is the blue headline people click in Google. It should say who you are and what you do.",
  }),
  "link-text": () => ({
    title: "Links say “click here” instead of where they go",
    detail: "Descriptive links help both Google and visitors.",
  }),
  "target-size": () => tapIssue,
  "tap-targets": () => tapIssue,
  "font-size": () => ({
    title: "Text is too small on phones",
    detail: "Visitors have to pinch and zoom to read.",
  }),
  viewport: () => ({
    title: "The site isn’t set up for mobile screens",
    detail: "Without a mobile viewport, phones show a tiny desktop version of the page.",
  }),
  "is-crawlable": () => ({
    title: "Google is told not to index this page",
    detail: "The page blocks search engines, so it won’t show up in Google.",
  }),
  "http-status-code": () => ({
    title: "The page returns an error code",
    detail: "Google may not index a page that returns an error.",
  }),
  "is-on-https": () => ({
    title: "The site is not fully secure",
    detail: "Some parts load without HTTPS. Browsers may show a “Not secure” warning.",
  }),
  "errors-in-console": () => ({
    title: "The page has hidden errors",
    detail: "Something on the page is failing in the background, which can break forms or features.",
  }),
  "label": () => ({
    title: "Form fields have no labels",
    detail: "Visitors using screen readers, and many others, can’t tell what to type where.",
  }),
  "button-name": () => ({
    title: "Some buttons have no name",
    detail: "Screen readers announce them only as “button”, so their purpose is unclear.",
  }),
  "heading-order": () => ({
    title: "Headings are out of order",
    detail: "A clear heading structure helps Google and screen readers understand the page.",
  }),
};

const imageIssue = {
  title: "Images are heavier than they need to be",
  detail: "Large photos are the most common reason small business sites are slow. Resizing and modern formats fix it.",
};
const serverIssue = {
  title: "The server is slow to respond",
  detail: "The site takes too long to start sending the page. Better hosting or caching usually fixes this.",
};
const cacheIssue = {
  title: "Returning visitors download everything again",
  detail: "Files aren’t cached, so every visit is as slow as the first one.",
};
const tapIssue = {
  title: "Buttons are too small or too close together on phones",
  detail: "Visitors tap the wrong thing. Buttons should be easy to hit with a thumb.",
};

const categoryNames: Record<string, string> = {
  performance: "Speed",
  seo: "SEO",
  accessibility: "Accessibility",
  "best-practices": "Best practices",
};

function pct(score: number | null | undefined): number {
  return Math.round((score ?? 0) * 100);
}

export function summarise(data: PsiResponse, requestedUrl: string, max = 5): SiteCheckResult {
  const lh = data.lighthouseResult!;
  const candidates: (SiteCheckIssue & { rank: number })[] = [];
  const seenTitles = new Set<string>();

  for (const [catId, cat] of Object.entries(lh.categories)) {
    for (const ref of cat.auditRefs) {
      const audit = lh.audits[ref.id];
      if (!audit || audit.score === null || audit.score >= 0.9) continue;
      if (audit.scoreDisplayMode === "informative" || audit.scoreDisplayMode === "notApplicable" || audit.scoreDisplayMode === "manual") continue;
      const savings = audit.details?.overallSavingsMs ?? 0;
      // Weighted metrics and big savings first, then by how badly the audit failed
      if (ref.weight === 0 && savings < 300) continue;
      const rank = ref.weight * (1 - audit.score) * 10 + savings / 100 + (catId === "performance" ? 2 : 0);
      const text = plain[audit.id]?.(audit) ?? { title: audit.title, detail: "Flagged by Google’s PageSpeed test." };
      if (seenTitles.has(text.title)) continue;
      seenTitles.add(text.title);
      candidates.push({ id: audit.id, ...text, category: categoryNames[catId] ?? catId, rank });
    }
  }

  const issues = candidates
    .sort((a, b) => b.rank - a.rank)
    .slice(0, max)
    .map(({ rank: _rank, ...issue }) => issue);

  return {
    url: lh.finalDisplayedUrl ?? lh.finalUrl ?? requestedUrl,
    scores: {
      performance: pct(lh.categories.performance?.score),
      seo: pct(lh.categories.seo?.score),
      accessibility: pct(lh.categories.accessibility?.score),
      bestPractices: pct(lh.categories["best-practices"]?.score),
    },
    issues,
    checkedAt: new Date().toISOString(),
  };
}

/** Accepts "example.com", "www.example.com/page" or a full URL. Returns null if it isn't a public website. */
export function normaliseUrl(input: string): string | null {
  const raw = input.trim();
  if (!raw || raw.length > 300 || /\s/.test(raw)) return null;
  let url: URL;
  try {
    url = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
  } catch {
    return null;
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") return null;
  const host = url.hostname.toLowerCase();
  if (!host.includes(".") || host.endsWith(".local") || host === "localhost") return null;
  // Plain IP addresses aren't business websites (and keeps internal addresses out)
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(host) || host.startsWith("[")) return null;
  url.hash = "";
  return url.toString();
}
