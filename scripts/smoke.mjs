// Runs after a deploy. Loads the live home page, then requests every
// stylesheet, script, image and font it references. The run fails if the
// page or any of those files does not come back with a 200.
//
// GitHub Pages can take a minute to switch to a new deployment, so each
// attempt that fails is retried before giving up.

const SITE_URL = (process.env.SITE_URL ?? "https://devpilotx.me").replace(/\/$/, "");
const EXPECTED_BUILD = process.env.EXPECTED_BUILD ?? "";
const ATTEMPTS = Number(process.env.SMOKE_ATTEMPTS ?? 10);
const DELAY_MS = 15_000;

const ASSET = /\b(?:href|src)="(\/[^"/][^"]*\.(?:css|js|png|jpg|jpeg|svg|ico|woff2?|ttf))"/g;

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

  const assets = [...new Set([...html.matchAll(ASSET)].map((match) => match[1]))];
  if (assets.length === 0) return ["home page references no assets"];

  const failures = [];
  await Promise.all(
    assets.map(async (asset) => {
      const assetResponse = await fetch(fresh(`${SITE_URL}${asset}`), { method: "HEAD" });
      if (assetResponse.status !== 200) failures.push(`${asset} returned ${assetResponse.status}`);
    })
  );

  if (failures.length === 0) console.log(`smoke: ${SITE_URL} and ${assets.length} assets returned 200`);
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
