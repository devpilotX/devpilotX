import { renderOgCard } from "@/lib/og";

export const dynamic = "force-static";

export function GET() {
  return renderOgCard({
    title: "Projects",
    description: "Websites, a CRM, a personal finance site for India, a trading system and more, with screenshots.",
  });
}
