import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"

import { routing } from "@/i18n/routing"
import { CorazonCaseStudy } from "@/components/sections/work/corazon-case-study"
import { BarberLab } from "@/components/sections/work/barber-lab"
import { projects } from "@/content/projects"

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug }))
  )
}

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export default async function WorkSlugPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const project = projects.find((p) => p.slug === slug)
  if (!project) {
    notFound()
  }

  if (project.type === "client") {
    return <CorazonCaseStudy />
  }

  return <BarberLab />
}