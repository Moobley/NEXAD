import { getTranslations } from "next-intl/server"

import { Reveal } from "@/components/ui/reveal"

export async function CaseStudyConclusion() {
  const t = await getTranslations("projects.corazon.caseStudy.result")

  return (
    <section>
      <div className="mx-auto w-full max-w-[1600px] px-6 pt-6 pb-16 md:px-10 md:py-28">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal>
              <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
                {t("body")}
              </p>
              <p className="mt-6 font-serif text-2xl italic leading-snug text-foreground md:text-3xl">
                {t("statement")}
              </p>
              <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                {t("note")}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
