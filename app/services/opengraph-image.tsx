import { renderOg, ogContentType, ogSize } from "@/lib/og";

export const alt = "Tarkeon Services: Websites, web apps, AI chatbots and automation.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Services", title: "Websites, web apps, AI chatbots and automation." });
}
