import { renderOg, ogContentType, ogSize } from "@/lib/og";

export const alt = "Tarkeon Careers: Freelancers and interns: let's talk.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Careers", title: "Freelancers and interns: let's talk." });
}
