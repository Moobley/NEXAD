import { routing } from "@/i18n/routing"
import { assetUrl, localizedPathname, SITE_INDEXABLE, siteUrl } from "@/lib/seo"

export const dynamic = "force-static"

const LANGUAGE_HEADINGS: Record<string, string> = {
  es: "Español",
  en: "English",
  it: "Italiano",
}

/** Display order for the per-language sections (English first). */
const LANGUAGE_ORDER = ["en", "es", "it"]

/**
 * Locale-less routes and their labels. URLs are always built locale-aware via
 * localizedPathname + siteUrl (localePrefix "always"), so they resolve to
 * /es|en|it/... on every environment (GitHub Pages /NEXAD preview or the
 * production domain) without hardcoding an origin or basePath.
 */
const PAGES: Array<[label: string, path: string]> = [
  ["Home", "/"],
  ["Services", "/services"],
  ["Work", "/work"],
  ["Studio", "/studio"],
  ["Contact", "/contact"],
  ["Corazón Napoletano", "/work/corazon-napoletano"],
  ["Barber Booking", "/work/barber-booking"],
]

function languageSection(locale: string): string {
  const heading = LANGUAGE_HEADINGS[locale] ?? locale
  const links = PAGES.map(
    ([label, path]) => `- [${label}](${siteUrl(localizedPathname(locale, path))})`
  )
  return [`## ${heading}`, "", ...links].join("\n")
}

export function GET(): Response {
  const sections = [
    "# NEXAD",
    "",
    "> Growth, engineered. A digital studio in Las Palmas de Gran Canaria where strategy, marketing, content, product and software work as one growth system.",
    "",
    "A digital studio based in Las Palmas de Gran Canaria (Canarias, Spain), NEXAD connects strategy, marketing, content, product and software as a single growth system. Engagement: one-off projects and ongoing collaborations (retainers). Core team: Alessandro (Marketing & Brand) and Lorenzo (Technology & Product), with a network of external specialists.",
    "",
    "Corazón Napoletano — Client Work (Las Palmas): brand identity, content, menu and upselling, QR, website, reels and Meta/Google Ads. Its approved result, +20% revenue from the following month, is specific to that project and context.",
    "",
    "Barber Booking — NEXAD Lab: a booking platform for barbershops in development (services, professionals, availability, schedule, customers and data).",
    "",
  ]

  if (!SITE_INDEXABLE) {
    sections.push("Status: pre-launch preview; not intended for search indexing.", "")
  }

  const locales = [...new Set([...LANGUAGE_ORDER, ...routing.locales])]
  for (const locale of locales) {
    sections.push(languageSection(locale), "")
  }

  if (SITE_INDEXABLE) {
    sections.push(`Sitemap: ${assetUrl("/sitemap.xml")}`, "")
  }

  return new Response(sections.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
