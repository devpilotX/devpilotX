/* eslint-disable @next/next/no-img-element */
import { ChevronDown } from "lucide-react";
import { DATA } from "@/data/resume";
import { withBase } from "@/lib/utils";

// A native <details> element: it opens and closes with no JavaScript, works
// with the keyboard and tells screen readers whether it is expanded.
export default function WorkSection() {
  return (
    <div className="grid w-full gap-6">
      {DATA.work.map((work) => (
        <details key={work.company} open className="group grid gap-2">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-x-3 rounded-md text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring [&::-webkit-details-marker]:hidden">
            <span className="flex min-w-0 flex-1 items-center gap-x-3">
              <img
                src={withBase(work.logoUrl)}
                alt=""
                width={40}
                height={40}
                loading="lazy"
                decoding="async"
                className="size-8 flex-none overflow-hidden rounded-full border bg-background object-contain p-1 shadow ring-2 ring-border md:size-10"
              />
              <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="flex items-center gap-2 font-semibold leading-none">
                  {work.company}
                  <ChevronDown
                    className="size-3.5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                </span>
                <span className="font-sans text-sm text-muted-foreground">{work.title}</span>
              </span>
            </span>
            <span className="flex-none text-right text-xs tabular-nums text-muted-foreground">
              {work.end === "Present" ? `Since ${work.start}` : `${work.start}–${work.end}`}
            </span>
          </summary>
          <p className="ml-11 text-sm leading-relaxed text-muted-foreground md:ml-13">{work.description}</p>
        </details>
      ))}
    </div>
  );
}
