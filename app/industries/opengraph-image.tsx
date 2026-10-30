import { renderOg, ogContentType, ogSize } from "@/lib/og";

export const alt = "Tarkeon Industries: Solutions shaped around your kind of business.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Industries", title: "Solutions shaped around your kind of business." });
}
