import { getTranslations } from "next-intl/server"

import { ProjectNext } from "@/components/ui/project-next"
import { CaseStudyHero } from "@/components/sections/work/case-study-hero"
import { CaseStudyResult } from "@/components/sections/work/case-study-result"
import { CaseStudyWhat } from "@/components/sections/work/case-study-what"
import { CaseStudyMethod } from "@/components/sections/work/case-study-method"
import { CaseStudyConclusion } from "@/components/sections/work/case-study-conclusion"

export async function CorazonCaseStudy() {
  const t = await getTranslations("projects.corazon.caseStudy.next")
  const tw = await getTranslations("workPage")

  return (
    <>
      <CaseStudyHero />
      <CaseStudyResult />
      <CaseStudyWhat />
      <CaseStudyMethod />
      <CaseStudyConclusion />
      <ProjectNext
        label={t("label")}
        title={t("title")}
        cta={t("cta")}
        href="/work/barber-booking"
        backLabel={tw("back")}
      />
    </>
  )
}
