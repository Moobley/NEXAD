export type ProjectService =
  | "web-development"
  | "digital-menu"
  | "paid-media"
  | "content"
  | "strategy"
  | "ux"
  | "product-design"
  | "web-app"
  | "development"

export type ProjectTone = "carbon" | "graphite"

export type ProjectType = "client" | "lab"

export type Project = {
  slug: string
  /**
   * `client` — work delivered for a real business (Corazón Napoletano).
   * `lab` — internal product/concept exploration (Barber Booking). Lab
   * projects have no client, no location and no business result by design.
   */
  type: ProjectType
  /** Messages namespace holding localized project copy. */
  ns: "projects.corazon" | "projects.barber"
  /** Client name — only present for client work. */
  client?: string
  /** Client location — only present for client work. */
  location?: string
  /** Live URL, when the project is public. */
  url?: string
  /** Services involved — localized via the `services` namespace. */
  services: ProjectService[]
  cover: {
    tone: ProjectTone
  }
}

export type CorazonMetricKey =
  | "weeklyRevenue"
  | "takeawayPizza"
  | "pizzasPerWeek"
  | "dineInPizza"
  | "weeklyPizzaRevenue"
  | "revenuePerPizza"
  | "gbpActions"
  | "gbpDirections"
  | "gbpWebsiteClicks"
  | "gbpCalls"
  | "adsImpressions"
  | "adsClicks"

export type CorazonMetricGroupId =
  | "business"
  | "googleBusinessProfile"
  | "googleAds"

export type CorazonMetricGroup = {
  id: CorazonMetricGroupId
  /** Metric keys rendered at the larger, primary size. */
  featured: CorazonMetricKey[]
  /** Metric keys rendered at the secondary size, in order. */
  metrics: CorazonMetricKey[]
  /**
   * For Google Business Profile only: the components that sum to the featured
   * "local actions" total, rendered as a breakdown below the featured metric.
   */
  breakdown?: CorazonMetricKey[]
}

export const projects: Project[] = [
  {
    slug: "corazon-napoletano",
    type: "client",
    ns: "projects.corazon",
    client: "Corazón Napoletano",
    location: "Las Palmas · Gran Canaria",
    url: "https://www.corazonnapoletano.com/",
    services: [
      "web-development",
      "digital-menu",
      "paid-media",
      "content",
      "strategy",
    ],
    cover: {
      tone: "carbon",
    },
  },
  {
    slug: "barber-booking",
    type: "lab",
    ns: "projects.barber",
    services: ["ux", "product-design", "web-app", "development"],
    cover: {
      tone: "graphite",
    },
  },
]

/*
 * Corazón Napoletano — approved case-study results (client-provided).
 *
 * Metrics are grouped into three distinct sets that must stay separate in the
 * UI and in any copy: business performance, Google Business Profile, and
 * Google Ads. Labels, descriptions and locale-formatted values live in the
 * `projects.corazon.caseStudy.metrics` message namespace.
 *
 * Excluded from the UI and from any derived figure (client instruction):
 *   - average CTR (3,27% / 3.27%)
 *   - tracked conversions (467)
 * These values must never be rendered, referenced or used to compute anything.
 *
 * The previous "+20% revenue from the following month" figure has been
 * superseded by the more precise business metrics below (e.g. +49,1% average
 * weekly revenue following the menu reengineering).
 */
export const corazonMetricGroups: CorazonMetricGroup[] = [
  {
    id: "business",
    featured: ["weeklyRevenue", "takeawayPizza"],
    metrics: [
      "pizzasPerWeek",
      "dineInPizza",
      "weeklyPizzaRevenue",
      "revenuePerPizza",
    ],
  },
  {
    id: "googleBusinessProfile",
    featured: ["gbpActions"],
    metrics: [],
    breakdown: ["gbpDirections", "gbpWebsiteClicks", "gbpCalls"],
  },
  {
    id: "googleAds",
    featured: [],
    metrics: ["adsImpressions", "adsClicks"],
  },
]