import type { MetadataRoute } from "next";
import { DATA } from "@/data/resume";
import { featuredProjects, projectsUpdatedAt } from "@/data/projects";
import { getBlogUpdatedAt, getSlug, getSortedPosts } from "@/lib/blog";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

// Every date here comes from the content, so lastmod only changes when a page
// changes. Search engines stop trusting lastmod that moves on every build.
export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getSortedPosts().map((post) => ({
    url: absoluteUrl(`/blog/${getSlug(post)}/`),
    lastModified: post.updatedAt ?? post.publishedAt,
  }));

  const projects = featuredProjects.map((project) => ({
    url: absoluteUrl(`/projects/${project.slug}/`),
    lastModified: project.updatedAt,
    images: project.gallery.map((shot) => absoluteUrl(shot.src.src)),
  }));

  return [
    { url: absoluteUrl("/"), lastModified: DATA.updatedAt, images: [absoluteUrl(DATA.avatarUrl)] },
    {
      url: absoluteUrl("/projects/"),
      lastModified: projectsUpdatedAt,
      images: featuredProjects.map((project) => absoluteUrl(project.cover.src.src)),
    },
    ...projects,
    { url: absoluteUrl("/blog/"), lastModified: getBlogUpdatedAt() ?? DATA.updatedAt },
    ...posts,
  ];
}
