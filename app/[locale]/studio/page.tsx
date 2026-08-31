import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { pageMetadata } from "@/lib/seo"
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "seo.studio" })

  return pageMetadata({
    locale,
    path: "/studio",
    title: t("title"),
    description: t("description"),
  })
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