import { getTranslations } from "next-intl/server"

import { PagePlaceholder } from "@/components/layout/page-placeholder"

export default async function NotFoundPage() {
  const t = await getTranslations("notFound")
  const tp = await getTranslations("pages")

  return (
    <PagePlaceholder
      eyebrow="404"
      title={t("title")}
      body={t("body")}
      backLabel={tp("back")}
    />
  )
}