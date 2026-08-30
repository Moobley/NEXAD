import { getTranslations } from "next-intl/server"

import { Reveal } from "@/components/ui/reveal"
import { CaseMedia } from "@/components/ui/case-media"
import { cn } from "@/lib/utils"

export async function CaseStudyQr() {
  const t = await getTranslations("projects.corazon.caseStudy.qr")

  return (
    <div className="surface-obsidian">
      <div
        aria-hidden
        className="h-14 w-full bg-gradient-to-b from-ivory to-transparent md:h-24"
      />

      <div className="mx-auto w-full max-w-[1600px] px-6 py-20 md:px-10 md:py-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Reveal>
              <h2 className="font-sans text-4xl font-medium tracking-tight md:text-6xl">
                {t("heading")}
              </h2>
              <p className="mt-8 max-w-sm text-base leading-relaxed text-muted-foreground">
                {t("body")}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal delay={100}>
              <CaseMedia
                label={t("mediaLabel")}
                tone="dark"
                className="aspect-[4/3]"
              >
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[radial-gradient(120%_120%_at_70%_20%,#16161a_0%,#0b0b0d_60%)]"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative h-40 w-40 md:h-56 md:w-56">
                      <span className="absolute left-0 top-0 h-10 w-10 border-l-2 border-t-2 border-ivory/50" />
                      <span className="absolute right-0 top-0 h-10 w-10 border-r-2 border-t-2 border-ivory/50" />
                      <span className="absolute bottom-0 left-0 h-10 w-10 border-b-2 border-l-2 border-ivory/50" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="grid grid-cols-3 gap-1 opacity-60">
                          {Array.from({ length: 9 }).map((_, i) => (
                            <span
                              key={i}
                              className={cn(
                                "h-2 w-2",
                                [0, 2, 3, 6, 8].includes(i)
                                  ? "bg-ivory/70"
                                  : "border border-ivory/25"
                              )}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CaseMedia>
            </Reveal>
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="h-14 w-full bg-gradient-to-b from-transparent to-ivory md:h-24"
      />
    </div>
  )
}