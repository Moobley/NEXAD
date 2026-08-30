import { setRequestLocale } from "next-intl/server"

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