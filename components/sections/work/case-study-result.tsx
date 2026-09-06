import { getTranslations } from "next-intl/server"

import { Reveal } from "@/components/ui/reveal"
import {
  CORAZON_PLAN_NAME,
  corazonMetricGroups,
  type CorazonMetricKey,
} from "@/content/projects"

type MetricCopy = {
  value: string
  label: string
}

function AreaMetric({ value, label }: MetricCopy) {
  return (
    <div className="border-t border-obsidian/10 pt-4">
      <p className="font-sans text-[clamp(2.5rem,5vw,4rem)] font-medium leading-[0.95] tracking-[-0.03em] text-foreground">
        {value}
      </p>
      <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
        {label}
      </p>
    </div>
  )
}

export async function CaseStudyResult() {
  const t = await getTranslations("projects.corazon.caseStudy.result")
  const tm = await getTranslations("projects.corazon.caseStudy.metrics")

  const metric = (key: CorazonMetricKey): MetricCopy => ({
    value: tm(`${key}.value`),
    label: tm(`${key}.label`),
  })

  const main = metric("weeklyRevenue")

  return (
    <section>
      <div className="mx-auto w-full max-w-[1600px] px-6 pt-14 pb-10 md:px-10 md:py-32">
        <Reveal>
          <div className="text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              {t("eyebrow")}
            </p>
            <p className="mt-6 font-sans text-[clamp(4rem,8.4vw,7rem)] font-medium leading-none tracking-[-0.04em] text-foreground">
              {main.value}
            </p>
            <p className="mt-4 font-sans text-2xl font-medium tracking-tight md:text-3xl">
              {main.label}
            </p>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {t("planLine", { plan: CORAZON_PLAN_NAME })}
            </p>
          </div>
        </Reveal>

        <Reveal>
          <h2 className="mt-20 font-sans text-2xl font-medium tracking-tight md:mt-28 md:text-3xl">
            {t("areasTitle")}
          </h2>
        </Reveal>

        <div className="mt-8 space-y-16 md:mt-12 md:space-y-20">
          {corazonMetricGroups.map((group, gi) => (
            <Reveal key={group.id} delay={gi * 60}>
              <div className="grid gap-4 md:grid-cols-[auto_1fr] md:gap-12">
                <p className="font-mono text-sm text-muted-foreground">
                  {String(gi + 1).padStart(2, "0")}
                </p>
                <div>
                  <h3 className="font-sans text-xl font-medium tracking-tight md:text-2xl">
                    {t(`groups.${group.id}.title`)}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                    {t(`groups.${group.id}.description`)}
                  </p>

                  {group.metric ? (
                    <div className="mt-6">
                      <AreaMetric {...metric(group.metric)} />
                    </div>
                  ) : null}

                  {group.breakdown && group.breakdown.length > 0 ? (
                    <div className="mt-5">
                      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                        {t(`groups.${group.id}.breakdownLabel`)}
                      </p>
                      <p className="mt-2 font-mono text-sm text-muted-foreground">
                        {group.breakdown.map((key, i) => {
                          const m = metric(key)
                          return (
                            <span key={key}>
                              {i > 0 ? " · " : null}
                              {m.value} {m.label}
                            </span>
                          )
                        })}
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
