import { getTranslations } from "next-intl/server"

import { Reveal } from "@/components/ui/reveal"

export async function CaseStudyContext() {
  const t = await getTranslations("projects.corazon.caseStudy.context")

  return (
    <section>
      <div className="mx-auto w-full max-w-[1600px] px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                {t("eyebrow")}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal variant="mask-up">
              <h2 className="font-sans text-[clamp(2rem,4.5vw,3.75rem)] font-medium leading-[1.02] tracking-[-0.02em]">
                {t("heading")}
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-8 md:grid-cols-2">
              <Reveal variant="fade-up" delay={120}>
                <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
                  {t("body")}
                </p>
              </Reveal>
              <Reveal variant="fade-up" delay={180}>
                <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
                  {t("body2")}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}