import type { MetadataRoute } from "next"

import { routing } from "@/i18n/routing"
import { localizedPathname, siteUrl } from "@/lib/seo"

export const dynamic = "force-static"

const LOCALIZED_ROUTES = [
  "/",
  "/services",
  "/studio",
  "/work",
  "/contact",
  "/work/corazon-napoletano",
  "/work/barber-booking",
]

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [{ url: siteUrl("/") }]

  for (const locale of routing.locales) {
    for (const route of LOCALIZED_ROUTES) {
      urls.push({ url: siteUrl(localizedPathname(locale, route)) })
    }
  }

  return urls
}