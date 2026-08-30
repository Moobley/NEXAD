import { setRequestLocale } from "next-intl/server"

import { SectionDivider } from "@/components/ui/section-divider"
import { WorkHero } from "@/components/sections/work/work-hero"
import { WorkClientProject } from "@/components/sections/work/work-client-project"
import { WorkLabProject } from "@/components/sections/work/work-lab-project"

type Props = {
  params: Promise<{ locale: string }>
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