import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { pageMetadata } from "@/lib/seo"
import { SectionDivider } from "@/components/ui/section-divider"
import { ContactHero } from "@/components/sections/contact/contact-hero"
import { ContactFormSection } from "@/components/sections/contact/contact-form-section"

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "seo.contact" })

  return pageMetadata({
    locale,
    path: "/contact",
    title: t("title"),
    description: t("description"),
  })
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