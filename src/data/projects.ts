import type { StaticImageData } from "next/image";
import type { LucideIcon } from "lucide-react";
import {
  Blocks,
  Bot,
  Briefcase,
  Code,
  Database,
  Fingerprint,
  Gamepad2,
  Landmark,
  MapPin,
  ShieldCheck,
  Sigma,
} from "lucide-react";

import techcymeHome from "@/assets/projects/techcyme/home-light.webp";
import techcymeHomeSm from "@/assets/projects/techcyme/home-light-720.webp";
import techcymeHomeMd from "@/assets/projects/techcyme/home-light-1080.webp";
import techcymeService from "@/assets/projects/techcyme/service-campaigns.webp";
import techcymeServiceSm from "@/assets/projects/techcyme/service-campaigns-720.webp";
import techcymeServiceMd from "@/assets/projects/techcyme/service-campaigns-1080.webp";
import techcymePricing from "@/assets/projects/techcyme/pricing-dark.webp";
import techcymePricingSm from "@/assets/projects/techcyme/pricing-dark-720.webp";
import techcymePricingMd from "@/assets/projects/techcyme/pricing-dark-1080.webp";
import techcymeCrm from "@/assets/projects/techcyme/crm-overview.webp";
import techcymeCrmSm from "@/assets/projects/techcyme/crm-overview-720.webp";
import techcymeCrmMd from "@/assets/projects/techcyme/crm-overview-1080.webp";
import techcymeLeads from "@/assets/projects/techcyme/crm-leads.webp";
import techcymeLeadsSm from "@/assets/projects/techcyme/crm-leads-720.webp";
import techcymeLeadsMd from "@/assets/projects/techcyme/crm-leads-1080.webp";
import techcymeJobs from "@/assets/projects/techcyme/crm-jobs.webp";
import techcymeJobsSm from "@/assets/projects/techcyme/crm-jobs-720.webp";
import techcymeJobsMd from "@/assets/projects/techcyme/crm-jobs-1080.webp";
import techcymeMobile from "@/assets/projects/techcyme/mobile-home.webp";
import techcymeMobileSm from "@/assets/projects/techcyme/mobile-home-390.webp";
import techcymeMobileContact from "@/assets/projects/techcyme/mobile-contact.webp";
import techcymeMobileContactSm from "@/assets/projects/techcyme/mobile-contact-390.webp";

import paisaHome from "@/assets/projects/paisareality/home.webp";
import paisaHomeSm from "@/assets/projects/paisareality/home-720.webp";
import paisaHomeMd from "@/assets/projects/paisareality/home-1080.webp";
import paisaGold from "@/assets/projects/paisareality/gold-rate.webp";
import paisaGoldSm from "@/assets/projects/paisareality/gold-rate-720.webp";
import paisaGoldMd from "@/assets/projects/paisareality/gold-rate-1080.webp";
import paisaSchemes from "@/assets/projects/paisareality/schemes.webp";
import paisaSchemesSm from "@/assets/projects/paisareality/schemes-720.webp";
import paisaSchemesMd from "@/assets/projects/paisareality/schemes-1080.webp";
import paisaScore from "@/assets/projects/paisareality/money-health-score.webp";
import paisaScoreSm from "@/assets/projects/paisareality/money-health-score-720.webp";
import paisaScoreMd from "@/assets/projects/paisareality/money-health-score-1080.webp";
import paisaSip from "@/assets/projects/paisareality/sip-calculator.webp";
import paisaSipSm from "@/assets/projects/paisareality/sip-calculator-720.webp";
import paisaSipMd from "@/assets/projects/paisareality/sip-calculator-1080.webp";
import paisaMobile from "@/assets/projects/paisareality/mobile-home.webp";
import paisaMobileSm from "@/assets/projects/paisareality/mobile-home-390.webp";
import paisaMobileGold from "@/assets/projects/paisareality/mobile-gold-rate.webp";
import paisaMobileGoldSm from "@/assets/projects/paisareality/mobile-gold-rate-390.webp";

import maanakHome from "@/assets/projects/maanak/home.webp";
import maanakHomeSm from "@/assets/projects/maanak/home-720.webp";
import maanakHomeMd from "@/assets/projects/maanak/home-1080.webp";
import maanakServices from "@/assets/projects/maanak/public-services.webp";
import maanakServicesSm from "@/assets/projects/maanak/public-services-720.webp";
import maanakServicesMd from "@/assets/projects/maanak/public-services-1080.webp";
import maanakRules from "@/assets/projects/maanak/rules.webp";
import maanakRulesSm from "@/assets/projects/maanak/rules-720.webp";
import maanakRulesMd from "@/assets/projects/maanak/rules-1080.webp";
import maanakSources from "@/assets/projects/maanak/legal-sources.webp";
import maanakSourcesSm from "@/assets/projects/maanak/legal-sources-720.webp";
import maanakSourcesMd from "@/assets/projects/maanak/legal-sources-1080.webp";

import quantPerformance from "@/assets/projects/quantsys/performance.webp";
import quantPerformanceSm from "@/assets/projects/quantsys/performance-720.webp";
import quantPerformanceMd from "@/assets/projects/quantsys/performance-1080.webp";
import quantDecisions from "@/assets/projects/quantsys/decisions.webp";
import quantDecisionsSm from "@/assets/projects/quantsys/decisions-720.webp";
import quantDecisionsMd from "@/assets/projects/quantsys/decisions-1080.webp";
import quantMonitor from "@/assets/projects/quantsys/monitor.webp";
import quantMonitorSm from "@/assets/projects/quantsys/monitor-720.webp";
import quantMonitorMd from "@/assets/projects/quantsys/monitor-1080.webp";
import quantPositions from "@/assets/projects/quantsys/positions.webp";
import quantPositionsSm from "@/assets/projects/quantsys/positions-720.webp";
import quantPositionsMd from "@/assets/projects/quantsys/positions-1080.webp";
import quantSleeves from "@/assets/projects/quantsys/sleeves.webp";
import quantSleevesSm from "@/assets/projects/quantsys/sleeves-720.webp";
import quantSleevesMd from "@/assets/projects/quantsys/sleeves-1080.webp";

export interface Screenshot {
  /** Full size: 1440 wide for desktop shots, 780 wide for phone shots. */
  src: StaticImageData;
  /** 1080 wide, for desktop shots shown about 900px wide. */
  medium?: StaticImageData;
  /** Half size, used on cards and small screens. */
  small: StaticImageData;
  alt: string;
  caption: string;
  device: "desktop" | "phone";
}

export interface Feature {
  title: string;
  text: string;
}

export interface FeaturedProject {
  slug: string;
  title: string;
  /** One line under the title on cards. */
  tagline: string;
  /** Two plain sentences for cards and search results. */
  summary: string;
  /** Page title, without the site name. Keep it under about 45 characters. */
  metaTitle: string;
  /** Meta description, about 150 characters. */
  metaDescription: string;
  status: "Live" | "Prototype" | "Paper trading";
  dates: string;
  /** ISO dates: when the work started and when this write-up last changed. */
  startDate: string;
  updatedAt: string;
  liveUrl?: string;
  role: string;
  audience: string;
  /** Shown above the screenshots when the project needs a plain warning. */
  notice?: string;
  overview: string[];
  features: Feature[];
  build: string[];
  stack: string[];
  /** Says where the screenshots came from. */
  screenshotNote: string;
  cover: Screenshot;
  gallery: Screenshot[];
}

const techcymeCover: Screenshot = {
  src: techcymeHome,
  small: techcymeHomeSm,
  medium: techcymeHomeMd,
  device: "desktop",
  alt: "Techcyme home page with the headline 'Ad campaigns that turn clicks into customers' next to a photo of a team at work",
  caption: "The home page leads with ad campaigns and links straight to planning one.",
};

const paisaCover: Screenshot = {
  src: paisaHome,
  small: paisaHomeSm,
  medium: paisaHomeMd,
  device: "desktop",
  alt: "PaisaReality home page with the headline 'Today's gold, silver and fuel prices for your city' and a price card for 24K gold in Delhi",
  caption: "The home page: pick a city and see today's gold, silver or fuel price.",
};

const maanakCover: Screenshot = {
  src: maanakHome,
  small: maanakHomeSm,
  medium: maanakHomeMd,
  device: "desktop",
  alt: "Maanak home page with the headline 'Read the label. Test the rule. Show the proof.'",
  caption: "The home page explains the idea in three lines: read the label, test the rule, show the proof.",
};

const quantCover: Screenshot = {
  src: quantPerformance,
  small: quantPerformanceSm,
  medium: quantPerformanceMd,
  device: "desktop",
  alt: "quantsys performance screen with an equity curve and figures such as total return, Sharpe ratio and maximum drawdown, using demo data",
  caption: "Performance view: the account value over time and the figures behind it (demo data).",
};

export const featuredProjects: FeaturedProject[] = [
  {
    slug: "techcyme",
    title: "Techcyme",
    tagline: "Website and CRM for a digital marketing studio",
    summary:
      "The public website and the private CRM for Techcyme, a studio that runs ad campaigns, builds websites and sets up automation for businesses. Both run as one app on a server I manage.",
    metaTitle: "Techcyme website and CRM",
    metaDescription:
      "How I built Techcyme: a fast public website for a digital marketing studio, and the CRM its team uses for leads, clients, projects, email and automations.",
    status: "Live",
    dates: "Since Oct 2026",
    startDate: "2026-10",
    updatedAt: "2026-10-29",
    liveUrl: "https://techcyme.com",
    role: "Design, development, hosting and releases",
    audience:
      "Businesses that want more enquiries from ads and their website, and the Techcyme team that looks after them.",
    overview: [
      "Techcyme is a digital marketing studio. It plans and runs Google, Meta and LinkedIn ad campaigns, builds websites and sets up automation for businesses in many countries.",
      "I built two things for it in one app. The public website brings in enquiries. The private CRM is where the team answers every enquiry and runs each client, project and email. The team can change the website's text and pages from the CRM without waiting for a developer.",
    ],
    features: [
      {
        title: "A fast public website",
        text: "Service pages, industry pages, guides, pricing, careers and policy pages, in light and dark themes, with keyboard and screen reader support.",
      },
      {
        title: "No enquiry gets lost",
        text: "Every message from the contact form is saved in the CRM and answered from there. The form checks what people type, slows down spam and never saves the same message twice.",
      },
      {
        title: "One place to run the business",
        text: "Leads, clients, projects, tasks, team members, a price book, open jobs and applications, each with its own screen.",
      },
      {
        title: "Team email inside the CRM",
        text: "The team's five mailboxes can be read, searched and answered without leaving the CRM.",
      },
      {
        title: "Automations for clients",
        text: "Nine ready-made workflows, such as enquiry replies, review requests, appointment reminders and payment reminders, sent by WhatsApp or email.",
      },
      {
        title: "Safe sign-in",
        text: "Four user roles, two-step verification with an authenticator app, and a record of who changed what and when.",
      },
    ],
    build: [
      "The website and the CRM are one Next.js app written in TypeScript. It runs on a single Ubuntu server behind Cloudflare. Pages are rendered on the server, so they load quickly and search engines can read them.",
      "Every change passes automatic checks before it is released. A release backs up the database first, switches to the new version only when a health check passes, and rolls itself back when it fails.",
      "Analytics load only after a visitor agrees to them, and the database is backed up every night in encrypted form.",
    ],
    stack: ["Next.js", "React", "TypeScript", "Node.js", "Refine", "Ant Design", "SQLite", "n8n", "Nginx", "Cloudflare"],
    screenshotNote: "Website screenshots come from the live site. CRM screenshots use sample data, not real clients.",
    cover: techcymeCover,
    gallery: [
      techcymeCover,
      {
        src: techcymeService,
        small: techcymeServiceSm,
        medium: techcymeServiceMd,
        device: "desktop",
        alt: "Techcyme ad campaigns service page with a summary panel and a list of sections",
        caption: "A service page gives the essentials at a glance, then the details.",
      },
      {
        src: techcymePricing,
        small: techcymePricingSm,
        medium: techcymePricingMd,
        device: "desktop",
        alt: "Techcyme pricing page in dark mode explaining the 50/50 payment plan",
        caption: "The pricing page in dark mode explains how quotes and payments work.",
      },
      {
        src: techcymeCrm,
        small: techcymeCrmSm,
        medium: techcymeCrmMd,
        device: "desktop",
        alt: "Techcyme CRM business overview with counts of enquiries, clients, projects and tasks and a table of recent enquiries, filled with sample data",
        caption: "The CRM overview shows enquiries, clients, projects and tasks in one place (sample data).",
      },
      {
        src: techcymeLeads,
        small: techcymeLeadsSm,
        medium: techcymeLeadsMd,
        device: "desktop",
        alt: "Techcyme CRM leads list with edit, convert and delete actions, filled with sample data",
        caption: "Leads: an approved enquiry becomes a client and a project in one step (sample data).",
      },
      {
        src: techcymeJobs,
        small: techcymeJobsSm,
        medium: techcymeJobsMd,
        device: "desktop",
        alt: "Techcyme CRM jobs list showing an open role, filled with sample data",
        caption: "Jobs: open a role here and it appears on the careers page (sample data).",
      },
      {
        src: techcymeMobile,
        small: techcymeMobileSm,
        device: "phone",
        alt: "Techcyme home page on a phone",
        caption: "The home page on a phone.",
      },
      {
        src: techcymeMobileContact,
        small: techcymeMobileContactSm,
        device: "phone",
        alt: "Techcyme contact page on a phone listing the team mailboxes",
        caption: "The contact page on a phone.",
      },
    ],
  },
  {
    slug: "paisareality",
    title: "PaisaReality",
    tagline: "Free money tools and daily prices for India",
    summary:
      "A free personal finance website for India. It shows daily gold, silver and fuel prices for 50+ cities, finds government schemes people qualify for, and has easy money calculators.",
    metaTitle: "PaisaReality personal finance site for India",
    metaDescription:
      "How I built PaisaReality: daily gold, silver and fuel prices for 50+ Indian cities, a government scheme finder, money calculators and a Money Health Score.",
    status: "Live",
    dates: "Since Jan 2025",
    startDate: "2025-01",
    updatedAt: "2026-10-29",
    liveUrl: "https://paisareality.com",
    role: "Design, development, data and hosting",
    audience: "People in India who want clear, free money information. Most tools work without an account.",
    overview: [
      "PaisaReality answers everyday money questions in India. What does gold cost in my city today? Which government schemes can I apply for? How much will my SIP grow, or my loan cost?",
      "Every price on the site shows the date it was checked and where it came from, so people can trust the numbers they see.",
    ],
    features: [
      {
        title: "Daily prices for your city",
        text: "Gold, silver, petrol, diesel and LPG prices for 50+ cities, with today's change and the recent trend.",
      },
      {
        title: "Government scheme finder",
        text: "Answer six short questions and see the central and state schemes you are likely to qualify for, with the official link for each.",
      },
      {
        title: "Money calculators",
        text: "EMI, SIP, FD, PPF, income tax, home loan and more, plus ten deeper tools such as a retirement planner and a check that shows the real return of insurance savings plans.",
      },
      {
        title: "Money Health Score",
        text: "One score from 300 to 900 that shows how healthy your finances are across eight areas, with clear steps to improve it.",
      },
      {
        title: "Bank rates side by side",
        text: "Fixed deposit, savings and loan rates across many banks, in one place.",
      },
      {
        title: "Price alerts and daily articles",
        text: "Set a gold or silver price target and get an email when it is reached. A new article on a current money topic goes out every morning.",
      },
    ],
    build: [
      "The site is a Next.js app in TypeScript with a PostgreSQL database. It runs on an AWS server behind Cloudflare, and pages are prepared ahead of time where possible, so they open quickly even on slow phones.",
      "A daily job updates the prices and emails me when data goes stale or an update fails. Prices can be corrected from the admin panel without a new release.",
      "The admin panel has its own address and needs a password plus a code from an authenticator app.",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL", "Node.js", "n8n", "Nginx", "AWS EC2", "Cloudflare"],
    screenshotNote: "Screenshots taken from the live site on 29 October 2026, so the prices are real for that day.",
    cover: paisaCover,
    gallery: [
      paisaCover,
      {
        src: paisaGold,
        small: paisaGoldSm,
        medium: paisaGoldMd,
        device: "desktop",
        alt: "PaisaReality gold rate page showing 24K and 22K prices and a 30-day price chart",
        caption: "The gold rate page shows the India average and a 30-day trend.",
      },
      {
        src: paisaSchemes,
        small: paisaSchemesSm,
        medium: paisaSchemesMd,
        device: "desktop",
        alt: "PaisaReality government scheme finder with 375 schemes checked and a six-step form",
        caption: "The scheme finder: six short questions and no account needed.",
      },
      {
        src: paisaScore,
        small: paisaScoreSm,
        medium: paisaScoreMd,
        device: "desktop",
        alt: "PaisaReality Money Health Score gauge showing 684 out of 900 with three tips to improve it",
        caption: "The Money Health Score, with the steps that would raise it most.",
      },
      {
        src: paisaSip,
        small: paisaSipSm,
        medium: paisaSipMd,
        device: "desktop",
        alt: "PaisaReality SIP calculator with sliders and a chart of growth by year",
        caption: "The SIP calculator shows what you put in, what you gain and how it grows each year.",
      },
      {
        src: paisaMobile,
        small: paisaMobileSm,
        device: "phone",
        alt: "PaisaReality home page on a phone",
        caption: "The home page on a phone.",
      },
      {
        src: paisaMobileGold,
        small: paisaMobileGoldSm,
        device: "phone",
        alt: "PaisaReality gold rate page on a phone",
        caption: "The gold rate page on a phone.",
      },
    ],
  },
  {
    slug: "maanak",
    title: "Maanak",
    tagline: "Checking package labels, with the evidence kept",
    summary:
      "An inspection tool for packaged goods in India. An officer photographs a package, the app reads the label, checks it against the labelling rules and keeps a record anyone can verify later.",
    metaTitle: "Maanak package label inspection tool",
    metaDescription:
      "How I built Maanak, a tool that reads package labels with OCR, checks them against India's labelling rules and keeps a record that anyone can verify later.",
    status: "Prototype",
    dates: "Since Sep 2026",
    startDate: "2026-09",
    updatedAt: "2026-10-29",
    role: "Design and development",
    audience:
      "Legal Metrology inspection officers, and shoppers who want to report a wrongly labelled product.",
    notice:
      "Maanak is not a government service. It is not linked to or approved by any authority, and its rule texts stay drafts until a qualified authority confirms them.",
    overview: [
      "In India, packaged goods must show certain details on the label, such as the maximum retail price, the net quantity and who made the product. Checking this by hand is slow, and handwritten notes are easy to dispute.",
      "Maanak turns a photo of a package into an inspection record. The original photo is kept unchanged next to everything read from it, and every decision is recorded against the officer who made it.",
    ],
    features: [
      {
        title: "Photo checks before anything is saved",
        text: "The app looks for blur, glare, poor framing and other problems, and tells the officer in plain words what to fix.",
      },
      {
        title: "Reads labels in English and Hindi",
        text: "It finds the price, net quantity, unit price, maker, customer care details, country of origin, date and batch.",
      },
      {
        title: "The officer stays in charge",
        text: "Each reading appears beside the part of the photo it came from, so the officer can confirm, correct or reject it. Only values the officer has reviewed are checked against the rules.",
      },
      {
        title: "Honest results",
        text: "A panel that is missing from the photo is never counted as a violation. The app says it needs more evidence, or that it cannot tell, instead of guessing.",
      },
      {
        title: "Reports anyone can verify",
        text: "Each report has a reference and a code. Anyone can check that it was issued and has not changed, without seeing the case.",
      },
      {
        title: "Services for the public",
        text: "Without an account, anyone can read what a label must show, report a product, track their report or verify a report.",
      },
    ],
    build: [
      "A Python API built with FastAPI, plus a background worker that reads labels with Tesseract OCR, so nobody waits while a photo is read. Records live in PostgreSQL, photos in encrypted storage, and the whole system runs with Docker Compose.",
      "The interface is plain HTML, CSS and JavaScript with no framework, under a strict content security policy.",
      "Each photo gets a SHA-256 fingerprint when it arrives, so any later change to it would show.",
    ],
    stack: ["Python", "FastAPI", "PostgreSQL", "Redis", "MinIO", "Tesseract OCR", "Docker Compose", "Nginx"],
    screenshotNote: "Screenshots come from a local demo with sample data.",
    cover: maanakCover,
    gallery: [
      maanakCover,
      {
        src: maanakServices,
        small: maanakServicesSm,
        medium: maanakServicesMd,
        device: "desktop",
        alt: "Maanak public services page listing what anyone can do without an account",
        caption: "Public services that need no account and no fee.",
      },
      {
        src: maanakRules,
        small: maanakRulesSm,
        medium: maanakRulesMd,
        device: "desktop",
        alt: "Maanak rules screen listing rule versions, their approval status and whether their legal authority is confirmed",
        caption: "The officer workspace lists every rule with its version and status.",
      },
      {
        src: maanakSources,
        small: maanakSourcesSm,
        medium: maanakSourcesMd,
        device: "desktop",
        alt: "Maanak legal sources page explaining that no citation has been verified yet",
        caption: "The legal sources page says plainly what has and has not been verified.",
      },
    ],
  },
  {
    slug: "quantsys",
    title: "quantsys",
    tagline: "A rules-based trading system for Indian stocks",
    summary:
      "A system that tests trading ideas for Indian stocks and index futures on past data, then runs them with paper money. It records the reason behind every decision, and real-money trading stays locked.",
    metaTitle: "quantsys trading system for NSE stocks",
    metaDescription:
      "How I built quantsys, a trading system for NSE stocks and index futures that tests ideas on past data, trades on paper and explains every decision it makes.",
    status: "Paper trading",
    dates: "Since Jun 2026",
    startDate: "2026-06",
    updatedAt: "2026-10-29",
    role: "Research, design and development",
    audience: "A personal research project in rules-based trading. It is not a product and not investment advice.",
    notice: "Not investment advice. Every screen here shows demo data, not real trades.",
    overview: [
      "quantsys trades the Indian stock market (NSE) by fixed rules instead of gut feeling. It follows 48 large companies and the NIFTY and BANKNIFTY index futures.",
      "The same decision engine runs the tests on past data, the paper trading and live trading, so a result from one holds for the others. Every decision keeps a full record of why it was made and which risk limits changed it.",
      "So far, ten years of tests (2016 to 2026) found no rule that beats simply holding the index after costs. That is why it trades only on paper, in a study that has run since July 2026.",
    ],
    features: [
      {
        title: "One engine for every mode",
        text: "Tests on past data, paper trading and live trading all run the same decision code.",
      },
      {
        title: "Several strategies side by side",
        text: "Trend following, pairs of similar stocks, momentum, month-end and expiry-week patterns, each given money according to its measured edge.",
      },
      {
        title: "Risk limits come first",
        text: "Each trade risks at most 0.6% of the account, trading stops for the day after a 2.5% loss, and a 20% fall stops everything until a person restarts it.",
      },
      {
        title: "A reason for everything",
        text: "Every blocked trade and every change in size goes into an audit trail, so any decision can be explained later.",
      },
      {
        title: "Live trading stays locked",
        text: "Real money is only possible after a strategy passes strict statistical tests on real data, the broker is connected and the operator signs in again.",
      },
      {
        title: "A terminal view",
        text: "A read-only monitor shows decisions, positions, risk and performance, each opened with a short code, like a trading terminal.",
      },
    ],
    build: [
      "The engine and the research tools are written in Python with NumPy, pandas, SciPy and statsmodels. A FastAPI service and a Next.js dashboard sit on top, backed by PostgreSQL with TimescaleDB, and Redis.",
      "It connects to the Angel One SmartAPI broker, and every setting lives in one configuration file.",
    ],
    stack: ["Python", "NumPy", "pandas", "FastAPI", "PostgreSQL", "TimescaleDB", "Redis", "Next.js", "TypeScript", "Docker"],
    screenshotNote: "The terminal screens are rendered from demo data.",
    cover: quantCover,
    gallery: [
      quantCover,
      {
        src: quantDecisions,
        small: quantDecisionsSm,
        medium: quantDecisionsMd,
        device: "desktop",
        alt: "quantsys decision screen listing the capital split, signals, targets, orders and audit trail for one decision, using demo data",
        caption: "One decision with its signals, targets, orders and full audit trail (demo data).",
      },
      {
        src: quantMonitor,
        small: quantMonitorSm,
        medium: quantMonitorMd,
        device: "desktop",
        alt: "quantsys monitor screen showing the engine running in paper mode with account, risk and recent events, using demo data",
        caption: "The monitor shows the engine, the account, risk and recent events (demo data).",
      },
      {
        src: quantSleeves,
        small: quantSleevesSm,
        medium: quantSleevesMd,
        device: "desktop",
        alt: "quantsys strategies screen listing each strategy with its share of capital, results and number of trades, using demo data",
        caption: "Each strategy's share of capital, results and trade count (demo data).",
      },
      {
        src: quantPositions,
        small: quantPositionsSm,
        medium: quantPositionsMd,
        device: "desktop",
        alt: "quantsys positions screen listing open positions with profit and loss, using demo data",
        caption: "Open positions, with why each one was entered (demo data).",
      },
    ],
  },
];

export interface OtherProject {
  title: string;
  dates: string;
  description: string;
  stack: string;
  icon: LucideIcon;
}

/** Smaller projects. They have no screenshots, so they are listed in plain text. */
export const otherProjects: OtherProject[] = [
  {
    title: "Agent Skills",
    dates: "Sep 2026",
    stack: "Markdown, Python",
    icon: Blocks,
    description:
      "A library of 58 instruction sets that teach AI coding assistants to do specific jobs well, such as reviewing code or writing documents. Some come with small Python tools, like a checker that spots machine-written text.",
  },
  {
    title: "Auspice",
    dates: "Aug 2026",
    stack: "Python, FastAPI, PostGIS, NumPyro, XGBoost, Next.js",
    icon: MapPin,
    description:
      "Estimates how likely a building project is to be approved at a given place, and roughly how long approval takes. Every prediction is saved so its accuracy can be checked later, and when the data is thin it says so instead of guessing.",
  },
  {
    title: "Veydria",
    dates: "Jul 2026",
    stack: "Next.js, TypeScript, PostgreSQL, Drizzle, FastAPI, Clerk, Stripe",
    icon: ShieldCheck,
    description:
      "Helps companies keep their AI systems within the rules. It lists each AI system, works out which rules apply under the EU AI Act, the NIST AI RMF and ISO 42001, tests it for problems such as bias and made-up answers, and prepares the documents an auditor asks for.",
  },
  {
    title: "FerroDB",
    dates: "Jul 2026",
    stack: "Rust",
    icon: Database,
    description:
      "A small database I wrote from scratch in Rust, with no outside libraries. It saves data to files, understands basic SQL and supports transactions.",
  },
  {
    title: "Notion Agent",
    dates: "Jul 2026",
    stack: "Next.js, NestJS, Vercel AI SDK, PostgreSQL, MCP",
    icon: Bot,
    description:
      "A self-hosted workspace for AI assistants. Bring your own AI model keys, connect tools, search your own documents and watch each step the assistant takes in a live chat.",
  },
  {
    title: "Vouch Backend",
    dates: "Jul 2026",
    stack: "Go, PostgreSQL, Firebase",
    icon: Fingerprint,
    description:
      "The server behind Vouch, an app for confirming someone's identity phone to phone. It handles sign-in with a one-time code, pairing two phones and the check itself, using only Go's standard library.",
  },
  {
    title: "TenderEdge",
    dates: "Jun 2026",
    stack: "Node.js, TypeScript, PostgreSQL, Redis, WebSockets",
    icon: Briefcase,
    description:
      "Software for companies that bid on industrial tenders. It scores how well each tender fits the company, suggests a sensible bid price, and tracks deadlines and documents on a live dashboard.",
  },
  {
    title: "ProofSmith",
    dates: "Jun 2026",
    stack: "Lean 4, mathlib, Solidity, Foundry",
    icon: Sigma,
    description:
      "Maths proofs checked by a computer, written in Lean 4. The main proof narrows the Erdős-Straus conjecture down to one remaining family of prime numbers. Other parts are security reviews of smart contracts.",
  },
  {
    title: "Bank Legacy",
    dates: "Jun 2026",
    stack: "Java 21, Spring Boot, PostgreSQL, React",
    icon: Landmark,
    description:
      "Helps small banks move old COBOL programs to Java. It explains what each program does, maps how the programs connect, rewrites them in Java and checks that the new code gives the same results.",
  },
  {
    title: "Minecraft Server Panel",
    dates: "Mar 2026",
    stack: "Next.js, TypeScript, xterm.js, Monaco",
    icon: Gamepad2,
    description:
      "A control panel for running a Minecraft server from the browser, with a live console, a file editor, scheduled tasks and player management.",
  },
  {
    title: "value.codes",
    dates: "Feb 2026",
    stack: "Node.js, Express, EJS, MySQL",
    icon: Code,
    description:
      "A collection of free developer tools: ten tools that run in the browser, an online compiler for 19 languages, a code snippet library and an API directory.",
  },
];

export function getProject(slug: string) {
  return featuredProjects.find((project) => project.slug === slug);
}

export const projectsUpdatedAt = featuredProjects
  .map((project) => project.updatedAt)
  .sort()
  .at(-1) as string;
