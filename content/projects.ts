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