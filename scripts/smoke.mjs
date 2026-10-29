// Runs after a push to main. Cloudflare Pages builds and publishes the site
// on its own, so this waits until the live home page carries the build ID of
// this commit (see generateBuildId in next.config.mjs). It then requests every
// stylesheet, script, image and font the page references, the main pages and
// files, a made-up URL that must answer 404, and checks the security headers
// from public/_headers. The run fails if any of that does not hold.

const SITE_URL = (process.env.SITE_URL ?? "https://devpilotx.me").replace(/\/$/, "");
const EXPECTED_BUILD = (process.env.EXPECTED_BUILD ?? "").slice(0, 12);
const ATTEMPTS = Number(process.env.SMOKE_ATTEMPTS ?? 10);
const DELAY_MS = 15_000;

const ASSET = /\b(?:href|src)="(\/[^"/][^"]*\.(?:css|js|png|jpg|jpeg|webp|svg|ico|woff2?|ttf))"/g;
const PAGES = [
  "/projects/",
  "/projects/techcyme/",
  "/blog/",
  "/sitemap.xml",
  "/robots.txt",
  "/rss.xml",
  "/llms.txt",
  "/og.png",
  "/manifest.webmanifest",
];
const HEADERS = ["content-security-policy", "strict-transport-security", "x-frame-options", "x-content-type-options"];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// A query string keeps the CDN from answering with a cached copy of the old page.
const fresh = (url) => `${url}${url.includes("?") ? "&" : "?"}smoke=${Date.now()}`;

async function check() {
  const response = await fetch(fresh(`${SITE_URL}/`), { redirect: "follow" });
  if (response.status !== 200) return [`home page returned ${response.status}`];

  const html = await response.text();
  if (EXPECTED_BUILD && !html.includes(EXPECTED_BUILD)) {
    return [`home page is not the expected build yet (${EXPECTED_BUILD})`];
  }

  const failures = [];
  for (const header of HEADERS) {
    if (!response.headers.get(header)) failures.push(`home page has no ${header} header`);
  }

  const assets = [...new Set([...html.matchAll(ASSET)].map((match) => match[1]))];
  if (assets.length === 0) failures.push("home page references no assets");

  await Promise.all(
    [...assets, ...PAGES].map(async (url) => {
      const assetResponse = await fetch(fresh(`${SITE_URL}${url}`), { method: "GET" });
      if (assetResponse.status !== 200) failures.push(`${url} returned ${assetResponse.status}`);
    })
  );

  const missing = await fetch(fresh(`${SITE_URL}/this-page-does-not-exist/`));
  if (missing.status !== 404) failures.push(`a made-up URL returned ${missing.status}, expected 404`);

  if (failures.length === 0) {
    console.log(`smoke: ${SITE_URL}, ${assets.length} assets and ${PAGES.length} pages and files returned 200`);
  }
  return failures;
}

async function main() {
  for (let attempt = 1; attempt <= ATTEMPTS; attempt += 1) {
    let failures;
    try {
      failures = await check();
    } catch (error) {
      failures = [`request failed: ${error.message}`];
    }

    if (failures.length === 0) return;

    console.log(`smoke: attempt ${attempt} of ${ATTEMPTS} failed`);
    for (const failure of failures.slice(0, 10)) console.log(`  ${failure}`);
    if (attempt < ATTEMPTS) await sleep(DELAY_MS);
  }

  console.error(`smoke: ${SITE_URL} is not serving a working build`);
  process.exit(1);
}

main();
