import { getTranslations } from "next-intl/server"

import { Reveal } from "@/components/ui/reveal"
import { AuroraBackground } from "@/components/ui/aurora-background"
import { SignalDot } from "@/components/ui/signal-dot"

export async function WorkHero() {
  const t = await getTranslations("workPage.hero")

  return (
    <section className="relative overflow-hidden pt-24 md:pt-28">
      <AuroraBackground intensity="quiet" />
      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 md:px-10">
        <Reveal trigger="load" variant="fade" delay={0}>
          <div className="flex items-center justify-between border-b border-obsidian/10 pb-6">
            <p className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              <SignalDot size="sm" />
              {t("eyebrow")}
            </p>
          </div>
        </Reveal>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 pb-10 pt-8 md:px-10 md:pb-14 md:pt-10">
        <h1 className="max-w-5xl font-sans text-[clamp(2.25rem,4.5vw,4.5rem)] font-medium leading-[1.05] tracking-[-0.03em]">
          <Reveal trigger="load" variant="mask-up" delay={120} as="span" className="block">
            {t("titleLine1")}
          </Reveal>
          <Reveal trigger="load" variant="mask-up" delay={260} as="span" className="block">
            {t("titleLine2Prefix")}
            <em className="font-serif italic">{t("titleLine2Accent")}</em>
          </Reveal>
        </h1>

        <Reveal trigger="load" variant="fade-up" delay={380}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {t("support")}
          </p>
        </Reveal>
      </div>
    </section>
  )
}