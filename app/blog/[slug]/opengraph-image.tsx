import { getAllPosts, getPost } from "@/lib/blog";
import { renderOg, ogContentType, ogSize } from "@/lib/og";

export const alt = "Tarkeon";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getPost(slug);
  if (!item) return renderOg({ title: "Tarkeon" });
  return renderOg({ eyebrow: `Blog · ${item.category}`, title: item.title, description: `${item.readingMinutes} min read` });
}
