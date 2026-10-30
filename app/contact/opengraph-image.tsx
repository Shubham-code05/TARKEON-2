import { renderOg, ogContentType, ogSize } from "@/lib/og";

export const alt = "Tarkeon Contact: Book your free consultation.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Contact", title: "Book your free consultation." });
}
