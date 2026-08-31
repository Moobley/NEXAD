import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { routing } from "@/i18n/routing"
import { pageMetadata } from "@/lib/seo"
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) return {}

  const ns =
    project.type === "client" ? "seo.projects.corazon" : "seo.projects.barber"
  const t = await getTranslations({ locale, namespace: ns })

  return pageMetadata({
    locale,
    path: `/work/${slug}`,
    title: t("title"),
    description: t("description"),
  })
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