import type { FeaturedProject } from "@/data/projects";
import { cn } from "@/lib/utils";

const DOT: Record<FeaturedProject["status"], string> = {
  Live: "bg-emerald-500",
  Prototype: "bg-amber-500",
  "Paper trading": "bg-sky-500",
};

/** The status is in the text; the coloured dot only repeats it. */
export function ProjectStatus({ status, className }: { status: FeaturedProject["status"]; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center gap-1.5 rounded-full border border-border bg-background px-2.5 text-xs font-medium text-foreground",
        className
      )}
    >
      <span className={cn("size-1.5 rounded-full", DOT[status])} aria-hidden="true" />
      {status}
    </span>
  );
}
