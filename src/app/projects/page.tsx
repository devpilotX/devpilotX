import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { ProjectCard } from "@/components/project-card";
import MoreProjects from "@/components/section/more-projects";
import { DATA } from "@/data/resume";
import { featuredProjects, otherProjects } from "@/data/projects";
import { absoluteUrl, authorRef, breadcrumbNode, graph, pageMetadata } from "@/lib/seo";

const TITLE = "Projects";
const DESCRIPTION =
  "Websites, a CRM, a personal finance site for India, a trading system and more that I have built and run.";

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/projects/",
  image: "/projects/og.png",
  imageAlt: `Projects by ${DATA.name}`,
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: TITLE, path: "/projects/" },
];

const jsonLd = graph(
  {
    "@type": "CollectionPage",
    "@id": absoluteUrl("/projects/#collection"),
    url: absoluteUrl("/projects/"),
    name: `${TITLE} by ${DATA.name}`,
    description: DESCRIPTION,
    inLanguage: "en",
    author: authorRef(),
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: featuredProjects.length,
      itemListElement: featuredProjects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(`/projects/${project.slug}/`),
        name: project.title,
      })),
    },
  },
  breadcrumbNode(crumbs)
);

export default function ProjectsPage() {
  return (
    <div className="flex flex-col gap-14">
      <JsonLd data={jsonLd} />
      <section aria-labelledby="projects-heading">
        <Breadcrumbs items={crumbs} />
        <h1 id="projects-heading" className="text-3xl font-semibold tracking-tighter sm:text-4xl">
          {TITLE}
        </h1>
        <p className="mt-3 text-pretty text-muted-foreground md:text-lg">
          I built and run each of these. Every project has its own page that explains what it does,
          who it is for and how it works.
        </p>
      </section>

      <section aria-labelledby="featured-heading" className="flex flex-col gap-6">
        <h2 id="featured-heading" className="text-xl font-bold">
          Featured projects
        </h2>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {featuredProjects.map((project) => (
            <li key={project.slug} className="h-full">
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="more-heading" className="flex flex-col gap-4">
        <div>
          <h2 id="more-heading" className="text-xl font-bold">
            More projects
          </h2>
          <p className="mt-2 text-muted-foreground">
            {otherProjects.length} smaller products, tools and experiments. Some I needed myself, some
            were built to learn how something works inside.
          </p>
        </div>
        <div className="-mx-4 sm:mx-0">
          <MoreProjects />
        </div>
      </section>
    </div>
  );
}
