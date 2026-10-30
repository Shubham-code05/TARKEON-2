import { renderOg, ogContentType, ogSize } from "@/lib/og";

export const alt = "Tarkeon Process: How we work, from the first call to after launch.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Process", title: "How we work, from the first call to after launch." });
}
