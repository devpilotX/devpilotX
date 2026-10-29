import Link from "next/link";
import type { ComponentType, ReactNode, SVGProps } from "react";
import { DockEscape } from "@/components/dock-escape";
import { EmailOff } from "@/components/email-off";
import { ModeToggle } from "@/components/mode-toggle";
import { DATA, socialLinks } from "@/data/resume";

// Icons are 36px on phones and 40px from the sm breakpoint, so all seven fit
// a 320px screen and every target stays above the 24px WCAG minimum.
const buttonClass =
  "dock-button flex size-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:size-10";

/**
 * One dock entry with its label above it. The label is plain CSS (see
 * .dock-tip in globals.css): it shows on hover and on keyboard focus, can be
 * hovered itself, and Escape hides it. Screen readers get the same words from
 * the control's aria-label, so the label itself is hidden from them.
 */
function DockItem({ label, children }: { label: string; children: ReactNode }) {
  return (
    <li className="dock-item relative">
      {children}
      <span aria-hidden="true" className="dock-tip">
        {label}
      </span>
    </li>
  );
}

function Divider() {
  return <li aria-hidden="true" className="mx-0.5 h-6 w-px self-center bg-border sm:mx-1" />;
}

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

export default function Navbar() {
  const social = socialLinks.filter((link) => link.dock);

  return (
    <nav
      aria-label="Main"
      data-dock
      className="pointer-events-none fixed inset-x-0 bottom-4 z-30 flex justify-center px-2"
    >
      <DockEscape />
      <ul className="pointer-events-auto flex items-center gap-0.5 rounded-full border bg-card/90 p-1.5 shadow-[0_0_10px_3px] shadow-primary/5 backdrop-blur-xl sm:gap-2 sm:p-2">
        {DATA.navbar.map((item) => (
          <DockItem key={item.href} label={item.label}>
            <Link href={item.href} aria-label={item.label} className={buttonClass}>
              <item.icon className="size-5" aria-hidden="true" />
            </Link>
          </DockItem>
        ))}
        <Divider />
        {social.map((link) => {
          const IconComponent = link.icon as Icon;
          const external = link.url.startsWith("http");
          const anchor = (
            <a
              href={link.url}
              aria-label={external ? `${link.name} (opens in a new tab)` : `Email ${DATA.contact.email}`}
              className={buttonClass}
              {...(external ? { target: "_blank", rel: "me noopener noreferrer" } : {})}
            >
              <IconComponent className="size-[18px]" aria-hidden="true" />
            </a>
          );
          return (
            <DockItem key={link.name} label={link.name}>
              {external ? anchor : <EmailOff>{anchor}</EmailOff>}
            </DockItem>
          );
        })}
        <Divider />
        <DockItem label="Theme">
          <ModeToggle className={`${buttonClass} cursor-pointer`} />
        </DockItem>
      </ul>
    </nav>
  );
}
