import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

// Google Analytics 4. It only loads in production builds, so running the
// site locally with `pnpm dev` does not send page views.
const GA_ID = process.env.NODE_ENV === "production" ? "G-6DC3JHJ5SE" : "";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

// Only code blocks and a few numbers use the mono face, so it is not
// preloaded on every page.
const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  preload: false,
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

// Defaults for every page. Each page sets its own title, description,
// canonical URL and sharing image through pageMetadata() in lib/seo.ts.
export const metadata: Metadata = {
  metadataBase: new URL(`${DATA.url}/`),
  applicationName: DATA.brand,
  title: {
    default: `${DATA.name} (${DATA.brand}) | Software Builder`,
    template: `%s | ${DATA.name}`,
  },
  description: DATA.description,
  keywords: [...DATA.keywords],
  authors: [{ name: DATA.name, url: `${DATA.url}/` }],
  creator: DATA.name,
  publisher: DATA.name,
  category: "technology",
  formatDetection: { telephone: false, address: false, email: false },
  verification: {
    google: "321TR9xJdg9HHKBWpWAHIBZi-7evvtxG1aY5Pc-tx5Y",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "relative min-h-screen bg-background font-sans antialiased",
          geist.variable,
          geistMono.variable
        )}
      >
        <a
          href="#main"
          className="sr-only z-50 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
          {/* The dock is fixed to the bottom of the screen but comes first
              in the page, so keyboard and screen reader users meet the
              navigation before the content, like a header. */}
          <Navbar />
          <div className="absolute inset-x-0 top-0 z-0 h-[100px] overflow-hidden" aria-hidden="true">
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
          <div className="relative z-10 mx-auto max-w-2xl px-6 pb-28 pt-12 sm:pt-24">
            <main id="main" tabIndex={-1} className="outline-none">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>

        {/* Loaded after the page is interactive, so it never blocks the first render. */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
