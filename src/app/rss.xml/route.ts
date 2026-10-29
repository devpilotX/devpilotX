import { DATA } from "@/data/resume";
import { BLOG_DESCRIPTION, getSlug, getSortedPosts } from "@/lib/blog";
import { absoluteUrl } from "@/lib/seo";

// Written to out/rss.xml at build time.
export const dynamic = "force-static";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const posts = getSortedPosts();
  const newest = posts[0];
  const items = posts
    .map((post) => {
      const url = absoluteUrl(`/blog/${getSlug(post)}/`);
      return [
        "    <item>",
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>`,
        `      <description>${escapeXml(post.summary)}</description>`,
        `      <author>${DATA.contact.email} (${escapeXml(DATA.name)})</author>`,
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    `    <title>${escapeXml(`${DATA.name}'s blog`)}</title>`,
    `    <link>${absoluteUrl("/blog/")}</link>`,
    `    <description>${escapeXml(BLOG_DESCRIPTION)}</description>`,
    "    <language>en</language>",
    `    <atom:link href="${absoluteUrl("/rss.xml")}" rel="self" type="application/rss+xml" />`,
    ...(newest ? [`    <lastBuildDate>${new Date(newest.updatedAt ?? newest.publishedAt).toUTCString()}</lastBuildDate>`] : []),
    items,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
