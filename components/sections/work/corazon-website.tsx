import { getTranslations } from "next-intl/server"

import { Reveal } from "@/components/ui/reveal"
import { MobileFrame } from "@/components/ui/mobile-frame"

export async function CorazonWebsite() {
  const t = await getTranslations("projects.corazon.caseStudy.website")

  return (
    <section>
      <div className="mx-auto w-full max-w-[1600px] px-6 py-16 md:px-10 md:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                {t("eyebrow")}
              </p>
              <h2 className="mt-3 font-sans text-3xl font-medium tracking-tight md:text-5xl">
                {t("heading")}
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
                {t("body")}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="flex justify-center">
              <Reveal delay={120} className="w-full max-w-[360px]">
                <MobileFrame
                  src="/projects/corazon/webpage.png"
                  alt={t("alt")}
                  sizes="(min-width: 1024px) 24vw, 80vw"
                  lightbox
                />
                <p className="mt-3 text-center font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                  {t("caption")}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
