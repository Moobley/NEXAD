import { getTranslations } from "next-intl/server"

import { Link } from "@/i18n/navigation"
import { Reveal } from "@/components/ui/reveal"
import { AuroraBackground } from "@/components/ui/aurora-background"
import { ForwardMark } from "@/components/ui/forward-mark"

export async function ServicesHero() {
  const t = await getTranslations("servicesPage.hero")

  return (
    <section className="relative overflow-hidden pt-24 md:pt-28">
      <AuroraBackground intensity="soft" />
      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 md:px-10">
        <Reveal trigger="load" variant="fade" delay={0}>
          <div className="flex items-center justify-between border-b border-obsidian/10 pb-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              {t("eyebrow")}
            </p>
            <p className="hidden font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground sm:block">
              {t("statement")}
            </p>
          </div>
        </Reveal>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 pb-12 pt-8 md:px-10 md:pb-24 md:pt-16">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-8">
            <h1 className="font-sans text-[clamp(2.5rem,5.5vw,5rem)] font-medium leading-[1.02] tracking-[-0.03em]">
              <Reveal trigger="load" variant="mask-up" delay={120} as="span" className="block">
                {t("titleLine1")}
              </Reveal>
              <Reveal trigger="load" variant="mask-up" delay={260} as="span" className="block">
                {t("titleLine2Prefix")}
                <em className="font-serif italic">{t("titleLine2Accent")}</em>
              </Reveal>
            </h1>
          </div>

          <div className="lg:col-span-4">
            <Reveal trigger="load" variant="fade-up" delay={380}>
              <p className="max-w-sm text-base leading-relaxed text-muted-foreground md:text-lg">
                {t("support")}
              </p>
            </Reveal>
            <Reveal trigger="load" variant="fade-up" delay={480}>
              <Link href="/contact" className="cta-primary mt-8">
                {t("cta")}
                <ForwardMark className="cta-forward" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}