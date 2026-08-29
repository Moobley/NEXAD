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

export type ProjectTone = "obsidian" | "lilac" | "iris"

export type Project = {
  slug: string
  index: string
  /** Presentation category: integrated digital ecosystem vs digital product. */
  kind: "integrated" | "platform"
  /** Messages namespace holding localized project copy (title, intro, sector…). */
  ns: "projects.corazon" | "projects.barber"
  /** Client name. Confirmed for Corazón; placeholder for Barber. */
  client: string
  clientKnown: boolean
  /** Location. Confirmed for Corazón. */
  location: string
  locationKnown: boolean
  /** Live project URL, if available. */
  url?: string
  /** Year — leave unset while unknown. */
  year?: string
  yearKnown: boolean
  /** Services involved, shown on the homepage — localized via `services` namespace. */
  services: ProjectService[]
  cover: {
    tone: ProjectTone
    /** True once real project imagery is mounted; else the placeholder surface is used. */
    hasRealImage: boolean
  }
  /**
   * Confirmed measurable business result. ONLY approved metrics go here.
   * Corazón: +20% revenue (approved by the client). Barber: none yet.
   */
  result?: {
    amountKey: string
    noteKey: string
  }
  /**
   * Case study content, prepared for the future /work/[slug] route.
   * All copy lives in messages under the project namespace.
   */
  sections: {
    context: { headingKey: string; bodyKey: string }
    approach: { headingKey: string; stepsKey: string }
    result: { headingKey: string; bodyKey: string }
  }
}

export const projects: Project[] = [
  {
    slug: "corazon-napoletano",
    index: "01",
    kind: "integrated",
    ns: "projects.corazon",
    client: "Corazón Napoletano",
    clientKnown: true,
    location: "Las Palmas, Gran Canaria",
    locationKnown: true,
    url: "https://www.corazonnapoletano.com/",
    yearKnown: false,
    services: [
      "web-development",
      "digital-menu",
      "paid-media",
      "content",
      "strategy",
    ],
    cover: {
      tone: "obsidian",
      hasRealImage: false,
    },
    result: {
      amountKey: "resultAmount",
      noteKey: "resultNote",
    },
    sections: {
      context: { headingKey: "context.heading", bodyKey: "context.body" },
      approach: { headingKey: "approach.heading", stepsKey: "approach.steps" },
      result: { headingKey: "result.heading", bodyKey: "result.body" },
    },
  },
  {
    slug: "barber-booking",
    index: "02",
    kind: "platform",
    ns: "projects.barber",
    client: "",
    clientKnown: false,
    location: "",
    locationKnown: false,
    yearKnown: false,
    services: ["ux", "product-design", "web-app", "development"],
    cover: {
      tone: "iris",
      hasRealImage: false,
    },
    sections: {
      context: { headingKey: "context.heading", bodyKey: "context.body" },
      approach: { headingKey: "approach.heading", stepsKey: "approach.steps" },
      result: { headingKey: "result.heading", bodyKey: "result.body" },
    },
  },
]