/* eslint-disable @next/next/no-img-element */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { DATA } from "@/data/resume";

export const ogSize = { width: 1200, height: 630 };

// The site is exported as static files, so the Open Graph images are rendered
// once at build time. Reading assets from disk keeps that step offline. The
// two display fonts live in src/assets so the font files are not published.
async function loadAssets() {
  const publicDir = path.join(process.cwd(), "public");
  const fontDir = path.join(process.cwd(), "src", "assets", "fonts");
  const [cabinetGrotesk, clashDisplay, avatar] = await Promise.all([
    readFile(path.join(fontDir, "CabinetGrotesk-Medium.ttf")),
    readFile(path.join(fontDir, "ClashDisplay-Semibold.ttf")),
    readFile(path.join(publicDir, DATA.avatarUrl)),
  ]);

  return {
    avatar: `data:image/png;base64,${avatar.toString("base64")}`,
    fonts: [
      { name: "Cabinet Grotesk", data: cabinetGrotesk, weight: 400 as const, style: "normal" as const },
      { name: "Clash Display", data: clashDisplay, weight: 600 as const, style: "normal" as const },
    ],
  };
}

function Byline({ avatar }: { avatar: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
      <img
        src={avatar}
        alt={DATA.name}
        width={88}
        height={88}
        style={{ borderRadius: 20, border: "4px solid #e5e5e5", objectFit: "cover" }}
      />
      <div style={{ display: "flex", flexDirection: "column", fontFamily: "Cabinet Grotesk" }}>
        <span style={{ fontSize: 26, color: "#000000" }}>{DATA.name}</span>
        <span style={{ fontSize: 20, color: "#666666" }}>devpilotx.me</span>
      </div>
    </div>
  );
}

interface OgCardProps {
  title: string;
  description?: string;
  date?: string;
}

export async function renderOgCard({ title, description, date }: OgCardProps) {
  const { avatar, fonts } = await loadAssets();

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
          <Byline avatar={avatar} />
          <div style={{ display: "flex", flexDirection: "column", fontFamily: "Cabinet Grotesk" }}>
            <div
              style={{
                fontFamily: "Clash Display",
                fontSize: 56,
                lineHeight: 1.1,
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

interface ProjectOgProps {
  title: string;
  tagline: string;
  status: string;
  /** File name in src/assets/og: a 640px wide JPEG of the project's cover screenshot. */
  coverFile: string;
}

/** Sharing card for a project page: title and tagline beside its screenshot. */
export async function renderProjectOg({ title, tagline, status, coverFile }: ProjectOgProps) {
  const { avatar, fonts } = await loadAssets();
  const cover = await readFile(path.join(process.cwd(), "src", "assets", "og", coverFile));
  const coverSrc = `data:image/jpeg;base64,${cover.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ display: "flex", height: "100%", width: "100%", padding: 40, backgroundColor: "#ffffff" }}>
        <div
          style={{
            display: "flex",
            position: "relative",
            height: "100%",
            width: "100%",
            padding: 40,
            backgroundColor: "#fafafa",
            border: "1px solid #e5e5e5",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: 470,
              height: "100%",
              fontFamily: "Cabinet Grotesk",
            }}
          >
            <Byline avatar={avatar} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", marginBottom: 18 }}>
                <span
                  style={{
                    fontSize: 20,
                    color: "#171717",
                    border: "1px solid #d4d4d4",
                    borderRadius: 999,
                    padding: "4px 16px",
                    backgroundColor: "#ffffff",
                  }}
                >
                  {status}
                </span>
              </div>
              <div style={{ fontFamily: "Clash Display", fontSize: 62, lineHeight: 1.05, color: "#000000", marginBottom: 14 }}>
                {title}
              </div>
              <div style={{ fontSize: 27, lineHeight: 1.35, color: "#404040" }}>{tagline}</div>
            </div>
          </div>
          <img
            src={coverSrc}
            alt=""
            width={600}
            height={375}
            style={{
              position: "absolute",
              right: -40,
              top: 92,
              borderRadius: 14,
              border: "1px solid #d4d4d4",
              boxShadow: "0 20px 50px rgba(0,0,0,0.18)",
              objectFit: "cover",
              objectPosition: "top",
            }}
          />
        </div>
      </div>
    ),
    { ...ogSize, fonts }
  );
}
