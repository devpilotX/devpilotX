import { CopyButton } from "@/components/mdx/copy-button";
import { MediaContainer } from "@/components/mdx/media-container";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type CodeProps = ComponentProps<"code"> & {
  "data-language"?: string;
};

export const mdxComponents = {
  MediaContainer,
  // rehype-pretty-code wraps each block in a <figure> with an optional
  // <figcaption> title; the <pre> holds the highlighted lines.
  pre: ({ className, ...props }: ComponentProps<"pre">) => (
    <div data-code-block className="group relative">
      <pre {...props} className={cn("overflow-x-auto p-3", className)} />
      <CopyButton />
    </div>
  ),
  hr: (props: ComponentProps<"hr">) => (
    <div className="my-10 flex w-full items-center" {...props}>
      <div
        className="h-px flex-1 bg-border"
        style={{
          maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
        }}
      />
    </div>
  ),
  table: (props: ComponentProps<"table">) => (
    <div className="my-6 overflow-hidden rounded-xl border border-border">
      <div className="w-full overflow-x-auto">
        <table className="m-0! w-full min-w-full border-separate border-spacing-0" {...props} />
      </div>
    </div>
  ),
  code: ({ children, ...props }: CodeProps) => {
    if (props["data-language"]) {
      return <code {...props}>{children}</code>;
    }
    return (
      <code
        className="rounded-md bg-muted/60 px-1.5 py-0.5 font-mono text-sm text-foreground/90 dark:bg-muted/40"
        {...props}
      >
        {children}
      </code>
    );
  },
} as const;
