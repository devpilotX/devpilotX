import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { BLOG_DESCRIPTION, BLOG_TITLE, getSlug, getSortedPosts } from "@/lib/blog";
import { absoluteUrl, authorRef, breadcrumbNode, graph, pageMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export const metadata = pageMetadata({
  title: BLOG_TITLE,
  description: BLOG_DESCRIPTION,
  path: "/blog/",
  image: "/blog/og.png",
  imageAlt: "Blog by Dipanshu",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog/" },
];

export default function BlogPage() {
  const posts = getSortedPosts();

  const jsonLd = graph(
    {
      "@type": "Blog",
      "@id": absoluteUrl("/blog/#blog"),
      url: absoluteUrl("/blog/"),
      name: BLOG_TITLE,
      description: BLOG_DESCRIPTION,
      inLanguage: "en",
      author: authorRef(),
      blogPost: posts.map((post) => ({
        "@type": "BlogPosting",
        headline: post.title,
        url: absoluteUrl(`/blog/${getSlug(post)}/`),
        datePublished: post.publishedAt,
        dateModified: post.updatedAt ?? post.publishedAt,
        author: authorRef(),
      })),
    },
    breadcrumbNode(crumbs)
  );

  return (
    <section aria-labelledby="blog-heading">
      <JsonLd data={jsonLd} />
      <Breadcrumbs items={crumbs} />
      <div className="mb-8 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <h1 id="blog-heading" className="text-2xl font-semibold tracking-tight">
            {BLOG_TITLE}
          </h1>
          <span className="rounded-md border border-border bg-card px-2 py-1 text-sm text-muted-foreground">
            {posts.length} {posts.length === 1 ? "post" : "posts"}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">{BLOG_DESCRIPTION}</p>
      </div>

      {posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-border px-4 py-12">
          <p className="text-center text-muted-foreground">No posts yet. Check back soon.</p>
        </div>
      ) : (
        <ol className="flex flex-col gap-5">
          {posts.map((post, index) => (
            <li key={getSlug(post)}>
              <Link
                className="group flex items-start gap-x-2 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                href={`/blog/${getSlug(post)}/`}
              >
                <span className="mt-[5px] text-xs font-medium tabular-nums" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}.
                </span>
                <span className="flex flex-1 flex-col gap-y-2">
                  <span className="text-lg font-medium tracking-tight">
                    {post.title}
                    <ChevronRight
                      className="ml-1 inline-block size-4 -translate-x-2 stroke-3 text-muted-foreground opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 motion-reduce:transition-none"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{post.summary}</span>
                  <time dateTime={post.publishedAt} className="text-xs text-muted-foreground">
                    {formatDate(post.publishedAt)}
                  </time>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
