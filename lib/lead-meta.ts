// Client-side helpers that record where a lead came from (page, UTM tags, intent).

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign"] as const;
const STORAGE_KEY = "tarkeon_utm";

/** "source=google; medium=cpc; campaign=diwali" from a query string, or "". */
function utmFrom(search: string): string {
  const q = new URLSearchParams(search);
  return UTM_KEYS.map((k) => {
    const v = q.get(k)?.trim().slice(0, 100);
    return v ? `${k.slice(4)}=${v}` : "";
  })
    .filter(Boolean)
    .join("; ");
}

/** Saves UTM tags from the landing URL so they survive navigation to the form page. */
export function captureUtm() {
  const utm = utmFrom(window.location.search);
  if (!utm) return;
  try {
    sessionStorage.setItem(STORAGE_KEY, utm);
  } catch {
    // Storage blocked: the current URL is still read when a form is sent
  }
}

export function readLeadMeta(): { page: string; utm: string; intent: string } {
  let utm = utmFrom(window.location.search);
  if (!utm) {
    try {
      utm = sessionStorage.getItem(STORAGE_KEY) ?? "";
    } catch {
      utm = "";
    }
  }
  const intent = new URLSearchParams(window.location.search).get("intent") ?? "";
  return { page: window.location.pathname, utm, intent };
}
