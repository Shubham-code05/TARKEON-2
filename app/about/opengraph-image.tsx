import { renderOg, ogContentType, ogSize } from "@/lib/og";

export const alt = "Tarkeon About: A small studio in Lucknow building software small businesses can afford.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "About", title: "A small studio in Lucknow building software small businesses can afford." });
}
