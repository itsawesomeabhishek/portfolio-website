import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { BootScreen } from "@/components/chrome/BootScreen";
import { identity } from "@/content/identity";
import { bootInlineScript } from "@/lib/boot";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(identity.siteUrl),
  title: `${identity.name} — Full-Stack Developer`,
  description: identity.description,
  openGraph: {
    title: `${identity.name} — Full-Stack Developer`,
    description: identity.description,
    type: "website",
    url: identity.siteUrl,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#fafaf5",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootInlineScript }} />
        <noscript>
          <style>{"[data-boot-screen]{display:none!important}"}</style>
        </noscript>
      </head>
      <body className="bg-grid font-sans">
        <a
          href="#main"
          className="sr-only z-[110] border-2 border-line bg-neo-yellow px-4 py-2 font-mono text-sm font-bold text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <BootScreen />
        {children}
      </body>
    </html>
  );
}

