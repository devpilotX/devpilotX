import { cn } from "@/lib/utils";
import type { CSSProperties, ElementType, ReactNode } from "react";

interface BlurFadeProps {
  children: ReactNode;
  className?: string;
  /** Seconds to wait before the fade starts. */
  delay?: number;
  as?: ElementType;
}

/**
 * Fades and unblurs its children once on page load. It is plain CSS (see
 * .blur-fade in globals.css), so content shows before any JavaScript runs,
 * and the animation is skipped for people who ask for reduced motion.
 */
export default function BlurFade({ children, className, delay = 0, as: Tag = "div" }: BlurFadeProps) {
  const style = { "--blur-fade-delay": `${(0.04 + delay).toFixed(2)}s` } as CSSProperties;

  return (
    <Tag className={cn("blur-fade", className)} style={style}>
      {children}
    </Tag>
  );
}
