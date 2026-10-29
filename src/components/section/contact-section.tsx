import { Mail } from "lucide-react";
import { EmailOff } from "@/components/email-off";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { DATA } from "@/data/resume";

const linkClass =
  "rounded-sm font-medium text-blue-700 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring dark:text-blue-400";

export default function ContactSection() {
  const { LinkedIn, X, GitHub } = DATA.contact.social;

  return (
    <div className="relative rounded-xl border p-8 sm:p-10">
      <div className="absolute inset-0 h-1/2 overflow-hidden rounded-xl" aria-hidden="true">
        <FlickeringGrid
          className="h-full w-full"
          squareSize={2}
          gridGap={2}
          style={{
            maskImage: "linear-gradient(to bottom, black, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
          }}
        />
      </div>
      <div className="relative flex flex-col items-center gap-5 text-center">
        <h2 id="contact-heading" className="text-3xl font-bold tracking-tighter sm:text-5xl">
          Get in touch
        </h2>
        <p className="mx-auto max-w-lg text-balance text-muted-foreground">
          Have a project in mind, a job opening, or something you are building and want to talk
          about? Email is the best way to reach me.
        </p>
        <EmailOff>
          <a
            href={`mailto:${DATA.contact.email}`}
            className="inline-flex h-11 max-w-full items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <Mail className="size-4 flex-none" aria-hidden="true" />
            <span className="truncate">{DATA.contact.email}</span>
          </a>
        </EmailOff>
        <p className="text-sm text-muted-foreground">
          You can also message me on{" "}
          <a href={LinkedIn.url} target="_blank" rel="me noopener noreferrer" className={linkClass}>
            LinkedIn
          </a>{" "}
          or{" "}
          <a href={X.url} target="_blank" rel="me noopener noreferrer" className={linkClass}>
            X
          </a>
          , or follow my work on{" "}
          <a href={GitHub.url} target="_blank" rel="me noopener noreferrer" className={linkClass}>
            GitHub
          </a>
          .
        </p>
      </div>
    </div>
  );
}
