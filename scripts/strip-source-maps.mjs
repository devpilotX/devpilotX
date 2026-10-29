// Removes any .map file from the static export. Next.js does not emit source
// maps for the site's own code, but it ships one for its polyfill bundle, and
// nothing in out/ should hand readable source to a visitor.

import { readdir, rm, stat } from "node:fs/promises";
import path from "node:path";

const OUT_DIR = path.resolve("out");

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

async function main() {
  try {
    await stat(OUT_DIR);
  } catch {
    console.error("strip-source-maps: no out/ folder, run next build first");
    process.exit(1);
  }

  const maps = (await walk(OUT_DIR)).filter((file) => file.endsWith(".map"));
  await Promise.all(maps.map((file) => rm(file)));
  console.log(`strip-source-maps: removed ${maps.length} source map file(s)`);
}

main();
