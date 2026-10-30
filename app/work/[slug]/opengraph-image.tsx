import { getProject, projects } from "@/content/projects";
import { renderOg, ogContentType, ogSize } from "@/lib/og";

export const alt = "Tarkeon";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getProject(slug);
  if (!item) return renderOg({ title: "Tarkeon" });
  return renderOg({ eyebrow: "Case study", title: item.name, description: item.client });
}
