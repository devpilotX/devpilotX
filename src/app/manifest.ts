import type { MetadataRoute } from "next";
import { DATA } from "@/data/resume";

export const dynamic = "force-static";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${DATA.name} | DevPilotX`,
    short_name: "DevPilotX",
    description: DATA.description,
    start_url: `${BASE_PATH}/`,
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [
      { src: `${BASE_PATH}/icon-192.png`, sizes: "192x192", type: "image/png" },
      { src: `${BASE_PATH}/icon-512.png`, sizes: "512x512", type: "image/png" },
      { src: `${BASE_PATH}/icon-512.png`, sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
