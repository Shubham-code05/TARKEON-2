import { renderOg, ogContentType, ogSize } from "@/lib/og";

export const alt = "Tarkeon Legal: Terms of Service";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Legal", title: "Terms of Service" });
}
