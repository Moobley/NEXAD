import { notFound } from "next/navigation"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { routing } from "@/i18n/routing"
import { PagePlaceholder } from "@/components/layout/page-placeholder"
import { CorazonCaseStudy } from "@/components/sections/work/corazon-case-study"
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

  if (slug === "corazon-napoletano") {
    return <CorazonCaseStudy />
  }

  const t = await getTranslations("workSlug")
  const tn = await getTranslations(project.ns)
  const tp = await getTranslations("pages")

  return (
    <PagePlaceholder
      eyebrow={project.index}
      title={tn("title")}
      body={t("body")}
      backLabel={tp("back")}
    />
  )
}