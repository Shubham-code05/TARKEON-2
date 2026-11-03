import { renderOg, ogContentType, ogSize } from "@/lib/og";

export const alt = "Tarkeon: Website design in Lucknow for businesses that want more enquiries.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Website design in Lucknow", title: "Websites that bring Lucknow businesses more enquiries." });
}
