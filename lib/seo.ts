import type { Metadata } from "next"

import { routing } from "@/i18n/routing"

const RAW_ORIGIN = process.env.NEXT_PUBLIC_SITE_ORIGIN

/**
 * Whether the site may be indexed. Defaults to false (pre-launch).
 * Only an explicit "true" enables index/follow.
 */
export const SITE_INDEXABLE = process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true"

export const SITE_NAME = "NEXAD"

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

function validateOrigin(origin: string): string {
  let parsed: URL
  try {
    parsed = new URL(origin)
  } catch {
    throw new Error(
      `Invalid NEXT_PUBLIC_SITE_ORIGIN "${origin}": expected an absolute URL (scheme + host, e.g. https://moobley.github.io).`
    )
  }
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    throw new Error(
      `Invalid NEXT_PUBLIC_SITE_ORIGIN "${origin}": only http/https are supported.`
    )
  }
  if (SITE_INDEXABLE && parsed.protocol !== "https:") {
    throw new Error(
      `Invalid NEXT_PUBLIC_SITE_ORIGIN "${origin}": an indexable build requires https.`
    )
  }
  if (parsed.username || parsed.password) {
    throw new Error(
      `Invalid NEXT_PUBLIC_SITE_ORIGIN "${origin}": credentials are not allowed.`
    )
  }
  if (parsed.search || parsed.hash) {
    throw new Error(
      `Invalid NEXT_PUBLIC_SITE_ORIGIN "${origin}": query/hash are not allowed in the origin.`
    )
  }
  if (parsed.pathname !== "/" && parsed.pathname !== "") {
    throw new Error(
      `Invalid NEXT_PUBLIC_SITE_ORIGIN "${origin}": must not include a basePath/pathname (use NEXT_PUBLIC_BASE_PATH for that).`
    )
  }
  return origin.replace(/\/+$/, "")
}

/**
 * Public site origin (scheme + host), without the basePath. Fail-closed:
 * an indexable build requires an explicit, valid, https origin; the
 * localhost fallback is only allowed for non-indexable development builds.
 */
export const SITE_ORIGIN: string = (() => {
  if (SITE_INDEXABLE) {
    if (!RAW_ORIGIN) {
      throw new Error(
        "NEXT_PUBLIC_SITE_INDEXABLE=true requires an explicit NEXT_PUBLIC_SITE_ORIGIN; the localhost fallback is only allowed for non-indexable development builds."
      )
    }
    return validateOrigin(RAW_ORIGIN)
  }
  if (!RAW_ORIGIN) return "http://localhost:3000"
  return validateOrigin(RAW_ORIGIN)
})()

/** Robots policy: pre-launch noindex, follow; production index, follow. */
export const robotsPolicy = SITE_INDEXABLE
  ? ({ index: true, follow: true } satisfies Metadata["robots"])
  : ({ index: false, follow: true } satisfies Metadata["robots"])

/** Absolute URL = SITE_ORIGIN + BASE_PATH + pathname, single slashes, trailing slash. */
export function siteUrl(pathname = "/"): string {
  const origin = SITE_ORIGIN.replace(/\/+$/, "")
  const base = BASE_PATH ? `/${BASE_PATH.replace(/^\/+|\/+$/g, "")}` : ""
  const segments = pathname
    .split("/")
    .map((s) => s.trim())
    .filter(Boolean)
  const path = segments.length ? `/${segments.join("/")}/` : "/"
  return `${origin}${base}${path}`
}

/** Absolute URL for a file asset (no trailing slash), e.g. images or sitemap.xml. */
export function assetUrl(pathname: string): string {
  const origin = SITE_ORIGIN.replace(/\/+$/, "")
  const base = BASE_PATH ? `/${BASE_PATH.replace(/^\/+|\/+$/g, "")}` : ""
  const clean = pathname.startsWith("/") ? pathname : `/${pathname}`
  return `${origin}${base}${clean}`
}

/** Locale-prefixed pathname for a given locale and locale-less path. */
export function localizedPathname(locale: string, path = "/"): string {
  if (!path || path === "/") return `/${locale}/`
  const clean = path.startsWith("/") ? path : `/${path}`
  return `/${locale}${clean}${clean.endsWith("/") ? "" : "/"}`
}

function ogLocale(locale: string): string {
  const map: Record<string, string> = { es: "es_ES", en: "en_US", it: "it_IT" }
  return map[locale] ?? locale
}

export const SOCIAL_IMAGE = "/social/nexad-social.png"
export const SOCIAL_IMAGE_ALT = "NEXAD — Growth, engineered."

/** Minimal WebSite structured data, emitted once at the Gateway root. */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: siteUrl("/"),
    inLanguage: routing.locales,
  }
}

/**
 * Organization structured data, emitted on localized pages (site-wide).
 * Facts only: studio name, origin, logo, base address and the two core team
 * members already public on the Studio page.
 */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: siteUrl("/"),
    logo: assetUrl("/logos/nexad-wordmark-carbon.svg"),
    description:
      "Growth, engineered. A digital studio connecting strategy, marketing, content, product and software.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Las Palmas de Gran Canaria",
      addressRegion: "Canarias",
      addressCountry: "ES",
    },
    founder: [
      { "@type": "Person", name: "Alessandro", jobTitle: "Marketing & Brand" },
      {
        "@type": "Person",
        name: "Lorenzo",
        jobTitle: "Technology & Product",
      },
    ],
  }
}

/**
 * Services structured data, emitted on the Services page. Describes the
 * studio as a ProfessionalService with the five capabilities as an offer
 * catalog, sourced from the same messages the page renders.
 */
export function servicesSchema(
  services: Array<{ name: string; description: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE_NAME,
    url: siteUrl("/services/"),
    areaServed: {
      "@type": "Place",
      name: "Las Palmas de Gran Canaria, Spain",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "NEXAD services",
      itemListElement: services.map((service, index) => ({
        "@type": "Offer",
        position: index + 1,
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.description,
        },
      })),
    },
  }
}

/**
 * Assembles page metadata: robots policy, absolute canonical, reciprocal
 * hreflang (es / en / it + x-default), Open Graph and Twitter cards.
 *
 * For home clusters the caller passes `xDefault` pointing to the Gateway root;
 * internal routes default x-default to the `es` version of the same content.
 */
export function pageMetadata(opts: {
  locale: string
  path: string
  title: string
  description: string
  xDefault?: string
}): Metadata {
  const canonical = siteUrl(localizedPathname(opts.locale, opts.path))

  const languages: Record<string, string> = {}
  for (const locale of routing.locales) {
    languages[locale] = siteUrl(localizedPathname(locale, opts.path))
  }
  languages["x-default"] =
    opts.xDefault ?? siteUrl(localizedPathname(routing.defaultLocale, opts.path))

  return {
    title: opts.title,
    description: opts.description,
    robots: robotsPolicy,
    alternates: { canonical, languages },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url: canonical,
      siteName: SITE_NAME,
      locale: ogLocale(opts.locale),
      alternateLocale: routing.locales
        .filter((locale) => locale !== opts.locale)
        .map(ogLocale),
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
      title: opts.title,
      description: opts.description,
      images: [assetUrl(SOCIAL_IMAGE)],
    },
  }
}