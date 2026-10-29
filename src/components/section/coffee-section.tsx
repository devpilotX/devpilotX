import { ArrowUpRight, Coffee } from "lucide-react";
import { EmailOff } from "@/components/email-off";
import { DATA } from "@/data/resume";

export default function CoffeeSection() {
  const [primary, ...others] = DATA.support;

  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-card p-8 sm:p-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-amber-400/15 blur-3xl dark:bg-amber-300/10"
      />
      <div className="relative flex flex-col items-center gap-4 text-center">
        <div className="flex size-12 items-center justify-center rounded-full border border-border bg-background shadow-sm">
          <Coffee className="size-5 text-amber-700 dark:text-amber-400" aria-hidden="true" />
        </div>
        <h2 id="coffee-heading" className="text-3xl font-bold tracking-tighter sm:text-4xl">
          Buy me a coffee
        </h2>
        <p className="max-w-lg text-balance text-muted-foreground">
          If something I built or wrote helped you, you can buy me a coffee. It is never
          expected, and it helps me keep building and writing.
        </p>
        <a
          href={primary.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <Coffee className="size-4" aria-hidden="true" />
          Buy me a coffee
          <ArrowUpRight className="size-4" aria-hidden="true" />
          <span className="sr-only">on {primary.name} (opens in a new tab)</span>
        </a>
        <p className="text-xs text-muted-foreground">
          Payments go through {primary.name}. {primary.note}
        </p>
        {others.length > 0 && (
          <ul className="flex flex-wrap justify-center gap-3 text-sm">
            {others.map((option) => (
              <li key={option.url}>
                <a
                  href={option.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 hover:text-foreground"
                >
                  {option.name}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        )}
        <p className="text-xs text-muted-foreground">
          Prefer another way to pay?{" "}
          <EmailOff>
            <a
              href={`mailto:${DATA.contact.email}?subject=Buy%20you%20a%20coffee`}
              className="font-medium text-foreground underline underline-offset-4"
            >
              Email me
            </a>
          </EmailOff>
          .
        </p>
      </div>
    </div>
  );
}
