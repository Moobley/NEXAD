import { setRequestLocale } from "next-intl/server"

import { SectionDivider } from "@/components/ui/section-divider"
import { StudioHero } from "@/components/sections/studio/studio-hero"
import { StudioWhy } from "@/components/sections/studio/studio-why"
import { StudioTeam } from "@/components/sections/studio/studio-team"
import { StudioPrinciples } from "@/components/sections/studio/studio-principles"
import { StudioNetwork } from "@/components/sections/studio/studio-network"
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
      <StudioWhy />
      <SectionDivider />
      <StudioTeam />
      <SectionDivider />
      <StudioPrinciples />
      <SectionDivider />
      <StudioNetwork />
      <SectionDivider />
      <StudioCta />
    </>
  )
}