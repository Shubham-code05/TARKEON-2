import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { ComponentPropsWithoutRef } from "react";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

function MdxLink({ href = "", children, ...rest }: ComponentPropsWithoutRef<"a">) {
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
}

function Table(props: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="relative overflow-x-auto rounded-lg border border-line" role="region" aria-label="Table" tabIndex={0}>
      <table {...props} style={{ display: "table" }} />
    </div>
  );
}

const components = { a: MdxLink, table: Table };

/** Renders an MDX blog post on the server. Headings get ids for the table of contents. */
export function Mdx({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{ mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] } }}
    />
  );
}
