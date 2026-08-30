import { getTranslations } from "next-intl/server"
import Image from "next/image"

import { Reveal } from "@/components/ui/reveal"
import { CaseMedia } from "@/components/ui/case-media"
import { asset } from "@/lib/asset"

export async function CaseStudyIdentity() {
  const t = await getTranslations("projects.corazon.caseStudy.identity")
  const tl = await getTranslations("projects.corazon.caseStudy.labels")
  const applications = t.raw("applications") as string[]

  return (
    <section>
      <div className="mx-auto w-full max-w-[1600px] px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="font-sans text-4xl font-medium tracking-tight md:text-6xl">
                {t("heading")}
              </h2>
              <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground">
                {t("body")}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={120}>
              <CaseMedia label={t("logoLabel")} tone="light" className="aspect-[16/10]">
                <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(130%_130%_at_70%_15%,#e7e3d6_0%,#f2efe8_48%,#d8d2c3_100%)] p-10 md:p-16">
                  <Image
                    src={asset("/projects/corazon/logoCN.webp")}
                    alt="Corazón Napoletano"
                    width={700}
                    height={201}
                    unoptimized
                    className="h-auto w-full max-w-md object-contain"
                  />
                </div>
              </CaseMedia>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 md:mt-24">
          <Reveal>
            <p className="border-t border-obsidian/10 pt-6 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              {t("applicationsTitle")}
            </p>
          </Reveal>

          <div className="mt-8 grid gap-8 md:grid-cols-3 md:gap-6">
            {applications.map((app, i) => (
              <Reveal key={app} delay={i * 80}>
                <CaseMedia
                  label={app}
                  note={tl("mediaNote")}
                  tone="light"
                  className="aspect-[4/5]"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}