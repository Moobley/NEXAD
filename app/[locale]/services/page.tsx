import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { pageMetadata, servicesSchema } from "@/lib/seo"
import { SectionDivider } from "@/components/ui/section-divider"
import { ServicesHero } from "@/components/sections/services/services-hero"
import { ServicesCapabilities } from "@/components/sections/services/services-capabilities"
import { ServicesSystem } from "@/components/sections/services/services-system"
import { ServicesCollaboration } from "@/components/sections/services/services-collaboration"
import { ServicesCta } from "@/components/sections/services/services-cta"

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "seo.services" })

  return pageMetadata({
    locale,
    path: "/services",
    title: t("title"),
    description: t("description"),
  })
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations("servicesPage.capabilities")
  const capabilities = t.raw("list") as Array<{ title: string; body: string }>
  const schema = servicesSchema(
    locale,
    capabilities.map((capability) => ({
      name: capability.title,
      description: capability.body,
    }))
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <ServicesHero />
      <SectionDivider />
      <ServicesCapabilities />
      <SectionDivider />
      <ServicesSystem />
      <SectionDivider />
      <ServicesCollaboration />
      <SectionDivider />
      <ServicesCta />
    </>
  )
}