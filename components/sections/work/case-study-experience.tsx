import { getTranslations } from "next-intl/server"

import { Reveal } from "@/components/ui/reveal"
import { CaseMedia } from "@/components/ui/case-media"

export async function CaseStudyExperience() {
  const tm = await getTranslations("projects.corazon.caseStudy.menu")
  const tq = await getTranslations("projects.corazon.caseStudy.qr")

  return (
    <section>
      <div className="mx-auto w-full max-w-[1600px] px-6 py-20 md:px-10 md:py-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Reveal>
              <h2 className="font-sans text-4xl font-medium tracking-tight md:text-6xl">
                {tm("heading")}
              </h2>
              <p className="mt-8 max-w-sm text-base leading-relaxed text-muted-foreground">
                {tm("body")}
              </p>
              <p className="mt-6 max-w-sm text-base leading-relaxed text-muted-foreground">
                {tq("body")}
              </p>
              <p className="mt-8 max-w-sm font-serif text-xl italic leading-snug md:text-2xl">
                {tm("principle")}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal delay={100}>
              <CaseMedia
                label={tm("mediaLabel")}
                tone="light"
                watermark={tm("watermark")}
                className="aspect-[4/3]"
              />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
