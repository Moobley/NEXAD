import { getTranslations } from "next-intl/server"

import { SectionDivider } from "@/components/ui/section-divider"
import { ProjectNext } from "@/components/ui/project-next"
import { CaseStudyHero } from "@/components/sections/work/case-study-hero"
import { CaseStudyContext } from "@/components/sections/work/case-study-context"
import { CaseStudySystem } from "@/components/sections/work/case-study-system"
import { CaseStudyIdentity } from "@/components/sections/work/case-study-identity"
import { CaseStudyContent } from "@/components/sections/work/case-study-content"
import { CaseStudyMenu } from "@/components/sections/work/case-study-menu"
import { CaseStudyQr } from "@/components/sections/work/case-study-qr"
import { CaseStudyWebsite } from "@/components/sections/work/case-study-website"
import { CaseStudyAcquisition } from "@/components/sections/work/case-study-acquisition"
import { CaseStudyResult } from "@/components/sections/work/case-study-result"

export async function CorazonCaseStudy() {
  const t = await getTranslations("projects.corazon.caseStudy.next")
  const tw = await getTranslations("workPage")

  return (
    <>
      <CaseStudyHero />
      <SectionDivider />
      <CaseStudyContext />
      <SectionDivider />
      <CaseStudySystem />
      <SectionDivider />
      <CaseStudyIdentity />
      <SectionDivider />
      <CaseStudyContent />
      <SectionDivider />
      <CaseStudyMenu />
      <CaseStudyQr />
      <SectionDivider />
      <CaseStudyWebsite />
      <SectionDivider />
      <CaseStudyAcquisition />
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