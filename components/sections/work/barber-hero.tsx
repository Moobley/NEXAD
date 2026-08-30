import { getTranslations } from "next-intl/server"

import { Reveal } from "@/components/ui/reveal"
import { AuroraBackground } from "@/components/ui/aurora-background"

export async function BarberHero() {
  const t = await getTranslations("projects.barber.lab.hero")
  const tb = await getTranslations("projects.barber")

  return (
    <section className="relative flex min-h-svh flex-col overflow-hidden pt-24 md:pt-28">
      <AuroraBackground />
      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 md:px-10">
        <Reveal trigger="load" variant="fade" delay={0}>
          <div className="flex items-center justify-between border-b border-obsidian/10 pb-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              {tb("clientLabel")}
            </p>
            <p className="hidden font-mono text-[11px] tracking-[0.25em] text-muted-foreground sm:block">
              {t("status")}
            </p>
          </div>
        </Reveal>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-center px-6 pb-10 md:justify-end md:px-10 md:pb-14">
        <h1 className="max-w-6xl font-sans text-[clamp(2.5rem,6.8vw,5.75rem)] font-medium leading-[1.02] tracking-[-0.03em]">
          <Reveal trigger="load" variant="mask-up" delay={120} as="span" className="block">
            {t("titleLine1")}
          </Reveal>
          <Reveal trigger="load" variant="mask-up" delay={260} as="span" className="block">
            <em className="font-serif italic">{t("titleLine2")}</em>
          </Reveal>
        </h1>

        <div className="mt-12 md:mt-16">
          <Reveal trigger="load" variant="fade-up" delay={420}>
            <p className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
              {t("support")}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}