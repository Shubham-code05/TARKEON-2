import { renderOg, ogContentType, ogSize } from "@/lib/og";

export const alt = "Tarkeon Legal: Privacy Policy";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Legal", title: "Privacy Policy" });
}
