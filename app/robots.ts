import type { MetadataRoute } from "next"

import { assetUrl, SITE_INDEXABLE } from "@/lib/seo"

export const dynamic = "force-static"

export default function robots(): MetadataRoute.Robots {
  // While the site is noindex (pre-launch), do not advertise the sitemap.
  // The meta robots tag remains the real indexing control.
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    ...(SITE_INDEXABLE ? { sitemap: assetUrl("/sitemap.xml") } : {}),
  }
}