import { allPosts } from "content-collections";

export const BLOG_TITLE = "Blog";
export const BLOG_DESCRIPTION =
  "Notes on building web products, running my own servers and the things I learn along the way.";

export type Post = (typeof allPosts)[number];

export const getSlug = (post: Post) => post._meta.path.replace(/\.mdx$/, "");

export function getSortedPosts() {
  return [...allPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

/** The newest change to any post, for the blog's sitemap entry and feed. */
export function getBlogUpdatedAt() {
  return getSortedPosts()
    .map((post) => post.updatedAt ?? post.publishedAt)
    .sort()
    .at(-1);
}
