/* eslint-disable @next/next/no-img-element */
import type { Screenshot } from "@/data/projects";
import { cn } from "@/lib/utils";

interface ScreenshotImageProps {
  shot: Screenshot;
  /** The sizes attribute: how wide the image is shown at each breakpoint. */
  sizes: string;
  /** Load at once and ahead of other images. Use it for the first screen only. */
  priority?: boolean;
  className?: string;
}

/**
 * A screenshot in two or three widths. The browser picks the smallest file
 * that is sharp enough for the slot and the screen. Width and height are
 * always set, so nothing moves while the image loads.
 */
export function ScreenshotImage({ shot, sizes, priority = false, className }: ScreenshotImageProps) {
  const candidates = [shot.small, shot.medium, shot.src].filter((image) => image !== undefined);

  return (
    <img
      src={shot.src.src}
      srcSet={candidates.map((image) => `${image.src} ${image.width}w`).join(", ")}
      sizes={sizes}
      width={shot.src.width}
      height={shot.src.height}
      alt={shot.alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      // The first screenshot is decoded with the rest of the first frame, so
      // it can paint at once instead of waiting for a later frame.
      decoding={priority ? "sync" : "async"}
      className={cn("h-auto w-full", className)}
    />
  );
}

export function ScreenshotFigure({
  shot,
  sizes,
  priority,
  className,
}: ScreenshotImageProps) {
  return (
    <figure className={cn("flex flex-col gap-2.5", className)}>
      <div
        className={cn(
          "overflow-hidden border border-border bg-muted shadow-sm",
          shot.device === "phone" ? "rounded-[1.75rem]" : "rounded-xl"
        )}
      >
        <ScreenshotImage shot={shot} sizes={sizes} priority={priority} />
      </div>
      <figcaption className="text-sm leading-relaxed text-muted-foreground">{shot.caption}</figcaption>
    </figure>
  );
}
