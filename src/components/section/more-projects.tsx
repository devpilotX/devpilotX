import { Timeline, TimelineConnectItem, TimelineItem } from "@/components/timeline";
import { otherProjects } from "@/data/projects";

/** The smaller projects, as a dated list. There are no links to code on purpose. */
export default function MoreProjects() {
  return (
    <Timeline>
      {otherProjects.map((project) => (
        <TimelineItem key={project.title} className="flex w-full items-start justify-between gap-6 sm:gap-10">
          <TimelineConnectItem className="flex items-start justify-center">
            <div className="z-10 flex size-10 flex-none shrink-0 items-center justify-center overflow-hidden rounded-full border bg-card shadow ring-2 ring-border">
              <project.icon className="size-4 text-foreground" aria-hidden="true" />
            </div>
          </TimelineConnectItem>
          <div className="flex min-w-0 flex-1 flex-col justify-start gap-2">
            <p className="text-xs text-muted-foreground">{project.dates}</p>
            <h3 className="font-semibold leading-none">{project.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground wrap-break-word">{project.description}</p>
            <p className="text-xs text-muted-foreground">
              <span className="font-medium text-foreground/80">Built with:</span> {project.stack}
            </p>
          </div>
        </TimelineItem>
      ))}
    </Timeline>
  );
}
