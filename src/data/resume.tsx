import { Icons } from "@/components/icons";
import {
  Blocks,
  Bot,
  Briefcase,
  Cloud,
  Code,
  Database,
  Gamepad2,
  HomeIcon,
  Landmark,
  MapPin,
  NotebookIcon,
  Server,
  Sigma,
  Terminal,
  Workflow,
  Zap,
} from "lucide-react";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Python } from "@/components/ui/svgs/python";
import { Golang } from "@/components/ui/svgs/golang";
import { Postgresql } from "@/components/ui/svgs/postgresql";
import { Docker } from "@/components/ui/svgs/docker";
import { Java } from "@/components/ui/svgs/java";

const GITHUB = "https://github.com/devpilotX";


export const DATA = {
  name: "Dipanshu Kumar",
  initials: "DK",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://devpilotx.me",
  location: "India",
  locationLink: "https://www.google.com/maps/place/India",
  description:
    "Full-stack developer building my own SaaS. I work with Python, Node.js, Docker and cloud servers on AWS and Oracle.",
  summary:
    "I finished my BCA at [Maharishi Markandeshwar (Deemed to be University)](#education) in Mullana, Ambala in 2024. Before that I studied at Jawahar Navodaya Vidyalaya in Darbhanga, Bihar.\n\nRight now I spend most of my time building my own SaaS under the name DevPilotX. I like owning the whole thing: writing the app, designing the database, and running it myself on AWS EC2 and Oracle Cloud machines with Docker. A few of those projects are below, and everything else is [on my GitHub](https://github.com/devpilotX).",
  avatarUrl: "/me.jpg",
  keywords: [
    "Dipanshu Kumar",
    "DevPilotX",
    "devpilotx",
    "full-stack developer",
    "SaaS developer",
    "Python developer",
    "Node.js developer",
    "Next.js",
    "Docker",
    "AWS EC2",
    "Oracle Cloud",
    "portfolio",
    "India",
  ],
  skills: [
    { name: "Python", icon: Python },
    { name: "Node.js", icon: Nodejs },
    { name: "TypeScript", icon: Typescript },
    { name: "Next.js", icon: NextjsIconDark },
    { name: "React", icon: ReactLight },
    { name: "FastAPI", icon: Zap },
    { name: "PostgreSQL", icon: Postgresql },
    { name: "Redis", icon: Database },
    { name: "Docker", icon: Docker },
    { name: "AWS EC2", icon: Cloud },
    { name: "Oracle Cloud", icon: Server },
    { name: "Linux & Nginx", icon: Terminal },
    { name: "GitHub Actions", icon: Workflow },
    { name: "Go", icon: Golang },
    { name: "Java", icon: Java },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog/", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "connect.dipanshukumar@gmail.com",
    social: {
      GitHub: {
        name: "GitHub",
        url: GITHUB,
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/dipanshu03j",
        icon: Icons.linkedin,
        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/devpilotx",
        icon: Icons.x,
        navbar: true,
      },
      Instagram: {
        name: "Instagram",
        url: "https://www.instagram.com/devpilotx",
        icon: Icons.instagram,
        navbar: true,
      },
      Email: {
        name: "Email",
        url: "mailto:connect.dipanshukumar@gmail.com",
        icon: Icons.email,
        navbar: true,
      },
    },
  },

  work: [
    {
      company: "DevPilotX",
      href: GITHUB,
      badges: [],
      location: "Remote",
      title: "Founder and Full-Stack Developer",
      logoUrl: "/devpilotx.svg",
      start: "Sep 2025",
      end: "Present",
      description:
        "Building my own SaaS products end to end, from the database schema to the servers they run on. Most of the frontends are Next.js and React, the backends are Node.js or Python with FastAPI, and the data sits in PostgreSQL and Redis. I deploy everything myself with Docker on AWS EC2 and Oracle Cloud VPS machines behind Nginx, and ship changes through GitHub Actions.",
    },
  ],
  education: [
    {
      school: "Maharishi Markandeshwar (Deemed to be University)",
      href: "https://mmumullana.org",
      degree: "Bachelor of Computer Applications (BCA), Mullana, Ambala",
      logoUrl: "/mmdu.png",
      start: "2021",
      end: "2024",
    },
    {
      school: "Jawahar Navodaya Vidyalaya, Darbhanga",
      href: "https://navodaya.gov.in",
      degree: "Senior Secondary (Class XII), Bihar",
      logoUrl: "/jnv.png",
      start: "2019",
      end: "2021",
    },
  ],
  projects: [
    {
      title: "quantsys",
      slug: "quantsys",
      tagline: "Systematic trading for NSE equities and futures",
      href: `${GITHUB}/quantsys`,
      dates: "Jun 2026 - Present",
      active: true,
      description:
        "A systematic trading engine for NSE equities and index futures on the Angel One SmartAPI. One decision engine drives the backtester, paper and live paths, and every veto lands in an audit trail. Live orders stay locked behind deflated Sharpe gates, so it runs in paper mode.",
      technologies: [
        "Python",
        "FastAPI",
        "Next.js",
        "PostgreSQL",
        "TimescaleDB",
        "Redis",
        "TypeScript",
      ],
      links: [
        {
          type: "Source",
          href: `${GITHUB}/quantsys`,
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/quantsys.png",
      video: "",
    },
    {
      title: "Maanak",
      slug: "maanak",
      tagline: "Label inspection with an audit trail",
      href: `${GITHUB}/maanak`,
      dates: "Sep 2026 - Present",
      active: true,
      description:
        "Inspection recording for packaged goods under India's Legal Metrology rules. Inspectors photograph a label, OCR pulls out the declared fields, a versioned rule engine checks them, and every decision lands in a tamper-evident audit trail.",
      technologies: [
        "Python",
        "FastAPI",
        "PostgreSQL",
        "Redis",
        "MinIO",
        "Tesseract OCR",
        "Docker Compose",
      ],
      links: [
        {
          type: "Source",
          href: `${GITHUB}/maanak`,
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/maanak.png",
      video: "",
    },
    {
      title: "PaisaReality",
      slug: "paisareality",
      tagline: "Personal finance data for India",
      href: `${GITHUB}/paisarealitymoney`,
      dates: "Mar 2026 - Present",
      active: true,
      description:
        "A personal finance site for India. Daily gold, silver, fuel and LPG prices for 50+ cities, a directory of 350+ government schemes, calculators, bank rate comparisons and a Money Health Score.",
      technologies: [
        "Next.js",
        "TypeScript",
        "PostgreSQL",
        "Razorpay",
        "Resend",
        "PM2",
        "Nginx",
      ],
      links: [
        {
          type: "Source",
          href: `${GITHUB}/paisarealitymoney`,
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/paisareality.png",
      video: "",
    },
    {
      title: "Veydria",
      slug: "veydria",
      tagline: "Compliance platform for AI systems",
      href: `${GITHUB}/Veydria`,
      dates: "Jul 2026",
      active: true,
      description:
        "An AI governance platform for companies. It maps each AI system to the EU AI Act, NIST AI RMF and ISO 42001, runs automated evals, keeps a hash-chained audit log and generates the documents an auditor asks for.",
      technologies: [
        "Next.js",
        "TypeScript",
        "PostgreSQL",
        "Drizzle",
        "FastAPI",
        "Clerk",
        "Stripe",
      ],
      links: [
        {
          type: "Source",
          href: `${GITHUB}/Veydria`,
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/veydria.png",
      video: "",
    },
  ],
  builds: [
    {
      title: "Agent Skills",
      dates: "Sep 2026",
      stack: "Markdown, Python",
      description:
        "58 skills for AI coding agents, each scored against a rubric. Several ship with working Python tools, like a detector for machine-written prose and a Markdown structure linter.",
      icon: Blocks,
      links: [{ title: "Source", href: `${GITHUB}/skills` }],
    },
    {
      title: "Auspice",
      dates: "Aug 2026",
      stack: "Python, FastAPI, PostGIS, NumPyro, XGBoost, Next.js",
      description:
        "Estimates how likely a project is to get permitted at a given location, and roughly how long it will take. Every prediction goes into an append-only ledger so the accuracy record is public. When the data is too thin, it says so instead of guessing.",
      icon: MapPin,
      links: [{ title: "Source", href: `${GITHUB}/auspice` }],
    },
    {
      title: "FerroDB",
      dates: "Jul 2026",
      stack: "Rust, Cargo",
      description:
        "A small SQL database written from scratch in Rust with no outside dependencies. It has a file-backed pager, a B+Tree, its own SQL tokenizer and parser, an executor and transactions.",
      icon: Database,
      links: [{ title: "Source", href: `${GITHUB}/FerroDB` }],
    },
    {
      title: "Notion Agent",
      dates: "Jul 2026",
      stack: "Next.js, NestJS, Vercel AI SDK, PostgreSQL, MCP",
      description:
        "A self-hosted workbench for AI agents. Bring your own model keys, connect tools over MCP, search your documents with RAG, and watch each step of a run in a streaming chat.",
      icon: Bot,
      links: [{ title: "Source", href: `${GITHUB}/Notion-Agent` }],
    },
    {
      title: "Vouch Backend",
      dates: "Jul 2026",
      stack: "Go, PostgreSQL, Firebase",
      description:
        "The relay service behind Vouch, an app for confirming someone's identity phone to phone. It handles OTP login, device pairing and the verify round trip using only Go's standard library.",
      icon: Server,
      links: [{ title: "Source", href: `${GITHUB}/vouch-backend` }],
    },
    {
      title: "TenderEdge",
      dates: "Jun 2026",
      stack: "Node.js, TypeScript, PostgreSQL, Redis, WebSockets",
      description:
        "Multi-tenant B2B SaaS for finding and winning industrial tenders. It scores how well a tender fits your company, predicts a sensible bid price, and tracks deadlines and documents on a live dashboard.",
      icon: Briefcase,
      links: [{ title: "Source", href: `${GITHUB}/tenderedge` }],
    },
    {
      title: "ProofSmith",
      dates: "Jun 2026",
      stack: "Lean 4, mathlib, Solidity, Foundry",
      description:
        "Formal verification work in Lean 4. The main branch is a machine-checked proof that reduces the Erdős-Straus conjecture to one remaining family of primes. Other branches hold smart contract audits.",
      icon: Sigma,
      links: [{ title: "Source", href: `${GITHUB}/ProofSmith` }],
    },
    {
      title: "Bank Legacy",
      dates: "Jun 2026",
      stack: "Java 21, Spring Boot, PostgreSQL, React",
      description:
        "A COBOL modernization tool for small banks. It explains COBOL programs, maps their dependencies, rewrites them in Java and checks the result against GnuCOBOL.",
      icon: Landmark,
      links: [{ title: "Source", href: `${GITHUB}/Bank-Legacy` }],
    },
    {
      title: "Minecraft Server Panel",
      dates: "Mar 2026",
      stack: "Next.js, TypeScript, xterm.js, Monaco",
      description:
        "A self-hosted control panel for a Minecraft server, with a live console, RCON, a file editor, scheduled tasks and player management.",
      icon: Gamepad2,
      links: [{ title: "Source", href: `${GITHUB}/Minecraft-server-panel` }],
    },
    {
      title: "value.codes",
      dates: "Feb 2026",
      stack: "Node.js, Express, EJS, MySQL",
      description:
        "A free hub of developer tools: ten tools that run entirely in the browser, an online compiler for 19 languages, a snippet library and an API directory.",
      icon: Code,
      links: [
        { title: "Website", href: "https://value.codes" },
        { title: "Source", href: `${GITHUB}/value.codes` },
      ],
    },
  ],
} as const;
