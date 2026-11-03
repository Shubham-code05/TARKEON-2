import { renderOg, ogContentType, ogSize } from "@/lib/og";

export const alt = "Tarkeon pricing: website design cost in India, with the final quote in writing.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Pricing", title: "Website design cost in India, with the final quote in writing." });
}
