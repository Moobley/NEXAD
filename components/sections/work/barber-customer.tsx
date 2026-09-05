import { getTranslations } from "next-intl/server"

import { Reveal } from "@/components/ui/reveal"
import { MobileFrame } from "@/components/ui/mobile-frame"

export async function BarberCustomer() {
  const t = await getTranslations("projects.barber.lab.customer")
  const features = t.raw("features") as string[]
  const steps = t.raw("steps") as string[]

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
                {features.map((feature) => (
                  <li
                    key={feature}
                    className="font-mono text-xs tracking-[0.04em] text-foreground/80"
                  >
                    {feature}
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="flex items-start justify-center gap-4 md:gap-6">
              <Reveal delay={100} className="w-[34%]">
                <MobileFrame
                  src="/projects/barber/customer/service-selection.webp"
                  alt={t("alts.serviceSelection")}
                  sizes="(min-width: 1024px) 20vw, 40vw"
                />
                <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                  01 · {steps[0]}
                </p>
              </Reveal>
              <Reveal delay={180} className="w-[40%]">
                <MobileFrame
                  src="/projects/barber/customer/availability.webp"
                  alt={t("alts.availability")}
                  sizes="(min-width: 1024px) 24vw, 46vw"
                />
                <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                  02 · {steps[1]}
                </p>
              </Reveal>
              <Reveal delay={260} className="w-[34%] lg:mt-12">
                <MobileFrame
                  src="/projects/barber/customer/booking-summary.webp"
                  alt={t("alts.bookingSummary")}
                  sizes="(min-width: 1024px) 20vw, 40vw"
                />
                <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                  03 · {steps[2]}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
