import { getTranslations } from "next-intl/server"
import { ArrowRight } from "lucide-react"

import { Link } from "@/i18n/navigation"
import { Reveal } from "@/components/ui/reveal"
import { CaseMedia } from "@/components/ui/case-media"
import { ScheduleUi } from "@/components/sections/work/ui-fragments"

export async function WorkLabProject() {
  const t = await getTranslations("projects.barber")

  return (
    <section>
      <div className="mx-auto w-full max-w-[1600px] px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <Reveal delay={120}>
              <Link href="/work/barber-booking" className="group block">
                <CaseMedia
                  label={`${t("title")} · ${t("category")}`}
                  tone="dark"
                  className="aspect-[4/3]"
                >
                  <ScheduleUi />
                </CaseMedia>
              </Link>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                  {t("clientLabel")}
                </p>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/70">
                  {t("status")}
                </p>
                <h2 className="mt-4 font-sans text-4xl font-medium tracking-tight md:text-6xl">
                  {t("title")}
                </h2>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  {t("category")}
                </p>
                <p className="mt-10 font-sans text-2xl font-medium leading-snug tracking-tight md:text-3xl">
                  {t("headline")}
                </p>
                <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
                  {t("support")}
                </p>
                <Link href="/work/barber-booking" className="cta-primary mt-10">
                  {t("cta")}
                  <ArrowRight className="arrow size-4" strokeWidth={1.5} />
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}