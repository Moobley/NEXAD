import { getTranslations, setRequestLocale } from "next-intl/server"

import { PagePlaceholder } from "@/components/layout/page-placeholder"

type Props = {
  params: Promise<{ locale: string }>
}

export default async function StudioPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations("studioPage")
  const tp = await getTranslations("pages")
  const tn = await getTranslations("nav")

  return (
    <PagePlaceholder
      eyebrow={tn("studio")}
      title={t("title")}
      body={t("body")}
      backLabel={tp("back")}
    />
  )
}