import fs from "node:fs";
import path from "node:path";
import GithubSlugger from "github-slugger";
import matter from "gray-matter";
import { cache } from "react";

// Blog posts are MDX files in content/blog/. The file name (without .mdx) is the URL slug.

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  category: string;
  author: string;
  readingMinutes: number;
  /** Service and industry slugs this post links to, from frontmatter. */
  services: string[];
  industries: string[];
};

export type Post = PostMeta & {
  content: string;
  headings: { id: string; text: string; level: 2 | 3 }[];
};

function readingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function extractHeadings(content: string): Post["headings"] {
  // Same slug rules as rehype-slug, so table-of-contents links match heading ids
  const slugger = new GithubSlugger();
  const headings: Post["headings"] = [];
  let inCode = false;
  for (const line of content.split(/\r?\n/)) {
    if (line.startsWith("```")) inCode = !inCode;
    if (inCode) continue;
    const match = /^(##|###)\s+(.+?)\s*$/.exec(line);
    if (!match) continue;
    const text = match[2]!.replace(/[*_`]/g, "");
    headings.push({ id: slugger.slug(text), text, level: match[1] === "##" ? 2 : 3 });
  }
  return headings;
}

function parseFile(file: string): Post {
  const slug = file.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const required = ["title", "description", "date", "category"] as const;
  for (const key of required) {
    if (!data[key]) throw new Error(`Blog post "${file}" is missing "${key}" in its frontmatter.`);
  }
  return {
    slug,
    title: String(data.title),
    description: String(data.description),
    date: new Date(data.date).toISOString().slice(0, 10),
    updated: data.updated ? new Date(data.updated).toISOString().slice(0, 10) : undefined,
    category: String(data.category),
    author: String(data.author ?? "Tarkeon team"),
    readingMinutes: readingTime(content),
    services: Array.isArray(data.services) ? data.services.map(String) : [],
    industries: Array.isArray(data.industries) ? data.industries.map(String) : [],
    content,
    headings: extractHeadings(content),
  };
}

/** All posts, newest first. Drafts (draft: true in frontmatter) are skipped in production. */
export const getAllPosts = cache((): Post[] => {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .filter((f) => {
      if (process.env.NODE_ENV !== "production") return true;
      return !matter(fs.readFileSync(path.join(BLOG_DIR, f), "utf8")).data.draft;
    })
    .map(parseFile)
    .sort((a, b) => b.date.localeCompare(a.date));
});

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function toMeta(post: Post): PostMeta {
  const { content: _content, headings: _headings, ...meta } = post;
  return meta;
}

export function getPostsBySlugs(slugs: string[]): PostMeta[] {
  const all = getAllPosts();
  return slugs.flatMap((s) => {
    const p = all.find((x) => x.slug === s);
    return p ? [toMeta(p)] : [];
  });
}

/** Posts in the same category first, then the newest others. */
export function getRelatedPosts(slug: string, limit = 3): PostMeta[] {
  const all = getAllPosts();
  const current = all.find((p) => p.slug === slug);
  const others = all.filter((p) => p.slug !== slug);
  const same = others.filter((p) => p.category === current?.category);
  const rest = others.filter((p) => p.category !== current?.category);
  return [...same, ...rest].slice(0, limit).map(toMeta);
}
