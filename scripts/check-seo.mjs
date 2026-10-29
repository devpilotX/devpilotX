// Reads every page of the static export the way a search engine would and
// fails the build when something that matters for search or sharing is
// missing or wrong: titles, descriptions, canonical URLs, Open Graph tags,
// one h1 per page, valid JSON-LD, image sizes and alt text, links that would
// redirect, links into source code, and a sitemap that matches the pages.

import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const OUT_DIR = path.resolve("out");
const SITE = (process.env.PAGES_BASE_URL || "https://devpilotx.me").replace(/^http:\/\//, "https://").replace(/\/$/, "");
const BASE_PATH = (process.env.PAGES_BASE_PATH ?? "").replace(/\/$/, "");

// The GitHub profile and the Sponsors page are fine to link. A link into a
// repository is not: project source code is never linked from the site.
const ALLOWED_GITHUB = new Set(["https://github.com/devpilotX", "https://github.com/sponsors/devpilotX"]);
const NOT_INDEXED = new Set(["/404/", "/_not-found/"]);

const problems = [];
const report = (page, message) => problems.push(`${page}: ${message}`);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else files.push(full);
  }
  return files;
}

async function exists(file) {
  try {
    return (await stat(file)).isFile();
  } catch {
    return false;
  }
}

const decode = (value) =>
  value
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");

function attr(tag, name) {
  const match = tag.match(new RegExp(`\\s${name}="([^"]*)"`, "i"));
  return match ? decode(match[1]) : null;
}

function tags(html, name) {
  return html.match(new RegExp(`<${name}\\b[^>]*>`, "gi")) ?? [];
}

function meta(html, key, value) {
  const tag = tags(html, "meta").find((t) => attr(t, key) === value);
  return tag ? attr(tag, "content") : null;
}

function link(html, rel) {
  const tag = tags(html, "link").find((t) => (attr(t, "rel") ?? "").split(/\s+/).includes(rel));
  return tag ? attr(tag, "href") : null;
}

function text(fragment) {
  return decode(fragment.replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();
}

function toUrlPath(file) {
  const relative = path.relative(OUT_DIR, file).split(path.sep).join("/");
  return `/${relative.replace(/index\.html$/, "")}`;
}

async function fileForUrl(url) {
  const clean = decodeURIComponent(url.replace(SITE, "").split(/[?#]/)[0]).replace(/^\/+/, "");
  const withoutBase = BASE_PATH ? clean.replace(BASE_PATH.slice(1), "").replace(/^\/+/, "") : clean;
  const candidates = withoutBase === "" || withoutBase.endsWith("/")
    ? [path.join(OUT_DIR, withoutBase, "index.html")]
    : [path.join(OUT_DIR, withoutBase)];
  for (const candidate of candidates) if (await exists(candidate)) return candidate;
  return null;
}

function checkJsonLd(page, html) {
  const blocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  if (blocks.length === 0) {
    report(page, "no JSON-LD structured data");
    return [];
  }
  const types = [];
  for (const [, body] of blocks) {
    let data;
    try {
      data = JSON.parse(body);
    } catch (error) {
      report(page, `JSON-LD does not parse: ${error.message}`);
      continue;
    }
    if (data["@context"] !== "https://schema.org") report(page, "JSON-LD @context is not https://schema.org");
    const nodes = Array.isArray(data["@graph"]) ? data["@graph"] : [data];
    for (const node of nodes) {
      if (!node["@type"]) report(page, "JSON-LD node without @type");
      types.push(node["@type"]);
      for (const key of ["url", "item", "image", "mainEntityOfPage"]) {
        const values = [node[key]].flat().filter((v) => typeof v === "string");
        for (const value of values) {
          if (!value.startsWith("https://")) report(page, `JSON-LD ${key} is not an absolute https URL: ${value}`);
        }
      }
      if (node["@type"] === "BreadcrumbList") {
        for (const item of node.itemListElement ?? []) {
          if (!item.name || !item.item?.startsWith(SITE)) report(page, "breadcrumb item needs a name and a URL on the site");
        }
      }
    }
  }
  return types;
}

// Cloudflare rewrites email addresses in HTML unless they sit between
// <!--email_off--> and <!--/email_off--> (see src/components/email-off.tsx).
// Scripts and the head are left alone by Cloudflare, so they are skipped.
function checkEmailOff(page, html) {
  const blank = (match) => " ".repeat(match.length);
  const body = html.replace(/<head>[\s\S]*?<\/head>/, blank).replace(/<script\b[\s\S]*?<\/script>/g, blank);
  const pattern = /mailto:|[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;
  for (const match of body.matchAll(pattern)) {
    const before = body.slice(0, match.index);
    if (before.lastIndexOf("<!--email_off-->") <= before.lastIndexOf("<!--/email_off-->")) {
      const context = body.slice(Math.max(0, match.index - 40), match.index + 40).replace(/\s+/g, " ");
      report(page, `email address outside <!--email_off-->: ...${context}...`);
    }
  }
}

async function checkPage(file, html) {
  const page = toUrlPath(file);
  const url = `${SITE}${page}`;

  if (!/<html[^>]*\slang="en"/.test(html)) report(page, 'missing <html lang="en">');

  const head = html.match(/<head>([\s\S]*?)<\/head>/)?.[1] ?? "";
  // Only the document title counts; inline SVG icons carry <title> elements too.
  const titles = [...head.matchAll(/<title>([\s\S]*?)<\/title>/g)].map((m) => text(m[1]));
  if (titles.length !== 1) report(page, `expected one <title>, found ${titles.length}`);
  else if (titles[0].length < 15 || titles[0].length > 65) report(page, `title is ${titles[0].length} characters: "${titles[0]}"`);

  const description = meta(html, "name", "description");
  if (!description) report(page, "missing meta description");
  else if (description.length < 70 || description.length > 165) {
    report(page, `meta description is ${description.length} characters`);
  }

  const canonical = link(html, "canonical");
  if (canonical !== url) report(page, `canonical is ${canonical}, expected ${url}`);

  const robots = meta(html, "name", "robots") ?? "";
  if (/noindex/i.test(robots)) report(page, "indexable page carries noindex");

  if (meta(html, "property", "og:url") !== url) report(page, "og:url does not match the canonical URL");
  for (const key of ["og:title", "og:description", "og:type", "og:site_name", "og:image", "og:image:alt"]) {
    if (!meta(html, "property", key)) report(page, `missing ${key}`);
  }
  if (meta(html, "name", "twitter:card") !== "summary_large_image") report(page, "twitter:card is not summary_large_image");
  for (const key of ["twitter:title", "twitter:description", "twitter:image"]) {
    if (!meta(html, "name", key)) report(page, `missing ${key}`);
  }
  const ogImage = meta(html, "property", "og:image");
  if (ogImage) {
    if (!ogImage.startsWith(`${SITE}/`)) report(page, `og:image is not on the site: ${ogImage}`);
    else if (!(await fileForUrl(ogImage))) report(page, `og:image file is missing: ${ogImage}`);
  }

  const h1s = html.match(/<h1\b/g) ?? [];
  if (h1s.length !== 1) report(page, `expected one <h1>, found ${h1s.length}`);

  const types = checkJsonLd(page, html);
  if (page !== "/" && !types.includes("BreadcrumbList")) report(page, "no BreadcrumbList structured data");

  checkEmailOff(page, html);

  for (const img of tags(html, "img")) {
    const src = attr(img, "src") ?? "(no src)";
    if (attr(img, "alt") === null) report(page, `image without alt: ${src}`);
    if (!attr(img, "width") || !attr(img, "height")) report(page, `image without width and height: ${src}`);
  }

  for (const anchor of tags(html, "a")) {
    const href = attr(anchor, "href");
    if (!href) {
      report(page, "link without href");
      continue;
    }
    if (/^https:\/\/github\.com\/devpilotX\/./i.test(href) && !ALLOWED_GITHUB.has(href)) {
      report(page, `links to source code: ${href}`);
    }
    if (href.startsWith("/") && !href.startsWith("//")) {
      const pathOnly = href.split(/[?#]/)[0];
      const last = pathOnly.split("/").pop();
      if (pathOnly && !pathOnly.endsWith("/") && !last.includes(".")) {
        report(page, `internal link without trailing slash redirects: ${href}`);
      }
    }
    if (attr(anchor, "target") === "_blank" && !(attr(anchor, "rel") ?? "").includes("noopener")) {
      report(page, `target=_blank link without rel=noopener: ${href}`);
    }
  }

  return page;
}

async function checkSitemap(indexable) {
  const xml = await readFile(path.join(OUT_DIR, "sitemap.xml"), "utf8").catch(() => null);
  if (!xml) {
    problems.push("sitemap.xml is missing");
    return 0;
  }
  const entries = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => m[1]);
  const listed = new Set();
  for (const entry of entries) {
    const loc = entry.match(/<loc>([^<]+)<\/loc>/)?.[1];
    const lastmod = entry.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1];
    if (!loc) {
      problems.push("sitemap entry without <loc>");
      continue;
    }
    listed.add(loc);
    if (!indexable.has(loc)) problems.push(`sitemap lists ${loc}, which is not an indexable page`);
    if (!lastmod || Number.isNaN(Date.parse(lastmod))) problems.push(`sitemap entry ${loc} has no valid lastmod`);
    for (const [, image] of entry.matchAll(/<image:loc>([^<]+)<\/image:loc>/g)) {
      if (!(await fileForUrl(image))) problems.push(`sitemap image is missing: ${image}`);
    }
  }
  for (const url of indexable) if (!listed.has(url)) problems.push(`sitemap does not list ${url}`);
  return entries.length;
}

async function main() {
  const files = (await walk(OUT_DIR)).filter((file) => file.endsWith("index.html"));
  if (files.length === 0) {
    console.error("check-seo: no pages in out/, run the build first");
    process.exit(1);
  }

  const indexable = new Set();
  for (const file of files) {
    const page = toUrlPath(file);
    if (NOT_INDEXED.has(page)) continue;
    await checkPage(file, await readFile(file, "utf8"));
    indexable.add(`${SITE}${page}`);
  }

  const notFound = await readFile(path.join(OUT_DIR, "404.html"), "utf8").catch(() => null);
  if (!notFound) problems.push("404.html is missing");
  else if (!/<meta name="robots" content="[^"]*noindex/.test(notFound)) problems.push("404.html is not marked noindex");

  const sitemapEntries = await checkSitemap(indexable);

  if (problems.length > 0) {
    console.error(`check-seo: ${problems.length} problem(s)`);
    for (const problem of problems) console.error(`  ${problem}`);
    process.exit(1);
  }

  console.log(`check-seo: ${indexable.size} pages and ${sitemapEntries} sitemap entries pass`);
}

main();
