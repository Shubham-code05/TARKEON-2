import { renderOg, ogContentType, ogSize } from "@/lib/og";

export const alt = "Tarkeon: websites, AI chatbots and automation for growing businesses";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "Web, AI and Automation studio",
    title: "Websites and AI assistants that bring in more enquiries.",
  });
}
