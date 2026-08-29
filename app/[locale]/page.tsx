import { setRequestLocale } from "next-intl/server"

import { Hero } from "@/components/sections/home/hero"
import { Corazon } from "@/components/sections/home/corazon"
import { Capabilities } from "@/components/sections/home/capabilities"
import { Positioning } from "@/components/sections/home/positioning"
import { Technology } from "@/components/sections/home/technology"
import { Process } from "@/components/sections/home/process"
import { GranCanaria } from "@/components/sections/home/gran-canaria"
import { FinalCta } from "@/components/sections/home/final-cta"

type Props = {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <Hero />
      <Corazon />
      <Capabilities />
      <Positioning />
      <Technology />
      <Process />
      <GranCanaria />
      <FinalCta />
    </>
  )
}