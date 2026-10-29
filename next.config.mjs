import { withContentCollections } from "@content-collections/next";

// The site is served from the root of its custom domain, devpilotx.me.
// PAGES_BASE_PATH is only needed when hosting under a sub-path, for example
// a fork served from <user>.github.io/<repo>. It must start with "/".
const basePath = (process.env.PAGES_BASE_PATH ?? "").replace(/\/$/, "");
const siteUrl = (process.env.PAGES_BASE_URL || "https://devpilotx.me").replace(
  /^http:\/\//,
  "https://"
);

// Cloudflare Pages sets CF_PAGES_COMMIT_SHA and GitHub Actions sets
// GITHUB_SHA. Using the commit as the build ID means every build of the same
// commit matches, so the post-deploy check can tell when the live site runs
// it. Local builds keep Next.js's random ID.
const commit = process.env.CF_PAGES_COMMIT_SHA || process.env.GITHUB_SHA || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Cloudflare Pages serves the site as plain static files from out/.
  output: "export",
  // /blog/ is served from blog/index.html without extra rewrites.
  trailingSlash: true,
  basePath,
  generateBuildId: async () => (commit ? commit.slice(0, 12) : null),
  images: {
    unoptimized: true,
  },
  // next/link handles basePath by itself, but plain <img> and <a> tags do
  // not, so the value is exposed to the app as well.
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_SITE_URL: siteUrl.replace(/\/$/, ""),
  },
};

// withContentCollections must be the outermost plugin
export default withContentCollections(nextConfig);
