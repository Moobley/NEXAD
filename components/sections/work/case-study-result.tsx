import { getTranslations } from "next-intl/server"

import { Reveal } from "@/components/ui/reveal"
import { corazonMetrics } from "@/content/projects"

export async function CaseStudyResult() {
  const t = await getTranslations("projects.corazon.caseStudy.result")
  const tm = await getTranslations("projects.corazon.caseStudy.metrics")

  const published = corazonMetrics.filter((metric) => metric.value != null)

  return (
    <div className="surface-obsidian">
      <div
        aria-hidden
        className="h-14 w-full bg-gradient-to-b from-ivory to-transparent md:h-24"
      />

      <div className="mx-auto w-full max-w-[1600px] px-6 py-24 md:px-10 md:py-40">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            {t("eyebrow")}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
              {published.map((metric, i) => (
                <Reveal key={metric.key} delay={i * 100}>
                  <div className="border-t border-border pt-6">
                    <p className="font-sans text-[clamp(3rem,8vw,6rem)] font-medium leading-none tracking-[-0.03em] text-foreground">
                      {metric.value}
                    </p>
                    <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                      {tm(`${metric.key}.label`)}
                    </p>
                    {tm.has(`${metric.key}.description`) ? (
                      <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
                        {tm(`${metric.key}.description`)}
                      </p>
                    ) : null}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <Reveal variant="fade-up" delay={100}>
              <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
                {t("body")}
              </p>
              <p className="mt-8 max-w-xl border-t border-border pt-6 font-serif text-xl italic leading-snug text-foreground md:text-2xl">
                {t("statement")}
              </p>
              <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                {t("note")}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  )
}
