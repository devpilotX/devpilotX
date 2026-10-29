import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  description?: React.ReactNode;
  /** The id of the heading, for aria-labelledby on the section. */
  id?: string;
  className?: string;
}

/** The centred heading and intro used at the top of the larger sections. */
export function SectionHeader({ title, description, id, className }: SectionHeaderProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-y-3 text-center", className)}>
      <h2 id={id} className="text-3xl font-bold tracking-tighter text-balance sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-xl text-balance text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
