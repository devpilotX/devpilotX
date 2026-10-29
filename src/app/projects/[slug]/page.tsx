import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Info, Mail } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { EmailOff } from "@/components/email-off";
import { JsonLd } from "@/components/json-ld";
import { ProjectStatus } from "@/components/project-status";
import { ScreenshotFigure } from "@/components/screenshot";
import { DATA } from "@/data/resume";
import { featuredProjects, getProject } from "@/data/projects";
import { absoluteUrl, authorRef, breadcrumbNode, graph, pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return featuredProjects.map((project) => ({ slug: project.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return pageMetadata({
    title: project.metaTitle,
    description: project.metaDescription,
    path: `/projects/${project.slug}/`,
    image: `/projects/${project.slug}/og.png`,
    imageAlt: `${project.title}: ${project.tagline}`,
  });
}

// Screenshots break out of the text column on wide screens.
const WIDE = "lg:-mx-28";
const WIDE_SIZES = "(min-width: 1024px) 896px, calc(100vw - 48px)";

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const index = featuredProjects.indexOf(project);
  const next = featuredProjects[(index + 1) % featuredProjects.length];
  const path = `/projects/${project.slug}/`;
  const url = absoluteUrl(path);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects/" },
    { name: project.title, path },
  ];
  const gallery = project.gallery.filter((shot) => shot !== project.cover);
  const desktopShots = gallery.filter((shot) => shot.device === "desktop");
  const phoneShots = gallery.filter((shot) => shot.device === "phone");
  const liveHost = project.liveUrl ? new URL(project.liveUrl).host : null;

  const jsonLd = graph(
    {
      "@type": "CreativeWork",
      "@id": `${url}#project`,
      name: project.title,
      headline: `${project.title}: ${project.tagline}`,
      description: project.summary,
      url,
      ...(project.liveUrl ? { sameAs: [project.liveUrl] } : {}),
      image: project.gallery.map((shot) => absoluteUrl(shot.src.src)),
      creator: authorRef(),
      dateCreated: project.startDate,
      dateModified: project.updatedAt,
      keywords: project.stack.join(", "),
      inLanguage: "en",
      creativeWorkStatus: project.status,
    },
    breadcrumbNode(crumbs)
  );

  return (
    <article aria-labelledby="project-heading" className="flex flex-col gap-12">
      <JsonLd data={jsonLd} />
      <header>
        <Breadcrumbs items={crumbs} />
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <ProjectStatus status={project.status} />
          <span className="text-sm tabular-nums text-muted-foreground">{project.dates}</span>
        </div>
        <h1 id="project-heading" className="text-4xl font-semibold tracking-tighter sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-3 text-pretty text-lg text-muted-foreground">{project.tagline}</p>
        <dl className="mt-6 grid gap-4 rounded-xl border border-border bg-card p-5 text-sm sm:grid-cols-2">
          <div className="flex flex-col gap-1">
            <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">My role</dt>
            <dd>{project.role}</dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Made for</dt>
            <dd>{project.audience}</dd>
          </div>
        </dl>
        {project.liveUrl && liveHost && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex h-10 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Visit {liveHost}
            <ArrowUpRight className="size-4" aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        )}
      </header>

      {/* Not animated: this screenshot is usually the largest thing on the
          first screen, so it should paint as soon as it arrives. */}
      <ScreenshotFigure shot={project.cover} sizes={WIDE_SIZES} priority className={WIDE} />

      {project.notice && (
        <p
          role="note"
          className="flex gap-3 rounded-xl border border-amber-500/40 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950 dark:bg-amber-950/30 dark:text-amber-100"
        >
          <Info className="mt-0.5 size-4 flex-none" aria-hidden="true" />
          <span>{project.notice}</span>
        </p>
      )}

      <section aria-labelledby="overview-heading" className="flex flex-col gap-4">
        <h2 id="overview-heading" className="text-2xl font-bold tracking-tight">
          What it is
        </h2>
        {project.overview.map((paragraph) => (
          <p key={paragraph} className="leading-relaxed text-muted-foreground">
            {paragraph}
          </p>
        ))}
      </section>

      <section aria-labelledby="features-heading" className="flex flex-col gap-5">
        <h2 id="features-heading" className="text-2xl font-bold tracking-tight">
          What it does
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {project.features.map((feature) => (
            <li key={feature.title} className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-semibold">{feature.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{feature.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {gallery.length > 0 && (
        <section aria-labelledby="screens-heading" className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2 id="screens-heading" className="text-2xl font-bold tracking-tight">
              Screenshots
            </h2>
            <p className="text-sm text-muted-foreground">{project.screenshotNote}</p>
          </div>
          <div className={`flex flex-col gap-10 ${WIDE}`}>
            {desktopShots.map((shot) => (
              <ScreenshotFigure key={shot.alt} shot={shot} sizes={WIDE_SIZES} />
            ))}
          </div>
          {phoneShots.length > 0 && (
            <div className="grid grid-cols-2 gap-4 sm:gap-8 sm:px-12">
              {phoneShots.map((shot) => (
                <ScreenshotFigure key={shot.alt} shot={shot} sizes="(min-width: 640px) 260px, 45vw" />
              ))}
            </div>
          )}
        </section>
      )}

      <section aria-labelledby="build-heading" className="flex flex-col gap-4">
        <h2 id="build-heading" className="text-2xl font-bold tracking-tight">
          How it is built
        </h2>
        {project.build.map((paragraph) => (
          <p key={paragraph} className="leading-relaxed text-muted-foreground">
            {paragraph}
          </p>
        ))}
        <ul className="flex flex-wrap gap-2 pt-1" aria-label="Built with">
          {project.stack.map((item) => (
            <li
              key={item}
              className="flex h-7 items-center rounded-lg border border-border bg-background px-3 text-xs font-medium"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <footer className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <p className="font-semibold">Have a project in mind?</p>
          <p className="text-sm text-muted-foreground">Tell me what you want to build, or ask me about this one.</p>
        </div>
        <EmailOff>
          <a
            href={`mailto:${DATA.contact.email}?subject=${encodeURIComponent(`About ${project.title}`)}`}
            className="inline-flex h-10 flex-none items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <Mail className="size-4" aria-hidden="true" />
            Email me
          </a>
        </EmailOff>
      </footer>

      <nav aria-label="Next project" className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/projects/"
          className="rounded-sm text-sm text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          All projects
        </Link>
        <Link
          href={`/projects/${next.slug}/`}
          prefetch={false}
          className="group inline-flex items-center gap-2 rounded-lg border border-border p-4 transition-colors hover:bg-accent/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <span className="flex flex-col">
            <span className="text-xs text-muted-foreground">Next project</span>
            <span className="font-medium">{next.title}</span>
          </span>
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" />
        </Link>
      </nav>
    </article>
  );
}
