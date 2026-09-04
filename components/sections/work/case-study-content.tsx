import { getTranslations } from "next-intl/server"

import { Reveal } from "@/components/ui/reveal"
import { CaseMedia } from "@/components/ui/case-media"

export async function CaseStudyContent() {
  const t = await getTranslations("projects.corazon.caseStudy.content")
  const frames = t.raw("frames") as string[]

  return (
    <section>
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
            <div className="grid gap-6 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-7">
                <Reveal delay={100}>
                  <CaseMedia
                    label={frames[0]}
                    tone="light"
                    watermark={frames[0]}
                    className="aspect-[16/11]"
                  />
                </Reveal>
              </div>
              <div className="flex flex-col gap-6 md:col-span-5 md:gap-8">
                <Reveal delay={160}>
                  <CaseMedia
                    label={frames[1]}
                    tone="light"
                    watermark={frames[1]}
                    className="aspect-[4/5]"
                  />
                </Reveal>
                <Reveal delay={220}>
                  <CaseMedia
                    label={frames[2]}
                    tone="light"
                    watermark={frames[2]}
                    className="aspect-[4/5]"
                  />
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
