import type { Metadata } from "next";
import Link from "next/link";
import { FolderKanban, Home, NotebookIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

const linkClass =
  "inline-flex h-10 items-center gap-2 rounded-full border border-border bg-background px-4 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-16rem)] flex-col">
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="relative flex max-w-md flex-col items-center text-center">
          <p
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 bg-linear-to-b from-primary/30 to-secondary/10 bg-clip-text font-mono text-[200px] font-semibold uppercase tracking-tighter text-transparent mask-[linear-gradient(to_bottom,black,black_20%,transparent_80%)]"
          >
            404
          </p>
          <h1 className="mb-2 text-4xl font-semibold tracking-tight text-foreground">Page not found</h1>
          <p className="mb-8 text-balance font-medium tracking-tight text-muted-foreground">
            The page you are looking for does not exist or has moved. These might help:
          </p>
          <ul className="flex flex-col gap-3 sm:flex-row">
            <li>
              <Link href="/" className={linkClass}>
                <Home className="size-4" aria-hidden="true" />
                Home
              </Link>
            </li>
            <li>
              <Link href="/projects/" className={linkClass}>
                <FolderKanban className="size-4" aria-hidden="true" />
                Projects
              </Link>
            </li>
            <li>
              <Link href="/blog/" className={linkClass}>
                <NotebookIcon className="size-4" aria-hidden="true" />
                Blog
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
