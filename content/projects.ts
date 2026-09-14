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
  | "avgTicket"
  | "gbpActions"
  | "gbpDirections"
  | "gbpWebsiteClicks"
  | "gbpCalls"
  | "adsClicks"

export type CorazonMetricGroupId =
  | "menu"
  | "ads"
  | "digital"
  | "reservations"

export type CorazonMetricGroup = {
  id: CorazonMetricGroupId
  /**
   * The single primary KPI for this lever. Optional: a lever may carry no
   * measured figure (e.g. the consulting lever "reservations & retention").
   */
  metric?: CorazonMetricKey
  /**
   * For the digital lever only: the components that sum to the featured
   * "actions on Google" total, rendered discreetly below the primary KPI.
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
 * The overall result is the average weekly revenue (+49,1%), rendered at the
 * top of the case study. The four levers below describe the areas of
 * intervention; each carries the single available measured figure (menu,
 * advertising, digital presence) or none at all (reservations & retention —
 * a consulting lever, so no invented KPI). Labels and locale-formatted values
 * live in the `projects.corazon.caseStudy.metrics` message namespace.
 *
 * Excluded from the UI and from any derived figure (client instruction):
 *   - average CTR (3,27% / 3.27%)
 *   - tracked conversions (467)
 * These values must never be rendered, referenced or used to compute anything.
 *
 * The previous "+20% revenue from the following month" figure has been
 * superseded by the approved figures below (e.g. +49,1% average weekly
 * revenue following the menu reengineering).
 */
export const corazonMetricGroups: CorazonMetricGroup[] = [
  { id: "menu", metric: "avgTicket" },
  { id: "ads", metric: "adsClicks" },
  {
    id: "digital",
    metric: "gbpActions",
    breakdown: ["gbpDirections", "gbpWebsiteClicks", "gbpCalls"],
  },
  { id: "reservations" },
]

/**
 * The restaurant plan chosen by Corazón Napoletano ("Sala Llena").
 * Injected into the case-study result line.
 */
export const CORAZON_PLAN_NAME = "Sala Llena"