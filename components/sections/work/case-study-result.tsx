import { getTranslations } from "next-intl/server"

import { Reveal } from "@/components/ui/reveal"
import { corazonMetricGroups, type CorazonMetricKey } from "@/content/projects"

type MetricCopy = {
  value: string
  label: string
  description?: string
}

function FeaturedMetric({ value, label, description }: MetricCopy) {
  return (
    <div className="border-t border-obsidian/10 pt-4">
      <p className="font-sans text-[clamp(2.5rem,5vw,5rem)] font-medium leading-[0.95] tracking-[-0.03em] text-foreground">
        {value}
      </p>
      <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
        {label}
      </p>
      {description ? (
        <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  )
}

function SecondaryMetric({ value, label, description }: MetricCopy) {
  return (
    <div className="border-t border-obsidian/10 pt-3">
      <p className="font-sans text-2xl font-medium leading-none tracking-[-0.02em] text-foreground md:text-3xl">
        {value}
      </p>
      <p className="mt-2 font-mono text-[11px] uppercase leading-[1.4] tracking-[0.16em] text-muted-foreground">
        {label}
      </p>
      {description ? (
        <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  )
}

export async function CaseStudyResult() {
  const t = await getTranslations("projects.corazon.caseStudy.result")
  const tm = await getTranslations("projects.corazon.caseStudy.metrics")

  const metric = (key: CorazonMetricKey): MetricCopy => ({
    value: tm(`${key}.value`),
    label: tm(`${key}.label`),
    description: tm.has(`${key}.description`)
      ? tm(`${key}.description`)
      : undefined,
  })

  return (
    <section>
      <div className="mx-auto w-full max-w-[1600px] px-6 pt-14 pb-10 md:px-10 md:py-32">
        <Reveal>
          <p className="text-center font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            {t("eyebrow")}
          </p>
        </Reveal>

        <div className="mt-8 space-y-16 md:mt-20 md:space-y-32">
          {corazonMetricGroups.map((group, gi) => (
            <Reveal key={group.id} delay={gi * 60}>
              <div>
                <h2 className="font-sans text-xl font-medium tracking-tight md:text-2xl">
                  {t(`groups.${group.id}.title`)}
                </h2>
                {t.has(`groups.${group.id}.description`) ? (
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                    {t(`groups.${group.id}.description`)}
                  </p>
                ) : null}
              </div>

              {group.featured.length > 0 ? (
                <div
                  className={
                    group.featured.length >= 2
                      ? "mt-6 grid gap-8 sm:grid-cols-2"
                      : "mt-6"
                  }
                >
                  {group.featured.map((key) => (
                    <FeaturedMetric key={key} {...metric(key)} />
                  ))}
                </div>
              ) : null}

              {group.metrics.length > 0 ? (
                <div
                  className={
                    group.metrics.length <= 2
                      ? "mt-8 grid grid-cols-2 gap-6"
                      : "mt-8 grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8"
                  }
                >
                  {group.metrics.map((key) => (
                    <SecondaryMetric key={key} {...metric(key)} />
                  ))}
                </div>
              ) : null}

              {group.breakdown && group.breakdown.length > 0 ? (
                <div className="mt-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    {t(`groups.${group.id}.breakdownLabel`)}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-5">
                    {group.breakdown.map((key, i) => {
                      const m = metric(key)
                      return (
                        <div key={key} className="flex items-center gap-x-4">
                          {i > 0 ? (
                            <span
                              aria-hidden="true"
                              className="font-mono text-xl text-muted-foreground"
                            >
                              +
                            </span>
                          ) : null}
                          <div>
                            <span className="font-sans text-2xl font-medium tracking-[-0.02em] text-foreground md:text-3xl">
                              {m.value}
                            </span>
                            <span className="ml-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                              {m.label}
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ) : null}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
