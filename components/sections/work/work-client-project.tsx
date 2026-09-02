import { getTranslations } from "next-intl/server"
import Image from "next/image"

import { Link } from "@/i18n/navigation"
import { Reveal } from "@/components/ui/reveal"
import { CaseMedia } from "@/components/ui/case-media"
import { ForwardMark } from "@/components/ui/forward-mark"
import { asset } from "@/lib/asset"

export async function WorkClientProject() {
  const t = await getTranslations("projects.corazon")

  return (
    <section>
      <div className="mx-auto w-full max-w-[1600px] px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8 lg:items-start">
          <div className="lg:order-2 lg:col-span-5 lg:col-start-8">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                  {t("clientLabel")}
                </p>
                <h2 className="mt-4 font-sans text-4xl font-medium tracking-tight md:text-5xl">
                  {t("title")}
                </h2>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  {t("location")} — {t("category")}
                </p>
                <p className="mt-8 font-sans text-2xl font-medium leading-snug tracking-tight md:text-3xl">
                  {t("headline")}
                </p>
                <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
                  {t("support")}
                </p>
              </Reveal>
            </div>
          </div>

          <div className="lg:order-1 lg:col-span-7">
            <Reveal delay={120}>
              <Link href="/work/corazon-napoletano" className="group block">
                <CaseMedia
                  label={`${t("title")} · ${t("category")}`}
                  tone="light"
                  className="aspect-[4/3]"
                >
                  <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(130%_130%_at_70%_15%,#e7e3d6_0%,#f2efe8_48%,#d8d2c3_100%)] p-10 md:p-16">
                    <Image
                      src={asset("/projects/corazon/logoCN.webp")}
                      alt={t("title")}
                      width={700}
                      height={201}
                      unoptimized
                      className="h-auto w-full max-w-md object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                </CaseMedia>
              </Link>
            </Reveal>
          </div>

          <div className="lg:order-3 lg:col-span-5 lg:col-start-8">
            <Reveal delay={200}>
              <div className="border-t border-obsidian/10 pt-6">
                <p className="font-sans text-6xl font-medium leading-none tracking-[-0.03em] md:text-7xl">
                  {t("resultAmount")}
                </p>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                  {t("resultLabel")}
                </p>
              </div>
              <Link href="/work/corazon-napoletano" className="cta-primary mt-8">
                {t("cta")}
                <ForwardMark className="arrow size-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}