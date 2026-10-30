import type { Metadata } from "next";
import { PostCard } from "@/components/sections/Cards";
import { FilterGrid } from "@/components/sections/FilterGrid";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";
import { Section } from "@/components/ui/Section";
import { getAllPosts, toMeta } from "@/lib/blog";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Blog: Practical Guides on Websites, AI and Automation",
  description:
    "Plain-English guides for small business owners in India: website costs, AI chatbots, automation and getting more enquiries online.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getAllPosts().map(toMeta);
  const categories = [...new Set(posts.map((p) => p.category))];

  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "Blog", href: "/blog" }]}
        eyebrow="Blog"
        title="Practical guides for growing your business online."
        description="Plain-English articles on websites, AI and automation for small business owners. No jargon, no hype."
      />
      <Section aria-label="Articles">
        {posts.length > 0 ? (
          <FilterGrid
            label="Filter articles by category"
            filters={categories.map((c) => ({ id: c, label: c }))}
            items={posts.map((p) => ({ id: p.slug, tags: [p.category], node: <PostCard post={p} headingLevel={2} /> }))}
          />
        ) : (
          <p className="text-muted">New articles are coming soon.</p>
        )}
      </Section>
      <CtaBand title="Have a question we haven’t answered?" description="Ask us directly. We reply within one working day, and we’re happy to just give advice." />
    </>
  );
}
