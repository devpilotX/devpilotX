import { DATA } from "@/data/resume";
import { featuredProjects, otherProjects } from "@/data/projects";
import { getSlug, getSortedPosts } from "@/lib/blog";
import { absoluteUrl } from "@/lib/seo";

// A plain text summary of the site for AI assistants, following the
// llms.txt proposal (https://llmstxt.org). Written to out/llms.txt.
export const dynamic = "force-static";

export function GET() {
  const lines = [
    `# ${DATA.name} (${DATA.brand})`,
    "",
    `> ${DATA.description}`,
    "",
    DATA.lead,
    "",
    `Contact: ${DATA.contact.email}`,
    "",
    "## Projects",
    "",
    ...featuredProjects.map(
      (project) => `- [${project.title}](${absoluteUrl(`/projects/${project.slug}/`)}): ${project.summary}`
    ),
    "",
    "## Smaller projects",
    "",
    ...otherProjects.map((project) => `- ${project.title} (${project.dates}): ${project.description}`),
    "",
    "## Writing",
    "",
    ...getSortedPosts().map((post) => `- [${post.title}](${absoluteUrl(`/blog/${getSlug(post)}/`)}): ${post.summary}`),
    "",
    "## Profiles",
    "",
    ...Object.values(DATA.contact.social)
      .filter((social) => social.url.startsWith("https://"))
      .map((social) => `- [${social.name}](${social.url})`),
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
