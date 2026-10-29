// Next.js 16 writes the per-segment RSC payloads of a static export into
// nested folders, for example
//
//   blog/post/__next.blog/$d$slug/__PAGE__.txt
//
// while the client router requests the same file under a flat, dot-joined
// name:
//
//   blog/post/__next.blog.$d$slug.__PAGE__.txt
//
// On a plain file host like Cloudflare Pages those requests 404 and every client
// side navigation falls back to a full page load. This copies each nested
// file to the flat name so both paths resolve.

import { copyFile, readdir, stat } from "node:fs/promises";
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
    console.error("flatten-segments: no out/ folder, run next build first");
    process.exit(1);
  }

  let copied = 0;
  for (const file of await walk(OUT_DIR)) {
    const parts = path.relative(OUT_DIR, file).split(path.sep);
    const rootIndex = parts.findIndex((part) => part.startsWith("__next."));

    // Only files that sit inside a __next.* folder need a flat copy.
    if (rootIndex === -1 || rootIndex === parts.length - 1) continue;

    const flatName = parts.slice(rootIndex).join(".");
    const target = path.join(OUT_DIR, ...parts.slice(0, rootIndex), flatName);
    await copyFile(file, target);
    copied += 1;
  }

  console.log(`flatten-segments: wrote ${copied} flat segment files`);
}

main();
