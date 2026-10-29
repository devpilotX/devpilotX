import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { FeaturedProject } from "@/data/projects";
import { ProjectStatus } from "@/components/project-status";
import { ScreenshotImage } from "@/components/screenshot";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: FeaturedProject;
  /** Heading level inside the card, so it fits the page outline. */
  headingLevel?: "h2" | "h3";
  className?: string;
}

/**
 * The project title is the card's only main link and is stretched over the
 * whole card. The live site link sits above it, so both stay clickable and
 * a screen reader hears each link once.
 */
// Links to project pages do not prefetch: each project page preloads its
// large first screenshot, and a prefetch would download it on this page.
export function ProjectCard({ project, headingLevel = "h3", className }: ProjectCardProps) {
  const Heading = headingLevel;

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow duration-200 has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-ring hover:shadow-lg hover:shadow-primary/5",
        className
      )}
    >
      <div className="relative aspect-16/10 overflow-hidden border-b border-border bg-muted">
        <ScreenshotImage
          shot={project.cover}
          sizes="(min-width: 640px) 330px, calc(100vw - 48px)"
          className="size-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-2">
          <ProjectStatus status={project.status} />
          <span className="text-xs tabular-nums text-muted-foreground">{project.dates}</span>
        </div>
        <div className="flex flex-col gap-1">
          <Heading className="text-lg font-semibold leading-tight">
            <Link
              href={`/projects/${project.slug}/`}
              prefetch={false}
              className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
            >
              {project.title}
            </Link>
          </Heading>
          <p className="text-sm font-medium text-foreground/80">{project.tagline}</p>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">{project.summary}</p>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-2 text-sm">
          <span className="inline-flex items-center gap-1 font-medium" aria-hidden="true">
            See the project
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
          </span>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex min-h-6 items-center gap-1 rounded-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {new URL(project.liveUrl).host}
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
