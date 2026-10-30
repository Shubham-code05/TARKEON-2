import { getService, services } from "@/content/services";
import { renderOg, ogContentType, ogSize } from "@/lib/og";

export const alt = "Tarkeon";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getService(slug);
  if (!item) return renderOg({ title: "Tarkeon" });
  return renderOg({ eyebrow: "Service", title: item.headline, description: `From ₹${item.startingPrice.toLocaleString("en-IN")} · ${item.title}` });
}
