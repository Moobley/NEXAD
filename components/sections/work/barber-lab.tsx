import { getTranslations } from "next-intl/server"

import { SectionDivider } from "@/components/ui/section-divider"
import { ProjectNext } from "@/components/ui/project-next"
import { BarberHero } from "@/components/sections/work/barber-hero"
import { BarberProblem } from "@/components/sections/work/barber-problem"
import { BarberSides } from "@/components/sections/work/barber-sides"
import { BarberCustomer } from "@/components/sections/work/barber-customer"
import { BarberStatus } from "@/components/sections/work/barber-status"

export async function BarberLab() {
  const t = await getTranslations("projects.barber.lab.next")
  const tw = await getTranslations("workPage")

  return (
    <>
      <BarberHero />
      <SectionDivider />
      <BarberProblem />
      <SectionDivider />
      <BarberSides />
      <SectionDivider />
      <BarberCustomer />
      <SectionDivider />
      <BarberStatus />
      <ProjectNext
        label={t("label")}
        title={t("title")}
        cta={t("cta")}
        href="/work/corazon-napoletano"
        backLabel={tw("back")}
      />
    </>
  )
}
