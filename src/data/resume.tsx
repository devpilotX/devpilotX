import { Icons } from "@/components/icons";
import {
  Cloud,
  FolderKanban,
  GitBranch,
  HomeIcon,
  NotebookIcon,
  Server,
  Sparkles,
  SquareTerminal,
  Terminal,
} from "lucide-react";
import { Python } from "@/components/ui/svgs/python";
import { Postgresql } from "@/components/ui/svgs/postgresql";
import { Docker } from "@/components/ui/svgs/docker";
import mmduLogo from "@/assets/mmdu-80.webp";
import jnvLogo from "@/assets/jnv-80.webp";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://devpilotx.me").replace(/\/$/, "");
const EMAIL = "connect@devpilotx.me";

export interface SupportOption {
  name: string;
  url: string;
  note: string;
}

// Support goes through Buy Me a Coffee. Add more ways to pay here and the
// coffee section lists them.
const supportOptions: SupportOption[] = [
  {
    name: "Buy Me a Coffee",
    url: "https://buymeacoffee.com/devpilotx",
    note: "One-time, any amount, paid by card. You do not need an account to send one.",
  },
];

export const DATA = {
  name: "Dipanshu",
  firstName: "Dipanshu",
  brand: "DevPilotX",
  initials: "DK",
  url: SITE_URL,
  // Bump this date when the home page content changes. The sitemap uses it as
  // the lastmod value, so it should only move when something visible moved.
  updatedAt: "2026-10-30",
  location: "India",
  role: "Founder, DevPilotX",
  // Used for the meta description, so it stays under about 155 characters.
  description:
    "I'm Dipanshu, known online as DevPilotX. I take a problem and build the software that solves it, with Python, Linux, Docker and servers I run myself.",
  lead:
    "I take a problem and turn it into working software. The hands-on side is Python, shell scripts, Linux, Docker and the servers I run on AWS and Oracle Cloud. The rest is making the calls and getting it shipped, whether I build it myself, lead a small team, or use AI to move fast.",
  avatarUrl: "/mascot-avatar.png",
  keywords: [
    "Dipanshu",
    "DevPilotX",
    "devpilotx",
    "software builder",
    "problem solver",
    "Python",
    "Linux",
    "Docker",
    "PostgreSQL",
    "AWS EC2",
    "Oracle Cloud",
    "self-hosting",
    "web developer India",
    "indie developer",
    "portfolio",
  ],
  skills: [
    { name: "Python", icon: Python },
    { name: "Shell scripting", icon: Terminal },
    { name: "Linux", icon: SquareTerminal },
    { name: "Docker", icon: Docker },
    { name: "PostgreSQL", icon: Postgresql },
    { name: "Git & GitHub", icon: GitBranch },
    { name: "AWS EC2", icon: Cloud },
    { name: "Oracle Cloud", icon: Server },
    { name: "AI tools", icon: Sparkles },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/projects/", icon: FolderKanban, label: "Projects" },
    { href: "/blog/", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: EMAIL,
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/devpilotX",
        icon: Icons.github,
        dock: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/dipanshu03j",
        icon: Icons.linkedin,
        dock: true,
      },
      X: {
        name: "X",
        url: "https://x.com/devpilotx",
        icon: Icons.x,
        dock: false,
      },
      Instagram: {
        name: "Instagram",
        url: "https://www.instagram.com/devpilotx",
        icon: Icons.instagram,
        dock: false,
      },
      YouTube: {
        name: "YouTube",
        url: "https://www.youtube.com/@devpilotx",
        icon: Icons.youtube,
        dock: false,
      },
      Email: {
        name: "Email",
        url: `mailto:${EMAIL}`,
        icon: Icons.email,
        dock: true,
      },
    },
  },
  support: supportOptions,
  work: [
    {
      company: "DevPilotX",
      location: "Remote",
      title: "Founder",
      logoUrl: "/mascot.svg",
      start: "Jan 2025",
      end: "Present",
      description:
        "I build and run my own products, plus websites for businesses. My part is the decisions and the hands-on work: Python and shell scripts, PostgreSQL, Docker, and servers I run myself on AWS EC2 and Oracle Cloud behind Nginx and Cloudflare, with releases shipped through GitHub Actions. I use AI heavily to build faster, and bring in a small team when a job calls for one.",
    },
  ],
  education: [
    {
      school: "Maharishi Markandeshwar (Deemed to be University)",
      href: "https://mmumullana.org",
      degree: "Bachelor of Computer Applications (BCA), Mullana, Ambala",
      logo: mmduLogo,
      start: "2021",
      end: "2024",
    },
    {
      school: "Jawahar Navodaya Vidyalaya, Darbhanga",
      href: "https://navodaya.gov.in",
      degree: "Senior Secondary (Class XII), Bihar",
      logo: jnvLogo,
      start: "2019",
      end: "2021",
    },
  ],
} as const;

export type SocialLink = (typeof DATA.contact.social)[keyof typeof DATA.contact.social];

export const socialLinks: SocialLink[] = Object.values(DATA.contact.social);

/** Public profiles for JSON-LD sameAs and rel="me". Email is not a profile. */
export const profileUrls = socialLinks
  .map((social) => social.url)
  .filter((url) => url.startsWith("https://"));
