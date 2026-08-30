import { getTranslations } from "next-intl/server"

import { Reveal } from "@/components/ui/reveal"
import { CaseMedia } from "@/components/ui/case-media"

export async function CaseStudyContent() {
  const t = await getTranslations("projects.corazon.caseStudy.content")
  const tl = await getTranslations("projects.corazon.caseStudy.labels")
  const frames = t.raw("frames") as string[]

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
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 gap-6 md:gap-8">
              <Reveal delay={80}>
                <CaseMedia
                  label={frames[0]}
                  note={tl("mediaNote")}
                  tone="light"
                  className="aspect-[3/4]"
                />
              </Reveal>
              <Reveal delay={160}>
                <CaseMedia
                  label={frames[1]}
                  note={tl("mediaNote")}
                  tone="light"
                  className="aspect-[3/4] mt-10 md:mt-16"
                />
              </Reveal>
              <Reveal delay={240}>
                <CaseMedia
                  label={frames[2]}
                  note={tl("mediaNote")}
                  tone="light"
                  className="aspect-[4/3]"
                />
              </Reveal>
              <Reveal delay={320}>
                <CaseMedia
                  label={frames[3]}
                  note={tl("mediaNote")}
                  tone="light"
                  className="aspect-[4/3]"
                />
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}