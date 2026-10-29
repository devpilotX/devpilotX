import Link from "next/link";
import { EmailOff } from "@/components/email-off";
import { DATA, socialLinks } from "@/data/resume";

const linkClass =
  "inline-flex min-h-6 items-center rounded-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

const siteLinks = [
  { href: "/", label: "Home" },
  { href: "/projects/", label: "Projects" },
  { href: "/blog/", label: "Blog" },
  { href: "/#coffee", label: "Buy me a coffee" },
  { href: "/rss.xml", label: "RSS feed" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-border pt-8 text-sm">
      <div className="flex flex-col gap-6 sm:flex-row sm:justify-between">
        <div className="flex flex-col gap-2">
          <p className="font-semibold">{DATA.name}</p>
          <p className="max-w-xs text-muted-foreground">
            I build and run software products under the name {DATA.brand}, from India.
          </p>
          <EmailOff>
            <a href={`mailto:${DATA.contact.email}`} className={`${linkClass} w-fit`}>
              {DATA.contact.email}
            </a>
          </EmailOff>
        </div>
        <div className="flex gap-12">
          <nav aria-label="Site">
            <ul className="flex flex-col gap-1">
              {siteLinks.map((link) => (
                <li key={link.href}>
                  {link.href.endsWith(".xml") ? (
                    <a href={link.href} className={linkClass}>
                      {link.label}
                    </a>
                  ) : (
                    <Link href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Profiles">
            <ul className="flex flex-col gap-1">
              {socialLinks
                .filter((link) => link.url.startsWith("https://"))
                .map((link) => (
                  <li key={link.name}>
                    <a href={link.url} target="_blank" rel="me noopener noreferrer" className={linkClass}>
                      {link.name}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
            </ul>
          </nav>
        </div>
      </div>
      <p className="mt-8 text-xs text-muted-foreground">
        © {year} {DATA.name}. All rights reserved.
      </p>
    </footer>
  );
}
