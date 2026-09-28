import { withContentCollections } from "@content-collections/next";

// The site is served from the root of its custom domain, devpilotx.me.
// PAGES_BASE_PATH is only needed when hosting under a sub-path, for example
// a fork served from <user>.github.io/<repo>. It must start with "/".
const basePath = (process.env.PAGES_BASE_PATH ?? "").replace(/\/$/, "");
const siteUrl = (process.env.PAGES_BASE_URL || "https://devpilotx.me").replace(
  /^http:\/\//,
  "https://"
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The site is hosted on GitHub Pages, so it is built as plain static files.
  output: "export",
  // GitHub Pages serves /blog/ from blog/index.html without extra rewrites.
  trailingSlash: true,
  basePath,
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
