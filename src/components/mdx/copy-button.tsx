"use client";

import { Check, Copy } from "lucide-react";
import { useRef, useState } from "react";

/** Copies the code of the block it sits in. The code itself is static HTML. */
export function CopyButton() {
  const ref = useRef<HTMLButtonElement>(null);
  const [copied, setCopied] = useState(false);

  async function copy() {
    const code = ref.current?.closest("[data-code-block]")?.querySelector("pre code")?.textContent ?? "";
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      ref={ref}
      type="button"
      onClick={copy}
      aria-label={copied ? "Copied" : "Copy code"}
      className="absolute right-3 top-3 flex size-8 cursor-pointer items-center justify-center rounded-md border border-border bg-background text-foreground opacity-100 transition-opacity focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-ring group-hover:opacity-100 lg:opacity-0"
    >
      {copied ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
      <span className="sr-only" aria-live="polite">
        {copied ? "Code copied" : ""}
      </span>
    </button>
  );
}
