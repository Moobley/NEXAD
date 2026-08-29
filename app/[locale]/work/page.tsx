import { getTranslations, setRequestLocale } from "next-intl/server"

import { PagePlaceholder } from "@/components/layout/page-placeholder"

type Props = {
  params: Promise<{ locale: string }>
}

export default async function WorkPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations("workPage")
  const tp = await getTranslations("pages")
  const tn = await getTranslations("nav")

  return (
    <PagePlaceholder
      eyebrow={tn("work")}
      title={t("title")}
      body={t("body")}
      backLabel={tp("back")}
    />
  )
}