import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { Familjen_Grotesk, Geist_Mono, Instrument_Serif } from "next/font/google"

import { cn } from "@/lib/utils"
import { routing } from "@/i18n/routing"
import {
  robotsPolicy,
  SITE_NAME,
  assetUrl,
  siteUrl,
  SOCIAL_IMAGE,
  SOCIAL_IMAGE_ALT,
  websiteSchema,
} from "@/lib/seo"

import "../globals.css"

const grotesk = Familjen_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-grotesk",
  display: "swap",
})

const instrument = Instrument_Serif({
  weight: "400",
  style: "italic",
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
})

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({
    locale: routing.defaultLocale,
    namespace: "seo.gateway",
  })

  const languages: Record<string, string> = {}
  for (const locale of routing.locales) {
    languages[locale] = siteUrl(`/${locale}/`)
  }
  languages["x-default"] = siteUrl("/")

  return {
    title: t("title"),
    description: t("description"),
    robots: robotsPolicy,
    alternates: { canonical: siteUrl("/"), languages },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: siteUrl("/"),
      siteName: SITE_NAME,
      locale: "en_US",
      alternateLocale: ["es_ES", "it_IT"],
      type: "website",
      images: [
        {
          url: assetUrl(SOCIAL_IMAGE),
          width: 1200,
          height: 630,
          alt: SOCIAL_IMAGE_ALT,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [assetUrl(SOCIAL_IMAGE)],
    },
  }
}

export default function GatewayLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={cn(
        "font-sans",
        grotesk.variable,
        instrument.variable,
        geistMono.variable
      )}
    >
      <body className="min-h-svh bg-obsidian text-ivory antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema()).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  )
}