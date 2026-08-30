import { getTranslations } from "next-intl/server"

import { Reveal } from "@/components/ui/reveal"

export async function CaseStudyResult() {
  const t = await getTranslations("projects.corazon.caseStudy.result")

  return (
    <div className="surface-obsidian">
      <div
        aria-hidden
        className="h-14 w-full bg-gradient-to-b from-ivory to-transparent md:h-24"
      />

      <div className="mx-auto w-full max-w-[1600px] px-6 py-24 md:px-10 md:py-40">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            {t("timing")}
          </p>
        </Reveal>

        <Reveal variant="mask-up" delay={100}>
          <p className="mt-6 font-sans text-[clamp(5rem,16vw,14rem)] font-medium leading-[0.9] tracking-[-0.03em] text-foreground">
            {t("amount")}
          </p>
        </Reveal>

        <Reveal variant="fade-up" delay={200}>
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-5">
              <p className="font-sans text-3xl font-medium tracking-tight text-foreground md:text-4xl">
                {t("label")}
              </p>
            </div>
            <div className="lg:col-span-7">
              <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
                {t("body")}
              </p>
              <p className="mt-8 max-w-xl border-t border-border pt-6 font-serif text-xl italic leading-snug text-foreground md:text-2xl">
                {t("nexo")}
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      <div
        aria-hidden
        className="h-14 w-full bg-gradient-to-b from-transparent to-ivory md:h-24"
      />
    </div>
  )
}