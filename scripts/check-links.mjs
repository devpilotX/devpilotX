// Checks the static export before it is published. Every root-relative
// href, src and srcset in out/**/*.html must point at a file that exists in
// out/, after the base path is removed. A wrong base path, a missing image or
// a renamed page fails the build here instead of on the live site.

import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const OUT_DIR = path.resolve("out");
const BASE_PATH = (process.env.PAGES_BASE_PATH ?? "").replace(/\/$/, "");
const ATTRIBUTE = /\b(?:href|src|srcSet|srcset)="([^"]+)"/g;

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

// Maps a URL path to the file GitHub Pages would serve for it.
async function resolves(urlPath) {
  const clean = decodeURIComponent(urlPath.split(/[?#]/)[0]);
  const relative = clean.replace(/^\/+/, "");
  const candidates = clean.endsWith("/")
    ? [path.join(OUT_DIR, relative, "index.html")]
    : [
        path.join(OUT_DIR, relative),
        path.join(OUT_DIR, relative, "index.html"),
        path.join(OUT_DIR, `${relative}.html`),
      ];
  for (const candidate of candidates) {
    if (await exists(candidate)) return true;
  }
  return false;
}

function urlsIn(html) {
  const urls = [];
  for (const [, value] of html.matchAll(ATTRIBUTE)) {
    // srcset holds a comma separated list of "url width" pairs.
    for (const part of value.split(",")) {
      const url = part.trim().split(/\s+/)[0];
      if (url) urls.push(url.replace(/&amp;/g, "&"));
    }
  }
  return urls;
}

async function main() {
  const pages = (await walk(OUT_DIR)).filter((file) => file.endsWith(".html"));
  if (pages.length === 0) {
    console.error("check-links: no HTML in out/, run the build first");
    process.exit(1);
  }

  const problems = [];
  let checked = 0;

  for (const page of pages) {
    const html = await readFile(page, "utf8");
    const from = path.relative(OUT_DIR, page);

    for (const url of new Set(urlsIn(html))) {
      if (!url.startsWith("/") || url.startsWith("//")) continue;

      if (BASE_PATH && !url.startsWith(`${BASE_PATH}/`) && url !== BASE_PATH) {
        problems.push(`${from}: ${url} is missing the base path ${BASE_PATH}`);
        continue;
      }

      checked += 1;
      const target = BASE_PATH ? url.slice(BASE_PATH.length) || "/" : url;
      if (!(await resolves(target))) {
        problems.push(`${from}: ${url} does not exist in out/`);
      }
    }
  }

  if (problems.length > 0) {
    console.error(`check-links: ${problems.length} broken link(s)`);
    for (const problem of problems) console.error(`  ${problem}`);
    process.exit(1);
  }

  console.log(`check-links: ${checked} links across ${pages.length} pages resolve`);
}

main();
