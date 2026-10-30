import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Mdx } from "@/components/blog/Mdx";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { RelatedPosts } from "@/components/sections/Related";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Card, IconTile } from "@/components/ui/Card";
import { CtaBand } from "@/components/ui/CtaBand";
import { Container } from "@/components/ui/Section";
import { getIndustry } from "@/content/industries";
import { getService } from "@/content/services";
import { getAllPosts, getPost, getRelatedPosts } from "@/lib/blog";
import { pageMetadata } from "@/lib/metadata";
import { articleSchema } from "@/lib/schema";
import { absoluteUrl, formatDate } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${slug}`,
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.updated ?? post.date,
  });
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post.slug);
  const relatedServices = post.services.flatMap((s) => getService(s) ?? []);
  const relatedIndustries = post.industries.flatMap((s) => getIndustry(s) ?? []);
  const toc = post.headings.filter((h) => h.level === 2);
  const url = absoluteUrl(`/blog/${post.slug}`);

  return (
    <>
      <article>
        <header className="relative isolate overflow-hidden border-b border-line">
          <div aria-hidden="true" className="absolute -top-48 right-[-15%] -z-10 h-[28rem] w-[28rem] rounded-full glow-blob opacity-50" />
          <Container className="flex max-w-4xl flex-col gap-6 pt-8 pb-12 md:pt-10 md:pb-16">
            <Breadcrumbs
              items={[
                { name: "Blog", href: "/blog" },
                { name: post.title, href: `/blog/${post.slug}` },
              ]}
              className="mb-4 md:mb-6"
            />
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
              <Badge tone="accent">{post.category}</Badge>
              <span>{post.readingMinutes} min read</span>
            </div>
            <h1 className="text-h1">{post.title}</h1>
            <p className="text-lead text-muted">{post.description}</p>
            <div className="flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="flex items-center gap-3 text-sm">
                <span className="flex size-10 items-center justify-center rounded-full bg-brand font-display font-bold text-white" aria-hidden="true">
                  T
                </span>
                <span className="flex flex-col">
                  <span className="font-medium text-fg">{post.author}</span>
                  <span className="text-muted">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    {post.updated && post.updated !== post.date && (
                      <>
                        {" "}
                        · Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time>
                      </>
                    )}
                  </span>
                </span>
              </p>
              <ShareButtons url={url} title={post.title} />
            </div>
          </Container>
        </header>

        <Container className="grid gap-12 py-12 md:py-16 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-16">
          <div className="min-w-0">
            {toc.length > 0 && (
              <details className="group/toc mb-10 rounded-lg border border-line bg-surface lg:hidden">
                <summary className="flex min-h-12 cursor-pointer items-center justify-between px-4 font-medium text-fg">
                  On this page
                  <Icon name="chevron-down" size={18} className="text-muted transition-transform group-open/toc:rotate-180" />
                </summary>
                <nav aria-label="Table of contents (mobile)" className="border-t border-line px-4 py-3">
                  <ol className="flex flex-col gap-1 text-sm">
                    {toc.map((h) => (
                      <li key={h.id}>
                        <a href={`#${h.id}`} className="flex min-h-10 items-center text-fg-2 hover:text-fg">
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </details>
            )}
            <div className="prose-tk max-w-[44rem]">
              <Mdx source={post.content} />
            </div>
            <div className="mt-12 max-w-[44rem] border-t border-line pt-8">
              <ShareButtons url={url} title={post.title} />
            </div>
          </div>

          <aside className="flex flex-col gap-8 lg:sticky lg:top-28 lg:self-start">
            {toc.length > 0 && (
              <nav aria-label="Table of contents" className="hidden lg:block">
                <p className="mb-3 text-sm font-semibold text-fg">On this page</p>
                <ol className="flex flex-col gap-0.5 border-l border-line text-sm">
                  {toc.map((h) => (
                    <li key={h.id}>
                      <a href={`#${h.id}`} className="-ml-px block border-l border-transparent py-1.5 pl-4 text-muted hover:border-accent hover:text-fg">
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
            {relatedServices.length > 0 && (
              <div>
                <p className="mb-3 text-sm font-semibold text-fg">Related services</p>
                <ul className="flex flex-col gap-2">
                  {relatedServices.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/services/${s.slug}`}
                        className="group flex min-h-11 items-center gap-3 rounded-md border border-line bg-surface px-3 py-2 text-sm text-fg-2 transition-colors hover:border-accent/40 hover:text-fg"
                      >
                        <Icon name={s.icon} size={16} className="text-accent" />
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {relatedIndustries.length > 0 && (
              <div>
                <p className="mb-3 text-sm font-semibold text-fg">For your industry</p>
                <ul className="flex flex-wrap gap-2">
                  {relatedIndustries.map((i) => (
                    <li key={i.slug}>
                      <Link
                        href={`/industries/${i.slug}`}
                        className="inline-flex min-h-9 items-center rounded-full border border-line-strong px-3 text-xs text-fg-2 hover:border-accent/50 hover:text-fg"
                      >
                        {i.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <Card className="gap-3 p-5 md:p-5">
              <IconTile>
                <Icon name="chat" size={20} />
              </IconTile>
              <p className="font-display font-semibold text-fg">Need help with this?</p>
              <p className="text-sm text-muted">Get honest advice for your business on a free call.</p>
              <Link href="/contact" className="inline-flex min-h-10 items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover">
                Book a free consultation <Icon name="arrow" size={14} />
              </Link>
            </Card>
          </aside>
        </Container>
      </article>

      <RelatedPosts posts={related} title="Keep reading" />
      <CtaBand />
      <JsonLd data={articleSchema(post)} />
    </>
  );
}
