import { setRequestLocale } from "next-intl/server"

import { SectionDivider } from "@/components/ui/section-divider"
import { ContactHero } from "@/components/sections/contact/contact-hero"
import { ContactFormSection } from "@/components/sections/contact/contact-form-section"

type Props = {
  params: Promise<{ locale: string }>
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <ContactHero />
      <SectionDivider />
      <ContactFormSection />
    </>
  )
}