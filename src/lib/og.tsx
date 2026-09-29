/* eslint-disable @next/next/no-img-element */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { DATA } from "@/data/resume";

export const ogSize = { width: 1200, height: 630 };

// The site is exported as static files, so the Open Graph images are rendered
// once at build time. Reading assets from disk keeps that step offline.
async function loadAssets() {
  const publicDir = path.join(process.cwd(), "public");
  const [cabinetGrotesk, clashDisplay, avatar, logo] = await Promise.all([
    readFile(path.join(publicDir, "fonts", "CabinetGrotesk-Medium.ttf")),
    readFile(path.join(publicDir, "fonts", "ClashDisplay-Semibold.ttf")),
    readFile(path.join(publicDir, DATA.avatarUrl)),
    readFile(path.join(publicDir, "devpilotx.svg")),
  ]);

  return {
    avatar: `data:image/jpeg;base64,${avatar.toString("base64")}`,
    logo: `data:image/svg+xml;base64,${logo.toString("base64")}`,
    fonts: [
      { name: "Cabinet Grotesk", data: cabinetGrotesk, weight: 400 as const, style: "normal" as const },
      { name: "Clash Display", data: clashDisplay, weight: 600 as const, style: "normal" as const },
    ],
  };
}

interface ProjectCoverProps {
  title: string;
  tagline: string;
  tags: readonly string[];
  repo: string;
}

// Thumbnail for a project card. The card crops the image to a wide strip,
// so everything important sits in the middle band.
export async function renderProjectCover({ title, tagline, tags, repo }: ProjectCoverProps) {
  const { fonts } = await loadAssets();

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100%",
          width: "100%",
          padding: "0 40px",
          backgroundColor: "#0a0a0a",
          backgroundImage: "radial-gradient(circle at 1px 1px, #262626 1px, transparent 0)",
          backgroundSize: "24px 24px",
          fontFamily: "Cabinet Grotesk",
        }}
      >
        <div style={{ display: "flex", fontSize: 17, color: "#a3a3a3", marginBottom: 10 }}>
          github.com/devpilotX/{repo}
        </div>
        <div
          style={{
            fontFamily: "Clash Display",
            fontSize: 64,
            lineHeight: 1,
            color: "#fafafa",
            marginBottom: 16,
          }}
        >
          {title}
        </div>
        <div style={{ fontSize: 26, color: "#d4d4d4", marginBottom: 22 }}>{tagline}</div>
        <div style={{ display: "flex", gap: 10 }}>
          {tags.slice(0, 4).map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                fontSize: 17,
                color: "#e5e5e5",
                border: "1px solid #404040",
                borderRadius: 8,
                padding: "4px 12px",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { width: 600, height: 376, fonts }
  );
}

interface OgCardProps {
  title: string;
  description?: string;
  date?: string;
}

export async function renderOgCard({ title, description, date }: OgCardProps) {
  const { avatar, logo, fonts } = await loadAssets();

  return new ImageResponse(
    (
      <div style={{ display: "flex", height: "100%", width: "100%", padding: 40, backgroundColor: "#ffffff" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            width: "100%",
            padding: 40,
            backgroundColor: "#fafafa",
            border: "1px solid #e5e5e5",
            borderRadius: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
              <img
                src={avatar}
                alt={DATA.name}
                width={120}
                height={120}
                style={{ borderRadius: 24, border: "4px solid #e5e5e5", objectFit: "cover" }}
              />
              <div style={{ display: "flex", flexDirection: "column", fontFamily: "Cabinet Grotesk" }}>
                <span style={{ fontSize: 28, color: "#000000" }}>{DATA.name}</span>
                <span style={{ fontSize: 22, color: "#666666" }}>devpilotx.me</span>
              </div>
            </div>
            <img src={logo} alt="DevPilotX" width={72} height={72} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontFamily: "Cabinet Grotesk" }}>
            <div
              style={{
                fontFamily: "Clash Display",
                fontSize: 56,
                lineHeight: 1.1,
                letterSpacing: "0em",
                color: "#000000",
                marginBottom: 16,
                maxWidth: 950,
              }}
            >
              {title}
            </div>
            {description && (
              <div style={{ fontSize: 24, lineHeight: 1.45, color: "#404040", maxWidth: 900 }}>
                {description}
              </div>
            )}
            {date && <div style={{ fontSize: 20, color: "#666666", marginTop: 16 }}>{date}</div>}
          </div>
        </div>
      </div>
    ),
    { ...ogSize, fonts }
  );
}
