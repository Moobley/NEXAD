import { getTranslations } from "next-intl/server"

import { Link } from "@/i18n/navigation"
import { Reveal } from "@/components/ui/reveal"
import { GrowthSystemVisual } from "@/components/sections/home/growth-system-visual"
import { ProofMarquee } from "@/components/sections/home/proof-marquee"
import { ForwardMark } from "@/components/ui/forward-mark"
import { AuroraBackground } from "@/components/ui/aurora-background"

export async function Hero() {
  const t = await getTranslations("home.hero")

  return (
    <section className="relative flex min-h-svh flex-col overflow-hidden pt-16 md:pt-20">
      <AuroraBackground intensity="soft" />
      <div
        aria-hidden
        className="noise pointer-events-none absolute inset-0 z-0 opacity-25"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[max(2.5rem,calc((100vw-1600px)/2+2.5rem))] top-[10rem] z-10 hidden w-[400px] md:block lg:w-[520px]"
      >
        <Reveal variant="fade" trigger="load" delay={360}>
          <GrowthSystemVisual />
        </Reveal>
      </div>

      <ProofMarquee />

      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-center px-6 pb-10 md:px-10 md:pb-14 md:justify-start">
        {/* Controlled vertical offset instead of bottom-anchoring: the claim's first
            line lands around 50% of the viewport on desktop (negative space
            above and below), while the second constraint keeps it clear of
            the cookie banner on shorter screens. */}
        <h1 className="max-w-6xl font-sans text-[clamp(2.5rem,6.8vw,5.75rem)] font-medium leading-[0.95] tracking-[-0.03em] md:mt-[clamp(6rem,min(calc(50vh_-_11rem),calc(100vh_-_33rem)),32rem)]">
          <Reveal trigger="load" variant="mask-up" delay={120} as="span" className="block text-balance">
            {t("titleLine1")}
          </Reveal>
          <Reveal trigger="load" variant="mask-up" delay={260} as="span" className="block text-balance text-muted-foreground">
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