import { getTranslations } from "next-intl/server"

import { Reveal } from "@/components/ui/reveal"

type Step = { title: string; body: string }

export async function CaseStudyMethod() {
  const t = await getTranslations("projects.corazon.caseStudy.method")
  const steps = t.raw("steps") as Step[]

  return (
    <section>
      <div className="mx-auto w-full max-w-[1600px] px-6 pt-6 pb-10 md:px-10 md:py-28">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            {t("eyebrow")}
          </p>
        </Reveal>

        <ol className="mt-6 border-t border-obsidian/10">
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="grid gap-3 border-b border-obsidian/10 py-4 md:grid-cols-12 md:gap-8"
            >
              <span className="font-mono text-sm tracking-[0.1em] text-muted-foreground md:col-span-2">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-sans text-2xl font-medium tracking-tight md:col-span-4 md:text-3xl">
                {step.title}
              </h3>
              <p className="text-base leading-relaxed text-muted-foreground md:col-span-6">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
