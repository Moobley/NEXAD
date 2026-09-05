import { getTranslations } from "next-intl/server"

import { Reveal } from "@/components/ui/reveal"

type Item = { title: string; body: string }

export async function CaseStudyWhat() {
  const t = await getTranslations("projects.corazon.caseStudy.what")
  const items = t.raw("list") as Item[]

  return (
    <section>
      <div className="mx-auto w-full max-w-[1600px] px-6 pt-6 pb-10 md:px-10 md:py-28">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            {t("eyebrow")}
          </p>
        </Reveal>

        <div className="mt-6 grid gap-x-8 gap-y-8 border-t border-obsidian/10 pt-8 md:grid-cols-2">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 80}>
              <h3 className="font-sans text-2xl font-medium tracking-tight md:text-3xl">
                {item.title}
              </h3>
              <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
