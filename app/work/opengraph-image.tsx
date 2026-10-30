import { renderOg, ogContentType, ogSize } from "@/lib/og";

export const alt = "Tarkeon Our work: Real projects, explained plainly.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Our work", title: "Real projects, explained plainly." });
}
