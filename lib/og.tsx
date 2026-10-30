import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

type OgInput = {
  /** Small label above the title, e.g. "Service" or "Blog". */
  eyebrow?: string;
  title: string;
  description?: string;
};

function Mark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#2F4BFF" />
          <stop offset="1" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="30" height="30" rx="8.5" fill="url(#g)" />
      <path d="M9 10.5h14M16 10.5v12" stroke="#FFFFFF" strokeWidth="2.75" strokeLinecap="round" />
      <circle cx="23" cy="22" r="2.6" fill="#FFFFFF" />
    </svg>
  );
}

/** Branded 1200×630 social image used by every opengraph-image route. */
export function renderOg(input: OgInput) {
  // The built-in OG font has no ₹ glyph
  const clean = (v?: string) => v?.replace(/₹\s?/g, "Rs. ");
  const eyebrow = clean(input.eyebrow);
  const title = clean(input.title)!;
  const description = clean(input.description);
  const host = site.url.replace(/^https?:\/\//, "");
  const titleSize = title.length > 60 ? 58 : title.length > 36 ? 68 : 80;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#FFFFFF",
          color: "#0B1220",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -260,
            right: -160,
            width: 760,
            height: 760,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(124,58,237,0.14) 0%, rgba(47,75,255,0.1) 40%, rgba(255,255,255,0) 70%)",
            display: "flex",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <Mark size={56} />
          <span style={{ fontSize: 38, fontWeight: 700, letterSpacing: -1 }}>Tarkeon</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 980 }}>
          {eyebrow && (
            <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, color: "#2F4BFF", textTransform: "uppercase", letterSpacing: 4 }}>
              <div style={{ width: 44, height: 3, background: "linear-gradient(90deg, #2F4BFF, #7C3AED)", display: "flex" }} />
              {eyebrow}
            </div>
          )}
          <div style={{ fontSize: titleSize, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>{title}</div>
          {description && <div style={{ fontSize: 28, color: "#5B6475", lineHeight: 1.4 }}>{description}</div>}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 24, color: "#5B6475" }}>
          <span>{host}</span>
          <span>Web · AI · Automation · Lucknow, India</span>
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width: 1200,
            height: 8,
            background: "linear-gradient(90deg, #2F4BFF, #7C3AED)",
            display: "flex",
          }}
        />
      </div>
    ),
    ogSize,
  );
}

/** Square brand mark as a PNG (apple-touch-icon, logo for schema.org). */
export function renderMark(size: number) {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#FFFFFF" }}>
        <Mark size={Math.round(size * 0.78)} />
      </div>
    ),
    { width: size, height: size },
  );
}
