import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getSlug, getSortedPosts } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

export default function WritingSection({ limit = 3 }: { limit?: number }) {
  const posts = getSortedPosts().slice(0, limit);

  return (
    <div className="flex min-h-0 flex-col gap-y-4">
      <div className="flex items-baseline justify-between gap-4">
        <h2 id="writing-heading" className="text-xl font-bold">
          Latest writing
        </h2>
        <Link
          href="/blog/"
          className="inline-flex items-center gap-1 rounded-sm text-sm text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          All posts
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </Link>
      </div>
      <ul className="flex flex-col gap-4">
        {posts.map((post) => (
          <li key={getSlug(post)}>
            <Link
              href={`/blog/${getSlug(post)}/`}
              className="group flex flex-col gap-1 rounded-lg border border-border p-4 transition-colors hover:bg-accent/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <span className="font-medium tracking-tight group-hover:text-foreground">{post.title}</span>
              <span className="text-sm leading-relaxed text-muted-foreground">{post.summary}</span>
              <time dateTime={post.publishedAt} className="text-xs text-muted-foreground">
                {formatDate(post.publishedAt)}
              </time>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
