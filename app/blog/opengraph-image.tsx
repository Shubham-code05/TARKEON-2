import { renderOg, ogContentType, ogSize } from "@/lib/og";

export const alt = "Tarkeon Blog: Practical guides for growing your business online.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Blog", title: "Practical guides for growing your business online." });
}
