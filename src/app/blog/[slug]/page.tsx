import { allPosts } from "content-collections";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXContent } from "@content-collections/mdx/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { ShareLinks } from "@/components/share-links";
import { mdxComponents } from "@/mdx-components";
import { BLOG_TITLE, getSlug, getSortedPosts } from "@/lib/blog";
import { absoluteUrl, authorRef, breadcrumbNode, graph, pageMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return allPosts.map((post) => ({ slug: getSlug(post) }));
}

type Props = { params: Promise<{ slug: string }> };

function ogImagePath(slug: string, image?: string) {
  return image ?? `/blog/${slug}/og.png`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = allPosts.find((p) => getSlug(p) === slug);
  if (!post) return {};

  return pageMetadata({
    title: post.title,
    description: post.summary,
    path: `/blog/${slug}/`,
    image: ogImagePath(slug, post.image),
    imageAlt: post.title,
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt ?? post.publishedAt,
  });
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const sortedPosts = getSortedPosts();
  const currentIndex = sortedPosts.findIndex((p) => getSlug(p) === slug);
  const post = sortedPosts[currentIndex];

  if (!post) {
    notFound();
  }

  // The list is newest first, so the newer post sits before this one.
  const newerPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null;
  const olderPost = currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null;
  const url = absoluteUrl(`/blog/${slug}/`);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: BLOG_TITLE, path: "/blog/" },
    { name: post.title, path: `/blog/${slug}/` },
  ];

  const jsonLd = graph(
    {
      "@type": "BlogPosting",
      "@id": `${url}#article`,
      headline: post.title,
      description: post.summary,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt ?? post.publishedAt,
      author: authorRef(),
      publisher: authorRef(),
      image: [absoluteUrl(ogImagePath(slug, post.image))],
      url,
      mainEntityOfPage: url,
      inLanguage: "en",
      wordCount: post.content.split(/\s+/).filter(Boolean).length,
      isPartOf: { "@type": "Blog", "@id": absoluteUrl("/blog/#blog"), name: BLOG_TITLE, url: absoluteUrl("/blog/") },
    },
    breadcrumbNode(crumbs)
  );

  return (
    <article aria-labelledby="post-heading">
      <JsonLd data={jsonLd} />
      <Breadcrumbs items={crumbs} />
      <header className="flex flex-col gap-4">
        <h1 id="post-heading" className="text-3xl font-semibold leading-tight tracking-tighter md:text-4xl">
          {post.title}
        </h1>
        <p className="text-sm text-muted-foreground">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          {post.updatedAt && post.updatedAt !== post.publishedAt && (
            <>
              {" · Updated "}
              <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time>
            </>
          )}
        </p>
      </header>
      <div className="my-6 flex w-full items-center" aria-hidden="true">
        <div
          className="h-px flex-1 bg-border"
          style={{
            maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
          }}
        />
      </div>
      <div className="prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
        <MDXContent code={post.mdx} components={mdxComponents} />
      </div>

      <ShareLinks url={url} title={post.title} />

      <nav aria-label="More posts" className="mt-12 max-w-2xl pt-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row">
          {olderPost ? (
            <Link
              href={`/blog/${getSlug(olderPost)}/`}
              rel="prev"
              className="group flex flex-1 flex-col gap-1 rounded-lg border border-border p-4 transition-colors hover:bg-accent/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <ChevronLeft className="size-3" aria-hidden="true" />
                Older post
              </span>
              <span className="whitespace-normal text-sm font-medium wrap-break-word">{olderPost.title}</span>
            </Link>
          ) : (
            <div className="hidden flex-1 sm:block" />
          )}
          {newerPost ? (
            <Link
              href={`/blog/${getSlug(newerPost)}/`}
              rel="next"
              className="group flex flex-1 flex-col gap-1 rounded-lg border border-border p-4 text-right transition-colors hover:bg-accent/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                Newer post
                <ChevronRight className="size-3" aria-hidden="true" />
              </span>
              <span className="whitespace-normal text-sm font-medium wrap-break-word">{newerPost.title}</span>
            </Link>
          ) : (
            <div className="hidden flex-1 sm:block" />
          )}
        </div>
      </nav>
    </article>
  );
}
