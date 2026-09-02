import { getTranslations } from "next-intl/server"

import { Reveal } from "@/components/ui/reveal"
import { GranCanariaOutline } from "@/components/ui/gran-canaria-outline"

export async function GranCanaria() {
  const t = await getTranslations("home.granCanaria")

  return (
    <section className="relative overflow-hidden">
      {/* Cartographic island outline, cropped by the section bounds. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[12%] -top-[14%] z-0 hidden select-none lg:block"
      >
        <GranCanariaOutline className="h-[85vh] w-auto text-obsidian opacity-[0.08]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 pb-28 pt-14 md:px-10 md:pb-40 md:pt-24">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <Reveal variant="mask-up" delay={100}>
              <p className="font-mono text-[clamp(2rem,6vw,5rem)] tracking-[0.04em] text-foreground lg:mt-[clamp(16rem,32vh,22rem)]">
                {t("coordsLine1")}
                <br />
                {t("coordsLine2")}
              </p>
            </Reveal>

            <Reveal variant="fade-up" delay={200}>
              <p className="mt-10 font-sans text-2xl font-medium leading-snug tracking-tight md:text-3xl">
                {t("line1")}
                <br />
                {t("line2")}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:mt-8">
            <Reveal variant="fade-up" delay={260}>
              <div className="relative aspect-[4/5] overflow-hidden border border-obsidian/15 bg-[radial-gradient(130%_130%_at_70%_15%,#e7e3d6_0%,#f2efe8_48%,#d8d2c3_100%)]">
                <div className="noise absolute inset-0 opacity-40" />
                <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-obsidian/25 to-transparent" />
                <div className="absolute left-1/2 top-0 h-full w-px bg-obsidian/10" />
                <div className="absolute inset-x-0 bottom-0 px-6 pb-5">
                  <div className="flex items-end justify-between border-t border-obsidian/10 pt-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-obsidian/60">
                      {t("fieldLabel")}
                    </p>
                    <span className="mb-1 h-px w-8 bg-obsidian/30" />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}