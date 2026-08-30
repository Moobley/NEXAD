import { getTranslations } from "next-intl/server"

import { Reveal } from "@/components/ui/reveal"
import { CaseMedia } from "@/components/ui/case-media"
import { BookingFlowUi } from "@/components/sections/work/ui-fragments"

export async function BarberCustomer() {
  const t = await getTranslations("projects.barber.lab.customer")
  const ts = await getTranslations("projects.barber.lab.sides")
  const features = t.raw("features") as string[]
  const customer = ts.raw("customer") as { flow: string[] }

  return (
    <section>
      <div className="mx-auto w-full max-w-[1600px] px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                {t("eyebrow")}
              </p>
              <h2 className="mt-3 font-sans text-4xl font-medium tracking-tight md:text-6xl">
                {t("heading")}
              </h2>
              <ol className="mt-8 space-y-3">
                {features.map((feature, i) => (
                  <li
                    key={feature}
                    className="flex gap-4 font-mono text-xs tracking-[0.04em] text-foreground/80"
                  >
                    <span className="text-muted-foreground">0{i + 1}</span>
                    {feature}
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={120}>
              <CaseMedia label={t("eyebrow")} tone="light" className="aspect-[4/3]">
                <BookingFlowUi labels={customer.flow} />
              </CaseMedia>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}