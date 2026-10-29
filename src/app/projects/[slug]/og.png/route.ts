import { featuredProjects, getProject } from "@/data/projects";
import { renderOgCard, renderProjectOg } from "@/lib/og";

// Written to out/projects/<slug>/og.png at build time.
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return featuredProjects.map((project) => ({ slug: project.slug }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return renderOgCard({ title: "Project not found" });
  }

  return renderProjectOg({
    title: project.title,
    tagline: project.tagline,
    status: project.status,
    coverFile: `${project.slug}.jpg`,
  });
}
