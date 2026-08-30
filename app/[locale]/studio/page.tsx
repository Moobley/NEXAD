import { setRequestLocale } from "next-intl/server"

import { SectionDivider } from "@/components/ui/section-divider"
import { StudioHero } from "@/components/sections/studio/studio-hero"
import { StudioOrigin } from "@/components/sections/studio/studio-origin"
import { StudioMetrics } from "@/components/sections/studio/studio-metrics"
import { StudioApproach } from "@/components/sections/studio/studio-approach"
import { StudioPrinciples } from "@/components/sections/studio/studio-principles"
import { StudioTeam } from "@/components/sections/studio/studio-team"
import { StudioNetwork } from "@/components/sections/studio/studio-network"
import { StudioLocation } from "@/components/sections/studio/studio-location"
import { StudioCta } from "@/components/sections/studio/studio-cta"

type Props = {
  params: Promise<{ locale: string }>
}

export default async function StudioPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <StudioHero />
      <SectionDivider />
      <StudioOrigin />
      <SectionDivider />
      <StudioMetrics />
      <SectionDivider />
      <StudioApproach />
      <SectionDivider />
      <StudioPrinciples />
      <SectionDivider />
      <StudioTeam />
      <SectionDivider />
      <StudioNetwork />
      <SectionDivider />
      <StudioLocation />
      <SectionDivider />
      <StudioCta />
    </>
  )
}