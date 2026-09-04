import { assetUrl, siteUrl } from "@/lib/seo"

export const dynamic = "force-static"

const KEY_PAGES: Array<[string, string]> = [
  ["Home (English)", siteUrl("/en/")],
  ["Services", siteUrl("/services/")],
  ["Work", siteUrl("/work/")],
  ["Studio", siteUrl("/studio/")],
  ["Contact", siteUrl("/contact/")],
  ["Case study — Corazón Napoletano", siteUrl("/work/corazon-napoletano/")],
  ["NEXAD Lab — Barber Booking", siteUrl("/work/barber-booking/")],
]

export function GET(): Response {
  const body = [
    "# NEXAD",
    "",
    "> Growth, engineered. A digital studio in Las Palmas de Gran Canaria where strategy, marketing, content, product and software work as one growth system.",
    "",
    "## Key facts",
    "- Name: NEXAD",
    "- Positioning: Growth, engineered.",
    "- Location: Las Palmas de Gran Canaria, Canarias, Spain",
    "- Core team: Alessandro (Marketing & Brand), Lorenzo (Technology & Product), plus a network of specialists",
    "- Engagement: one-off projects and ongoing collaborations (retainers)",
    "",
    "## Services",
    "- Digital Strategy: positioning, digital planning, customer journey, channel strategy and business objectives",
    "- Paid Media & Growth: advertising strategy and campaign management on Meta Ads and Google Ads, with continuous optimization",
    "- Social & Content: content strategy, social management, production and communication",
    "- Web & Digital Experiences: web design and development focused on brand, experience, conversion and performance",
    "- Custom Software & Automation: web applications, management systems, booking systems and tailored digital tools",
    "",
    "## Work",
    "- Corazón Napoletano — Client Work (Las Palmas · Gran Canaria): brand identity, content, menu and upselling, QR, website, content production, reels and Meta/Google Ads for a new restaurant opening. Project-specific result: +20% revenue from the month following the launch.",
    "- Barber Booking — NEXAD Lab: a booking platform for barbershops in development (services, professionals, availability, schedule, customers and data)",
    "",
    "## Important pages",
    ...KEY_PAGES.map(([label, url]) => `- [${label}](${url})`),
    `- [Sitemap](${assetUrl("/sitemap.xml")})`,
    "",
  ].join("\n")

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}