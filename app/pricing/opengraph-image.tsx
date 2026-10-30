import { renderOg, ogContentType, ogSize } from "@/lib/og";

export const alt = "Tarkeon Pricing: Clear starting prices. Final quote in writing.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Pricing", title: "Clear starting prices. Final quote in writing." });
}
