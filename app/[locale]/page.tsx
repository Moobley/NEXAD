import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { pageMetadata, siteUrl } from "@/lib/seo"
import { Hero } from "@/components/sections/home/hero"
import { Capabilities } from "@/components/sections/home/capabilities"
import { Positioning } from "@/components/sections/home/positioning"
import { Process } from "@/components/sections/home/process"
import { GranCanaria } from "@/components/sections/home/gran-canaria"
import { Corazon } from "@/components/sections/home/corazon"
import { Technology } from "@/components/sections/home/technology"
import { FinalCta } from "@/components/sections/home/final-cta"
import { SectionDivider } from "@/components/ui/section-divider"

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "seo.home" })

  return pageMetadata({
    locale,
    path: "/",
    title: t("title"),
    description: t("description"),
    xDefault: siteUrl("/"),
  })
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <Hero />
      <SectionDivider />
      <Capabilities />
      <SectionDivider />
      <Positioning />
      <SectionDivider />
      <Process />
      <SectionDivider />
      <GranCanaria />
      <Corazon />
      <Technology />
      <SectionDivider />
      <FinalCta />
    </>
  )
}