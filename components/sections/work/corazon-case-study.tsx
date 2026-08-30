import { SectionDivider } from "@/components/ui/section-divider"
import { CaseStudyHero } from "@/components/sections/work/case-study-hero"
import { CaseStudySystem } from "@/components/sections/work/case-study-system"
import { CaseStudyIdentity } from "@/components/sections/work/case-study-identity"
import { CaseStudyContent } from "@/components/sections/work/case-study-content"
import { CaseStudyMenu } from "@/components/sections/work/case-study-menu"
import { CaseStudyQr } from "@/components/sections/work/case-study-qr"
import { CaseStudyWebsite } from "@/components/sections/work/case-study-website"
import { CaseStudyResult } from "@/components/sections/work/case-study-result"

export async function CorazonCaseStudy() {
  return (
    <>
      <CaseStudyHero />
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
      <CaseStudyResult />
    </>
  )
}