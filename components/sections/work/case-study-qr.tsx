import { getTranslations } from "next-intl/server"

import { Reveal } from "@/components/ui/reveal"
import { CaseMedia } from "@/components/ui/case-media"

export async function CaseStudyQr() {
  const t = await getTranslations("projects.corazon.caseStudy.qr")
  const tl = await getTranslations("projects.corazon.caseStudy.labels")

  return (
    <div className="surface-obsidian">
      <div
        aria-hidden
        className="h-14 w-full bg-gradient-to-b from-ivory to-transparent md:h-24"
      />

      <div className="mx-auto w-full max-w-[1600px] px-6 py-20 md:px-10 md:py-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Reveal>
              <h2 className="font-sans text-4xl font-medium tracking-tight md:text-6xl">
                {t("heading")}
              </h2>
              <p className="mt-8 max-w-sm text-base leading-relaxed text-muted-foreground">
                {t("body")}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal delay={100}>
              <CaseMedia
                label={t("placematLabel")}
                note={tl("mediaNote")}
                tone="dark"
                className="aspect-[4/3]"
              />
            </Reveal>
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="h-14 w-full bg-gradient-to-b from-transparent to-ivory md:h-24"
      />
    </div>
  )
}