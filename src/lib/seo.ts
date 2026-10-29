import type { Metadata } from "next";
import { DATA, profileUrls } from "@/data/resume";

/** Turns a site path such as "/blog/" into an absolute URL on the live domain. */
export function absoluteUrl(path = "/") {
  return `${DATA.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export const PERSON_ID = absoluteUrl("/#person");
export const WEBSITE_ID = absoluteUrl("/#website");

const OG_SIZE = { width: 1200, height: 630 };

interface PageMetadataInput {
  /** Page title without the site name. The layout template appends it. */
  title: string;
  description: string;
  /** Path with the trailing slash the site uses, for example "/projects/". */
  path: string;
  /** Root-relative path of a 1200x630 image. Defaults to the site card. */
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  /** The home page uses its title as is, without the template. */
  absoluteTitle?: boolean;
}

/**
 * Builds the full metadata for one page. Next.js replaces nested objects
 * such as openGraph instead of merging them, so every page sets all of it.
 */
export function pageMetadata({
  title,
  description,
  path,
  image = "/og.png",
  imageAlt,
  type = "website",
  publishedTime,
  modifiedTime,
  absoluteTitle = false,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  // Search results cut titles at about 60 characters, so a long page title
  // drops the site name instead of being cut off.
  const withSiteName = `${title} | ${DATA.name}`;
  const useAsIs = absoluteTitle || withSiteName.length > 60;
  const fullTitle = useAsIs ? title : withSiteName;
  const ogImage = {
    url: absoluteUrl(image),
    ...OG_SIZE,
    alt: imageAlt ?? fullTitle,
    type: "image/png",
  };

  return {
    title: useAsIs ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      // Repeated here because a page's alternates replace the layout's.
      types: { "application/rss+xml": [{ url: absoluteUrl("/rss.xml"), title: `${DATA.name}'s blog` }] },
    },
    openGraph: {
      type,
      url,
      title: fullTitle,
      description,
      siteName: DATA.name,
      locale: "en_IN",
      images: [ogImage],
      ...(type === "article"
        ? { publishedTime, modifiedTime, authors: [absoluteUrl("/")] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      site: "@devpilotx",
      creator: "@devpilotx",
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}

/** The full Person node. Only the home page carries it; other pages refer to it by name and URL. */
export function personNode() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: DATA.name,
    givenName: "Dipanshu",
    familyName: "Kumar",
    alternateName: DATA.brand,
    url: absoluteUrl("/"),
    image: {
      "@type": "ImageObject",
      url: absoluteUrl(DATA.avatarUrl),
      width: 512,
      height: 512,
      caption: DATA.name,
    },
    jobTitle: "Software builder",
    description: DATA.description,
    email: DATA.contact.email,
    address: { "@type": "PostalAddress", addressCountry: "IN" },
    alumniOf: DATA.education.map((school) => ({
      "@type": "EducationalOrganization",
      name: school.school,
      url: school.href,
    })),
    knowsAbout: DATA.skills.map((skill) => skill.name),
    sameAs: profileUrls,
  };
}

/** A short author reference for pages that do not carry the full Person node. */
export function authorRef() {
  return { "@type": "Person", name: DATA.name, url: absoluteUrl("/") };
}

export function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: absoluteUrl("/"),
    name: DATA.name,
    alternateName: [DATA.brand, "devpilotx.me"],
    description: DATA.description,
    inLanguage: "en",
    publisher: { "@id": PERSON_ID },
  };
}

export function breadcrumbNode(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
