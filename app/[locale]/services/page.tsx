import { setRequestLocale } from "next-intl/server"

import { SectionDivider } from "@/components/ui/section-divider"
import { ServicesHero } from "@/components/sections/services/services-hero"
import { ServicesPrinciple } from "@/components/sections/services/services-principle"
import { ServicesCapabilities } from "@/components/sections/services/services-capabilities"
import { ServicesSystem } from "@/components/sections/services/services-system"
import { ServicesCollaboration } from "@/components/sections/services/services-collaboration"
import { ServicesProcess } from "@/components/sections/services/services-process"
import { ServicesCta } from "@/components/sections/services/services-cta"

type Props = {
  params: Promise<{ locale: string }>
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <ServicesHero />
      <SectionDivider />
      <ServicesPrinciple />
      <SectionDivider />
      <ServicesCapabilities />
      <SectionDivider />
      <ServicesSystem />
      <SectionDivider />
      <ServicesCollaboration />
      <SectionDivider />
      <ServicesProcess />
      <SectionDivider />
      <ServicesCta />
    </>
  )
}