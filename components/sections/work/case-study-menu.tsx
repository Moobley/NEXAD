import { getTranslations } from "next-intl/server"

import { Reveal } from "@/components/ui/reveal"
import { CaseMedia } from "@/components/ui/case-media"

export async function CaseStudyMenu() {
  const t = await getTranslations("projects.corazon.caseStudy.menu")

  return (
    <section>
      <div className="mx-auto w-full max-w-[1600px] px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Reveal>
              <h2 className="font-sans text-4xl font-medium tracking-tight md:text-6xl">
                {t("heading")}
              </h2>
              <p className="mt-8 max-w-sm text-base leading-relaxed text-muted-foreground">
                {t("body")}
              </p>
              <p className="mt-8 max-w-sm font-serif text-xl italic leading-snug md:text-2xl">
                {t("principle")}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal delay={100}>
              <CaseMedia
                label={t("mediaLabel")}
                tone="light"
                watermark={t("watermark")}
                className="aspect-[4/3]"
              />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}