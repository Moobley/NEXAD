import { getTranslations } from "next-intl/server"

import { Link } from "@/i18n/navigation"
import { Reveal } from "@/components/ui/reveal"
import { AuroraBackground } from "@/components/ui/aurora-background"
import { ForwardMark } from "@/components/ui/forward-mark"
import { SignalDot } from "@/components/ui/signal-dot"

export async function Hero() {
  const t = await getTranslations("home.hero")

  return (
    <section className="relative flex min-h-svh flex-col overflow-hidden pt-24 md:pt-28">
      <AuroraBackground />
      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 md:px-10">
        <Reveal trigger="load" variant="fade" delay={0}>
          <div className="flex items-center justify-between border-b border-obsidian/10 pb-6">
            <p className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              <SignalDot size="sm" />
              {t("meta")}
            </p>
            <p className="hidden font-mono text-[11px] tracking-[0.25em] text-muted-foreground sm:block">
              {t("coords")}
            </p>
          </div>
        </Reveal>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-center px-6 pb-10 md:px-10 md:pb-14 md:justify-end">
        <h1 className="max-w-6xl font-sans text-[clamp(2.5rem,6.8vw,5.75rem)] font-medium leading-[1.02] tracking-[-0.03em]">
          <Reveal trigger="load" variant="mask-up" delay={120} as="span" className="block">
            {t("titleLine1")}
          </Reveal>
          <Reveal trigger="load" variant="mask-up" delay={260} as="span" className="block text-muted-foreground">
            {t("titleLine2")}
          </Reveal>
        </h1>

        <div className="mt-12 flex flex-col gap-10 md:mt-16 md:flex-row md:items-end md:justify-between">
          <Reveal trigger="load" variant="fade-up" delay={420}>
            <p className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
              {t("support")}
            </p>
          </Reveal>
          <Reveal trigger="load" variant="fade-up" delay={520}>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <Link href="/contact" className="cta-primary">
                {t("ctaPrimary")}
                <ForwardMark className="cta-forward" />
              </Link>
              <Link href="/work" className="cta-secondary">
                {t("ctaSecondary")}
                <ForwardMark className="cta-forward" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}