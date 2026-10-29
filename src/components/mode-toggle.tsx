"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import type { ComponentProps } from "react";

// The icon is picked by CSS from the class next-themes sets on <html>, so the
// server HTML and the first client render always match. Extra props and the
// ref are passed through so a tooltip trigger can wrap the button.
export function ModeToggle({ onClick, ...props }: ComponentProps<"button">) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      {...props}
      onClick={(event) => {
        onClick?.(event);
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
      }}
    >
      <Moon className="size-5 dark:hidden" aria-hidden="true" />
      <Sun className="hidden size-5 dark:block" aria-hidden="true" />
    </button>
  );
}
