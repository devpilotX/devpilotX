import { DATA } from "@/data/resume";
import { renderOgCard } from "@/lib/og";

// Exported as a real .png file so the host serves it with an image content
// type, which LinkedIn and X need to show the preview.
export const dynamic = "force-static";

export function GET() {
  return renderOgCard({
    title: `${DATA.name} (${DATA.brand})`,
    description: DATA.description,
  });
}
