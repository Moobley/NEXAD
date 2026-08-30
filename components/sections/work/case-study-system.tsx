import { getTranslations } from "next-intl/server"

import { Reveal } from "@/components/ui/reveal"
import { Flow } from "@/components/ui/flow"

export async function CaseStudySystem() {
  const t = await getTranslations("projects.corazon.caseStudy.system")
  const flow = t.raw("flow") as string[]

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
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {t("support")}
          </p>
        </Reveal>
        <Reveal delay={200}>
          <Flow steps={flow} surface="dark" className="mt-12 md:mt-16" />
        </Reveal>
      </div>

      <div
        aria-hidden
        className="h-14 w-full bg-gradient-to-b from-transparent to-ivory md:h-24"
      />
    </div>
  )
}