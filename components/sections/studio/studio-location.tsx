import { getTranslations } from "next-intl/server"

import { Reveal } from "@/components/ui/reveal"
import { GranCanariaOutline } from "@/components/ui/gran-canaria-outline"

export async function StudioLocation() {
  const t = await getTranslations("studioPage.location")

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[12%] -top-[24%] z-0 hidden select-none lg:block"
      >
        <GranCanariaOutline className="h-[80vh] w-auto text-obsidian opacity-[0.07]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 py-28 md:px-10 md:py-36">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                {t("index")} — {t("eyebrow")}
              </p>
              <h2 className="mt-3 max-w-2xl font-sans text-4xl font-medium tracking-tight md:text-6xl">
                {t("title")}
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
                {t("body")}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={140}>
              <div className="lg:mt-14 lg:text-right">
                <p className="font-serif text-2xl italic leading-snug md:text-3xl">
                  {t("statement")}
                </p>
                <p className="mt-5 font-mono text-[11px] tracking-[0.25em] text-muted-foreground">
                  {t("coords")}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}