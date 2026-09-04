import { getTranslations } from "next-intl/server"

import { SectionDivider } from "@/components/ui/section-divider"
import { ProjectNext } from "@/components/ui/project-next"
import { CaseStudyHero } from "@/components/sections/work/case-study-hero"
import { CaseStudyFacts } from "@/components/sections/work/case-study-facts"
import { CaseStudyApproach } from "@/components/sections/work/case-study-approach"
import { CaseStudyIdentity } from "@/components/sections/work/case-study-identity"
import { CaseStudyContent } from "@/components/sections/work/case-study-content"
import { CaseStudyExperience } from "@/components/sections/work/case-study-experience"
import { CaseStudyDigital } from "@/components/sections/work/case-study-digital"
import { CaseStudyResult } from "@/components/sections/work/case-study-result"

export async function CorazonCaseStudy() {
  const t = await getTranslations("projects.corazon.caseStudy.next")
  const tw = await getTranslations("workPage")

  return (
    <>
      <CaseStudyHero />
      <CaseStudyFacts />
      <SectionDivider />
      <CaseStudyApproach />
      <SectionDivider />
      <CaseStudyIdentity />
      <SectionDivider />
      <CaseStudyContent />
      <SectionDivider />
      <CaseStudyExperience />
      <SectionDivider />
      <CaseStudyDigital />
      <CaseStudyResult />
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
