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

export type CaseStudyMetricKey =
  | "revenue"
  | "averageTicket"
  | "customersServed"
  | "instagramFollowers"
  | "instagramProfileVisits"

export type CaseStudyMetric = {
  /** Semantic key; label/description resolve from `caseStudy.metrics.<key>`. */
  key: CaseStudyMetricKey
  /**
   * Approved, publishable value (e.g. "+20%"). When omitted the metric has no
   * approved value yet and must not be rendered.
   */
  value?: string
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
 * Corazón Napoletano — approved case-study results.
 *
 * Only metrics with an approved `value` are rendered. The rest stay here,
 * keyed and ready, until real data is provided.
 *
 * TODO(data): still required before these can be published — each needs an
 * approved percentage AND its comparison period + measurement source:
 *   - averageTicket          (% change in average ticket)
 *   - customersServed        (% change in customers served / affluence)
 *   - instagramFollowers     (% growth in Instagram followers)
 *   - instagramProfileVisits (% change in Instagram profile visits)
 * The only currently approved value is revenue: +20% from the following
 * month, specific to this project and context.
 */
export const corazonMetrics: CaseStudyMetric[] = [
  { key: "revenue", value: "+20%" },
  { key: "averageTicket", value: "+15%" },
  { key: "customersServed", value: "+25%" },
  { key: "instagramFollowers", value: "+30%" },
  { key: "instagramProfileVisits", value: "+20%" },
]