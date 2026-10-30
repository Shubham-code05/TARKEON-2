import { getIndustry, industries } from "@/content/industries";
import { renderOg, ogContentType, ogSize } from "@/lib/og";

export const alt = "Tarkeon";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getIndustry(slug);
  if (!item) return renderOg({ title: "Tarkeon" });
  return renderOg({ eyebrow: `For ${item.name.toLowerCase()}`, title: item.headline, description: undefined });
}
