"use client";

import { useState } from "react";
import { Check, Link2 } from "lucide-react";
import { Icons } from "@/components/icons";

const btn =
  "inline-flex h-9 items-center gap-2 rounded-full border border-border bg-background px-4 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

/** Share row shown under a blog post: X, LinkedIn and copy-to-clipboard. */
export function ShareLinks({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const shareUrl = encodeURIComponent(url);
  const shareText = encodeURIComponent(title);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard is blocked in some browsers; the X and LinkedIn links still work.
    }
  }

  return (
    <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-border pt-6">
      <span className="text-sm font-medium">Share this post</span>
      <div className="flex flex-wrap gap-2">
        <a
          className={btn}
          href={`https://x.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icons.x className="size-4" aria-hidden="true" />
          X
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
        <a
          className={btn}
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icons.linkedin className="size-4" aria-hidden="true" />
          LinkedIn
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
        <button type="button" onClick={copy} className={`${btn} cursor-pointer`} aria-live="polite">
          {copied ? <Check className="size-4" aria-hidden="true" /> : <Link2 className="size-4" aria-hidden="true" />}
          {copied ? "Copied" : "Copy link"}
        </button>
      </div>
    </div>
  );
}
