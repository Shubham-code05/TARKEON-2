import { Reveal } from "@/components/motion/Reveal";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import type { Project } from "@/content/types";
import type { PostMeta } from "@/lib/blog";
import { PostCard, ProjectCard } from "./Cards";

/** Related case studies. Hidden when there are none. */
export function RelatedProjects({ projects, title = "Related projects" }: { projects: Project[]; title?: string }) {
  if (projects.length === 0) return null;
  return (
    <Section aria-labelledby="related-projects">
      <SectionHeader
        eyebrow="Our work"
        title={title}
        id="related-projects"
        action={
          <Button href="/work" variant="secondary" size="sm">
            All projects
          </Button>
        }
      />
      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projects.slice(0, 3).map((p, i) => (
          <Reveal as="li" key={p.slug} delay={i * 0.06}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

/** Related blog posts. Hidden when there are none. */
export function RelatedPosts({ posts, title = "Worth reading" }: { posts: PostMeta[]; title?: string }) {
  if (posts.length === 0) return null;
  return (
    <Section aria-labelledby="related-posts">
      <SectionHeader
        eyebrow="From the blog"
        title={title}
        id="related-posts"
        action={
          <Button href="/blog" variant="secondary" size="sm">
            All articles
          </Button>
        }
      />
      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {posts.slice(0, 3).map((p, i) => (
          <Reveal as="li" key={p.slug} delay={i * 0.06}>
            <PostCard post={p} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
