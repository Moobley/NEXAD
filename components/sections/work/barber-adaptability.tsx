import { getTranslations } from "next-intl/server"

import { Reveal } from "@/components/ui/reveal"

export async function BarberAdaptability() {
  const t = await getTranslations("projects.barber.lab.adaptability")

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
                {t("headingPrefix")}
                <em className="font-serif italic">{t("headingAccent")}</em>
              </h2>
            </Reveal>
            <Reveal variant="fade-up" delay={140}>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground">
                {t("body")}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}