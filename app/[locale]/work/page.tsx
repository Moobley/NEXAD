import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { pageMetadata } from "@/lib/seo"
import { SectionDivider } from "@/components/ui/section-divider"
import { WorkHero } from "@/components/sections/work/work-hero"
import { WorkClientProject } from "@/components/sections/work/work-client-project"
import { WorkLabProject } from "@/components/sections/work/work-lab-project"

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "seo.work" })

  return pageMetadata({
    locale,
    path: "/work",
    title: t("title"),
    description: t("description"),
  })
}

export default async function WorkPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <WorkHero />
      <SectionDivider />
      <WorkClientProject />
      <SectionDivider />
      <WorkLabProject />
    </>
  )
}