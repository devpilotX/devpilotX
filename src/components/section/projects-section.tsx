import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import { SectionHeader } from "@/components/section-header";
import { featuredProjects, otherProjects } from "@/data/projects";

const BLUR_FADE_DELAY = 0.04;

export default function ProjectsSection() {
  const total = featuredProjects.length + otherProjects.length;

  return (
    <div className="flex min-h-0 flex-col gap-y-8">
      <SectionHeader
        id="projects-heading"
        title="What I'm building"
        description="Real products I designed, built and run. Techcyme and PaisaReality are live, so you can try them yourself."
      />
      <ul className="mx-auto grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
        {featuredProjects.map((project, index) => (
          <BlurFade key={project.slug} as="li" delay={BLUR_FADE_DELAY * 12 + index * 0.05} className="h-full">
            <ProjectCard project={project} />
          </BlurFade>
        ))}
      </ul>
      <div className="flex justify-center">
        <Link
          href="/projects/"
          className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-background px-5 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          See all {total} projects
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
