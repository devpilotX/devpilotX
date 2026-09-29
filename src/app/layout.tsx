import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-mono",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(`${DATA.url}/`),
  applicationName: "DevPilotX",
  title: {
    default: `${DATA.name} | Full-Stack Developer`,
    template: `%s | ${DATA.name}`,
  },
  description: DATA.description,
  keywords: [...DATA.keywords],
  authors: [{ name: DATA.name, url: DATA.url }],
  creator: DATA.name,
  alternates: { canonical: `${DATA.url}/` },
  openGraph: {
    title: `${DATA.name} | Full-Stack Developer`,
    description: DATA.description,
    url: DATA.url,
    siteName: DATA.name,
    locale: "en_IN",
    type: "website",
    images: [{ url: `${DATA.url}/og.png`, width: 1200, height: 630, alt: DATA.name }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: `${DATA.name} | Full-Stack Developer`,
    description: DATA.description,
    card: "summary_large_image",
    creator: "@devpilotx",
    images: [`${DATA.url}/og.png`],
  },
};

const personJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Person",
  name: DATA.name,
  url: DATA.url,
  image: `${DATA.url}${DATA.avatarUrl}`,
  jobTitle: "Full-Stack Developer",
  email: `mailto:${DATA.contact.email}`,
  alumniOf: DATA.education.map((school) => school.school),
  sameAs: Object.values(DATA.contact.social)
    .map((social) => social.url)
    .filter((url) => url.startsWith("http")),
}).replace(/</g, "\\u003c");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased relative",
          geist.variable,
          geistMono.variable
        )}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: personJsonLd }}
        />
        <ThemeProvider attribute="class" defaultTheme="light">
          <TooltipProvider delayDuration={0}>
            <div className="absolute inset-0 top-0 left-0 right-0 h-[100px] overflow-hidden z-0">
              <FlickeringGrid
                className="h-full w-full"
                squareSize={2}
                gridGap={2}
                style={{
                  maskImage: "linear-gradient(to bottom, black, transparent)",
                  WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
                }}
              />
            </div>
            <div className="relative z-10 max-w-2xl mx-auto py-12 pb-24 sm:py-24 px-6">
              {children}
            </div>
            <Navbar />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
