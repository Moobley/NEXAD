import { getTranslations } from "next-intl/server"

import { Reveal } from "@/components/ui/reveal"

export async function CaseStudySystem() {
  const t = await getTranslations("projects.corazon.caseStudy.system")
  const steps = t.raw("steps") as string[]

  return (
    <div className="surface-obsidian">
      <div
        aria-hidden
        className="h-14 w-full bg-gradient-to-b from-ivory to-transparent md:h-24"
      />

      <div className="mx-auto w-full max-w-[1600px] px-6 py-20 md:px-10 md:py-28">
        <Reveal>
          <h2 className="max-w-3xl font-sans text-4xl font-medium tracking-tight md:text-6xl">
            {t("title")}
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <p className="mt-12 max-w-4xl font-mono text-[11px] uppercase leading-loose tracking-[0.22em] text-muted-foreground">
            {steps.join(" · ")}
          </p>
        </Reveal>
      </div>

      <div
        aria-hidden
        className="h-14 w-full bg-gradient-to-b from-transparent to-ivory md:h-24"
      />
    </div>
  )
}